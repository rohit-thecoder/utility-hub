"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {generatePassword} from "@/lib/securePassword";
import type { Tool } from "@/data/toolsRegistry";
import { FileDropzone } from "./FileDropzone";
import { useDownloadWithAd } from "@/components/ads/DownloadInterstitialProvider";

const SAMPLE = "Make useful things simple.\nPrivate tools should feel instant, not intimidating.\nBuild once, reuse everywhere.";
const bytes = (size: number | null) => { const value = size ?? 0; return value < 1024 ? `${value} B` : value < 1024 ** 2 ? `${(value / 1024).toFixed(1)} KB` : `${(value / 1024 ** 2).toFixed(1)} MB`; };

type DownloadableResult = { blob: Blob; name: string };
type ResultTone = "success" | "error" | "neutral";

function titleCase(value: string) { return value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function outputImageFormat(slug: string) {
  if (["jpg-to-png", "webp-to-png", "svg-to-png"].includes(slug)) return { type: "image/png", extension: "png" };
  if (slug === "jpg-to-webp" || slug === "image-compressor") return { type: "image/webp", extension: "webp" };
  return { type: "image/jpeg", extension: "jpg" };
}
function isHeic(file: File) { return /image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name); }
async function makeIco(png: Blob, width: number, height: number) {
  const image = new Uint8Array(await png.arrayBuffer());
  const directory = new Uint8Array(22 + image.length);
  const view = new DataView(directory.buffer);
  view.setUint16(0, 0, true); view.setUint16(2, 1, true); view.setUint16(4, 1, true);
  directory[6] = width >= 256 ? 0 : width; directory[7] = height >= 256 ? 0 : height;
  directory[8] = 0; directory[9] = 0; view.setUint16(10, 1, true); view.setUint16(12, 32, true);
  view.setUint32(14, image.length, true); view.setUint32(18, 22, true); directory.set(image, 22);
  return new Blob([directory], { type: "image/x-icon" });
}
function runTextTool(slug: string, value: string) {
  if (slug === "case-converter") return `UPPERCASE\n${value.toUpperCase()}\n\nlowercase\n${value.toLowerCase()}\n\nTitle Case\n${titleCase(value)}\n\ncamelCase\n${value.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase())}\n\nsnake_case\n${value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_")}`;
  if (slug === "remove-duplicate-lines") return [...new Set(value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)).join("\n");
  if (slug === "word-character-counter") { const words = value.trim() ? value.trim().split(/\s+/).length : 0; const sentences = value.split(/[.!?]+/).filter(Boolean).length; return `Words: ${words}\nCharacters: ${value.length}\nSentences: ${sentences}\nParagraphs: ${value.split(/\n\s*\n/).filter(Boolean).length}\nReading time: ${Math.max(1, Math.ceil(words / 200))} min`; }
  if (slug === "lorem-ipsum-generator") return Array.from({ length: 3 }, () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, nulla vitae vestibulum posuere, quam orci elementum arcu, sed finibus justo dolor ac nisl.").join("\n\n");
  if (slug === "fancy-text-generator") return `𝗕𝗼𝗹𝗱: ${value}\n𝘐𝘵𝘢𝘭𝘪𝘤: ${value}\n𝙼𝚘𝚗𝚘: ${value}\nⓒⓘⓡⓒⓛⓔⓓ: ${value.split("").join(" ")}`;
  if (slug === "markdown-to-clean-text") return value.replace(/```[\s\S]*?```/g, "").replace(/[>#*_`~]/g, "").replace(/\[[^\]]+\]\(([^)]+)\)/g, "$1").replace(/\n{3,}/g, "\n\n").trim();
  if (slug === "subtitle-srt-cleaner") return value.replace(/^\d+\s*$/gm, "").replace(/^\d{2}:\d{2}:\d{2}[,\.]\d{3}\s+-->.*$/gm, "").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
  if (slug === "url-slug-generator") return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (slug === "keyword-density-checker") { const words = value.toLowerCase().match(/[a-z0-9']+/g) || []; const frequencies = new Map<string, number>(); words.forEach((word) => frequencies.set(word, (frequencies.get(word) || 0) + 1)); return [...frequencies.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([word, count]) => `${word.padEnd(18)} ${count} · ${((count / Math.max(words.length, 1)) * 100).toFixed(1)}%`).join("\n"); }
  if (slug === "base64-encoder-decoder") return btoa(Array.from(new TextEncoder().encode(value), byte => String.fromCharCode(byte)).join(""));
  if (slug === "url-encoder-decoder") return encodeURIComponent(value);
  if (slug === "jwt-decoder") { try { const [head, body] = value.split("."); return `Header\n${JSON.stringify(JSON.parse(atob(head.replace(/-/g, "+").replace(/_/g, "/"))), null, 2)}\n\nPayload\n${JSON.stringify(JSON.parse(atob(body.replace(/-/g, "+").replace(/_/g, "/"))), null, 2)}`; } catch { return "Paste a complete JWT with header.payload.signature."; } }
  if (slug === "json-formatter-validator") { try { return JSON.stringify(JSON.parse(value), null, 2); } catch (error) { return `Invalid JSON: ${error instanceof Error ? error.message : "check your input"}`; } }
  if (slug === "json-csv-yaml-converter") { try { const parsed = JSON.parse(value); const rows = Array.isArray(parsed) ? parsed : [parsed]; const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))]; return [columns.join(","), ...rows.map((row) => columns.map((column) => JSON.stringify(row[column] ?? "")).join(","))].join("\n"); } catch { return "Paste a JSON array to convert it into CSV."; } }
  if (slug === "regex-tester") { const [pattern = "", ...test] = value.split("\n"); try { const matches = [...test.join("\n").matchAll(new RegExp(pattern, "gi"))]; return matches.length ? matches.map((match, index) => `#${index + 1}: ${match[0]} at ${match.index}`).join("\n") : "No matches found."; } catch (error) { return `Invalid regular expression: ${error instanceof Error ? error.message : ""}`; } }
  if (slug === "robots-txt-generator") return `User-agent: *\nAllow: /\n\nSitemap: ${value.trim() || "https://example.com"}/sitemap.xml`;
  if (slug === "xml-sitemap-generator") { const escape = (input: string) => input.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); const urls = value.split(/\r?\n/).filter(Boolean); return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url.trim())}</loc></url>`).join("\n")}\n</urlset>`; }
  if (slug === "meta-tag-generator") return `<title>${value || "Page title"}</title>\n<meta name="description" content="Describe this page in 150–160 characters.">\n<meta property="og:title" content="${value || "Page title"}">\n<meta property="og:description" content="Describe this page for social sharing.">`;
  if (slug === "sql-formatter") return value.replace(/\s+/g, " ").replace(/\b(select|from|where|left join|inner join|order by|group by|limit)\b/gi, "\n$1").replace(/,/g, ",\n  ").trim();
  if (slug === "svg-to-jsx-converter") return value.replace(/class=/g, "className=").replace(/stroke-width=/g, "strokeWidth=").replace(/fill-rule=/g, "fillRule=").replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");
  throw new Error("This operation is not implemented yet.");
}

export function ToolWorkspace({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState(SAMPLE); const [decodeMode, setDecodeMode] = useState(false);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [quality, setQuality] = useState(82);
  const [number, setNumber] = useState("100000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("5");
  const [imagePreview, setImagePreview] = useState("");
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [resultFile, setResultFile] = useState<DownloadableResult | null>(null);
  const [resultTone, setResultTone] = useState<ResultTone>("neutral");
  const { triggerDownload } = useDownloadWithAd();
  const accepts = tool.slug === "image-to-text-ocr" ? "image/png,image/jpeg" : tool.mode === "image" ? "image/*" : tool.mode === "pdf" ? "application/pdf,image/*" : tool.mode === "media" ? "image/*,audio/*,video/*" : undefined;
  const formats = tool.mode === "image" ? ["JPG", "PNG", "WEBP", "HEIC"] : tool.mode === "pdf" ? ["PDF", "JPG", "PNG"] : tool.mode === "media" ? ["MP4", "MP3", "WAV", "JPG"] : ["TXT", "CSV", "JSON"];
  const textLike = ["text", "code"].includes(tool.mode) || tool.slug === "text-to-speech";
  const isCalculator = tool.mode === "calculator";
  const isQr = tool.slug === "qr-code-generator";

  useEffect(() => { try { const items: unknown = JSON.parse(localStorage.getItem("quiiktool-recent-tools") || "[]"); const recent = Array.isArray(items) ? items.filter((item): item is string => typeof item === "string") : []; localStorage.setItem("quiiktool-recent-tools", JSON.stringify([tool.slug, ...recent.filter((slug) => slug !== tool.slug)].slice(0, 5))); } catch { /* Storage may be disabled. */ } }, [tool.slug]);
  const addFiles = useCallback((newFiles: File[]) => { setFiles((current) => [...current, ...newFiles].slice(0, 20)); setImagePreview(""); setResultFile(null); setResultSize(null); setOutput(""); }, []);
  const copy = async (value = output) => { await navigator.clipboard?.writeText(value); };
  const copyLink = async () => { await navigator.clipboard?.writeText(window.location.href); };
  const reportError = (message: string) => { setImagePreview(""); setResultSize(null); setResultFile(null); setResultTone("error"); setOutput(message); };
  const reportFile = (file: DownloadableResult, _message: string, preview = "") => { setResultFile(file); setResultSize(file.blob.size); setResultTone("success"); setOutput(""); if (preview) setImagePreview(preview); };
  const reportText = (message: string) => { setResultFile(null); setResultSize(null); setResultTone("success"); setOutput(message); };

  const processImages = async () => {
    if (!files.length) { reportError("Choose one or more image files first."); return; }
    setBusy(true);
    try {
      const format = outputImageFormat(tool.slug);
      const converted: DownloadableResult[] = [];
      for (const file of files) {
        let source: Blob = file;
        if (isHeic(file)) {
          const { default: heic2any } = await import("heic2any");
          const result = await heic2any({ blob: file, toType: "image/jpeg", quality: 1 });
          source = Array.isArray(result) ? result[0] : result;
        }
        if (!source.type.startsWith("image/") && !/\.svg$/i.test(file.name)) throw new Error(`${file.name} is not a supported image.`);
        const sourceUrl = URL.createObjectURL(source);
        const image = await new Promise<HTMLImageElement>((resolve, reject) => { const next = new Image(); next.onload = () => resolve(next); next.onerror = () => reject(new Error(`Could not read ${file.name}.`)); next.src = sourceUrl; });
        const canvas = document.createElement("canvas");
        const max = tool.slug.includes("resizer") || tool.slug.includes("passport") ? 1200 : image.naturalWidth;
        const ratio = Math.min(1, max / image.naturalWidth);
        canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Your browser does not support canvas conversion.");
        if (["png-to-jpg", "product-white-bg-maker"].includes(tool.slug)) { context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        if (tool.slug === "watermark-adder") { context.save(); context.globalAlpha = .38; context.fillStyle = "#1d4ed8"; context.font = `${Math.max(18, Math.round(canvas.width / 16))}px sans-serif`; context.fillText("QuiikTool", canvas.width * .06, canvas.height * .92); context.restore(); }
        const imageBlob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not create the converted image.")), format.type, quality / 100));
        URL.revokeObjectURL(sourceUrl);
        const blob = tool.slug === "ico-converter" ? await makeIco(imageBlob, canvas.width, canvas.height) : imageBlob;
        const extension = tool.slug === "ico-converter" ? "ico" : format.extension;
        converted.push({ blob, name: `${file.name.replace(/\.[^.]+$/, "")}.${extension}` });
      }
      if (converted.length === 1) {
        reportFile(converted[0], `Converted ${files[0].name} to ${converted[0].name}.`, URL.createObjectURL(converted[0].blob));
      } else {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip(); converted.forEach((file) => zip.file(file.name, file.blob));
        const blob = await zip.generateAsync({ type: "blob" });
        reportFile({ blob, name: `${tool.slug}-batch.zip` }, `Converted ${converted.length} images and packaged them into a ZIP file.`);
      }
    } catch (error) { reportError(error instanceof Error ? error.message : "The image could not be processed."); }
    finally { setBusy(false); }
  };
  const processPdf = async () => {
    if (!files.length && !["markdown-to-pdf", "html-to-pdf"].includes(tool.slug)) { reportError("Choose PDF or image files first."); return; }
    setBusy(true); try { const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib"); const pdf = await PDFDocument.create(); if (tool.slug === "merge-pdf") { for (const file of files) { const source = await PDFDocument.load(await file.arrayBuffer()); const pages = await pdf.copyPages(source, source.getPageIndices()); pages.forEach((page) => pdf.addPage(page)); } } else if (tool.slug === "image-to-pdf") { for (const file of files) { const imageBytes = await file.arrayBuffer(); const image = file.type.includes("png") ? await pdf.embedPng(imageBytes) : await pdf.embedJpg(imageBytes); const page = pdf.addPage([595, 842]); const scale = Math.min(515 / image.width, 762 / image.height); page.drawImage(image, { x: (595 - image.width * scale) / 2, y: (842 - image.height * scale) / 2, width: image.width * scale, height: image.height * scale }); } } else { const page = pdf.addPage([595, 842]); page.drawText((text || SAMPLE).slice(0, 4000), { x: 44, y: 790, size: 12, lineHeight: 18, maxWidth: 505, font: await pdf.embedFont(StandardFonts.Helvetica), color: rgb(.06, .09, .16) }); } const out = await pdf.save(); const payload = new Uint8Array(out.length); payload.set(out); reportFile({ blob: new Blob([payload.buffer], { type: "application/pdf" }), name: `${tool.slug}.pdf` }, "Your PDF was created locally and is ready to download."); } catch (error) { reportError(error instanceof Error ? error.message : "The PDF could not be created."); } finally { setBusy(false); }
  };
  const processQr = async () => { setBusy(true); try { const QRCode = await import("qrcode"); const dataUrl = await QRCode.toDataURL(text || "https://quiiktool.com", { margin: 2, color: { dark: "#1D4ED8", light: "#FFFFFF" } }); const response = await fetch(dataUrl); const blob = await response.blob(); reportFile({ blob, name: "quiiktool-qr.png" }, "Your blue QR code is ready.", dataUrl); } catch { reportError("Could not generate that QR code."); } finally { setBusy(false); } };
  const processGenerator = async () => { if (isQr) return processQr(); if (tool.slug === "password-generator") { const {password,entropy}=generatePassword(); reportText(`Secure password\n${password}\n\nEstimated entropy: ${entropy} bits`); return; } if (tool.slug === "uuid-generator") { reportText(Array.from({ length: 10 }, () => crypto.randomUUID()).join("\n")); return; } if (tool.slug === "hash-generator") { const encoded = new TextEncoder().encode(text); const hash = await crypto.subtle.digest("SHA-256", encoded); reportText(Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("")); return; } reportText(runTextTool(tool.slug, text)); };
  const calculate = () => { if (![number,rate,years].every(v=>v.trim() && Number.isFinite(Number(v))) || Number(number)<0 || Number(rate)<0 || Number(years)<0) { reportError("Enter valid non-negative numbers."); return; } const principal = Number(number) || 0; const annualRate = (Number(rate) || 0) / 100; const duration = Number(years) || 0; let result = principal * (1 + annualRate / 12) ** (duration * 12); if (tool.slug === "gst-calculator") { const tax = principal * annualRate; reportText(`GST: ₹${tax.toFixed(2)}\nTotal including GST: ₹${(principal+tax).toFixed(2)}`); return; } if (tool.slug === "emi-loan-calculator" || tool.slug === "sip-mutual-fund-calculator") { const n = Math.round(duration*12), r = annualRate/12; if (n<1 || n>1200) { reportError("Enter a duration of 1 to 1200 months."); return; } const value = tool.slug === "emi-loan-calculator" ? (r===0 ? principal/n : principal*r/(1-Math.pow(1+r,-n))) : (r===0 ? principal*n : principal*Math.expm1(n*Math.log1p(r))/r*(1+r)); if (!Number.isFinite(value)) {reportError("The result is outside the supported range."); return;} reportText(tool.slug === "emi-loan-calculator" ? `Monthly EMI: ₹${value.toFixed(2)}\nTotal repayment: ₹${(value*n).toFixed(2)}\nTotal interest: ₹${(value*n-principal).toFixed(2)}` : `Estimated value: ₹${value.toFixed(2)}\nInvested: ₹${(principal*n).toFixed(2)}\nEstimated gain: ₹${(value-principal*n).toFixed(2)}\nAssumes beginning-of-month contributions; returns are not guaranteed.`); return; } if (tool.slug.includes("percentage")) result = principal * (Number(rate) || 0) / 100; if (tool.slug.includes("bmi")) result = principal / Math.max((Number(rate) || 170) / 100, .1) ** 2; reportText(`Result: ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(result)}\n\nInput: ${principal.toLocaleString()} · Rate: ${rate}% · Period: ${years} years\nCalculated instantly in your browser.`); };
  const run = async () => { try { if(tool.slug==="text-to-speech"){if(!text.trim())throw Error("Enter text to read.");if(!("speechSynthesis" in window))throw Error("Speech synthesis is not supported in this browser.");speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.onerror=()=>reportError("The device voice could not read this text.");speechSynthesis.speak(utterance);reportText("Reading your text aloud. Use Stop to cancel.");return;} if (tool.slug === "image-to-text-ocr") { if (!files[0]) { reportError("Choose a JPG or PNG image."); return; } setBusy(true); const { createWorker } = await import("tesseract.js"); const worker = await createWorker("eng"); try { const { data } = await worker.recognize(files[0]); reportText(data.text.trim() || "No readable text found."); } finally { await worker.terminate(); } return; } if (decodeMode && ["base64-encoder-decoder","url-encoder-decoder"].includes(tool.slug)) { const value = tool.slug === "base64-encoder-decoder" ? new TextDecoder("utf-8", {fatal:true}).decode(Uint8Array.from(atob(text.trim()),c=>c.charCodeAt(0))) : decodeURIComponent(text); reportText(value); return; } if (tool.mode === "image") return processImages(); if (tool.mode === "pdf") return processPdf(); if (isCalculator) return calculate(); if (tool.mode === "generator") return processGenerator(); if (tool.slug === "text-to-speech") { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); reportText("Reading your text aloud using this device’s selected voice."); return; } if (tool.slug === "image-to-text-ocr" && files[0]) { reportError("OCR is not yet enabled for this file type. Choose a PNG or JPG image and try again."); return; } reportText(runTextTool(tool.slug, text)); } catch (error) { reportError(error instanceof Error ? error.message : "Could not process input."); } finally { setBusy(false); } };
  const total = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  return (
    <section className="surface overflow-hidden rounded-3xl bg-white">
      <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50/80 via-white to-orange-50/80 px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2"><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">Workspace</span><span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Browser-local</span></div>
          <div className="flex gap-2"><button onClick={copyLink} className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-blue-300">Copy tool link</button><span className="hidden rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 sm:block">Bookmark <span className="font-metrics">Ctrl+D</span></span></div>
        </div>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-[1.25fr_.75fr] sm:p-7">
        <div>
          {textLike || tool.mode === "generator" || (tool.mode === "pdf" && ["markdown-to-pdf", "html-to-pdf"].includes(tool.slug)) ? (
            <div>{["base64-encoder-decoder","url-encoder-decoder"].includes(tool.slug) && <label className="mb-4 block text-sm"><input type="checkbox" checked={decodeMode} onChange={e=>setDecodeMode(e.target.checked)}/> Decode input (uncheck to encode)</label>}<label className="mb-2 block text-sm font-bold text-slate-700">Your input</label><textarea value={text} onChange={(event) => setText(event.target.value)} className="focus-ring min-h-64 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-metrics text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-400" placeholder="Paste or write here..."/><button onClick={() => setText(SAMPLE)} className="mt-3 text-sm font-bold text-blue-700 hover:text-blue-900">↻ Try sample</button>{tool.slug==="text-to-speech"&&<button onClick={()=>{speechSynthesis.cancel();reportText("Speech stopped.");}} className="mt-3 w-full rounded-xl border p-3 font-bold">Stop speech</button>}</div>
          ) : isCalculator ? (
            <div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-bold text-slate-700">{tool.slug === "sip-mutual-fund-calculator" ? "Monthly investment (₹)" : tool.slug === "emi-loan-calculator" ? "Loan amount (₹)" : "Amount"}<input value={number} onChange={(event) => setNumber(event.target.value)} inputMode="decimal" className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-metrics outline-none focus:border-blue-400"/></label><label className="text-sm font-bold text-slate-700">Rate (%) / value<input value={rate} onChange={(event) => setRate(event.target.value)} inputMode="decimal" className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-metrics outline-none focus:border-blue-400"/></label><label className="text-sm font-bold text-slate-700">Years / unit<input value={years} onChange={(event) => setYears(event.target.value)} inputMode="decimal" className="focus-ring mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-metrics outline-none focus:border-blue-400"/></label></div>
          ) : (
            <><FileDropzone onFiles={addFiles} accept={accepts} formats={formats}/>{files.length > 0 && <div className="mt-4 space-y-2">{files.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-100 text-xs text-blue-700">✓</span><span className="min-w-0 flex-1 truncate font-semibold text-slate-700">{file.name}</span><span className="font-metrics text-xs text-slate-500">{bytes(file.size)}</span><button onClick={() => setFiles((items) => items.filter((_, position) => position !== index))} className="text-slate-400 hover:text-orange-600" aria-label={`Remove ${file.name}`}>×</button></div>)}</div>}</>
          )}
        </div>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5"><h2 className="font-display text-lg font-bold text-slate-900">Fine-tune output</h2>{tool.mode === "image" && <label className="mt-5 block text-sm font-bold text-slate-700">Quality <span className="float-right font-metrics text-blue-700">{quality}%</span><input value={quality} onChange={(event) => setQuality(Number(event.target.value))} type="range" min="25" max="100" className="mt-3 w-full accent-blue-700"/></label>}<div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4"><p className="text-sm font-bold text-blue-900">Local processing</p><p className="mt-1 text-xs leading-5 text-blue-800">File and text processing runs on this device; some browser voices and OCR assets may use external services.</p></div>{files.length > 1 && <p className="mt-4 font-metrics text-xs text-slate-500">Queue: {files.length} files · {bytes(total)}</p>}</aside>
      </div>
      <div className="border-t border-slate-100 bg-white px-5 py-5 sm:px-7"><button disabled={busy} onClick={run} className="focus-ring w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-orange-700 disabled:cursor-wait disabled:opacity-70">{busy ? "Processing locally…" : tool.slug === "text-to-speech" ? "Read aloud" : tool.mode === "calculator" ? "Calculate now" : tool.mode === "generator" ? "Generate now" : "Process files"}</button></div>
      {(output || imagePreview || resultFile) && <div className={`mx-5 mb-6 rounded-2xl border p-5 sm:mx-7 ${resultTone === "error" ? "border-red-200 bg-red-50" : "border-orange-200 bg-gradient-to-br from-orange-50 to-white"}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-display font-bold text-slate-900">{resultTone === "error" ? "We couldn’t complete that request" : "Your result is ready"}</p><p className="mt-1 text-xs text-slate-500">{resultTone === "error" ? "Check the message below and try another supported file." : "Completed privately on your device."}</p></div>{resultSize !== null && resultTone !== "error" && <span className="rounded-full bg-emerald-100 px-3 py-1 font-metrics text-xs font-bold text-emerald-700">{bytes(resultSize)} output</span>}</div>{imagePreview && resultTone !== "error" && <img src={imagePreview} alt="Generated preview" className="mt-4 max-h-52 rounded-xl border border-slate-200 bg-white p-2"/>}{output && <pre className={`mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border p-4 font-metrics text-xs leading-5 ${resultTone === "error" ? "border-red-100 bg-white text-red-700" : "border-orange-100 bg-white text-slate-700"}`}>{output}</pre>}<div className="mt-4 flex flex-wrap gap-2">{output && <button onClick={() => copy()} className="focus-ring rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700">Copy result</button>}{resultFile ? <button onClick={() => triggerDownload({ fileName: resultFile.name, blob: resultFile.blob })} className="focus-ring rounded-lg bg-blue-700 px-3 py-2 text-xs font-bold text-white">Download {resultFile.name}</button> : output && resultTone !== "error" ? <button onClick={() => triggerDownload({ fileName: `${tool.slug}-result.txt`, blob: new Blob([output], { type: "text/plain;charset=utf-8" }) })} className="focus-ring rounded-lg bg-blue-700 px-3 py-2 text-xs font-bold text-white">Download text result</button> : null}</div></div>}
    </section>
  );

  /* Legacy duplicate render removed; the canonical workspace render is above. */
}
