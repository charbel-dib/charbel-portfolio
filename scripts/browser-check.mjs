import assert from 'node:assert/strict';
import { expect } from 'playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { projects } from '../content/projects.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PORTFOLIO_PLAYWRIGHT_MODULE || 'playwright');
const base=process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch({headless:true,...(process.env.PORTFOLIO_BROWSER?{executablePath:process.env.PORTFOLIO_BROWSER}:{}),args:['--no-sandbox']});
const reports=fileURLToPath(new URL('../reports/',import.meta.url));await mkdir(reports,{recursive:true});
const errors=[];let checks=0;
async function assertOpeningProject(page,label) {
 // Native font metrics vary by OS. Require actual visible content, not a fixed Y coordinate.
 await page.evaluate(()=>document.fonts.ready);
 const metrics=await page.locator('.project-visual').first().evaluate(el=>{
  const rect=el.getBoundingClientRect();
  return {
   viewport:{width:innerWidth,height:innerHeight},scrollY,
   project:{top:rect.top,bottom:rect.bottom,height:rect.height},
   visibleHeight:Math.max(0,Math.min(rect.bottom,innerHeight)-Math.max(rect.top,0)),
   requiredHeight:Math.min(rect.height,innerHeight*(innerWidth>640?.2:.1)),
   font:getComputedStyle(document.documentElement).fontFamily
  };
 });
 // Save evidence before asserting, so a CI failure includes the mobile screen and measurements.
 await page.screenshot({path:reports+label+'-opening.png'});
 await writeFile(reports+label+'-opening.json',JSON.stringify(metrics,null,2)+'\n');
 assert.ok(metrics.scrollY===0&&metrics.project.top>=0&&metrics.visibleHeight>=metrics.requiredHeight,
  `First project must be visible in the opening viewport (${label}): ${JSON.stringify(metrics)}`);
 checks++;
}
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/missing/deep/page'))errors.push(`${r.status()} ${r.url()}`);});
 await page.goto(base,{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').innerText(),'Charbel Dib.');checks++;
 await assertOpeningProject(page,'desktop');
 await page.screenshot({path:reports+'desktop.png',fullPage:true});
 await page.screenshot({path:reports+'desktop-fold.png'});
 await page.locator('#projects').screenshot({path:reports+'selected-work.png'});
 for(const [category,total] of [['agents',2],['rag',2],['ml',2],['data',1],['all',7]]){
  await page.locator(`[data-filter="${category}"]`).click();
  assert.equal(await page.locator('.project-row:visible').count(),total);checks++;
  assert.equal(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed'),'true');checks++;
 }
 const copyButton=page.locator('[data-copy]');
 await copyButton.click();
 // Clipboard writes resolve asynchronously; a click does not await the handler's promise.
 await expect(page.locator('#copy-feedback')).toHaveText('Adresse copiée');checks++;
 await expect.poll(()=>page.evaluate(()=>navigator.clipboard.readText())).toBe(await copyButton.getAttribute('data-copy'));checks++;
 await page.getByRole('link',{name:'English',exact:true}).click();assert.equal(await page.locator('html').getAttribute('lang'),'en');checks++;
 assert.match(await page.locator('h1').innerText(),/Charbel Dib/);
 await page.goto(base+'/recherche/');
 assert.match(await page.locator('.profile-nav [aria-current="page"]').innerText(),/Recherche/);checks++;
 assert.equal(await page.locator('.research-study').count(),2);checks++;
 assert.ok(await page.locator('#publication').isVisible());checks++;
 await page.getByRole('link',{name:'English',exact:true}).click();
 assert.equal(new URL(page.url()).pathname,'/en/research/index.html');checks++;
 assert.equal(await page.locator('body').getAttribute('data-profile'),'research');checks++;
 await page.locator('.profile-nav a').filter({hasText:'Professional'}).click();
 assert.equal(await page.locator('body').getAttribute('data-profile'),'pro');checks++;
 assert.equal(new URL(page.url()).pathname,'/en/pro/index.html');checks++;
 const certificate=await context.request.get(base+'/assets/Google-Data-Analytics-Charbel-Dib.pdf');
 assert.equal(certificate.status(),200);assert.equal((await certificate.body()).subarray(0,4).toString(),'%PDF');checks+=2;
 await page.goto(base+'/projects/atlas.html');
 await page.getByRole('link',{name:'English',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/en/projects/atlas.html');checks++;
 assert.match(await page.locator('.case-meta').innerText(),/In progress/);checks++;
 await page.goto(base+'/projects/servicepilot.html');await page.screenshot({path:reports+'servicepilot.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 assert.equal(await page.locator('#main-nav').isVisible(),false);checks++;
 await assertOpeningProject(page,'mobile');
 const heroTop=await page.locator('.hero').evaluate(el=>el.getBoundingClientRect().top);
 await page.locator('.menu-button').click();await expect(page.locator('#main-nav')).toBeVisible();checks++;
 assert.equal(await page.locator('.hero').evaluate(el=>el.getBoundingClientRect().top),heroTop);checks++;
 await page.keyboard.press('Escape');await expect(page.locator('#main-nav')).toBeHidden();checks++;
 assert.equal(await page.locator('.menu-button').evaluate(el=>el===document.activeElement),true);checks++;
 await page.locator('.menu-button').click();await page.locator('#main-nav a[href$="#projects"]').click();
 await expect(page.locator('#main-nav')).toBeHidden();checks++;
 await page.locator('[data-filter="agents"]').click();
 await expect(page.getByRole('status').filter({hasText:'2 projets affichés'})).toBeVisible();checks++;
 assert.match(await page.locator('.filter-count').ariaSnapshot(),/2 projets affichés/);checks++;
 for(const target of await page.locator('.menu-button, .locale, .identity, .filters button').all()) {
  const box=await target.boundingBox();assert.ok(box.height>=44&&box.width>=44,'Touch control smaller than 44px');checks++;
 }
 await page.goto(base+'/recherche/');
 await page.locator('.row-title a[href*="fleetguard.html"]').click();
 assert.equal(await page.locator('body').getAttribute('data-profile'),'research');checks++;
 assert.match(await page.locator('.back-link').getAttribute('href'),/recherche\/index.html#project-index$/);checks++;
 await page.locator('.locale').click();
 assert.equal(new URL(page.url()).searchParams.get('profile'),'research');checks++;
 assert.equal(await page.locator('body').getAttribute('data-profile'),'research');checks++;
 await page.locator('[data-next-project]').click();
 assert.equal(new URL(page.url()).pathname,'/en/projects/posaidon.html');checks++;
 assert.equal(new URL(page.url()).searchParams.get('profile'),'research');checks++;
 await page.locator('.back-link').click();
 assert.equal(new URL(page.url()).pathname,'/en/research/index.html');checks++;
 assert.equal(new URL(page.url()).hash,'#project-index');checks++;
 await page.goto(base+'/pro/');
 await page.locator('.row-title a[href*="lpbf.html"]').click();
 assert.equal(await page.locator('body').getAttribute('data-profile'),'pro');checks++;
 await page.locator('.locale').click();
 assert.match(await page.locator('h1').innerText(),/Quality in additive manufacturing/);checks++;
 assert.equal(await page.locator('body').getAttribute('data-profile'),'pro');checks++;
 await page.locator('[data-next-project]').click();
 assert.equal(new URL(page.url()).pathname,'/en/projects/fleetguard.html');checks++;
 await page.goto(base+'/projects/atlas.html?profile=invalid');
 assert.equal(await page.locator('body').getAttribute('data-profile'),'pro');checks++;
 await page.goto(base);await page.screenshot({path:reports+'mobile.png',fullPage:true});
 for(const [lang,path] of [['fr','/pro/'],['en','/en/pro/']]) {
  await page.goto(base+path);
  // A wider fallback catches text wrapping that Windows system-ui alone does not exercise.
  await page.evaluate(()=>{document.documentElement.style.fontFamily='Verdana, sans-serif';});
  await assertOpeningProject(page,`mobile-fallback-${lang}`);
 }
 const paths=['/','/en/index.html','/pro/','/recherche/','/en/pro/','/en/research/',...projects.flatMap(p=>[`/projects/${p.slug}.html`,`/en/projects/${p.slug}.html`])];
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const path of paths){
   await page.goto(base+path,{waitUntil:'load'});
   const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src)}));
   assert.ok(result.scroll<=result.width+1,`Overflow at ${width}: ${path} (${result.scroll})`);checks++;
   assert.deepEqual(result.broken,[],`Broken images: ${path}`);checks++;
   await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
   const enlarged=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,font:getComputedStyle(document.documentElement).fontSize}));
   assert.equal(enlarged.font,'32px');
   assert.ok(enlarged.scroll<=enlarged.width+1,`Enlarged text overflow at ${width}: ${path} (${enlarged.scroll})`);checks++;
  }
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);
 assert.equal(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');checks++;
 const response=await context.request.get(base+'/assets/CV_Charbel_Dib.pdf');assert.equal(response.status(),200);assert.equal((await response.body()).subarray(0,4).toString(),'%PDF');checks++;
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const plain=await nojs.newPage();await plain.goto(base);
 assert.equal(await plain.locator('.project-row:visible').count(),7);assert.equal(await plain.locator('#main-nav').isVisible(),true);checks+=2;
 await plain.goto(base+'/projects/fleetguard.html?profile=research');
 assert.equal(await plain.locator('.profile-nav a').count(),2);checks++;
 assert.ok(await plain.getByRole('link',{name:'Recherche',exact:true}).isVisible());checks++;
 const missing=await page.goto(base+'/missing/deep/page');assert.equal(missing.status(),404);checks++;
 assert.equal(await page.locator('h1').innerText(),'Page introuvable.');checks++;
 assert.ok(await page.getByRole('link',{name:'Open the English portfolio'}).isVisible());checks++;
 assert.equal(await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(0, 0, 0, 0)');
 await page.getByRole('link',{name:'Revenir au portfolio'}).click();assert.equal(new URL(page.url()).pathname,'/pro/index.html');checks++;
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${checks} checks. FR/EN pages, profile context through cases/languages/return, accessible filters, stable menu, touch targets, clipboard, publication, PDFs, no-JS, reduced motion and 320–1440px overflow at normal and 200% text. No browser errors.`);
} finally {await browser.close();}
