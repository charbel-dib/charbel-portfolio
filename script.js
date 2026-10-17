/* Progressive enhancement: every page, evidence link and profile also works without JS. */
'use strict';

// Profile context belongs to the URL, so shared links and browser history stay predictable.
if (document.body.dataset.page === 'case') {
  const requested = new URLSearchParams(window.location.search).get('profile');
  const profile = ['pro', 'research'].includes(requested) ? requested : document.body.dataset.profile;
  document.body.dataset.profile = profile;
  document.querySelectorAll('[data-profile-home]').forEach(link => {
    const path = profile === 'research' ? link.dataset.researchHref : link.dataset.proHref;
    link.setAttribute('href', path + (link.dataset.homeAnchor ? `#${link.dataset.homeAnchor}` : ''));
  });
  document.querySelectorAll('[data-profile-choice]').forEach(link => {
    if (link.dataset.profileChoice === profile) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const locale = document.querySelector('.locale');
  const alternatePath = locale.getAttribute('href').split('?')[0];
  const alternate = new URL(locale.getAttribute('href'), window.location.href);
  alternate.searchParams.set('profile', profile);
  locale.setAttribute('href', alternatePath + alternate.search);
  const next = document.querySelector('[data-next-project]');
  next.setAttribute('href', profile === 'research' ? next.dataset.nextResearch : next.dataset.nextPro);
  next.querySelector('[data-next-name]').textContent = profile === 'research' ? next.dataset.nameResearch : next.dataset.namePro;
}

document.body.classList.add('js');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
const mobile = window.matchMedia('(max-width: 40rem)');
function closeMenu() {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', 'false');
  menu.querySelector('span').textContent = '+';
  nav.classList.remove('is-open');
  nav.inert = mobile.matches;
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('span').textContent = open ? '−' : '+';
  nav.classList.toggle('is-open', open);
  nav.inert = !open && mobile.matches;
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', event => {
  if (menu?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.header')) closeMenu();
});
document.querySelector('.header')?.addEventListener('focusout', event => {
  if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
});
mobile.addEventListener?.('change', closeMenu);
closeMenu();

const toolbar = document.querySelector('.index-toolbar');
if (toolbar) {
  const rows = [...document.querySelectorAll('.project-row')];
  const count = toolbar.querySelector('.filter-count');
  toolbar.hidden = false;
  toolbar.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      toolbar.querySelectorAll('[data-filter]').forEach(control => {
        control.setAttribute('aria-pressed', String(control === button));
      });
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
    try {
      await navigator.clipboard.writeText(copy.dataset.copy);
      feedback.textContent = copy.dataset.success;
    } catch {
      feedback.textContent = copy.dataset.error;
    }
  });
}

// Follow native scrolling; local case-study links also expose the current section.
if ('IntersectionObserver' in window) {
  const isCase = document.body.dataset.page === 'case';
  const sections = isCase
    ? document.querySelectorAll('.case-body > section[id]')
    : document.querySelectorAll('main > section[id]');
  const sectionNav = isCase ? document.querySelector('.case-toc') : nav;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = ['project-index', 'publication'].includes(entry.target.id) ? 'projects' : entry.target.id;
      sectionNav?.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
