import { NextRequest, NextResponse } from "next/server";
import { extractYouTubeId } from "@/lib/youtube";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function transcribeWithGroq(file: File) {
  if (file.size > 4 * 1024 * 1024 || !/^(audio|video)\//.test(file.type)) return NextResponse.json({error:"Choose an audio or video file smaller than 4 MB."},{status:400});
  if (!process.env.GROQ_API_KEY) return NextResponse.json({ status: "GROQ_NOT_CONFIGURED", error: "Hosted transcription is temporarily unavailable. Paste caption text instead." }, { status: 503 });
  const form = new FormData(); form.append("file", file, file.name); form.append("model", "whisper-large-v3-turbo"); form.append("response_format", "verbose_json");
  const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", { method: "POST", headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` }, body: form, signal: AbortSignal.timeout(120000) });
  const payload = await response.json().catch(() => ({})) as { text?: string; segments?: Array<{ start?: number; end?: number; text?: string }>; error?: { message?: string } };
  if (!response.ok) return NextResponse.json({ status: "GROQ_ERROR", error: "The transcription service could not process that file." }, { status: response.status === 429 ? 429 : 502 });
  const segments = (payload.segments || []).map((segment) => ({ start: Number(segment.start || 0), duration: Math.max(0, Number(segment.end || 0) - Number(segment.start || 0)), text: (segment.text || "").trim() })).filter((segment) => segment.text);
  return NextResponse.json({ status: "OK", source: "groq", language: "", segments: segments.length ? segments : [{ start: 0, duration: 0, text: payload.text || "" }] });
}

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const file = (await request.formData()).get("file");
      if (!(file instanceof File)) return NextResponse.json({error:"Choose an audio or video file."},{status:400});
      return await transcribeWithGroq(file);
    }
    const body = await request.json().catch(()=>({}));
    if (typeof body?.url !== "string" || !extractYouTubeId(body.url)) return NextResponse.json({error:"Enter a valid YouTube video link."},{status:400});
    return NextResponse.json({status:"NO_CAPTIONS_AVAILABLE",error:"Use YouTube’s Show transcript feature, then paste permitted captions here."});
  } catch { return NextResponse.json({error:"The transcription request could not be completed."},{status:502}); }
}
