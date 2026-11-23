import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/config/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} — Free Online Utilities`, template: `%s | ${siteConfig.name}` },
  description: "Fast, private, browser-local utilities for images, PDFs, text, code, calculations, and more.",
  robots: { index: siteConfig.allowIndexing, follow: siteConfig.allowIndexing },
  openGraph: { type: "website", siteName: siteConfig.name, url: siteConfig.url },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}><body className="min-h-screen overflow-x-hidden"><Navbar /><main className="min-h-[calc(100vh-13rem)]">{children}</main><Footer /></body></html>;
}
