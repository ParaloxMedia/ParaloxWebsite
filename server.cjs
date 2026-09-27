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

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function metaFor(urlPath) {
  const key = urlPath.replace(/\/+$/, '') || '/';
  return { key: ROUTE_META[key] ? key : '/', meta: ROUTE_META[key] || ROUTE_META['/'] };
}

function renderIndex(html, urlPath, origin) {
  const { key, meta } = metaFor(urlPath);
  if (!meta) return html;
  const url = `${origin}${key === '/' ? '/' : key}`;
  const image = /^https?:/.test(meta.image) ? meta.image : `${origin}${encodeURI(decodeURI(meta.image))}`;
  const tags = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${esc(meta.type || 'website')}" />`,
    `<meta property="og:site_name" content="Paralox Media" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:secure_url" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(meta.title)}" />`,
    meta.published && `<meta property="article:published_time" content="${esc(meta.published)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ].filter(Boolean).join('\n    ');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/\s*<meta\s+(?:name="(?:description|twitter:[^"]*)"|property="(?:og|article):[^"]*")[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace('</head>', `    ${tags}\n  </head>`);
}

// Always the public domain, so previews and canonicals never point at an internal host.
const ORIGIN = process.env.SITE_ORIGIN || 'https://www.paraloxmedia.com';

function sendIndex(res, file, urlPath) {
  const html = renderIndex(fs.readFileSync(file, 'utf8'), urlPath, ORIGIN);
  res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
  res.end(html);
}

function send(res, file) {
  const ext = path.extname(file).toLowerCase();
  // Hashed assets can be cached forever; HTML must always be revalidated.
  const cache = ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable';
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cache });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent(req.url.split('?')[0]); }
  catch { urlPath = '/'; }

  // Resolve inside dist/ only; reject path traversal.
  const target = path.normalize(path.join(DIST, urlPath));
  if (!target.startsWith(DIST)) { res.writeHead(403); res.end(); return; }

  const index = path.join(DIST, 'index.html');

  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return target === index ? sendIndex(res, index, '/') : send(res, target);
    // Folders with their own page, e.g. /ai-creator-camp/
    const dirIndex = path.join(target, 'index.html');
    if (stat.isDirectory() && fs.existsSync(dirIndex)) {
      return dirIndex === index ? sendIndex(res, index, urlPath) : send(res, dirIndex);
    }
  }

  if (!fs.existsSync(index)) { res.writeHead(500); res.end('Build not found. Run npm run build first.'); return; }
  sendIndex(res, index, urlPath);
});

server.listen(PORT, () => console.log(`Paralox Media server running on port ${PORT}`));
