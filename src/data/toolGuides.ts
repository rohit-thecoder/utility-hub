export type ToolGuide={task:string;example:string;limit:string};
export const toolGuides: Record<string,ToolGuide> = {
  "jpg-to-png": {
    "task": "Convert a JPEG photograph to a PNG file.",
    "example": "Choose a JPEG from your camera or gallery and export PNG.",
    "limit": "Changing format does not restore detail lost by JPEG compression."
  },
  "png-to-jpg": {
    "task": "Convert PNG graphics into JPEG images for sharing.",
    "example": "Choose a PNG and adjust JPEG quality if offered.",
    "limit": "JPEG cannot preserve transparency."
  },
  "webp-to-jpg": {
    "task": "Turn a WebP image into a widely supported JPEG.",
    "example": "Choose a downloaded WebP image and save JPEG.",
    "limit": "Animated WebP is not exported as animation."
  },
  "webp-to-png": {
    "task": "Convert WebP into a PNG image.",
    "example": "Use PNG for screenshots or graphics that need transparency.",
    "limit": "A conversion cannot recover detail already lost."
  },
  "jpg-to-webp": {
    "task": "Encode a JPEG as WebP for web publishing.",
    "example": "Export a product photograph and compare the new file size.",
    "limit": "Quality and savings depend on the original image."
  },
  "heic-to-jpg": {
    "task": "Convert HEIC photos into compatible JPEG files.",
    "example": "Select a HEIC camera photo and download the result.",
    "limit": "Decoding depends on supported HEIC variants and device memory."
  },
  "svg-to-png": {
    "task": "Rasterize SVG artwork into a PNG bitmap.",
    "example": "Convert a vector logo for a document or preview.",
    "limit": "External SVG resources and unsupported fonts may not render."
  },
  "ico-converter": {
    "task": "Make a genuine Windows ICO icon from an image.",
    "example": "Choose a square logo for a browser favicon.",
    "limit": "Inspect the icon at small sizes before publishing."
  },
  "ai-image-enhancer": {
    "task": "Upscale a small image using a trained 2× neural network.",
    "example": "Try a 256-pixel photograph to produce a larger image.",
    "limit": "Maximum 768 pixels per side and 400,000 input pixels; inferred detail is not original evidence."
  },
  "image-compressor": {
    "task": "Re-encode a photograph at a lower quality to reduce file size.",
    "example": "Try several quality settings and compare the result.",
    "limit": "Compression can remove fine detail and may not shrink an already optimized file."
  },
  "image-resizer": {
    "task": "Change the pixel dimensions of an image.",
    "example": "Prepare a smaller copy for a profile or upload.",
    "limit": "Inspect the output dimensions and aspect ratio before submitting."
  },
  "image-cropper": {
    "task": "Cut a rectangular region from an image using pixel coordinates.",
    "example": "Enter x=20, y=20, width=200 and height=200 for a sufficiently large image.",
    "limit": "The selected rectangle must lie inside the source image."
  },
  "passport-photo-maker": {
    "task": "Prepare a photo at a specified pixel width and height.",
    "example": "Enter the dimensions required by your application form.",
    "limit": "This does not verify identity-photo background, pose or official compliance."
  },
  "watermark-adder": {
    "task": "Overlay text on a photograph with adjustable opacity.",
    "example": "Add your own copyright notice at 50% opacity.",
    "limit": "Watermarks do not prevent copying."
  },
  "image-color-picker": {
    "task": "Read the hexadecimal and RGBA value of a selected pixel.",
    "example": "Click the preview or enter pixel coordinates.",
    "limit": "Color values describe the decoded image, not a calibrated physical sample."
  },
  "blur-face-censor": {
    "task": "Blur a manually selected rectangular area of an image.",
    "example": "Specify the position and size around a face.",
    "limit": "This is manual blur, not automatic face detection or guaranteed anonymization."
  },
  "merge-pdf": {
    "task": "Combine selected PDF files into a single document.",
    "example": "Choose documents in the desired order and merge.",
    "limit": "Review ordering, page count and interactive elements before distribution."
  },
  "split-pdf": {
    "task": "Extract selected pages from an existing PDF.",
    "example": "Enter 1-3,5 to copy pages one through three and five.",
    "limit": "Encrypted input may need unlocking first."
  },
  "compress-pdf": {
    "task": "Rewrite PDF structure with lossless object-stream compression.",
    "example": "Compare output bytes with the original document.",
    "limit": "This does not downsample images and may leave the original unchanged."
  },
  "organize-pdf-pages": {
    "task": "Copy PDF pages in a new order.",
    "example": "Enter 3,1,2 to reorder a three-page document.",
    "limit": "Repeated or omitted page numbers change the output page count."
  },
  "add-page-numbers-pdf": {
    "task": "Stamp sequential page numbers onto a PDF.",
    "example": "Start at 1 or use a custom starting number.",
    "limit": "Existing footer content may overlap the new text."
  },
  "add-watermark-pdf": {
    "task": "Place translucent text across PDF pages.",
    "example": "Use a label such as DRAFT on a review document.",
    "limit": "A visual watermark is not access control."
  },
  "image-to-pdf": {
    "task": "Package selected images into a PDF document.",
    "example": "Choose several scans to create a multipage file.",
    "limit": "Review page order and legibility."
  },
  "pdf-to-jpg": {
    "task": "Render selected PDF pages into JPEG images.",
    "example": "Choose pages 1-3 and a 2× rendering scale.",
    "limit": "Multiple pages download as a ZIP; rendering resolution is bounded."
  },
  "markdown-to-pdf": {
    "task": "Render Markdown into a printable document.",
    "example": "Paste a heading, paragraphs and a table, then print to PDF.",
    "limit": "Browser print dialog is required; scripts and remote images are excluded."
  },
  "html-to-pdf": {
    "task": "Prepare safe HTML content for browser printing.",
    "example": "Paste a simple heading and formatted paragraphs.",
    "limit": "Scripts, external images and custom styles are not preserved."
  },
  "esign-pdf": {
    "task": "Add a visible typed signature to a selected PDF page.",
    "example": "Enter your own signature text and page number.",
    "limit": "This is not a certified digital signature or identity verification."
  },
  "protect-pdf": {
    "task": "Apply AES-256 password encryption to a PDF.",
    "example": "Use a strong password and verify the result in a separate PDF reader.",
    "limit": "Existing encrypted files must be unlocked first; forgotten passwords cannot be recovered here."
  },
  "flatten-pdf": {
    "task": "Flatten interactive PDF form fields into page content.",
    "example": "Use a completed form with fillable fields.",
    "limit": "Arbitrary annotations and all document interactivity are not necessarily flattened."
  },
  "video-trimmer": {
    "task": "Record a selected time interval from a local video.",
    "example": "Choose a clip and enter start 2 and end 8 seconds.",
    "limit": "Codec support and export timing depend on the browser; output is capped at 120 seconds."
  },
  "video-to-gif": {
    "task": "Convert a short video segment into an animated GIF.",
    "example": "Choose a 3-second segment for a looping preview.",
    "limit": "GIF output uses reduced resolution, frame rate and colors."
  },
  "mute-video": {
    "task": "Create a copy of a video without audio.",
    "example": "Choose a short video and process it locally.",
    "limit": "The browser re-encodes the video; original quality may change."
  },
  "video-speed-controller": {
    "task": "Re-record a video at a different playback speed.",
    "example": "Use 2× for a shorter clip or 0.5× for a slower one.",
    "limit": "Supported codecs and timing vary by browser."
  },
  "voice-recorder": {
    "task": "Record sound using your microphone.",
    "example": "Grant permission, record a short note, then stop and save.",
    "limit": "HTTPS and microphone permissions are required."
  },
  "audio-cutter": {
    "task": "Extract a time interval from decoded audio into WAV.",
    "example": "Enter 5 and 15 seconds for a ten-second segment.",
    "limit": "The browser must support the input codec."
  },
  "audio-joiner": {
    "task": "Concatenate selected audio tracks into a WAV file.",
    "example": "Select clips in the order you want them joined.",
    "limit": "Output may be larger than compressed source files."
  },
  "text-to-speech": {
    "task": "Read text aloud using the browser speech synthesis interface.",
    "example": "Paste a paragraph and choose Read aloud.",
    "limit": "Available voices and whether they use remote services depend on the device."
  },
  "word-character-counter": {
    "task": "Count words and characters in pasted text.",
    "example": "Paste a draft to check its length.",
    "limit": "Word boundaries can differ across languages and editors."
  },
  "case-converter": {
    "task": "Transform text into common capitalization formats.",
    "example": "Convert a sentence to uppercase or lowercase.",
    "limit": "Inspect names and acronyms after conversion."
  },
  "remove-duplicate-lines": {
    "task": "Keep distinct lines from a pasted list.",
    "example": "Paste a list containing repeated entries.",
    "limit": "Whitespace and letter case can affect matching."
  },
  "text-diff-checker": {
    "task": "Compare two texts line by line and identify additions and removals.",
    "example": "Paste an original draft and a revised draft.",
    "limit": "Large comparisons are bounded to avoid excessive browser memory use."
  },
  "lorem-ipsum-generator": {
    "task": "Create placeholder prose for a layout.",
    "example": "Generate filler text to test a webpage design.",
    "limit": "Placeholder text is not meaningful finished copy."
  },
  "fancy-text-generator": {
    "task": "Generate Unicode-styled variants of Latin letters.",
    "example": "Try a short social profile name.",
    "limit": "Decorative characters may reduce accessibility and searchability."
  },
  "number-to-words-converter": {
    "task": "Write a number using words.",
    "example": "Try 1250 when preparing a receipt or draft.",
    "limit": "Check the supported number range and wording convention."
  },
  "morse-code-binary-translator": {
    "task": "Translate supported text to Morse code or binary representations.",
    "example": "Try a short word such as SOS.",
    "limit": "Review unsupported characters and spacing."
  },
  "roman-numeral-converter": {
    "task": "Convert between ordinary integers and Roman numerals.",
    "example": "Try 2026 or MMXXVI.",
    "limit": "Use the supported conventional Roman numeral range."
  },
  "ascii-text-banner-generator": {
    "task": "Turn a short phrase into a text banner.",
    "example": "Try a title for a plain-text document.",
    "limit": "Output is intended for a monospaced font."
  },
  "json-formatter-validator": {
    "task": "Validate JSON syntax and format JSON for readability.",
    "example": "Paste an object with nested arrays.",
    "limit": "Valid syntax does not guarantee that a payload matches an API schema."
  },
  "json-csv-yaml-converter": {
    "task": "Convert JSON object arrays to CSV, CSV to JSON, or JSON to YAML-compatible syntax.",
    "example": "Try an array containing name and score fields.",
    "limit": "YAML input parsing is not currently supported."
  },
  "jwt-decoder": {
    "task": "Read the encoded header and payload of a JWT.",
    "example": "Use a non-sensitive test token.",
    "limit": "Decoding does not verify a signature or establish trust."
  },
  "regex-tester": {
    "task": "Test a regular expression against example text.",
    "example": "Try a pattern for matching digits.",
    "limit": "Complex expressions may be slow; avoid untrusted patterns."
  },
  "base64-encoder-decoder": {
    "task": "Encode UTF-8 text as Base64 or decode Base64 to text.",
    "example": "Encode Hello or decode a known valid string.",
    "limit": "Base64 is encoding, not encryption."
  },
  "url-encoder-decoder": {
    "task": "Percent-encode or decode URL text.",
    "example": "Try a search phrase containing spaces and punctuation.",
    "limit": "Do not double-encode an already encoded URL."
  },
  "code-minifier-beautifier": {
    "task": "Minify or format JSON and clean CSS line whitespace.",
    "example": "Paste a JSON object and choose beautify.",
    "limit": "JavaScript minification and full CSS parsing are not implemented."
  },
  "cron-expression-generator": {
    "task": "Build a five-field cron expression from numeric fields or wildcards.",
    "example": "Use minute 0, hour 9 and weekday 1 for a weekly schedule.",
    "limit": "The scheduler determines timezone and supported syntax."
  },
  "meta-tag-generator": {
    "task": "Generate escaped title, description and canonical HTML tags.",
    "example": "Enter a real page title and its canonical URL.",
    "limit": "Review page-specific metadata before publishing."
  },
  "robots-txt-generator": {
    "task": "Generate a robots.txt configuration draft.",
    "example": "Set crawler rules for your own website.",
    "limit": "Robots rules do not protect private data or guarantee deindexing."
  },
  "xml-sitemap-generator": {
    "task": "Build sitemap XML from supplied URLs.",
    "example": "Enter canonical public page URLs.",
    "limit": "Include only accessible pages intended for indexing."
  },
  "keyword-density-checker": {
    "task": "Count keyword occurrence patterns in text.",
    "example": "Paste an article and inspect repeated words.",
    "limit": "Keyword density is not a search ranking score."
  },
  "url-slug-generator": {
    "task": "Create a readable URL slug from text.",
    "example": "Convert a page title into a hyphen-separated slug.",
    "limit": "Review non-Latin text and avoid changing published URLs without redirects."
  },
  "utm-link-builder": {
    "task": "Append campaign tracking parameters to a URL.",
    "example": "Add source newsletter and medium email to a campaign link.",
    "limit": "UTM parameters identify traffic only if analytics is configured."
  },
  "password-generator": {
    "task": "Generate random passwords using browser cryptography.",
    "example": "Generate a password and store it in a trusted password manager.",
    "limit": "Do not reuse passwords; estimated entropy assumes independent uniform sampling."
  },
  "hash-generator": {
    "task": "Calculate a SHA-256 digest of text.",
    "example": "Compare a known input with its expected digest.",
    "limit": "Hashing is not encryption or a password-storage scheme by itself."
  },
  "uuid-generator": {
    "task": "Generate random version-4 UUID values.",
    "example": "Create identifiers for local test records.",
    "limit": "Random identifiers are not authentication credentials."
  },
  "qr-code-generator": {
    "task": "Encode text or a URL as a QR image.",
    "example": "Create a QR for your own website and test it with a scanner.",
    "limit": "Anyone who scans the code can read the encoded content."
  },
  "qr-barcode-scanner": {
    "task": "Read barcodes from a selected image using the browser detector.",
    "example": "Choose a clear photograph of a QR code.",
    "limit": "BarcodeDetector availability varies by browser and device."
  },
  "color-converter": {
    "task": "Convert a hexadecimal color into RGB and HSL values.",
    "example": "Try #1d4ed8 to obtain numerical color values.",
    "limit": "These are sRGB-style representations, not print color profiles."
  },
  "css-gradient-generator": {
    "task": "Create linear-gradient CSS from two colors and an angle.",
    "example": "Choose blue, orange and 90 degrees.",
    "limit": "Copy the CSS into an appropriate style rule."
  },
  "css-box-shadow-generator": {
    "task": "Build CSS box-shadow values from offsets, blur, spread and opacity.",
    "example": "Use a vertical offset of 8 pixels for a card shadow.",
    "limit": "Visual appearance depends on surrounding colors and geometry."
  },
  "css-glassmorphism-generator": {
    "task": "Create translucent CSS with backdrop blur and rounded corners.",
    "example": "Try a 12-pixel blur with 20% white opacity.",
    "limit": "Check text contrast and browser support."
  },
  "wcag-contrast-checker": {
    "task": "Compute foreground/background contrast using relative luminance.",
    "example": "Test black text on white for a 21:1 ratio.",
    "limit": "Transparency, images and complex backgrounds need separate assessment."
  },
  "favicon-pack-generator": {
    "task": "Export several PNG icon sizes and an ICO file in a ZIP.",
    "example": "Use a square logo and inspect the 16-pixel version.",
    "limit": "Add the appropriate link tags or manifest entries yourself."
  },
  "sip-mutual-fund-calculator": {
    "task": "Estimate future value of monthly investments using a chosen annual return.",
    "example": "Compare different monthly contributions and durations.",
    "limit": "Returns are hypothetical and not guaranteed."
  },
  "emi-loan-calculator": {
    "task": "Estimate monthly installments using loan principal, annual interest and tenure.",
    "example": "Compare the effect of a longer repayment period.",
    "limit": "Fees, variable rates and lender rounding are excluded."
  },
  "gst-calculator": {
    "task": "Estimate tax-inclusive and tax-exclusive amounts using an entered GST rate.",
    "example": "Use the applicable rate for an invoice calculation.",
    "limit": "This does not determine the legal tax classification."
  },
  "compound-interest-fd-calculator": {
    "task": "Estimate compound growth on a principal balance.",
    "example": "Compare a deposit over different years and annual rates.",
    "limit": "Tax and actual bank compounding conventions may differ."
  },
  "in-hand-salary-calculator": {
    "task": "Subtract entered tax, PF and other deductions from monthly gross pay.",
    "example": "Enter figures from your payslip.",
    "limit": "This is not an automatic income-tax or statutory contribution calculation."
  },
  "profit-margin-calculator": {
    "task": "Calculate profit, margin and markup from revenue and cost.",
    "example": "Revenue 100 and cost 75 produces a 25% margin.",
    "limit": "Use consistent currency and cost accounting."
  },
  "fuel-cost-mileage-calculator": {
    "task": "Estimate fuel consumption and trip cost using distance, efficiency and fuel price.",
    "example": "Compare two vehicles on the same route.",
    "limit": "Actual mileage varies with traffic and driving conditions."
  },
  "electricity-bill-calculator": {
    "task": "Estimate electricity cost from power, usage and tariff.",
    "example": "Compare daily use of two appliances.",
    "limit": "Actual utility tariffs can include slabs, taxes and fixed charges."
  },
  "shopping-discount-calculator": {
    "task": "Calculate estimated savings and final shopping price.",
    "example": "Enter an original price and discount percentage.",
    "limit": "Check taxes and store-specific discount conditions."
  },
  "age-calculator": {
    "task": "Compute completed years and elapsed UTC days between dates.",
    "example": "Enter a birth date and an as-of date.",
    "limit": "Legal age rules can differ from this arithmetic estimate."
  },
  "percentage-calculator": {
    "task": "Calculate a percentage amount using supplied values.",
    "example": "Find 15% of 200.",
    "limit": "Check which value is the base before interpreting the result."
  },
  "bmi-bmr-calorie-calculator": {
    "task": "Estimate adult BMI, resting energy and daily maintenance calories.",
    "example": "Enter weight, height, age and activity factor.",
    "limit": "General adult estimates are not medical advice or individual dietary targets."
  },
  "date-difference-calculator": {
    "task": "Find the signed elapsed days and weeks between dates.",
    "example": "Compare two dates in a project schedule.",
    "limit": "The result is not a count of business days or an inclusive date count."
  },
  "cgpa-to-percentage-calculator": {
    "task": "Multiply CGPA by a chosen conversion factor.",
    "example": "Enter your institution’s official multiplier.",
    "limit": "Conversion rules vary across universities."
  },
  "sleep-cycle-water-calculator": {
    "task": "Calculate general sleep-cycle and hydration estimates.",
    "example": "Compare wake-up times or enter the requested hydration inputs.",
    "limit": "These are general estimates, not medical recommendations."
  },
  "length-area-converter": {
    "task": "Convert between compatible length or area units.",
    "example": "Convert metres to feet or square metres to square feet.",
    "limit": "Length and area cannot be converted directly into one another."
  },
  "weight-mass-converter": {
    "task": "Convert mass units such as kilograms, grams and pounds.",
    "example": "Convert 1 kg to pounds.",
    "limit": "The tool converts mass, not gravitational force."
  },
  "digital-storage-converter": {
    "task": "Convert decimal and binary data storage units.",
    "example": "Compare 1 GB in MB and MiB.",
    "limit": "Decimal GB and binary GiB are different."
  },
  "speed-temperature-converter": {
    "task": "Convert compatible speed units or temperature scales.",
    "example": "Convert 32 °F to 0 °C.",
    "limit": "Speed and temperature are separate measurement types."
  },
  "number-base-converter": {
    "task": "Convert integers among bases 2 through 36.",
    "example": "Convert hexadecimal ff to decimal 255.",
    "limit": "Digits must be valid in the source base; fractions are not supported."
  },
  "timezone-converter": {
    "task": "Display an offset-aware date and time in an IANA timezone.",
    "example": "Convert a UTC timestamp to Asia/Kolkata.",
    "limit": "Include Z or an explicit source offset to avoid ambiguity."
  },
  "pomodoro-focus-timer": {
    "task": "Run a configurable focus countdown with pause and resume.",
    "example": "Set a 25-minute work interval.",
    "limit": "Browser throttling or closing the tab can affect notifications."
  },
  "unix-timestamp-converter": {
    "task": "Convert seconds or milliseconds since the Unix epoch and ISO dates.",
    "example": "Convert 0 seconds to 1970-01-01 UTC.",
    "limit": "Choose the correct seconds or milliseconds unit."
  },
  "online-notepad-scratchpad": {
    "task": "Write and keep scratch notes in local browser storage.",
    "example": "Draft a checklist or quick idea.",
    "limit": "Clearing site data or private browsing can remove notes."
  },
  "daily-todo-checklist-maker": {
    "task": "Manage a simple checklist on this browser.",
    "example": "Add a few tasks and mark them complete.",
    "limit": "Data is not synced between devices."
  },
  "spin-the-wheel-random-picker": {
    "task": "Choose a random entry from a supplied list.",
    "example": "Enter several project topics for a random choice.",
    "limit": "Not intended for regulated lotteries or security-critical randomness."
  },
  "online-tally-counter": {
    "task": "Increment or decrement a simple count.",
    "example": "Count repetitions or inventory items.",
    "limit": "Keep an independent record for important counts."
  },
  "typing-speed-test-wpm": {
    "task": "Estimate typing speed from a timed practice text.",
    "example": "Type the supplied passage as accurately as possible.",
    "limit": "WPM and accuracy conventions vary among typing tests."
  },
  "online-meme-generator": {
    "task": "Combine an image and caption text into a meme.",
    "example": "Use an image you own and add a short caption.",
    "limit": "Respect copyright and consent when sharing."
  },
  "daily-habit-streak-tracker": {
    "task": "Track daily habit progress in this browser.",
    "example": "Mark a habit after completing it today.",
    "limit": "Clearing local site storage can erase history."
  },
  "csv-excel-converter": {
    "task": "Convert CSV to an Excel workbook or the first worksheet back to CSV.",
    "example": "Try a simple table with names and scores.",
    "limit": "CSV cannot preserve multiple sheets, styling or formulas."
  },
  "csv-viewer-cleaner": {
    "task": "Parse CSV, trim cell whitespace and remove identical rows.",
    "example": "Paste a small table with repeated records.",
    "limit": "Review the cleaned output before replacing source data."
  },
  "sql-formatter": {
    "task": "Insert line breaks before common SQL clauses for readability.",
    "example": "Try a SELECT query with WHERE and ORDER BY.",
    "limit": "This is a basic formatter, not a SQL parser or execution engine."
  },
  "markdown-table-generator": {
    "task": "Turn tab-separated rows into a Markdown table.",
    "example": "Paste a header row and a data row separated by tabs.",
    "limit": "All rows must have the same number of columns."
  },
  "mock-json-generator": {
    "task": "Generate example JSON records for software testing.",
    "example": "Create five synthetic users with sample email addresses.",
    "limit": "Records are synthetic and should not be treated as real identities."
  },
  "youtube-thumbnail-downloader": {
    "task": "Preview available public video thumbnail image URLs.",
    "example": "Paste a valid watch or Shorts link and open an available image.",
    "limit": "Some sizes may not exist; reuse only with permission."
  },
  "youtube-title-description-extractor": {
    "task": "Read uploader-provided title and description through the YouTube Data API.",
    "example": "Paste a watch, Shorts or share link.",
    "limit": "Private, deleted or restricted videos and quota exhaustion may prevent results."
  },
  "youtube-tag-extractor": {
    "task": "Read the actual video tags returned by YouTube.",
    "example": "Paste a public video link and copy selected tags.",
    "limit": "Tags may be empty and are not a ranking guarantee."
  },
  "youtube-hashtag-generator": {
    "task": "Suggest hashtag ideas from a topic.",
    "example": "Try a niche such as Python tutorials.",
    "limit": "Suggestions are templates, not live trend or reach predictions."
  },
  "youtube-title-ctr-previewer": {
    "task": "Preview how a proposed video title may appear in truncated layouts.",
    "example": "Compare short and long title versions.",
    "limit": "This does not measure or predict click-through rate."
  },
  "youtube-embed-code-generator": {
    "task": "Generate an iframe for an eligible YouTube video.",
    "example": "Choose controls, start time and privacy-enhanced playback options.",
    "limit": "The video owner or browser can restrict playback."
  },
  "youtube-timestamp-chapter-generator": {
    "task": "Prepare timestamped chapter labels.",
    "example": "Start at 00:00 and add at least three ordered chapters.",
    "limit": "YouTube applies its own chapter eligibility rules."
  },
  "youtube-money-rpm-calculator": {
    "task": "Estimate revenue from views and an assumed RPM.",
    "example": "Multiply 10,000 views by a $4 RPM divided by 1,000.",
    "limit": "Actual earnings vary by audience, season and eligible views."
  },
  "youtube-transcript-generator": {
    "task": "Analyze pasted captions or transcribe an uploaded media file using the optional hosted service.",
    "example": "Copy a permitted transcript from YouTube or select a small audio file.",
    "limit": "Arbitrary public video URLs are not automatically transcribed; hosted uploads are limited to 4 MB."
  },
  "aspect-ratio-calculator": {
    "task": "Calculate the ratio between width and height.",
    "example": "Compare 1920 by 1080 with 16:9.",
    "limit": "Use positive dimensions in the same units."
  },
  "instagram-caption-generator": {
    "task": "Draft template-based caption ideas for a topic.",
    "example": "Enter a theme and edit the suggested copy.",
    "limit": "Suggestions are not AI-generated or optimized against live engagement data."
  },
  "instagram-hashtag-generator": {
    "task": "Generate topic-related hashtag suggestions.",
    "example": "Enter a niche such as travel or cooking.",
    "limit": "Check platform rules and relevance before using tags."
  },
  "instagram-caption-extractor": {
    "task": "Read supported public caption data or analyze pasted text.",
    "example": "Paste an Instagram post link or manually enter its caption.",
    "limit": "Online lookup requires a configured provider and may not support every post."
  },
  "instagram-bio-font-generator": {
    "task": "Convert Latin characters into decorative Unicode variants.",
    "example": "Enter a short profile bio and copy the desired style.",
    "limit": "Some decorative characters are hard for screen readers to interpret."
  },
  "instagram-grid-splitter": {
    "task": "Divide an image into a selected number of rows and columns.",
    "example": "Choose three columns and export tiles in a ZIP.",
    "limit": "Platform cropping and posting order can affect the final grid."
  },
  "instagram-no-crop-blur-fit": {
    "task": "Fit an image onto a blurred-background canvas.",
    "example": "Create a square 1080 by 1080 image without cropping the main subject.",
    "limit": "Review text legibility and background blur."
  },
  "instagram-engagement-calculator": {
    "task": "Estimate interactions divided by follower count.",
    "example": "Enter follower, like and comment counts.",
    "limit": "This is not a universal engagement benchmark."
  },
  "instagram-reels-safe-zone-checker": {
    "task": "Preview approximate safe-zone margins on a vertical image.",
    "example": "Adjust top, bottom and side margins around key text.",
    "limit": "Actual platform overlays vary by device and app version."
  },
  "instagram-dp-border-maker": {
    "task": "Create a circular profile image with a colored border.",
    "example": "Choose a portrait and an orange border.",
    "limit": "Preview the result at small profile sizes."
  },
  "instagram-reel-post-downloader": {
    "task": "Retrieve authorized Instagram media using the official API.",
    "example": "Provide an eligible account token and media ID or supported link.",
    "limit": "Disabled by default; requires authorization and is not unrestricted public scraping."
  },
  "facebook-post-ad-copy-generator": {
    "task": "Draft template-based Facebook post or ad copy.",
    "example": "Enter a campaign topic and revise the draft.",
    "limit": "Review factual claims and advertising rules yourself."
  },
  "facebook-ad-character-previewer": {
    "task": "Compare draft character counts with reference platform limits.",
    "example": "Paste a proposed advertisement caption.",
    "limit": "Actual truncation depends on placement, device and current platform rules."
  },
  "facebook-caption-extractor": {
    "task": "Retrieve supported public captions or analyze pasted Facebook text.",
    "example": "Paste a public post link or manually enter the caption.",
    "limit": "Provider configuration and post accessibility determine online availability."
  },
  "facebook-og-link-previewer": {
    "task": "Preview manually supplied Open Graph title, description and image.",
    "example": "Enter a page URL, title and local preview image.",
    "limit": "Does not fetch live tags or simulate Facebook exactly."
  },
  "facebook-cover-banner-resizer": {
    "task": "Resize an image for a chosen Facebook cover size.",
    "example": "Enter width 820 and height 312 as a starting example.",
    "limit": "Check current mobile and desktop cropping before publishing."
  },
  "facebook-page-name-generator": {
    "task": "Generate short template-based page name ideas.",
    "example": "Enter a business theme and review suggested variations.",
    "limit": "Name availability and trademark conflicts are not checked."
  },
  "facebook-reel-video-downloader": {
    "task": "Retrieve a video source with an authorized Meta token.",
    "example": "Enter a numeric video ID or supported full URL.",
    "limit": "Disabled by default; private or unauthorized media and short share links are unsupported."
  },
  "social-media-image-resizer": {
    "task": "Prepare an image at chosen pixel dimensions.",
    "example": "Create a square or portrait version for a social post.",
    "limit": "Check each platform’s current requirements and cropping."
  },
  "social-media-post-mockup-generator": {
    "task": "Create a simple post preview with an image, title and caption.",
    "example": "Try a product photo with a draft headline.",
    "limit": "The preview is not an exact replica of any platform."
  },
  "google-trends-viral-hook-generator": {
    "task": "Create hook templates from a topic you supply.",
    "example": "Enter a topic found in Google Trends yourself.",
    "limit": "Does not fetch Google Trends or guarantee virality."
  },
  "social-character-limit-checker": {
    "task": "Compare text length against reference limits for social platforms.",
    "example": "Paste a draft caption and inspect counts.",
    "limit": "Platform rules and counting methods may change."
  },
  "whatsapp-direct-link-qr-generator": {
    "task": "Build a WhatsApp click-to-chat link and QR code.",
    "example": "Enter your own international phone number and optional message.",
    "limit": "The number is exposed to anyone who opens the generated link."
  },
  "link-in-bio-page-generator": {
    "task": "Generate a small standalone HTML page of labelled links.",
    "example": "Enter a page title and one label and URL per line.",
    "limit": "Download and host the generated page yourself."
  },
  "online-signature-pad": {
    "task": "Draw a signature on a canvas and save it as PNG.",
    "example": "Use your own signature and download the image.",
    "limit": "A signature image is not identity verification or a cryptographic signature."
  },
  "gst-invoice-generator": {
    "task": "Draft a single-item invoice calculation with GST.",
    "example": "Enter quantity, unit price and applicable rate.",
    "limit": "Review required tax identifiers, place of supply and invoice rules before issuing."
  },
  "privacy-policy-generator": {
    "task": "Generate a privacy notice draft from your stated data practices.",
    "example": "Enter collected data, third parties, retention and contact information.",
    "limit": "Not legal advice; review applicable laws and actual practices."
  },
  "what-is-my-ip": {
    "task": "Display the public IP address reported by the hosting server.",
    "example": "Use the tool while connected to your network or VPN.",
    "limit": "Proxies and VPNs can change the reported IP."
  },
  "internet-speed-latency-test": {
    "task": "Estimate request latency and small-download throughput to this host.",
    "example": "Run once on Wi-Fi and once on another connection.",
    "limit": "Not a full ISP speed test or upload-speed measurement."
  },
  "image-to-text-ocr": {
    "task": "Recognize printed text from a local JPG or PNG image.",
    "example": "Select a clear scan with readable text.",
    "limit": "OCR can make mistakes, especially on handwriting and low-quality images."
  },
  "scanned-pdf-to-text": {
    "task": "Render selected PDF pages and perform OCR in a chosen language.",
    "example": "Choose English or Hindi for a short scanned document.",
    "limit": "Select up to 30 pages per run and review recognized text."
  },
  "llm-token-counter": {
    "task": "Estimate token count from text length.",
    "example": "Paste a prompt and compare the rough estimate with its character count.",
    "limit": "This is not exact model-specific tokenization."
  },
  "markdown-to-clean-text": {
    "task": "Remove common Markdown formatting from text.",
    "example": "Paste a draft containing headings and links.",
    "limit": "Complex Markdown and embedded HTML may need manual cleanup."
  },
  "subtitle-srt-cleaner": {
    "task": "Remove timestamp and sequence lines from subtitle text.",
    "example": "Paste an SRT excerpt to extract readable dialogue.",
    "limit": "Review formatting and multilingual text after processing."
  },
  "json-schema-builder": {
    "task": "Infer a draft JSON Schema from an example JSON value.",
    "example": "Paste an example object containing string and number fields.",
    "limit": "A single sample cannot establish every valid field or constraint."
  },
  "ecommerce-label-cropper": {
    "task": "Extract a rectangular shipping label area from an image.",
    "example": "Enter the label position and pixel dimensions.",
    "limit": "Verify barcode readability and carrier requirements after cropping."
  },
  "product-white-bg-maker": {
    "task": "Replace light pixels and transparent regions with white.",
    "example": "Try a product image on an already light background.",
    "limit": "This is threshold-based editing, not AI subject segmentation."
  },
  "sku-barcode-sheet-generator": {
    "task": "Generate Code 39 barcode artwork from supplied SKU strings.",
    "example": "Enter ABC-123 and SKU-002 on separate lines.",
    "limit": "Use only supported characters and test the printed barcodes."
  },
  "exam-photo-signature-resizer": {
    "task": "Resize a photo or signature to specified pixel dimensions.",
    "example": "Enter the width and height listed on your exam form.",
    "limit": "File size and official requirements must be checked separately."
  },
  "photo-name-date-maker": {
    "task": "Add a name and date band below a photograph.",
    "example": "Enter the exact name and date requested by an application.",
    "limit": "Does not validate official form acceptance."
  },
  "resume-ats-keyword-checker": {
    "task": "Compare literal keyword overlap between a resume and job description.",
    "example": "Paste non-sensitive resume text and a job description.",
    "limit": "The result is not an actual ATS score or hiring prediction."
  },
  "online-screen-recorder": {
    "task": "Capture a screen or window with browser permission.",
    "example": "Choose a tab or display and stop to save the recording.",
    "limit": "Screen and system-audio support varies; protect confidential content."
  },
  "webcam-mic-tester": {
    "task": "Request camera and microphone access and preview video.",
    "example": "Allow permissions and check that the camera image appears.",
    "limit": "Permission alone does not prove microphone audio quality."
  },
  "keyboard-mouse-tester": {
    "task": "Display browser-reported keyboard and mouse events.",
    "example": "Focus the test area and press a key or mouse button.",
    "limit": "System shortcuts may be intercepted before reaching the browser."
  },
  "dead-pixel-monitor-test": {
    "task": "Display solid colors for visual inspection of a screen.",
    "example": "Switch between white, black, red, green and blue.",
    "limit": "The tool cannot automatically diagnose or repair display hardware."
  },
  "speaker-stereo-test": {
    "task": "Play short tones with left, center and right panning.",
    "example": "Use headphones at a comfortable volume and compare channels.",
    "limit": "Device audio routing and accessibility settings affect results."
  },
  "svg-optimizer": {
    "task": "Remove SVG comments and basic whitespace between tags.",
    "example": "Paste a simple vector graphic and compare markup.",
    "limit": "This is not a full SVG optimization or sanitization engine."
  },
  "svg-to-jsx-converter": {
    "task": "Convert selected common SVG attributes into JSX naming conventions.",
    "example": "Try an SVG path with stroke-width.",
    "limit": "Complex SVG styles and attributes may require manual conversion."
  },
  "css-blob-clip-path-generator": {
    "task": "Create a polygon clip-path from adjustable percentage points.",
    "example": "Adjust the top and bottom polygon points.",
    "limit": "This produces a polygon, not a smooth Bézier blob."
  },
  "bill-splitter-calculator": {
    "task": "Divide a bill and tip across a chosen number of people.",
    "example": "Split 100 with a 20% tip among three people.",
    "limit": "Individual taxes, rounding and unequal shares are not handled."
  },
  "emi-prepayment-calculator": {
    "task": "Estimate a revised EMI after a one-time principal payment.",
    "example": "Compare an outstanding loan with and without prepayment.",
    "limit": "Assumes the same remaining tenure and rate; excludes lender fees."
  },
  "hra-rent-receipt-generator": {
    "task": "Create a text rent-receipt draft from supplied details.",
    "example": "Enter tenant, landlord, rental month and actual rent paid.",
    "limit": "A draft is not proof of payment or tax eligibility."
  },
  "exif-metadata-remover": {
    "task": "Re-encode an image to PNG to remove original EXIF metadata.",
    "example": "Choose a photograph and download a new copy.",
    "limit": "Visible sensitive details remain; inspect output independently."
  },
  "luhn-test-card-validator": {
    "task": "Check the Luhn checksum of a synthetic test card number.",
    "example": "Try a documented test number rather than real payment data.",
    "limit": "Passing a checksum does not establish a valid card or account."
  }
};
