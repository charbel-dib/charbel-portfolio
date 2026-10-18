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
  if (locale) {
    const alternate = new URL(locale.getAttribute('href'), window.location.href);
    alternate.searchParams.set('profile', profile);
    if (document.getElementById(location.hash.slice(1))) alternate.hash=location.hash;
    locale.setAttribute('href', alternate.pathname + alternate.search + alternate.hash);
  }
  document.querySelectorAll('[data-cv]').forEach(link => {
    const research=profile==='research';
    link.href=research ? link.dataset.cvResearch : link.dataset.cvPro;
    const label=research ? link.dataset.labelResearch : link.dataset.labelPro;
    link.setAttribute('aria-label',label);
    const text=link.querySelector('[data-cv-label]');
    if (text) text.textContent=label;
  });
  // A shared case may use either profile; keep the research-only nav entry in sync.
  const publicationLink=document.querySelector('#main-nav [data-home-anchor="publication"]');
  if (publicationLink) publicationLink.hidden=profile!=='research';
  const workLink=document.querySelector('#main-nav [data-home-anchor="projects"]');
  if (workLink) workLink.textContent=document.documentElement.lang==='fr' ? (profile==='research'?'Travaux':'Projets') : (profile==='research'?'Work':'Projects');
  const next = document.querySelector('[data-next-project]');
  if (next) {
    next.setAttribute('href', profile === 'research' ? next.dataset.nextResearch : next.dataset.nextPro);
    const name=next.querySelector('[data-next-name]'), label=next.querySelector('[data-next-label]');
    if (name) name.textContent = profile === 'research' ? next.dataset.nameResearch : next.dataset.namePro;
    if (label) label.textContent = profile === 'research' ? next.dataset.labelResearch : next.dataset.labelPro;
  }
}

// Both languages share the same anchor IDs. Resolve at click time after native scrolling.
document.querySelector('.locale')?.addEventListener('click', event => {
  const link=event.currentTarget, target=new URL(link.href);
  target.hash=document.getElementById(location.hash.slice(1)) ? location.hash : '';
  link.href=target.href;
});

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
      rows.forEach(row => { row.hidden = category !== 'all' && !row.dataset.categories.split(' ').includes(category); });
      const total=rows.filter(row => !row.hidden).length;
      if (count) count.textContent = `${total} ${document.documentElement.lang==='fr' ? (total===1?'projet affiché':'projets affichés') : (total===1?'project shown':'projects shown')}`;
    });
  });
}

const copy = document.querySelector('[data-copy]');
if (copy) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    const feedback = document.querySelector('#copy-feedback');
    try {
      if (!navigator.clipboard?.writeText || !window.isSecureContext) throw new Error('Clipboard unavailable');
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
      const id = entry.target.id === 'project-index' ? 'projects' : entry.target.id;
      sectionNav?.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
