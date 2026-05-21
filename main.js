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
  var buttons = document.querySelectorAll('.faq-question');

  function setAnswerState(answer, open) {
    if (!answer) return;
    answer.classList.toggle('open', open);
    answer.style.maxHeight = open ? answer.scrollHeight + 'px' : '0px';
  }

  function refreshOpenAnswers() {
    document.querySelectorAll('.faq-answer.open').forEach(function (answer) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;

      buttons.forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherAns = other.nextElementSibling;
          setAnswerState(otherAns, false);
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      setAnswerState(answer, !expanded);
    });
  });

  window.addEventListener('resize', refreshOpenAnswers);
  window.addEventListener('load', refreshOpenAnswers);
}

// ─── GLOSSÁRIO FILTER ─────────────────────────────────────
function initGlossario() {
  var buttons = document.querySelectorAll('.glos-cat-btn');
  var cards = document.querySelectorAll('.glos-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      var cat = btn.dataset.cat;
      cards.forEach(function (card) {
        var show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
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
  try { initGlossario(); } catch(e) { console.error('initGlossario', e); }
  try { initTextTestimonials(); } catch(e) { console.error('initTextTestimonials', e); }
  try { initVideoShowcase(); } catch(e) { console.error('initVideoShowcase', e); }
  try { initVsl(); } catch(e) { console.error('initVsl', e); }
  try { initForm(); } catch(e) { console.error('initForm', e); }
  try { initScrollAnimations(); } catch(e) { console.error('initScrollAnimations', e); }
  try { initSmoothScroll(); } catch(e) { console.error('initSmoothScroll', e); }
});
