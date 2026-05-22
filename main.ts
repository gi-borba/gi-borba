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
  const faqList = document.querySelector<HTMLElement>('.faq-list');

  if (faqList && !faqList.querySelector('.faq-category')) {
    const itemMap = new Map(
      Array.from(faqList.querySelectorAll<HTMLElement>('.faq-item')).map(item => [item.id, item])
    );
    const categories = [
      {
        id: 'fundamentos',
        title: 'Fundamentos do Yoga',
        items: [
          'o-que-e-yoga-e-para-que-serve',
          'yoga-e-ioga-qual-a-forma-correta-de-escrever',
          'o-que-significa-yoga-em-sanscrito',
          'onde-surgiu-o-yoga-e-qual-e-sua-origem',
          'yoga-e-exercicio-fisico-ou-pratica-espiritual',
          'yoga-conta-como-exercicio-fisico-segundo-a-oms',
          'yoga-e-religiao',
          'cristaos-podem-praticar-yoga',
          'o-que-e-yoga-secular'
        ]
      },
      {
        id: 'como-comecar',
        title: 'Como Começar e Praticar',
        items: [
          'posso-fazer-yoga-sem-ser-flexivel',
          'como-fazer-yoga-em-casa-para-iniciantes',
          'quantas-vezes-por-semana-devo-fazer-yoga',
          'posso-fazer-yoga-todos-os-dias',
          'qual-o-melhor-horario-para-fazer-yoga',
          'quanto-tempo-de-yoga-por-dia-e-necessario-para-sentir-resultado',
          'o-que-preciso-para-comecar-a-fazer-yoga-em-casa',
          'qual-tipo-de-yoga-e-melhor-para-iniciantes',
          'yoga-online-ao-vivo-funciona-tanto-quanto-o-presencial',
          'o-que-preciso-para-fazer-yoga-online-ao-vivo',
          'a-professora-consegue-corrigir-minha-postura-em-uma-aula-online',
          'como-escolher-uma-professora-de-yoga-online',
          'qual-aplicativo-ou-plataforma-usar-para-aulas-de-yoga-online-ao-vivo',
          'aulas-ao-vivo-sao-melhores-do-que-videos-gravados-de-yoga',
          'posso-fazer-yoga-antes-de-dormir',
          'posso-fazer-yoga-depois-de-comer',
          'posso-fazer-yoga-na-cadeira',
          'posso-fazer-yoga-gripada-ou-resfriada'
        ]
      },
      {
        id: 'saude',
        title: 'Saúde, Sintomas e Fases da Vida',
        items: [
          'yoga-ajuda-na-ansiedade-existe-prova-cientifica',
          'yoga-melhora-a-insonia',
          'yoga-e-bom-para-a-coluna',
          'yoga-pode-adiar-o-envelhecimento-do-cerebro',
          'o-que-acontece-com-o-corpo-quando-voce-faz-yoga-regularmente',
          'yoga-pode-fazer-mal-se-praticado-errado',
          'yoga-para-burnout-por-onde-comecar',
          'yoga-pode-ser-usado-como-terapia-complementar',
          'yoga-para-menopausa-alivia-os-calores-e-outros-sintomas',
          'e-tarde-para-comecar-yoga-aos-40-50-ou-60-anos',
          'yoga-para-tpm-funciona-mesmo',
          'o-que-e-yoga-hormonal-e-para-quem-e-indicado',
          'posso-fazer-yoga-durante-a-menstruacao',
          'yoga-pode-ajudar-com-ganho-de-peso-da-menopausa',
          'posso-fazer-yoga-na-gravidez',
          'posso-fazer-yoga-com-dor-na-lombar',
          'yoga-emagrece',
          'yoga-define-o-corpo',
          'em-quanto-tempo-o-yoga-produz-resultados-perceptiveis',
          'yoga-melhora-a-postura',
          'o-yoga-tem-contraindicacoes'
        ]
      },
      {
        id: 'estilos',
        title: 'Estilos e Comparações',
        items: [
          'o-que-e-yoga-nidra-e-como-fazer',
          'o-que-e-yin-yoga-e-como-e-diferente-dos-outros-estilos',
          'o-que-e-neuroyoga-e-para-quem-e-indicado',
          'qual-a-diferenca-entre-hatha-e-vinyasa',
          'qual-a-diferenca-entre-yoga-e-pilates',
          'yoga-pode-substituir-a-musculacao',
          'posso-fazer-yoga-e-musculacao-no-mesmo-dia',
          'yoga-e-considerado-cardio'
        ]
      }
    ];

    faqList.innerHTML = '';

    categories.forEach(category => {
      const categoryElement = document.createElement('div');
      const toggle = document.createElement('button');
      const panel = document.createElement('div');
      const list = document.createElement('div');
      const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

      categoryElement.className = 'faq-category';
      categoryElement.setAttribute('role', 'listitem');

      toggle.className = 'faq-category-toggle';
      toggle.type = 'button';
      toggle.id = `faq-category-${category.id}`;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', `faq-category-panel-${category.id}`);
      toggle.append(document.createTextNode(category.title));

      chevron.setAttribute('class', 'faq-chevron');
      chevron.setAttribute('width', '20');
      chevron.setAttribute('height', '20');
      chevron.setAttribute('viewBox', '0 0 24 24');
      chevron.setAttribute('fill', 'none');
      chevron.setAttribute('stroke', 'currentColor');
      chevron.setAttribute('stroke-width', '2');
      chevron.setAttribute('aria-hidden', 'true');
      polyline.setAttribute('points', '6 9 12 15 18 9');
      chevron.appendChild(polyline);
      toggle.appendChild(chevron);

      panel.className = 'faq-category-panel';
      panel.id = `faq-category-panel-${category.id}`;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', toggle.id);

      list.className = 'faq-category-list';
      list.setAttribute('role', 'list');
      list.setAttribute('aria-label', category.title);

      category.items.forEach(itemId => {
        const item = itemMap.get(itemId);
        if (item) list.appendChild(item);
      });

      panel.appendChild(list);
      categoryElement.append(toggle, panel);
      faqList.appendChild(categoryElement);
    });
  }

  const categoryButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.faq-category-toggle'));
  const questionButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.faq-question'));

  function setExpandableState(element: HTMLElement | null, open: boolean): void {
    if (!element) return;
    element.classList.toggle('open', open);
    if (open) {
      element.style.maxHeight = 'none';
      const height = element.scrollHeight;
      element.style.maxHeight = `${height}px`;
    } else {
      element.style.maxHeight = `${element.scrollHeight}px`;
      void element.offsetHeight;
      element.style.maxHeight = '0px';
    }
  }

  function refreshOpenStates(): void {
    document.querySelectorAll<HTMLElement>('.faq-answer.open, .faq-category-panel.open').forEach(element => {
      element.style.maxHeight = 'none';
      element.style.maxHeight = `${element.scrollHeight}px`;
    });
  }

  function refreshOpenStatesSoon(): void {
    refreshOpenStates();
    requestAnimationFrame(() => {
      refreshOpenStates();
      requestAnimationFrame(refreshOpenStates);
    });
    window.setTimeout(refreshOpenStates, 220);
    window.setTimeout(refreshOpenStates, 420);
  }

  function closeCategoryAnswers(category: HTMLElement): void {
    category.querySelectorAll<HTMLButtonElement>('.faq-question[aria-expanded="true"]').forEach(button => {
      button.setAttribute('aria-expanded', 'false');
      setExpandableState(button.nextElementSibling as HTMLElement, false);
    });
  }

  function closeCategory(category: HTMLElement): void {
    const toggle = category.querySelector<HTMLButtonElement>('.faq-category-toggle');
    const panel = category.querySelector<HTMLElement>('.faq-category-panel');
    toggle?.setAttribute('aria-expanded', 'false');
    setExpandableState(panel, false);
    closeCategoryAnswers(category);
  }

  function openCategory(category: HTMLElement): void {
    const toggle = category.querySelector<HTMLButtonElement>('.faq-category-toggle');
    const panel = category.querySelector<HTMLElement>('.faq-category-panel');
    categoryButtons.forEach(otherButton => {
      const otherCategory = otherButton.closest<HTMLElement>('.faq-category');
      if (otherCategory && otherCategory !== category) closeCategory(otherCategory);
    });
    toggle?.setAttribute('aria-expanded', 'true');
    setExpandableState(panel, true);
  }

  questionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling as HTMLElement;
      const category = button.closest<HTMLElement>('.faq-category');

      questionButtons.forEach(other => {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          setExpandableState(other.nextElementSibling as HTMLElement, false);
        }
      });

      if (!expanded && category) openCategory(category);

      button.setAttribute('aria-expanded', String(!expanded));
      setExpandableState(answer, !expanded);
      refreshOpenStatesSoon();
    });
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.closest<HTMLElement>('.faq-category');
      const panel = category?.querySelector<HTMLElement>('.faq-category-panel') || null;
      const expanded = button.getAttribute('aria-expanded') === 'true';

      if (expanded && category) {
        closeCategory(category);
      } else if (category) {
        openCategory(category);
      } else {
        button.setAttribute('aria-expanded', String(!expanded));
        setExpandableState(panel, !expanded);
      }

      refreshOpenStatesSoon();
    });
  });

  document.querySelectorAll<HTMLElement>('.faq-answer').forEach(answer => {
    answer.addEventListener('transitionend', refreshOpenStates);
  });

  window.addEventListener('resize', refreshOpenStatesSoon);
  window.addEventListener('load', refreshOpenStatesSoon);
  document.fonts?.ready.then(refreshOpenStatesSoon);
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
  initVideoShowcase();
  initVsl();
  initForm();
  initScrollAnimations();
  initSmoothScroll();
});
