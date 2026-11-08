/**
 * ChatGPT Ads measurement pixel (https://developers.openai.com/ads/measurement-pixel).
 * Off until PIXEL_ID is set: nothing loads and track() does nothing. When on, it starts
 * with consent off and only measures after the visitor accepts (see CookieConsent).
 */
export const PIXEL_ID = '976pigAgZaxzebj4eRJZyG'; // From ChatGPT Ads Manager → Conversions.

// Debug logs pixel activity to the browser console, for verifying the setup in Ads Manager. Set false once verified.
const DEBUG = true;

const CONSENT_KEY = 'plx-measure-consent'; // 'yes' | 'no'
let started = false;

export const pixelEnabled = () => Boolean(PIXEL_ID) && typeof window !== 'undefined';

export function storedConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

/** Loads the SDK once (official snippet) and applies any stored consent. */
export function startPixel() {
  if (!pixelEnabled() || started) return;
  started = true;
  (function (w, d, s, u) {
    if (w.oaiq) return;
    const q = function () { q.q.push(arguments); };
    q.q = [];
    w.oaiq = q;
    const js = d.createElement(s);
    js.async = true;
    js.src = u;
    const f = d.getElementsByTagName(s)[0];
    f.parentNode.insertBefore(js, f);
  })(window, document, 'script', 'https://bzrcdn.openai.com/sdk/oaiq.min.js');
  window.oaiq('init', { pixelId: PIXEL_ID, debug: DEBUG });
  // No measurement until the visitor says yes.
  window.oaiq('consent', storedConsent() === 'yes');
}

export function setConsent(yes) {
  try { localStorage.setItem(CONSENT_KEY, yes ? 'yes' : 'no'); } catch { /* private mode */ }
  if (pixelEnabled() && window.oaiq) window.oaiq('consent', yes);
}

const newId = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

// Matching data, normalized as the pixel docs require (same rules as server.cjs).
const normEmail = (v) => String(v || '').trim().toLowerCase();
// Keep the country code; local Sri Lankan numbers (07…) become 947….
const normPhone = (v) => {
  const raw = String(v || '').replace(/[\s().-]/g, '');
  if (/^0\d{9}$/.test(raw)) return `94${raw.slice(1)}`;
  return raw.replace(/^\+/, '').replace(/^0+/, '');
};
const normName = (v) => String(v || '').toLowerCase().replace(/\s+/g, '').replace(/[!-/:-@[-`{-~]/g, '');
const sha256 = async (v) => {
  const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(v));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
};

/** Hashes what the visitor typed into the pixel's `user` object; raw values never reach the pixel. */
async function matchingUser({ name, email, phone } = {}) {
  if (!window.crypto?.subtle) return null;
  const user = {};
  const e = normEmail(email);
  if (e.includes('@')) user.email_sha256 = await sha256(e);
  const p = normPhone(phone);
  if (/^\d{8,15}$/.test(p)) user.phone_number_sha256 = await sha256(p);
  const [first, ...rest] = String(name || '').trim().split(/\s+/);
  if (first && normName(first)) user.first_name_sha256 = await sha256(normName(first));
  if (rest.length && normName(rest.join(' '))) user.last_name_sha256 = await sha256(normName(rest.join(' ')));
  return Object.keys(user).length ? user : null;
}

/**
 * Sends a conversion from the browser (pixel) and, with the same event id, from our
 * server (Conversions API, /api/conversion), so OpenAI counts it once even if one is
 * blocked. Call only after a successful submission. `contact` ({ name, email, phone })
 * is hashed in the browser for pixel matching, and sent to our server, which hashes it too.
 */
export function track(event, data = {}, contact = {}) {
  if (!pixelEnabled() || storedConsent() !== 'yes') return;
  const id = newId();
  // Matching first (pixel `init` with the hashed user), then the one conversion event.
  // A matching failure never blocks the event or the form.
  (async () => {
    let user = null;
    try { user = await matchingUser(contact); } catch { /* no matching data */ }
    // Consent can change while hashing.
    if (!window.oaiq || storedConsent() !== 'yes') return;
    if (user) window.oaiq('init', { pixelId: PIXEL_ID, user });
    window.oaiq('measure', event, { type: 'customer_action', ...data }, { event_id: id });
  })();
  try {
    fetch('/api/conversion', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, id, source_url: window.location.href, amount: data.amount, currency: data.currency, ...contact }),
    }).catch(() => {});
  } catch { /* offline */ }
}

/** A page view, in the 'contents' shape page_viewed requires. */
export function trackPageView() {
  if (!pixelEnabled() || !window.oaiq || storedConsent() !== 'yes') return;
  const path = window.location.pathname;
  window.oaiq('measure', 'page_viewed', {
    type: 'contents',
    contents: [{ id: path, name: document.title, content_type: 'page' }],
  });
}
