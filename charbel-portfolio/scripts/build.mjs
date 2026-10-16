import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, dirname, sep } from 'node:path';
import { projects } from '../content/projects.mjs';
import { site } from '../content/site.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'https://charbel-dib.vercel.app';
const esc = x => String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const arrow = '<span aria-hidden="true">↗</span>';
const down = '<span aria-hidden="true">↓</span>';
const out = 'target="_blank" rel="noopener noreferrer"';
const homePath = lang => lang === 'fr' ? 'index.html' : 'en/index.html';
const casePath = (lang,p) => `${lang === 'en' ? 'en/' : ''}projects/${p.slug}.html`;
const rel = (from,to) => relative(dirname(from),to).split(sep).join('/') || 'index.html';
const tagList = p => `<ul class="tags">${p.tags.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`;
function flow(t) {
  return `<div class="flow" role="img" aria-label="${esc(t.flowLabel+'. '+t.flow.join(', ')+'. '+t.flowNote)}"><div class="flow-kicker">SERVICEPILOT <span>WORKFLOW</span></div><div class="flow-inputs">${t.flow.slice(0,3).map((s,i)=>`<span><i aria-hidden="true">0${i+1}</i>${s}</span>`).join('')}</div><div class="flow-stem" aria-hidden="true"></div><div class="flow-node">${t.flow[3]}</div><div class="flow-stem" aria-hidden="true"></div><div class="flow-node">${t.flow[4]}</div><div class="approval"><span aria-hidden="true">✓</span>${t.flow[5]}</div><div class="flow-finish">${t.flow[6]} <span aria-hidden="true">↗</span></div><p>${t.flowNote}</p></div>`;
}
function shell({lang,path,title,description,body,project}) {
 const t=site[lang],home=rel(path,homePath(lang)),other=lang==='fr'?'en':'fr';
 const alternate=rel(path,project?casePath(other,project):homePath(other));
 const canonical=base+'/'+(path==='index.html'?'':path);
 return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#f5f3ee"><meta name="color-scheme" content="light">
<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="${other}" href="${base+'/'+(project?casePath(other,project):homePath(other))}"><link rel="alternate" hreflang="${lang}" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${base}/assets/social-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${rel(path,'favicon.svg')}" type="image/svg+xml"><link rel="stylesheet" href="${rel(path,'styles.css')}"><script src="${rel(path,'script.js')}" defer></script>
</head>
<body id="top">
<a class="skip" href="#main">${t.skip}</a>
<header class="header"><div class="wrap header-inner"><a class="identity" href="${home}" aria-label="Charbel Dib"><span class="identity-mark" aria-hidden="true">c/d</span><span>Charbel Dib<span class="identity-dot">.</span></span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav">Menu <span aria-hidden="true">+</span></button><nav id="main-nav" aria-label="${lang==='fr'?'Navigation principale':'Main navigation'}"><a href="${home}#projects">${t.nav[0]}</a><a href="${home}#about">${t.nav[1]}</a><a href="${home}#contact">${t.nav[2]}</a></nav><a class="locale" href="${alternate}" lang="${other}" hreflang="${other}" aria-label="${t.locale}">${other.toUpperCase()} ${arrow}</a></div></header>
${body}
<footer class="wrap footer"><span>© 2026 Charbel Dib</span><span>${t.footer}</span><a href="#top">${t.top} ↑</a></footer>
</body></html>`;
}
function home(lang) {
 const t=site[lang],path=homePath(lang),link=p=>rel(path,casePath(lang,p)),asset=n=>rel(path,'assets/'+n);
 const [fleet,pos,pilot]=projects;
 const body=`<main id="main">
<section class="wrap hero" aria-labelledby="hero-title"><div class="hero-overline"><p class="eyebrow">PORTFOLIO / ${lang==='fr'?'INGÉNIERIE IA':'AI ENGINEERING'}</p><span class="location">${t.location} <span aria-hidden="true">↗</span></span></div><h1 id="hero-title">Charbel Dib<span>.</span></h1><div class="hero-bottom"><div><p class="hero-lead">${t.hero}</p><div class="hero-actions"><a class="button" href="#projects">${t.discover} ${down}</a><a class="underlink" href="https://github.com/charbel-dib" ${out}>GitHub ${arrow}</a><a class="underlink" href="${asset('CV_Charbel_Dib.pdf')}" download>${t.resume} ${down}</a></div></div><aside class="hero-aside"><p>${t.heroNote}</p><div class="availability"><span class="status-dot" aria-hidden="true"></span><span>${t.availability}<small>${t.mobility}</small></span></div></aside></div></section>
<div class="wrap proof-strip"><span>${t.proof[0]}</span><a href="${link(pos)}">${t.proof[1]} ${arrow}</a><a href="${link(projects[6])}">${t.proof[2]} ${arrow}</a></div>
<section class="wrap section" id="projects" aria-labelledby="work-title"><div class="section-heading"><div><p class="eyebrow">01 / ${lang==='fr'?'RÉALISATIONS':'WORK'}</p><h2 id="work-title">${t.selected}<span>.</span></h2></div><p>${t.selectedDesc}</p></div>
<div class="featured-grid">
<article class="featured featured-fleet"><a class="project-visual fleet-visual" href="${link(fleet)}" aria-label="${esc(t.caseStudy+' — FleetGuard')}"><div class="visual-caption"><span>FleetGuard / ML</span>${arrow}</div><img src="${asset('fleetguard.webp')}" alt="${esc(fleet.imageAlt[lang])}" width="1440" height="1280" loading="lazy"><span class="visual-foot">${t.actualUI}</span></a><div class="project-byline"><span>01 / ${fleet.kind[lang]}</span><span>${fleet.year}</span></div><h3><a href="${link(fleet)}">${fleet.headline[lang]}</a></h3><p>${fleet.summary[lang]}</p><div class="metrics"><div><strong>${lang==='fr'?'95,73':'95.73'}<span>%</span></strong><span>${t.metricRecall}</span></div><div><strong>${lang==='fr'?'43,05':'43.05'}<span>%</span></strong><span>${t.metricPrecision}</span></div></div><p class="metric-scope">${t.metricScope}</p><a class="underlink" href="${link(fleet)}">${t.caseStudy} ${arrow}</a></article>
<article class="featured featured-pos"><a class="project-visual pos-visual" href="${link(pos)}" aria-label="${esc(t.caseStudy+' — PosAIdon')}"><img src="${asset('posaidon.webp')}" alt="${esc(pos.imageAlt[lang])}" width="1920" height="1080" loading="lazy"><span class="award-block"><strong>${t.award}</strong><span>SPASEA 2025</span></span></a><a class="photo-credit" href="${pos.links[0].url}" ${out}>${t.photo} ${arrow}</a><div class="project-byline"><span>02 / ${pos.kind[lang]}</span><span>${pos.year}</span></div><h3><a href="${link(pos)}">${pos.headline[lang]}</a></h3><p>${pos.summary[lang]}</p>${tagList(pos)}<a class="underlink" href="${link(pos)}">${t.caseStudy} ${arrow}</a></article>
</div>
<article class="pilot-feature"><div class="pilot-copy"><div class="project-byline"><span>03 / ${pilot.kind[lang]}</span><span>2026</span></div><h3>${pilot.headline[lang]}</h3><p>${pilot.summary[lang]}</p>${tagList(pilot)}<a class="underlink" href="${link(pilot)}">${t.caseStudy} ${arrow}</a></div>${flow(t)}</article>
</section>
<section class="wrap section project-index" aria-labelledby="index-title"><div class="section-heading"><div><p class="eyebrow">02 / INDEX</p><h2 id="index-title">${t.all}<span>.</span></h2></div><p>${t.allDesc}</p></div><div class="index-toolbar" data-enhanced hidden><div class="filters" role="group" aria-label="${lang==='fr'?'Filtrer les projets':'Filter projects'}">${['all','agents','rag','ml','data'].map((key,i)=>`<button type="button" data-filter="${key}" aria-pressed="${i===0}">${t.filters[i]}</button>`).join('')}</div><p class="filter-count" aria-live="polite" data-count-label="${t.count}">7 ${t.count}</p></div><div class="project-rows">${projects.map((p,i)=>`<article class="project-row" data-category="${p.category}"><span class="row-number">0${i+1}</span><div class="row-title"><h3><a href="${link(p)}">${esc(p.name)} ${arrow}</a></h3><p>${p.summary[lang]}</p></div><div class="row-meta"><span>${p.kind[lang]}</span><small>${p.status[lang]}</small></div><span class="row-year">${p.year}</span></article>`).join('')}</div><a class="underlink index-github" href="https://github.com/charbel-dib?tab=repositories" ${out}>${t.viewAll} ${arrow}</a></section>
<section class="research-band"><div class="wrap research"><div><p class="eyebrow">03 / ${lang==='fr'?'RECHERCHE':'RESEARCH'}</p><h2>${t.research}<span>.</span></h2><p class="research-lead">${t.researchIntro}</p></div><div class="research-content"><p>${t.researchA}</p><a class="underlink" href="${link(projects[3])}">${lang==='fr'?'Le projet de fact-checking':'The fact-checking project'} ${arrow}</a><p>${t.researchB}</p><a class="paper" href="https://doi.org/10.1109/3SCEA68071.2026.11603067" ${out}><span class="eyebrow">${t.paper} / IEEE 2026</span><h3>Cluster-Based Learning for Relative Density Prediction in Laser Powder Bed Fusion</h3><span>${t.paperLink} ${arrow}</span></a></div></div></section>
<section class="wrap section about" id="about" aria-labelledby="about-title"><div><p class="eyebrow">04 / ${t.about.toUpperCase()}</p><h2 id="about-title">${t.aboutTitle}</h2><p>${t.aboutText}</p><p>${t.aboutText2}</p><a class="underlink" href="${asset('CV_Charbel_Dib.pdf')}" download>${t.cv} ${down}</a></div><ol class="timeline">${t.timeline.map(row=>`<li><span class="timeline-date">${row[0]}</span><div><h3>${row[1]}</h3><p>${row[2]}</p><small>${row[3]}, France</small></div></li>`).join('')}</ol></section>
<section class="wrap skills" aria-labelledby="skills-title"><h2 id="skills-title">${t.skillsTitle}</h2><div class="skill-list">${t.skills.map((row,i)=>`<article><span class="eyebrow">0${i+1}</span><h3>${row[0]}</h3><p>${row[1]}</p><small>↳ ${row[2]}</small></article>`).join('')}</div></section>
<section class="wrap contact section" id="contact" aria-labelledby="contact-title"><div><p class="eyebrow">05 / ${t.contactLabel.toUpperCase()}</p><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactText}</p></div><div class="contact-right"><a class="contact-email" href="mailto:charbel.dib@ensta.fr">charbel.dib@ensta.fr ${arrow}</a><div class="contact-links"><a href="https://www.linkedin.com/in/charbel-dib7" ${out}>LinkedIn ${arrow}</a><a href="https://github.com/charbel-dib" ${out}>GitHub ${arrow}</a><button type="button" data-copy="charbel.dib@ensta.fr" data-success="${t.copied}" data-error="${t.copyFail}" hidden>${t.copy}</button></div><p id="copy-feedback" class="copy-feedback" role="status"></p><p class="contact-location">${t.mobility}<br>${t.languages}</p></div></section>
</main>`;
 return shell({lang,path,title:t.title,description:t.description,body});
}
function casePage(lang,p,i) {
 const t=site[lang],path=casePath(lang,p),asset=n=>rel(path,'assets/'+n);
 const anchorLinks = [[t.problem,'problem'],[t.choices,'choices'],[t.results,'results'],[t.limits,'limits']];
 const links=p.links.map(l=>`<a class="underlink" href="${l.local?rel(path,l.url):l.url}" ${l.local?'':out}>${l.label[lang]} ${arrow}</a>`).join('');
 const visual = p.image ? `<figure class="case-visual ${p.slug==='fleetguard'?'case-interface':''}"><img src="${asset(p.image)}" alt="${esc(p.imageAlt[lang])}" ${p.slug==='posaidon'?'width="1920" height="1080"':'width="1440" height="1280"'}><figcaption>${p.caption[lang]}${p.slug==='posaidon'?` <a href="${p.links[0].url}" ${out}>ENSTA ${arrow}</a>`:''}</figcaption></figure>` : p.slug==='servicepilot'?`<div class="case-flow">${flow(t)}</div>`:'';
 const next=projects[(i+1)%projects.length];
 const body=`<main id="main" class="case-main"><section class="wrap case-hero"><a class="back-link" href="${rel(path,homePath(lang))}#projects">← ${t.back}</a><p class="eyebrow">${t.number.toUpperCase()} / 0${i+1} · ${esc(p.kind[lang])}</p><div class="case-title-line"><h1>${esc(p.name)}<span>.</span></h1><span class="case-year">${p.year}</span></div><p class="case-headline">${p.headline[lang]}</p><p class="case-summary">${p.summary[lang]}</p><div class="case-meta"><div><span class="eyebrow">${t.context}</span><p>${p.status[lang]}</p></div><div><span class="eyebrow">${t.contribution}</span><p>${p.role[lang]}</p></div></div><div class="case-links">${links}</div></section><div class="wrap">${visual}</div><div class="wrap case-layout"><nav class="case-toc" aria-label="${t.jump}"><p class="eyebrow">${t.jump}</p>${anchorLinks.map(([txt,id])=>`<a href="#${id}">${txt}</a>`).join('')}${tagList(p)}</nav><div class="case-body"><section id="problem"><p class="eyebrow">01 / ${t.problem}</p><h2>${p.headline[lang]}</h2><p>${p.problem[lang]}</p></section><section id="choices"><p class="eyebrow">02 / ${t.choices}</p>${p.decisions[lang].map((d,j)=>`<article class="decision"><span>0${j+1}</span><div><h3>${d[0]}</h3><p>${d[1]}</p></div></article>`).join('')}</section><section id="results"><p class="eyebrow">03 / ${t.results}</p><p class="result-text">${p.result[lang]}</p><div class="takeaway"><h3>${t.value}</h3><p>${p.value[lang]}</p></div><div class="case-links">${links}</div></section><section id="limits" class="limits"><p class="eyebrow">04 / ${t.limits}</p><p>${p.limit[lang]}</p></section></div></div><a class="wrap next-project" href="${rel(path,casePath(lang,next))}"><span class="eyebrow">${t.next}</span><span>${esc(next.name)} ${arrow}</span></a></main>`;
 return shell({lang,path,title:`${p.name} — Charbel Dib`,description:p.summary[lang],body,project:p});
}
for(const lang of ['fr','en']) {
 const files=[[homePath(lang),home(lang)],...projects.map((p,i)=>[casePath(lang,p),casePage(lang,p,i)])];
 for(const [path,html] of files){await mkdir(dirname(join(root,path)),{recursive:true});await writeFile(join(root,path),html);}
}
const t=site.fr;
await writeFile(join(root,'404.html'),shell({lang:'fr',path:'404.html',title:'Page introuvable — Charbel Dib',description:t.description,body:`<main id="main" class="wrap error-page"><p class="eyebrow">404</p><h1>${t.notFound}</h1><a class="button" href="index.html">${t.backHome} →</a></main>`}).replace(/(href|src)="(?!https?:|mailto:|#)([^"]+)"/g, '$1="/$2"'));
const paths=['', 'en/index.html', ...['fr','en'].flatMap(lang=>projects.map(p=>casePath(lang,p)))];
await writeFile(join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${base}/${p}</loc></url>`).join('')}</urlset>\n`);
await writeFile(join(root,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
// Publish an explicit allowlist only: reports, scripts and source data stay out of dist.
await rm(join(root,'dist'),{recursive:true,force:true});await mkdir(join(root,'dist'));
for(const file of ['index.html','en','projects','404.html','styles.css','script.js','favicon.svg','assets','sitemap.xml','robots.txt'])await cp(join(root,file),join(root,'dist',file),{recursive:true});
console.log(`Built ${paths.length} bilingual content pages + 404 into dist/.`);
