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

## Restored utility modules

Text, image, file, browser-device and network utility workspaces now cover 93 additional routes. The active catalog excludes AI image enhancement, PDF rendering/OCR/encryption and Instagram/Facebook media downloaders until real dependencies or authorized integrations are available. Browser-specific media features must be tested on Chrome, Firefox, Safari and mobile. Some tools are explicitly estimates (token count, keyword coverage, network speed), lossless PDF rewriting, visual signing, or manual previews. No external scripts or new npm dependencies were added.

## Advanced utilities

AI Image Enhancer uses the trained UpscalerJS default 2× ESRGAN model; PDF to JPG and scanned PDF OCR use PDF.js and Tesseract.js; Protect PDF uses AES-256 via @pdfsmaller/pdf-encrypt. Browser assets are prepared from pinned upstream npm tarballs by `npm run prepare:advanced` (automatically before `npm run dev` and `npm run build`); an internet connection is needed for initial preparation, and npm and tar must be available. Generated assets are not committed, and no changes to the existing dependency lockfile are required. Review output and test encrypted documents in a separate PDF reader. OCR language files may be fetched by Tesseract.

The two Meta downloader routes use the official Graph API and are gated by `NEXT_PUBLIC_ENABLE_DOWNLOADERS=true` (false by default). Visitors must supply their own authorized access token and media ID or supported URL. Do not configure a shared server-side Meta token. No arbitrary public post scraping or proxying. Instagram search by permalink is limited to the first 150 media items; media IDs can be entered directly. Facebook short share URLs are not resolved. Signed output links can expire. Test with actual authorized accounts before enabling indexing/advertising. The legacy social-fetch endpoint is retired.
