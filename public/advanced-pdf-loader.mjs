import * as pdfjs from "./vendor/advanced/pdfjs/pdf.mjs";
pdfjs.GlobalWorkerOptions.workerSrc="/vendor/advanced/pdfjs/pdf.worker.mjs";
globalThis.quiikPdfJs=pdfjs;
