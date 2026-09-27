import { useEffect, useState } from 'react';

/** Hash-based routing: works on any static host with no server rewrites. */
export function useHashRoute() {
  const read = () => (window.location.hash || '').slice(1) || 'home';
  const [hash, setHash] = useState(read);
  useEffect(() => {
    const on = () => setHash(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return [hash, setHash];
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
