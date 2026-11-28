// Shared strict parser: do not accept lookalike domains or truncated IDs.
export function extractYouTubeId(input: string): string | null {
  const raw = input.trim();
  const valid = /^[A-Za-z0-9_-]{11}$/;
  if (valid.test(raw)) return raw;
  try {
    const url = new URL(raw);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    const parts = url.pathname.split("/").filter(Boolean);
    let id: string | null | undefined;
    if (host === "youtu.be") id = parts.length === 1 ? parts[0] : null;
    else if (["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(host)) {
      id = url.pathname === "/watch" ? url.searchParams.get("v") : parts.length === 2 && ["shorts", "live", "embed"].includes(parts[0]) ? parts[1] : null;
    }
    return id && valid.test(id) ? id : null;
  } catch { return null; }
}
