import { site } from '../../content/site.mjs';
import { certificate, profiles, publication, researchStudies } from '../../content/profiles.mjs';
import { arrow, caseLink, casePath, down, esc, homePath, orderedProjects, out, projectBySlug, rel, sectionHeading, tagList } from './html.mjs';
import { fleetMetrics, flow, methodDiagram, paperLink, shell } from './components.mjs';

function hero(lang, profile, path, t) {
  const proof = profile === 'research'
    ? `<a href="#publication">${t.proof[2]} ${arrow}</a><span>${t.proof[0]}</span>`
    : `<span>${t.proof[0]}</span><a href="${caseLink(path, lang, projectBySlug('posaidon'), profile)}">${t.proof[1]} ${arrow}</a><a href="${caseLink(path, lang, projectBySlug('lpbf'), profile)}">${t.proof[2]} ${arrow}</a>`;
  return `<section class="wrap hero" aria-labelledby="hero-title">
    <div class="hero-overline"><p class="eyebrow">${t.overline}</p><span class="location">${t.location}</span></div>
    <h1 id="hero-title">Charbel Dib<span>.</span></h1>
    <div class="hero-bottom"><div><p class="hero-lead">${t.hero}</p>
      <div class="hero-actions">
        <a class="button" href="${profile === 'research' ? '#publication' : '#projects'}">${t.discover} ${down}</a>
        <a class="underlink" href="${rel(path, 'assets/CV_Charbel_Dib.pdf')}" download>${t.resume} ${down}</a>
        <a class="underlink" href="mailto:charbel.dib@ensta.fr">${t.email} ${arrow}</a>
      </div>
    </div><aside class="hero-aside"><p>${t.heroNote}</p>
      <p class="availability"><span class="status-dot" aria-hidden="true"></span>${t.availability}</p>
    </aside></div>
  </section><div class="wrap proof-strip" aria-label="${lang === 'fr' ? 'Quelques repères' : 'At a glance'}">${proof}</div>`;
}

function featuredCard(project, index, lang, profile, path) {
  const t = site[lang], fr = lang === 'fr';
  const link = caseLink(path, lang, project, profile);
  const fleet = project.slug === 'fleetguard';
  return `<article class="featured">
    <a class="project-visual ${fleet ? 'fleet-visual' : 'pos-visual'}" href="${link}" aria-label="${esc(t.caseStudy + ' — ' + project.name[lang])}">
      ${fleet ? `<p class="visual-caption"><span>FleetGuard / ML</span>${arrow}</p>` : ''}
      <img src="${rel(path, 'assets/' + project.image)}" alt="${esc(project.imageAlt[lang])}" width="${fleet ? '1440' : '1920'}" height="${fleet ? '1280' : '1080'}" loading="lazy">
      ${fleet ? `<span class="visual-foot">${t.actualUI}</span>` : `<span class="award-block"><strong>${t.award}</strong><span>SPASEA 2025</span></span>`}
    </a>
    ${fleet ? '' : `<a class="photo-credit" href="${project.links[0].url}" ${out}>${t.photo} ${arrow}</a>`}
    <div class="project-byline"><span>0${index} / ${project.kind[lang]}</span><span>${project.year}</span></div>
    <h3><a href="${link}">${esc(project.name[lang])}</a></h3>
    <p class="project-descriptor">${project.descriptor[lang]}</p><p>${project.summary[lang]}</p>
    ${fleet ? fleetMetrics(project, lang) : `<p class="project-outcome">${fr ? '1er prix SPASEA 2025 · contribution aux outils agentiques et à la corrélation multi-sources.' : 'SPASEA 2025 first prize · contributed agent tools and multi-source correlation.'}</p>`}
    <a class="underlink" href="${link}">${t.caseStudy} ${arrow}</a>
  </article>`;
}

function selectedWork(lang, profile, path, t) {
  const pilot = projectBySlug('servicepilot');
  return `<section class="wrap section" id="projects" aria-labelledby="work-title">
    ${sectionHeading(lang === 'fr' ? 'RÉALISATIONS' : 'WORK', t.selected, t.selectedDesc, 'work-title')}
    <div class="featured-grid">${['fleetguard', 'posaidon'].map((slug, i) => featuredCard(projectBySlug(slug), i + 1, lang, profile, path)).join('')}</div>
    <article class="pilot-feature"><div class="pilot-copy">
      <div class="project-byline"><span>03 / ${pilot.kind[lang]}</span><span>${pilot.year}</span></div>
      <h3><a href="${caseLink(path, lang, pilot, profile)}">${pilot.name[lang]}</a></h3>
      <p class="project-descriptor">${pilot.descriptor[lang]}</p><p>${pilot.summary[lang]}</p>
      ${tagList(pilot, lang)}<a class="underlink" href="${caseLink(path, lang, pilot, profile)}">${t.caseStudy} ${arrow}</a>
    </div>${flow(t)}</article>
  </section>`;
}

function projectIndex(lang, profile, path, t) {
  return `<section class="wrap section project-index" id="project-index" aria-labelledby="index-title">
    ${sectionHeading('INDEX', t.all, '', 'index-title')}
    <div class="index-toolbar" hidden>
      <div class="filters" role="group" aria-label="${lang === 'fr' ? 'Filtrer les projets' : 'Filter projects'}">
        ${['all', 'agents', 'rag', 'ml', 'data'].map((category, i) => `<button type="button" data-filter="${category}" aria-pressed="${i === 0}">${t.filters[i]}</button>`).join('')}
      </div><p class="filter-count" role="status" aria-live="polite" aria-atomic="true" data-count-label="${t.count}">7 ${t.count}</p>
    </div>
    <div class="project-rows">${orderedProjects(profile).map((project, i) => `<article class="project-row" data-category="${project.category}">
      <span class="row-number">0${i + 1}</span>
      <div class="row-title"><h3><a href="${caseLink(path, lang, project, profile)}">${esc(project.name[lang])} ${arrow}</a></h3><p>${project.descriptor[lang]}</p></div>
      <div class="row-meta"><span>${project.kind[lang]}</span><small>${project.status[lang]}</small></div><span class="row-year">${project.year}</span>
    </article>`).join('')}</div>
    <a class="underlink index-github" href="https://github.com/charbel-dib?tab=repositories" ${out}>${t.viewAll} ${arrow}</a>
  </section>`;
}

function researchContent(lang, path) {
  const fr = lang === 'fr';
  return `<section class="wrap section publication-section" id="publication" aria-labelledby="publication-title">
    ${sectionHeading(fr ? 'PUBLICATION · PREMIER AUTEUR' : 'PUBLICATION · FIRST AUTHOR', fr ? 'Un travail publié' : 'Published research', '', 'publication-title')}
    <article class="publication-feature"><div class="publication-margin"><span class="eyebrow">IEEE / 3SCEA</span><strong>2026</strong><span>${fr ? 'Premier auteur' : 'First author'}</span></div>
      <div class="publication-copy"><h3>${esc(publication.title)}</h3>
        <p class="paper-authors">${esc(publication.authors)}</p><p class="paper-venue">${esc(publication.venue)}</p>
        <p>${fr ? 'À partir d’une base expérimentale, j’ai étudié les relations entre paramètres L-PBF et densité relative en comparant des modèles prédictifs et le clustering des configurations. Ce travail prolonge mon stage au CESI / LINEACT.' : 'Using an experimental database, I studied relationships between L-PBF parameters and relative density by comparing predictive models and clustering configurations. This work builds on my CESI / LINEACT internship.'}</p>
        <div class="case-links"><a class="button" href="${publication.url}" ${out}>${fr ? 'Lire la publication' : 'Read the paper'} ${arrow}</a><a class="underlink" href="${caseLink(path, lang, projectBySlug('lpbf'), 'research')}">${fr ? 'La démarche du stage' : 'The research approach'} ${arrow}</a></div>
        <p class="paper-doi">DOI: ${publication.doi}</p>
      </div>
    </article>
  </section>
  <section class="wrap section research-studies" id="projects" aria-labelledby="studies-title">
    ${sectionHeading(fr ? 'EXPÉRIENCES DE RECHERCHE' : 'RESEARCH EXPERIENCE', fr ? 'Deux stages, une démarche' : 'Two internships, a shared approach', '', 'studies-title')}
    ${researchStudies[lang].map((study, i) => `<article class="research-study">
      <div class="study-heading"><p class="eyebrow">0${i + 1} / ${study.label}</p><h3>${study.title}</h3><a class="underlink" href="${caseLink(path, lang, projectBySlug(study.slug), 'research')}">${fr ? 'Lire le dossier' : 'Read the case study'} ${arrow}</a></div>
      <div class="study-body"><dl>${[['Question', study.question], [fr ? 'Ma démarche' : 'My approach', study.method], [fr ? 'Apport' : 'Contribution', study.contribution]].map(([label, text]) => `<div><dt>${label}</dt><dd>${text}</dd></div>`).join('')}</dl><p class="study-limit">${study.limit}</p></div>
    </article>`).join('')}
  </section>`;
}

function background(lang, path, t) {
  return `<section class="wrap section about" id="about" aria-labelledby="about-title">
    <div><p class="eyebrow">${t.about}</p><h2 id="about-title">${t.aboutTitle}</h2><p>${t.aboutText}</p>
      <a class="underlink" href="${rel(path, 'assets/CV_Charbel_Dib.pdf')}" download>${t.cv} ${down}</a>
    </div><ol class="timeline">${t.timeline.map(([year, company, role, location]) => `<li><span class="timeline-date">${year}</span><div><h3>${company}</h3><p>${role}</p><small>${location}, France</small></div></li>`).join('')}</ol>
  </section>
  <section class="wrap skills" aria-labelledby="skills-title"><h2 id="skills-title">${t.skillsTitle}</h2>
    <div class="skill-list">${t.skills.map(([label, tools, evidence]) => `<article><h3>${label}</h3><p>${tools}</p><small>↳ ${evidence}</small></article>`).join('')}</div>
  </section>
  <section class="wrap credentials" id="certifications" aria-labelledby="certifications-title">
    <div><h2 id="certifications-title">${lang === 'fr' ? 'Formation complémentaire' : 'Additional training'}</h2><h3>${certificate.title}</h3>
      <p>${certificate.issuer} · <time datetime="${certificate.date}">${lang === 'fr' ? '23 mars 2024' : '23 March 2024'}</time></p>
    </div><div><p>${lang === 'fr' ? 'Professional Certificate · huit cours · SQL, R, Tableau et tableurs.' : 'Professional Certificate · eight courses · SQL, R, Tableau and spreadsheets.'}</p>
      <div class="case-links"><a class="underlink" href="${certificate.url}" ${out}>${lang === 'fr' ? 'Vérifier le certificat' : 'Verify certificate'} ${arrow}</a><a class="underlink" href="${rel(path, certificate.file)}" download>${lang === 'fr' ? 'Télécharger le PDF' : 'Download PDF'} ${down}</a></div>
    </div>
  </section>`;
}

function contact(t) {
  return `<section class="wrap contact section" id="contact" aria-labelledby="contact-title">
    <div><p class="eyebrow">${t.contactLabel}</p><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactText}</p></div>
    <div class="contact-right"><a class="contact-email" href="mailto:charbel.dib@ensta.fr">charbel.dib@ensta.fr ${arrow}</a>
      <div class="contact-links"><a href="https://www.linkedin.com/in/charbel-dib7" ${out}>LinkedIn ${arrow}</a><a href="https://github.com/charbel-dib" ${out}>GitHub ${arrow}</a><button type="button" data-copy="charbel.dib@ensta.fr" data-success="${t.copied}" data-error="${t.copyFail}" hidden>${t.copy}</button></div>
      <p id="copy-feedback" class="copy-feedback" role="status"></p><p class="contact-location">${t.mobility}<br>${t.languages}</p>
    </div>
  </section>`;
}

export function home(lang, profile = 'pro', path = homePath(lang, profile)) {
  const t = { ...site[lang], ...profiles[profile][lang] };
  const researchBand = `<section class="research-band"><div class="wrap research"><div><p class="eyebrow">${lang === 'fr' ? 'RECHERCHE' : 'RESEARCH'}</p><h2>${t.research}<span>.</span></h2><p>${t.researchIntro}</p></div><div>${paperLink(lang)}</div></div></section>`;
  const body = `<main id="main">${hero(lang, profile, path, t)}
    ${profile === 'research' ? researchContent(lang, path) : selectedWork(lang, profile, path, t)}
    ${projectIndex(lang, profile, path, t)}${profile === 'pro' ? researchBand : ''}
    ${background(lang, path, t)}${contact(t)}</main>`;
  return shell({ lang, path, title: t.title, description: t.description, body, profile });
}

function evidenceLinks(project, lang, path) {
  return project.links.map(link => `<a class="underlink" href="${link.local ? rel(path, link.url) : link.url}" ${link.local ? '' : out}>${link.label[lang]} ${link.local ? down : arrow}</a>`).join('');
}

export function casePage(lang, project) {
  const t = site[lang], path = casePath(lang, project);
  const profile = ['lpbf', 'fact-checking'].includes(project.slug) ? 'research' : 'pro';
  const links = evidenceLinks(project, lang, path);
  const anchors = [[t.problem, 'problem'], [t.choices, 'choices'], [t.results, 'results'], [t.limits, 'limits']];
  const next = {};
  for (const key of ['pro', 'research']) {
    const order = orderedProjects(key), index = order.findIndex(item => item.slug === project.slug);
    next[key] = order[(index + 1) % order.length];
  }
  const image = project.image ? `<figure class="case-visual ${project.slug === 'fleetguard' ? 'case-interface' : ''}"><img src="${rel(path, 'assets/' + project.image)}" alt="${esc(project.imageAlt[lang])}" width="${project.slug === 'posaidon' ? '1920' : '1440'}" height="${project.slug === 'posaidon' ? '1080' : '1280'}"><figcaption>${project.caption[lang]}${project.slug === 'posaidon' ? ` <a href="${project.links[0].url}" ${out}>ENSTA ${arrow}</a>` : ''}</figcaption></figure>` : '';
  const diagram = project.slug === 'servicepilot' ? `<div class="case-flow">${flow(t)}</div>` : methodDiagram(project, lang);
  const body = `<main id="main" class="case-main">
    <section class="wrap case-hero" aria-labelledby="case-title">
      <a class="back-link" href="${rel(path, homePath(lang, profile))}#project-index" data-profile-home data-home-anchor="project-index" data-pro-href="${rel(path, homePath(lang, 'pro'))}" data-research-href="${rel(path, homePath(lang, 'research'))}">← ${t.back}</a>
      <p class="eyebrow">${project.kind[lang]} · ${project.year}</p>
      <h1 id="case-title">${esc(project.name[lang])}<span>.</span></h1>
      <p class="case-headline">${project.headline[lang]}</p><p class="case-summary">${project.summary[lang]}</p>
      <dl class="case-meta"><div><dt>${t.context}</dt><dd>${project.status[lang]}</dd></div><div><dt>${t.contribution}</dt><dd>${project.role[lang]}</dd></div></dl>
      <div class="case-links">${links}</div>
    </section><div class="wrap case-artifact">${image || diagram}</div>
    <div class="wrap case-layout"><nav class="case-toc" aria-label="${t.jump}"><p class="eyebrow">${t.jump}</p>${anchors.map(([label, id]) => `<a href="#${id}">${label}</a>`).join('')}${tagList(project, lang)}</nav>
      <div class="case-body">
        <section id="problem"><p class="eyebrow" aria-hidden="true">01</p><h2>${t.problem}</h2><p>${project.problem[lang]}</p></section>
        <section id="choices"><p class="eyebrow" aria-hidden="true">02</p><h2>${t.choices}</h2>${project.decisions[lang].map(([label, text], i) => `<article class="decision"><span aria-hidden="true">0${i + 1}</span><div><h3>${label}</h3><p>${text}</p></div></article>`).join('')}</section>
        <section id="results"><p class="eyebrow" aria-hidden="true">03</p><h2>${t.results}</h2><p>${project.result[lang]}</p>
          ${project.metrics ? fleetMetrics(project, lang, true) : project.slug === 'posaidon' ? diagram : ''}
          <div class="takeaway"><h3>${t.value}</h3><p>${project.value[lang]}</p></div><div class="case-links">${links}</div>
        </section>
        <section id="limits" class="limits"><p class="eyebrow" aria-hidden="true">04</p><h2>${t.limits}</h2><p>${project.limit[lang]}</p></section>
      </div>
    </div>
    <a class="wrap next-project" href="${caseLink(path, lang, next[profile], profile)}" data-next-project
      data-next-pro="${caseLink(path, lang, next.pro, 'pro')}" data-next-research="${caseLink(path, lang, next.research, 'research')}"
      data-name-pro="${esc(next.pro.name[lang])}" data-name-research="${esc(next.research.name[lang])}">
      <span class="eyebrow">${t.next}</span><span><span data-next-name>${esc(next[profile].name[lang])}</span>${arrow}</span>
    </a>
  </main>`;
  return shell({ lang, path, title: `${project.name[lang]} — Charbel Dib`, description: project.summary[lang], body, project, profile });
}

export function errorPage() {
  const body = `<main id="main" class="wrap error-page"><p class="eyebrow">404</p><h1>Page introuvable<span>.</span></h1><p lang="en">Page not found. Choose a portfolio to continue.</p><div class="case-links"><a class="button" href="pro/index.html">Revenir au portfolio ${arrow}</a><a class="underlink" lang="en" href="en/pro/index.html">Open the English portfolio ${arrow}</a></div></main>`;
  return shell({ lang: 'fr', path: '404.html', title: 'Page introuvable — Charbel Dib', description: 'Page introuvable / Page not found', body, error: true })
    .replace(/(href|src|data-pro-href|data-research-href)="(?!https?:|mailto:|#)([^"]+)"/g, '$1="/$2"');
}
