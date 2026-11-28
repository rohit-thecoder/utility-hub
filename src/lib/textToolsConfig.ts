export type Field = [label: string, initial: string, kind?: string, options?: string];
export const textTools: Record<string, Field[]> = {
  "profit-margin-calculator": [
    [
      "Revenue",
      "1000"
    ],
    [
      "Cost",
      "700"
    ]
  ],
  "age-calculator": [
    [
      "Birth date",
      "2000-01-01",
      "date"
    ],
    [
      "As of date",
      "",
      "date"
    ]
  ],
  "date-difference-calculator": [
    [
      "Start date",
      "2026-01-01",
      "date"
    ],
    [
      "End date",
      "2026-12-31",
      "date"
    ]
  ],
  "cgpa-to-percentage-calculator": [
    [
      "CGPA",
      "8.5"
    ],
    [
      "Institution multiplier",
      "9.5"
    ]
  ],
  "length-area-converter": [
    [
      "Value",
      "1"
    ],
    [
      "From",
      "m",
      "select",
      "mm|cm|m|km|in|ft|yd|mi|mm²|cm²|m²|km²|ft²|acre|ha"
    ],
    [
      "To",
      "ft",
      "select",
      "mm|cm|m|km|in|ft|yd|mi|mm²|cm²|m²|km²|ft²|acre|ha"
    ]
  ],
  "weight-mass-converter": [
    [
      "Value",
      "1"
    ],
    [
      "From",
      "kg",
      "select",
      "mg|g|kg|t|oz|lb"
    ],
    [
      "To",
      "lb",
      "select",
      "mg|g|kg|t|oz|lb"
    ]
  ],
  "digital-storage-converter": [
    [
      "Value",
      "1"
    ],
    [
      "From",
      "GB",
      "select",
      "B|KB|MB|GB|TB|KiB|MiB|GiB|TiB"
    ],
    [
      "To",
      "MB",
      "select",
      "B|KB|MB|GB|TB|KiB|MiB|GiB|TiB"
    ]
  ],
  "speed-temperature-converter": [
    [
      "Value",
      "100"
    ],
    [
      "From",
      "km/h",
      "select",
      "m/s|km/h|mph|kn|C|F|K"
    ],
    [
      "To",
      "mph",
      "select",
      "m/s|km/h|mph|kn|C|F|K"
    ]
  ],
  "number-base-converter": [
    [
      "Number",
      "1010"
    ],
    [
      "From base",
      "2"
    ],
    [
      "To base",
      "10"
    ]
  ],
  "unix-timestamp-converter": [
    [
      "Input",
      "0"
    ],
    [
      "Mode",
      "seconds to UTC",
      "select",
      "seconds to UTC|milliseconds to UTC|ISO date to seconds"
    ]
  ],
  "timezone-converter": [
    [
      "Time (ISO with offset or Z)",
      "2026-01-01T12:00:00Z"
    ],
    [
      "Destination IANA timezone",
      "Asia/Kolkata"
    ]
  ],
  "bill-splitter-calculator": [
    [
      "Bill",
      "1000"
    ],
    [
      "Tip (%)",
      "10"
    ],
    [
      "People",
      "4"
    ]
  ],
  "bmi-bmr-calorie-calculator": [
    [
      "Weight (kg)",
      "70"
    ],
    [
      "Height (cm)",
      "175"
    ],
    [
      "Age (years)",
      "25"
    ],
    [
      "Sex",
      "male",
      "select",
      "male|female"
    ],
    [
      "Activity factor",
      "1.2",
      "select",
      "1.2|1.375|1.55|1.725|1.9"
    ]
  ],
  "in-hand-salary-calculator": [
    [
      "Gross monthly pay",
      "50000"
    ],
    [
      "Monthly tax withholding",
      "3000"
    ],
    [
      "Employee PF",
      "1800"
    ],
    [
      "Other deductions",
      "200"
    ]
  ],
  "emi-prepayment-calculator": [
    [
      "Outstanding principal",
      "1000000"
    ],
    [
      "Annual interest (%)",
      "8"
    ],
    [
      "Remaining months",
      "120"
    ],
    [
      "One-time prepayment",
      "100000"
    ]
  ],
  "color-converter": [
    [
      "Hex color",
      "#1d4ed8",
      "color"
    ]
  ],
  "css-gradient-generator": [
    [
      "Start",
      "#1d4ed8",
      "color"
    ],
    [
      "End",
      "#f97316",
      "color"
    ],
    [
      "Angle (degrees)",
      "90"
    ]
  ],
  "css-box-shadow-generator": [
    [
      "X offset",
      "0"
    ],
    [
      "Y offset",
      "8"
    ],
    [
      "Blur",
      "24"
    ],
    [
      "Spread",
      "0"
    ],
    [
      "Color",
      "#334155",
      "color"
    ],
    [
      "Opacity (0–1)",
      "0.25"
    ]
  ],
  "css-glassmorphism-generator": [
    [
      "Blur (px)",
      "12"
    ],
    [
      "Opacity (0–1)",
      "0.2"
    ],
    [
      "Radius (px)",
      "16"
    ]
  ],
  "wcag-contrast-checker": [
    [
      "Foreground",
      "#111827",
      "color"
    ],
    [
      "Background",
      "#ffffff",
      "color"
    ]
  ],
  "css-blob-clip-path-generator": [
    [
      "Top left (%)",
      "20"
    ],
    [
      "Top right (%)",
      "80"
    ],
    [
      "Bottom right (%)",
      "90"
    ],
    [
      "Bottom left (%)",
      "10"
    ]
  ],
  "utm-link-builder": [
    [
      "Website URL",
      "https://example.com"
    ],
    [
      "Source",
      "newsletter"
    ],
    [
      "Medium",
      "email"
    ],
    [
      "Campaign",
      "launch"
    ],
    [
      "Term",
      ""
    ],
    [
      "Content",
      ""
    ]
  ],
  "meta-tag-generator": [
    [
      "Page title",
      "Example website"
    ],
    [
      "Description",
      "Describe your page."
    ],
    [
      "Canonical URL",
      "https://example.com"
    ]
  ],
  "cron-expression-generator": [
    [
      "Minute (0–59 or *)",
      "0"
    ],
    [
      "Hour (0–23 or *)",
      "9"
    ],
    [
      "Day (1–31 or *)",
      "*"
    ],
    [
      "Month (1–12 or *)",
      "*"
    ],
    [
      "Weekday (0–6 or *)",
      "1"
    ]
  ],
  "luhn-test-card-validator": [
    [
      "Test number (do not enter real payment data)",
      "4242424242424242"
    ]
  ],
  "text-diff-checker": [
    [
      "Original",
      "One line\nOld line",
      "textarea"
    ],
    [
      "Revised",
      "One line\nNew line",
      "textarea"
    ]
  ],
  "fancy-text-generator": [
    [
      "Text",
      "Hello world",
      "textarea"
    ]
  ],
  "json-schema-builder": [
    [
      "Example JSON",
      "{\"name\":\"Sam\",\"age\":25,\"active\":true}",
      "textarea"
    ]
  ],
  "mock-json-generator": [
    [
      "Record count",
      "5"
    ],
    [
      "Name prefix",
      "User"
    ]
  ],
  "markdown-table-generator": [
    [
      "Tab-separated rows (first row headers)",
      "Name\tScore\nAlex\t10",
      "textarea"
    ]
  ],
  "resume-ats-keyword-checker": [
    [
      "Resume text",
      "Python SQL React",
      "textarea"
    ],
    [
      "Job description",
      "Python SQL Docker",
      "textarea"
    ]
  ],
  "facebook-page-name-generator": [
    [
      "Topic or business",
      "Coffee"
    ]
  ],
  "google-trends-viral-hook-generator": [
    [
      "Trend or topic (enter from Google Trends)",
      "Home organization"
    ]
  ],
  "llm-token-counter": [
    [
      "Text",
      "Paste text here",
      "textarea"
    ]
  ],
  "link-in-bio-page-generator": [
    [
      "Page title",
      "My links"
    ],
    [
      "Links (label | URL, one per line)",
      "Website | https://example.com",
      "textarea"
    ]
  ],
  "privacy-policy-generator": [
    [
      "Website name",
      "Example"
    ],
    [
      "Contact email",
      "hello@example.com"
    ],
    [
      "Data collected",
      "None beyond hosting logs",
      "textarea"
    ],
    [
      "Third parties and cookies",
      "Hosting provider",
      "textarea"
    ],
    [
      "Retention and user choices",
      "Contact us to request deletion.",
      "textarea"
    ]
  ],
  "hra-rent-receipt-generator": [
    [
      "Tenant",
      "Tenant name"
    ],
    [
      "Landlord",
      "Landlord name"
    ],
    [
      "Address",
      "Rental address"
    ],
    [
      "Month",
      "November 2026"
    ],
    [
      "Rent (₹)",
      "12000"
    ]
  ],
  "gst-invoice-generator": [
    [
      "Seller name",
      "Seller"
    ],
    [
      "GSTIN",
      ""
    ],
    [
      "Buyer",
      "Buyer"
    ],
    [
      "Invoice number",
      "001"
    ],
    [
      "Item",
      "Service"
    ],
    [
      "Quantity",
      "1"
    ],
    [
      "Unit price (₹)",
      "1000"
    ],
    [
      "GST (%)",
      "18"
    ]
  ],
  "svg-to-jsx-converter": [
    [
      "SVG markup",
      "<svg viewBox=\"0 0 24 24\"><path stroke-width=\"2\" d=\"M0 0L24 24\"/></svg>",
      "textarea"
    ]
  ],
  "svg-optimizer": [
    [
      "SVG markup",
      "<svg xmlns=\"http://www.w3.org/2000/svg\"> <!-- comment --> <path d=\"M0 0\"/> </svg>",
      "textarea"
    ]
  ],
  "sql-formatter": [
    [
      "SQL query",
      "select id, name from users where active = 1 order by name;",
      "textarea"
    ]
  ],
  "code-minifier-beautifier": [
    [
      "JSON or CSS source",
      "{\"name\": \"Example\", \"active\": true}",
      "textarea"
    ],
    [
      "Mode",
      "JSON minify",
      "select",
      "JSON minify|JSON beautify|CSS whitespace cleanup"
    ]
  ],
  "json-csv-yaml-converter": [
    [
      "Input (JSON array or CSV)",
      "[{\"name\":\"Alex\",\"score\":10}]",
      "textarea"
    ],
    [
      "Conversion",
      "JSON to CSV",
      "select",
      "JSON to CSV|CSV to JSON|JSON to YAML"
    ]
  ],
  "csv-viewer-cleaner": [
    [
      "CSV text",
      "Name,Score\n Alex ,10\n Alex ,10\n Sam ,20",
      "textarea"
    ]
  ],
  "whatsapp-direct-link-qr-generator": [
    [
      "Phone with country code",
      "911234567890"
    ],
    [
      "Message",
      "Hello!"
    ]
  ]
};
