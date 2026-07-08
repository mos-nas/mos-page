// Eigenständige Seite für empfohlene Repositories (repos.html).
// Quelle: statische recommended-repos.json (reine URL-Liste, öffentlich/zurückgegeben).
// Getrennt von repos.json, das NUR die Index-Build-Quelle ist.
// Der ?format=json / ?json Modifier wird bereits inline in repos.html behandelt.
(function () {
  'use strict';

  const list = document.getElementById('repos-list');
  if (!list) return;

  const status = document.getElementById('repos-status');
  const count = document.getElementById('repos-count');
  const base = (document.baseURI || window.location.href || '').replace(/[^/]*$/, '');
  const REPOS_URL = new URL('recommended-repos.json', base).toString();

  // --- i18n ------------------------------------------------------------------
  function curLang() {
    return document.documentElement.getAttribute('lang') || 'de';
  }
  function t(key, fallback) {
    const val = typeof i18n === 'function' ? i18n(key, curLang()) : key;
    if (val === key && fallback !== undefined) return fallback;
    return val;
  }

  // --- Sicherheit ------------------------------------------------------------
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
  function repoLabel(url) {
    const cleaned = url.replace(/\.git$/i, '').replace(/\/+$/, '');
    const parts = cleaned.split('/').filter(Boolean);
    if (parts.length >= 2) return parts.slice(-2).join('/');
    return cleaned;
  }

  let data = [];

  function render() {
    const items = data.map((r) => {
      const url = safeLink(typeof r === 'string' ? r : (r && r.url));
      if (!url) return '';
      const name = esc((r && typeof r === 'object' && r.name) || repoLabel(url));
      const desc = (r && typeof r === 'object' && r.description)
        ? `<p class="repo-card__desc">${esc(r.description)}</p>`
        : '';
      return (
        `<li class="repo-card">` +
        `<div class="repo-card__head"><i class="fa-solid fa-code-branch" aria-hidden="true"></i> ` +
        `<span class="repo-card__name">${name}</span></div>` +
        desc +
        `<a class="repo-card__url" href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a>` +
        `</li>`
      );
    }).join('');

    list.innerHTML = items;
    list.hidden = data.length === 0;
    if (count) count.textContent = data.length ? `${data.length} ${t('apps.repos.count', 'Repositories')}` : '';
  }

  function load() {
    fetch(REPOS_URL, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((json) => {
        data = Array.isArray(json) ? json : (json && Array.isArray(json.repositories) ? json.repositories : []);
        if (status) status.hidden = true;
        render();
      })
      .catch(() => {
        if (status) {
          status.hidden = false;
          status.textContent = t('repos.error', 'Repositories konnten nicht geladen werden.');
        }
      });
  }

  // Sprachwechsel: Liste neu aufbauen (Anzahl-Label)
  const langObserver = new MutationObserver(() => { if (data.length) render(); });
  langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
