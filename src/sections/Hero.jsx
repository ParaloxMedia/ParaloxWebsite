import { useEffect, useRef, useState } from 'react';
import duoPlain from '../assets/img/duo_plain.webp';
import duoXray from '../assets/img/duo_xray.webp';
import { Curves } from '../components/Glass';
import Particles from '../components/Particles';
import { prefersReducedMotion, finePointer } from '../hooks/useHashRoute';

const Spring = (k, c, m) => ({ k, c, m, x: 0, v: 0, t: 0 });
const step = (s, dt) => { const a = (s.k * (s.t - s.x) - s.c * s.v) / s.m; s.v += a * dt; s.x += s.v * dt; };

function Counter({ target, index, ready }) {
  const [v, setV] = useState(target);
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    let raf; setV(0);
    const timer = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => { const p = Math.min(1, (now - t0) / 1500); setV(Math.round(target * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, (0.9 + index * 0.1 + 0.25) * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [ready, target, index]);
  return <span>{v}</span>;
}

/** Layered hero: parallax planes, giant wordmark, two-exposure robot with cursor spotlight. */
export default function Hero() {
  const heroRef = useRef(null), overRef = useRef(null), ringRef = useRef(null);
  const [subReady, setSubReady] = useState(prefersReducedMotion());
  const [countsReady, setCountsReady] = useState(() => !!window.__plxReady);

  // Start the counters when the intro loader opens
  useEffect(() => {
    if (countsReady) return;
    const on = () => setCountsReady(true);
    window.addEventListener('plx:ready', on, { once: true });
    return () => window.removeEventListener('plx:ready', on);
  }, [countsReady]);

  // Gate the subject entrance until both exposures have decoded
  useEffect(() => {
    const imgs = heroRef.current.querySelectorAll('.xstack img');
    Promise.all([...imgs].map((i) => (i.decode ? i.decode().catch(() => {}) : null))).then(() => setSubReady(true));
    const t = setTimeout(() => setSubReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // Parallax + spotlight spring loop
  useEffect(() => {
    const hero = heroRef.current, over = overRef.current, ring = ringRef.current;
    const reduce = prefersReducedMotion(), fine = finePointer();
    const px = Spring(55, 20, 0.6), py = Spring(55, 20, 0.6);
    const sx = Spring(260, 30, 0.4), sy = Spring(260, 30, 0.4), so = Spring(170, 26, 0.5);
    const layers = [...hero.querySelectorAll('[data-dx]')].map((el) => ({ el, dx: +el.dataset.dx, dy: +el.dataset.dy }));
    let lastEvt = null, pending = false, raf, prev = 0, lastMask = '';

    const onMove = (e) => { px.t = (e.clientX / window.innerWidth) * 2 - 1; py.t = (e.clientY / window.innerHeight) * 2 - 1; lastEvt = e; pending = true; };
    const onLeave = () => { px.t = 0; py.t = 0; so.t = 0; };
    const onBlur = () => { so.t = 0; };
    if (fine && !reduce) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      window.addEventListener('blur', onBlur);
    }
    const spot = () => {
      if (!pending || !lastEvt) return; pending = false;
      const r = over.getBoundingClientRect();
      const inside = lastEvt.clientX >= r.left && lastEvt.clientX <= r.right && lastEvt.clientY >= r.top && lastEvt.clientY <= r.bottom;
      if (inside) {
        const lx = (lastEvt.clientX - r.left) * over.offsetWidth / r.width, ly = (lastEvt.clientY - r.top) * over.offsetHeight / r.height;
        if (so.t === 0) { sx.x = sx.t = lx; sy.x = sy.t = ly; sx.v = sy.v = 0; }
        sx.t = lx; sy.t = ly; so.t = 1;
      } else so.t = 0;
    };
    const paint = () => {
      for (const l of layers) l.el.style.translate = `${(-px.x * l.dx).toFixed(2)}px ${(-py.x * l.dy).toFixed(2)}px`;
      const R = Math.max(so.x * 160, 0.01);
      const m = `radial-gradient(circle ${R.toFixed(1)}px at ${sx.x.toFixed(1)}px ${sy.x.toFixed(1)}px, transparent 0%, transparent 40%, #000 100%)`;
      if (m !== lastMask) { over.style.webkitMaskImage = m; over.style.maskImage = m; lastMask = m; }
      const o = Math.max(0, Math.min(1, so.x));
      ring.style.opacity = o.toFixed(3);
      ring.style.transform = `translate(${sx.x.toFixed(1)}px,${sy.x.toFixed(1)}px) scale(${(0.6 + 0.4 * o).toFixed(3)})`;
    };
    const loop = (t) => {
      const dt = Math.min(0.05, prev ? (t - prev) / 1000 : 0.016); prev = t;
      spot();
      for (let i = 0; i < 2; i++) { step(px, dt / 2); step(py, dt / 2); step(sx, dt / 2); step(sy, dt / 2); step(so, dt / 2); }
      paint(); raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop); else paint();

    // Keep the subject clear of the lower cards on narrow screens
    const lower = hero.querySelector('.xrow.lower'), shell = hero.querySelector('.xshell');
    const lowH = () => { const pb = parseFloat(getComputedStyle(shell).paddingBottom) || 0; hero.style.setProperty('--lowH', `${lower.offsetHeight + pb + 12}px`); };
    lowH(); window.addEventListener('resize', lowH);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onBlur); window.removeEventListener('resize', lowH);
    };
  }, []);

  const icon = (d) => <svg viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

  return (
    <section className={`xhero${subReady ? ' sub-ready' : ''}`} id="xhero" ref={heroRef} aria-label="Paralox Media">
      {/* z0 backdrop */}
      <div className="xb" aria-hidden="true">
        <div className="xb-floor" />
        {/* same drifting orbs, grid and self-drawing curves as the About hero */}
        <div className="am-orb o1" data-dx="26" data-dy="18" />
        <div className="am-orb o2" data-dx="-30" data-dy="-16" />
        <div className="am-orb o3" data-dx="14" data-dy="0" />
        <div className="xb-plate" data-dx="14" data-dy="10"><div className="gridlines" /><Curves className="am-curves" draw /></div>
        <div className="xb-rim" />
        <Particles />
        <div className="xb-vig" />
        <div className="xb-grain" />
      </div>

      {/* z1 wordmark */}
      <div className="xword" data-dx="12" data-dy="8" aria-hidden="true"><span className="xword-t">Paralox</span></div>

      {/* z2 subject: two-exposure reveal */}
      <div className="xsub" aria-hidden="true">
        <div className="xsub-in" data-dx="-22" data-dy="-12">
          <div className="xsub-e">
            <div className="xstack">
              <img className="x-under" src={duoXray} alt="" />
              <div className="x-over" ref={overRef}>
                <img src={duoPlain} alt="" />
                <span className="eye ml" /><span className="eye mr" />
                <span className="eye jl" style={{ animationDelay: '-5s,-2s' }} /><span className="eye jr" style={{ animationDelay: '-5s,-2s' }} />
              </div>
              <div className="x-ring" ref={ringRef}><span>SYSTEM VIEW</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* z3 interface shell */}
      <div className="xshell">
        <div className="xrow upper">
          <div className="xcopy">
            <h1 className="xh1">
              <span className="ln"><span style={{ '--d': '.32s' }}>Building the future of</span></span>
              <span className="ln"><span style={{ '--d': '.41s' }}>AI-powered business</span></span>
              <span className="ln"><span style={{ '--d': '.50s' }}>solutions<span className="dot">.</span></span></span>
            </h1>
            <p className="xbody fu" style={{ '--d': '.66s' }}><strong>AI, engineering, media and growth</strong> working together to move ambitious businesses forward.</p>
            <div className="xcta fu" style={{ '--d': '.78s' }}>
              <a className="btn btn-primary btn-sm" href="/contact">Start a project <span className="arr">→</span></a>
              <a className="link" href="/services">Our pillars <span className="arr">↓</span></a>
            </div>
          </div>
          <div className="xgap" />
          <div className="xcopy xstudio">
            <h2 className="xbig" style={{ marginTop: 14 }}>
              <span className="ln"><span style={{ '--d': '.42s' }}>Creative</span></span>
              <span className="ln"><span style={{ '--d': '.52s' }}>Technology<span className="dot">.</span></span></span>
            </h2>
            <p className="xbody fu" style={{ '--d': '.78s' }}><strong>Paralox Media</strong> is a creative technology company building intelligent systems, experiences and media. <strong>We build for businesses</strong> that want technology to feel <strong>intentional</strong>, not assembled.</p>
          </div>
        </div>

        <div className="xspacer" />

        <div className="xrow lower">
          <div className="xlow-left">
            <div className="xstats">
              <div className="xcard" style={{ '--d': '.9s' }}>
                <span className="lbl"><i />Markets served</span>
                <div className="val"><Counter target={6} index={0} ready={countsReady} /></div>
              </div>
              <div className="xcard solid" style={{ '--d': '1s' }}>
                <span className="lbl">Brands served</span>
                <div className="val"><Counter target={50} index={1} ready={countsReady} />+</div>
              </div>
            </div>
          </div>
          <div className="xgap" />
          <a className="xpartner" href="/services" style={{ '--d': '1.08s' }}>
            <div className="xp-head">
              <h3>Your partner in<br />business growth</h3>
              <span className="xp-badge"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 9 9 3M4 3h5v5" /></svg></span>
            </div>
            <p>One team for AI, engineering, media and growth, so strategy, build and delivery stay connected from brief to results.</p>
            <div className="xp-foot">
              <div className="xp-av">
                <span title="AI"><svg viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><rect x="12" y="12" width="24" height="24" rx="6" /><path d="M24 17.5c.8 4 2.5 5.7 6.5 6.5-4 .8-5.7 2.5-6.5 6.5-.8-4-2.5-5.7-6.5-6.5 4-.8 5.7-2.5 6.5-6.5z" /></svg></span>
                <span title="Engineering">{icon('M16 14 6 24l10 10M32 14l10 10-10 10')}</span>
                <span title="Media">{icon('M18 14v20l16-10z')}</span>
                <span title="Growth">{icon('M6 34c13-3 22-10 32-22M30 11h9v9')}</span>
              </div>
              <small><b>4 pillars</b>One connected team</small>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
