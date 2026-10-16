import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const config=JSON.parse(await readFile(fileURLToPath(new URL('../vercel.json',import.meta.url)),'utf8'));
const securityHeaders=Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
    const bytes=await readFile(file);
    res.writeHead(200,{...securityHeaders,'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(bytes);
  } catch {
    res.writeHead(404,{...securityHeaders,'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(resolve(root,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port}`));
for(const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>server.close(()=>process.exit(0)));
