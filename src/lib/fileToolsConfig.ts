export const fileTools: Record<string,[string,string][]> = {
  "split-pdf": [
    [
      "Page selection (e.g. 1-3,5)",
      "1"
    ]
  ],
  "compress-pdf": [],
  "organize-pdf-pages": [
    [
      "New order (e.g. 3,1,2)",
      "1"
    ]
  ],
  "add-page-numbers-pdf": [
    [
      "Start number",
      "1"
    ]
  ],
  "add-watermark-pdf": [
    [
      "Watermark text",
      "CONFIDENTIAL"
    ]
  ],
  "esign-pdf": [
    [
      "Typed signature (visual only)",
      "Your name"
    ],
    [
      "Page",
      "1"
    ]
  ],
  "flatten-pdf": [],
  "markdown-to-pdf": [
    [
      "Markdown source",
      "# Document\n\nWrite your content here."
    ]
  ],
  "html-to-pdf": [
    [
      "HTML source",
      "<h1>Document</h1><p>Write your content here.</p>"
    ]
  ],
  "csv-excel-converter": [
    [
      "Conversion",
      "CSV to XLSX"
    ]
  ]
};
