import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, resolve } from 'node:path';
import assert from 'node:assert/strict';
import { projects } from '../content/projects.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(join(dir,e.name)):join(dir,e.name)))).flat();}
const files=await walk(root),pages=files.filter(f=>f.endsWith('.html'));
let links=0;
for(const file of pages){
 const html=await readFile(file,'utf8');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`Duplicate IDs: ${file}`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`Expected one h1: ${file}`);
 assert.match(html,/<html lang="(fr|en)">/);
 assert.match(html,/<meta name="description" content="[^"]+">/);
 assert.match(html,/<link rel="canonical"/);
 for(const image of html.matchAll(/<img\b[^>]*>/g))assert.match(image[0],/alt="[^"]+"/,`Missing alt in ${file}`);
 for(const attr of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=attr[1].replaceAll('&amp;','&');
  if(/^(https?:|mailto:|data:)/.test(url))continue;
  const [path,hash]=url.split('#'),target=path?(path.startsWith('/')?resolve(root,'.'+decodeURIComponent(path)):resolve(dirname(file),decodeURIComponent(path))):file;
  assert.ok((await stat(target)).isFile(),`Broken local URL: ${url} in ${file}`);links++;
  if(hash){const targetHtml=target===file?html:await readFile(target,'utf8');assert.ok(targetHtml.includes(`id="${hash}"`),`Missing anchor: ${url}`);}
 }
 for(const a of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))assert.match(a[0],/rel="noopener noreferrer"/);
}
assert.equal(pages.length,17);
assert.equal(projects.length,7);
for(const p of projects){
 for(const lang of ['fr','en'])for(const key of ['headline','summary','role','problem','decisions','result','value','limit'])assert.ok(p[key][lang],`Missing ${lang}.${key}: ${p.slug}`);
 assert.ok(p.links.length>0,`No evidence: ${p.slug}`);
}
assert.ok(!files.some(f=>/research-astek|rapport_de_stage|\.env|node_modules/.test(f)));
const js=await readFile(join(root,'script.js'),'utf8');assert.ok(!/innerHTML|eval\(/.test(js));
console.log(`PASS: ${pages.length} pages, ${links} local references, 7 bilingual case studies, unique IDs, alt text and publication allowlist.`);
