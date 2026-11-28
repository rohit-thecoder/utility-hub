import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST() { return NextResponse.json({ error: "Use the authorized Meta media workspace. Public scraping is no longer supported." }, { status: 410, headers: { "Cache-Control": "no-store" } }); }
