(function () {
  const storageKey = 'mos-landing-theme';
  const infoBarStorageKey = 'mos-info-bar-dismissed';

  // Verzeichnis der aktuellen Seite ableiten – funktioniert fuer "/" und "/datei.html"
  const base = (document.baseURI || window.location.href || '')
    .replace(/[?#].*$/, '')
    .replace(/[^/]*$/, '');

  const logos = {
    light: new URL('assets/mos-black.png', base).toString(),
    dark: new URL('assets/mos-white.png', base).toString(),
  };

  const dashboards = {
    light: new URL('assets/dashboard_light.png', base).toString(),
    dark: new URL('assets/dashboard_dark.png', base).toString(),
  };

  const favicons = {
    light: new URL('assets/mos-black_square.png', base).toString(),
    dark: new URL('assets/mos-white_square.png', base).toString(),
  };

  function getPreferredTheme() {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
    
    // Logo aktualisieren
    const logoEl = document.querySelector('[data-logo]');
    if (logoEl && logoEl instanceof HTMLImageElement) {
      const next = logos[theme] || logos.dark;
      // Set both to avoid odd caching behavior on some setups.
      logoEl.src = next;
      logoEl.srcset = next;
    }
    
    // Dashboard-Bilder aktualisieren
    document.querySelectorAll('[data-screenshot]').forEach(img => {
      if (img instanceof HTMLImageElement) {
        const next = dashboards[theme] || dashboards.dark;
        img.src = next;
        img.srcset = next;
      }
    });
    
    // Favicon aktualisieren
    const faviconEl = document.getElementById('favicon');
    const appleTouchIconEl = document.getElementById('apple-touch-icon');
    const nextFavicon = favicons[theme] || favicons.dark;
    if (faviconEl) {
      faviconEl.href = nextFavicon;
    }
    if (appleTouchIconEl) {
      appleTouchIconEl.href = nextFavicon;
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeInfoBar(saveState = true) {
    const infoBar = document.querySelector('[data-dismissible-info-bar]');
    if (!infoBar) return;
    infoBar.classList.add('is-hidden');
    if (saveState) {
      localStorage.setItem(infoBarStorageKey, '1');
    }
  }

  // Init
  applyTheme(getPreferredTheme());

  if (localStorage.getItem(infoBarStorageKey) === '1') {
    closeInfoBar(false);
  }

  // Auf System-Theme-Änderungen reagieren (wenn keine gespeicherte Präferenz vorhanden ist)
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const stored = localStorage.getItem(storageKey);
      // Nur auf System-Änderungen reagieren, wenn keine Präferenz gespeichert ist
      if (!stored) {
        applyTheme(mq.matches ? 'dark' : 'light');
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleChange);
    } else if (mq.addListener) {
      mq.addListener(handleChange);
    }
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // i18n initialisieren
  if (typeof initLanguage === 'function') {
    initLanguage();
  }

  function toggleLanguage() {
    const current = document.documentElement.getAttribute('lang') || 'de';
    if (typeof getNextLanguage === 'function' && typeof setLanguage === 'function') {
      const next = getNextLanguage(current);
      setLanguage(next);
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (!target) return;

    const action = target.getAttribute('data-action');

    if (action === 'toggle-theme') {
      e.preventDefault();
      toggleTheme();
      return;
    }

    if (action === 'toggle-language') {
      e.preventDefault();
      toggleLanguage();
      return;
    }

    if (action === 'close-info-bar') {
      e.preventDefault();
      closeInfoBar(true);
      return;
    }

    if (action === 'scroll') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
      }
      return;
    }

    if (action === 'open-app') {
      // Default: go to repo root (MOS app)
      // If you deploy this page elsewhere, change the href in index.html.
      return;
    }

    if (action === 'open-imprint') {
      e.preventDefault();
      openModal('imprint-modal');
      return;
    }

    if (action === 'open-privacy') {
      e.preventDefault();
      openModal('privacy-modal');
      return;
    }

    if (action === 'close-modal') {
      e.preventDefault();
      const modal = target.closest('.legal-modal');
      if (modal) closeModal(modal.id);
      return;
    }
  });

  // Modal functions
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus trap: focus first focusable element
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.legal-modal.is-open');
      if (openModalEl) closeModal(openModalEl.id);
    }
  });

  // Carousel functionality
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const container = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('[data-action="carousel-prev"]');
    const nextBtn = document.querySelector('[data-action="carousel-next"]');
    
    if (!carousel || !container || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalItems = document.querySelectorAll('.carousel-item').length;

    function updateCarousel() {
      const offset = -(currentIndex * (100 / totalItems));
      container.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Initialize carousel when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
