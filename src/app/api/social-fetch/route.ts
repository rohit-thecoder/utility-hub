import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MediaItem = { url: string; quality: string; type: "video" | "image" };
type SocialResult = { platform: "instagram" | "facebook"; title: string; thumbnail: string; items: MediaItem[]; author?: string; caption?: string };

const isInstagram = (url: string) => /(^|\.)instagram\.com\//i.test(url);
const isFacebook = (url: string) => /(^|\.)facebook\.com\//i.test(url) || /(^|\.)fb\.watch\//i.test(url);
const asString = (value: unknown) => typeof value === "string" ? value : "";
const firstString = (value: Record<string, unknown>, keys: string[]) => { for (const key of keys) { const found = asString(value[key]); if (found) return found; } return ""; };

function flattenMedia(value: unknown, items: MediaItem[] = [], seen = new Set<string>()) {
  if (!value || items.length > 30) return items;
  if (typeof value === "string" && /^https?:\/\//i.test(value) && /\.(mp4|m3u8|jpg|jpeg|png|webp)(\?|$)/i.test(value)) {
    const type = /\.(jpg|jpeg|png|webp)(\?|$)/i.test(value) ? "image" : "video";
    if (!seen.has(value)) { seen.add(value); items.push({ url: value, type, quality: /hd|high|1080|720/i.test(value) ? "HD" : "Standard" }); }
    return items;
  }
  if (Array.isArray(value)) { value.forEach((item) => flattenMedia(item, items, seen)); return items; }
  if (typeof value === "object") Object.values(value as Record<string, unknown>).forEach((item) => flattenMedia(item, items, seen));
  return items;
}

function normalize(platform: SocialResult["platform"], data: unknown): SocialResult {
  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const thumbnail = firstString(root, ["thumbnail", "thumbnail_url", "image", "display_url", "cover", "cover_url", "poster"]);
  const title = firstString(root, ["title", "caption", "description", "text"]) || `${platform === "instagram" ? "Instagram" : "Facebook"} public media`;
  const items = flattenMedia(data).filter((item) => item.url !== thumbnail);
  if (thumbnail && !items.some((item) => item.url === thumbnail)) items.unshift({ url: thumbnail, quality: "Preview", type: "image" });
  return { platform, title, thumbnail, items, author: firstString(root, ["author", "username", "owner", "user_name"]), caption: firstString(root, ["caption", "description", "text"]) };
}

async function callRapidApi(platform: SocialResult["platform"], source: string) {
  const key = process.env.RAPIDAPI_KEY;
  const host = platform === "instagram" ? (process.env.RAPIDAPI_INSTAGRAM_HOST || "instagram-scraper-stable-api.p.rapidapi.com") : (process.env.RAPIDAPI_FACEBOOK_HOST || "facebook-reel-and-video-downloader.p.rapidapi.com");
  if (!key) return null;
  const headers = { "x-rapidapi-key": key, "x-rapidapi-host": host, "content-type": "application/json" };
  const attempts = [`https://${host}/`, `https://${host}/download`, `https://${host}/scrape`];
  for (const endpoint of attempts) {
    try {
      const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify({ url: source, link: source }), signal: AbortSignal.timeout(12000) });
      if (response.ok) return normalize(platform, await response.json());
    } catch { /* try the next provider route */ }
  }
  return null;
}

async function oEmbedFallback(platform: SocialResult["platform"], source: string) {
  const endpoint = platform === "instagram" ? `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(source)}` : `https://www.facebook.com/plugins/post/oembed.json/?url=${encodeURIComponent(source)}`;
  try { const response = await fetch(endpoint, { signal: AbortSignal.timeout(10000) }); if (!response.ok) return null; return normalize(platform, await response.json()); } catch { return null; }
}

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENABLE_DOWNLOADERS !== "true") return NextResponse.json({ error: "Media downloaders are disabled in this deployment." }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { url?: string };
  const source = body.url?.trim() || "";
  const platform = isInstagram(source) ? "instagram" : isFacebook(source) ? "facebook" : null;
  if (!platform) return NextResponse.json({ error: "Paste a valid public Instagram or Facebook URL." }, { status: 400 });
  const result = await callRapidApi(platform, source) || await oEmbedFallback(platform, source);
  if (!result || result.items.length === 0) return NextResponse.json({ error: "This link may be private, invalid, rate-limited, or unavailable to public metadata providers." }, { status: 404 });
  return NextResponse.json(result);
}
