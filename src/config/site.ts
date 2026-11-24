const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quiiktool.com";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "QuiikTool",
  url: rawUrl.replace(/\/$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@quiiktool.com",
  description: "QuiikTool offers 150+ free, fast, privacy-first online image, PDF, developer, YouTube, Instagram, Facebook, and everyday productivity utilities directly in your browser.",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  enableMediaDownloaders: process.env.NEXT_PUBLIC_ENABLE_DOWNLOADERS === "true",
  socialLinks: {
    x: process.env.NEXT_PUBLIC_X_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  },
} as const;
