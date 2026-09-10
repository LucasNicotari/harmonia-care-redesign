const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navigationLinks = navigation?.querySelectorAll('a') ?? [];

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

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = String(new Date().getFullYear());

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
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

  function selectSlide(index) {
    showSlide(index);
    startRotation();
  }

  previousButton?.addEventListener('click', () => selectSlide(currentIndex - 1));
  nextButton?.addEventListener('click', () => selectSlide(currentIndex + 1));

  carousel.addEventListener('mouseenter', stopRotation);
  carousel.addEventListener('mouseleave', startRotation);
  carousel.addEventListener('focusin', stopRotation);
  carousel.addEventListener('focusout', () => window.setTimeout(() => {
    if (!carousel.contains(document.activeElement)) startRotation();
  }, 0));
  document.addEventListener('visibilitychange', startRotation);
  window.setTimeout(() => ensureSlideLoaded(1), 1200);
  startRotation();
}

const servicesCarousel = document.querySelector('[data-services-carousel]');

if (servicesCarousel) {
  const track = servicesCarousel.querySelector('[data-services-track]');
  const cards = [...track.querySelectorAll('.service-card')];
  const previousButton = servicesCarousel.querySelector('[data-services-prev]');
  const nextButton = servicesCarousel.querySelector('[data-services-next]');
  const status = servicesCarousel.querySelector('[data-services-status]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isVisible = false;
  let timerId;
  let scrollUpdateId;

  function measurements() {
    const firstCard = cards[0];
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
    const index = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));
    return { step, visible, index };
  }

  function updateStatus() {
    const { visible, index } = measurements();
    status.textContent = `${index + 1}–${Math.min(cards.length, index + visible)} de ${cards.length}`;
  }

  function goTo(index, behavior = 'smooth') {
    const { step } = measurements();
    const maximumStart = Math.max(0, cards.length - measurements().visible);
    const target = index > maximumStart ? 0 : Math.max(0, index);
    track.scrollTo({ left: target * step, behavior });
    window.setTimeout(updateStatus, behavior === 'smooth' ? 420 : 0);
  }

  function stopRotation() {
    window.clearInterval(timerId);
  }

  function startRotation() {
    stopRotation();
    if (!reduceMotion && isVisible && !document.hidden) {
      timerId = window.setInterval(() => {
        const { index } = measurements();
        goTo(index + 1);
      }, 6500);
    }
  }

  previousButton?.addEventListener('click', () => {
    const { index } = measurements();
    goTo(index - 1);
    startRotation();
  });
  nextButton?.addEventListener('click', () => {
    const { index } = measurements();
    goTo(index + 1);
    startRotation();
  });
  track.addEventListener('scroll', () => {
    window.clearTimeout(scrollUpdateId);
    scrollUpdateId = window.setTimeout(updateStatus, 120);
  }, { passive: true });
  servicesCarousel.addEventListener('mouseenter', stopRotation);
  servicesCarousel.addEventListener('mouseleave', startRotation);
  servicesCarousel.addEventListener('focusin', stopRotation);
  servicesCarousel.addEventListener('focusout', () => window.setTimeout(() => {
    if (!servicesCarousel.contains(document.activeElement)) startRotation();
  }, 0));
  document.addEventListener('visibilitychange', startRotation);
  window.addEventListener('resize', updateStatus);

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    startRotation();
  }, { threshold: 0.35 });
  observer.observe(servicesCarousel);
  updateStatus();
}

const partnerPopup = document.querySelector('[data-partner-popup]');
const partnerPopupClose = partnerPopup?.querySelector('[data-partner-popup-close]');

function dismissPartnerPopup() {
  if (!partnerPopup) return;
  partnerPopup.classList.remove('is-visible');
  try { window.sessionStorage.setItem('harmonia-partners-dismissed', 'true'); } catch {}
  window.setTimeout(() => { partnerPopup.hidden = true; }, 220);
  window.setTimeout(() => maybeShowWhatsAppNudge(true), 4500);
}

if (partnerPopup) {
  let wasDismissed = false;
  try { wasDismissed = window.sessionStorage.getItem('harmonia-partners-dismissed') === 'true'; } catch {}
  if (!wasDismissed) {
    window.setTimeout(() => {
      partnerPopup.hidden = false;
      window.requestAnimationFrame(() => partnerPopup.classList.add('is-visible'));
    }, 4200);
  }
  partnerPopupClose?.addEventListener('click', dismissPartnerPopup);
  partnerPopup.querySelector('a')?.addEventListener('click', dismissPartnerPopup);
}

const whatsappNudge = document.querySelector('[data-whatsapp-nudge]');
const whatsappNudgeClose = whatsappNudge?.querySelector('[data-whatsapp-nudge-close]');
let whatsappNudgeEligible = false;
let whatsappNudgeTimer;

function dismissWhatsAppNudge() {
  if (!whatsappNudge) return;
  window.clearTimeout(whatsappNudgeTimer);
  whatsappNudge.classList.remove('is-visible');
  try { window.sessionStorage.setItem('harmonia-whatsapp-nudge-dismissed', 'true'); } catch {}
  window.setTimeout(() => { whatsappNudge.hidden = true; }, 200);
}

function maybeShowWhatsAppNudge(force = false) {
  if (!whatsappNudge || (!whatsappNudgeEligible && !force) || whatsappNudge.classList.contains('is-visible')) return;
  let wasDismissed = false;
  try { wasDismissed = window.sessionStorage.getItem('harmonia-whatsapp-nudge-dismissed') === 'true'; } catch {}
  if (wasDismissed) return;
  const partnerIsVisible = partnerPopup && !partnerPopup.hidden && partnerPopup.classList.contains('is-visible');
  if (partnerIsVisible) return;
  const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const scrollProgress = window.scrollY / scrollable;
  if (!force && scrollProgress < 0.38) return;
  whatsappNudge.hidden = false;
  window.requestAnimationFrame(() => whatsappNudge.classList.add('is-visible'));
  whatsappNudgeTimer = window.setTimeout(dismissWhatsAppNudge, 10000);
}

if (whatsappNudge) {
  window.setTimeout(() => {
    whatsappNudgeEligible = true;
    maybeShowWhatsAppNudge();
  }, 6000);
  window.setTimeout(() => maybeShowWhatsAppNudge(true), 18000);
  window.addEventListener('scroll', () => maybeShowWhatsAppNudge(), { passive: true });
  whatsappNudgeClose?.addEventListener('click', dismissWhatsAppNudge);
  whatsappNudge.querySelector('a')?.addEventListener('click', dismissWhatsAppNudge);
}
