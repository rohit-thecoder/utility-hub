"use client";

import { createContext, useCallback, useContext } from "react";

export type DownloadOptions = { fileName: string; blob?: Blob; url?: string; dataUrl?: string; onComplete?: () => void };
type DownloadContextValue = { triggerDownload: (download: DownloadOptions) => void };
const DownloadContext = createContext<DownloadContextValue | null>(null);

function startDownload(download: DownloadOptions) {
  const href = download.dataUrl || download.url || (download.blob ? URL.createObjectURL(download.blob) : "");
  if (!href) return;
  const anchor = document.createElement("a"); anchor.href = href; anchor.download = download.fileName; anchor.rel = "noreferrer"; if (download.url && /^https?:/i.test(download.url)) anchor.target = "_blank"; document.body.appendChild(anchor); anchor.click(); anchor.remove();
  if (download.blob && !download.dataUrl && !download.url) window.setTimeout(() => URL.revokeObjectURL(href), 30_000);
  download.onComplete?.();
}

export function DownloadInterstitialProvider({ children }: { children: React.ReactNode }) {
  const triggerDownload = useCallback((download: DownloadOptions) => startDownload(download), []);
  return <DownloadContext.Provider value={{ triggerDownload }}>{children}</DownloadContext.Provider>;
}

export function useDownloadWithAd() { const value = useContext(DownloadContext); if (!value) throw new Error("useDownloadWithAd must be used inside DownloadInterstitialProvider"); return value; }
export function AdDownloadButton({ download, children, className = "" }: { download: DownloadOptions; children: React.ReactNode; className?: string }) { const { triggerDownload } = useDownloadWithAd(); return <button onClick={() => triggerDownload(download)} className={`focus-ring rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-orange-700 ${className}`}>{children}</button>; }
