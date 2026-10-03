// Optional Node server for the Vite build in dist/.
// Static hosts use the per-route HTML generated during npm run build.
const { renderIndex } = require('./scripts/render-page.cjs');
const crypto = require('crypto');
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

/* ---------- Private pages (rate card) ----------
   Published encrypted in /sealed/ and decrypted in the browser with the link's
   token (scripts/private-page.mjs). Static hosting is enough; when this server
   runs it also turns unknown links into 404s and keeps the pages out of search. */
const PRIVATE_HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'private, no-store',
  'Referrer-Policy': 'no-referrer',
};
const PRIVATE_PAGES = {
  'rate-card': { prefix: 'rc', title: '2026 Service Rate Card | Paralox Media', ogTitle: 'Paralox Media · 2026 Service Rate Card', description: 'A private rate card shared by Paralox Media.' },
};
// Same id as scripts/private-page.mjs; each sealed file lists the ids of its active links only.
function validPrivateToken(page, t) {
  try {
    const { links } = JSON.parse(fs.readFileSync(path.join(DIST, 'sealed', `${page}.json`), 'utf8'));
    const id = crypto.createHash('sha256').update(`plx-${PRIVATE_PAGES[page].prefix}-id:${t}`).digest('hex').slice(0, 32);
    return typeof t === 'string' && t.length < 64 && Object.prototype.hasOwnProperty.call(links, id);
  } catch { return false; }
}

/** Handles /rate-card/<token> and the sealed files. Returns true when handled. */
function handlePrivatePage(req, res, urlPath, index) {
  if (urlPath.startsWith('/sealed/')) {
    const file = path.join(DIST, 'sealed', path.basename(urlPath));
    if (!fs.existsSync(file)) { res.writeHead(404, PRIVATE_HEADERS); res.end(); return true; }
    res.writeHead(200, { ...PRIVATE_HEADERS, 'Content-Type': file.endsWith('.json') ? 'application/json' : 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
    return true;
  }
  const m = urlPath.match(/^\/(rate-card)(?:\/([^/]+))?\/?$/);
  if (!m) return false;
  const [, page, token] = m;
  const ok = !!token && validPrivateToken(page, token);
  const { title, ogTitle, description } = PRIVATE_PAGES[page];
  const meta = { title, ogTitle, description, image: '/og/home.jpg', width: 1200, height: 630, type: 'website', private: true };
  // An invalid link still renders the app, which shows "link not available".
  const html = renderIndex(fs.readFileSync(index, 'utf8'), { key: urlPath, meta, status: ok ? 200 : 404 }, ORIGIN);
  res.writeHead(ok ? 200 : 404, { ...PRIVATE_HEADERS, 'Content-Type': MIME['.html'] });
  res.end(html);
  return true;
}

// Always the public domain, so previews and canonicals never point at an internal host.
const ORIGIN = process.env.SITE_ORIGIN || 'https://paraloxmedia.com';

// URLs from the previous site, moved permanently so their search ranking carries over.
const LEGACY = {
  '/careers': '/about',
  '/gallery': '/',
  '/packages': '/',
  '/feedback': '/contact',
  '/get-started': '/contact',
};

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


function sendIndex(res, file, urlPath, search = '') {
  const r = route(urlPath);
  if (r.redirect) {
    res.writeHead(301, { Location: r.redirect + search, 'Cache-Control': 'public, max-age=3600' });
    res.end();
    return;
  }
  const html = renderIndex(fs.readFileSync(file, 'utf8'), r, ORIGIN);
  res.writeHead(r.status, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
  res.end(html);
}

function send(res, file, urlPath, req) {
  const ext = path.extname(file).toLowerCase();
  // Only Vite's content-hashed /assets/ files can be cached forever. Fixed names
  // (sitemap.xml, robots.txt, og/ cards, images) must be able to change.
  const cache = ext === '.html' ? 'no-cache'
    : urlPath.startsWith('/assets/') ? 'public, max-age=31536000, immutable'
    : ext === '.xml' || ext === '.txt' ? 'public, max-age=3600'
    : 'public, max-age=86400';
  const size = fs.statSync(file).size;
  const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cache, 'Accept-Ranges': 'bytes' };

  // Byte ranges: Safari will not play <video> without them, and they let players seek.
  const range = req && req.headers.range;
  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    let start = -1; let end = size - 1;
    if (m && m[1] !== '') { start = Number(m[1]); if (m[2] !== '') end = Math.min(Number(m[2]), size - 1); }
    else if (m && m[2] !== '') { start = Math.max(0, size - Number(m[2])); } // suffix range: last N bytes
    if (start < 0 || start >= size || end < start) {
      res.writeHead(416, { 'Content-Range': `bytes */${size}` });
      res.end();
      return;
    }
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file, { start, end }).pipe(res);
    return;
  }
  res.writeHead(200, { ...headers, 'Content-Length': size });
  if (req && req.method === 'HEAD') { res.end(); return; }
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

  if (handlePrivatePage(req, res, urlPath, index)) return;

  // Keep redirects and origin overrides consistent even with generated indexes.
  if (ROUTE_META[urlPath.replace(/\/+$/, '') || '/']) return sendIndex(res, index, urlPath, search);

  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return target === index ? sendIndex(res, index, '/', search) : send(res, target, urlPath, req);
    // Folders with their own page, e.g. /ai-creator-camp/
    const dirIndex = path.join(target, 'index.html');
    if (stat.isDirectory() && fs.existsSync(dirIndex) && dirIndex !== index) return send(res, dirIndex, urlPath, req);
  }

  // Missing files with an extension (old images, typos) are plain 404s, not the app.
  if (path.extname(urlPath)) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }

  if (!fs.existsSync(index)) { res.writeHead(500); res.end('Build not found. Run npm run build first.'); return; }
  sendIndex(res, index, urlPath, search);
});

server.listen(PORT, () => console.log(`Paralox Media server running on port ${PORT}`));
