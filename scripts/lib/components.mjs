import { site } from '../../content/site.mjs';
import { profiles, publication } from '../../content/profiles.mjs';
import { visuals } from '../../content/visuals.mjs';
import { cvs } from '../../content/cvs.mjs';
import { arrow, base, casePath, esc, homePath, number, out, publicPath, rel } from './html.mjs';

export function shell({ lang, path, title, description, body, project, profile = 'pro', error = false }) {
  const t = site[lang];
  const other = lang === 'fr' ? 'en' : 'fr';
  const home = rel(path, homePath(lang, profile));
  const alternatePath = project ? casePath(other, project) : homePath(other, profile);
  const alternate = rel(path, alternatePath) + (project ? `?profile=${profile}` : '');
  const canonical = base + '/' + publicPath(path === 'index.html' || path === 'en/index.html' ? homePath(lang, profile) : path);
  const homeAttrs = `data-profile-home data-pro-href="${rel(path, homePath(lang, 'pro'))}" data-research-href="${rel(path, homePath(lang, 'research'))}"`;
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}">
  <meta name="theme-color" content="#f5f3ee"><meta name="color-scheme" content="light">
  ${error ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="${other}" href="${base}/${publicPath(alternatePath)}">
  <link rel="alternate" hreflang="${lang}" href="${canonical}">`}
  <meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${lang === 'fr' ? 'fr_FR' : 'en_GB'}">
  <meta property="og:image" content="${base}/assets/social-${lang}-${profile}.png">
  <meta property="og:image:alt" content="Charbel Dib — ${profiles[profile][lang].label} · ${lang === 'fr' ? 'Ingénieur IA' : 'AI engineer'}">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="${rel(path, 'favicon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${rel(path, 'styles.css')}"><script src="${rel(path, 'script.js')}" defer></script>
</head>
<body id="top" data-profile="${profile}" data-page="${project ? 'case' : error ? 'error' : 'home'}">
  <a class="skip" href="#main">${t.skip}</a>
  <header class="header">
    <div class="wrap header-inner">
      <a class="identity" href="${home}" ${homeAttrs} aria-label="Charbel Dib">
        <span class="identity-mark" aria-hidden="true">c/d</span><span>Charbel Dib<span class="identity-dot">.</span></span>
      </a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav">Menu <span aria-hidden="true">+</span></button>
      <nav id="main-nav" aria-label="${lang === 'fr' ? 'Navigation principale' : 'Main navigation'}">
        ${(profile === 'research' || project ? [['publication', 'Publication'], ['projects', profile==='research' ? (lang === 'fr' ? 'Travaux' : 'Work') : t.nav[0]], ['about', t.nav[1]], ['contact', t.nav[2]]] : [['projects', t.nav[0]], ['about', t.nav[1]], ['contact', t.nav[2]]]).map(([id, label]) => `<a href="${home}#${id}" ${homeAttrs} data-home-anchor="${id}"${id==='publication' && profile==='pro' ? ' hidden' : ''}>${label}</a>`).join('')}
      </nav>
      <a class="locale" href="${alternate}" lang="${other}" hreflang="${other}" aria-label="${t.locale}">${other.toUpperCase()} ${arrow}</a>
    </div>
  </header>
  <div class="profile-bar"><div class="wrap profile-inner">
    <p>${lang === 'fr' ? 'Explorer mon travail' : 'Explore my work'}</p>
    <nav class="profile-nav" aria-label="${lang === 'fr' ? 'Choisir un parcours' : 'Choose a profile'}">
      ${['pro', 'research'].map(key => `<a href="${rel(path, homePath(lang, key))}" data-profile-choice="${key}"${profile === key ? ' aria-current="page"' : ''}>${profiles[key][lang].label}</a>`).join('')}
    </nav>
  </div></div>
  ${body}
  <footer class="wrap footer"><span>© 2026 Charbel Dib</span><span>${t.footer}</span><a href="#top">${t.top} ↑</a></footer>
</body></html>`;
}

export function flow(t) {
  return `<div class="flow">
    <p class="flow-kicker">ServicePilot <span>${t.flowLabel}</span></p>
    <div class="flow-inputs">${t.flow.slice(0, 3).map(label => `<span>${label}</span>`).join('')}</div>
    <ol class="flow-steps">
      ${t.flow.slice(3).map((label, i) => `<li${i === 2 ? ' class="approval"' : ''}>${i === 2 ? '<span aria-hidden="true">✓</span> ' : ''}${label}</li>`).join('')}
    </ol><p class="flow-note">${t.flowNote}</p>
  </div>`;
}

export function cvLink(lang, profile, path, contextual = true) {
  const cv = cvs[profile][lang];
  return `<a class="underlink" href="${rel(path, cv.file)}" download ${contextual ? `data-cv data-cv-pro="${rel(path, cvs.pro[lang].file)}" data-cv-research="${rel(path, cvs.research[lang].file)}" data-label-pro="${cvs.pro[lang].label}" data-label-research="${cvs.research[lang].label}"` : ''} aria-label="${cv.label}"><span data-cv-label>${cv.label}</span> ↓</a>`;
}

export function cvAlternatives(lang, path) {
  return `<details class="cv-alternatives"><summary>${lang === 'fr' ? 'Autres versions du CV' : 'Other CV versions'}</summary><div class="case-links">${['pro','research'].map(profile => cvLink(lang, profile, path, false)).join('')}</div></details>`;
}

export function methodDiagram(project, lang, compact = false) {
  const visual = visuals[project.slug]?.[lang];
  if (!visual) return '';
  const id = `method-${project.slug}`;
  return `<figure class="method-diagram" aria-labelledby="${id}">
    <p class="eyebrow">${lang === 'fr' ? 'LA DÉMARCHE' : 'THE APPROACH'}</p>
    <${compact ? 'h4' : 'h2'} id="${id}">${visual.title}</${compact ? 'h4' : 'h2'}>
    <ol class="method-steps">${visual.steps.map(([label, detail], i) => `<li>
      <span class="method-number" aria-hidden="true">0${i + 1}</span><${compact ? 'h5' : 'h3'}>${label}</${compact ? 'h5' : 'h3'}><p>${detail}</p>
    </li>`).join('')}</ol>
    <figcaption>${visual.note}</figcaption>
  </figure>`;
}

export function fleetMetrics(project, lang, detailed = false) {
  const t = site[lang], m = project.metrics;
  if (!detailed) return `<div class="metrics">
    <div><strong>${number(m.recall, lang)}<span>%</span></strong><span>${t.metricRecall}</span></div>
    <div><strong>${number(m.precision, lang)}<span>%</span></strong><span>${t.metricPrecision}</span></div>
  </div><p class="metric-scope">Scania APS · ${number(m.observations, lang)} ${lang === 'fr' ? 'observations · résultats du dépôt' : 'observations · repository results'}</p>`;
  const cost = m.missedFailures * m.missedFailureCost + m.falseAlerts * m.falseAlertCost;
  return `<div class="result-panel">
    <p class="eyebrow">${lang === 'fr' ? 'LE COMPROMIS MESURÉ' : 'THE MEASURED TRADE-OFF'}</p>
    <dl class="result-stats">
      <div><dt>${lang === 'fr' ? 'Défaillances manquées' : 'Missed failures'}</dt><dd>${number(m.missedFailures, lang)}</dd></div>
      <div><dt>${lang === 'fr' ? 'Fausses alertes' : 'False alerts'}</dt><dd>${number(m.falseAlerts, lang)}</dd></div>
      <div><dt>${lang === 'fr' ? 'Coût du challenge' : 'Challenge cost'}</dt><dd>${number(cost, lang)}</dd></div>
    </dl>
    <p>${lang === 'fr' ? `Test officiel · ${number(m.observations, lang)} observations. Une défaillance manquée coûte ${m.missedFailureCost} unités ; une fausse alerte, ${m.falseAlertCost}.` : `Official test · ${number(m.observations, lang)} observations. A missed failure costs ${m.missedFailureCost} units; a false alert, ${m.falseAlertCost}.`}</p>
    <a class="underlink" href="${project.links[1].url}" ${out}>${project.links[1].label[lang]} ${arrow}</a>
  </div>`;
}

export function paperLink(lang) {
  return `<a class="paper" href="${publication.url}" ${out}>
    <span class="eyebrow">${lang === 'fr' ? 'PREMIER AUTEUR' : 'FIRST AUTHOR'} / IEEE 2026</span>
    <h3>${esc(publication.title)}</h3><span>${site[lang].paperLink} ${arrow}</span>
  </a>`;
}
