import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Platform = "instagram" | "facebook";
type CaptionResult = { platform: Platform; caption: string; hashtags: string[]; mentions: string[]; author: string; characterCount: number; wordCount: number };

const instagramPath = /^\/(?:p|reel|tv)\/[^/?#]+/i;
const asString = (value: unknown) => typeof value === "string" ? value.trim() : "";
const captionKeys = ["caption", "caption_text", "captionText", "description", "message", "text"];
const authorKeys = ["author", "author_name", "username", "user_name", "owner_username", "profile_name"];

function targetFor(raw: string): { platform: Platform; url: string } | null {
  try {
    const parsed = new URL(raw);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    if (host === "instagram.com" && instagramPath.test(parsed.pathname)) return { platform: "instagram", url: parsed.toString() };
    if (host === "facebook.com" && parsed.pathname !== "/" && parsed.pathname.length > 1) return { platform: "facebook", url: parsed.toString() };
    if (host === "fb.watch" && parsed.pathname.length > 1) return { platform: "facebook", url: parsed.toString() };
  } catch { /* handled as an invalid public URL below */ }
  return null;
}

function findString(value: unknown, keys: string[], depth = 0): string {
  if (!value || depth > 8) return "";
  if (Array.isArray(value)) { for (const item of value) { const found = findString(item, keys, depth + 1); if (found) return found; } return ""; }
  if (typeof value !== "object") return "";
  const object = value as Record<string, unknown>;
  for (const key of keys) { const found = asString(object[key]); if (found) return found; }
  for (const child of Object.values(object)) { const found = findString(child, keys, depth + 1); if (found) return found; }
  return "";
}

function normalize(platform: Platform, payload: unknown): CaptionResult | null {
  const root = (payload && typeof payload === "object" ? payload : {}) as Record<string, unknown>;
  const providerError = findString(root, ["error", "errors", "status"]);
  const caption = findString(root, captionKeys).replace(/\r\n/g, "\n").trim();
  if (/private|login required|not found|rate.?limit|unavailable/i.test(providerError)) return null;
  if (!caption || /^(?:error|success|ok|not found|login required)$/i.test(caption)) return null;
  const hashtags = [...new Set(caption.match(/#[\p{L}\p{N}_]+/gu) || [])];
  const mentions = [...new Set(caption.match(/@[A-Za-z0-9._-]+/g) || [])];
  const words = caption.match(/[^\s]+/g) || [];
  return { platform, caption, hashtags, mentions, author: findString(root, authorKeys), characterCount: caption.length, wordCount: words.length };
}

async function fetchRapidApi(platform: Platform, source: string) {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) return { result: null, missingKey: true, noCaption: false };
  const host = platform === "instagram" ? (process.env.RAPIDAPI_INSTAGRAM_HOST || "instagram-scraper-stable-api.p.rapidapi.com") : (process.env.RAPIDAPI_FACEBOOK_HOST || "facebook-reel-and-video-downloader.p.rapidapi.com");
  const headers = { "x-rapidapi-key": key, "x-rapidapi-host": host, "content-type": "application/json" };
  const endpoints = ["/", "/scrape", "/download"];
  let providerReturnedData = false;
  for (const path of endpoints) {
    try {
      const response = await fetch(`https://${host}${path}`, { method: "POST", headers, body: JSON.stringify({ url: source, link: source }), signal: AbortSignal.timeout(15000) });
      if (response.ok) { providerReturnedData = true; const result = normalize(platform, await response.json()); if (result) return { result, missingKey: false, noCaption: false }; }
    } catch { /* try the provider's next compatible endpoint */ }
  }
  try {
    const response = await fetch(`https://${host}/?url=${encodeURIComponent(source)}`, { headers: { "x-rapidapi-key": key, "x-rapidapi-host": host }, signal: AbortSignal.timeout(15000) });
    if (response.ok) { providerReturnedData = true; const result = normalize(platform, await response.json()); return { result, missingKey: false, noCaption: !result }; }
  } catch { /* return a friendly public/private error below */ }
  return { result: null, missingKey: false, noCaption: providerReturnedData };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({})) as { url?: string };
  const target = targetFor(typeof body.url === "string" ? body.url.trim() : "");
  if (!target) return NextResponse.json({ error: "Paste a public Instagram post/reel URL or Facebook post/reel URL." }, { status: 400 });
  const { result, missingKey, noCaption } = await fetchRapidApi(target.platform, target.url);
  if (missingKey) return NextResponse.json({ error: "Online caption extraction is temporarily unavailable. Please use the manual caption option." }, { status: 503 });
  if (noCaption) return NextResponse.json({ error: "This public post or reel does not contain a caption." }, { status: 422 });
  if (!result) return NextResponse.json({ error: "This account or post may be private, unavailable, rate-limited, or unsupported by the public metadata provider." }, { status: 404 });
  return NextResponse.json(result);
}
