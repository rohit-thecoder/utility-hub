import { NextRequest,NextResponse } from "next/server";
import {apiGuard} from "@/lib/apiGuard";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export function GET(request:NextRequest){
const download=request.nextUrl.searchParams.get("mode")==="download";
const limited=apiGuard(request,download?"network-download":"network-ping",download?4:30,60000,download?60:300);if(limited)return limited;
const headers={"Cache-Control":"no-store, max-age=0"};
if(request.nextUrl.searchParams.get("mode")==="download"){
const bytes=new Uint8Array(512*1024);for(let i=0;i<bytes.length;i+=65536)crypto.getRandomValues(bytes.subarray(i,i+65536));
return new Response(bytes,{headers:{...headers,"Content-Type":"application/octet-stream"}});
}
const ip=request.headers.get("x-vercel-forwarded-for")||request.headers.get("x-forwarded-for")||request.headers.get("x-real-ip")||"";
return NextResponse.json({ip:ip.split(",")[0].trim()||null},{headers});
}
