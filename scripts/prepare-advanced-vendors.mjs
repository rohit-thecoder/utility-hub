// Self-host pinned upstream browser assets. No user files or credentials are involved.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
const output=resolve("public/vendor/advanced");
const work=mkdtempSync(join(tmpdir(),"quiiktool-vendors-"));
const specs=[
  {pkg:"pdfjs-dist@6.5.438",dir:"pdfjs",files:[["legacy/build/pdf.mjs","pdf.mjs"],["legacy/build/pdf.worker.mjs","pdf.worker.mjs"],["cmaps","cmaps"],["standard_fonts","standard_fonts"],["wasm","wasm"]]},
  {pkg:"pdf-lib@1.17.1",dir:"pdf-lib",files:[["dist/pdf-lib.min.js","pdf-lib.min.js"]]},
  {pkg:"@pdfsmaller/pdf-encrypt@1.2.0",dir:"encrypt",files:[["dist/pdf-encrypt.umd.js","pdf-encrypt.umd.js"]]},
  {pkg:"@tensorflow/tfjs@4.22.0",dir:"tfjs",files:[["dist/tf.min.js","tf.min.js"]]},
  {pkg:"upscaler@1.0.0",dir:"upscaler",files:[["dist/browser/umd/upscaler.min.js","upscaler.min.js"]]},
  {pkg:"@upscalerjs/default-model@1.0.0",dir:"model",files:[["dist/umd/index.min.js","definition.js"],["models","models"]]}
];
try {
  mkdirSync(output,{recursive:true});
  for(const [i,spec] of specs.entries()){
    const dest=join(output,spec.dir);
    const required=spec.files.every(([,name])=>existsSync(join(dest,name)));
    if(required)continue;
    const target=join(work,String(i));mkdirSync(target,{recursive:true});
    const command=process.platform==="win32"?"npm.cmd":"npm";
    const packed=JSON.parse(execFileSync(command,["pack",spec.pkg,"--json","--ignore-scripts","--pack-destination",target],{encoding:"utf8",shell:process.platform==="win32",maxBuffer:8*1024*1024}));
    execFileSync("tar",["-xf",join(target,packed[0].filename),"-C",target]);
    const root=join(target,"package");mkdirSync(dest,{recursive:true});
    for(const [source,name] of spec.files){
      let from=join(root,source);
      // PDF.js also publishes a modern build; fall back if the legacy layout changes.
      if(!existsSync(from)&&source.startsWith("legacy/"))from=join(root,source.slice(7));
      if(!existsSync(from))throw new Error("Missing upstream asset: "+spec.pkg+" / "+source);
      cpSync(from,join(dest,name),{recursive:true});
    }
    for(const name of ["LICENSE","LICENSE.md","LICENSE.txt","license","NOTICE","README.md"]){
      const source=join(root,name);if(existsSync(source))cpSync(source,join(dest,name),{recursive:true});
    }
    console.log("Prepared "+spec.pkg);
  }
}finally{rmSync(work,{recursive:true,force:true});}
