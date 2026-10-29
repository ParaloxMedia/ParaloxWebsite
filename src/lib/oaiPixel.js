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

/**
 * Sends a conversion from the browser (pixel) and, with the same event id, from our
 * server (Conversions API, /api/conversion), so OpenAI counts it once even if one is
 * blocked. `contact` ({ name, email, phone }) goes only to our server, which hashes it.
 */
export function track(event, data = {}, contact = {}) {
  if (!pixelEnabled() || storedConsent() !== 'yes') return;
  const id = newId();
  if (window.oaiq) window.oaiq('measure', event, { type: 'customer_action', ...data }, { event_id: id });
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
