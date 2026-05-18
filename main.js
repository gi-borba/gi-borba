/**
 * main.js — Gi Borba Yoga · Interactive Layer
 * Compiled from main.ts (ES2020, vanilla JS, no bundler)
 */

"use strict";

// ============================================================
// 1. MOBILE NAV TOGGLE
// ============================================================
function initMobileNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');

  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// 2. STICKY NAV
// ============================================================
function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const update = () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ============================================================
// 3. VSL PLAYER
// ============================================================
function initVslPlayer() {
  const overlay = document.querySelector('.vsl__overlay');
  const video = document.querySelector('.vsl__video');

  if (!overlay || !video) return;

  overlay.addEventListener('click', () => {
    overlay.classList.add('is-hidden');
    video.play();
  });

  video.addEventListener('pause', () => {
    overlay.classList.remove('is-hidden');
  });

  video.addEventListener('ended', () => {
    overlay.classList.remove('is-hidden');
  });
}

// ============================================================
// 4. VIDEO CAROUSEL
// ============================================================
function initCarousel() {
  const carousel = document.querySelector('#video-carousel .carousel');
  if (!carousel) return;

  const videoSources = [
    'videos/gi-borba-depoimento-1.mp4',
    'videos/gi-borba-depoimento-2.mp4',
    'videos/gi-borba-depoimento-3.mp4',
    'videos/gi-borba-depoimento-4.mp4',
  ];

  let currentIndex = 0;
  let activeVideo = null;

  function buildCarousel() {
    const track = carousel.querySelector('.carousel__track');
    if (!track) return;

    track.innerHTML = '';

    const isMobile = window.innerWidth < 640;

    const indices = isMobile
      ? [currentIndex]
      : [
          (currentIndex - 1 + videoSources.length) % videoSources.length,
          currentIndex,
          (currentIndex + 1) % videoSources.length,
        ];

    indices.forEach((srcIndex, displayPos) => {
      const isCenter = isMobile ? true : displayPos === 1;
      const item = document.createElement('div');
      item.className = `carousel__item ${isCenter ? 'carousel__item--center' : 'carousel__item--side'}`;
      item.setAttribute('data-index', String(srcIndex));
      item.setAttribute('tabindex', isCenter ? '0' : '-1');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Depoimento ${srcIndex + 1}${isCenter ? ' (em foco)' : ''}`);

      item.innerHTML = `
        <div class="carousel__video-wrap">
          <video
            class="carousel__video"
            src="${videoSources[srcIndex]}"
            preload="none"
            playsinline
            aria-label="Depoimento de aluna ${srcIndex + 1}"
          ></video>
          <div class="carousel__play-overlay" aria-hidden="true">
            <div class="carousel__play-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        if (!isCenter) {
          currentIndex = srcIndex;
          stopAllVideos();
          buildCarousel();
          updateDots();
        } else {
          const vid = item.querySelector('.carousel__video');
          const ovl = item.querySelector('.carousel__play-overlay');
          if (!vid || !ovl) return;

          if (vid.paused) {
            stopAllVideos();
            vid.play();
            ovl.classList.add('is-hidden');
            activeVideo = vid;
          } else {
            vid.pause();
            ovl.classList.remove('is-hidden');
            activeVideo = null;
          }
        }
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });

      track.appendChild(item);
    });
  }

  function stopAllVideos() {
    const vids = carousel.querySelectorAll('.carousel__video');
    vids.forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
    const overlays = carousel.querySelectorAll('.carousel__play-overlay');
    overlays.forEach(o => o.classList.remove('is-hidden'));
    activeVideo = null;
  }

  function updateDots() {
    const dots = carousel.querySelectorAll('.carousel__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === currentIndex);
      dot.setAttribute('aria-pressed', String(i === currentIndex));
    });
  }

  buildCarousel();

  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');

  prevBtn?.addEventListener('click', () => {
    stopAllVideos();
    currentIndex = (currentIndex - 1 + videoSources.length) % videoSources.length;
    buildCarousel();
    updateDots();
  });

  nextBtn?.addEventListener('click', () => {
    stopAllVideos();
    currentIndex = (currentIndex + 1) % videoSources.length;
    buildCarousel();
    updateDots();
  });

  const dots = carousel.querySelectorAll('.carousel__dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i === currentIndex) return;
      stopAllVideos();
      currentIndex = i;
      buildCarousel();
      updateDots();
    });
  });

  updateDots();

  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      stopAllVideos();
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % videoSources.length;
      } else {
        currentIndex = (currentIndex - 1 + videoSources.length) % videoSources.length;
      }
      buildCarousel();
      updateDots();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    stopAllVideos();
    buildCarousel();
    updateDots();
  }, { passive: true });
}

// ============================================================
// 5. FAQ ACCORDION
// ============================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');

      const category = item.closest('.faq__category');
      if (category) {
        category.querySelectorAll('.faq-item--open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('faq-item--open');
            const q = openItem.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('faq-item--open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

// ============================================================
// 6. GLOSSARY FILTER
// ============================================================
function initGlossaryFilter() {
  const searchInput = document.querySelector('#glossario-search');
  const tabs = document.querySelectorAll('.glossario__tab');
  const cards = document.querySelectorAll('.glossary-card');

  if (!searchInput || !cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    const query = searchQuery.toLowerCase().trim();

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent?.toLowerCase() || '';

      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = query === '' || text.includes(query);

      card.classList.toggle('is-hidden', !(matchesCategory && matchesSearch));
    });
  }

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    applyFilter();
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('glossario__tab--active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('glossario__tab--active');
      tab.setAttribute('aria-pressed', 'true');
      activeCategory = tab.getAttribute('data-category') || 'all';
      applyFilter();
    });
  });
}

// ============================================================
// 7. CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#contact-name');
    const phoneInput = form.querySelector('#contact-phone');
    const msgInput = form.querySelector('#contact-message');

    const name = nameInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const message = msgInput?.value.trim() || '';

    let text = `Olá, Gi! Meu nome é ${name} e meu WhatsApp é ${phone}.`;
    if (message) {
      text += ` ${message}`;
    }

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/5511987530304?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// ============================================================
// 8. SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const nav = document.querySelector('.nav');
      const navHeight = nav?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });

      const navEl = document.querySelector('.nav');
      const hamburger = document.querySelector('.nav__hamburger');
      if (navEl?.classList.contains('nav--open')) {
        navEl.classList.remove('nav--open');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
}

// ============================================================
// 9. INTERSECTION OBSERVER — FADE-IN
// ============================================================
function initFadeIn() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyNav();
  initVslPlayer();
  initCarousel();
  initFaqAccordion();
  initGlossaryFilter();
  initContactForm();
  initSmoothScroll();
  initFadeIn();
});
