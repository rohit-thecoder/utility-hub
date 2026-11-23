import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: siteConfig.allowIndexing ? "/" : "", disallow: siteConfig.allowIndexing ? undefined : "/" }, sitemap: `${siteConfig.url}/sitemap.xml`, host: siteConfig.url }; }
