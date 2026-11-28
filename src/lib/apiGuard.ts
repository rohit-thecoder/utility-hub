import {NextRequest,NextResponse} from "next/server";
import {createHash} from "node:crypto";
type Bucket={count:number;until:number};
const buckets=new Map<string,Bucket>();
const MAX_KEYS=10000;
export function consumeLimit(key:string,limit:number,windowMs:number,now=Date.now()){
  for(const [k,v] of buckets)if(v.until<=now)buckets.delete(k);
  let entry=buckets.get(key);
  if(!entry){if(buckets.size>=MAX_KEYS)return {allowed:false,retryAfter:60};entry={count:0,until:now+windowMs};buckets.set(key,entry);}
  if(entry.count>=limit)return {allowed:false,retryAfter:Math.max(1,Math.ceil((entry.until-now)/1000))};
  entry.count++;return {allowed:true,retryAfter:0};
}
export function apiGuard(request:NextRequest,scope:string,limit:number,windowMs=60000,globalLimit=limit*30){
  const ip=(request.headers.get("x-vercel-forwarded-for")||request.headers.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,128);
  const key=createHash("sha256").update(ip).digest("hex");
  if(request.method==="POST"){
    const origin=request.headers.get("origin");
    if(origin){try{const allowed=[request.nextUrl.origin,process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean).map(v=>new URL(v!).origin);if(!allowed.includes(new URL(origin).origin))return NextResponse.json({error:"Cross-origin request denied."},{status:403,headers:{"Cache-Control":"no-store"}});}catch{return NextResponse.json({error:"Invalid request origin."},{status:403});}}
  }
  const local=consumeLimit(scope+":"+key,limit,windowMs);
  const shared=local.allowed?consumeLimit(scope+":global",globalLimit,windowMs):local;
  if(!shared.allowed)return NextResponse.json({error:"Too many requests. Please try again later."},{status:429,headers:{"Retry-After":String(shared.retryAfter),"Cache-Control":"no-store"}});
  return null;
}
export class BodyError extends Error {constructor(message:string,public status:number){super(message);}}
export async function boundedBody(request:Request,maxBytes:number):Promise<Uint8Array<ArrayBuffer>>{
  const advertised=request.headers.get("content-length");
  if(advertised!==null&&(!/^\d+$/.test(advertised)||Number(advertised)>maxBytes))throw new BodyError("Request body too large.",413);
  const reader=request.body?.getReader();if(!reader)throw new BodyError("Request body required.",400);
  const chunks:Uint8Array[]=[];let count=0;
  try{while(true){const part=await reader.read();if(part.done)break;count+=part.value.byteLength;if(count>maxBytes){await reader.cancel().catch(()=>{});throw new BodyError("Request body too large.",413);}chunks.push(part.value);}}finally{reader.releaseLock();}
  const data=new Uint8Array(count);let offset=0;for(const chunk of chunks){data.set(chunk,offset);offset+=chunk.length;}return data;
}
export async function boundedJson(request:Request,maxBytes=16384):Promise<Record<string,unknown>>{
  if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))throw new BodyError("Use application/json.",415);
  const data=await boundedBody(request,maxBytes);
  try{const value:unknown=JSON.parse(new TextDecoder().decode(data));if(!value||typeof value!=="object"||Array.isArray(value))throw Error();return value as Record<string,unknown>;}catch{throw new BodyError("Invalid JSON object.",400);}
}
export function bodyError(error:unknown){return NextResponse.json({error:error instanceof BodyError?error.message:"Invalid request."},{status:error instanceof BodyError?error.status:400,headers:{"Cache-Control":"no-store"}});}
