// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ⚡️ DANGER ZONE ⚡️
// ================
// {% if jekyll.environment == 'production' or site.hydejack.offline.development %}

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// {% assign cv = site.hydejack.offline.cache_version | default:"1" %}
const SHELL_CACHE = "shell-9.0.0-alpha.2--v{{ cv }}--sw{{ '/' | relative_url }}";

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = "assets--v{{ cv }}--sw{{ '/' | relative_url }}";

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = "content--{{ site.time | date_to_xmlschema }}--sw{{ '/' | relative_url }}";

// A URL search parameter you can add to external assets to cache them in the service worker.
const CACHE_SEARCH_PARAM = "sw-cache";

// The search parameter used to bypass the disk cache.
// https://jakearchibald.com/2016/caching-best-practices/#a-service-worker-can-extend-the-life-of-these-bugs
const RAND_SEARCH_PARAM = "rand";

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\(['"]?(.*?)['"]?\)/gi;

const ICON_FONT = "{{ '/assets/icomoon/style.css' | relative_url }}";

// {% assign google_fonts = site.google_fonts | default:"Roboto+Slab:700|Noto+Sans:400,400i,700,700i" %}
// {% unless site.hydejack.no_google_fonts or site.no_google_fonts %}
// {% assign gf = true %}
const GOOGLE_FONTS = "https://fonts.googleapis.com/css?family={{ google_fonts | uri_escape }}&display=swap";
// {% endunless %}

const SHELL_FILES = [
  "{{ '/assets/js/dom4-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/drawer-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/fetch-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/intersection-observer-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/push-state-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/resize-observer-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/shadydom-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/smoothscroll-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/vendors~drawer~push-state-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/vendors~push-state-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/vendors~shadydom-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/vendors~webanimations-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/webanimations-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/js/webcomponents-hydejack-9.0.0-alpha.2.js' | relative_url }}",
  "{{ '/assets/css/hydejack-9.0.0-alpha.2.css' | relative_url }}",
  "{{ '/assets/img/swipe.svg' | relative_url }}",
  ICON_FONT,
  /*{% if gf %}*/ GOOGLE_FONTS /*{% endif %}*/,
];

const ASSET_FILES = [
  /*{% if site.accent_image %}{% unless site.accent_image.background %}*/ "{% include smart-url.txt url=site.accent_image %}" /*{% endunless %}{% endif %}*/,
  /*{% if site.logo %}*/ "{% include smart-url.txt url=site.logo %}" /*{% endif %}*/,
  /*{% for file in site.hydejack.offline.precache_assets %}*/ "{% include smart-url.txt url=file %}",
  /*{% endfor %}*/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "{{ '/' | relative_url }}",
  "{{ '/?source=pwa' | relative_url }}",
  "{{ '/assets/manifest.json' | relative_url }}",
  "{{ '/offline.html' | relative_url }}",
  /*{% for legal in site.legal %}*/ "{% include smart-url.txt url=legal.href %}",
  /*{% endfor %}*/
];

const SITE_URL = new URL("{{ '/' | relative_url }}", self.location);
const OFFLINE_PAGE_URL = new URL("{{ '/offline.html' | relative_url }}", self.location);

self.addEventListener("install", e => e.waitUntil(onInstall(e)));
self.addEventListener("activate", e => e.waitUntil(onActivate(e)));
self.addEventListener("fetch", e => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, "");

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while (lastMatch = globalRegExp.exec(text)) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = url => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  const url2 = new URL(url, self.location);
  const rand = Math.random().toString(36).substr(2);
  url2.searchParams.append(RAND_SEARCH_PARAM, rand);
  return url2;
  // return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  url2.searchParams.delete(CACHE_SEARCH_PARAM);
  return url2;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
}

// TODO: transpile to ES5, or translate by hand.
async function getIconFontFiles() {
  const iconFontURL = new URL(ICON_FONT, self.location);
  const iconFontRes = await fetch(iconFontURL).catch(warn);
  if (iconFontRes.ok) {
    const text = await iconFontRes.text();

    const dirPath = dirname(iconFontURL);
    const fixURL = ([, match]) => new URL(`${dirPath}${match}`, iconFontURL)

    return [ICON_FONT, ...matchAll(text, RE_CSS_URL).map(fixURL)];
  }
  return []
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map(url => (
      fetch(noCache(toAbsoluteURL(url)))
        .then(res => cache.put(url, res))
        .catch(warn)
      )
    )
  );
}

async function cacheShell(cache) {
  const [iconFontFiles, googleFontsFiles] = await Promise.all([
    getIconFontFiles(),
    /*{% if gf %}*/ getGoogleFontsFiles() /*{% endif %}*/,
  ]);

  const urls = SHELL_FILES.concat(iconFontFiles, googleFontsFiles).filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = ASSET_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter(x => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([
      cacheShell(shellCache),
      cacheAssets(assetsCache),
      cacheContent(contentCache),
    ]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("{{ 'assets' | relative_url }}");
const hasSWParam = ({ searchParams }) => searchParams.has(CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com'

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw{{ '/' | relative_url }}"))
      // Delete old caches
      .filter(key => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map(key => caches.delete(key))
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map(_ => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = value => value != null
    ? value
    : --length > 0
      ? NEVER
      : undefined;
  return Promise.race(ps.map(p => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== "GET" || !shouldCache) {
    return fetch(request).catch(e => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then(c => c.match(url.href)),
      caches.open(ASSETS_CACHE).then(c => c.match(url.href)),
      caches.open(CONTENT_CACHE).then(c => c.match(url.href)),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// {% comment %}
// TODO: We could add support for downloading the entire page.
const ALL_ASSETS = [
  /*{% for file in site.static_files %}*/ "{{ file.path | relative_url }}",
  /*{% endfor %}*/
];

const ALL_DOCUMENTS = [
  /*{% for doc in site.documents %}*/ "{{ doc.url | relative_url }}",
  /*{% endfor %}*/
];

const ALL_PAGES = [
  /*{% for doc in site.pages %}*/ "{{ doc.url | relative_url }}",
  /*{% endfor %}*/
];
// {% endcomment %}

// {% else %}

self.addEventListener("activate", e => e.waitUntil(onDeactivate(e)));

async function onDeactivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter(key => key.endsWith("sw{{ '/' | relative_url }}"))
      // Delete *all* caches
      .map(key => caches.delete(key))
  );
}
// {% endif %}
