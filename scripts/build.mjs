import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname, resolve } from 'node:path';
import { projects } from '../content/projects.mjs';
import { base, casePath, homePath, publicPath } from './lib/html.mjs';
import { home, casePage, errorPage } from './lib/pages.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
for (const lang of ['fr', 'en']) {
  const rootPath = lang === 'fr' ? 'index.html' : 'en/index.html';
  const pages = [
    [rootPath, home(lang, 'pro', rootPath)],
    ...['pro', 'research'].map(profile => [homePath(lang, profile), home(lang, profile)]),
    ...projects.map(project => [casePath(lang, project), casePage(lang, project)])
  ];
  for (const [path, html] of pages) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), html.replace(/[ \t]+$/gm, ''));
  }
}
await writeFile(join(root, '404.html'), errorPage().replace(/[ \t]+$/gm, ''));
const paths = ['fr', 'en'].flatMap(lang => [
  ...['pro', 'research'].map(profile => publicPath(homePath(lang, profile))),
  ...projects.map(project => casePath(lang, project))
]);
await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${base}/${path}</loc></url>`).join('')}</urlset>\n`);
await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);

// Verify the resolved target before removing generated output.
const output = resolve(root, 'dist');
if (dirname(output) !== resolve(root)) throw new Error('Output must stay inside the repository.');
await rm(output, { recursive: true, force: true });
await mkdir(output);
// Explicit publication allowlist: private sources, reports and dependencies stay out.
for (const file of ['index.html', 'pro', 'recherche', 'en', 'projects', '404.html', 'styles.css', 'script.js', 'favicon.svg', 'assets', 'sitemap.xml', 'robots.txt']) {
  await cp(join(root, file), join(output, file), { recursive: true });
}
// Preserve the historical download URL using the single maintained CV asset.
await cp(join(root, 'assets/CV_Charbel_Dib.pdf'), join(output, 'CV_Charbel_Dib.pdf'));
console.log(`Built ${paths.length} canonical content pages + 2 root aliases + 404 into dist/.`);
