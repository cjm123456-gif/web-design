(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hoverFine = window.matchMedia('(hover: hover) and (pointer: fine)');

  const select = (selector, scope = document) => scope.querySelector(selector);
  const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initFooterYear() {
    selectAll('[data-year]').forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function initMobileMenu() {
    const toggle = select('[data-menu-toggle]');
    const menu = select('[data-mobile-menu]');
    const nav = select('[data-nav]');
    const scrim = select('[data-menu-scrim]');
    const pageRegions = [select('main'), select('footer')].filter(Boolean);

    if (!toggle || !menu || !nav) return;

    const menuFocusables = () => [
      toggle,
      ...selectAll('a[href], button:not([disabled])', menu)
    ].filter((element) => element.offsetParent !== null);

    const setOpen = (open, restoreFocus = true) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
      menu.setAttribute('aria-hidden', String(!open));
      menu.classList.toggle('is-open', open);
      nav.classList.toggle('menu-active', open);
      body.classList.toggle('menu-open', open);

      pageRegions.forEach((region) => {
        region.inert = open;
      });

      if (open) {
        requestAnimationFrame(() => {
          const firstLink = select('a[href]', menu);
          if (firstLink) firstLink.focus({ preventScroll: true });
        });
      } else if (restoreFocus && document.activeElement !== toggle) {
        toggle.focus({ preventScroll: true });
      }
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    selectAll('a', menu).forEach((link) => {
      link.addEventListener('click', () => {
        const target = link.hash ? select(link.hash) : null;
        setOpen(false, false);

        if (!target) {
          toggle.focus({ preventScroll: true });
          return;
        }

        requestAnimationFrame(() => {
          const focusTarget = select('h1, h2', target) || target;
          focusTarget.setAttribute('tabindex', '-1');
          focusTarget.focus({ preventScroll: true });
          focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true });
        });
      });
    });

    if (scrim) scrim.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusables = menuFocusables();
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) setOpen(false, false);
    }, { passive: true });

    setOpen(false, false);
  }

  function initScrollUI() {
    const nav = select('[data-nav]');
    const progress = select('.scroll-progress span');
    const arc = select('[data-parallax]');
    let scheduled = false;

    const update = () => {
      const scrollY = window.scrollY;
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progressValue = Math.min(Math.max(scrollY / scrollable, 0), 1);

      if (nav) nav.classList.toggle('is-scrolled', scrollY > 48);
      if (progress) progress.style.transform = `scaleX(${progressValue})`;

      if (arc) {
        const parallax = reduceMotion.matches ? 0 : Math.min(scrollY * 0.07, 62);
        arc.style.setProperty('--parallax-y', `${parallax}px`);
      }

      scheduled = false;
    };

    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }, { passive: true });

    reduceMotion.addEventListener('change', update);

    update();
  }

  function initReveal() {
    const elements = selectAll('.reveal');
    if (!elements.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -7% 0px'
    });

    elements.forEach((element) => observer.observe(element));

    reduceMotion.addEventListener('change', (event) => {
      if (!event.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.add('is-visible'));
    }, { once: true });
  }

  function initCounters() {
    const counters = selectAll('[data-count]');
    if (!counters.length) return;

    const complete = (element) => {
      const target = Number(element.dataset.count || 0);
      element.textContent = target < 10 ? String(target).padStart(2, '0') : target.toLocaleString('zh-CN');
    };

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      counters.forEach(complete);
      return;
    }

    const animate = (element) => {
      const target = Number(element.dataset.count || 0);
      const duration = 900;
      const startedAt = performance.now();

      const frame = (time) => {
        if (reduceMotion.matches) {
          complete(element);
          return;
        }
        const elapsed = Math.min((time - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const value = Math.round(target * eased);
        element.textContent = value < 10 ? String(value).padStart(2, '0') : value.toLocaleString('zh-CN');
        if (elapsed < 1) requestAnimationFrame(frame);
      };

      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function initSpotlights() {
    if (!hoverFine.matches) return;

    selectAll('.spotlight-card').forEach((card) => {
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;

      card.addEventListener('pointermove', (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (frame) return;

        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${pointerX - rect.left}px`);
          card.style.setProperty('--my', `${pointerY - rect.top}px`);
          frame = 0;
        });
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }

  function initPressFeedback() {
    selectAll('.button, .menu-toggle, .brand, .mobile-link, .showcase-dots button').forEach((element) => {
      const release = () => element.classList.remove('is-pressing');

      element.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || element.matches(':disabled, [aria-disabled="true"]')) return;
        element.classList.add('is-pressing');
      });
      element.addEventListener('pointerup', release);
      element.addEventListener('pointercancel', release);
      element.addEventListener('pointerleave', release);
      element.addEventListener('blur', release);
    });
  }

  function initHeroDepth() {
    const hero = select('.hero');
    const chips = selectAll('.orbit-chip', hero || document);
    const fluid = hero ? select('.hero__fluid', hero) : null;
    if (!hero || !chips.length || !hoverFine.matches) return;

    const depth = [10, -14, 8, -11];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const reset = () => {
      hero.classList.remove('is-tracking');
      chips.forEach((chip) => {
        chip.style.setProperty('--depth-x', '0px');
        chip.style.setProperty('--depth-y', '0px');
      });
      if (fluid) {
        fluid.style.setProperty('--fluid-x', '0px');
        fluid.style.setProperty('--fluid-y', '0px');
      }
    };

    hero.addEventListener('pointermove', (event) => {
      if (reduceMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      hero.classList.add('is-tracking');
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const normalizedX = ((pointerX - rect.left) / rect.width - 0.5) * 2;
        const normalizedY = ((pointerY - rect.top) / rect.height - 0.5) * 2;

        chips.forEach((chip, index) => {
          const amount = depth[index] || 8;
          chip.style.setProperty('--depth-x', `${normalizedX * amount}px`);
          chip.style.setProperty('--depth-y', `${normalizedY * amount * 0.62}px`);
        });
        if (fluid) {
          fluid.style.setProperty('--fluid-x', `${normalizedX * 8}px`);
          fluid.style.setProperty('--fluid-y', `${normalizedY * 5}px`);
        }
        frame = 0;
      });
    }, { passive: true });

    hero.addEventListener('pointerleave', reset);
    reduceMotion.addEventListener('change', (event) => {
      if (event.matches) reset();
    });
  }

  function initSystemPointer() {
    const system = select('.about-system');
    if (!system || !hoverFine.matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const setOffset = (name, value, unit = 'px') => {
      system.style.setProperty(name, `${value.toFixed(2)}${unit}`);
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      system.classList.remove('is-tracking');
      [
        '--system-far-x', '--system-far-y',
        '--system-mid-x', '--system-mid-y',
        '--system-near-x', '--system-near-y',
        '--system-node-x', '--system-node-y'
      ].forEach((property) => system.style.setProperty(property, '0px'));
      system.style.setProperty('--system-tilt-x', '0deg');
      system.style.setProperty('--system-tilt-y', '0deg');
      system.style.setProperty('--system-orbit-rotation', '0deg');
    };

    system.addEventListener('pointermove', (event) => {
      if (reduceMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      system.classList.add('is-tracking');
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const rect = system.getBoundingClientRect();
        const normalizedX = Math.min(Math.max(((pointerX - rect.left) / rect.width - 0.5) * 2, -1), 1);
        const normalizedY = Math.min(Math.max(((pointerY - rect.top) / rect.height - 0.5) * 2, -1), 1);

        setOffset('--system-far-x', normalizedX * 3);
        setOffset('--system-far-y', normalizedY * 2.5);
        setOffset('--system-mid-x', normalizedX * 6.5);
        setOffset('--system-mid-y', normalizedY * 5);
        setOffset('--system-near-x', normalizedX * 12);
        setOffset('--system-near-y', normalizedY * 8);
        setOffset('--system-node-x', normalizedX * 8.5);
        setOffset('--system-node-y', normalizedY * 6);
        setOffset('--system-tilt-x', normalizedY * -1.6, 'deg');
        setOffset('--system-tilt-y', normalizedX * 2.2, 'deg');
        setOffset('--system-orbit-rotation', normalizedX * 3, 'deg');
        frame = 0;
      });
    }, { passive: true });

    system.addEventListener('pointerleave', reset);
    system.addEventListener('pointercancel', reset);
    reduceMotion.addEventListener('change', (event) => {
      if (event.matches) reset();
    });
  }

  function initFluidVisibility() {
    const fluid = select('.hero__fluid');
    if (!fluid) return;

    let isInView = true;
    const updatePlayback = () => {
      fluid.classList.toggle('is-paused', document.hidden || !isInView);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        updatePlayback();
      }, { threshold: 0.01 });
      observer.observe(fluid);
    }

    document.addEventListener('visibilitychange', updatePlayback);
    updatePlayback();
  }

  function initHeroWaveBand() {
    const hero = select('.hero');
    const band = select('.hero__wave-band');
    const fill = select('[data-wave-band-fill]');
    const line = select('[data-wave-band-line]');
    if (!hero || !band || !fill || !line) return;

    const compactMotion = window.matchMedia('(max-width: 640px)');
    const pointCount = 64;
    let frame = 0;
    let isInView = true;
    let elapsed = 0;
    let lastTimestamp = 0;
    let lastPaint = 0;

    const curvePoint = (x, radiusY, phase, amplitude, frequency, counterPhase = 1) => {
      const progress = x / 1000;
      const normalized = (x - 500) / 500;
      const ellipse = 640 - radiusY * Math.sqrt(Math.max(0, 1 - normalized * normalized));
      const envelope = Math.pow(Math.sin(progress * Math.PI), 0.72);
      const primary = Math.sin(progress * Math.PI * frequency + phase * counterPhase) * amplitude;
      const secondary = Math.sin(progress * Math.PI * 2 - phase * 0.62) * amplitude * 0.34;
      return ellipse + (primary + secondary) * envelope;
    };

    const render = (phase) => {
      const outer = [];
      const inner = [];

      for (let index = 0; index <= pointCount; index += 1) {
        const x = (index / pointCount) * 1000;
        outer.push([x, curvePoint(x, 600, phase, 7, 3.2, 1)]);
        inner.push([x, curvePoint(x, 535, phase, 15, 4.1, 1.28)]);
      }

      const path = [
        `M ${outer[0][0].toFixed(2)} ${outer[0][1].toFixed(2)}`,
        ...outer.slice(1).map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`),
        ...inner.slice().reverse().map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`),
        'Z'
      ].join(' ');
      const linePath = [
        `M ${inner[0][0].toFixed(2)} ${inner[0][1].toFixed(2)}`,
        ...inner.slice(1).map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`)
      ].join(' ');

      fill.setAttribute('d', path);
      line.setAttribute('d', linePath);
    };

    const shouldAnimate = () => isInView && !document.hidden && !reduceMotion.matches;

    const tick = (timestamp) => {
      if (!shouldAnimate()) {
        frame = 0;
        lastTimestamp = 0;
        return;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      elapsed += Math.min(timestamp - lastTimestamp, 40);
      lastTimestamp = timestamp;

      const frameInterval = compactMotion.matches ? 1000 / 30 : 0;
      if (!frameInterval || timestamp - lastPaint >= frameInterval) {
        render(elapsed * 0.00034);
        lastPaint = timestamp;
      }

      frame = requestAnimationFrame(tick);
    };

    const updatePlayback = () => {
      if (reduceMotion.matches) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        lastTimestamp = 0;
        render(0);
        return;
      }

      if (shouldAnimate() && !frame) frame = requestAnimationFrame(tick);
      if (!shouldAnimate() && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTimestamp = 0;
      }
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        updatePlayback();
      }, { threshold: 0.01 });
      observer.observe(hero);
    }

    reduceMotion.addEventListener('change', updatePlayback);
    document.addEventListener('visibilitychange', updatePlayback);
    render(0);
    updatePlayback();
  }

  function initShowcase() {
    const track = select('[data-showcase-track]');
    const dots = selectAll('[data-showcase-dot]');
    if (!track || !dots.length) return;

    const cards = selectAll('.project-card', track);
    const compactLayout = window.matchMedia('(max-width: 640px)');
    let activeIndex = 0;
    let frame = 0;

    const setActive = (index) => {
      const nextIndex = Math.min(Math.max(index, 0), cards.length - 1);
      if (nextIndex === activeIndex && dots[nextIndex]?.getAttribute('aria-current') === 'true') return;
      activeIndex = nextIndex;
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === activeIndex;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };

    const closestCard = () => {
      if (!compactLayout.matches) return;
      const trackRect = track.getBoundingClientRect();
      const trackStart = trackRect.left + 2;
      const nextIndex = cards.reduce((closest, card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackStart);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Infinity }).index;
      setActive(nextIndex);
    };

    const scrollToCard = (index) => {
      const card = cards[index];
      if (!card) return;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      track.scrollTo({
        left: track.scrollLeft + cardRect.left - trackRect.left,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
      setActive(index);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => scrollToCard(index));
    });

    track.addEventListener('scroll', () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        closestCard();
        frame = 0;
      });
    }, { passive: true });

    track.addEventListener('keydown', (event) => {
      if (!compactLayout.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      scrollToCard(activeIndex + direction);
    });

    compactLayout.addEventListener('change', () => {
      track.tabIndex = compactLayout.matches ? 0 : -1;
      if (compactLayout.matches) requestAnimationFrame(closestCard);
      else setActive(0);
    });

    track.tabIndex = compactLayout.matches ? 0 : -1;
    setActive(0);
  }

  function initActiveNavigation() {
    if (!('IntersectionObserver' in window)) return;

    const links = selectAll('.desktop-nav .nav-link');
    const sections = links
      .map((link) => select(link.getAttribute('href')))
      .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {
      rootMargin: '-28% 0px -58% 0px',
      threshold: [0, 0.15, 0.35]
    });

    sections.forEach((section) => observer.observe(section));
  }

  function revealEverythingOnFailure() {
    window.setTimeout(() => {
      selectAll('.reveal').forEach((element) => element.classList.add('is-visible'));
    }, 2500);
  }

  function init() {
    root.classList.add('js-ready');
    initFooterYear();
    initMobileMenu();
    initScrollUI();
    initReveal();
    initCounters();
    initSpotlights();
    initPressFeedback();
    initHeroDepth();
    initSystemPointer();
    initFluidVisibility();
    initHeroWaveBand();
    initShowcase();
    initActiveNavigation();
    revealEverythingOnFailure();
  }

  init();
})();
