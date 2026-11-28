# QuiikTool

Next.js browser-first utilities. Use Node.js or Vercel, not static export for API routes.

## Local development

```sh
npm ci
npm run dev
npm run test:youtube
npm run verify:tools
npm run lint
npm run build
```

Copy .env.example to .env.local for local configuration. Never commit keys.

## Vercel production checklist

- Set YOUTUBE_API_KEY (server-only) in Vercel Settings > Environment Variables, enable YouTube Data API v3 in Google Cloud, restrict the key to that API and monitor quota. Redeploy. No scraping fallback: missing credentials return an explicit unavailable response.
- Set RAPIDAPI_KEY only with an authorized, working caption provider subscription; its endpoints may require provider-specific configuration. Manual caption analysis works independently.
- GROQ_API_KEY is optional for user-owned media transcription (4 MB max on this deployment). Pasted transcript analysis is local; automatic arbitrary-video captions are not provided.
- Confirm NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_CONTACT_EMAIL and NEXT_PUBLIC_ALLOW_INDEXING=true on production, not preview. Verify robots.txt and sitemap.xml.
- Media downloaders and incomplete or misleading tools are excluded from the active catalog; their existing routes show maintenance notices and noindex. Re-enable individual tools only after implementing and testing them.
- ads.txt and the existing AdSense verification meta tag remain intact. Manual ads require genuine numeric slot IDs; placeholders and download interstitials are disabled. Configure Google-certified consent management and review ad placement before enabling ads. Google determines approval; this code cannot guarantee approval.
- Verify contact email delivery and review legal notices for actual service practices. Check the production URL and run real-video, invalid-link, quota-failure, mobile, download and calculator smoke tests.
