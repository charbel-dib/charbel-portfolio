/* Progressive enhancement: all content and project pages also work without JS. */
'use strict';
document.body.classList.add('js');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
function closeMenu() {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  menu.querySelector('span').textContent = '+';
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menu.focus();
  }
});
const media = window.matchMedia('(min-width: 541px)');
media.addEventListener?.('change', () => closeMenu());

const toolbar = document.querySelector('.index-toolbar');
if (toolbar) {
  const rows = [...document.querySelectorAll('.project-row')];
  const count = toolbar.querySelector('.filter-count');
  toolbar.hidden = false;
  toolbar.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      toolbar.querySelectorAll('[data-filter]').forEach(control => control.setAttribute('aria-pressed', String(control === button)));
      rows.forEach(row => { row.hidden = category !== 'all' && row.dataset.category !== category; });
      count.textContent = `${rows.filter(row => !row.hidden).length} ${count.dataset.countLabel}`;
    });
  });
}
const copy = document.querySelector('[data-copy]');
if (copy && navigator.clipboard?.writeText && window.isSecureContext) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    const feedback = document.querySelector('#copy-feedback');
    try { await navigator.clipboard.writeText(copy.dataset.copy); feedback.textContent = copy.dataset.success; }
    catch { feedback.textContent = copy.dataset.error; }
  });
}
// The section marker follows native scrolling; there is no scroll interception.
if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('main > section[id]')].filter(s => ['projects', 'about', 'contact'].includes(s.id));
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      nav?.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(s => observer.observe(s));
}
