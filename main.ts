// ─── TYPES ───────────────────────────────────────────────
interface VideoShowcaseState {
  current: number;
  autoInterval: ReturnType<typeof setInterval> | null;
}

// ─── NAV ─────────────────────────────────────────────────
function initNav(): void {
  const nav = document.getElementById('site-nav') as HTMLElement;
  const hamburger = document.getElementById('nav-hamburger') as HTMLButtonElement;
  const mobileMenu = document.getElementById('nav-mobile') as HTMLElement;
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const cur = window.scrollY;
    if (cur > 100) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    if (cur > lastScroll && cur > 300) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastScroll = cur;
    updateActiveLinks();
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function updateActiveLinks(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id], div[id]');
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

// ─── FAQ ACCORDION ────────────────────────────────────────
function initFaq(): void {
  document.querySelectorAll<HTMLButtonElement>('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling as HTMLElement;

      document.querySelectorAll<HTMLButtonElement>('.faq-question').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          (other.nextElementSibling as HTMLElement)?.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      answer?.classList.toggle('open', !expanded);
    });
  });
}

// ─── GLOSSÁRIO FILTER ─────────────────────────────────────
function initGlossario(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.glos-cat-btn');
  const cards = document.querySelectorAll<HTMLElement>('.glos-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ─── VIDEO SHOWCASE ───────────────────────────────────────
function initVideoShowcase(): void {
  const showcase = document.querySelector<HTMLElement>('.depo-video-showcase');
  if (!showcase) return;

  const player = showcase.querySelector<HTMLElement>('.depo-showcase-player');
  const video = showcase.querySelector<HTMLVideoElement>('#depo-showcase-video');
  const toggle = showcase.querySelector<HTMLButtonElement>('.depo-showcase-toggle');
  const thumbs = Array.from(showcase.querySelectorAll<HTMLButtonElement>('.depo-showcase-thumb'));
  const state: VideoShowcaseState = { current: 0, autoInterval: null };

  if (!player || !video || !toggle || !thumbs.length) return;

  function stopAuto(): void {
    if (state.autoInterval) clearInterval(state.autoInterval);
    state.autoInterval = null;
  }

  function startAuto(): void {
    stopAuto();
    if (!video.paused) return;
    state.autoInterval = setInterval(() => {
      selectVideo((state.current + 1) % thumbs.length, false);
    }, 4000);
  }

  function updatePlaying(isPlaying: boolean): void {
    player.classList.toggle('playing', isPlaying);
    video.controls = isPlaying;
    toggle.disabled = isPlaying;
    toggle.setAttribute('aria-hidden', String(isPlaying));
    toggle.setAttribute('aria-label', 'Reproduzir depoimento em vídeo');
  }

  function selectVideo(index: number, shouldResetAuto: boolean): void {
    const thumb = thumbs[index];
    if (!thumb) return;

    const src = thumb.dataset.videoSrc || '';
    const poster = thumb.dataset.poster || '';
    const label = thumb.dataset.label || thumb.getAttribute('aria-label') || 'Depoimento em vídeo';
    const wasPlaying = !video.paused;

    if (wasPlaying) video.pause();
    state.current = index;

    if (poster) video.setAttribute('poster', poster);
    video.setAttribute('aria-label', label);
    if (video.getAttribute('src') !== src) {
      video.setAttribute('src', src);
      video.load();
    }

    thumbs.forEach((item, i) => {
      item.classList.toggle('active', i === index);
      item.setAttribute('aria-selected', String(i === index));
    });

    updatePlaying(false);
    if (shouldResetAuto) startAuto();
  }

  function togglePlayback(): void {
    if (!video.paused) return;
    if (video.paused) {
      if (!video.getAttribute('src')) selectVideo(state.current, false);
      document.querySelectorAll<HTMLVideoElement>('video').forEach(v => {
        if (v !== video && !v.paused) v.pause();
      });
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          updatePlaying(false);
          startAuto();
        });
      }
    }
    toggle.blur();
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => selectVideo(index, true));
  });

  toggle.addEventListener('click', togglePlayback);
  video.addEventListener('play', () => {
    stopAuto();
    updatePlaying(true);
  });
  video.addEventListener('pause', () => {
    updatePlaying(false);
    startAuto();
  });
  video.addEventListener('ended', () => {
    updatePlaying(false);
    startAuto();
  });

  selectVideo(0, false);
  startAuto();
}

// ─── VSL PLAYER ───────────────────────────────────────────
function initVsl(): void {
  const playBtn = document.getElementById('vsl-play') as HTMLButtonElement;
  const video = document.getElementById('vsl-video') as HTMLVideoElement;

  if (!playBtn || !video) return;

  function setPlaying(isPlaying: boolean): void {
    playBtn.classList.toggle('playing', isPlaying);
    video.controls = isPlaying;
    playBtn.disabled = isPlaying;
    playBtn.setAttribute('aria-hidden', String(isPlaying));
    playBtn.setAttribute('aria-label', 'Reproduzir vídeo');
  }

  playBtn.addEventListener('click', () => {
    if (!video.paused) return;
    document.querySelectorAll<HTMLVideoElement>('video').forEach(v => {
      if (v !== video && !v.paused) v.pause();
    });
    video.play();
    playBtn.blur();
  });

  video.addEventListener('play', () => setPlaying(true));
  video.addEventListener('pause', () => setPlaying(false));
  video.addEventListener('ended', () => setPlaying(false));
}

// ─── CONTACT FORM ─────────────────────────────────────────
function initForm(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const success = document.querySelector<HTMLElement>('.form-success');
    form.style.display = 'none';
    if (success) success.classList.add('visible');
  });
}

// ─── SCROLL ANIMATIONS ────────────────────────────────────
function initScrollAnimations(): void {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ─── SMOOTH SCROLL OFFSET FOR FIXED NAV ───────────────────
function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('site-nav')?.offsetHeight ?? 68) + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFaq();
  initGlossario();
  initVideoShowcase();
  initVsl();
  initForm();
  initScrollAnimations();
  initSmoothScroll();
});
