// "Available Apps" – laedt die statische apps.json (vom Cron-Build erzeugt)
// und rendert ein Karten-Grid im Stil des MOS Hub Explorers.
// Statt "Install" gibt es einen "View"-Button (oeffnet die App-Website/Quelle).
(function () {
  'use strict';

  const grid = document.getElementById('apps-grid');
  const status = document.getElementById('apps-status');
  const searchInput = document.getElementById('apps-search');
  const typeSelect = document.getElementById('apps-type');
  const categorySelect = document.getElementById('apps-category');

  if (!grid) return;

  const base = (document.baseURI || window.location.href || '').replace(/[^/]*$/, '');
  const APPS_URL = new URL('apps.json', base).toString();
  const TYPE_ORDER = ['docker', 'compose', 'plugin'];
  // Erlaubte Kategorien (Reihenfolge wie im MOS Hub) – nur diese erscheinen im Dropdown
  const ALLOWED_CATEGORIES = ['AI', 'Backup', 'Hosting', 'Crypto', 'Downloader', 'Driver', 'Game Server', 'Home Automation', 'Media', 'Network', 'Productivity', 'Monitoring', 'Security', 'System', 'Utilities', 'Misc'];

  let allApps = [];

  // --- i18n Helper -----------------------------------------------------------
  function curLang() {
    return document.documentElement.getAttribute('lang') || 'de';
  }
  function t(key, fallback) {
    const val = typeof i18n === 'function' ? i18n(key, curLang()) : key;
    if (val === key && fallback !== undefined) return fallback;
    return val;
  }

  // --- Sicherheit (Daten kommen aus Drittanbieter-Repos) ---------------------
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }
  function safeLink(value) {
    if (typeof value !== 'string') return '';
    const v = value.trim();
    return /^https?:\/\//i.test(v) ? v : '';
  }
  function safeImg(value) {
    if (typeof value !== 'string') return '';
    const v = value.trim();
    return /^(https?:\/\/|data:image\/)/i.test(v) ? v : '';
  }

  // --- Rendering -------------------------------------------------------------
  function typeLabel(type) {
    return t('apps.type.' + type, type ? type.charAt(0).toUpperCase() + type.slice(1) : '');
  }

  function cardHtml(app) {
    const name = esc(app.name || t('apps.unknown', 'Unknown'));
    const desc = esc(app.description || '');
    const maintainer = esc(app.maintainer || '');
    const type = esc(app.type || '');
    const icon = safeImg(app.icon);
    const website = safeLink(app.website);
    const repository = safeLink(app.repository);
    const viewUrl = website || repository;

    const media = icon
      ? `<img src="${esc(icon)}" alt="${name}" loading="lazy" decoding="async" />`
      : `<i class="fa-solid fa-cube app-card__placeholder" aria-hidden="true"></i>`;

    const maintainerChip = maintainer
      ? `<span class="app-card__maintainer" title="${maintainer}"><i class="fa-solid fa-user" aria-hidden="true"></i> ${maintainer}</span>`
      : '';

    const actions = [];
    if (repository && repository !== viewUrl) {
      actions.push(
        `<a class="btn btn-secondary" href="${esc(repository)}" target="_blank" rel="noopener">` +
        `<i class="fa-solid fa-code-branch" aria-hidden="true"></i> ${esc(t('apps.source', 'Source'))}</a>`
      );
    }
    if (viewUrl) {
      actions.push(
        `<a class="btn btn-primary" href="${esc(viewUrl)}" target="_blank" rel="noopener">` +
        `<i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i> ${esc(t('apps.view', 'View'))}</a>`
      );
    } else {
      actions.push(`<span class="btn btn-secondary is-disabled">${esc(t('apps.noLink', 'No link'))}</span>`);
    }

    return (
      `<article class="app-card">` +
      `<div class="app-card__media">${media}</div>` +
      maintainerChip +
      (type ? `<span class="app-card__type">${typeLabel(app.type)}</span>` : '') +
      `<div class="app-card__body">` +
      `<h3 class="app-card__title" title="${name}">${name}</h3>` +
      (desc ? `<p class="app-card__desc">${desc}</p>` : '') +
      `</div>` +
      `<div class="app-card__actions">${actions.join('')}</div>` +
      `</article>`
    );
  }

  function applyFilters() {
    const term = (searchInput && searchInput.value || '').trim().toLowerCase();
    const typeVal = typeSelect ? typeSelect.value : '';
    const catVal = categorySelect ? categorySelect.value : '';

    return allApps.filter((app) => {
      if (typeVal && app.type !== typeVal) return false;
      if (catVal) {
        const cats = Array.isArray(app.category) ? app.category : [];
        if (!cats.some((c) => String(c).toLowerCase() === catVal.toLowerCase())) return false;
      }
      if (term) {
        const hay = [app.name, app.maintainer, app.description]
          .map((v) => String(v || '').toLowerCase())
          .join(' ');
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }

  function renderGrid() {
    let items = applyFilters();
    const limit = parseInt(grid.dataset.limit || '0', 10);
    if (limit > 0) items = items.slice(0, limit);
    if (!items.length) {
      grid.innerHTML = `<p class="apps-empty">${esc(t('apps.noResults', 'No apps found.'))}</p>`;
    } else {
      grid.innerHTML = items.map(cardHtml).join('');
    }
    grid.hidden = false;
  }

  function rebuildSelectOptions(select, values, labelFn) {
    if (!select) return;
    const prev = select.value;
    const opts = [`<option value="">${esc(t('apps.filter.all', 'All'))}</option>`];
    values.forEach((v) => {
      opts.push(`<option value="${esc(v)}">${esc(labelFn ? labelFn(v) : v)}</option>`);
    });
    select.innerHTML = opts.join('');
    if (values.indexOf(prev) !== -1) select.value = prev;
  }

  function populateFilters() {
    const types = Array.from(new Set(allApps.map((a) => a.type).filter(Boolean)))
      .sort((a, b) => {
        const ia = TYPE_ORDER.indexOf(a); const ib = TYPE_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      });
    const present = new Set(allApps.flatMap((a) => (Array.isArray(a.category) ? a.category : []))
      .filter(Boolean).map((c) => String(c).toLowerCase()));
    const cats = ALLOWED_CATEGORIES.filter((c) => present.has(c.toLowerCase()));

    rebuildSelectOptions(typeSelect, types, typeLabel);
    rebuildSelectOptions(categorySelect, cats);
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    status.classList.toggle('apps-status--error', !!isError);
    grid.hidden = true;
  }

  // --- Daten laden -----------------------------------------------------------
  function load() {
    setStatus(t('apps.loading', 'Loading apps…'), false);
    fetch(APPS_URL, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((data) => {
        allApps = Array.isArray(data) ? data : (data && data.results) || [];
        if (status) status.hidden = true;
        populateFilters();
        renderGrid();
      })
      .catch(() => {
        setStatus(t('apps.error', 'Could not load apps right now.'), true);
      });
  }

  // --- Events ----------------------------------------------------------------
  let searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(renderGrid, 150);
    });
  }
  if (typeSelect) typeSelect.addEventListener('change', renderGrid);
  if (categorySelect) categorySelect.addEventListener('change', renderGrid);

  // Auf Sprachwechsel reagieren (script.js setzt das lang-Attribut am <html>)
  const langObserver = new MutationObserver(() => {
    if (!allApps.length) return;
    populateFilters();
    renderGrid();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
