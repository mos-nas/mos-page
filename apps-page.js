// Dedizierte Apps-Seite (apps.html)
// Vollwertiger Explorer: Suche, Typ-/Kategorie-Filter, Sortierung und Pagination (25/Seite).
// Daten: statische apps.json (vom Cron-Build erzeugt). Statt "Install" -> "Ansehen".
(function () {
  'use strict';

  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  const status = document.getElementById('apps-status');
  const searchInput = document.getElementById('apps-search');
  const typeSelect = document.getElementById('apps-type');
  const categorySelect = document.getElementById('apps-category');
  const sortSelect = document.getElementById('apps-sort');
  const summary = document.getElementById('apps-summary');
  const pager = document.getElementById('apps-pagination');
  const reposBtn = document.getElementById('apps-repos-btn');
  const reposModal = document.getElementById('apps-repos-modal');
  const reposList = document.getElementById('apps-repos-list');
  const reposCount = document.getElementById('apps-repos-count');
  const detailModal = document.getElementById('apps-detail-modal');
  const detailContent = document.getElementById('apps-detail-content');

  const PAGE_SIZE = 24;
  const TYPE_ORDER = ['docker', 'compose', 'plugin'];
  // Erlaubte Kategorien (Reihenfolge wie im MOS Hub) – nur diese erscheinen im Dropdown
  const ALLOWED_CATEGORIES = ['AI', 'Backup', 'Hosting', 'Crypto', 'Downloader', 'Driver', 'Game Server', 'Home Automation', 'Media', 'Network', 'Productivity', 'Monitoring', 'Security', 'System', 'Utilities', 'Misc'];
  const base = (document.baseURI || window.location.href || '').replace(/[^/]*$/, '');
  const APPS_URL = new URL('apps.json', base).toString();

  let allApps = [];
  let repositories = [];
  let currentPage = 1;

  // --- i18n ------------------------------------------------------------------
  function curLang() {
    return document.documentElement.getAttribute('lang') || 'de';
  }
  function t(key, fallback) {
    const val = typeof i18n === 'function' ? i18n(key, curLang()) : key;
    if (val === key && fallback !== undefined) return fallback;
    return val;
  }

  // --- Sicherheit (Daten aus Drittanbieter-Repos) ----------------------------
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

  // --- Karten ----------------------------------------------------------------
  function typeLabel(type) {
    return t('apps.type.' + type, type ? type.charAt(0).toUpperCase() + type.slice(1) : '');
  }

  function cardHtml(app) {
    const name = esc(app.name || t('apps.unknown', 'Unbenannt'));
    const desc = esc(app.description || '');
    const maintainer = esc(app.maintainer || '');
    const type = esc(app.type || '');
    const icon = safeImg(app.icon);
    const website = safeLink(app.website);

    const media = icon
      ? `<img src="${esc(icon)}" alt="${name}" loading="lazy" decoding="async" />`
      : `<i class="fa-solid fa-cube app-card__placeholder" aria-hidden="true"></i>`;

    const maintainerChip = maintainer
      ? `<span class="app-card__maintainer" title="${maintainer}"><i class="fa-solid fa-user" aria-hidden="true"></i> ${maintainer}</span>`
      : '';

    const actions = [];
    if (website) {
      actions.push(
        `<a class="btn btn-secondary" href="${esc(website)}" target="_blank" rel="noopener">` +
        `<i class="fa-solid fa-globe" aria-hidden="true"></i> ${esc(t('apps.webpage', 'Webpage'))}</a>`
      );
    }
    actions.push(
      `<button type="button" class="btn btn-primary" data-action="details">` +
      `<i class="fa-solid fa-circle-info" aria-hidden="true"></i> ${esc(t('apps.details', 'Details'))}</button>`
    );

    return (
      `<article class="app-card" data-app-id="${esc(String(app.__id))}" role="button" tabindex="0">` +
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

  // --- Filtern / Sortieren ---------------------------------------------------
  function getFiltered() {
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

  function getSorted(items) {
    const mode = sortSelect ? sortSelect.value : 'date_desc';
    const arr = items.slice();
    switch (mode) {
      case 'date_asc':
        return arr.sort((a, b) => (a.created_at || 0) - (b.created_at || 0));
      case 'updated_desc':
        return arr.sort((a, b) => (b.updated_at || 0) - (a.updated_at || 0));
      case 'name_asc':
        return arr.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), undefined, { sensitivity: 'base' }));
      case 'date_desc':
      default:
        return arr.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    }
  }

  // --- Pagination ------------------------------------------------------------
  function pageWindow(total, current) {
    // Liefert Liste von Seitenzahlen und null (Ellipsis)
    const pages = [];
    const add = (p) => pages.push(p);
    const around = 1;
    const first = 1, last = total;
    const lo = Math.max(first, current - around);
    const hi = Math.min(last, current + around);

    add(first);
    if (lo > first + 1) add(null);
    for (let p = lo; p <= hi; p++) if (p !== first && p !== last) add(p);
    if (hi < last - 1) add(null);
    if (last !== first) add(last);
    return pages;
  }

  function renderPager(totalPages) {
    if (!pager) return;
    if (totalPages <= 1) {
      pager.innerHTML = '';
      pager.hidden = true;
      return;
    }
    pager.hidden = false;

    const prevDisabled = currentPage <= 1 ? ' disabled' : '';
    const nextDisabled = currentPage >= totalPages ? ' disabled' : '';
    const parts = [];

    parts.push(
      `<button type="button" class="apps-page-btn apps-page-nav" data-page="${currentPage - 1}"${prevDisabled} aria-label="${esc(t('apps.page.prev', 'Zurück'))}">` +
      `<i class="fa-solid fa-chevron-left" aria-hidden="true"></i> <span class="hide-sm">${esc(t('apps.page.prev', 'Zurück'))}</span></button>`
    );

    pageWindow(totalPages, currentPage).forEach((p) => {
      if (p === null) {
        parts.push('<span class="apps-page-ellipsis" aria-hidden="true">…</span>');
      } else {
        const active = p === currentPage ? ' is-active' : '';
        const cur = p === currentPage ? ' aria-current="page"' : '';
        parts.push(`<button type="button" class="apps-page-btn${active}" data-page="${p}"${cur}>${p}</button>`);
      }
    });

    parts.push(
      `<button type="button" class="apps-page-btn apps-page-nav" data-page="${currentPage + 1}"${nextDisabled} aria-label="${esc(t('apps.page.next', 'Weiter'))}">` +
      `<span class="hide-sm">${esc(t('apps.page.next', 'Weiter'))}</span> <i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>`
    );

    pager.innerHTML = parts.join('');
  }

  // --- Render ----------------------------------------------------------------
  function render() {
    const filtered = getSorted(getFiltered());
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    if (!total) {
      grid.innerHTML = `<p class="apps-empty">${esc(t('apps.noResults', 'Keine Apps gefunden.'))}</p>`;
    } else {
      grid.innerHTML = pageItems.map(cardHtml).join('');
    }
    grid.hidden = false;

    if (summary) {
      if (total) {
        const from = start + 1;
        const to = Math.min(start + PAGE_SIZE, total);
        summary.textContent = `${from}\u2013${to} / ${total} ${t('apps.results', 'Apps')}`;
      } else {
        summary.textContent = `0 ${t('apps.results', 'Apps')}`;
      }
    }

    renderPager(totalPages);
  }

  function goToPage(p) {
    currentPage = p;
    render();
    const top = document.getElementById('apps');
    if (top && top.scrollIntoView) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- Filter-Optionen -------------------------------------------------------
  function rebuildSelectOptions(select, values, labelFn) {
    if (!select) return;
    const prev = select.value;
    const opts = [`<option value="">${esc(t('apps.filter.all', 'Alle'))}</option>`];
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
    if (pager) pager.hidden = true;
    if (summary) summary.textContent = '';
  }

  // --- Included Repositories -------------------------------------------------
  function repoDisplay(url) {
    const clean = String(url || '').trim().replace(/\.git$/i, '').replace(/\/+$/, '');
    const parts = clean.split('/').filter(Boolean);
    if (parts.length >= 2) return parts.slice(-2).join('/');
    return clean.replace(/^https?:\/\//i, '');
  }

  function renderRepos() {
    if (!reposBtn) return;
    if (!repositories.length) {
      reposBtn.hidden = true;
      return;
    }
    reposBtn.hidden = false;
    if (reposCount) {
      reposCount.textContent = repositories.length + ' ' + t('apps.repos.count', 'Repositories');
    }
    if (reposList) {
      reposList.innerHTML = repositories.map((url) => {
        const href = safeLink(url);
        const label = esc(repoDisplay(url));
        if (href) {
          return '<li><a href="' + esc(href) + '" target="_blank" rel="noopener">' +
            '<i class="fa-solid fa-code-branch" aria-hidden="true"></i> ' + label + '</a></li>';
        }
        return '<li>' + label + '</li>';
      }).join('');
    }
  }

  function openRepos() {
    if (!reposModal) return;
    reposModal.classList.add('is-open');
    reposModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeRepos() {
    if (!reposModal) return;
    reposModal.classList.remove('is-open');
    reposModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // --- Detail-Dialog (analog MOS Hub Install/Details) ------------------------
  function fmtDate(ts) {
    if (!ts) return '';
    try { return new Date(ts * 1000).toLocaleDateString(curLang()); } catch (e) { return ''; }
  }

  function detailLink(href, icon, label) {
    return `<a class="app-detail__link" href="${esc(href)}" target="_blank" rel="noopener">` +
      `<i class="fa-solid ${icon}" aria-hidden="true"></i> <span>${esc(label)}</span></a>`;
  }

  function detailRow(label, valueHtml) {
    if (!valueHtml) return '';
    return `<div class="app-detail__row"><span class="app-detail__key">${esc(label)}</span>` +
      `<span class="app-detail__val">${valueHtml}</span></div>`;
  }

  // Teilbarer Deep-Link auf apps.html mit Suche nach Name + Maintainer
  function appShareUrl(app) {
    const term = [app && app.name, app && app.maintainer]
      .map((v) => String(v || '').trim())
      .filter(Boolean)
      .join(' ');
    const u = new URL('apps.html', base);
    if (term) u.searchParams.set('search', term);
    return u.toString();
  }

  function detailHtml(app) {
    const name = esc(app.name || t('apps.unknown', 'Unbenannt'));
    const desc = esc(app.description || '');
    const maintainer = esc(app.maintainer || '');
    const icon = safeImg(app.icon);
    const website = safeLink(app.website);
    const repository = safeLink(app.repository);
    const donate = safeLink(app.donate);
    const readme = safeLink(app.readme_url);
    const support = safeLink(app.support);
    const maintainerDonate = safeLink(app.maintainer_donate);
    const cats = Array.isArray(app.category) ? app.category.filter(Boolean) : [];
    const archs = Array.isArray(app.architecture) ? app.architecture.filter(Boolean) : [];

    const media = icon
      ? `<img src="${esc(icon)}" alt="${name}" decoding="async" />`
      : `<i class="fa-solid fa-cube" aria-hidden="true"></i>`;

    const links = [];
    if (website) links.push(detailLink(website, 'fa-globe', t('apps.webpage', 'Webpage')));
    if (repository) links.push(detailLink(repository, 'fa-code-branch', t('apps.repository', 'Repository')));
    if (donate) links.push(detailLink(donate, 'fa-gift', t('apps.donate', 'Spenden')));
    if (readme) links.push(detailLink(readme, 'fa-file-lines', t('apps.readme', 'Readme')));
    if (support) links.push(detailLink(support, 'fa-life-ring', t('apps.support', 'Support')));

    const rows = [];
    rows.push(detailRow(t('apps.type', 'Typ'), esc(typeLabel(app.type))));
    if (maintainer) rows.push(detailRow(t('apps.maintainer', 'Maintainer'), maintainer));
    if (cats.length) rows.push(detailRow(t('apps.category', 'Kategorie'), esc(cats.join(', '))));
    if (archs.length) rows.push(detailRow(t('apps.architecture', 'Architektur'), esc(archs.join(', '))));
    if (app.created_at) rows.push(detailRow(t('apps.created', 'Erstellt'), esc(fmtDate(app.created_at))));
    if (app.updated_at) rows.push(detailRow(t('apps.updated', 'Aktualisiert'), esc(fmtDate(app.updated_at))));
    if (maintainerDonate) rows.push(detailRow(t('apps.donate', 'Spenden'),
      `<a href="${esc(maintainerDonate)}" target="_blank" rel="noopener"><i class="fa-solid fa-gift" aria-hidden="true"></i></a>`));

    const typeChip = app.type ? `<span class="app-detail__type">${esc(typeLabel(app.type))}</span>` : '';
    const shareLink = appShareUrl(app);
    const shareTitle = esc(t('apps.copyLink', 'Link kopieren'));

    return (
      `<div class="app-detail__head">` +
        `<div class="app-detail__icon">${media}</div>` +
        `<div class="app-detail__heading">` +
          `<div class="app-detail__name-row">` +
            `<h2 id="apps-detail-title" class="app-detail__name">${name}</h2>` +
            `<button type="button" class="app-detail__share" data-action="copy-link" data-link="${esc(shareLink)}" title="${shareTitle}" aria-label="${shareTitle}">` +
              `<i class="fa-solid fa-link" aria-hidden="true"></i>` +
            `</button>` +
          `</div>` +
          (maintainer ? `<div class="app-detail__maintainer">${maintainer}</div>` : '') +
        `</div>` +
        typeChip +
      `</div>` +
      `<div class="app-detail__body">` +
        `<div class="app-detail__main">` +
          (desc ? `<p class="app-detail__desc">${desc}</p>` : '') +
          (links.length ? `<div class="app-detail__links">${links.join('')}</div>` : '') +
        `</div>` +
        `<aside class="app-detail__info">` +
          `<div class="app-detail__info-title">${esc(t('apps.templateInfo', 'Template'))}</div>` +
          rows.join('') +
        `</aside>` +
      `</div>`
    );
  }

  function openDetail(app) {
    if (!detailModal || !detailContent) return;
    detailContent.innerHTML = detailHtml(app);
    detailModal.classList.add('is-open');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    if (!detailModal) return;
    detailModal.classList.remove('is-open');
    detailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  }

  function flashCopied(btn) {
    const icon = btn.querySelector('i');
    btn.classList.add('is-copied');
    if (icon) icon.className = 'fa-solid fa-check';
    const copied = t('apps.linkCopied', 'Link kopiert');
    btn.title = copied;
    btn.setAttribute('aria-label', copied);
    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (icon) icon.className = 'fa-solid fa-link';
      const label = t('apps.copyLink', 'Link kopieren');
      btn.title = label;
      btn.setAttribute('aria-label', label);
    }, 1600);
  }

  function copyShareLink(btn) {
    const link = btn.getAttribute('data-link') || '';
    if (!link) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => flashCopied(btn))
        .catch(() => { if (fallbackCopy(link)) flashCopied(btn); });
    } else if (fallbackCopy(link)) {
      flashCopied(btn);
    }
  }

  // --- URL-Such-Modifier (?search=... / ?q=...) ------------------------------
  function getUrlSearch() {
    const p = new URLSearchParams(window.location.search);
    return (p.get('search') || p.get('q') || '').trim();
  }

  function syncSearchToUrl() {
    if (!searchInput) return;
    const params = new URLSearchParams(window.location.search);
    const v = searchInput.value.trim();
    if (v) params.set('search', v); else params.delete('search');
    params.delete('q');
    const qs = params.toString();
    const newUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }

  // --- Laden -----------------------------------------------------------------
  function load() {
    setStatus(t('apps.loading', 'Lade Apps…'), false);
    fetch(APPS_URL, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : (data && data.results) || [];
        list.forEach((a, i) => { if (a && typeof a === 'object') a.__id = i; });
        allApps = list;
        repositories = (data && Array.isArray(data.repositories)) ? data.repositories : [];
        const initialSearch = getUrlSearch();
        if (initialSearch && searchInput) searchInput.value = initialSearch;
        if (status) status.hidden = true;
        populateFilters();
        renderRepos();
        currentPage = 1;
        render();
      })
      .catch(() => {
        setStatus(t('apps.error', 'Apps konnten gerade nicht geladen werden.'), true);
      });
  }

  // --- Events ----------------------------------------------------------------
  let searchTimer = null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { currentPage = 1; syncSearchToUrl(); render(); }, 150);
    });
  }
  [typeSelect, categorySelect, sortSelect].forEach((sel) => {
    if (sel) sel.addEventListener('change', () => { currentPage = 1; render(); });
  });

  function openDetailFromTarget(target) {
    const card = target.closest('.app-card');
    if (!card || target.closest('a')) return;
    const id = card.getAttribute('data-app-id');
    const app = allApps.find((a) => String(a.__id) === id);
    if (app) openDetail(app);
  }

  grid.addEventListener('click', (e) => {
    if (e.target instanceof Element) openDetailFromTarget(e.target);
  });
  grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target instanceof Element && e.target.closest('.app-card')) {
      e.preventDefault();
      openDetailFromTarget(e.target);
    }
  });

  if (pager) {
    pager.addEventListener('click', (e) => {
      const btn = e.target instanceof Element ? e.target.closest('.apps-page-btn') : null;
      if (!btn || btn.hasAttribute('disabled')) return;
      const p = parseInt(btn.getAttribute('data-page'), 10);
      if (!Number.isNaN(p)) goToPage(p);
    });
  }

  if (reposBtn) reposBtn.addEventListener('click', openRepos);
  if (reposModal) {
    reposModal.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.closest('[data-repos-close]')) closeRepos();
    });
  }
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('[data-detail-close]')) { closeDetail(); return; }
      const shareBtn = e.target.closest('[data-action="copy-link"]');
      if (shareBtn) copyShareLink(shareBtn);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (detailModal && detailModal.classList.contains('is-open')) { closeDetail(); return; }
    if (reposModal && reposModal.classList.contains('is-open')) closeRepos();
  });

  // Sprachwechsel: Labels/Optionen neu aufbauen
  const langObserver = new MutationObserver(() => {
    if (!allApps.length) return;
    populateFilters();
    renderRepos();
    render();
  });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
