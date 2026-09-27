// Pulls Google reviews for the studio from the Places API (New) into src/data/reviews.json.
// Runs before every build. Needs GOOGLE_MAPS_API_KEY (in .env or the host's env vars).
// Without a key, or if the request fails, the existing reviews.json is kept so the build still works.
import { writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/reviews.json', import.meta.url);
const KEY = process.env.GOOGLE_MAPS_API_KEY;
const QUERY = 'Paralox Media (Pvt) Ltd, Colombo';
const API = 'https://places.googleapis.com/v1';

async function call(url, fieldMask, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': fieldMask },
    body: body && JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
  return data;
}

async function placeId() {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  const { places = [] } = await call(`${API}/places:searchText`, 'places.id,places.displayName', { textQuery: QUERY });
  if (!places.length) throw new Error(`no place found for "${QUERY}"`);
  console.log(`reviews: using place ${places[0].id} (${places[0].displayName?.text}); set GOOGLE_PLACE_ID to pin it`);
  return places[0].id;
}

async function main() {
  if (!KEY) { console.log('reviews: GOOGLE_MAPS_API_KEY not set, keeping existing reviews.json'); return; }
  try {
    const id = await placeId();
    const place = await call(`${API}/places/${id}`, 'rating,userRatingCount,googleMapsUri,reviews');
    const reviews = (place.reviews || [])
      .filter((r) => (r.originalText?.text || r.text?.text || '').trim())
      .map((r) => ({
        name: r.authorAttribution?.displayName || 'Google user',
        rating: r.rating,
        text: (r.originalText?.text || r.text?.text).trim(),
        date: r.relativePublishTimeDescription || '',
        photo: r.authorAttribution?.photoUri || undefined,
        url: r.authorAttribution?.uri || undefined,
      }));
    const out = { rating: place.rating ?? null, count: place.userRatingCount ?? 0, url: place.googleMapsUri || '', fetchedAt: new Date().toISOString(), reviews };
    await writeFile(OUT, `${JSON.stringify(out, null, 2)}\n`);
    console.log(`reviews: saved ${reviews.length} reviews (${out.rating}★ from ${out.count})`);
  } catch (e) {
    console.warn(`reviews: fetch failed (${e.message}), keeping existing reviews.json`);
  }
}

main();
