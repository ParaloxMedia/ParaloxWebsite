import { useEffect, useLayoutEffect, useState } from 'react';
import { POSTS } from './data/content';
import { useHashRoute, prefersReducedMotion, finePointer } from './hooks/useHashRoute';
import { GlassDefs } from './components/Glass';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Footer from './components/Footer';
import FinalCta from './components/FinalCta';
import Home from './pages/Home';
import Pillar from './pages/Pillar';
import About from './pages/About';
import Pulse from './pages/Pulse';
import Article from './pages/Article';
import Contact from './pages/Contact';

const PILLAR_KEYS = ['ai', 'engineering', 'media', 'growth'];
const PAGES = ['home', 'about', 'pulse', 'contact', ...PILLAR_KEYS];

/** Resolve a hash into { view, nav, post, anchor }. */
function resolve(hash) {
  const post = POSTS.find((p) => p.id === hash);
  if (post) return { view: 'article', nav: 'pulse', post };
  if (hash === 'services-home') return { view: 'home', nav: 'home', anchor: 'services-home' };
  if (PAGES.includes(hash)) return { view: hash, nav: hash };
  return { view: 'home', nav: 'home' };
}

/* ---------- Global pointer effects (delegated, so they work on every page) ---------- */
const Spring = (k, c, m, x = 0) => ({ k, c, m, x, v: 0, t: x });
const step = (s, h) => { const a = (-s.k * (s.x - s.t) - s.c * s.v) / s.m; s.v += a * h; s.x += s.v * h; };
const moving = (s) => Math.abs(s.x - s.t) > 0.01 || Math.abs(s.v) > 0.01;

function useGlobalEffects() {
  useEffect(() => {
    if (prefersReducedMotion() || !finePointer()) return undefined;

    // Magnetic primary / white buttons
    const mags = new Map();
    let raf = 0, prev = 0;
    const loop = (t) => {
      const dt = Math.min(0.05, prev ? (t - prev) / 1000 : 0.016); prev = t;
      const h = dt / 2;
      mags.forEach((m, el) => {
        for (let i = 0; i < 2; i++) { step(m.x, h); step(m.y, h); step(m.s, h); }
        el.style.translate = `${m.x.x.toFixed(2)}px ${m.y.x.toFixed(2)}px`;
        el.style.scale = m.s.x.toFixed(4);
        if (!moving(m.x) && !moving(m.y) && !moving(m.s) && m.x.t === 0 && m.s.t === 1) {
          el.style.translate = ''; el.style.scale = ''; mags.delete(el);
        }
      });
      raf = mags.size ? requestAnimationFrame(loop) : 0;
      if (!raf) prev = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const get = (el) => {
      let m = mags.get(el);
      if (!m) { m = { x: Spring(220, 18, 0.5), y: Spring(220, 18, 0.5), s: Spring(220, 18, 0.5, 1) }; mags.set(el, m); }
      return m;
    };
    let magEl = null;
    const resetMag = (el) => { const m = mags.get(el); if (m) { m.x.t = 0; m.y.t = 0; m.s.t = 1; kick(); } };

    // Tilt
    let tiltEl = null;
    const clearTilt = () => { if (tiltEl) { tiltEl.classList.remove('is-tilt'); tiltEl.style.removeProperty('--rx'); tiltEl.style.removeProperty('--ry'); tiltEl = null; } };

    // Parallax sections
    let parEl = null;
    const clearPar = () => {
      if (!parEl) return;
      parEl.style.setProperty('--mx', 0); parEl.style.setProperty('--my', 0);
      const sc = parEl.querySelector('.tilt3d'); if (sc) sc.style.transform = '';
      parEl = null;
    };

    const onMove = (e) => {
      const tgt = e.target instanceof Element ? e.target : null;

      const b = tgt && tgt.closest('.btn-primary, .btn-white');
      if (magEl && magEl !== b) resetMag(magEl);
      magEl = b;
      if (b) {
        const r = b.getBoundingClientRect(), m = get(b);
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
        m.x.t = dx * 8; m.y.t = dy * 8 * 0.6; if (m.s.t !== 0.97) m.s.t = 1.03;
        kick();
      }

      const t = tgt && tgt.closest('[data-tilt]');
      if (tiltEl !== t) clearTilt();
      if (t) {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        t.classList.add('is-tilt'); t.style.setProperty('--ry', `${x * 22}deg`); t.style.setProperty('--rx', `${-y * 22}deg`);
        tiltEl = t;
      }

      const sec = tgt && tgt.closest('[data-parallax]');
      if (parEl !== sec) clearPar();
      if (sec) {
        const r = sec.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5, my = (e.clientY - r.top) / r.height - 0.5;
        sec.style.setProperty('--mx', mx.toFixed(3)); sec.style.setProperty('--my', my.toFixed(3));
        const sc = sec.querySelector('.tilt3d');
        if (sc) sc.style.transform = `perspective(1200px) rotateY(calc(var(--sry) + ${(mx * 8).toFixed(2)}deg)) rotateX(calc(var(--srx) - ${(my * 6).toFixed(2)}deg))`;
        parEl = sec;
      }
    };
    const onDown = (e) => { const b = e.target instanceof Element && e.target.closest('.btn-primary, .btn-white'); if (b) { get(b).s.t = 0.97; kick(); } };
    const onUp = (e) => { const b = e.target instanceof Element && e.target.closest('.btn-primary, .btn-white'); if (b) { get(b).s.t = 1.03; kick(); } };
    const onLeaveDoc = () => { if (magEl) resetMag(magEl); magEl = null; clearTilt(); clearPar(); };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeaveDoc);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeaveDoc);
      cancelAnimationFrame(raf);
    };
  }, []);
}

export default function App() {
  const [hash] = useHashRoute();
  const [tick, setTick] = useState(0);
  const r = resolve(hash);

  // Re-clicking the current link (hash unchanged) should still act like navigation.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target instanceof Element && e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = a.getAttribute('href');
      const current = window.location.hash || '#home';
      if (target === current) { e.preventDefault(); setTick((n) => n + 1); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useLayoutEffect(() => {
    if (r.anchor) {
      const el = document.getElementById(r.anchor);
      if (el) el.scrollIntoView({ behavior: tick ? 'smooth' : 'auto' });
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, tick]);

  useEffect(() => {
    const titles = { home: '', about: 'About', pulse: 'Pulse', contact: 'Contact', ai: 'AI', engineering: 'Engineering', media: 'Media', growth: 'Growth' };
    const t = r.post ? r.post.title : titles[r.view];
    document.title = t ? `${t} · Paralox Media` : 'Paralox Media · AI, Engineering, Media & Growth';
  }, [r.view, r.post]);

  useGlobalEffects();

  let page;
  if (r.view === 'article') page = <Article post={r.post} />;
  else if (PILLAR_KEYS.includes(r.view)) page = <Pillar key={r.view} id={r.view} />;
  else if (r.view === 'about') page = <About />;
  else if (r.view === 'pulse') page = <Pulse />;
  else if (r.view === 'contact') page = <Contact />;
  else page = <Home />;

  return (
    <>
      <GlassDefs />
      <Loader />
      <Nav active={r.nav} lightTop={r.view === 'pulse'} tick={tick} />
      <main id="main" key={r.view === 'article' ? hash : r.view}>
        {page}
        {r.view !== 'contact' && <FinalCta />}
      </main>
      <Footer />
    </>
  );
}
