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

const googleReviewsLink = document.querySelector('#testimonials-google-link');
if (googleReviewsLink) {
  document.querySelectorAll('.testimonial-card__more, .testimonials__review-link').forEach((link) => {
    link.href = googleReviewsLink.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

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
const partnerPopup = document.querySelector('[data-partner-popup]');
if (whatsappNudge && partnerPopup) {
  // State belongs to this page load: refreshing starts a new visit.
  const partnerDelay = 30000 + Math.random() * 20000;
  let elapsed = 0, lastTick = performance.now(), bottomTime = 0;
  let partnerShown = false, partnerVisibleTime = 0, longStayShown = false;
  let bottomArmed = true, lastDismissed = -Infinity;
  function closePopup(popup) {
    const hadFocus = popup.contains(document.activeElement);
    popup.classList.remove('is-visible');
    popup.hidden = true;
    lastDismissed = elapsed;
    if (hadFocus) document.querySelector('.floating-whatsapp')?.focus({ preventScroll: true });
  }
  function showPopup(popup) {
    popup.hidden = false;
    requestAnimationFrame(() => popup.classList.add('is-visible'));
  }
  [whatsappNudge, partnerPopup].forEach(popup => {
    popup.querySelector('button').addEventListener('click', () => closePopup(popup));
    popup.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closePopup(popup)));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      [whatsappNudge, partnerPopup].filter(popup => !popup.hidden).forEach(closePopup);
    }
  });
  window.setInterval(() => {
    const now = performance.now();
    const delta = Math.min(now - lastTick, 1500);
    lastTick = now;
    if (document.hidden) return;
    elapsed += delta;
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const progress = scrollable > 0 ? scrollY / scrollable : 1;
    bottomTime = progress >= .85 ? bottomTime + delta : 0;
    if (progress < .7 && whatsappNudge.hidden) bottomArmed = true;
    if (!partnerPopup.hidden) {
      if (!partnerPopup.matches(':hover') && !partnerPopup.contains(document.activeElement)) partnerVisibleTime += delta;
      if (partnerVisibleTime >= 18000) closePopup(partnerPopup);
      return;
    }
    if (!whatsappNudge.hidden || document.body.classList.contains('menu-open')) return;
    if (elapsed - lastDismissed < 8000) return;
    if (!partnerShown && elapsed >= partnerDelay) {
      partnerShown = true;
      showPopup(partnerPopup);
      return;
    }
    const endOfPage = bottomArmed && bottomTime >= 12000;
    const longStay = !longStayShown && elapsed >= 120000;
    if ((endOfPage || longStay) && elapsed - lastDismissed >= 45000) {
      bottomArmed = false;
      longStayShown = true;
      showPopup(whatsappNudge);
    }
  }, 1000);
}


const testimonialCarousel = document.querySelector('[data-testimonial-carousel]');

if (testimonialCarousel) {
  const track = testimonialCarousel.querySelector('[data-testimonial-track]');
  const cards = [...testimonialCarousel.querySelectorAll('.testimonial-card')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const edgeClones = Math.min(2, cards.length);
  let slides = cards;
  let currentIndex = 0;
  let virtualIndex = edgeClones;
  let testimonialTimer;

  function createEdgeClone(card) {
    const clone = card.cloneNode(true);
    clone.dataset.testimonialClone = '';
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a').forEach((link) => link.setAttribute('tabindex', '-1'));
    return clone;
  }

  if (track && cards.length > 2) {
    const leadingClones = cards.slice(-edgeClones).map(createEdgeClone);
    const trailingClones = cards.slice(0, edgeClones).map(createEdgeClone);
    track.prepend(...leadingClones);
    track.append(...trailingClones);
    slides = [...track.querySelectorAll('.testimonial-card')];
  }

  // Keep the complete source in memory; resizing never truncates an already cut excerpt.
  const reviewContent = slides.map(slide => {
    const quote = slide.querySelector('blockquote');
    return { quote, text: quote.querySelector('.testimonial-text'), tail: quote.querySelector('.testimonial-tail'), link: quote.querySelector('a'), words: quote.querySelector('.testimonial-text').textContent.match(/\S+/gu) || [] };
  });
  function fitReviews() {
    reviewContent.forEach(({ quote, text, tail, link, words }) => {
      const limit = parseFloat(getComputedStyle(quote).lineHeight) * 4;
      function render(count) {
        const truncated = count < words.length;
        const lastWord = words[count - 1] || '';
        text.textContent = words.slice(0, Math.max(0, count - 1)).join(' ') + (count > 1 ? ' ' : '');
        // Last word, ellipsis and link form one unbreakable continuation.
        tail.replaceChildren(document.createTextNode((truncated ? lastWord.replace(/[.,;:!?…]+$/u, '') + '…' : lastWord) + '\u00a0'), link);
        quote.dataset.truncated = String(truncated);
      }
      render(words.length);
      if (quote.getBoundingClientRect().height <= limit + 1) return;
      let low = 1, high = words.length - 1, best = 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        render(mid);
        if (quote.getBoundingClientRect().height <= limit + 1 && tail.getBoundingClientRect().width <= quote.clientWidth) { best = mid; low = mid + 1; }
        else high = mid - 1;
      }
      render(best);
    });
  }
  fitReviews();

  function positionTrack(animate = true) {
    if (!track || !slides.length) return;
    track.classList.toggle('is-jumping', !animate);
    const activeCard = slides[virtualIndex];
    const distance = activeCard.offsetLeft + (activeCard.offsetWidth / 2) - (testimonialCarousel.clientWidth / 2);
    const maxDistance = Math.max(0, track.scrollWidth - testimonialCarousel.clientWidth);
    track.style.transform = `translateX(-${Math.max(0, Math.min(distance, maxDistance))}px)`;
    if (!animate) requestAnimationFrame(() => track.classList.remove('is-jumping'));
  }

  function updateTestimonialState(animate = true) {
    slides.forEach((slide, slideIndex) => {
      const isVisualActive = slideIndex === virtualIndex;
      const isLogicalActive = !slide.hasAttribute('data-testimonial-clone') && slide === cards[currentIndex];
      slide.classList.toggle('is-active', isVisualActive);
      slide.setAttribute('aria-hidden', String(!isLogicalActive));
      slide.querySelectorAll('a').forEach((link) => {
        if (isLogicalActive) link.removeAttribute('tabindex');
        else link.setAttribute('tabindex', '-1');
      });
    });
    positionTrack(animate);
  }

  function showNextTestimonial() {
    currentIndex = (currentIndex + 1) % cards.length;
    virtualIndex += 1;
    updateTestimonialState(true);
  }

  function startTestimonials() {
    window.clearInterval(testimonialTimer);
    if (!reduceMotion && !document.hidden && cards.length > 1) {
      testimonialTimer = window.setInterval(showNextTestimonial, 15000);
    }
  }

  updateTestimonialState(false);
  track?.addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform') return;
    if (virtualIndex >= cards.length + edgeClones) {
      virtualIndex = edgeClones;
      updateTestimonialState(false);
    }
  });
  testimonialCarousel.addEventListener('mouseenter', () => window.clearInterval(testimonialTimer));
  testimonialCarousel.addEventListener('mouseleave', startTestimonials);
  testimonialCarousel.addEventListener('focusin', () => window.clearInterval(testimonialTimer));
  testimonialCarousel.addEventListener('focusout', startTestimonials);
  window.addEventListener('resize', () => { fitReviews(); positionTrack(false); startTestimonials(); });
  document.fonts?.ready.then(() => { fitReviews(); positionTrack(false); });
  document.addEventListener('visibilitychange', startTestimonials);
  startTestimonials();
}
