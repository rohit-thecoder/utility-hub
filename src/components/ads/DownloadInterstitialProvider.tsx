"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AdSlot } from "./AdSlot";

export type DownloadOptions = { fileName: string; blob?: Blob; url?: string; dataUrl?: string; onComplete?: () => void };
type DownloadContextValue = { triggerDownload: (download: DownloadOptions) => void };
const DownloadContext = createContext<DownloadContextValue | null>(null);

function startDownload(download: DownloadOptions) {
  const href = download.dataUrl || download.url || (download.blob ? URL.createObjectURL(download.blob) : "");
  if (!href) return;
  const anchor = document.createElement("a"); anchor.href = href; anchor.download = download.fileName; anchor.rel = "noreferrer"; anchor.click();
  if (download.blob) window.setTimeout(() => URL.revokeObjectURL(href), 1_000);
  download.onComplete?.();
}

export function DownloadInterstitialProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<DownloadOptions | null>(null);
  const [seconds, setSeconds] = useState(5);
  const [started, setStarted] = useState(false);
  const complete = useCallback(() => {
    if (!pending || started) return;
    setStarted(true); startDownload(pending);
    window.setTimeout(() => { setPending(null); setStarted(false); }, 1_000);
  }, [pending, started]);
  useEffect(() => {
    if (!pending || started) return;
    const began = Date.now();
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, 5 - (Date.now() - began) / 1_000);
      setSeconds(remaining);
      if (remaining === 0) { window.clearInterval(timer); complete(); }
    }, 100);
    return () => window.clearInterval(timer);
  }, [complete, pending, started]);
  const triggerDownload = useCallback((download: DownloadOptions) => { setStarted(false); setSeconds(5); setPending(download); }, []);
  return <DownloadContext.Provider value={{ triggerDownload }}>
    {children}
    {pending && <div role="dialog" aria-modal="true" aria-label="Download preparation" className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-md"><div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><p className="font-display text-xl font-extrabold text-slate-950">{started ? "Download Started! ✓" : "Preparing your file"}</p><p className="mt-2 truncate text-sm text-slate-500">{pending.fileName}{!started && ` · downloading in ${Math.ceil(seconds)}s`}</p>{!started && <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-gradient-to-r from-blue-700 to-orange-500 transition-all duration-100" style={{ width: `${(1 - seconds / 5) * 100}%` }}/></div>}<AdSlot placement="Interstitial" className="mt-5" slotId="download-interstitial"/>{!started && seconds <= 3 && <button onClick={complete} className="mt-4 text-sm font-bold text-blue-700 hover:text-blue-900">Download immediately</button>}</div></div>}
  </DownloadContext.Provider>;
}

export function useDownloadWithAd() { const value = useContext(DownloadContext); if (!value) throw new Error("useDownloadWithAd must be used inside DownloadInterstitialProvider"); return value; }
export function AdDownloadButton({ download, children, className = "" }: { download: DownloadOptions; children: React.ReactNode; className?: string }) { const { triggerDownload } = useDownloadWithAd(); return <button onClick={() => triggerDownload(download)} className={`focus-ring rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-orange-700 ${className}`}>{children}</button>; }
