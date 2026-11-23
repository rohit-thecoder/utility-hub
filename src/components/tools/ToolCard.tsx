import Link from "next/link";
import type { Tool } from "@/data/toolsRegistry";

export function ToolCard({ tool, compact = false }: { tool: Tool; compact?: boolean }) {
  return <Link href={`/tools/${tool.slug}`} className={`surface group block rounded-2xl p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10 ${compact ? "p-4" : ""}`}><span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-700 transition group-hover:bg-orange-50 group-hover:text-orange-600">{tool.icon}</span><h3 className="mt-4 font-display text-base font-bold tracking-[-.02em] text-slate-900">{tool.name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{tool.description}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-orange-600">Open tool <span className="transition group-hover:translate-x-1">→</span></span></Link>;
}
