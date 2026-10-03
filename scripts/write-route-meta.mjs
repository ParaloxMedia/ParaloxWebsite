// Runs after the site build. Loads the SSR-built src/seo/ssr.js (so image
// imports are real /assets/... URLs) and writes dist/route-meta.json for server.cjs.
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

import renderer from './render-page.cjs';

const SSR_DIR = new URL('../dist-ssr/', import.meta.url);
const DIST = new URL('../dist/', import.meta.url);

const { ROUTE_META: META, ROUTE_BODY } = await import(new URL('ssr.js', SSR_DIR));
// Each page's text outline travels with its metadata (see ROUTE_BODY); server.cjs reads the same JSON.
const ROUTE_META = Object.fromEntries(Object.entries(META).map(([k, m]) => [k, ROUTE_BODY[k] ? { ...m, body: ROUTE_BODY[k] } : m]));

// Every preview image must exist in the build, or shares show no picture.
const missing = Object.entries(ROUTE_META)
  .filter(([, m]) => m.image.startsWith('/') && !existsSync(new URL(`.${decodeURI(m.image)}`, DIST)))
  .map(([path, m]) => `${path} → ${m.image}`);
if (missing.length) throw new Error(`route-meta: preview images missing from dist/:\n  ${missing.join('\n  ')}`);

await writeFile(new URL('route-meta.json', DIST), `${JSON.stringify(ROUTE_META, null, 2)}\n`);
await rm(SSR_DIR, { recursive: true, force: true });
console.log(`route-meta: ${Object.keys(ROUTE_META).length} pages → dist/route-meta.json`);

// Static hosts do not execute server.cjs. Give every shareable URL its own
// HTML head, so crawlers receive metadata before any JavaScript runs.
const template = await readFile(new URL('index.html', DIST), 'utf8');
for (const [key, meta] of Object.entries(ROUTE_META)) {
  const directory = new URL(`.${key === '/' ? '/' : `${key}/`}`, DIST);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), renderer.renderIndex(template, { key, meta, status: 200 }));
}
console.log(`share previews: ${Object.keys(ROUTE_META).length} static pages generated`);

// llms.txt: a plain-text map of the site for AI assistants and answer engines
// (GEO), built from the same titles and descriptions as the pages themselves.
const SITE = 'https://paraloxmedia.com';
const line = (path) => `- [${ROUTE_META[path].ogTitle?.replace(/ · Paralox Media$/, '') || ROUTE_META[path].title}](${SITE}${path}): ${ROUTE_META[path].description}`;
const paths = Object.keys(ROUTE_META).filter((p) => !ROUTE_META[p].canonical);
const llms = `# Paralox Media

> ${ROUTE_META['/'].description}

Based at 14 Sir Baron Jayathilake Mawatha, Colombo, Sri Lanka. Contact: info@paraloxmedia.com.

## Services
${['/ai', '/engineering', '/media', '/growth'].filter((p) => ROUTE_META[p]).map(line).join('\n')}

## Work
${line('/works')}
${paths.filter((p) => p.startsWith('/works/')).map(line).join('\n')}

## Projects
${paths.filter((p) => p.startsWith('/work/')).map(line).join('\n')}

## Company
${['/about', '/contact', '/pulse'].map(line).join('\n')}

## Pulse articles
${paths.filter((p) => p.startsWith('/pulse/')).map(line).join('\n')}

## FAQ
${ROUTE_BODY['/'].sections.find((s) => s.h2 === 'Questions, answered').items.map((f) => `- ${f.name} ${f.text}`).join('\n')}
`;
await writeFile(new URL('llms.txt', DIST), llms);
console.log('llms.txt written');
