import { siteConfig } from "@/config/site";

export type ToolMode = "image" | "pdf" | "text" | "code" | "calculator" | "generator" | "media" | "file";

export type Category = { slug: string; name: string; description: string; icon: string; tools: string[] };
export type Tool = {
  slug: string; name: string; categorySlug: string; categoryName: string; description: string; icon: string; mode: ToolMode;
  seoTitle: string; metaDescription: string; primaryKeyword: string; secondaryKeywords: string[]; canonical: string;
  faqs: { question: string; answer: string }[];
};

const categories: Category[] = [
  { slug: "image-converters", name: "Image Converters", description: "Convert and optimize every common image format.", icon: "◈", tools: ["jpg-to-png|JPG to PNG Converter", "png-to-jpg|PNG to JPG Converter", "webp-to-jpg|WEBP to JPG Converter", "webp-to-png|WEBP to PNG Converter", "jpg-to-webp|JPG to WEBP Converter", "heic-to-jpg|HEIC to JPG Converter", "svg-to-png|SVG to PNG Converter", "ico-converter|ICO Converter"] },
  { slug: "image-editing", name: "Image Editing & Enhancement", description: "Polish, resize, crop, and prepare images locally.", icon: "✦", tools: ["ai-image-enhancer|AI Image Enhancer", "image-compressor|Image Compressor", "image-resizer|Image Resizer", "image-cropper|Image Cropper", "passport-photo-maker|Passport Photo Maker", "watermark-adder|Watermark Adder", "image-color-picker|Image Color Picker", "blur-face-censor|Blur Face Censor"] },
  { slug: "pdf-tools", name: "PDF Core Tools", description: "Everyday PDF organization and editing tools.", icon: "▣", tools: ["merge-pdf|Merge PDF", "split-pdf|Split PDF", "compress-pdf|Compress PDF", "organize-pdf-pages|Organize PDF Pages", "add-page-numbers-pdf|Add Page Numbers to PDF", "add-watermark-pdf|Add Watermark to PDF"] },
  { slug: "pdf-converters", name: "PDF Converters", description: "Move between PDFs, images, HTML, and Markdown.", icon: "▤", tools: ["image-to-pdf|Image to PDF", "pdf-to-jpg|PDF to JPG", "markdown-to-pdf|Markdown to PDF", "html-to-pdf|HTML to PDF"] },
  { slug: "pdf-security", name: "PDF Security & Signing", description: "Sign, protect, and prepare PDF documents.", icon: "◇", tools: ["esign-pdf|eSign PDF", "protect-pdf|Protect PDF", "flatten-pdf|Flatten PDF"] },
  { slug: "video-tools", name: "Video Tools", description: "Private browser-based video editing utilities.", icon: "▶", tools: ["video-trimmer|Video Trimmer", "video-to-gif|Video to GIF", "mute-video|Mute Video", "video-speed-controller|Video Speed Controller"] },
  { slug: "audio-tools", name: "Audio & Voice Tools", description: "Record, trim, join, and synthesize audio.", icon: "◖", tools: ["voice-recorder|Voice Recorder", "audio-cutter|Audio Cutter", "audio-joiner|Audio Joiner", "text-to-speech|Text to Speech"] },
  { slug: "text-tools", name: "Text & Writing Utilities", description: "Clean up, transform, and analyze writing.", icon: "Aa", tools: ["word-character-counter|Word & Character Counter", "case-converter|Case Converter", "remove-duplicate-lines|Remove Duplicate Lines", "text-diff-checker|Text Diff Checker", "lorem-ipsum-generator|Lorem Ipsum Generator", "fancy-text-generator|Fancy Text Generator"] },
  { slug: "developer-tools", name: "Developer & Code Tools", description: "Format, validate, encode, and inspect code.", icon: "</>", tools: ["json-formatter-validator|JSON Formatter & Validator", "json-csv-yaml-converter|JSON CSV YAML Converter", "jwt-decoder|JWT Decoder", "regex-tester|Regex Tester", "base64-encoder-decoder|Base64 Encoder Decoder", "url-encoder-decoder|URL Encoder Decoder", "code-minifier-beautifier|Code Minifier & Beautifier", "cron-expression-generator|Cron Expression Generator"] },
  { slug: "seo-tools", name: "SEO & Webmaster Tools", description: "Build search-ready content and technical SEO assets.", icon: "⌁", tools: ["meta-tag-generator|Meta Tag Generator", "robots-txt-generator|Robots.txt Generator", "xml-sitemap-generator|XML Sitemap Generator", "keyword-density-checker|Keyword Density Checker", "url-slug-generator|URL Slug Generator", "utm-link-builder|UTM Link Builder"] },
  { slug: "security-generators", name: "Security, Crypto & Generators", description: "Generate secure values and check local data.", icon: "⌘", tools: ["password-generator|Password Generator", "hash-generator|Hash Generator", "uuid-generator|UUID Generator", "qr-code-generator|QR Code Generator", "qr-barcode-scanner|QR & Barcode Scanner"] },
  { slug: "color-css-tools", name: "Color & CSS Design Tools", description: "Create accessible visual systems and CSS.", icon: "◉", tools: ["color-converter|Color Converter", "css-gradient-generator|CSS Gradient Generator", "css-box-shadow-generator|CSS Box Shadow Generator", "css-glassmorphism-generator|CSS Glassmorphism Generator", "wcag-contrast-checker|WCAG Contrast Checker", "favicon-pack-generator|Favicon Pack Generator"] },
  { slug: "finance-calculators", name: "Financial & Tax Calculators", description: "Make clearer everyday financial decisions.", icon: "₹", tools: ["sip-mutual-fund-calculator|SIP Mutual Fund Calculator", "emi-loan-calculator|EMI Loan Calculator", "gst-calculator|GST Calculator", "compound-interest-fd-calculator|Compound Interest & FD Calculator", "in-hand-salary-calculator|In-Hand Salary Calculator", "profit-margin-calculator|Profit Margin Calculator"] },
  { slug: "math-health-calculators", name: "Math, Health & Everyday Calculators", description: "Quick calculations for the things that matter.", icon: "∑", tools: ["age-calculator|Age Calculator", "percentage-calculator|Percentage Calculator", "bmi-bmr-calorie-calculator|BMI BMR Calorie Calculator", "date-difference-calculator|Date Difference Calculator", "cgpa-to-percentage-calculator|CGPA to Percentage Calculator"] },
  { slug: "unit-converters", name: "Unit & Measurement Converters", description: "Convert units with reliable instant results.", icon: "↔", tools: ["length-area-converter|Length & Area Converter", "weight-mass-converter|Weight & Mass Converter", "digital-storage-converter|Digital Storage Converter", "speed-temperature-converter|Speed & Temperature Converter", "number-base-converter|Number Base Converter"] },
  { slug: "time-productivity", name: "Time & Productivity Tools", description: "Plan, focus, and translate time effortlessly.", icon: "◷", tools: ["timezone-converter|Timezone Converter", "pomodoro-focus-timer|Pomodoro Focus Timer", "unix-timestamp-converter|Unix Timestamp Converter"] },
  { slug: "data-spreadsheet-tools", name: "Data & Spreadsheet Utilities", description: "Move data between useful formats.", icon: "▦", tools: ["csv-excel-converter|CSV Excel Converter", "csv-viewer-cleaner|CSV Viewer & Cleaner", "sql-formatter|SQL Formatter", "markdown-table-generator|Markdown Table Generator", "mock-json-generator|Mock JSON Generator"] },
  { slug: "creator-tools", name: "Social Media & Creator Tools", description: "AdSense-safe public metadata and planning utilities for YouTube creators.", icon: "✺", tools: ["youtube-thumbnail-downloader|YouTube Thumbnail Downloader", "youtube-title-description-extractor|YouTube Title & Description Extractor", "youtube-tag-extractor|YouTube Tag Extractor", "youtube-hashtag-generator|YouTube Hashtag Generator", "youtube-title-ctr-previewer|YouTube Title CTR Previewer", "youtube-embed-code-generator|YouTube Embed Code Generator", "youtube-timestamp-chapter-generator|YouTube Timestamp Chapter Generator", "youtube-money-rpm-calculator|YouTube Money RPM Calculator", "youtube-transcript-generator|YouTube Transcript Generator", "aspect-ratio-calculator|Aspect Ratio Calculator"] },
  { slug: "document-helpers", name: "Document & Resume Helpers", description: "Create polished business and personal documents.", icon: "▱", tools: ["online-signature-pad|Online Signature Pad", "gst-invoice-generator|GST Invoice Generator", "privacy-policy-generator|Privacy Policy Generator"] },
  { slug: "network-diagnostics", name: "Network & Browser Diagnostics", description: "Understand the browser and connection in use.", icon: "⌁", tools: ["what-is-my-ip|What Is My IP", "internet-speed-latency-test|Internet Speed & Latency Test"] },
  { slug: "ocr-tools", name: "OCR & Text Extraction", description: "Extract usable text from local images and PDFs.", icon: "▤", tools: ["image-to-text-ocr|Image to Text OCR", "scanned-pdf-to-text|Scanned PDF to Text"] },
  { slug: "ai-prompt-tools", name: "AI & LLM Prompt Utilities", description: "Clean, count, and structure AI-ready content.", icon: "✳", tools: ["llm-token-counter|LLM Token Counter", "markdown-to-clean-text|Markdown to Clean Text", "subtitle-srt-cleaner|Subtitle SRT Cleaner", "json-schema-builder|JSON Schema Builder"] },
  { slug: "ecommerce-tools", name: "E-Commerce & Seller Tools", description: "Prepare marketplace-ready labels and product media.", icon: "▢", tools: ["ecommerce-label-cropper|E-Commerce Label Cropper", "product-white-bg-maker|Product White Background Maker", "sku-barcode-sheet-generator|SKU Barcode Sheet Generator"] },
  { slug: "exam-form-tools", name: "Student, Exam & Govt Form Utilities", description: "Prepare compliant photos and application documents.", icon: "✓", tools: ["exam-photo-signature-resizer|Exam Photo & Signature Resizer", "photo-name-date-maker|Photo Name & Date Maker", "resume-ats-keyword-checker|Resume ATS Keyword Checker"] },
  { slug: "hardware-testers", name: "Screen, Webcam & Hardware Testers", description: "Test browser-accessible devices and displays.", icon: "▰", tools: ["online-screen-recorder|Online Screen Recorder", "webcam-mic-tester|Webcam & Mic Tester", "keyboard-mouse-tester|Keyboard & Mouse Tester", "dead-pixel-monitor-test|Dead Pixel Monitor Test", "speaker-stereo-test|Speaker Stereo Test"] },
  { slug: "svg-vector-tools", name: "SVG & Vector Utilities", description: "Optimize and adapt vector markup for the web.", icon: "⌬", tools: ["svg-optimizer|SVG Optimizer", "svg-to-jsx-converter|SVG to JSX Converter", "css-blob-clip-path-generator|CSS Blob Clip Path Generator"] },
  { slug: "accounting-split-tools", name: "Accounting & Split Utilities", description: "Calculate shared costs and practical tax paperwork.", icon: "÷", tools: ["bill-splitter-calculator|Bill Splitter Calculator", "emi-prepayment-calculator|EMI Prepayment Calculator", "hra-rent-receipt-generator|HRA Rent Receipt Generator"] },
  { slug: "privacy-metadata-tools", name: "Privacy & Metadata Cleaners", description: "Inspect and remove hidden data locally.", icon: "◌", tools: ["exif-metadata-remover|EXIF Metadata Remover", "luhn-test-card-validator|Luhn Test Card Validator"] },
];

const modeFor = (categorySlug: string, slug: string): ToolMode => {
  if (["image-converters", "image-editing", "ecommerce-tools", "exam-form-tools", "privacy-metadata-tools"].includes(categorySlug)) return "image";
  if (["pdf-tools", "pdf-converters", "pdf-security"].includes(categorySlug)) return "pdf";
  if (["finance-calculators", "math-health-calculators", "unit-converters", "accounting-split-tools"].includes(categorySlug) || slug.includes("calculator")) return "calculator";
  if (["text-tools", "ai-prompt-tools"].includes(categorySlug)) return "text";
  if (["developer-tools", "seo-tools", "svg-vector-tools", "data-spreadsheet-tools"].includes(categorySlug)) return "code";
  if (["security-generators", "color-css-tools", "document-helpers"].includes(categorySlug)) return "generator";
  if (["video-tools", "audio-tools", "hardware-testers", "ocr-tools", "creator-tools"].includes(categorySlug)) return "media";
  return "file";
};

export const allTools: Tool[] = categories.flatMap((category) => category.tools.map((record) => {
  const [slug, name] = record.split("|");
  const primaryKeyword = `${name.toLowerCase()} online free`;
  const seoTitle = `${name} Online Free — XYZ Tools`.slice(0, 59);
  const metaDescription = `Use our free ${name.toLowerCase()} online with no sign-up, no watermark, and 100% browser-local privacy. Start instantly for a fast, secure result today.`.slice(0, 160);
  return {
    slug, name, categorySlug: category.slug, categoryName: category.name, description: `${category.description} Use ${name} instantly with no signup and browser-local processing.`, icon: category.icon, mode: modeFor(category.slug, slug),
    seoTitle,
    metaDescription,
    primaryKeyword,
    secondaryKeywords: [`free ${name.toLowerCase()}`, `${name.toLowerCase()} without signup`, `private ${name.toLowerCase()}`, `fast ${name.toLowerCase()}`, `online ${name.toLowerCase()} tool`, `best ${name.toLowerCase()} online`],
    canonical: `${siteConfig.url}/tools/${slug}`,
    faqs: [
      { question: `Is ${name} free to use?`, answer: `Yes. ${name} is free to use with no account, trial, or hidden download step.` },
      { question: `Is ${name} private?`, answer: "Your work stays in your browser whenever the tool supports local processing. We do not require a file upload account." },
      { question: `Can I use ${name} on mobile?`, answer: "Yes. This workspace is designed for touch-friendly use on phones, tablets, and desktops." },
      { question: `Do I need to install software?`, answer: "No. Open the tool in a modern browser and start immediately." },
    ],
  };
}));

export { categories };
export const popularTools = ["image-compressor", "jpg-to-png", "merge-pdf", "word-character-counter", "json-formatter-validator", "qr-code-generator", "emi-loan-calculator", "image-to-text-ocr", "password-generator", "exam-photo-signature-resizer"];
export const getTool = (slug: string) => allTools.find((tool) => tool.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const toolsForCategory = (slug: string) => allTools.filter((tool) => tool.categorySlug === slug);
export const relatedTools = (tool: Tool) => [...toolsForCategory(tool.categorySlug).filter((item) => item.slug !== tool.slug), ...allTools.filter((item) => item.categorySlug !== tool.categorySlug)].slice(0, 6);
