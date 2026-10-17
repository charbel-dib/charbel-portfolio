import { relative, dirname, sep } from 'node:path';
import { projects } from '../../content/projects.mjs';
import { profiles } from '../../content/profiles.mjs';

export const base = 'https://charbel-dib.vercel.app';
export const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const arrow = '<span aria-hidden="true">↗</span>';
export const down = '<span aria-hidden="true">↓</span>';
export const out = 'target="_blank" rel="noopener noreferrer"';
export const homePath = (lang, profile = 'pro') =>
  `${lang === 'en' ? 'en/' : ''}${profile === 'research' ? (lang === 'fr' ? 'recherche' : 'research') : 'pro'}/index.html`;
export const publicPath = path => path.replace(/index\.html$/, '');
export const casePath = (lang, project) => `${lang === 'en' ? 'en/' : ''}projects/${project.slug}.html`;
export const rel = (from, to) => relative(dirname(from), to).split(sep).join('/') || 'index.html';
export const projectBySlug = slug => {
  const project = projects.find(item => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
};
export const orderedProjects = profile => profiles[profile].order.map(projectBySlug);
export const caseLink = (from, lang, project, profile) =>
  `${rel(from, casePath(lang, project))}?profile=${profile}`;
export const number = (value, lang) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB').format(value);
export const tagList = (project, lang) =>
  `<ul class="tags">${project.tags[lang].map(tag => `<li>${esc(tag)}</li>`).join('')}</ul>`;
export const sectionHeading = (eyebrow, title, description, id) => `
  <div class="section-heading">
    <div><p class="eyebrow">${eyebrow}</p><h2 id="${id}">${title}<span>.</span></h2></div>
    ${description ? `<p>${description}</p>` : ''}
  </div>`;
