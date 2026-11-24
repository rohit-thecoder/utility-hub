"use client";

import type { LucideIcon } from "lucide-react";
import { AtSign, AudioLines, BadgeIndianRupee, Braces, Calculator, CalendarCheck2, ChartNoAxesCombined, Clapperboard, Code2, Cpu, FileText, Image, Landmark, Monitor, Palette, ScanText, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Table2, Timer, Video, Wand2, Wifi } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "image-converters": Image, "image-editing": Wand2, "pdf-tools": FileText, "pdf-converters": FileText, "pdf-security": ShieldCheck,
  "video-tools": Video, "audio-tools": AudioLines, "text-tools": ScanText, "developer-tools": Code2, "seo-tools": ChartNoAxesCombined,
  "security-generators": ShieldCheck, "color-css-tools": Palette, "finance-calculators": BadgeIndianRupee, "math-health-calculators": Calculator,
  "unit-converters": SlidersHorizontal, "time-productivity": Timer, "data-spreadsheet-tools": Table2,
  "document-helpers": FileText, "network-diagnostics": Wifi, "ocr-tools": ScanText, "ai-prompt-tools": Sparkles, "ecommerce-tools": ShoppingBag,
  "exam-form-tools": FileText, "hardware-testers": Monitor, "svg-vector-tools": Braces, "accounting-split-tools": Landmark,
  "privacy-metadata-tools": ShieldCheck, "instagram-tools": AtSign, "facebook-tools": ChartNoAxesCombined, "social-media-suite": Sparkles,
  "creator-tools": Clapperboard, "daily-utilities": CalendarCheck2,
};

export function CategoryIcon({ categorySlug, className = "" }: { categorySlug: string; className?: string }) {
  const Icon = iconMap[categorySlug] || Cpu;
  return <span className={`inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-blue-100 bg-gradient-to-br from-blue-600/15 via-white to-orange-500/15 text-blue-700 shadow-sm transition duration-200 group-hover:scale-105 group-hover:shadow-md ${className}`}><Icon aria-hidden="true" size={20} strokeWidth={2.25}/></span>;
}
