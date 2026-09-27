import { useEffect, useState } from 'react';

/**
 * Path-based routing with real URLs (/about, /pulse/<id>) so every page can be
 * indexed and listed in the sitemap. The server falls back to index.html for
 * any path, so deep links work on refresh.
 *
 * Route keys: '/' → 'home', '/services' → 'services-home',
 * '/pulse/<id>' → '<id>', '/<page>' → '<page>'.
 * Legacy hash links (/#about) resolve to the same key; App rewrites the URL.
 */
export function keyFromLocation(loc = window.location) {
  const path = loc.pathname.replace(/\/+$/, '') || '/';
  if (path === '/') {
    const legacy = (loc.hash || '').slice(1);
    return /^[a-z0-9-]+$/.test(legacy) ? legacy : 'home';
  }
  if (path === '/services') return 'services-home';
  const post = path.match(/^\/pulse\/([^/]+)$/);
  if (post) return decodeURIComponent(post[1]);
  return path.slice(1);
}

/** The canonical path for a route key. `isPost` marks Pulse article ids. */
export function pathFor(key, isPost = false) {
  if (!key || key === 'home') return '/';
  if (key === 'services-home') return '/services';
  if (isPost) return `/pulse/${key}`;
  return `/${key}`;
}

export const ROUTE_EVENT = 'paralox:route';

/** Client-side navigation: update the URL and notify useRoute listeners. */
export function navigate(path, { replace = false } = {}) {
  if (replace) window.history.replaceState(null, '', path);
  else window.history.pushState(null, '', path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

export function useRoute() {
  const [key, setKey] = useState(() => keyFromLocation());
  useEffect(() => {
    const on = () => setKey(keyFromLocation());
    window.addEventListener('popstate', on);
    window.addEventListener(ROUTE_EVENT, on);
    return () => {
      window.removeEventListener('popstate', on);
      window.removeEventListener(ROUTE_EVENT, on);
    };
  }, []);
  return [key, setKey];
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
