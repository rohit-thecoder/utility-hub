"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";

type Placement = "Leaderboard" | "Rectangle" | "InArticle" | "Result" | "SidebarTall" | "Interstitial";
const dimensions: Record<Placement, { label: string; height: string }> = { Leaderboard: { label: "728×90 Leaderboard", height: "min-h-[106px]" }, Rectangle: { label: "336×280 Rectangle", height: "min-h-[280px]" }, InArticle: { label: "728×90 In-article", height: "min-h-[150px]" }, Result: { label: "336×280 Result", height: "min-h-[120px]" }, SidebarTall: { label: "300×600 Sticky Sidebar", height: "min-h-[600px]" }, Interstitial: { label: "336×280 Interstitial", height: "min-h-[280px]" } };
declare global { interface Window { adsbygoogle?: unknown[]; } }

export function AdSlot({ placement = "Leaderboard", className = "", slotId }: { placement?: Placement; className?: string; slotId?: string }) {
  const loaded = useRef(false); const info = dimensions[placement];
  useEffect(() => { if (siteConfig.adsenseClientId && slotId && /^\d+$/.test(slotId) && !loaded.current) { try { window.adsbygoogle = window.adsbygoogle || []; window.adsbygoogle.push({}); loaded.current = true; } catch { /* Ad blockers must not affect tool use. */ } } }, [slotId]);
  if (!siteConfig.adsenseClientId || !slotId || !/^\d+$/.test(slotId) || placement === "Interstitial" || placement === "Result") return null;
  return <aside aria-label="Advertisement" className={`surface ${info.height} grid place-items-center rounded-2xl bg-slate-50/70 px-4 ${className}`}><div className="w-full text-center"><p className="mb-3 font-metrics text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Advertisement</p>{siteConfig.adsenseClientId ? <ins className="adsbygoogle block" data-ad-client={siteConfig.adsenseClientId} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" /> : <div className="grid min-h-16 place-items-center rounded-xl border border-dashed border-slate-200 bg-white/70 px-4 font-metrics text-xs text-slate-400">{info.label}<span className="mt-1 text-[10px]">Ad preview</span></div>}</div></aside>;
}
