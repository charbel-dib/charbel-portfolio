import { site } from '../../content/site.mjs';
import { certificate, profiles, publication, researchStudies } from '../../content/profiles.mjs';
import { arrow, caseLink, casePath, commas, down, esc, homePath, meta, orderedProjects, out, projectBySlug, rel, sectionHeading, tagList } from './html.mjs';
import { cvLink, cvAlternatives, fleetMetrics, flow, measure, methodDiagram, paperLink, shell } from './components.mjs';

function hero(lang, profile, path, t) {
  const fr = lang === 'fr';
  const facts = [
    [fr ? 'Recherche' : 'Looking for', `<span class="availability">${t.availability}</span>`],
    [fr ? 'Formation' : 'Education', `<span class="hero-education">${commas(t.proof[0])}</span>`],
    [fr ? 'Publication' : 'Publication', `<a href="${profile === 'research' ? '#publication' : caseLink(path, lang, projectBySlug('lpbf'), profile)}">${fr ? 'Premier auteur, IEEE 3SCEA 2026' : 'First author, IEEE 3SCEA 2026'}</a>`],
    [fr ? 'Distinction' : 'Award', `<a href="${caseLink(path, lang, projectBySlug('posaidon'), profile)}">${fr ? '1er prix du hackathon SPASEA 2025' : '1st prize, SPASEA 2025 hackathon'}</a>`],
    [fr ? 'Dernier stage' : 'Latest internship', `<a href="${caseLink(path, lang, projectBySlug('fact-checking'), profile)}">${fr ? 'Astek, évaluation d’un pipeline RAG' : 'Astek, evaluating a RAG pipeline'}</a>`]
  ];
  return `<section class="wrap hero" aria-labelledby="hero-title">
    <div class="hero-main">
      <h1 id="hero-title">Charbel Dib</h1>
      <p class="hero-lead">${t.hero}</p>
      <p class="hero-description">${t.heroNote}</p>
      <div class="hero-actions">
        <a class="button" href="${profile === 'research' ? '#publication' : '#projects'}">${t.discover}</a>
        ${cvLink(lang, profile, path)}
        <a class="underlink" href="mailto:charbel.dib@ensta.fr">${t.email}</a>
      </div>
    </div>
    <dl class="hero-facts">${facts.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
  </section>`;
}

function experience(lang, path) {
  const fr = lang === 'fr';
  return `<section class="wrap experience" aria-labelledby="experience-title">
    <div><h2 id="experience-title">${fr ? 'Stage chez Astek Research Network' : 'Internship at Astek Research Network'}</h2><p class="experience-date">${fr ? 'Stage de fin d’études, mars à septembre 2026. NLP, RAG et évaluation.' : 'Final-year internship, March to September 2026. NLP, RAG and evaluation.'}</p></div>
    <div><p>${fr ? 'J’ai comparé des stratégies de recherche documentaire, étudié l’extraction de preuves et suivi les erreurs d’un pipeline de fact-checking climatique d’une étape à l’autre.' : 'I compared document retrieval strategies, studied evidence extraction and traced errors from one stage to the next in a climate fact-checking pipeline.'}</p>
    <a class="underlink" href="${caseLink(path, lang, projectBySlug('fact-checking'), 'pro')}">${fr ? 'Voir comment j’ai évalué le pipeline' : 'See how I evaluated the pipeline'}</a></div>
  </section>`;
}

function researchInterests(lang, path) {
  const fr = lang === 'fr';
  const axes = fr ? [
    ['Évaluation des systèmes NLP et RAG', 'Comprendre les erreurs de recherche, d’extraction et de génération, la qualité des preuves et les cas où le système doit s’abstenir.', ['fact-checking', 'ensta-assistant']],
    ['Apprentissage à partir de données et décision', 'Comparer des modèles, étudier les données et relier les métriques à ce que coûtent les erreurs.', ['lpbf', 'fleetguard']]
  ] : [
    ['Evaluation of NLP and RAG systems', 'Understand retrieval, extraction and generation errors, evidence quality and when a system should abstain.', ['fact-checking', 'ensta-assistant']],
    ['Learning from data and decision-making', 'Compare models, study data and connect metrics with what errors cost.', ['lpbf', 'fleetguard']]
  ];
  return `<section class="wrap section interests" id="interests" aria-labelledby="interests-title">${sectionHeading('', fr ? 'Deux axes de recherche' : 'Two research areas', '', 'interests-title')}<div class="interest-grid">${axes.map(([title, text, slugs]) => `<article><h3>${title}</h3><p>${text}</p><div class="case-links">${slugs.map(slug => `<a class="underlink" href="${caseLink(path, lang, projectBySlug(slug), 'research')}">${projectBySlug(slug).name[lang]}</a>`).join('')}</div></article>`).join('')}</div><p class="interests-close">${fr ? 'Si un sujet de votre équipe touche à l’un de ces axes, j’aimerais en parler.' : 'If one of your team’s topics touches either area, I would like to hear about it.'}</p><a class="underlink" href="#contact">${fr ? 'Échanger sur un sujet de thèse' : 'Discuss a PhD opportunity'}</a></section>`;
}

const projectNote = {
  servicepilot: { fr: 'SDK, API et parcours de validation. Mode déterministe par défaut, adaptateur LLM en option.', en: 'SDK, API and approval workflow. Deterministic by default, optional LLM adapter.' }
};

function selectedWork(lang, profile, path, t) {
  return `<section class="wrap section" id="projects" aria-labelledby="work-title">
    ${sectionHeading('', t.selected, t.selectedDesc, 'work-title')}
    <div class="selected-list">${['fleetguard', 'servicepilot', 'ensta-assistant'].map(slug => {
      const p = projectBySlug(slug), link = caseLink(path, lang, p, profile);
      const evidence = slug === 'fleetguard' ? fleetMetrics(p, lang) : p.chart ? measure(p.chart, lang) : `<p>${projectNote[slug][lang]}</p>`;
      return `<article class="selected-project"><div class="selected-copy">
        <p class="project-byline">${meta(p.kind[lang])}<span>${p.year}</span></p>
        <h3><a href="${link}">${p.name[lang]}</a></h3><p class="project-descriptor">${p.headline[lang]}</p>
        <p class="project-role">${p.role[lang]}</p>
        ${evidence}
        <a class="underlink" href="${link}">${t.caseStudy}</a></div>
        <div class="selected-visual">${slug === 'fleetguard' ? `<a class="project-visual fleet-visual" href="${link}" aria-label="${t.caseStudy} : FleetGuard"><img src="${rel(path, 'assets/fleetguard.webp')}" alt="${p.imageAlt[lang]}" width="1440" height="1280" loading="lazy"></a>` : slug === 'servicepilot' ? flow(t) : methodDiagram(p, lang, true)}</div>
      </article>`;
    }).join('')}</div>
  </section>`;
}

function projectIndex(lang, profile, path, t) {
  return `<section class="wrap section project-index" id="project-index" aria-labelledby="index-title">
    ${sectionHeading('', t.all, '', 'index-title')}
    <div class="index-toolbar" hidden>
      <div class="filters" role="group" aria-label="${lang === 'fr' ? 'Filtrer les projets' : 'Filter projects'}">
        ${['all', 'agents', 'rag', 'ml', 'data'].map((category, i) => `<button type="button" data-filter="${category}" aria-pressed="${i === 0}">${t.filters[i]}</button>`).join('')}
      </div><p class="filter-count" role="status" aria-live="polite" aria-atomic="true" data-count-label="${t.count}">7 ${t.count}</p>
    </div>
    <div class="project-rows">${orderedProjects(profile).map(project => `<article class="project-row" data-categories="${project.categories.join(' ')}">
      <div class="row-title"><h3><a href="${caseLink(path, lang, project, profile)}">${esc(project.name[lang])} ${arrow}</a></h3><p>${project.descriptor[lang]}</p></div>
      <div class="row-meta"><span>${commas(project.kind[lang])}</span><small>${commas(project.status[lang])}</small></div><span class="row-year">${project.year}</span>
    </article>`).join('')}</div>
    <a class="underlink index-github" href="https://github.com/charbel-dib?tab=repositories" ${out}>${t.viewAll}</a>
  </section>`;
}

function researchContent(lang, path) {
  const fr = lang === 'fr';
  return `<section class="wrap section publication-section" id="publication" aria-labelledby="publication-title">
    ${sectionHeading('', fr ? 'Publication en premier auteur' : 'First-author publication', '', 'publication-title')}
    <article class="publication-feature"><div class="publication-margin"><span>IEEE 3SCEA</span><strong>2026</strong><span>${fr ? 'Premier auteur' : 'First author'}</span></div>
      <div class="publication-copy"><h3>${esc(publication.title)}</h3>
        <p class="paper-authors">${esc(publication.authors)}</p><p class="paper-venue">${esc(publication.venue)}</p>
        <p>${fr ? 'À partir d’une base expérimentale, j’ai étudié le lien entre les paramètres L-PBF et la densité relative, en comparant des modèles prédictifs et en regroupant les configurations par clustering. Ce travail prolonge mon stage au CESI / LINEACT.' : 'Using an experimental database, I studied how L-PBF parameters relate to relative density, comparing predictive models and clustering the configurations. This work builds on my CESI / LINEACT internship.'}</p>
        <div class="case-links"><a class="button" href="${publication.url}" ${out}>${fr ? 'Lire sur IEEE' : 'Read on IEEE'}</a><a class="underlink" href="${caseLink(path, lang, projectBySlug('lpbf'), 'research')}">${fr ? 'Voir la démarche' : 'See the approach'}</a></div>
        <p class="paper-doi">DOI ${publication.doi}</p>
      </div>
    </article>
  </section>
  <section class="wrap section research-studies" id="projects" aria-labelledby="studies-title">
    ${sectionHeading('', fr ? 'Deux stages de recherche' : 'Two research internships', '', 'studies-title')}
    ${researchStudies[lang].map(study => `<article class="research-study">
      <div class="study-heading"><p class="project-byline">${meta(study.label)}</p><h3>${study.title}</h3><a class="underlink" href="${caseLink(path, lang, projectBySlug(study.slug), 'research')}">${fr ? 'Lire le dossier' : 'Read the case study'}</a></div>
      <div class="study-body"><dl>${[['Question', study.question], [fr ? 'Ma contribution' : 'My contribution', study.personal], [fr ? 'Méthode' : 'Method', study.method], [fr ? 'Apport' : 'Outcome', study.contribution], [fr ? 'Limites' : 'Limits', study.limit]].map(([label, text]) => `<div><dt>${label}</dt><dd>${text}</dd></div>`).join('')}</dl></div>
    </article>`).join('')}
  </section>`;
}

function background(lang, path, t) {
  const fr = lang === 'fr';
  return `<section class="wrap section about" id="about" aria-labelledby="about-title">
    <div class="about-intro"><h2 id="about-title">${t.aboutTitle}</h2><p>${t.aboutText}</p></div>
    <ol class="timeline">${t.timeline.map(([year, company, role, location]) => `<li><span class="timeline-date">${year}</span><div><h3>${company}</h3><p>${commas(role)}</p><small>${location}</small></div></li>`).join('')}</ol>
  </section>
  <section class="wrap skills" aria-labelledby="skills-title"><h2 id="skills-title">${t.skillsTitle}</h2>
    <div class="skill-list">${t.skills.map(([label, tools, evidence]) => `<article><h3>${label}</h3><p>${tools}</p><small>${fr ? 'Utilisé dans' : 'Used in'} ${commas(evidence)}</small></article>`).join('')}</div>
  </section>
  <section class="wrap credentials" id="certifications" aria-labelledby="certifications-title">
    <div><h2 id="certifications-title">${fr ? 'Formation complémentaire' : 'Additional training'}</h2><h3>${certificate.title}</h3>
      <p>${certificate.issuer.replace(' · ', ', ')}, <time datetime="${certificate.date}">${fr ? '23 mars 2024' : '23 March 2024'}</time></p>
    </div><div><p>${fr ? 'Professional Certificate en huit cours : SQL, R, Tableau et tableurs.' : 'Professional Certificate, eight courses: SQL, R, Tableau and spreadsheets.'}</p>
      <div class="case-links"><a class="underlink" href="${certificate.url}" ${out}>${fr ? 'Vérifier le certificat' : 'Verify certificate'}</a><a class="underlink" href="${rel(path, certificate.file)}" download>${fr ? 'Télécharger le PDF' : 'Download PDF'} ${down}</a></div>
    </div>
  </section>`;
}

function contact(lang, profile, path, t, isCase = false) {
  return `<section class="wrap contact section" id="contact" aria-labelledby="contact-title">
    <div><h2 id="contact-title">${t.contactTitle}</h2><p>${t.contactText}</p></div>
    <div class="contact-right"><a class="contact-email" href="mailto:charbel.dib@ensta.fr">charbel.dib@ensta.fr</a>
      <div class="contact-links"><a href="https://www.linkedin.com/in/charbel-dib7" ${out}>LinkedIn</a><a href="https://github.com/charbel-dib" ${out}>GitHub</a><button type="button" data-copy="charbel.dib@ensta.fr" data-success="${t.copied}" data-error="${t.copyFail}" hidden>${t.copy}</button></div>
      <p id="copy-feedback" class="copy-feedback" role="status" aria-live="polite"></p>${cvLink(lang, profile, path)}${isCase ? cvAlternatives(lang, path) : ''}<p class="contact-location">${commas(t.mobility)}<br>${commas(t.languages)}</p>
    </div>
  </section>`;
}

export function home(lang, profile = 'pro', path = homePath(lang, profile)) {
  const t = { ...site[lang], ...profiles[profile][lang] };
  const researchBand = `<section class="wrap research-band" id="publication"><div class="research"><div><h2>${lang === 'fr' ? 'Recherche' : 'Research'}</h2><p>${t.researchIntro}</p></div><div>${paperLink(lang)}</div></div></section>`;
  const body = `<main id="main">${hero(lang, profile, path, t)}
    ${profile === 'research' ? researchContent(lang, path) + researchInterests(lang, path) : experience(lang, path) + selectedWork(lang, profile, path, t)}
    ${projectIndex(lang, profile, path, t)}${profile === 'pro' ? researchBand : ''}
    ${background(lang, path, t)}${contact(lang, profile, path, t)}</main>`;
  return shell({ lang, path, title: t.title, description: t.description, body, profile });
}

function evidenceLinks(project, lang, path, profile) {
  return project.links.map(link => link.cv ? cvLink(lang, profile, path) : `<a class="underlink" href="${link.local ? rel(path, link.url) : link.url}" ${link.local ? '' : out}>${link.label[lang]}${link.local ? ` ${down}` : ''}</a>`).join('');
}

export function casePage(lang, project) {
  const t = site[lang], path = casePath(lang, project);
  const profile = ['lpbf', 'fact-checking'].includes(project.slug) ? 'research' : 'pro';
  const links = evidenceLinks(project, lang, path, profile);
  const anchors = [[t.results, 'results'], [t.problem, 'problem'], [t.choices, 'choices'], [lang === 'fr' ? 'Évaluation' : 'Evaluation', 'evaluation'], [t.limits, 'limits']];
  const next = {};
  for (const key of ['pro', 'research']) {
    const order = orderedProjects(key), index = order.findIndex(item => item.slug === project.slug);
    const following = order[index + 1];
    next[key] = { href: following ? caseLink(path, lang, following, key) : rel(path, homePath(lang, key)) + '#project-index', name: following ? following.name[lang] : t.back, label: following ? t.next : (lang === 'fr' ? 'Fin des projets' : 'End of projects') };
  }
  const image = project.image ? `<figure class="case-visual ${project.slug === 'fleetguard' ? 'case-interface' : ''}"><img src="${rel(path, 'assets/' + project.image)}" alt="${esc(project.imageAlt[lang])}" width="${project.slug === 'posaidon' ? '1920' : '1440'}" height="${project.slug === 'posaidon' ? '1080' : '1280'}"><figcaption>${project.caption[lang]}${project.slug === 'fleetguard' ? ` <a href="${rel(path, 'assets/' + project.image)}">${lang === 'fr' ? 'Agrandir la capture' : 'Enlarge screenshot'}</a>` : ''}${project.slug === 'posaidon' ? ` <a href="${project.links[0].url}" ${out}>ENSTA</a>` : ''}</figcaption></figure>` : '';
  const diagram = project.slug === 'servicepilot' ? `<div class="case-flow">${flow(t)}</div>` : methodDiagram(project, lang);
  const body = `<main id="main" class="case-main">
    <section class="wrap case-hero" aria-labelledby="case-title">
      <a class="back-link" href="${rel(path, homePath(lang, profile))}#project-index" data-profile-home data-home-anchor="project-index" data-pro-href="${rel(path, homePath(lang, 'pro'))}" data-research-href="${rel(path, homePath(lang, 'research'))}">${t.back}</a>
      <p class="project-byline">${meta(project.kind[lang])}<span>${project.year}</span></p>
      <h1 id="case-title">${esc(project.name[lang])}</h1>
      <p class="case-headline">${project.headline[lang]}</p><p class="case-summary">${project.summary[lang]}</p>
      <dl class="case-meta"><div><dt>${t.context}</dt><dd>${commas(project.status[lang])}</dd></div><div><dt>${t.contribution}</dt><dd>${project.role[lang]}</dd></div></dl>
      <div class="case-links">${links}</div>${project.slug === 'fact-checking' ? cvAlternatives(lang, path) : ''}
    </section><div class="wrap case-artifact">${image || diagram}</div>
    <div class="wrap case-layout"><nav class="case-toc" aria-label="${t.jump}"><p class="case-toc-label">${t.jump}</p>${anchors.map(([label, id]) => `<a href="#${id}">${label}</a>`).join('')}${tagList(project, lang)}</nav>
      <div class="case-body">
        <section id="results"><h2>${t.results}</h2><p>${project.result[lang]}</p>
          ${project.metrics ? fleetMetrics(project, lang, true) : ''}
          ${measure(project.chart, lang)}
          ${project.roadmap ? `<h3>${lang === 'fr' ? 'Suite envisagée' : 'Planned next'}</h3><p>${project.roadmap[lang]}</p>` : ''}
        </section>
        <section id="problem"><h2>${t.problem}</h2><p>${project.problem[lang]}</p></section>
        <section id="choices"><h2>${t.choices}</h2>${project.decisions[lang].map(([label, text]) => `<article class="decision"><h3>${label}</h3><p>${text}</p></article>`).join('')}</section>
        <section id="evaluation"><h2>${lang === 'fr' ? 'Évaluation' : 'Evaluation'}</h2><p>${project.evaluation[lang]}</p>
          ${project.example ? `<h3>${lang === 'fr' ? 'Scénario de démonstration' : 'Demonstration scenario'}</h3><p>${project.example[lang]}</p>` : ''}
          ${project.slug === 'posaidon' ? diagram : ''}
          <div class="takeaway"><h3>${t.value}</h3><p>${project.value[lang]}</p></div><div class="case-links">${links}</div>
        </section>
        <section id="limits" class="limits"><h2>${t.limits}</h2><p>${project.limit[lang]}</p></section>
      </div>
    </div>
    <a class="wrap next-project" href="${next[profile].href}" data-next-project
      data-next-pro="${next.pro.href}" data-next-research="${next.research.href}"
      data-name-pro="${esc(next.pro.name)}" data-name-research="${esc(next.research.name)}" data-label-pro="${next.pro.label}" data-label-research="${next.research.label}">
      <span class="next-label" data-next-label>${next[profile].label}</span><span class="next-name"><span data-next-name>${esc(next[profile].name)}</span></span>
    </a>
    ${contact(lang, profile, path, { ...t, contactTitle: lang === 'fr' ? 'Parlons de ce projet' : 'Let’s talk about this project', contactText: lang === 'fr' ? 'Pour une offre d’emploi ou un sujet de recherche, écrivez-moi.' : 'For a job opening or a research topic, write to me.' }, true)}
  </main>`;
  return shell({ lang, path, title: `${project.name[lang]} — ${project.descriptor[lang]} — Charbel Dib`, description: project.summary[lang], body, project, profile });
}

export function errorPage() {
  const body = `<main id="main" class="wrap error-page"><p class="error-code">404</p><h1>Page introuvable</h1><p lang="en">Page not found. Choose a portfolio to continue.</p><div class="case-links"><a class="button" href="pro/index.html">Revenir au portfolio</a><a class="underlink" lang="en" href="en/pro/index.html">Open the English portfolio</a></div></main>`;
  return shell({ lang: 'fr', path: '404.html', title: 'Page introuvable — Charbel Dib', description: 'Page introuvable / Page not found', body, error: true })
    .replace(/(href|src|data-pro-href|data-research-href)="(?!https?:|mailto:|#)([^"]+)"/g, '$1="/$2"');
}
