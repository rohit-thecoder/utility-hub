import { NextRequest, NextResponse } from "next/server";
import { apiGuard } from "@/lib/apiGuard";
import { extractYouTubeId } from "@/lib/youtube";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Snippet = { title?: string; description?: string; channelTitle?: string; channelId?: string; publishedAt?: string; tags?: string[]; thumbnails?: Record<string, { url?: string }> };
type Data = { items?: { snippet?: Snippet }[]; error?: { errors?: { reason?: string }[] } };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers: {"Cache-Control":"no-store"} });
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url") || "";
  if (raw.length > 2048) return fail("Video URL is too long.", 400);
  const id = extractYouTubeId(raw);
  if (!id) return fail("Enter a valid YouTube video link or 11-character video ID.", 400);
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return fail("Full YouTube metadata is temporarily unavailable because the service has not been configured.", 503);
  const limited = apiGuard(request,"youtube-meta",20,60000,300); if (limited) return limited;
  const endpoint = new URL("https://www.googleapis.com/youtube/v3/videos");
  endpoint.search = new URLSearchParams({ part: "snippet", id, key }).toString();
  try {
    const response = await fetch(endpoint, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const data = await response.json() as Data;
    if (!response.ok) {
      const reason = data.error?.errors?.[0]?.reason;
      if (response.status === 429 || ["quotaExceeded", "dailyLimitExceeded", "rateLimitExceeded"].includes(reason || "")) return fail("YouTube's request limit has been reached. Please try again later.", 429);
      if ([400, 401, 403].includes(response.status)) return fail("The YouTube metadata service is temporarily unavailable. Please try again later.", 503);
      return fail("YouTube could not respond. Please try again later.", 502);
    }
    const snippet = data.items?.[0]?.snippet;
    if (!snippet?.title) return fail("Video not found or its metadata is not publicly available.", 404);
    const description = snippet.description || "";
    const thumbnails = snippet.thumbnails || {};
    return NextResponse.json({
      id, title: snippet.title, description, channelName: snippet.channelTitle || "",
      channelUrl: snippet.channelId ? "https://www.youtube.com/channel/" + snippet.channelId : "",
      publishDate: snippet.publishedAt || "",
      thumbnail: thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "",
      tags: Array.isArray(snippet.tags) ? snippet.tags : [],
      links: [...new Set(description.match(/https?:\/\/[^\s]+/g) || [])],
      hashtags: [...new Set(description.match(/#[\p{L}\p{N}_]+/gu) || [])],
      source: "YouTube Data API"
    }, { headers: { "Cache-Control": "no-store" } });
  } catch { return fail("Could not connect to YouTube. Please try again.", 502); }
}
