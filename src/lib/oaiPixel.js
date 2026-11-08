/**
 * ChatGPT Ads measurement pixel (https://developers.openai.com/ads/measurement-pixel).
 * Off until PIXEL_ID is set: nothing loads and track() does nothing. When on, it starts
 * with consent off and only measures after the visitor accepts (see CookieConsent).
 */
export const PIXEL_ID = '976pigAgZaxzebj4eRJZyG'; // From ChatGPT Ads Manager → Conversions.

// Production measurement must not log customer matching activity.
const DEBUG = false;

const CONSENT_KEY = 'plx-measure-consent'; // 'yes' | 'no'
let started = false;
let lastPage = null;
let consentInMemory;

export const pixelEnabled = () => Boolean(PIXEL_ID) && typeof window !== 'undefined';

export function storedConsent() {
  if (consentInMemory !== undefined) return consentInMemory;
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

/** Loads the SDK once (official snippet) and applies any stored consent. */
export function startPixel() {
  if (!pixelEnabled() || started) return;
  try {
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
    // Consent must be queued before init; the SDK defaults to granted.
    window.oaiq('consent', storedConsent() === 'yes');
    window.oaiq('init', { pixelId: PIXEL_ID, debug: DEBUG });
    started = true;
  } catch { /* Measurement must never break the page. */ }
}

export function setConsent(yes) {
  consentInMemory = yes ? 'yes' : 'no';
  try { localStorage.setItem(CONSENT_KEY, yes ? 'yes' : 'no'); } catch { /* private mode */ }
  try {
    startPixel();
    if (pixelEnabled() && window.oaiq) window.oaiq('consent', yes);
    if (yes) trackPageView();
    else lastPage = null;
  } catch { /* Measurement is optional. */ }
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
 * Measures successful submissions through the browser Pixel on static hosting.
 * Contact identifiers are hashed locally before matching; no server relay is called.
 */
export function track(event, data = {}, contact = {}) {
  if (!pixelEnabled() || storedConsent() !== 'yes') return;
  try {
    startPixel();
    const id = newId();
    // Matching first (pixel `init` with the hashed user), then the one conversion event.
    // A matching failure never blocks the event or the form.
    (async () => {
      let user = null;
      try { user = await matchingUser(contact); } catch { /* no matching data */ }
      // Consent can change while hashing.
      if (!window.oaiq || storedConsent() !== 'yes') return;
      if (user) window.oaiq('init', { user });
      window.oaiq('measure', event, { type: 'customer_action', ...data }, { event_id: id });
    })().catch(() => {});
  } catch { /* Never change a successful form result. */ }
}

/** A page view, in the 'contents' shape page_viewed requires. */
export function trackPageView() {
  try {
    if (!pixelEnabled() || storedConsent() !== 'yes') return;
    startPixel();
    if (!window.oaiq) return;
    const path = window.location.pathname;
    if (path === lastPage || path.startsWith('/rate-card/')) return;
    window.oaiq('measure', 'page_viewed', {
      type: 'contents',
      contents: [{ id: path, name: document.title, content_type: 'page' }],
    });
    lastPage = path;
  } catch { /* Measurement must never break navigation. */ }
}
