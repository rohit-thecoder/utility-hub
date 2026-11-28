// Read-only checks against a running deployment; no paid provider requests.
import {allTools} from "../src/data/toolsRegistry";
const base=new URL(process.env.SMOKE_BASE_URL||"http://localhost:3000");
const urls=["/","/all-tools","/robots.txt","/sitemap.xml","/ads.txt","/about","/contact","/privacy-policy","/terms","/disclaimer",...allTools.map(tool=>"/tools/"+tool.slug)];
const failures:string[]=[];let completed=0;let disabled=0;const batches=Array.from({length:4},(_,i)=>urls.filter((_,j)=>j%4===i));
async function check(path:string){try{const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(20000),redirect:"follow"});const text=await response.text();if(!response.ok)throw Error("HTTP "+response.status);if(path==="/robots.txt"&&process.env.SMOKE_EXPECT_INDEXING==="true"&&/Disallow:\s*\/\s*(?:\n|$)/i.test(text))throw Error("Production crawling blocked");if(path==="/ads.txt"&&!/google\.com,\s*pub-\d+,\s*DIRECT/i.test(text))throw Error("Missing Google seller record");if(path==="/sitemap.xml"&&!text.includes("<urlset"))throw Error("Invalid sitemap response");if(path.startsWith("/tools/")){const slug=path.split("/").pop();if(!text.includes(slug!))throw Error("Missing requested route identity");if(text.includes("Authorized Meta media downloads are disabled in this deployment"))disabled++;else if(text.includes("This tool is temporarily unavailable while its implementation is being improved"))throw Error("Unexpected maintenance page");}completed++;}catch(e){failures.push(path+": "+(e instanceof Error?e.message:"Request failed"));}}
async function main(){await Promise.all(batches.map(async batch=>{for(const path of batch)await check(path);}));
console.log("HTTP smoke checks passed: "+completed+"/"+urls.length+"; gated media routes: "+disabled+". This is not browser interaction testing.");
if(failures.length){console.error(failures.join("\n"));process.exitCode=1;}

}
main().catch(error=>{console.error(error);process.exitCode=1;});
