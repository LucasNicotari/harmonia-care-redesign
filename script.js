const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navigationLinks = navigation?.querySelectorAll('a') ?? [];
const siteHeader = document.querySelector('[data-header]');

function updateHeaderState() {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 36);
}

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    menuButton?.focus();
  }
});

document.querySelectorAll('.js-whatsapp').forEach((link) => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      section: link.dataset.section || 'unknown',
      service_interest: link.dataset.serviceInterest || 'general',
    });
  });
});

document.querySelectorAll('.js-instagram').forEach((link) => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'instagram_click',
      section: link.dataset.section || 'unknown',
      profile: 'harmoniacare.ltda',
    });
  });
});

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = String(new Date().getFullYear());

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let timerId;

  function ensureSlideLoaded(index) {
    const image = slides[index]?.querySelector('img[data-src]');
    if (!image) return;
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
  }

  function showSlide(nextIndex) {
    currentIndex = (nextIndex + slides.length) % slides.length;
    ensureSlideLoaded(currentIndex);
    ensureSlideLoaded((currentIndex + 1) % slides.length);
    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
  }

  function stopRotation() {
    window.clearInterval(timerId);
    carousel.classList.add('is-paused');
  }

  function startRotation() {
    stopRotation();
    if (!reduceMotion && !document.hidden) {
      carousel.classList.remove('is-paused');
      timerId = window.setInterval(() => showSlide(currentIndex + 1), 5500);
    }
  }

  document.addEventListener('visibilitychange', startRotation);
  window.setTimeout(() => ensureSlideLoaded(1), 1200);
  startRotation();
}

const whatsappNudge = document.querySelector('[data-whatsapp-nudge]');

function canShowVisitNudge() {
  const navigationType = performance.getEntriesByType('navigation')[0]?.type;
  if (navigationType === 'back_forward') return false;
  try {
    const visited = sessionStorage.getItem('harmonia:nudge-visit');
    sessionStorage.setItem('harmonia:nudge-visit', '1');
    return navigationType === 'reload' || !visited;
  } catch {
    return navigationType === 'reload' || !document.referrer || new URL(document.referrer).origin !== location.origin;
  }
}

if (whatsappNudge && canShowVisitNudge()) {
  let elapsed = 0;
  let lastTick = performance.now();
  let bottomTime = 0;
  let shown = false;

  function closeNudge() {
    const hadFocus = whatsappNudge.contains(document.activeElement);
    whatsappNudge.classList.remove('is-visible');
    whatsappNudge.hidden = true;
    if (hadFocus) document.querySelector('.floating-whatsapp')?.focus({ preventScroll: true });
  }

  function showNudge() {
    shown = true;
    whatsappNudge.hidden = false;
    requestAnimationFrame(() => whatsappNudge.classList.add('is-visible'));
  }

  whatsappNudge.querySelector('[data-whatsapp-nudge-close]')?.addEventListener('click', closeNudge);
  whatsappNudge.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNudge));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !whatsappNudge.hidden) closeNudge();
  });

  const nudgeTimer = window.setInterval(() => {
    const now = performance.now();
    const delta = Math.min(now - lastTick, 1500);
    lastTick = now;
    if (document.hidden || shown || document.body.classList.contains('menu-open')) return;
    elapsed += delta;
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const progress = scrollable > 0 ? scrollY / scrollable : 1;
    bottomTime = progress >= .85 ? bottomTime + delta : 0;
    if (bottomTime >= 12000 || elapsed >= 120000) showNudge();
  }, 1000);

  window.addEventListener('pagehide', () => {
    window.clearInterval(nudgeTimer);
    closeNudge();
  });
}
