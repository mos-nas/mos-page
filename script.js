(function () {
  const THEME_KEY = 'mos-landing-theme';
  const root = document.documentElement;

  function storedTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (!persist) return;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }

  applyTheme(storedTheme() || systemTheme(), false);

  if (window.matchMedia) {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!storedTheme()) applyTheme(query.matches ? 'dark' : 'light', false);
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
  }

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-action="toggle-menu"]');

  function setMenu(open) {
    if (!header || !menuButton) return;
    if (open) {
      header.setAttribute('data-open', '');
    } else {
      header.removeAttribute('data-open');
    }
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const themeButton = target.closest('[data-action="toggle-theme"]');
    if (themeButton) {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
      return;
    }

    if (target.closest('[data-action="toggle-menu"]')) {
      setMenu(!header.hasAttribute('data-open'));
      return;
    }

    if (header && header.hasAttribute('data-open') && target.closest('.nav a')) {
      setMenu(false);
    }

    const opener = target.closest('[data-dialog-open]');
    if (opener) {
      const dialog = document.getElementById(opener.getAttribute('data-dialog-open'));
      if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
      return;
    }

    const closer = target.closest('[data-dialog-close]');
    if (closer) {
      const dialog = closer.closest('dialog');
      if (dialog) dialog.close();
      return;
    }

    if (target instanceof HTMLDialogElement && target.hasAttribute('data-backdrop-close')) {
      target.close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const starBox = document.getElementById('gh-stars');
  const starCount = document.getElementById('gh-star-count');
  if (starBox && starCount) {
    const CACHE_KEY = 'mos-gh-stars';
    const showStars = (count) => {
      starCount.textContent = Number(count).toLocaleString(root.getAttribute('lang') || 'de');
      starBox.hidden = false;
    };
    let cached = null;
    try {
      cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    } catch {}
    if (cached && typeof cached.count === 'number' && Date.now() - cached.time < 600000) {
      showStars(cached.count);
    } else {
      fetch('https://api.github.com/repos/mos-nas/mos-releases')
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.stargazers_count !== 'number') return;
          showStars(data.stargazers_count);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count: data.stargazers_count, time: Date.now() }));
          } catch {}
        })
        .catch(() => {});
    }
  }
})();
