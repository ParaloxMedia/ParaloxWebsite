import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/useHashRoute';

/** Slow drifting lilac particles, fading towards the edges. */
export default function Particles({ count = 34 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const reduce = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf;
    const size = () => { const r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); window.addEventListener('resize', size);
    const P = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), r: 0.5 + Math.random() * 1.5, v: 0.00008 + Math.random() * 0.00022, a: Math.random() * 6.28, s: 0.004 + Math.random() * 0.01 }));
    const draw = () => {
      if (c.clientWidth && Math.abs(c.clientWidth - W) > 1) size();
      ctx.clearRect(0, 0, W, H);
      for (const p of P) {
        if (!reduce) { p.y -= p.v; p.a += p.s; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } }
        const dx = p.x - 0.5, dy = p.y - 0.45, fall = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 1.6);
        const al = (0.25 + 0.35 * Math.sin(p.a)) * fall;
        if (al <= 0) continue;
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.283);
        ctx.fillStyle = `rgba(201,181,255,${al.toFixed(3)})`; ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, [count]);
  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
