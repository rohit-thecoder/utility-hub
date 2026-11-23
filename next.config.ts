import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set NEXT_OUTPUT=export for Hostinger's static hosting. Leave unset for Node/VPS or Vercel.
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
