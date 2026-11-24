import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function extractYouTubeId(input: string) {
  try {
    const url = new URL(input.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0]?.slice(0, 11) || null;
    if (!host.endsWith("youtube.com")) return null;
    const firstPath = url.pathname.split("/").filter(Boolean);
    const candidate = url.searchParams.get("v") || (["shorts", "embed", "live"].includes(firstPath[0]) ? firstPath[1] : null);
    return candidate?.slice(0, 11) || null;
  } catch { return null; }
}

const decode = (value: string) => value.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const match = (html: string, expression: RegExp) => decode(html.match(expression)?.[1]?.trim() || "");
const jsonValue = (html: string, key: string) => match(html, new RegExp(`"${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}":"((?:\\\\.|[^"\\\\])*)"`));

function extractLinks(description: string) { return [...new Set(description.match(/https?:\/\/[^\s]+/g) || [])]; }
function extractHashtags(description: string) { return [...new Set(description.match(/#[\p{L}\p{N}_]+/gu) || [])]; }

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("url") || "";
  const id = extractYouTubeId(source);
  if (!id) return NextResponse.json({ error: "Paste a valid public YouTube URL." }, { status: 400 });
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const headers = { "user-agent": "Mozilla/5.0 (compatible; QuiikTool/1.0; +https://quiiktool.com)", "accept-language": "en-US,en;q=0.9" };
  try {
    const watch = await fetch(watchUrl, { headers, next: { revalidate: 3600 } });
    const html = watch.ok ? await watch.text() : "";
    const title = match(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i) || jsonValue(html, "title");
    const description = match(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i) || jsonValue(html, "shortDescription");
    const channelName = jsonValue(html, "ownerChannelName") || match(html, /<link[^>]+itemprop=["']name["'][^>]+content=["']([^"']*)["']/i);
    const channelId = jsonValue(html, "externalChannelId");
    const publishDate = jsonValue(html, "publishDate") || jsonValue(html, "uploadDate");
    const keywords = jsonValue(html, "keywords").split(",").map((tag) => tag.trim()).filter(Boolean);
    if (title || description || channelName) return NextResponse.json({ id, title, description, channelName, channelUrl: channelId ? `https://www.youtube.com/channel/${channelId}` : "", publishDate, thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, tags: keywords, links: extractLinks(description), hashtags: extractHashtags(description) });
  } catch { /* noembed fallback below */ }
  try {
    const fallback = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(watchUrl)}`, { next: { revalidate: 3600 } });
    const data = await fallback.json() as { title?: string; author_name?: string; author_url?: string; thumbnail_url?: string };
    return NextResponse.json({ id, title: data.title || "", description: "", channelName: data.author_name || "", channelUrl: data.author_url || "", publishDate: "", thumbnail: data.thumbnail_url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, tags: [], links: [], hashtags: [] });
  } catch { return NextResponse.json({ error: "YouTube did not return public metadata for this video. Try another public URL." }, { status: 502 }); }
}
