// Static server for the Vite build in dist/ (DigitalOcean App Platform runs
// `npm run build`, then `node server.js`). Pages use hash routes, so every
// unknown path falls back to index.html.
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
  '.pdf':  'application/pdf',
};

// Per-page link previews (title, description, photo) from the build. Crawlers
// such as WhatsApp and LinkedIn don't run JavaScript, so tags must be in the HTML.
let ROUTE_META = {};
try { ROUTE_META = JSON.parse(fs.readFileSync(path.join(DIST, 'route-meta.json'), 'utf8')); }
catch { console.warn('route-meta.json not found; pages will share the default preview.'); }

// Always the public domain, so previews and canonicals never point at an internal host.
const ORIGIN = process.env.SITE_ORIGIN || 'https://www.paraloxmedia.com';

// URLs from the previous site, moved permanently so their search ranking carries over.
const LEGACY = {
  '/careers': '/about',
  '/gallery': '/',
  '/packages': '/',
  '/feedback': '/contact',
  '/get-started': '/contact',
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON inside <script>: escape "<" so "</script>" in text can't close the tag.
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

/**
 * Decide what a page request should get: the page (200), a permanent redirect
 * (301), or not found (404, still rendered by the app but marked noindex).
 */
function route(urlPath) {
  if (urlPath !== '/' && urlPath.endsWith('/')) return { redirect: urlPath.replace(/\/+$/, '') || '/' };
  if (LEGACY[urlPath]) return { redirect: LEGACY[urlPath] };
  if (ROUTE_META[urlPath]) return { status: 200, key: urlPath, meta: ROUTE_META[urlPath] };
  if (urlPath.startsWith('/pulse/')) return { redirect: '/pulse' }; // articles from the old site
  return { status: 404, key: '/', meta: ROUTE_META['/'] };
}

function renderIndex(html, { key, meta, status }) {
  if (!meta) return html;
  const url = `${ORIGIN}${meta.canonical || key}`;
  const image = /^https?:/.test(meta.image) ? meta.image : `${ORIGIN}${encodeURI(decodeURI(meta.image))}`;
  const ogTitle = meta.ogTitle || meta.title;
  const tags = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    status === 404
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    status !== 404 && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${esc(meta.type || 'website')}" />`,
    `<meta property="og:site_name" content="Paralox Media" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:secure_url" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(ogTitle)}" />`,
    meta.width && `<meta property="og:image:width" content="${meta.width}" />`,
    meta.height && `<meta property="og:image:height" content="${meta.height}" />`,
    meta.published && `<meta property="article:published_time" content="${esc(meta.published)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    status !== 404 && meta.jsonld && `<script type="application/ld+json">${jsonForScript(meta.jsonld)}</script>`,
  ].filter(Boolean).join('\n    ');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(status === 404 ? 'Page not found | Paralox Media' : meta.title)}</title>`)
    .replace(/\s*<meta\s+(?:name="(?:description|robots|twitter:[^"]*)"|property="(?:og|article):[^"]*")[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace('</head>', `    ${tags}\n  </head>`);
}

function sendIndex(res, file, urlPath, search = '') {
  const r = route(urlPath);
  if (r.redirect) {
    res.writeHead(301, { Location: r.redirect + search, 'Cache-Control': 'public, max-age=3600' });
    res.end();
    return;
  }
  const html = renderIndex(fs.readFileSync(file, 'utf8'), r);
  res.writeHead(r.status, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
  res.end(html);
}

function send(res, file, urlPath) {
  const ext = path.extname(file).toLowerCase();
  // Only Vite's content-hashed /assets/ files can be cached forever. Fixed names
  // (sitemap.xml, robots.txt, og/ cards, images) must be able to change.
  const cache = ext === '.html' ? 'no-cache'
    : urlPath.startsWith('/assets/') ? 'public, max-age=31536000, immutable'
    : ext === '.xml' || ext === '.txt' ? 'public, max-age=3600'
    : 'public, max-age=86400';
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cache });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  const [rawPath, query] = req.url.split('?');
  const search = query ? `?${query}` : '';
  let urlPath;
  try { urlPath = decodeURIComponent(rawPath); }
  catch { urlPath = '/'; }

  // Resolve inside dist/ only; reject path traversal.
  const target = path.normalize(path.join(DIST, urlPath));
  if (!target.startsWith(DIST)) { res.writeHead(403); res.end(); return; }

  const index = path.join(DIST, 'index.html');

  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return target === index ? sendIndex(res, index, '/', search) : send(res, target, urlPath);
    // Folders with their own page, e.g. /ai-creator-camp/
    const dirIndex = path.join(target, 'index.html');
    if (stat.isDirectory() && fs.existsSync(dirIndex) && dirIndex !== index) return send(res, dirIndex, urlPath);
  }

  // Missing files with an extension (old images, typos) are plain 404s, not the app.
  if (path.extname(urlPath)) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }

  if (!fs.existsSync(index)) { res.writeHead(500); res.end('Build not found. Run npm run build first.'); return; }
  sendIndex(res, index, urlPath, search);
});

server.listen(PORT, () => console.log(`Paralox Media server running on port ${PORT}`));
