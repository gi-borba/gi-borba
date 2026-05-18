/**
 * main.ts — Gi Borba Yoga · Interactive Layer
 * TypeScript source — compiled to main.js (ES2020, no bundler)
 */

// ============================================================
// 1. MOBILE NAV TOGGLE
// ============================================================
function initMobileNav(): void {
  const nav = document.querySelector<HTMLElement>('.nav');
  const hamburger = document.querySelector<HTMLButtonElement>('.nav__hamburger');

  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav--open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e: MouseEvent) => {
    if (!nav.contains(e.target as Node) && nav.classList.contains('nav--open')) {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
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
function initStickyNav(): void {
  const nav = document.querySelector<HTMLElement>('.nav');
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
function initVslPlayer(): void {
  const overlay = document.querySelector<HTMLElement>('.vsl__overlay');
  const video = document.querySelector<HTMLVideoElement>('.vsl__video');

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
function initCarousel(): void {
  const carousel = document.querySelector<HTMLElement>('#video-carousel .carousel');
  if (!carousel) return;

  const videoSources: string[] = [
    'videos/gi-borba-depoimento-1.mp4',
    'videos/gi-borba-depoimento-2.mp4',
    'videos/gi-borba-depoimento-3.mp4',
    'videos/gi-borba-depoimento-4.mp4',
  ];

  let currentIndex = 0;
  let activeVideo: HTMLVideoElement | null = null;

  function buildCarousel(): void {
    const track = carousel!.querySelector<HTMLElement>('.carousel__track');
    if (!track) return;

    track.innerHTML = '';

    // On mobile, show only center
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

      // Click on side: bring to center
      // Click on center: play/pause video
      item.addEventListener('click', () => {
        if (!isCenter) {
          currentIndex = srcIndex;
          stopAllVideos();
          buildCarousel();
          updateDots();
        } else {
          const vid = item.querySelector<HTMLVideoElement>('.carousel__video');
          const ovl = item.querySelector<HTMLElement>('.carousel__play-overlay');
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

      item.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });

      track.appendChild(item);
    });
  }

  function stopAllVideos(): void {
    const vids = carousel!.querySelectorAll<HTMLVideoElement>('.carousel__video');
    vids.forEach(v => {
      v.pause();
      v.currentTime = 0;
    });
    const overlays = carousel!.querySelectorAll<HTMLElement>('.carousel__play-overlay');
    overlays.forEach(o => o.classList.remove('is-hidden'));
    activeVideo = null;
  }

  function updateDots(): void {
    const dots = carousel!.querySelectorAll<HTMLElement>('.carousel__dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === currentIndex);
      dot.setAttribute('aria-pressed', String(i === currentIndex));
    });
  }

  // Build initial
  buildCarousel();

  // Prev / Next buttons
  const prevBtn = carousel.querySelector<HTMLButtonElement>('.carousel__btn--prev');
  const nextBtn = carousel.querySelector<HTMLButtonElement>('.carousel__btn--next');

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

  // Dots
  const dots = carousel.querySelectorAll<HTMLElement>('.carousel__dot');
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

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e: TouchEvent) => {
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

  // Rebuild on resize
  window.addEventListener('resize', () => {
    stopAllVideos();
    buildCarousel();
    updateDots();
  }, { passive: true });
}

// ============================================================
// 5. FAQ ACCORDION
// ============================================================
function initFaqAccordion(): void {
  const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector<HTMLButtonElement>('.faq-question');
    const answer = item.querySelector<HTMLElement>('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');

      // Close all others in the same category
      const category = item.closest('.faq__category');
      if (category) {
        category.querySelectorAll<HTMLElement>('.faq-item--open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('faq-item--open');
            const q = openItem.querySelector<HTMLButtonElement>('.faq-question');
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
function initGlossaryFilter(): void {
  const searchInput = document.querySelector<HTMLInputElement>('#glossario-search');
  const tabs = document.querySelectorAll<HTMLButtonElement>('.glossario__tab');
  const cards = document.querySelectorAll<HTMLElement>('.glossary-card');

  if (!searchInput || !cards.length) return;

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter(): void {
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
function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const nameInput = form.querySelector<HTMLInputElement>('#contact-name');
    const phoneInput = form.querySelector<HTMLInputElement>('#contact-phone');
    const msgInput = form.querySelector<HTMLTextAreaElement>('#contact-message');

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
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e: MouseEvent) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      e.preventDefault();

      const nav = document.querySelector<HTMLElement>('.nav');
      const navHeight = nav?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile nav if open
      const navEl = document.querySelector<HTMLElement>('.nav');
      const hamburger = document.querySelector<HTMLButtonElement>('.nav__hamburger');
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
function initFadeIn(): void {
  const elements = document.querySelectorAll<HTMLElement>('.fade-up');
  if (!elements.length) return;

  // Check for reduced motion preference
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
// INIT — DOMContentLoaded
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
