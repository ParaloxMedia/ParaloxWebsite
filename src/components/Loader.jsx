import { useEffect, useRef, useState } from 'react';
import logoWhite from '../assets/img/logo-white.png';
import robotHand from '../assets/loader/robot-hand.png';
import humanHand from '../assets/loader/human-hand.png';

const WORDS = ['AI', 'Engineering', 'Media', 'Growth'];

function release() {
  document.documentElement.classList.remove('is-loading');
  window.__plxReady = true;
  window.dispatchEvent(new Event('plx:ready'));
}

/** "Threshold" intro: robot and human hands reach toward each other as it loads and touch at 100%,
 *  cycling pillars, logo reveal, doors open onto the site. */
export default function Loader() {
  const [active, setActive] = useState(() => document.documentElement.classList.contains('is-loading'));
  const [phase, setPhase] = useState(''); // '', 'done', 'done seam', 'done seam open'
  const [word, setWord] = useState(0);
  const refs = { num: useRef(null), bar: useRef(null), hands: useRef(null), cv: useRef(null) };
  const endedRef = useRef(false);

  const openDoors = () => {
    if (endedRef.current) return; endedRef.current = true;
    setPhase('done seam');
    setTimeout(() => { setPhase('done seam open'); release(); }, 420);
    setTimeout(() => setActive(false), 1750);
  };

  useEffect(() => {
    if (!active) { window.__plxReady = true; return; }
    const t0 = performance.now();
    let loaded = document.readyState === 'complete', p = 0, finishing = false, raf, doneTimer;
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad);
    const lt = setTimeout(() => { loaded = true; }, 3500);
    const failsafe = setTimeout(openDoors, 7000);

    const cv = refs.cv.current, cx = cv.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const size = () => { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); window.addEventListener('resize', size);
    const spawn = () => ({ a: Math.random() * 6.283, r: Math.max(W, H) * (0.35 + Math.random() * 0.4), s: 0.6 + Math.random() * 1.6, z: 0.4 + Math.random() * 1.4 });
    const P = Array.from({ length: 80 }, () => { const q = spawn(); q.r *= Math.random(); return q; });

    const frame = (now) => {
      if (endedRef.current) return;
      const t = (now - t0) / 1000;
      const u = Math.min(1, t / 2.7), e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      const target = finishing ? 1 : e * 0.94;
      if (!finishing && loaded && t > 2.75) finishing = true;
      p += (target - p) * (finishing ? 0.14 : 0.2);
      if (finishing && p > 0.995) p = 1;
      refs.num.current.textContent = Math.round(p * 100);
      refs.bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
      // Hands close the gap as loading progresses; the glow between the fingertips builds near the end.
      refs.hands.current.style.setProperty('--gap', Math.pow(1 - p, 1.4).toFixed(4));
      refs.hands.current.style.setProperty('--near', Math.pow(p, 4).toFixed(3));
      setWord(Math.min(3, Math.max(0, Math.floor(p * 4 - 1e-6))));
      const cxm = W / 2, cym = H / 2 - Math.min(H * 0.06, 40);
      cx.clearRect(0, 0, W, H);
      for (let i = 0; i < P.length; i++) {
        const q = P[i]; q.r -= q.s * (1.2 + p * 2.4); q.a += 0.0025 * q.z;
        if (q.r < 30) { P[i] = spawn(); continue; }
        const x = cxm + Math.cos(q.a) * q.r, y = cym + Math.sin(q.a) * q.r * 0.72;
        const al = Math.min(1, q.r / 260) * Math.min(1, (Math.max(W, H) * 0.75 - q.r) / 120) * 0.55;
        if (al <= 0) continue;
        cx.beginPath(); cx.arc(x, y, 0.6 * q.z, 0, 6.283); cx.fillStyle = `rgba(201,181,255,${al.toFixed(3)})`; cx.fill();
      }
      if (p === 1) { setPhase('done'); doneTimer = setTimeout(openDoors, 1150); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const onKey = (e) => { if (e.key === 'Escape') openDoors(); };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(lt); clearTimeout(failsafe); clearTimeout(doneTimer);
      window.removeEventListener('load', onLoad); window.removeEventListener('resize', size); document.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;
  return (
    <div id="loader" className={phase} role="status" aria-live="polite" aria-label="Loading Paralox Media">
      <div className="ld-door l" /><div className="ld-door r" />
      <div className="ld-seam" />
      <canvas ref={refs.cv} id="ldCanvas" aria-hidden="true" />
      <div className="ld-stage">
        <div className="ld-hands" ref={refs.hands} aria-hidden="true">
          <img className="ld-hand robot" src={robotHand} alt="" onLoad={(e) => e.currentTarget.classList.add('in')} />
          <img className="ld-hand human" src={humanHand} alt="" onLoad={(e) => e.currentTarget.classList.add('in')} />
          <span className="ld-touch" />
          <span className="ld-flare" />
        </div>
        <div className="ld-words" aria-hidden="true">
          <ul style={{ transform: `translateY(${-word}em)` }}>{WORDS.map((w) => <li key={w}>{w}<i>.</i></li>)}</ul>
        </div>
        <span className="ld-tag">Creative technology</span>
      </div>
      <div className="ld-logo" aria-hidden="true"><img src={logoWhite} alt="" /></div>
      <div className="ld-foot">
        <div className="ld-meta">Paralox Media<br /><b>Building the future of AI-powered business</b></div>
        <div className="ld-count"><span ref={refs.num}>0</span><small>%</small></div>
      </div>
      <button type="button" className="ld-skip" onClick={() => { refs.num.current.textContent = '100'; openDoors(); }}>Skip intro</button>
      <div className="ld-bar"><i ref={refs.bar} /></div>
    </div>
  );
}
