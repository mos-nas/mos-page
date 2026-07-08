// Einfaches i18n-System für MOS Landing Page
//
// NEUE SPRACHE HINZUFÜGEN:
// 1. Sprache in 'languages' Objekt hinzufügen (oben)
// 2. Übersetzungen in 'translations' Objekt hinzufügen (unten)
// 3. Fertig! Das System erkennt die neue Sprache automatisch.
//
// Beispiel für Französisch:
//   languages: fr: { name: 'Français', code: 'FR' }
//   translations: fr: { 'nav.features': 'Fonctionnalités', ... }

// ============================================================
// IMPRESSUM / DATENSCHUTZ - HIER DEINE DATEN EINTRAGEN:
// ============================================================
const LEGAL_INFO = {
  name: 'Christoph Hummer', // z.B. 'Max Mustermann'
  street: 'Santk Joahnnesstraße 40/1', // z.B. 'Musterstraße 123'
  city: '3293 Lunz am See', // z.B. '12345 Musterstadt'
  country: 'Österreich',
  email: 'admin@mos-official.net', // z.B. 'kontakt@example.de'
};
// ============================================================

// Verfügbare Sprachen mit Anzeigenamen
const languages = {
  de: { name: 'Deutsch', code: 'DE' },
  en: { name: 'English', code: 'EN' },
  // Neue Sprachen einfach hier hinzufügen:
  // fr: { name: 'Français', code: 'FR' },
  // es: { name: 'Español', code: 'ES' },
};

const translations = {
  de: {
    // Meta
    'meta.title': 'MOS – Modulares Betriebssystem für Server und Homelabs',
    'meta.description':
      'MOS ist eine moderne Web-Oberfläche für Monitoring, Storage/Shares, Benutzer, Services, Docker, LXC, VMs, Plugins, Benachrichtigungen und Systemeinstellungen – schnell, übersichtlich und self-hosted.',
    'meta.ogDescription': 'Moderne Web-Oberfläche für Monitoring, Storage/Shares, Benutzer, Services, Docker, LXC, VMs, Plugins, Benachrichtigungen und Settings.',

    // Brand
    'brand.alt': 'MOS',

    // Navigation
    'nav.ariaLabel': 'Hauptnavigation',
    'nav.features': 'Features',
    'nav.apps': 'Apps',
    'nav.api': 'API',
    'nav.opensource': 'Open Source',
    'nav.usecases': 'Use Cases',
    'nav.partners': 'Partners',
    'nav.faq': 'FAQ',

    // Header
    'header.theme': 'Theme',
    'header.theme.ariaLabel': 'Theme umschalten',
    'header.theme.title': 'Theme',
    'header.language.ariaLabel': 'Sprache umschalten',
    'header.language.title': 'Sprache',
    'header.getStarted': 'Loslegen',

    // Announcement
    'announcement.arm64.html': 'Neu: <strong>ARM64</strong> Build f\u00fcr MOS verf\u00fcgbar. <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">Zu den Releases</a>',

    // Hero
    'hero.kicker': 'Self-hosted · Schnell · Übersichtlich',
    'hero.title': 'MOS – Modulares Betriebssystem für Server und Homelabs',
    'hero.lead': 'Devuan‑basiert und ressourcenschonend: Web‑UI mit Monitoring, Storage & Shares, Users, Netzwerk, Benachrichtigungen, Webterminal sowie Docker, LXC, VMs – modular erweiterbar.',
    'hero.download': 'Download',
    'hero.chip1.strong': 'Modernes UI',
    'hero.chip1.text': 'Vue + Vuetify',
    'hero.chip2.strong': 'Modernes API',
    'hero.chip2.text': 'REST + WebSocket',
    'hero.chip3.strong': 'Open Source',
    'hero.chip3.text': 'AGPLv3',
    'header.language': 'DE',
    'hero.docs': 'Dokumentation',
    'hero.bullet1': 'Keine versteckten Services',
    'hero.bullet2': 'Keine Telemetrie',
    'hero.bullet3': 'Keine erzwungenen Cloud Services oder Abhängigkeiten',
    'hero.bullet4': 'Funktionen können auf Wunsch mit Plugins aktiviert werden',
    'hero.screenshot.alt': 'MOS Web UI Screenshot',

    // Lightbox
    'lightbox.close': 'Schließen',
    'lightbox.imageAlt': 'MOS Web UI Screenshot vergrößert',

    // Features
    'features.monitoring.title': 'Monitoring & Status',
    'features.monitoring.text': 'CPU, RAM, Disks, Temperaturen, Netz – kompakt und direkt erreichbar.',
    'features.storage.title': 'Storage, Pools & Shares',
    'features.storage.text': 'Disks und Pools überblicken, Shares verwalten – ohne den Kontext zu verlieren.',
    'features.users.title': 'Benutzer & Profil',
    'features.users.text': 'Benutzerverwaltung, Profil, Sprache und UI-Einstellungen zentral in einer Oberfläche.',
    'features.containers.title': 'Container & Virtualisierung',
    'features.containers.text': 'Docker, LXC und VMs im Zugriff – abhängig davon, welche MOS-Services aktiv sind.',
    'features.terminal.title': 'Webterminal & Tools',
    'features.terminal.text': 'Schnelle Checks und Aktionen direkt im Browser – ohne ständig zwischen Tools zu wechseln.',
    'features.notifications.title': 'Benachrichtigungen',
    'features.notifications.text': 'Wichtige Events in Echtzeit – mit Badge und Toaster nach Priorität.',
    'features.plugins.title': 'Plugins & Erweiterbarkeit',
    'features.plugins.text': 'Die Oberfläche bleibt schlank – zusätzliche Funktionen kommen modular dazu.',
    'features.settings.title': 'Settings & Services',
    'features.settings.text': 'System- und Service-Einstellungen gebündelt: System, Netzwerk, Logs, Token und mehr.',
    'features.i18n.title': 'Mehrsprachig & Theme',
    'features.i18n.text': 'UI-Texte per i18n sowie Hell/Dunkel und Farben – passend zu deinem Setup.',

    // Available Apps (MOS Hub)
    'apps.title': 'Verfügbare Apps',
    'apps.subtitle': 'Apps & Templates aus dem MOS Hub – mit einem Klick in MOS installierbar.',
    'apps.search.placeholder': 'Apps durchsuchen…',
    'apps.filter.type': 'Typ',
    'apps.filter.category': 'Kategorie',
    'apps.filter.all': 'Alle',
    'apps.type.docker': 'Docker',
    'apps.type.compose': 'Compose',
    'apps.type.plugin': 'Plugin',
    'apps.view': 'Ansehen',
    'apps.source': 'Quelle',
    'apps.loading': 'Lade Apps…',
    'apps.error': 'Apps konnten gerade nicht geladen werden.',
    'apps.noResults': 'Keine Apps gefunden.',
    'apps.noLink': 'Kein Link',
    'apps.unknown': 'Unbenannt',
    'apps.viewAll': 'Alle Apps ansehen',
    'apps.results': 'Apps',
    'apps.page.title': 'Apps – MOS',
    'apps.sort.label': 'Sortierung',
    'apps.sort.dateDesc': 'Neueste zuerst',
    'apps.sort.dateAsc': 'Älteste zuerst',
    'apps.sort.updated': 'Zuletzt aktualisiert',
    'apps.sort.nameAsc': 'Name (A–Z)',
    'apps.page.prev': 'Zurück',
    'apps.page.next': 'Weiter',
    'apps.pagination.ariaLabel': 'Seitennavigation',
    'apps.repos.button': 'Repositories',
    'apps.repos.title': 'Eingebundene Repositories',
    'apps.repos.count': 'Repositories',
    'apps.details': 'Details',
    'apps.webpage': 'Webseite',
    'apps.repository': 'Repository',
    'apps.donate': 'Spenden',
    'apps.readme': 'Readme',
    'apps.support': 'Support',
    'apps.created': 'Erstellt',
    'apps.updated': 'Aktualisiert',
    'apps.category': 'Kategorie',
    'apps.architecture': 'Architektur',
    'apps.maintainer': 'Maintainer',
    'apps.type': 'Typ',
    'apps.templateInfo': 'Template',
    'apps.copyLink': 'Link kopieren',
    'apps.linkCopied': 'Link kopiert',
    'repos.page.title': 'Empfohlene Repositories – MOS',
    'repos.title': 'Empfohlene Repositories',
    'repos.subtitle': 'Empfohlene Template-Repositories für den MOS Hub.',
    'repos.toApps': 'Zu den Apps',
    'repos.json': 'Als JSON',
    'repos.openPage': 'Als Seite öffnen',
    'repos.loading': 'Lade Repositories…',
    'repos.error': 'Repositories konnten nicht geladen werden.',
    'nav.home': 'Startseite',

    // API
    'api.rest.title': 'REST-first',
    'api.rest.text': 'Klare HTTP-Endpoints für Auth, Systeminfos, Services, Storage, User und vielem mehr.',
    'api.websocket.title': 'Realtime per WebSocket',
    'api.websocket.text': 'Live-Events wie Notifications funktionieren in Echtzeit – ohne Polling-Stress.',
    'api.integration.title': 'Saubere Integration',
    'api.integration.text': 'Ideal für Automationen, eigene Tools oder externe Clients – je nach Setup.',
    'api.note': 'Hinweis: Details hängen von Version/Installation ab. Die UI nutzt API-Routen unter /api/v1 und einen Notification-WebSocket.',

    // Open Source
    'opensource.license.title': 'Lizenz',
    'opensource.license.text': 'MOS ist (und bleibt) Open Source und steht unter der GNU AGPLv3.',
    'opensource.license.link': 'Lizenz anzeigen',
    'opensource.contribute.title': 'Mitmachen',
    'opensource.contribute.text': 'Feedback, Issues und Beiträge helfen, MOS besser zu machen.',
    'opensource.contribute.link': 'Zum Projekt auf GitHub',

    // Use Cases
    'usecases.nas.title': 'Homeserver / NAS',
    'usecases.nas.item1': 'Ressourcen und Speicherpools schnell prüfen',
    'usecases.nas.item2': 'Shares/Users im Blick behalten',
    'usecases.nas.item3': 'Remote Mounts und Hub-Services',
    'usecases.dev.title': 'Dev / Lab',
    'usecases.dev.item1': 'Docker, LXC, VMs an einem Ort',
    'usecases.dev.item2': 'Webterminal für schnelle Checks',
    'usecases.dev.item3': 'Plugins für projektspezifische Aufgaben',

    // Partners
    'section.partners.title': 'Partners',
    'section.partners.subtitle': 'Projektpartner und unterstützende Organisationen',
    'partners.devuan': 'Devuan',
    'partners.weblate': 'Weblate',

    // FAQ
    'faq.what.title': 'Was ist MOS?',
    'faq.what.text':
      'MOS ist ein leichtgewichtiges, Devuan‑basiertes Betriebssystem für Homelabs und kleine Server. Die Web‑UI ist ein Client der MOS‑API und bildet System‑Monitoring, Storage/Pools, Benutzerverwaltung, Container (Docker, LXC) und virtuelle Maschinen ab. Mehr dazu in der Doku: <a href="https://docs.mos-official.net/docs/Quick-Start/WebUI-Overview" target="_blank" rel="noopener">WebUI‑Overview</a>.',
    'faq.arm64.title': 'Gibt es einen ARM64 Build?',
    'faq.arm64.text': 'Ja — ARM64 Builds sind verfügbar, aber aktuell noch experimentell.',
    'faq.services.title': 'Welche Dienste und Plattformen werden unterstützt?',
    'faq.services.text':
      'MOS ist service‑orientiert: verfügbar sind u. a. Dashboard, Storage/Pools/Shares, Users, Docker‑Service, LXC‑Service, VM‑Service, Webterminal sowie optionale Module wie MOS Hub und MOS Notify. Welche Funktionen sichtbar sind, hängt von den aktivierten Services ab. Details zu einzelnen Diensten findest du in der Doku (z. B. <a href="https://docs.mos-official.net/docs/Virtualization/Docker-Service" target="_blank" rel="noopener">Docker</a>, <a href="https://docs.mos-official.net/docs/Virtualization/LXC-Service" target="_blank" rel="noopener">LXC</a>, <a href="https://docs.mos-official.net/docs/Virtualization/VM-Service" target="_blank" rel="noopener">VM</a>).',
    'faq.install.title': 'Wie installiere und betreibe ich MOS?',
    'faq.install.text':
      'Lade das offizielle Release‑Image (siehe <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">Releases</a>), schreibe es auf ein Bootmedium und boote das Zielsystem. Folge dem <a href="https://docs.mos-official.net/docs/Installation/Create-Bootable-Media" target="_blank" rel="noopener">Quick‑Start / Installation</a> in der Doku: Netzwerk konfigurieren, Storage‑Pool anlegen, Services aktivieren und erste Container/VMs starten. Die Web‑UI ist statisch; das Backend/Services müssen entsprechend eingerichtet sein (API, Notify).',
    'faq.security.title': 'Wie wird Zugriff und Sicherheit gehandhabt?',
    'faq.security.text': 'MOS verwendet tokenbasierte Authentifizierung; für produktiven Einsatz empfiehlt sich ein Betrieb hinter TLS und einem Reverse Proxy. Folge den Prinzipien „Least Privilege“, halte System und Services aktuell und überwache Logs/Benachrichtigungen. Siehe auch: <a href="https://docs.mos-official.net/docs/System-Management/System-Configuration/System-Settings" target="_blank" rel="noopener">System‑Management</a>.',
    'faq.plugins.title': 'Wie funktionieren Plugins und Erweiterungen?',
    'faq.plugins.text': 'MOS ist modular aufgebaut: Plugins erweitern die Oberfläche und gegebenenfalls API‑Funktionen. Nur registrierte und aktivierte Plugins erscheinen in der UI; Installation/Management erfolgen über die jeweiligen Module und die Doku. Mehr dazu in der Dokumentation: <a href="https://docs.mos-official.net/docs/" target="_blank" rel="noopener">MOS Docs</a>.',
    'faq.updates.title': 'Wie bekomme ich Updates und pflege MOS?',
    'faq.updates.text': 'Updates und Releases werden über das Projekt‑Repository / die Releases verteilt. Backend und UI können getrennt aktualisiert werden; die Doku beschreibt Update‑ und Rollback‑Verfahren. Release-Übersicht: <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">Releases</a>.',
    'faq.opensource.title': 'Ist MOS Open Source?',
    'faq.opensource.text': 'Ja — MOS und die zugehörige Dokumentation sind Open Source. Siehe die LICENSE‑Datei im jeweiligen Repository für die konkrete Lizenzinformation: <a href="https://github.com/ich777/mos-frontend/blob/master/LICENSE" target="_blank" rel="noopener">LICENSE</a>.',
    'faq.help.title': 'Wo finde ich Hilfe oder möchte beitragen?',
    'faq.help.text': 'Für Hilfe, Issues und Beiträge nutze das GitHub‑Repository (Issues/PRs) oder die Doku. Die Dokumentation enthält Quick‑Start‑Anleitungen, System‑Management‑Guides und Hinweise zu Community/Support: <a href="https://docs.mos-official.net/docs/" target="_blank" rel="noopener">MOS Docs</a>.',

    // Sections
    'section.features.title': 'Features, die im Alltag zählen',
    'section.api.title': 'Modernes API',
    'section.opensource.title': 'Open Source',
    'section.opensource.subtitle': 'Transparenz, Community und Kontrolle über dein eigenes Setup.',
    'section.usecases.title': 'Typische Use Cases',
    'section.usecases.subtitle': 'Von Homeserver bis kleines Rack – MOS passt sich an.',
    'section.security.title': 'Security & Zugriff',
    'section.security.subtitle': 'Ein paar Grundprinzipien für sicheren Betrieb.',
    'section.faq.title': 'FAQ',
    'section.faq.subtitle': 'Kurz beantwortet, damit du direkt starten kannst.',

    // Highlights (Neue Sektion)
    'highlights.title': 'Was MOS abdeckt',
    'highlights.subtitle': 'Kernbereiche und Schnellzugriffe in die Doku.',
    'highlights.quickStart.title': 'Quick Start',
    'highlights.quickStart.text': 'WebUI‑Überblick, Netzwerkstart, erste Pools, erster Container, Shares.',
    'highlights.installation.title': 'Installation',
    'highlights.installation.text': 'Boot‑Medium erstellen und loslegen. Changelog via Releases.',
    'highlights.system.title': 'System',
    'highlights.system.text': 'Settings, Cron, Logs, Updates/Rollback, Tokens, HUB & Notify.',
    'highlights.storage.title': 'Storage',
    'highlights.storage.text': 'Pools, Filesystems, SMB/NFS‑Shares, Rechte und Attribute.',
    'highlights.docker.title': 'Docker',
    'highlights.docker.text': 'Images/Container, Logs, Netzwerke, Volumes/Appdata, Compose.',
    'highlights.lxc.title': 'LXC',
    'highlights.lxc.text': 'Container anlegen, Snapshots/Backups, Netzwerk & Storage.',
    'highlights.vm.title': 'VM',
    'highlights.vm.text': 'CPUs/RAM, Netzwerke, Disks, GPU/USB‑Passthrough, Snapshots.',
    'highlights.users.title': 'Users',
    'highlights.users.text': 'Benutzer erstellen, Rechte & Rollen – sauber segmentiert.',
    'highlights.api.title': 'API',
    'highlights.api.text': 'REST‑API und Realtime via WebSocket für Integrationen.',
    'highlights.cta.try': 'Jetzt testen',
    'highlights.cta.docs': 'Zur Doku',

    // Footer
    'footer.scrollTop': 'Nach oben',
    'footer.docs': 'Docs',
    'footer.license': 'AGPLv3',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',

    // Modal
    'modal.close': 'Schließen',

    // Impressum
    'imprint.title': 'Impressum',
    'imprint.responsible.title': 'Angaben gemäß § 5 ECG',
    'imprint.responsible.name': LEGAL_INFO.name,
    'imprint.responsible.address': LEGAL_INFO.street,
    'imprint.responsible.city': LEGAL_INFO.city,
    'imprint.responsible.country': LEGAL_INFO.country,
    'imprint.contact.title': 'Kontakt',
    'imprint.contact.email': 'E-Mail: ' + LEGAL_INFO.email,
    'imprint.disclaimer.title': 'Haftungsausschluss',
    'imprint.disclaimer.content.title': 'Haftung für Inhalte',
    'imprint.disclaimer.content.text':
      'Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.',
    'imprint.disclaimer.links.title': 'Haftung für Links',
    'imprint.disclaimer.links.text':
      'Diese Seite enthält Links zu externen Webseiten Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.',

    // Datenschutz
    'privacy.title': 'Datenschutzerklärung',
    'privacy.overview.title': '1. Datenschutz auf einen Blick',
    'privacy.overview.text': 'Diese Website erhebt keine personenbezogenen Daten, verwendet keine Cookies und setzt keine Tracking-Tools ein.',
    'privacy.responsible.title': '2. Verantwortlicher',
    'privacy.responsible.name': LEGAL_INFO.name,
    'privacy.responsible.address': LEGAL_INFO.street,
    'privacy.responsible.city': LEGAL_INFO.city,
    'privacy.responsible.email': 'E-Mail: ' + LEGAL_INFO.email,
    'privacy.hosting.title': '3. Hosting',
    'privacy.hosting.text':
      'Diese Website wird selbst gehostet. Bei jedem Zugriff können technische Informationen in Server-Logfiles gespeichert werden (IP-Adresse, Zeitpunkt, aufgerufene Seite, Browser-Typ). Diese Daten dienen ausschließlich der Sicherheit und Fehleranalyse und werden nicht an Dritte weitergegeben. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb der Website).',
    'privacy.cloudflare.title': '4. Cloudflare',
    'privacy.cloudflare.text':
      'Diese Website nutzt Cloudflare (Cloudflare, Inc.) als Sicherheits- und Performance-Dienst. Dabei werden Verbindungsdaten (z.B. IP-Adresse) über Cloudflare-Server geleitet. Cloudflare ist ein US-Unternehmen, das DSGVO-konforme Standardvertragsklauseln (SCCs) und ein Data Processing Addendum (DPA) anbietet. Weitere Informationen: https://www.cloudflare.com/de-de/privacypolicy/',
    'privacy.cookies.title': '5. Cookies',
    'privacy.cookies.text': 'Diese Website verwendet keine Cookies.',
    'privacy.localStorage.title': '6. Lokale Speicherung',
    'privacy.localStorage.text':
      'Diese Website speichert ausschließlich technisch notwendige Einstellungen (Theme- und Sprachpräferenz) im lokalen Speicher Ihres Browsers (localStorage). Diese Daten werden nicht an Server übertragen und können jederzeit durch Löschen der Browser-Daten entfernt werden.',
    'privacy.external.title': '7. Externe Links',
    'privacy.external.text':
      'Diese Website enthält Links zu externen Websites (z.B. GitHub). Beim Anklicken dieser Links verlassen Sie diese Website. Für die Datenschutzpraktiken dieser externen Seiten sind deren jeweilige Betreiber verantwortlich.',
    'privacy.rights.title': '8. Ihre Rechte',
    'privacy.rights.text':
      'Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Bei Beschwerden können Sie sich an die zuständige Aufsichtsbehörde wenden.',

    // Skip link
    skipLink: 'Zum Inhalt springen',

    // Social
    'social.ariaLabel': 'Social Links',
    'social.discord.label': 'Discord',
    'social.discord.title': 'Discord öffnen',
    'social.discord.ariaLabel': 'Discord öffnen (neuer Tab)',
    'social.reddit.label': 'Reddit',
    'social.reddit.title': 'Reddit öffnen',
    'social.reddit.ariaLabel': 'Reddit öffnen (neuer Tab)',
    'social.x.label': 'X',
    'social.x.title': 'X öffnen',
    'social.x.ariaLabel': 'X öffnen (neuer Tab)',
    'social.matrix.label': 'Matrix',
    'social.matrix.title': 'Matrix öffnen',
    'social.matrix.ariaLabel': 'Matrix öffnen (neuer Tab)',
  },
  en: {
    // Meta
    'meta.title': 'MOS - Modular Operating System for Servers and Homelabs',
    'meta.description': 'MOS is a modern web interface for monitoring, storage/shares, users, services, Docker, LXC, VMs, plugins, notifications and system settings – fast, clear and self-hosted.',
    'meta.ogDescription': 'Modern web interface for monitoring, storage/shares, users, services, Docker, LXC, VMs, plugins, notifications and settings.',

    // Brand
    'brand.alt': 'MOS',

    // Navigation
    'nav.ariaLabel': 'Main navigation',
    'nav.features': 'Features',
    'nav.apps': 'Apps',
    'nav.api': 'API',
    'nav.opensource': 'Open Source',
    'nav.usecases': 'Use Cases',
    'nav.partners': 'Partners',
    'nav.faq': 'FAQ',

    // Header
    'header.theme': 'Theme',
    'header.theme.ariaLabel': 'Toggle theme',
    'header.theme.title': 'Theme',
    'header.language.ariaLabel': 'Toggle language',
    'header.language.title': 'Language',
    'header.getStarted': 'Get Started',

    // Announcement
    'announcement.arm64.html': 'New: <strong>ARM64</strong> build available for MOS. <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">View releases</a>',

    // Hero
    'hero.kicker': 'Self-hosted · Fast · Clear',
    'hero.title': 'MOS - Modular Operating System for Servers and Homelabs',
    'hero.lead': 'Based on Devuan and resource‑friendly: Web UI with monitoring, storage & shares, users, networking, notifications, web terminal plus Docker, LXC, VMs – modular and extensible.',
    'hero.download': 'Download',
    'hero.chip1.strong': 'Modern UI',
    'hero.chip1.text': 'Vue + Vuetify',
    'hero.chip2.strong': 'Modern API',
    'hero.chip2.text': 'REST + WebSocket',
    'hero.chip3.strong': 'Open Source',
    'hero.chip3.text': 'AGPLv3',
    'header.language': 'EN',
    'hero.docs': 'Documentation',
    'hero.bullet1': 'No hidden services',
    'hero.bullet2': 'No telemetry',
    'hero.bullet3': 'No forced cloud services or dependencies',
    'hero.bullet4': 'Features can be enabled with plugins',
    'hero.screenshot.alt': 'MOS Web UI Screenshot',

    // Lightbox
    'lightbox.close': 'Close',
    'lightbox.imageAlt': 'MOS Web UI Screenshot enlarged',

    // Features
    'features.monitoring.title': 'Monitoring & Status',
    'features.monitoring.text': 'CPU, RAM, disks, temperatures, network – compact and directly accessible.',
    'features.storage.title': 'Storage, Pools & Shares',
    'features.storage.text': 'Overview disks and pools, manage shares – without losing context.',
    'features.users.title': 'Users & Profile',
    'features.users.text': 'User management, profile, language and UI settings centrally in one interface.',
    'features.containers.title': 'Containers & Virtualization',
    'features.containers.text': 'Docker, LXC and VMs accessible – depending on which MOS services are active.',
    'features.terminal.title': 'Web Terminal & Tools',
    'features.terminal.text': 'Quick checks and actions directly in the browser – without constantly switching between tools.',
    'features.notifications.title': 'Notifications',
    'features.notifications.text': 'Important events in real-time – with badge and toaster by priority.',
    'features.plugins.title': 'Plugins & Extensibility',
    'features.plugins.text': 'The interface stays lean – additional features come modular.',
    'features.settings.title': 'Settings & Services',
    'features.settings.text': 'System and service settings bundled: system, network, logs, tokens and more.',
    'features.i18n.title': 'Multilingual & Theme',
    'features.i18n.text': 'UI texts via i18n as well as light/dark and colors – matching your setup.',

    // Available Apps (MOS Hub)
    'apps.title': 'Available Apps',
    'apps.subtitle': 'Apps & templates from the MOS Hub – installable in MOS with a single click.',
    'apps.search.placeholder': 'Search apps…',
    'apps.filter.type': 'Type',
    'apps.filter.category': 'Category',
    'apps.filter.all': 'All',
    'apps.type.docker': 'Docker',
    'apps.type.compose': 'Compose',
    'apps.type.plugin': 'Plugin',
    'apps.view': 'View',
    'apps.source': 'Source',
    'apps.loading': 'Loading apps…',
    'apps.error': 'Could not load apps right now.',
    'apps.noResults': 'No apps found.',
    'apps.noLink': 'No link',
    'apps.unknown': 'Untitled',
    'apps.viewAll': 'View all apps',
    'apps.results': 'Apps',
    'apps.page.title': 'Apps – MOS',
    'apps.sort.label': 'Sort',
    'apps.sort.dateDesc': 'Newest first',
    'apps.sort.dateAsc': 'Oldest first',
    'apps.sort.updated': 'Recently updated',
    'apps.sort.nameAsc': 'Name (A–Z)',
    'apps.page.prev': 'Previous',
    'apps.page.next': 'Next',
    'apps.pagination.ariaLabel': 'Pagination',
    'apps.repos.button': 'Repositories',
    'apps.repos.title': 'Included Repositories',
    'apps.repos.count': 'Repositories',
    'apps.details': 'Details',
    'apps.webpage': 'Webpage',
    'apps.repository': 'Repository',
    'apps.donate': 'Donate',
    'apps.readme': 'Readme',
    'apps.support': 'Support',
    'apps.created': 'Created',
    'apps.updated': 'Updated',
    'apps.category': 'Category',
    'apps.architecture': 'Architecture',
    'apps.maintainer': 'Maintainer',
    'apps.type': 'Type',
    'apps.templateInfo': 'Template',
    'apps.copyLink': 'Copy link',
    'apps.linkCopied': 'Link copied',
    'repos.page.title': 'Recommended Repositories – MOS',
    'repos.title': 'Recommended Repositories',
    'repos.subtitle': 'Recommended template repositories for the MOS Hub.',
    'repos.toApps': 'Go to apps',
    'repos.json': 'As JSON',
    'repos.openPage': 'Open as page',
    'repos.loading': 'Loading repositories…',
    'repos.error': 'Repositories could not be loaded.',
    'nav.home': 'Home',

    // API
    'api.rest.title': 'REST-first',
    'api.rest.text': 'Clear HTTP endpoints for auth, system info, services, storage, users and much more.',
    'api.websocket.title': 'Realtime via WebSocket',
    'api.websocket.text': 'Live events like notifications work in real-time – without polling stress.',
    'api.integration.title': 'Clean Integration',
    'api.integration.text': 'Ideal for automation, own tools or external clients – depending on setup.',
    'api.note': 'Note: Details depend on version/installation. The UI uses API routes under /api/v1 and a notification WebSocket.',

    // Open Source
    'opensource.license.title': 'License',
    'opensource.license.text': 'MOS is (and remains) Open Source under the GNU AGPLv3.',
    'opensource.license.link': 'View license',
    'opensource.contribute.title': 'Contribute',
    'opensource.contribute.text': 'Feedback, issues and contributions help make MOS better.',
    'opensource.contribute.link': 'View the project on GitHub',

    // Use Cases
    'usecases.nas.title': 'Home Server / NAS',
    'usecases.nas.item1': 'Quickly check resources and storage pools',
    'usecases.nas.item2': 'Keep shares/users in view',
    'usecases.nas.item3': 'Remote mounts and hub services',
    'usecases.dev.title': 'Dev / Lab',
    'usecases.dev.item1': 'Docker, LXC, VMs in one place',
    'usecases.dev.item2': 'Web terminal for quick checks',
    'usecases.dev.item3': 'Plugins for project-specific tasks',

    // Partners
    'section.partners.title': 'Partners',
    'section.partners.subtitle': 'Project partners and supporting organizations',
    'partners.devuan': 'Devuan',
    'partners.weblate': 'Weblate',

    // FAQ
    'faq.what.title': 'What is MOS?',
    'faq.what.text': 'MOS is a lightweight, Devuan‑based operating system for homelabs and small servers. The web UI is a client to the MOS API and covers system monitoring, storage/pools, user management, containers (Docker, LXC) and virtual machines. See the docs: <a href="https://docs.mos-official.net/docs/Quick-Start/WebUI-Overview" target="_blank" rel="noopener">WebUI Overview</a>.',
    'faq.arm64.title': 'Is there an ARM64 build?',
    'faq.arm64.text': 'Yes — ARM64 builds are available, but they are still experimental.',
    'faq.services.title': 'Which services and platforms are supported?',
    'faq.services.text': 'MOS is service‑oriented: available services include Dashboard, Storage/Pools/Shares, Users, Docker service, LXC service, VM service, Web terminal and optional modules like MOS Hub and MOS Notify. Visible functionality depends on which services are enabled. See specific service docs (e.g. <a href="https://docs.mos-official.net/docs/Virtualization/Docker-Service" target="_blank" rel="noopener">Docker</a>, <a href="https://docs.mos-official.net/docs/Virtualization/LXC-Service" target="_blank" rel="noopener">LXC</a>, <a href="https://docs.mos-official.net/docs/Virtualization/VM-Service" target="_blank" rel="noopener">VM</a>).',
    'faq.install.title': 'How do I install and operate MOS?',
    'faq.install.text': 'Download the official release image (see <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">Releases</a>), write it to boot media and boot the target machine. Follow the <a href="https://docs.mos-official.net/docs/Installation/Create-Bootable-Media" target="_blank" rel="noopener">Quick Start / Installation</a> in the docs to configure networking, create a storage pool, enable services and start your first containers/VMs. The web UI is static; backend/services must be set up accordingly (API, Notify).',
    'faq.security.title': 'How is access and security handled?',
    'faq.security.text': 'MOS uses token‑based authentication; for production use run it behind TLS and a reverse proxy. Follow least‑privilege principles, keep system/services updated and monitor logs and notifications. See: <a href="https://docs.mos-official.net/docs/System-Management/System-Configuration/System-Settings" target="_blank" rel="noopener">System Management</a>.',
    'faq.plugins.title': 'How do plugins and extensions work?',
    'faq.plugins.text': 'MOS is modular: plugins can extend the UI and, where applicable, API functionality. Only registered and enabled plugins appear in the UI; installation and management are covered in the documentation. More: <a href="https://docs.mos-official.net/docs/" target="_blank" rel="noopener">MOS Docs</a>.',
    'faq.updates.title': 'How do I get updates and maintain MOS?',
    'faq.updates.text': 'Releases and updates are published on the project repositories. Backend and UI may be updated separately; consult the documentation for update and rollback procedures. Release overview: <a href="https://github.com/mos-nas/mos-releases/releases" target="_blank" rel="noopener">Releases</a>.',
    'faq.opensource.title': 'Is MOS Open Source?',
    'faq.opensource.text': 'Yes — MOS and its documentation are open source. See the LICENSE file in the repository for details: <a href="https://github.com/ich777/mos-frontend/blob/master/LICENSE" target="_blank" rel="noopener">LICENSE</a>.',
    'faq.help.title': 'Where can I find help or contribute?',
    'faq.help.text': 'Use the GitHub repository for issues and pull requests or consult the docs. The documentation contains Quick Start guides, system management instructions and pointers to community/support channels: <a href="https://docs.mos-official.net/docs/" target="_blank" rel="noopener">MOS Docs</a>.',

    // Sections
    'section.features.title': 'Features that matter in everyday use',
    'section.api.title': 'Modern API',
    'section.opensource.title': 'Open Source',
    'section.opensource.subtitle': 'Transparency, community and control over your own setup.',
    'section.usecases.title': 'Typical Use Cases',
    'section.usecases.subtitle': 'From home server to small rack – MOS adapts.',
    'section.security.title': 'Security & Access',
    'section.security.subtitle': 'A few basic principles for secure operation.',
    'section.faq.title': 'FAQ',
    'section.faq.subtitle': 'Briefly answered so you can get started right away.',

    // Highlights (New section)
    'highlights.title': 'What MOS covers',
    'highlights.subtitle': 'Core areas and quick links to the docs.',
    'highlights.quickStart.title': 'Quick Start',
    'highlights.quickStart.text': 'WebUI overview, network start, first pools, first container, shares.',
    'highlights.installation.title': 'Installation',
    'highlights.installation.text': 'Create boot media and get started. Changelog via releases.',
    'highlights.system.title': 'System',
    'highlights.system.text': 'Settings, cron, logs, updates/rollback, tokens, HUB & Notify.',
    'highlights.storage.title': 'Storage',
    'highlights.storage.text': 'Pools, filesystems, SMB/NFS shares, permissions and attributes.',
    'highlights.docker.title': 'Docker',
    'highlights.docker.text': 'Images/containers, logs, networking, volumes/appdata, Compose.',
    'highlights.lxc.title': 'LXC',
    'highlights.lxc.text': 'Create containers, snapshots/backups, networking & storage.',
    'highlights.vm.title': 'VM',
    'highlights.vm.text': 'CPUs/RAM, networks, disks, GPU/USB passthrough, snapshots.',
    'highlights.users.title': 'Users',
    'highlights.users.text': 'Create users, permissions & roles – cleanly segmented.',
    'highlights.api.title': 'API',
    'highlights.api.text': 'REST API and realtime via WebSocket for integrations.',
    'highlights.cta.try': 'Try Now',
    'highlights.cta.docs': 'Open Docs',

    // Footer
    'footer.scrollTop': 'Scroll to top',
    'footer.docs': 'Docs',
    'footer.license': 'AGPLv3',
    'footer.imprint': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',

    // Modal
    'modal.close': 'Close',

    // Imprint (Legal Notice)
    'imprint.title': 'Legal Notice',
    'imprint.responsible.title': 'Information according to § 5 ECG',
    'imprint.responsible.name': LEGAL_INFO.name,
    'imprint.responsible.address': LEGAL_INFO.street,
    'imprint.responsible.city': LEGAL_INFO.city,
    'imprint.responsible.country': LEGAL_INFO.country,
    'imprint.contact.title': 'Contact',
    'imprint.contact.email': 'Email: ' + LEGAL_INFO.email,
    'imprint.disclaimer.title': 'Disclaimer',
    'imprint.disclaimer.content.title': 'Liability for Content',
    'imprint.disclaimer.content.text':
      'The contents of this site have been created with the greatest care. However, no guarantee can be given for the correctness, completeness and timeliness of the content.',
    'imprint.disclaimer.links.title': 'Liability for Links',
    'imprint.disclaimer.links.text':
      'This site contains links to external third-party websites over whose content we have no control. The respective provider is always responsible for the content of the linked pages.',

    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.overview.title': '1. Privacy at a Glance',
    'privacy.overview.text': 'This website does not collect personal data, does not use cookies and does not employ tracking tools.',
    'privacy.responsible.title': '2. Controller',
    'privacy.responsible.name': LEGAL_INFO.name,
    'privacy.responsible.address': LEGAL_INFO.street,
    'privacy.responsible.city': LEGAL_INFO.city,
    'privacy.responsible.email': 'Email: ' + LEGAL_INFO.email,
    'privacy.hosting.title': '3. Hosting',
    'privacy.hosting.text':
      'This website is self-hosted. Technical information may be stored in server log files with each access (IP address, time, page accessed, browser type). This data is used exclusively for security and error analysis and is not shared with third parties. Processing is based on Art. 6 para. 1 lit. f GDPR (legitimate interest in secure website operation).',
    'privacy.cloudflare.title': '4. Cloudflare',
    'privacy.cloudflare.text':
      'This website uses Cloudflare (Cloudflare, Inc.) as a security and performance service. Connection data (e.g. IP address) is routed through Cloudflare servers. Cloudflare is a US company that offers GDPR-compliant Standard Contractual Clauses (SCCs) and a Data Processing Addendum (DPA). More information: https://www.cloudflare.com/privacypolicy/',
    'privacy.cookies.title': '5. Cookies',
    'privacy.cookies.text': 'This website does not use cookies.',
    'privacy.localStorage.title': '6. Local Storage',
    'privacy.localStorage.text':
      "This website only stores technically necessary settings (theme and language preference) in your browser's local storage (localStorage). This data is not transmitted to servers and can be removed at any time by clearing your browser data.",
    'privacy.external.title': '7. External Links',
    'privacy.external.text':
      'This website contains links to external websites (e.g. GitHub). When clicking these links, you leave this website. The respective operators are responsible for the data protection practices of these external sites.',
    'privacy.rights.title': '8. Your Rights',
    'privacy.rights.text':
      'You have the right to access, rectification, deletion and restriction of processing of your personal data, as well as the right to data portability. In case of complaints, you can contact the competent supervisory authority.',

    // Skip link
    skipLink: 'Skip to content',

    // Social
    'social.ariaLabel': 'Social links',
    'social.discord.label': 'Discord',
    'social.discord.title': 'Open Discord',
    'social.discord.ariaLabel': 'Open Discord (new tab)',
    'social.reddit.label': 'Reddit',
    'social.reddit.title': 'Open Reddit',
    'social.reddit.ariaLabel': 'Open Reddit (new tab)',
    'social.x.label': 'X',
    'social.x.title': 'Open X',
    'social.x.ariaLabel': 'Open X (new tab)',
    'social.matrix.label': 'Matrix',
    'social.matrix.title': 'Open Matrix',
    'social.matrix.ariaLabel': 'Open Matrix (new tab)',
  },
};

// Einfache i18n-Funktion
function i18n(key, lang = 'de') {
  return translations[lang]?.[key] || key;
}

// Sprache setzen und alle Texte aktualisieren
function setLanguage(lang) {
  if (!translations[lang]) return;

  // Sprache in localStorage speichern
  localStorage.setItem('mos-landing-lang', lang);

  // HTML lang-Attribut aktualisieren
  document.documentElement.setAttribute('lang', lang);

  // Sprachumschalter-Button aktualisieren
  updateLanguageButton(lang);

  // Alle Elemente mit data-i18n durchgehen
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = i18n(key, lang);

    // Wenn es ein Input/Button/Textarea ist, value setzen, sonst textContent
    if (el.tagName === 'INPUT' || el.tagName === 'BUTTON' || el.tagName === 'TEXTAREA') {
      if (el.type === 'submit' || el.type === 'button' || el.tagName === 'BUTTON') {
        // Für Buttons: Nur textContent setzen, wenn keine verschachtelten Elemente vorhanden sind
        if (el.children.length === 0) {
          el.textContent = translation;
        } else {
          // Wenn verschachtelte Elemente vorhanden sind, nur den direkten Text ersetzen
          const textNodes = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE);
          if (textNodes.length > 0) {
            textNodes[0].textContent = translation;
          }
        }
      } else {
        el.value = translation;
      }
    } else if (el.tagName === 'IMG' && el.hasAttribute('alt')) {
      el.alt = translation;
    } else if (el.tagName === 'STRONG' || el.tagName === 'EM' || el.tagName === 'SPAN') {
      // Für inline-Elemente: textContent setzen
      el.textContent = translation;
    } else {
      // Für Block-Elemente: textContent setzen (überschreibt verschachtelte Elemente)
      // Wenn verschachtelte Elemente mit data-i18n vorhanden sind, werden diese separat behandelt
      const hasNestedI18n = el.querySelector('[data-i18n]');
      if (!hasNestedI18n) {
        el.textContent = translation;
      }
    }
  });

  // title-Attribut aktualisieren
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = i18n(key, lang);
  });

  // aria-label aktualisieren
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    el.setAttribute('aria-label', i18n(key, lang));
  });

  // placeholder aktualisieren
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18n(key, lang);
  });

  // content-Attribut aktualisieren (für meta-Tags)
  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    const key = el.getAttribute('data-i18n-content');
    el.setAttribute('content', i18n(key, lang));
  });

  // alt-Attribut aktualisieren (für Bilder)
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.getAttribute('data-i18n-alt');
    el.setAttribute('alt', i18n(key, lang));
  });

  // innerHTML translations (für Texte mit HTML/Links)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    const translation = i18n(key, lang);
    el.innerHTML = translation;
  });

  // title-Tag aktualisieren
  const titleEl = document.querySelector('title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    titleEl.textContent = i18n(key, lang);
  }

  // document.title direkt aktualisieren (für Browser-Tab)
  const titleKey = document.querySelector('title[data-i18n]')?.getAttribute('data-i18n');
  if (titleKey) {
    document.title = i18n(titleKey, lang);
  }
}

// Verfügbare Sprachen als Array (für einfaches Durchlaufen)
function getAvailableLanguages() {
  return Object.keys(languages).filter((lang) => translations[lang]);
}

// Nächste Sprache in der Liste finden
function getNextLanguage(currentLang) {
  const available = getAvailableLanguages();
  const currentIndex = available.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % available.length;
  return available[nextIndex];
}

// Browser-Sprache erkennen (berücksichtigt mehrere Sprachen und Fallbacks)
function detectBrowserLanguage() {
  const available = getAvailableLanguages();
  if (available.length === 0) return 'de'; // Fallback

  // 1. Alle Browser-Sprachen durchgehen (navigator.languages für mehrere Präferenzen)
  const browserLangs = navigator.languages || [navigator.language];

  for (const browserLang of browserLangs) {
    // Vollständigen Code prüfen (z.B. "en-US")
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (available.includes(langCode)) {
      return langCode;
    }

    // Auch mit Unterstrich-Variante prüfen (z.B. "en_US")
    const langCodeAlt = browserLang.split('_')[0].toLowerCase();
    if (available.includes(langCodeAlt)) {
      return langCodeAlt;
    }
  }

  // 2. Fallback: System-Sprache (navigator.language)
  const systemLang = (navigator.language || '').split('-')[0].toLowerCase();
  if (available.includes(systemLang)) {
    return systemLang;
  }

  // 3. Fallback: Erste verfügbare Sprache (Standard: Deutsch)
  return available.includes('de') ? 'de' : available[0];
}

// Sprache beim Laden initialisieren
function initLanguage() {
  const stored = localStorage.getItem('mos-landing-lang');
  const available = getAvailableLanguages();

  // Wenn bereits eine Sprache gespeichert ist, diese verwenden
  if (stored && available.includes(stored)) {
    setLanguage(stored);
    return;
  }

  // Ansonsten Browser-Sprache erkennen
  const detectedLang = detectBrowserLanguage();
  setLanguage(detectedLang);
}

// Sprachumschalter-Text aktualisieren
function updateLanguageButton(lang) {
  const langBtn = document.querySelector('[data-action="toggle-language"] .hide-sm');
  if (langBtn && languages[lang]) {
    langBtn.textContent = languages[lang].code;
  }
}
