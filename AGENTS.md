# AGENTS.md — All-in-One Utility Hub Architecture

## 1. Core Identity & Architecture
- **Project:** Multi-category client-side utility web platform (placeholder domain: `https://xyz.com`).
- **Routing Rule:** STRICTLY subfolder routes (`xyz.com/tools/[slug]` or `xyz.com/[category]/[slug]`). NEVER use subdomains.
- **Zero-Auth Policy:** No login, signup, or paywall walls anywhere. Every tool works immediately in the browser.
- **Client-Side First:** Process files locally using HTML5 Canvas, Web APIs, `pdf-lib`, `jszip`, `tesseract.js`, `xlsx`, etc., so user files never leave their device (highlight this as a Privacy badge on every tool).

## 2. Visual Design System (Blue & Orange Premium Aesthetic)
- **Theme:** Clean, high-trust modern SaaS/utility aesthetic (light mode default `#F8FAFC` / `#FFFFFF` with subtle dot/grid background and glassmorphic cards).
- **Primary Brand Color:** Deep Royal Blue (`#1D4ED8` / `blue-700`, hover `#1E40AF`).
- **Accent & CTA Color:** Vibrant Action Orange (`#F97316` / `orange-500`, hover `#EA580C`) for primary action buttons ("Convert Now", "Download", "Enhance"), badges, and active highlights.
- **Typography & Layout:** Crisp hierarchy, responsive 12-column grid, smooth micro-interactions, clear drag-and-drop upload zones with dashed blue borders that turn orange on drag-over.

## 3. SEO & Programmatic Ranking Rules (Mandatory for Every Tool Page)
Every single tool route MUST export dynamic `generateMetadata` and render:
1. **Unique SEO Title & Meta Description** targeting high-volume daily search queries (e.g., "JPG to PNG Converter Online Free — Instant & Private | XYZ").
2. **Canonical URL** pointing to `https://xyz.com/tools/<slug>`.
3. **JSON-LD Structured Data:** `SoftwareApplication` schema + `FAQPage` schema on every tool page.
4. **Rich Below-the-Fold SEO Content:** Every tool page must include:
   - Step-by-step "How to Use" guide (3–4 steps)
   - Key Features / Benefits grid
   - 4–5 Tool-Specific FAQs (accordion)
   - Internal linking ("Related Tools" grid from the same & adjacent categories)
5. **Dynamic Sitemap & Robots:** `src/app/sitemap.ts` and `src/app/robots.ts` auto-generating all tool URLs, category pages, and legal pages.

## 4. Google AdSense & Policy Compliance
- **No Copyright-Violating Tools:** Strictly exclude YouTube/Instagram/TikTok video downloaders (only allow public YouTube thumbnail/metadata tools).
- **Reusable `<AdSlot />` Component:** Place clean, CLS-safe (reserved min-height) ad placeholders labeled "Advertisement" in:
  1. Top Leaderboard (`728x90` desktop / `320x100` mobile) below navbar
  2. Sidebar / Below-Tool Rectangle (`336x280` or responsive)
  3. Download-Ready / Result Interstitial Card (non-intrusive box right above/below the download button)
  4. In-Article / Below-FAQ Banner
- **Mandatory Legal Pages:** `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer` must exist and be linked in the footer for AdSense approval.