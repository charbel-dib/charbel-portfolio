// Optional asset regeneration. The published PNGs are committed; builds need no browser.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { profiles } from '../content/profiles.mjs';
import { esc } from './lib/html.mjs';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['fr', 'en']) for (const profile of ['pro', 'research']) {
    const t = profiles[profile][lang];
    await page.setContent(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
      * { box-sizing: border-box; } body { margin: 0; width: 1200px; height: 630px; padding: 48px 64px;
        background: #f5f3ee; color: #252923; font-family: Arial, sans-serif; display: flex; flex-direction: column; }
      header { display: flex; justify-content: space-between; align-items: baseline; font-size: 22px; }
      .mark { font: italic 36px Georgia, serif; } .label { color: #a74022; }
      main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
      h1 { font: 108px/1.1 Georgia, serif; letter-spacing: -4px; margin: 0 0 20px; } h1 span { color: #a74022; }
      p { font-size: 38px; line-height: 1.3; margin: 0; max-width: 1040px; letter-spacing: -1px; }
      footer { border-top: 1px solid #d8d9d0; padding-top: 22px; display: flex; justify-content: space-between; font-size: 21px; color: #5f635a; }
    </style><body><header><span class="mark">c/d</span><span class="label">${esc(t.label)}</span></header>
    <main><h1>Charbel Dib<span>.</span></h1><p>${esc(t.hero)}</p></main>
    <footer><span>${lang === 'fr' ? 'Ingénieur IA · ENSTA' : 'AI engineer · ENSTA'}</span><span>${profile === 'research' ? (lang === 'fr' ? 'Premier auteur · IEEE 2026' : 'First author · IEEE 2026') : 'RAG · Agents · Machine learning'}</span></footer></body></html>`);
    await page.screenshot({ path: fileURLToPath(new URL(`../assets/social-${lang}-${profile}.png`, import.meta.url)) });
  }
  console.log('Generated four localized professional/research social cards.');
} finally {
  await browser.close();
}
