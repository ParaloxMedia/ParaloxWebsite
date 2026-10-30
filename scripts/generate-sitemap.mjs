// Runs before every build. Writes public/sitemap.xml from the site's pages and
// every Pulse article, so new articles are listed without editing XML by hand.
import { readFile, writeFile } from 'node:fs/promises';

const SITE = 'https://paraloxmedia.com';
const OUT = new URL('../public/sitemap.xml', import.meta.url);
const today = new Date().toISOString().slice(0, 10);

// Keep in step with PAGES in src/App.jsx.
const PAGES = [
  { path: '/',            priority: '1.0', changefreq: 'weekly', images: ['/brand/paralox-media-logo.png', '/brand/paralox-media-icon-512.png', '/og/home.jpg'] },
  { path: '/ai-agency-sri-lanka', priority: '0.9', changefreq: 'monthly' },
  { path: '/ai-video-sri-lanka', priority: '0.9', changefreq: 'monthly' },
  { path: '/ai-engineering-sri-lanka', priority: '0.9', changefreq: 'monthly' },
  { path: '/ai',          priority: '0.9', changefreq: 'monthly' },
  { path: '/engineering', priority: '0.9', changefreq: 'monthly' },
  { path: '/media',       priority: '0.9', changefreq: 'monthly' },
  { path: '/growth',      priority: '0.9', changefreq: 'monthly' },
  { path: '/works',       priority: '0.8', changefreq: 'monthly' },
  ...['ai', 'engineering', 'media', 'growth'].map((k) => ({ path: `/works/${k}`, priority: '0.7', changefreq: 'monthly' })),
  { path: '/about',       priority: '0.8', changefreq: 'monthly' },
  // His photos, listed so image search connects them to his name.
  { path: '/abubakker-bakthathi', priority: '0.8', changefreq: 'monthly', images: ['/team/abubakker/abubakker-bakthathi-card.jpg', '/team/abubakker/abubakker-bakthathi.jpg', '/team/abubakker/abubakker-bakthathi-banner.jpg', '/team/abubakker/abubakker-bakthathi-portrait.jpg'] },
  { path: '/careers',     priority: '0.7', changefreq: 'weekly' },
  { path: '/contact',     priority: '0.8', changefreq: 'yearly' },
  { path: '/pulse',       priority: '0.7', changefreq: 'weekly' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const entry = ({ path, lastmod, priority, changefreq, images = [] }) =>
  `  <url>\n    <loc>${esc(SITE + path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
  `    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n` +
  images.map((i) => `    <image:image><image:loc>${esc(SITE + i)}</image:loc></image:image>\n`).join('') +
  `  </url>`;

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

// Project case studies (projects.js also imports images), read the same way.
const projSrc = await readFile(new URL('../src/data/projects.js', import.meta.url), 'utf8');
const projects = [...projSrc.matchAll(/\bid:\s*["']([^"']+)["'][\s\S]*?\biso:\s*["'](\d{4}-\d{2}-\d{2})["']/g)]
  .map(([, id, iso]) => ({ path: `/work/${encodeURIComponent(id)}`, lastmod: iso <= today ? iso : today, priority: '0.7', changefreq: 'yearly' }));

// Open roles (careers.js imports images too): one page each.
const jobSrc = await readFile(new URL('../src/data/careers.js', import.meta.url), 'utf8');
const jobs = [...jobSrc.matchAll(/\bid:\s*["']([^"']+)["']([\s\S]*?)\bposted:\s*["'](\d{4}-\d{2}-\d{2})["']/g)]
  .filter(([, , block]) => !/\bfilled:\s*true/.test(block)) // filled roles are not listed
  .map(([m, id, , posted]) => [m, id, posted])
  .map(([, id, posted]) => ({ path: `/careers/${encodeURIComponent(id)}`, lastmod: posted <= today ? posted : today, priority: '0.7', changefreq: 'weekly' }));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...PAGES.map((p) => ({ ...p, lastmod: today })), ...jobs, ...projects, ...posts].map(entry).join('\n')}
</urlset>
`;

await writeFile(OUT, xml);
console.log(`sitemap: ${PAGES.length} pages + ${jobs.length} roles + ${projects.length} projects + ${posts.length} articles → public/sitemap.xml`);
