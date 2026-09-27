// Runs before every build. Writes public/sitemap.xml from the site's pages and
// every Pulse article, so new articles are listed without editing XML by hand.
import { readFile, writeFile } from 'node:fs/promises';

const SITE = 'https://paraloxmedia.com';
const OUT = new URL('../public/sitemap.xml', import.meta.url);
const today = new Date().toISOString().slice(0, 10);

// Keep in step with PAGES in src/App.jsx.
const PAGES = [
  { path: '/',            priority: '1.0', changefreq: 'weekly' },
  { path: '/ai',          priority: '0.9', changefreq: 'monthly' },
  { path: '/engineering', priority: '0.9', changefreq: 'monthly' },
  { path: '/media',       priority: '0.9', changefreq: 'monthly' },
  { path: '/growth',      priority: '0.9', changefreq: 'monthly' },
  { path: '/about',       priority: '0.8', changefreq: 'monthly' },
  { path: '/contact',     priority: '0.8', changefreq: 'yearly' },
  { path: '/pulse',       priority: '0.7', changefreq: 'weekly' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entry = ({ path, lastmod, priority, changefreq }) =>
  `  <url>\n    <loc>${esc(SITE + path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
  `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

// pulse.js imports images, so Node can't import it; read ids and dates from the source.
const src = await readFile(new URL('../src/data/pulse.js', import.meta.url), 'utf8');
const PULSE_POSTS = [...src.matchAll(/\bid:\s*["']([^"']+)["'][^\n]*?\biso:\s*["'](\d{4}-\d{2}-\d{2})["']/g)]
  .map(([, id, iso]) => ({ id, iso }));
if (!PULSE_POSTS.length) throw new Error('sitemap: no Pulse posts found in src/data/pulse.js; check the id/iso format');

// Articles use their publish date; future-dated (upcoming event) posts use today.
const posts = [...PULSE_POSTS]
  .sort((a, b) => (a.iso < b.iso ? 1 : -1))
  .map((p) => ({
    path: `/pulse/${encodeURIComponent(p.id)}`,
    lastmod: p.iso && p.iso <= today ? p.iso : today,
    priority: '0.6',
    changefreq: 'yearly',
  }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...PAGES.map((p) => ({ ...p, lastmod: today })), ...posts].map(entry).join('\n')}
</urlset>
`;

await writeFile(OUT, xml);
console.log(`sitemap: ${PAGES.length} pages + ${posts.length} articles → public/sitemap.xml`);
