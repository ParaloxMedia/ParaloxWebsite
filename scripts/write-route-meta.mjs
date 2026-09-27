// Runs after the site build. Loads the SSR-built src/seo/routeMeta.js (so image
// imports are real /assets/... URLs) and writes dist/route-meta.json for server.cjs.
import { existsSync } from 'node:fs';
import { rm, writeFile } from 'node:fs/promises';

const SSR_DIR = new URL('../dist-ssr/', import.meta.url);
const DIST = new URL('../dist/', import.meta.url);

const { ROUTE_META } = await import(new URL('routeMeta.js', SSR_DIR));

// Every preview image must exist in the build, or shares show no picture.
const missing = Object.entries(ROUTE_META)
  .filter(([, m]) => m.image.startsWith('/') && !existsSync(new URL(`.${decodeURI(m.image)}`, DIST)))
  .map(([path, m]) => `${path} → ${m.image}`);
if (missing.length) throw new Error(`route-meta: preview images missing from dist/:\n  ${missing.join('\n  ')}`);

await writeFile(new URL('route-meta.json', DIST), `${JSON.stringify(ROUTE_META, null, 2)}\n`);
await rm(SSR_DIR, { recursive: true, force: true });
console.log(`route-meta: ${Object.keys(ROUTE_META).length} pages → dist/route-meta.json`);
