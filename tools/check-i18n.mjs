import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_LANG = 'de';
const DYNAMIC_PREFIXES = ['apps.type.'];
const SCRIPTS = ['apps.js', 'apps-page.js', 'repos-page.js', 'script.js'];

const errors = [];
const warnings = [];

const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html'));

const dicts = {};
for (const file of fs.readdirSync(path.join(root, 'locales')).filter((name) => name.endsWith('.json'))) {
  dicts[file.slice(0, -5)] = JSON.parse(read(path.join('locales', file)));
}

const base = dicts[DEFAULT_LANG];
if (!base) {
  console.error('locales/' + DEFAULT_LANG + '.json fehlt');
  process.exit(1);
}

const legal = JSON.parse(read('legal.json'));
const placeholders = (text) => [...String(text).matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort().join(',');
const unescape = (text) => text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

for (const [lang, dict] of Object.entries(dicts)) {
  if (lang === DEFAULT_LANG) continue;
  for (const key of Object.keys(base)) {
    if (!(key in dict)) errors.push(lang + ': fehlt ' + key);
    else if (placeholders(dict[key]) !== placeholders(base[key])) errors.push(lang + ': Platzhalter weichen ab bei ' + key);
    else if (String(dict[key]).trim() === '') warnings.push(lang + ': leer ' + key);
  }
  for (const key of Object.keys(dict)) {
    if (!(key in base)) errors.push(lang + ': überzählig ' + key);
  }
}

for (const [key, value] of Object.entries(base)) {
  for (const name of placeholders(value).split(',').filter(Boolean)) {
    if (!(name in legal)) errors.push(DEFAULT_LANG + ': Platzhalter {' + name + '} in ' + key + ' ist nicht in legal.json');
  }
}

const used = new Set();
for (const file of htmlFiles) {
  const html = read(file);
  for (const match of html.matchAll(/data-i18n(?:-html|-aria-label|-alt|-title|-placeholder|-content)?="([^"]+)"/g)) used.add(match[1]);

  for (const match of html.matchAll(/<(\w+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)) {
    if (match[3].includes('<')) errors.push(file + ': data-i18n="' + match[2] + '" enthält Markup');
  }

  const title = html.match(/<title\b[^>]*data-i18n="([^"]+)"[^>]*>([^<]*)<\/title>/);
  if (title && unescape(title[2]) !== base[title[1]]) errors.push(file + ': <title> weicht von ' + title[1] + ' ab');

  for (const match of html.matchAll(/<meta\b[^>]*\bdata-i18n-content="([^"]+)"[^>]*>/g)) {
    const content = match[0].match(/\scontent="([^"]*)"/);
    if (!content || unescape(content[1]) !== base[match[1]]) errors.push(file + ': meta weicht von ' + match[1] + ' ab');
  }
}

for (const file of SCRIPTS) {
  for (const match of read(file).matchAll(/\bt\('([^']+)'/g)) used.add(match[1]);
}

for (const key of used) {
  if (!(key in base) && !DYNAMIC_PREFIXES.some((prefix) => key.startsWith(prefix))) errors.push('Key ohne Übersetzung: ' + key);
}

for (const key of Object.keys(base)) {
  if (!used.has(key) && !DYNAMIC_PREFIXES.some((prefix) => key.startsWith(prefix))) warnings.push('ungenutzt: ' + key);
}

for (const message of warnings) console.warn('Warnung  ' + message);
for (const message of errors) console.error('Fehler   ' + message);
console.log(Object.keys(dicts).join(', ') + ': ' + Object.keys(base).length + ' Keys, ' + errors.length + ' Fehler, ' + warnings.length + ' Warnungen');
process.exit(errors.length ? 1 : 0);
