// Optional asset regeneration. The published PNGs are committed; builds need no browser.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { profiles } from '../content/profiles.mjs';
import { esc } from './lib/html.mjs';
import { readFile } from 'node:fs/promises';
const font = (await readFile(new URL('../assets/fonts/archivo-var.woff2', import.meta.url))).toString('base64');

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['fr', 'en']) for (const profile of ['pro', 'research']) {
    const t = profiles[profile][lang];
    await page.setContent(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
      @font-face { font-family: Archivo; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
      * { box-sizing: border-box; } body { margin: 0; width: 1200px; height: 630px; padding: 56px 72px;
        background: #ffffff; color: #12223e; font-family: Archivo, Arial, sans-serif; display: flex; flex-direction: column; }
      header { display: flex; justify-content: space-between; align-items: center; font-size: 24px; font-weight: 650; font-stretch: 112%; }
      .label { font-size: 20px; font-weight: 560; font-stretch: 88%; color: #536079; background: #f2f5f9; padding: 8px 14px; border-radius: 8px; }
      main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
      h1 { font-size: 132px; line-height: .92; font-weight: 720; font-stretch: 118%; letter-spacing: -4px; margin: 0 0 28px; }
      p { font-size: 40px; line-height: 1.25; font-weight: 600; font-stretch: 106%; margin: 0; max-width: 1000px; }
      footer { border-top: 2px solid #12223e; padding-top: 22px; display: flex; justify-content: space-between; font-size: 22px; font-weight: 560; font-stretch: 88%; color: #536079; }
      footer b { color: #1747c4; font-weight: 650; }
    </style><body><header><span>Charbel Dib</span><span class="label">${esc(t.label)}</span></header>
    <main><h1>Charbel Dib</h1><p>${esc(t.hero)}</p></main>
    <footer><span>${lang === 'fr' ? 'Ingénieur IA, ENSTA 2026' : 'AI engineer, ENSTA 2026'}</span><b>${profile === 'research' ? (lang === 'fr' ? 'Premier auteur, IEEE 2026' : 'First author, IEEE 2026') : 'RAG, agents, machine learning'}</b></footer></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: fileURLToPath(new URL(`../assets/social-${lang}-${profile}.png`, import.meta.url)) });
  }
  console.log('Generated four localized professional/research social cards.');
} finally {
  await browser.close();
}
