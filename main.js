// ─── SHARED VIDEO UTILITIES ───────────────────────────────

function pauseAllExcept(exceptVideo) {
  document.querySelectorAll('video').forEach(function (v) {
    if (v !== exceptVideo && !v.paused) v.pause();
  });
}

function setCarouselOverlayState(container, isPlaying) {
  var svg = container.querySelector('.depo-play-icon');
  if (!svg) return;
  var isBig = container.classList.contains('main');
  var size = isBig ? 52 : 40;
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  var ns = 'http://www.w3.org/2000/svg';
  var circle = document.createElementNS(ns, 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');
  circle.setAttribute('fill', 'rgba(255,255,255,0.85)');
  svg.appendChild(circle);
  if (isPlaying) {
    [['8', '7', '3', '10'], ['13', '7', '3', '10']].forEach(function (d) {
      var rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', d[0]);
      rect.setAttribute('y', d[1]);
      rect.setAttribute('width', d[2]);
      rect.setAttribute('height', d[3]);
      rect.setAttribute('fill', 'var(--brown-dark)');
      rect.setAttribute('rx', '1');
      svg.appendChild(rect);
    });
  } else {
    var poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('points', '10,8 17,12 10,16');
    poly.setAttribute('fill', 'var(--brown-dark)');
    svg.appendChild(poly);
  }
  container.classList.toggle('playing', isPlaying);
}

// ─── NAV ─────────────────────────────────────────────────
function initNav() {
  var nav = document.getElementById('site-nav');
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');
  if (!nav) return;
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var cur = window.scrollY;
    nav.classList.toggle('scrolled', cur > 100);
    if (cur > lastScroll && cur > 300) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastScroll = cur;
    updateActiveLinks();
  }, { passive: true });

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (!mobileMenu) return;
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

function updateActiveLinks() {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  var current = '';
  sections.forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  links.forEach(function (l) {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ─── FAQ ACCORDION ────────────────────────────────────────
function initFaq() {
  var faqList = document.querySelector('.faq-list');

  if (faqList && !faqList.querySelector('.faq-category')) {
    var itemMap = new Map(Array.from(faqList.querySelectorAll('.faq-item')).map(function (item) {
      return [item.id, item];
    }));
    var categories = [
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

    categories.forEach(function (category) {
      var categoryElement = document.createElement('div');
      var toggle = document.createElement('button');
      var panel = document.createElement('div');
      var list = document.createElement('div');
      var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

      categoryElement.className = 'faq-category';
      categoryElement.setAttribute('role', 'listitem');

      toggle.className = 'faq-category-toggle';
      toggle.type = 'button';
      toggle.id = 'faq-category-' + category.id;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'faq-category-panel-' + category.id);
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
      panel.id = 'faq-category-panel-' + category.id;
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-labelledby', toggle.id);

      list.className = 'faq-category-list';
      list.setAttribute('role', 'list');
      list.setAttribute('aria-label', category.title);

      category.items.forEach(function (itemId) {
        var item = itemMap.get(itemId);
        if (item) list.appendChild(item);
      });

      panel.appendChild(list);
      categoryElement.append(toggle, panel);
      faqList.appendChild(categoryElement);
    });
  }

  var categoryButtons = Array.from(document.querySelectorAll('.faq-category-toggle'));
  var questionButtons = Array.from(document.querySelectorAll('.faq-question'));

  function setExpandableState(element, open) {
    if (!element) return;
    element.classList.toggle('open', open);
    if (open) {
      element.style.maxHeight = 'none';
      var height = element.scrollHeight;
      element.style.maxHeight = height + 'px';
    } else {
      element.style.maxHeight = element.scrollHeight + 'px';
      void element.offsetHeight;
      element.style.maxHeight = '0px';
    }
  }

  function refreshOpenStates() {
    document.querySelectorAll('.faq-answer.open, .faq-category-panel.open').forEach(function (element) {
      element.style.maxHeight = 'none';
      element.style.maxHeight = element.scrollHeight + 'px';
    });
  }

  function refreshOpenStatesSoon() {
    refreshOpenStates();
    requestAnimationFrame(function () {
      refreshOpenStates();
      requestAnimationFrame(refreshOpenStates);
    });
    window.setTimeout(refreshOpenStates, 220);
    window.setTimeout(refreshOpenStates, 420);
  }

  function closeCategoryAnswers(category) {
    category.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
      setExpandableState(button.nextElementSibling, false);
    });
  }

  function closeCategory(category) {
    var toggle = category.querySelector('.faq-category-toggle');
    var panel = category.querySelector('.faq-category-panel');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    setExpandableState(panel, false);
    closeCategoryAnswers(category);
  }

  function openCategory(category) {
    var toggle = category.querySelector('.faq-category-toggle');
    var panel = category.querySelector('.faq-category-panel');
    categoryButtons.forEach(function (otherButton) {
      var otherCategory = otherButton.closest('.faq-category');
      if (otherCategory && otherCategory !== category) closeCategory(otherCategory);
    });
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    setExpandableState(panel, true);
  }

  questionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var answer = button.nextElementSibling;
      var category = button.closest('.faq-category');

      questionButtons.forEach(function (other) {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          setExpandableState(other.nextElementSibling, false);
        }
      });

      if (!expanded && category) openCategory(category);

      button.setAttribute('aria-expanded', String(!expanded));
      setExpandableState(answer, !expanded);
      refreshOpenStatesSoon();
    });
  });

  categoryButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.closest('.faq-category');
      var panel = category ? category.querySelector('.faq-category-panel') : null;
      var expanded = button.getAttribute('aria-expanded') === 'true';

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

  document.querySelectorAll('.faq-answer').forEach(function (answer) {
    answer.addEventListener('transitionend', refreshOpenStates);
  });

  window.addEventListener('resize', refreshOpenStatesSoon);
  window.addEventListener('load', refreshOpenStatesSoon);
  if (document.fonts) document.fonts.ready.then(refreshOpenStatesSoon);
}

// ─── TEXT TESTIMONIALS CAROUSEL ──────────────────────────
function initTextTestimonials() {
  var carousel = document.querySelector('.text-depo-carousel');
  if (!carousel) return;

  var track = carousel.querySelector('.depo-quotes');
  var items = Array.from(carousel.querySelectorAll('.depo-quote'));
  var prevBtn = carousel.querySelector('.text-depo-btn.prev');
  var nextBtn = carousel.querySelector('.text-depo-btn.next');
  var dotsWrap = carousel.querySelector('.text-depo-dots');
  var state = { page: 0, perPage: 1, pages: 1, autoInterval: null, programmaticScroll: false };

  if (!track || !items.length || !prevBtn || !nextBtn || !dotsWrap) return;

  function getGap() {
    var styles = window.getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap) || 0;
  }

  function measure() {
    var itemWidth = items[0].getBoundingClientRect().width;
    var trackWidth = track.getBoundingClientRect().width;
    var gap = getGap();
    state.perPage = Math.max(1, Math.floor((trackWidth + gap) / (itemWidth + gap)));
    state.pages = Math.max(1, Math.ceil(items.length / state.perPage));
    state.page = Math.min(state.page, state.pages - 1);
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (var i = 0; i < state.pages; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'text-depo-dot';
      dot.setAttribute('aria-label', 'Mostrar grupo de depoimentos ' + (i + 1));
      dot.dataset.page = String(i);
      dot.addEventListener('click', function () {
        goToPage(Number(this.dataset.page));
        restartAuto();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function updateControls() {
    var dots = dotsWrap.querySelectorAll('.text-depo-dot');
    dots.forEach(function (dot, index) {
      var active = index === state.page;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
    prevBtn.disabled = state.pages <= 1;
    nextBtn.disabled = state.pages <= 1;
  }

  function goToPage(page) {
    var previousPage = state.page;
    var requestedPage = page;
    if (state.pages <= 1) {
      state.page = 0;
    } else if (page < 0) {
      state.page = state.pages - 1;
    } else if (page >= state.pages) {
      state.page = 0;
    } else {
      state.page = page;
    }
    var itemWidth = items[0].getBoundingClientRect().width;
    var targetLeft = (itemWidth + getGap()) * state.perPage * state.page;
    var isLoopJump = requestedPage < 0 || requestedPage >= state.pages;
    var isLongJump = Math.abs(state.page - previousPage) > 1;
    var behavior = isLoopJump || isLongJump ? 'auto' : 'smooth';
    state.programmaticScroll = true;
    track.scrollTo({ left: targetLeft, behavior: behavior });
    updateControls();
    setTimeout(function () {
      state.programmaticScroll = false;
      updateControls();
    }, 900);
  }

  function syncFromScroll() {
    if (state.programmaticScroll) return;
    var itemWidth = items[0].getBoundingClientRect().width;
    var pageWidth = (itemWidth + getGap()) * state.perPage;
    state.page = Math.max(0, Math.min(state.pages - 1, Math.round(track.scrollLeft / pageWidth)));
    updateControls();
  }

  function stopAuto() {
    if (state.autoInterval) clearInterval(state.autoInterval);
    state.autoInterval = null;
  }

  function startAuto() {
    stopAuto();
    if (state.pages <= 1) return;
    state.autoInterval = setInterval(function () {
      goToPage(state.page + 1);
    }, 4000);
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  var scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(syncFromScroll, 80);
  }, { passive: true });

  prevBtn.addEventListener('click', function () {
    goToPage(state.page - 1);
    restartAuto();
  });
  nextBtn.addEventListener('click', function () {
    goToPage(state.page + 1);
    restartAuto();
  });
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  window.addEventListener('resize', function () {
    var currentFirst = state.page * state.perPage;
    measure();
    state.page = Math.min(state.pages - 1, Math.floor(currentFirst / state.perPage));
    buildDots();
    goToPage(state.page);
    startAuto();
  });

  measure();
  buildDots();
  updateControls();
  startAuto();
}

// ─── VIDEO SHOWCASE ───────────────────────────────────────
function initVideoShowcase() {
  var showcase = document.querySelector('.depo-video-showcase');
  if (!showcase) return;

  var player = showcase.querySelector('.depo-showcase-player');
  var video = showcase.querySelector('#depo-showcase-video');
  var toggle = showcase.querySelector('.depo-showcase-toggle');
  var thumbs = Array.from(showcase.querySelectorAll('.depo-showcase-thumb'));
  var state = { current: 0, autoInterval: null };

  if (!player || !video || !toggle || !thumbs.length) return;

  function stopAuto() {
    if (state.autoInterval) clearInterval(state.autoInterval);
    state.autoInterval = null;
  }

  function startAuto() {
    stopAuto();
    if (!video.paused) return;
    state.autoInterval = setInterval(function () {
      selectVideo((state.current + 1) % thumbs.length, false);
    }, 4000);
  }

  function updatePlaying(isPlaying) {
    player.classList.toggle('playing', isPlaying);
    video.controls = isPlaying;
    toggle.disabled = isPlaying;
    toggle.setAttribute('aria-hidden', String(isPlaying));
    toggle.setAttribute('aria-label', 'Reproduzir depoimento em vídeo');
  }

  function selectVideo(index, shouldResetAuto) {
    var thumb = thumbs[index];
    if (!thumb) return;

    var src = thumb.dataset.videoSrc || '';
    var poster = thumb.dataset.poster || '';
    var label = thumb.dataset.label || thumb.getAttribute('aria-label') || 'Depoimento em vídeo';
    var wasPlaying = !video.paused;

    if (wasPlaying) video.pause();
    state.current = index;

    if (poster) video.setAttribute('poster', poster);
    video.setAttribute('aria-label', label);
    if (video.getAttribute('src') !== src) {
      video.setAttribute('src', src);
      video.load();
    }

    thumbs.forEach(function (item, i) {
      item.classList.toggle('active', i === index);
      item.setAttribute('aria-selected', String(i === index));
    });

    updatePlaying(false);
    if (shouldResetAuto) startAuto();
  }

  function togglePlayback() {
    if (!video.paused) return;
    if (video.paused) {
      var activeThumb = thumbs[state.current];
      if (activeThumb && !video.getAttribute('src')) {
        selectVideo(state.current, false);
      }
      pauseAllExcept(video);
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          updatePlaying(false);
          startAuto();
        });
      }
    }
    toggle.blur();
  }

  thumbs.forEach(function (thumb, index) {
    thumb.addEventListener('click', function () {
      selectVideo(index, true);
    });
  });

  toggle.addEventListener('click', togglePlayback);
  video.addEventListener('play', function () {
    stopAuto();
    updatePlaying(true);
  });
  video.addEventListener('pause', function () {
    updatePlaying(false);
    startAuto();
  });
  video.addEventListener('ended', function () {
    updatePlaying(false);
    startAuto();
  });

  selectVideo(0, false);
  startAuto();
}

// ─── VSL PLAYER ───────────────────────────────────────────
function initVsl() {
  var playBtn = document.getElementById('vsl-play');
  var video = document.getElementById('vsl-video');
  if (!playBtn || !video) return;

  function setPlaying(isPlaying) {
    playBtn.classList.toggle('playing', isPlaying);
    video.controls = isPlaying;
    playBtn.disabled = isPlaying;
    playBtn.setAttribute('aria-hidden', String(isPlaying));
    playBtn.setAttribute('aria-label', 'Reproduzir vídeo');
  }

  playBtn.addEventListener('click', function () {
    if (!video.paused) return;
    if (video.paused) {
      pauseAllExcept(video);
      video.play();
    }
    playBtn.blur();
  });

  video.addEventListener('play', function () { setPlaying(true); });
  video.addEventListener('pause', function () { setPlaying(false); });
  video.addEventListener('ended', function () { setPlaying(false); });
}

// ─── CONTACT FORM ─────────────────────────────────────────
function initForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = document.getElementById('form-nome').value;
    var whatsapp = document.getElementById('form-whatsapp').value;
    var mensagem = document.getElementById('form-mensagem').value;
    var msg = 'Nome: ' + nome + '\nWhatsApp: ' + whatsapp + (mensagem ? '\nMensagem: ' + mensagem : '');
    window.open('https://wa.me/5511987530304?text=' + encodeURIComponent(msg), '_blank');
    form.style.display = 'none';
    var success = document.querySelector('.form-success');
    if (success) success.classList.add('visible');
  });
}

// ─── SCROLL ANIMATIONS ────────────────────────────────────
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });
}

// ─── SMOOTH SCROLL OFFSET ─────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var nav = document.getElementById('site-nav');
      var offset = (nav ? nav.offsetHeight : 68) + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  try { initNav(); } catch(e) { console.error('initNav', e); }
  try { initFaq(); } catch(e) { console.error('initFaq', e); }
  try { initTextTestimonials(); } catch(e) { console.error('initTextTestimonials', e); }
  try { initVideoShowcase(); } catch(e) { console.error('initVideoShowcase', e); }
  try { initVsl(); } catch(e) { console.error('initVsl', e); }
  try { initForm(); } catch(e) { console.error('initForm', e); }
  try { initScrollAnimations(); } catch(e) { console.error('initScrollAnimations', e); }
  try { initSmoothScroll(); } catch(e) { console.error('initSmoothScroll', e); }
});
