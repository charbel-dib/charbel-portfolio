// Targeted checks for the October 2026 content, CV and navigation revision.
import assert from 'node:assert/strict';
import { chromium, expect } from 'playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { projects } from '../content/projects.mjs';
import { profiles } from '../content/profiles.mjs';
import { cvs } from '../content/cvs.mjs';
const base=process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true});
const errors=[], results={contexts:0,pdfs:[],screenshots:[],contrast:[],performance:[]};
await mkdir('reports',{recursive:true});
const homes=[['fr','pro','/pro/'],['fr','research','/recherche/'],['en','pro','/en/pro/'],['en','research','/en/research/']];
const homePath=(lang,profile)=>homes.find(h=>h[0]===lang&&h[1]===profile)[2];
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000}}), page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 for (const lang of ['fr','en']) for (const profile of ['pro','research']) for (const p of projects) {
  const path=`${lang==='en'?'/en':''}/projects/${p.slug}.html`;
  await page.goto(`${base}${path}?profile=${profile}#evaluation`);
  await page.reload();
  assert.equal(await page.locator('body').getAttribute('data-profile'),profile);
  for (const link of await page.locator('[data-cv]').all()) {
   assert.equal(new URL(await link.getAttribute('href'),page.url()).pathname,'/'+cvs[profile][lang].file);
   assert.equal(await link.getAttribute('aria-label'),cvs[profile][lang].label);
  }
  assert.equal(new URL(await page.locator('.back-link').getAttribute('href'),page.url()).pathname,homePath(lang,profile)+'index.html');
  assert.equal(new URL(await page.locator('#main-nav [data-home-anchor="contact"]').getAttribute('href'),page.url()).hash,'#contact');
  assert.equal(await page.locator('#main-nav [data-home-anchor="publication"]').isVisible(),profile==='research');
  const order=profiles[profile].order, next=order[order.indexOf(p.slug)+1];
  const nextURL=new URL(await page.locator('[data-next-project]').getAttribute('href'),page.url());
  assert.equal(nextURL.pathname,next?`${lang==='en'?'/en':''}/projects/${next}.html`:homePath(lang,profile)+'index.html');
  if (!next) assert.equal(nextURL.hash,'#project-index');
  const initial=page.url();
  await page.locator('.locale').click();
  assert.equal(new URL(page.url()).searchParams.get('profile'),profile);
  assert.equal(new URL(page.url()).hash,'#evaluation');
  await page.locator('.locale').click();
  assert.equal(page.url(),initial);
  results.contexts++;
 }
 for(const p of projects) for(const lang of ['fr','en']) for(const query of ['', '?profile=invalid']) {
  await page.goto(`${base}${lang==='en'?'/en':''}/projects/${p.slug}.html${query}`);
  assert.equal(await page.locator('body').getAttribute('data-profile'),['lpbf','fact-checking'].includes(p.slug)?'research':'pro');
 }
 for(const [lang,profile,path] of homes) {
  await page.goto(base+path);
  for(const category of ['all','agents','rag','ml','data']) {
   await page.locator(`[data-filter="${category}"]`).click();
   const expected=profiles[profile].order.filter(slug=>category==='all'||projects.find(p=>p.slug===slug).categories.includes(category));
   const actual=await page.locator('.project-row:visible .row-title a').evaluateAll(els=>els.map(el=>el.href.match(/projects\/(.+)\.html/)[1]));
   assert.deepEqual(actual,expected);
   await expect(page.locator('.filter-count')).toHaveText(`${expected.length} ${lang==='fr'?'projets affichés':'projects shown'}`);
  }
  for(const width of [390,1440]) {
   await page.setViewportSize({width,height:width===390?844:1000});
   await page.goto(base+path);
   const file=`reports/revision-${lang}-${profile}-${width}.png`;
   await page.screenshot({path:file,fullPage:true});results.screenshots.push(file);
  }
 }
 for(const slug of ['fleetguard','servicepilot']) for(const width of [390,1440]) {
  await page.setViewportSize({width,height:width===390?844:1000});
  await page.goto(`${base}/projects/${slug}.html?profile=pro`);
  const file=`reports/revision-${slug}-${width}.png`;
  await page.screenshot({path:file,fullPage:true});results.screenshots.push(file);
 }
 // Every supplied PDF and historical URL is served as PDF with the exact supplied bytes.
 for(const [lang,profile] of homes) {
  const cv=cvs[profile][lang], response=await context.request.get(base+'/'+cv.file), bytes=await response.body();
  assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/^application\/pdf/);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),cv.sha256);
  const pages=(bytes.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
  assert.equal(pages,cv.pages);results.pdfs.push({file:cv.file,pages,sha256:cv.sha256,status:response.status()});
 }
 for(const path of ['/assets/CV_Charbel_Dib.pdf','/CV_Charbel_Dib.pdf']) {
  const response=await context.request.get(base+path);
  assert.equal(createHash('sha256').update(await response.body()).digest('hex'),cvs.pro.fr.sha256);
 }
 // Native keyboard menu, breakpoint reset, skip link and landscape.
 await page.setViewportSize({width:390,height:844});await page.goto(base+'/recherche/');
 await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();
 await page.keyboard.press('Enter');assert.equal(new URL(page.url()).hash,'#main');
 await page.locator('.menu-button').focus();await page.keyboard.press('Enter');
 await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.closest('#main-nav')!==null),true);
 await page.keyboard.press('Shift+Tab');await expect(page.locator('.menu-button')).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.locator('.menu-button')).toHaveAttribute('aria-expanded','false');
 assert.equal(await page.locator('#main-nav').evaluate(el=>el.inert),true);
 await page.setViewportSize({width:1024,height:768});assert.equal(await page.locator('#main-nav').evaluate(el=>el.inert),false);
 await page.setViewportSize({width:844,height:390});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 // Clipboard refusal and missing API: the address remains usable and feedback is announced.
 for(const mode of ['refused','missing']) {
  const c=await browser.newContext();await c.addInitScript(mode=>Object.defineProperty(navigator,'clipboard',{value:mode==='missing'?undefined:{writeText:async()=>{throw new Error('denied')}}}),mode);
  const p=await c.newPage();await p.goto(base);await p.locator('[data-copy]').click();
  await expect(p.locator('#copy-feedback')).toContainText('Copie indisponible');
  await expect(p.locator('.contact-email')).toHaveAttribute('href','mailto:charbel.dib@ensta.fr');await c.close();
 }
 // Optional elements absent must not break independent enhancements.
 const optional=await browser.newContext();await optional.route('**/*.html*',async route=>{
  const response=await route.fetch();let html=await response.text();
  html=html.replace(/<a class="locale"[\s\S]*?<\/a>/,'').replace(/<a class="wrap next-project"[\s\S]*?<\/a>/,'');
  await route.fulfill({response,body:html});
 });
 const sparse=await optional.newPage();sparse.on('pageerror',e=>errors.push(e.message));await sparse.goto(base+'/projects/fleetguard.html?profile=research');
 assert.equal(await sparse.locator('body').evaluate(el=>el.classList.contains('js')),true);await optional.close();
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}), plain=await nojs.newPage();
 for(const [lang,profile,path] of homes) {
  await plain.goto(base+path);assert.equal(await plain.locator('.project-row:visible').count(),7);await expect(plain.locator('.index-toolbar')).toBeHidden();
  assert.ok((await plain.locator('.hero-actions a[download]').getAttribute('href')).endsWith(cvs[profile][lang].file));
  await plain.goto(`${base}${lang==='en'?'/en':''}/projects/fleetguard.html?profile=${profile}`);
  await plain.locator('summary').click();
  for(const cv of [cvs.pro[lang],cvs.research[lang]]) await expect(plain.locator('.cv-alternatives a').filter({hasText:cv.label})).toBeVisible();
  await expect(plain.locator('.contact-email')).toBeVisible();
 }
 await nojs.close();
 // Contrast from actual computed colors on representative text and backgrounds.
 for(const path of ['/pro/','/recherche/','/projects/servicepilot.html','/projects/fleetguard.html']) {
  await page.goto(base+path);
  const contrasts=await page.evaluate(()=>{
   const rgb=c=>c.match(/[\d.]+/g).slice(0,3).map(Number);
   const lum=c=>rgb(c).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
   return [...document.querySelectorAll('.hero-description,.hero-aside,.project-status,.metrics strong,.tags li,.flow-note,.flow-steps li,.research p,.row-meta,.case-body p,.button,.study-body dt')].filter(el=>el.getClientRects().length).map(el=>{
    const s=getComputedStyle(el);let parent=el,bg='';
    while(parent){bg=getComputedStyle(parent).backgroundColor;if(bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')break;parent=parent.parentElement;}
    const a=lum(s.color),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05),size=parseFloat(s.fontSize),large=size>=24||(size>=18.66&&parseInt(s.fontWeight)>=700);
    return {selector:el.className||el.tagName,text:el.textContent.slice(0,45),foreground:s.color,background:bg,ratio:Number(ratio.toFixed(2)),required:large?3:4.5};
   });
  });
  for(const c of contrasts) assert.ok(c.ratio>=c.required,`Contrast ${path}: ${JSON.stringify(c)}`);
  results.contrast.push({path,minimum:Math.min(...contrasts.map(c=>c.ratio)),samples:contrasts.length});
 }
 // Lab measurements only: fresh contexts, Chromium mobile viewport, 4x CPU, 1.6 Mbps / 150ms latency.
 for(const [, ,path] of homes) {
  const c=await browser.newContext({viewport:{width:390,height:844}}), p=await c.newPage(), session=await c.newCDPSession(p);
  await session.send('Network.enable');await session.send('Network.setCacheDisabled',{cacheDisabled:true});
  await session.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1600000/8,uploadThroughput:750000/8});
  await session.send('Emulation.setCPUThrottlingRate',{rate:4});
  await p.addInitScript(()=>{window.lab={lcp:0,cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value}).observe({type:'layout-shift',buffered:true});});
  await p.bringToFront();
  await p.goto(base+path,{waitUntil:'networkidle'});
  // A screenshot forces a compositor frame in headless Chromium before reading paint entries.
  await p.screenshot({path:`reports/lab-${path.replaceAll('/','-')}.png`});
  await p.waitForFunction(()=>window.lab.lcp>0);
  const measurement=await p.evaluate(()=>({...window.lab,domContentLoaded:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,transferBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0)}));
  results.performance.push({path,...measurement});await c.close();
 }
 assert.deepEqual(errors,[]);
 await writeFile('reports/revision-results.json',JSON.stringify(results,null,2)+'\n');
 console.log(`PASS: ${results.contexts} contexts, PDF hashes/pages/MIME, all filters, keyboard/menu, clipboard failures, optional elements, no-JS, contrast, ${results.screenshots.length} screenshots and four lab measurements. No JS errors.`);
} finally {await browser.close();}
