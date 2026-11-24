"use client";

import { useMemo, useState } from "react";
import { useDownloadWithAd } from "@/components/ads/DownloadInterstitialProvider";

type Platform = "instagram" | "facebook";
type CaptionData = { platform: Platform; caption: string; hashtags: string[]; mentions: string[]; author: string; characterCount: number; wordCount: number };

const sampleFor = (platform: Platform): CaptionData => {
  const caption = platform === "instagram" ? "A little more sunlight, a little more exploring. Save this weekend idea for later! #weekendideas #travelinspo @xyztools" : "Three simple ways to make your next post easier to find. Which one will you try? #socialmediatips #contentcreator @xyztools";
  return { platform, caption, hashtags: [...caption.matchAll(/#[\p{L}\p{N}_]+/gu)].map((match) => match[0]), mentions: [...caption.matchAll(/@[A-Za-z0-9._-]+/g)].map((match) => match[0]), author: "Sample public creator", characterCount: caption.length, wordCount: caption.match(/[^\s]+/g)?.length || 0 };
};

export function SocialCaptionExtractorTool({ platform, toolName, allowDownload = false }: { platform: Platform; toolName: string; allowDownload?: boolean }) {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<CaptionData | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const { triggerDownload } = useDownloadWithAd();
  const selectedTags = useMemo(() => data?.hashtags.filter((tag) => selected.includes(tag)) || [], [data, selected]);
  const cleanCaption = data?.caption.replace(/#[\p{L}\p{N}_]+/gu, "").replace(/[ \t]{2,}/g, " ").replace(/\n\s*\n\s*\n/g, "\n\n").trim() || "";

  const extract = async () => {
    if (!url.trim()) { setStatus("Paste a public post or reel URL first."); return; }
    setBusy(true); setStatus(""); setData(null);
    try {
      const response = await fetch("/api/social-caption", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) });
      const payload = await response.json() as CaptionData & { error?: string };
      if (!response.ok) throw new Error(payload.error || "The public caption could not be extracted.");
      setData(payload); setSelected(payload.hashtags); setStatus("Caption extracted from public metadata. Nothing was saved on the server.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "The public caption could not be extracted."); }
    finally { setBusy(false); }
  };
  const trySample = () => { const sample = sampleFor(platform); setUrl(platform === "instagram" ? "https://www.instagram.com/p/sample-public-post/" : "https://www.facebook.com/watch/sample-public-video"); setData(sample); setSelected(sample.hashtags); setStatus("Demo data loaded locally. Try a real public URL to extract live metadata."); };
  const copy = async (value: string) => { await navigator.clipboard?.writeText(value); setStatus("Copied to your clipboard."); };
  const download = () => { if (!data) return; triggerDownload({ fileName: `${platform}-caption.txt`, blob: new Blob([data.caption], { type: "text/plain;charset=utf-8" }) }); };

  return <section className="surface rounded-3xl bg-white p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-display text-xl font-extrabold text-slate-900">{toolName}</h2><p className="mt-1 text-sm text-slate-500">Read public caption metadata without logging in or downloading media.</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Public text only</span></div><div className="mt-6 flex flex-col gap-2 sm:flex-row"><input value={url} onChange={(event) => setUrl(event.target.value)} onKeyDown={(event) => event.key === "Enter" && extract()} placeholder={platform === "instagram" ? "https://instagram.com/p/... or /reel/..." : "https://facebook.com/... or fb.watch/..."} className="focus-ring min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400"/><button onClick={extract} disabled={busy} className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 disabled:opacity-60">{busy ? "Extracting…" : "Extract Caption"}</button><button onClick={trySample} className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800">Try Sample</button></div>{status && <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">{status}</p>}{data && <div className="mt-6 space-y-5"><div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-display font-bold text-slate-900">Full Caption</p><p className="mt-1 text-xs text-slate-500">{data.author ? `By ${data.author}` : "Public author not supplied"}</p></div><div className="flex flex-wrap gap-2"><button onClick={() => copy(data.caption)} className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-bold text-white">Copy Caption</button><button onClick={() => copy(cleanCaption)} className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white">Copy Clean Text</button>{allowDownload && <button onClick={download} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Download TXT</button>}</div></div><pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{data.caption}</pre><div className="mt-3 flex flex-wrap gap-3 font-metrics text-xs text-slate-500"><span>{data.characterCount} characters</span><span>{data.wordCount} words</span><span>{data.mentions.length} mentions</span></div></div><div className="rounded-2xl border border-blue-100 bg-white p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-display font-bold text-slate-900">Extracted Hashtags</p><button onClick={() => copy(selectedTags.join(" "))} className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">Copy All Hashtags</button></div>{data.hashtags.length ? <div className="mt-4 flex flex-wrap gap-2">{data.hashtags.map((tag) => { const active = selected.includes(tag); return <button key={tag} onClick={() => setSelected((current) => active ? current.filter((item) => item !== tag) : [...current, tag])} className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${active ? "border-orange-300 bg-orange-50 text-orange-700" : "border-blue-200 bg-blue-50 text-blue-700"}`}>{tag}</button>; })}</div> : <p className="mt-3 text-sm text-slate-500">No hashtags were found in this caption.</p>}</div>{data.mentions.length > 0 && <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-4"><p className="font-display font-bold text-slate-900">Mentions</p><p className="mt-2 text-sm text-slate-700">{data.mentions.join(" · ")}</p></div>}</div>}{!data && <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-5 text-sm leading-6 text-slate-600">Only public text metadata is requested. Private accounts, deleted posts, and captions hidden by the platform cannot be extracted.</div>}<p className="mt-6 text-xs leading-5 text-slate-400">Copyright notice: use this tool only for public metadata you are permitted to review. We do not host, cache, or redistribute captions or media.</p></section>;
}
