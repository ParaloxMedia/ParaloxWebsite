import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useHashRoute';

/** Counts 0 → target once the element scrolls into view. Renders the final value until then. */
export function useCountUp(target, { duration = 1400, startWhenVisible = true, delay = 0, trigger = true } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (prefersReducedMotion() || !trigger) return;
    let raf, timer, done = false;
    const run = () => {
      if (done) return; done = true;
      timer = setTimeout(() => {
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setValue(0); raf = requestAnimationFrame(tick);
      }, delay);
    };
    if (!startWhenVisible) { run(); return () => { clearTimeout(timer); cancelAnimationFrame(raf); }; }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); run(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, startWhenVisible, delay, trigger]);
  return [ref, value];
}
