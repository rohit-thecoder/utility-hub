import {NextRequest,NextResponse} from "next/server";
import {apiGuard,boundedJson,bodyError} from "@/lib/apiGuard";
export const runtime="nodejs";
export const dynamic="force-dynamic";
type Media={id?:string;media_type?:string;media_url?:string;permalink?:string;source?:string;children?:{data?:Media[]}};
type ResponseData=Media & {data?:Media[];paging?:{next?:string;cursors?:{after?:string}};error?:unknown};
const reply=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"private, no-store"}});
const apiVersion="v27.0";
const mediaUrl=(value:unknown)=>{if(typeof value!=="string")return null;try{const u=new URL(value);const host=u.hostname.toLowerCase();if(u.protocol!=="https:"||u.username||u.password||u.port||!["fbcdn.net","cdninstagram.com","fbsbx.com"].some(d=>host===d||host.endsWith("."+d)))return null;return u.href;}catch{return null;}};
function instagramCode(value:string){try{const u=new URL(value);if(u.protocol!=="https:"||!["instagram.com","www.instagram.com","m.instagram.com"].includes(u.hostname)||u.username||u.password||u.port)return null;return u.pathname.match(/^\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)\/?$/)?.[1]||null;}catch{return null;}}
function facebookId(value:string){if(/^\d{5,30}$/.test(value))return value;try{const u=new URL(value);if(u.protocol!=="https:"||!["facebook.com","www.facebook.com","m.facebook.com","web.facebook.com"].includes(u.hostname)||u.username||u.password||u.port)return null;const id=u.pathname.match(/\/(?:videos|reel|reels)\/(\d{5,30})(?:\/|$)/)?.[1]||u.searchParams.get("v");return id&&/^\d{5,30}$/.test(id)?id:null;}catch{return null;}}
async function graph(host:"graph.instagram.com"|"graph.facebook.com",path:string,token:string,fields:string,after?:string){const u=new URL("https://"+host+"/"+apiVersion+"/"+path);u.searchParams.set("fields",fields);if(path.endsWith("/media"))u.searchParams.set("limit","50");if(after)u.searchParams.set("after",after);const response=await fetch(u,{headers:{Authorization:"Bearer "+token},cache:"no-store",redirect:"error",signal:AbortSignal.timeout(8000)});const data=await response.json().catch(()=>null) as ResponseData|null;if(!response.ok||!data||data.error)throw Error(response.status===429?"Meta rate limit reached. Try later.":"Meta did not authorize this request. Check the access token, permissions and media ID.");return data;}
export async function POST(request:NextRequest){
if(process.env.NEXT_PUBLIC_ENABLE_DOWNLOADERS!=="true")return reply({error:"Authorized media downloads are disabled for this deployment."},403);
const limited=apiGuard(request,"authorized-media",5,60000,40);if(limited)return limited;
let body:Record<string,unknown>;try{body=await boundedJson(request);}catch(e){return bodyError(e);}
if(!body||body.authorized!==true||typeof body.token!=="string"||typeof body.input!=="string"||!["instagram","facebook"].includes(String(body.platform)))return reply({error:"Provide your own access token, media identifier and permission confirmation."},400);
const token=body.token.trim(),input=body.input.trim();if(!token||token.length>4096||/[\r\n]/.test(token)||!input||input.length>1000)return reply({error:"Invalid token or identifier."},400);
try{
let items:{url:string;type:string}[]=[];
if(body.platform==="instagram"){
const fields="id,media_type,media_url,permalink,children{id,media_type,media_url}";
let found:Media|undefined;
if(/^\d{5,30}$/.test(input)){found=await graph("graph.instagram.com",input,token,fields);}
else{const code=instagramCode(input);if(!code)return reply({error:"Enter an Instagram media ID or full Instagram post/reel URL."},400);let after:string|undefined;for(let i=0;i<3;i++){const data=await graph("graph.instagram.com","me/media",token,fields,after);found=data.data?.find(item=>item.permalink&&instagramCode(item.permalink)===code);if(found||!data.paging?.next||!data.paging.cursors?.after)break;after=data.paging.cursors.after;}}
if(!found)return reply({error:"Post not found in the authorized account’s first 150 media items. Use the exact media ID for older posts."},404);
const assets=found.media_type==="CAROUSEL_ALBUM"?found.children?.data||[]:[found];for(const asset of assets){const url=mediaUrl(asset.media_url);if(url&&["VIDEO","IMAGE"].includes(asset.media_type||""))items.push({url,type:asset.media_type==="VIDEO"?"video":"image"});}
}else{const id=facebookId(input);if(!id)return reply({error:"Enter a numeric Facebook video ID or full video/reel URL. Short share links are not supported."},400);const data=await graph("graph.facebook.com",id,token,"id,source");const url=mediaUrl(data.source);if(url)items=[{url,type:"video"}];}
if(!items.length)return reply({error:"Meta did not return an authorized media file. The token may lack the required permissions, or the media may be restricted."},404);
return reply({items});
}catch(e){return reply({error:e instanceof Error&&e.message.startsWith("Meta")?e.message:"Meta request failed. Try again with a valid authorized media ID."},502);}
}
