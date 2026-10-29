(function () {
  'use strict';

  const STORAGE_KEY = 'mos-landing-lang';
  const DEFAULT_LANG = 'de';
  const LANGUAGES = { de: 'Deutsch', en: 'English' };

  const root = document.documentElement;
  const scriptSrc = document.currentScript && document.currentScript.src ? document.currentScript.src : '';
  const baseUrl = scriptSrc || document.baseURI;
  const inlineData = window.MOS_I18N_DATA || null;

  const state = { lang: DEFAULT_LANG, dict: {}, params: {}, loaded: false };
  const requests = {};
  const warned = new Set();

  const ATTRIBUTES = [
    ['data-i18n-title', 'title'],
    ['data-i18n-aria-label', 'aria-label'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-content', 'content'],
    ['data-i18n-alt', 'alt'],
  ];

  function loadJson(path) {
    if (inlineData && inlineData[path]) return Promise.resolve(inlineData[path]);
    if (!requests[path]) {
      requests[path] = fetch(new URL(path, baseUrl), { cache: 'no-cache' }).then((res) => {
        if (!res.ok) throw new Error(path + ': HTTP ' + res.status);
        return res.json();
      });
      requests[path].catch(() => {
        delete requests[path];
      });
    }
    return requests[path];
  }

  function reportFailure(path, error) {
    const hint =
      window.location.protocol === 'file:'
        ? ' Per file:// kann der Browser keine JSON-Dateien laden. Seite über einen lokalen HTTP-Server öffnen, z. B. "python3 -m http.server" im Projektordner.'
        : '';
    console.error('[i18n] ' + path + ' konnte nicht geladen werden (' + (error && error.message ? error.message : error) + ').' + hint);
  }

  function loadOrEmpty(path) {
    return loadJson(path).catch((error) => {
      reportFailure(path, error);
      return {};
    });
  }

  function normalize(code) {
    const lang = String(code || '').slice(0, 2).toLowerCase();
    return Object.prototype.hasOwnProperty.call(LANGUAGES, lang) ? lang : null;
  }

  function storedLanguage() {
    try {
      return normalize(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function storeLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }

  function queryLanguage() {
    try {
      return normalize(new URLSearchParams(window.location.search).get('lang'));
    } catch {
      return null;
    }
  }

  function browserLanguage() {
    const preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const entry of preferred) {
      const lang = normalize(entry);
      if (lang) return lang;
    }
    return null;
  }

  function format(text, params) {
    return text.replace(/\{(\w+)\}/g, (match, name) => (Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match));
  }

  function t(key, params) {
    if (!Object.prototype.hasOwnProperty.call(state.dict, key)) {
      if (state.loaded && !warned.has(key)) {
        warned.add(key);
        console.warn('[i18n] missing key: ' + key);
      }
      return key;
    }
    return format(state.dict[key], Object.assign({}, state.params, params));
  }

  function render(scope) {
    const target = scope || document;
    target.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    target.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    ATTRIBUTES.forEach(([source, attribute]) => {
      target.querySelectorAll('[' + source + ']').forEach((el) => {
        el.setAttribute(attribute, t(el.getAttribute(source)));
      });
    });
  }

  function updateSwitchers() {
    document.querySelectorAll('[data-lang-switch] [data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === state.lang ? 'true' : 'false');
    });
  }

  function buildSwitchers() {
    document.querySelectorAll('[data-lang-switch]').forEach((container) => {
      container.textContent = '';
      Object.keys(LANGUAGES).forEach((code) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-lang', code);
        button.setAttribute('lang', code);
        button.setAttribute('aria-pressed', 'false');
        button.title = LANGUAGES[code];
        button.textContent = code.toUpperCase();
        container.appendChild(button);
      });
    });
  }

  async function apply(requested, persist) {
    const lang = normalize(requested) || DEFAULT_LANG;
    const [base, target] = await Promise.all([
      loadOrEmpty('locales/' + DEFAULT_LANG + '.json'),
      lang === DEFAULT_LANG ? Promise.resolve({}) : loadOrEmpty('locales/' + lang + '.json'),
    ]);
    state.dict = Object.assign({}, base, target);
    state.loaded = Object.keys(state.dict).length > 0;
    state.lang = lang;
    render(document);
    updateSwitchers();
    root.setAttribute('lang', lang);
    if (persist) storeLanguage(lang);
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang } }));
    return lang;
  }

  function setLanguage(lang) {
    return apply(lang, true);
  }

  function getLanguage() {
    return state.lang;
  }

  buildSwitchers();

  document.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-lang-switch] [data-lang]') : null;
    if (button) setLanguage(button.getAttribute('data-lang'));
  });

  const ready = (async () => {
    state.params = await loadOrEmpty('legal.json');
    const fromQuery = queryLanguage();
    if (fromQuery) storeLanguage(fromQuery);
    await apply(fromQuery || storedLanguage() || browserLanguage() || DEFAULT_LANG, false);
  })().then(
    () => root.setAttribute('data-i18n-state', 'ready'),
    () => root.setAttribute('data-i18n-state', 'ready')
  );

  window.i18n = { t, render, ready, setLanguage, getLanguage, languages: Object.assign({}, LANGUAGES) };
})();
