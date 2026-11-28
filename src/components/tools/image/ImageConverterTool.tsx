"use client";

import { useState } from "react";
import JSZip from "jszip";
import type { Tool } from "@/data/toolsRegistry";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { useDownloadWithAd } from "@/components/ads/DownloadInterstitialProvider";

type Output = { blob: Blob; name: string };
const typeFor = (slug: string) => (slug.includes("to-png") || slug === "ico-converter") ? { mime: "image/png", extension: "png" } : slug.includes("to-webp") ? { mime: "image/webp", extension: "webp" } : { mime: "image/jpeg", extension: "jpg" };
const isHeic = (file: File) => /\.hei[cf]$/i.test(file.name) || /image\/hei[cf]/i.test(file.type);

async function decodeImage(file: File) {
  let source: Blob = file;
  if (isHeic(file)) { const { default: heic2any } = await import("heic2any"); const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 1 }); source = Array.isArray(converted) ? converted[0] : converted; }
  const url = URL.createObjectURL(source);
  try { const image = new Image(); image.src = url; await image.decode(); return { image, cleanup: () => URL.revokeObjectURL(url) }; }
  catch (error) { URL.revokeObjectURL(url); throw error; }
}

export function ImageConverterTool({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]); const [quality, setQuality] = useState(92); const [busy, setBusy] = useState(false); const [result, setResult] = useState<Output | null>(null); const [message, setMessage] = useState("");
  const { triggerDownload } = useDownloadWithAd();
  const convert = async () => {
    if (!files.length) { setMessage("Choose one or more image files first."); return; }
    setBusy(true); setResult(null); setMessage("");
    try {
      const target = typeFor(tool.slug); const converted: Output[] = [];
      for (const file of files) {
        const decoded = await decodeImage(file); const { image } = decoded;
        const canvas = document.createElement("canvas"); const scale = tool.slug === "ico-converter" ? Math.min(1, 256 / Math.max(image.naturalWidth, image.naturalHeight)) : 1; canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d"); if (!context) throw new Error("Canvas conversion is unavailable in this browser.");
        if (target.mime === "image/jpeg") { context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        let blob: Blob;
        try { blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("The browser could not encode this image.")), target.mime, target.mime === "image/png" ? undefined : quality / 100)); }
        finally { decoded.cleanup(); }
        if (blob.type !== target.mime) throw new Error("The browser does not support that output format.");
        if (tool.slug === "ico-converter") {
          const png = new Uint8Array(await blob.arrayBuffer());
          const ico = new Uint8Array(22 + png.length);
          const view = new DataView(ico.buffer);
          view.setUint16(2, 1, true); view.setUint16(4, 1, true);
          ico[6] = canvas.width === 256 ? 0 : canvas.width; ico[7] = canvas.height === 256 ? 0 : canvas.height;
          view.setUint16(10, 1, true); view.setUint16(12, 32, true);
          view.setUint32(14, png.length, true); view.setUint32(18, 22, true); ico.set(png, 22);
          blob = new Blob([ico], { type: "image/x-icon" });
        }
        converted.push({ blob, name: file.name.replace(/\.[^.]+$/, "") + "." + (tool.slug === "ico-converter" ? "ico" : target.extension) });
      }
      const output = converted.length === 1 ? converted[0] : await (async () => { const zip = new JSZip(); converted.forEach((item) => zip.file(item.name, item.blob)); return { blob: await zip.generateAsync({ type: "blob" }), name: `${tool.slug}-batch.zip` }; })();
      setResult(output); setMessage(`Converted ${converted.length} file${converted.length === 1 ? "" : "s"} successfully. Your output is ready to download.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "The images could not be converted."); }
    finally { setBusy(false); }
  };
  return <section className="surface rounded-3xl bg-white p-5 sm:p-7"><div className="flex items-center justify-between gap-3"><div><h2 className="font-display text-xl font-extrabold text-slate-900">{tool.name}</h2><p className="mt-1 text-sm text-slate-500">Choose up to 20 files. Conversion happens in this browser.</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">Local processing</span></div><div className="mt-6"><FileDropzone accept="image/jpeg,image/png,image/webp,image/heic,image/heif,image/svg+xml" formats={["JPG", "PNG", "WEBP", "HEIC", "SVG"]} onFiles={(incoming) => { setFiles((current) => [...current, ...incoming].slice(0, 20)); setResult(null); setMessage(""); }}/></div>{files.length > 0 && <div className="mt-5 space-y-2">{files.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-100 text-blue-700">✓</span><span className="min-w-0 flex-1 truncate font-semibold text-slate-700">{file.name}</span><span className="font-metrics text-xs text-slate-500">{Math.ceil(file.size / 1024)} KB</span><button onClick={() => setFiles((current) => current.filter((_, position) => position !== index))} className="text-orange-600">×</button></div>)}</div>}<label className="mt-6 block text-sm font-bold text-slate-700">Quality <span className="float-right font-metrics text-blue-700">{quality}%</span><input type="range" min="25" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="mt-3 w-full accent-blue-700"/></label><button disabled={busy} onClick={convert} className="focus-ring mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/25 disabled:opacity-60">{busy ? "Converting locally…" : `Convert to ${tool.slug === "ico-converter" ? "ICO" : typeFor(tool.slug).extension.toUpperCase()}`}</button>{message && <div className={`mt-5 rounded-2xl border p-4 ${result ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}><p className="text-sm font-bold text-slate-900">{message}</p>{result && <button onClick={() => triggerDownload({ fileName: result.name, blob: result.blob })} className="mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white">Download {result.name}</button>}</div>}</section>;
}
