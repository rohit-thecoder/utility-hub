"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { activeCategories as categories, popularTools, toolsForCategory, visibleTools } from "@/data/toolsRegistry";

export function PremiumNavbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(categories[0]?.slug || "");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const activeCategory = categories.find((category) => category.slug === active) || categories[0];
  const children = toolsForCategory(active);
  const results = useMemo(() => visibleTools.filter((tool) => `${tool.name} ${tool.categoryName} ${tool.primaryKeyword}`.toLowerCase().includes(query.toLowerCase())).slice(0, 9), [query]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMegaOpen(false);
        setMobileOpen(false);
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMobileMenu = () => desktop.matches && setMobileOpen(false);
    window.addEventListener("keydown", key);
    desktop.addEventListener("change", closeMobileMenu);
    return () => {
      window.removeEventListener("keydown", key);
      desktop.removeEventListener("change", closeMobileMenu);
    };
  }, []);

  useEffect(() => {
    const locked = mobileOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const openSearch = () => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(true);
  };

  return <header className="sticky top-0 z-40 overflow-x-clip border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl">
    <div className="mx-auto flex h-16 min-w-0 max-w-7xl items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
      <Link href="/" className="focus-ring flex shrink-0 items-center rounded-xl" aria-label="QuiikTool home">
        <Image src="/logo.png" width={42} height={42} priority className="h-10 w-10 rounded-xl object-contain" alt="QuiikTool — Free All-in-One Online Utility Hub" />
      </Link>

      <nav className="hidden items-center gap-1 lg:flex">
        <button onClick={() => setMegaOpen((value) => !value)} aria-expanded={megaOpen} className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">Categories <span className={`ml-1 inline-block transition ${megaOpen ? "rotate-180" : ""}`}>⌄</span></button>
        <details className="relative">
          <summary className="list-none rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">Popular tools</summary>
          <div className="absolute left-0 top-10 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">{popularTools.slice(0, 8).map((slug) => { const tool = visibleTools.find((item) => item.slug === slug); return tool && <Link key={slug} href={`/tools/${slug}`} className="block rounded-xl p-3 text-sm font-bold text-slate-700 hover:bg-blue-50">{tool.name}</Link>; })}</div>
        </details>
        <Link href="/all-tools" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">All tools</Link>
        <Link href="/category/creator-tools" className="rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-700">YouTube Suite <span className="ml-1 rounded-full bg-orange-100 px-1.5 py-0.5 text-[9px] text-orange-700">HOT</span></Link>
      </nav>

      <div className="ml-auto flex min-w-0 items-center gap-1">
        <button onClick={openSearch} className="hidden min-w-56 items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-left text-sm text-slate-500 shadow-sm hover:border-blue-300 md:flex" aria-label="Search tools"><span>Search tools...</span><kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px]">⌘ K</kbd></button>
        <button onClick={openSearch} className="rounded-lg p-2 text-xl text-slate-700 md:hidden" aria-label="Search tools">⌕</button>
        <button onClick={() => { setMegaOpen(false); setMobileOpen((value) => !value); }} className="rounded-lg p-2 text-xl text-slate-700 lg:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>{mobileOpen ? "×" : "☰"}</button>
      </div>
    </div>

    {megaOpen && <div className="absolute inset-x-0 top-16 hidden border-b border-slate-200 bg-white/95 px-4 py-5 shadow-2xl backdrop-blur-xl lg:block"><div className="mx-auto grid max-w-7xl grid-cols-[15rem_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="max-h-[30rem] overflow-y-auto border-r border-slate-100 p-2">{categories.map((category) => <button key={category.slug} onMouseEnter={() => setActive(category.slug)} onClick={() => setActive(category.slug)} className={`group flex w-full items-center gap-3 rounded-xl p-2 text-left ${active === category.slug ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50"}`}><CategoryIcon categorySlug={category.slug} className="h-9 w-9"/><span className="min-w-0 flex-1 text-sm font-bold">{category.name}</span><span className="font-metrics text-xs">{category.tools.length}</span></button>)}</div><div className="p-5"><div className="flex items-center justify-between"><div><p className="font-metrics text-xs font-bold uppercase tracking-[.16em] text-orange-600">Explore</p><h2 className="font-display text-xl font-extrabold text-slate-950">{activeCategory.name}</h2></div><Link onClick={() => setMegaOpen(false)} href={`/category/${activeCategory.slug}`} className="text-sm font-bold text-orange-600">View all →</Link></div><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{children.map((tool) => <Link key={tool.slug} onClick={() => setMegaOpen(false)} href={`/tools/${tool.slug}`} className="rounded-xl border border-transparent p-3 hover:border-blue-100 hover:bg-blue-50"><p className="text-sm font-bold text-slate-800">{tool.name}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{tool.description}</p></Link>)}</div></div></div></div>}

    {mobileOpen && <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm" onClick={closeAll}><aside className="ml-auto flex h-full w-full max-w-sm flex-col overflow-hidden bg-white p-4 shadow-2xl sm:p-5" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between gap-3"><p className="font-display text-xl font-extrabold text-slate-950">Browse tools</p><button onClick={closeAll} className="rounded-lg p-2 text-2xl leading-none text-slate-500 hover:bg-slate-100" aria-label="Close menu">×</button></div><div className="mt-5 grid shrink-0 grid-cols-2 gap-2"><button onClick={openSearch} className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-left text-sm font-bold text-blue-800">Search tools</button><Link onClick={closeAll} href="/all-tools" className="rounded-xl bg-blue-700 p-3 text-sm font-bold text-white">All tools</Link><Link onClick={closeAll} href="/category/creator-tools" className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm font-bold text-orange-700">YouTube Suite</Link><Link onClick={closeAll} href="/about" className="rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">About QuiikTool</Link></div><div className="mt-3 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"><p className="mb-1 px-1 font-metrics text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Categories</p>{categories.map((category) => <details key={category.slug} className="border-b border-slate-100 py-3"><summary className="flex min-w-0 items-center gap-3 font-bold text-slate-700"><CategoryIcon categorySlug={category.slug} className="h-8 w-8 shrink-0"/><span className="min-w-0 flex-1 truncate">{category.name}</span><span className="font-metrics text-xs text-slate-400">{category.tools.length}</span></summary><div className="mt-2 space-y-1 pl-11">{toolsForCategory(category.slug).map((tool) => <Link key={tool.slug} onClick={closeAll} href={`/tools/${tool.slug}`} className="block py-1 text-sm text-slate-600">{tool.name}</Link>)}</div></details>)}</div></aside></div>}

    {searchOpen && <div className="fixed inset-0 z-50 bg-slate-950/40 px-3 pt-16 backdrop-blur-sm sm:px-4 sm:pt-20" onClick={closeAll}><div className="mx-auto flex max-h-[calc(100dvh-5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex shrink-0 items-center gap-2 border-b border-slate-100 px-4"><span className="text-xl text-blue-700">⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a tool, category, or keyword..." className="h-14 min-w-0 flex-1 border-0 bg-transparent px-1 outline-none"/><button onClick={closeAll} className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100" aria-label="Close search">×</button></div><div className="min-h-0 overflow-y-auto p-2">{results.length ? results.map((tool) => <Link onClick={closeAll} key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center justify-between gap-3 rounded-xl p-4 hover:bg-blue-50"><span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-800">{tool.name}</span><span className="block truncate text-xs text-slate-500">{tool.categoryName}</span></span><span className="shrink-0 text-orange-500">→</span></Link>) : <p className="p-6 text-center text-sm text-slate-500">No matching tools yet.</p>}</div></div></div>}
  </header>;
}
