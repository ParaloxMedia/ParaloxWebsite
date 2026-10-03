/**
 * Opens a private page published encrypted in /sealed/<page>.json (see
 * scripts/private-page.mjs). The link's token derives the key that unwraps the
 * content key; an unknown or revoked token has no entry and the page stays shut.
 */
const enc = new TextEncoder();
const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const sha256 = async (s) => new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const hex = (u8) => Array.from(u8, (b) => b.toString(16).padStart(2, '0')).join('');
const aesKey = (raw) => crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
const decrypt = async (key, iv, data) => new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data));
// Query string so a CDN never serves a copy from before a link was added or revoked.
const fresh = (path) => fetch(`${path}?t=${Date.now()}`, { cache: 'no-store', referrerPolicy: 'no-referrer' });

/** { data, pdf } where pdf is null or a function resolving to a PDF Blob; null when the link is not valid. */
export async function unseal(page, prefix, token) {
  const res = await fresh(`/sealed/${page}.json`);
  if (!res.ok) return null;
  const sealed = await res.json();
  const entry = sealed.links?.[hex(await sha256(`plx-${prefix}-id:${token}`)).slice(0, 32)];
  if (!entry) return null;
  const key = await aesKey(await decrypt(await aesKey(await sha256(`plx-${prefix}-key:${token}`)), b64(entry.iv), b64(entry.key)));
  const data = JSON.parse(new TextDecoder().decode(await decrypt(key, b64(sealed.data.iv), b64(sealed.data.data))));
  const pdf = sealed.pdf && (async () => {
    const r = await fresh(`/sealed/${sealed.pdf.file}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return new Blob([await decrypt(key, b64(sealed.pdf.iv), await r.arrayBuffer())], { type: 'application/pdf' });
  });
  return { data, pdf };
}
