import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { PremiumNavbar } from "@/components/layout/PremiumNavbar";
import { siteConfig } from "@/config/site";
import { DownloadInterstitialProvider } from "@/components/ads/DownloadInterstitialProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "QuiikTool — Free All-in-One Online Image, PDF, Creator & Dev Utilities", template: "%s | QuiikTool" },
  description: siteConfig.description,
  robots: { index: siteConfig.allowIndexing, follow: siteConfig.allowIndexing },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: { type: "website", siteName: "QuiikTool", url: siteConfig.url, locale: "en_US" },
  twitter: { card: "summary_large_image", creator: "@quiiktool" },
  other: {
  "google-adsense-account": "ca-pub-6575366284458197",
},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}><body className="min-h-screen overflow-x-hidden"><DownloadInterstitialProvider><PremiumNavbar /><main className="min-h-[calc(100vh-13rem)]">{children}</main><Footer /></DownloadInterstitialProvider></body></html>;
}
