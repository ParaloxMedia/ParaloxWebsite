// Validate what a crawler receives without running the React application.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import renderer from './render-page.cjs';

const dist = new URL('../dist/', import.meta.url);
const metadata = JSON.parse(readFileSync(new URL('route-meta.json', dist), 'utf8'));
const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tag(html, attribute, name) {
  const matches = [...html.matchAll(new RegExp(`<meta ${attribute}="${name}" content="([^"]*)"`, 'g'))];
  assert.equal(matches.length, 1, `Expected exactly one ${name} tag`);
  return matches[0][1];
}

for (const [key, meta] of Object.entries(metadata)) {
  const file = new URL(`.${key === '/' ? '' : key}/index.html`, dist);
  const html = readFileSync(file, 'utf8');
  const title = escape(meta.ogTitle || meta.title);
  assert.equal(tag(html, 'property', 'og:title'), title, key);
  assert.equal(tag(html, 'name', 'twitter:title'), title, key);
  assert.equal(tag(html, 'property', 'og:description'), escape(meta.description), key);
  assert.equal(tag(html, 'property', 'og:type'), meta.type, key);
  assert.equal(tag(html, 'name', 'twitter:card'), 'summary_large_image', key);
  const image = tag(html, 'property', 'og:image');
  assert.match(image, /^https:\/\//, key);
  // The www hostname does not currently complete HTTPS; never emit it for crawlers.
  assert.ok(!html.includes('https://www.paraloxmedia.com'), `${key}: unreachable www URL`);
  if (meta.image.startsWith('/')) assert.equal(new URL(image).origin, 'https://paraloxmedia.com', key);
  assert.equal(tag(html, 'name', 'twitter:image'), image, key);
  if (meta.image.startsWith('/')) assert.ok(existsSync(new URL(`.${decodeURI(meta.image)}`, dist)), key);
  assert.equal(tag(html, 'property', 'og:url'), `https://paraloxmedia.com${meta.canonical || key}`, key);
  assert.equal((html.match(/application\/ld\+json/g) || []).length, 1, key);
  // The optional server may render an already generated page: no duplicate tags.
  const rerendered = renderer.renderIndex(html, { key, meta, status: 200 });
  assert.equal(tag(rerendered, 'property', 'og:title'), title, key);
  assert.equal((rerendered.match(/application\/ld\+json/g) || []).length, 1, key);
}

const camp = readFileSync(new URL('ai-creator-camp/index.html', dist), 'utf8');
assert.match(tag(camp, 'property', 'og:title'), /AI Creator Camp/);
const campImage = new URL(tag(camp, 'property', 'og:image'));
assert.ok(existsSync(new URL(`.${campImage.pathname}`, dist)));
assert.equal(tag(camp, 'name', 'twitter:card'), 'summary_large_image');
console.log(`Verified ${Object.keys(metadata).length} route previews and AI Creator Camp: titles, images and crawler-readable HTML.`);
