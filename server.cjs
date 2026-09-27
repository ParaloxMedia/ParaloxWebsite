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

  if (fs.existsSync(target)) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return send(res, target);
    // Folders with their own page, e.g. /ai-creator-camp/
    const dirIndex = path.join(target, 'index.html');
    if (stat.isDirectory() && fs.existsSync(dirIndex)) return send(res, dirIndex);
  }

  const index = path.join(DIST, 'index.html');
  if (!fs.existsSync(index)) { res.writeHead(500); res.end('Build not found. Run npm run build first.'); return; }
  send(res, index);
});

server.listen(PORT, () => console.log(`Paralox Media server running on port ${PORT}`));
