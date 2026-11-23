import { siteConfig } from "@/config/site";

export function AdSlot({ placement = "Leaderboard", className = "" }: { placement?: "Leaderboard" | "Rectangle" | "InArticle" | "Result"; className?: string }) {
  const heights = { Leaderboard: "min-h-[106px]", Rectangle: "min-h-[280px]", InArticle: "min-h-[150px]", Result: "min-h-[120px]" };
  return <aside aria-label="Advertisement" className={`surface ${heights[placement]} grid place-items-center rounded-2xl bg-slate-50/70 px-4 ${className}`}><div className="w-full text-center"><p className="mb-3 font-metrics text-[10px] font-semibold uppercase tracking-[.16em] text-slate-400">Advertisement</p>{siteConfig.adsenseClientId ? <ins className="adsbygoogle block" data-ad-client={siteConfig.adsenseClientId} data-ad-format="auto" data-full-width-responsive="true" /> : <div className="rounded-lg border border-dashed border-slate-200 py-5 text-xs text-slate-400">Reserved {placement.toLowerCase()} placement</div>}</div></aside>;
}
