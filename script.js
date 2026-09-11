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

const partnerPopup = document.querySelector('[data-partner-popup]');
const partnerPopupClose = partnerPopup?.querySelector('[data-partner-popup-close]');

function dismissPartnerPopup() {
  if (!partnerPopup) return;
  partnerPopup.classList.remove('is-visible');
  try { window.sessionStorage.setItem('harmonia-partners-dismissed', 'true'); } catch {}
  window.setTimeout(() => { partnerPopup.hidden = true; }, 220);
  window.setTimeout(() => maybeShowWhatsAppNudge(), 300);
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
let whatsappNudgeTimer;
let whatsappNudgePending = false;
let whatsappNudgeShown = false;
let whatsappNudgeDismissed = false;

function dismissWhatsAppNudge() {
  if (!whatsappNudge) return;
  window.clearTimeout(whatsappNudgeTimer);
  whatsappNudgeDismissed = true;
  whatsappNudge.classList.remove('is-visible');
  window.setTimeout(() => { whatsappNudge.hidden = true; }, 200);
}

function maybeShowWhatsAppNudge() {
  if (!whatsappNudge || !whatsappNudgePending || whatsappNudgeShown || whatsappNudgeDismissed) return;
  const partnerIsVisible = partnerPopup && !partnerPopup.hidden && partnerPopup.classList.contains('is-visible');
  if (partnerIsVisible) return;
  whatsappNudgeShown = true;
  whatsappNudge.hidden = false;
  window.requestAnimationFrame(() => whatsappNudge.classList.add('is-visible'));
  whatsappNudgeTimer = window.setTimeout(dismissWhatsAppNudge, 12000);
}

if (whatsappNudge) {
  const doubtsSection = document.querySelector('[data-doubts-section]');
  if (doubtsSection) {
    const doubtsObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      whatsappNudgePending = true;
      maybeShowWhatsAppNudge();
      doubtsObserver.disconnect();
    }, { threshold: 0.22 });
    doubtsObserver.observe(doubtsSection);
  }

  window.setTimeout(() => {
    whatsappNudgePending = true;
    maybeShowWhatsAppNudge();
  }, 25000);
  whatsappNudgeClose?.addEventListener('click', dismissWhatsAppNudge);
  whatsappNudge.querySelector('a')?.addEventListener('click', dismissWhatsAppNudge);
}

const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');

if (testimonialCarousel) {
  const track = testimonialCarousel.querySelector('[data-testimonial-track]');
  const cards = [...testimonialCarousel.querySelectorAll('.testimonial-card')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let groupIndex = 0;
  let testimonialTimer;

  function visibleCards() {
    if (window.innerWidth <= 620) return 1;
    if (window.innerWidth <= 820) return 2;
    return 3;
  }

  function showTestimonialGroup(index) {
    if (!track || !cards.length) return;
    const visible = visibleCards();
    const groups = Math.ceil(cards.length / visible);
    groupIndex = (index + groups) % groups;
    const firstCard = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = (firstCard.getBoundingClientRect().width + gap) * visible * groupIndex;
    const maxDistance = Math.max(0, track.scrollWidth - testimonialCarousel.clientWidth);
    track.style.transform = `translateX(-${Math.min(distance, maxDistance)}px)`;
  }

  function startTestimonials() {
    window.clearInterval(testimonialTimer);
    if (!reduceMotion && !document.hidden && cards.length > visibleCards()) {
      testimonialTimer = window.setInterval(() => showTestimonialGroup(groupIndex + 1), 6200);
    }
  }

  testimonialCarousel.addEventListener('mouseenter', () => window.clearInterval(testimonialTimer));
  testimonialCarousel.addEventListener('mouseleave', startTestimonials);
  window.addEventListener('resize', () => { groupIndex = 0; showTestimonialGroup(0); startTestimonials(); });
  document.addEventListener('visibilitychange', startTestimonials);
  startTestimonials();
}
