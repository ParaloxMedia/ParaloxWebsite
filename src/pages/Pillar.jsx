import { Fragment, useEffect, useRef } from 'react';
import { PILLARS } from '../data/content';
import { FloatTile } from '../components/Glass';
import { Scene } from '../components/Scenes';
import Process from '../components/Process';
import { Automations } from '../sections/HomeSections';
import PillarDemo from '../components/PillarDemo';
import { prefersReducedMotion } from '../hooks/useHashRoute';
import duo from '../assets/img/duo.webp';
import present from '../assets/img/present-report.jpg';

function Lines({ lines }) {
  return lines.map((l, i) => (
    <Fragment key={i}>{l}{i < lines.length - 1 ? <br /> : <span className="dot">.</span>}</Fragment>
  ));
}

function RobotScene() {
  return (
    <>
      <svg viewBox="0 0 600 560" className="px" style={{ '--d': '6px' }}>
        <g fill="none" stroke="#B69CFF" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" opacity=".7" className="wire">
          <path d="M110 110 C 220 80, 300 120, 330 70" />
          <path d="M110 110 C 90 220, 60 260, 80 330" />
          <path d="M500 180 C 470 260, 520 300, 520 380" />
          <path d="M330 70 C 420 60, 480 110, 500 180" />
        </g>
      </svg>
      <div className="floor" />
      <img className="robot-img px" style={{ '--d': '-5px', height: '88%' }} src={duo} alt="" />
    </>
  );
}

/** Slide each service row in as it scrolls into view. */
function useRowReveal(ref) {
  useEffect(() => {
    const rows = [...ref.current.querySelectorAll('.svc')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { rows.forEach((r) => r.classList.add('in')); return undefined; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, [ref]);
}

export default function Pillar({ id }) {
  const p = PILLARS[id];
  const svcRef = useRef(null);
  useRowReveal(svcRef);
  return (
    <>
      <section className="p-hero" data-parallax>
        <div className="gridlines" />
        <div className="wrap">
          <div className="p-copy">
            <h1 className="d-xl"><Lines lines={p.title} /></h1>
            <p className="lede">{p.lede}</p>
            <div className="hero-actions"><a className="btn btn-primary" href="#contact">{p.cta} <span className="arr">→</span></a></div>
          </div>
          <div className="scene" aria-hidden="true">
            {p.scene === 'robots' ? <RobotScene /> : (
              <>
                <div className="floor" style={{ width: p.floorWidth }} />
                <Scene name={p.scene} className="tilt3d" style={{ '--sry': `${p.tilt.y}deg`, '--srx': `${p.tilt.x}deg` }} />
              </>
            )}
            {p.floats.map((f) => <FloatTile key={f.glyph} {...f} />)}
          </div>
        </div>
      </section>

      <section className="services sec lt" ref={svcRef}>
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m"><Lines lines={p.servicesTitle} /></h2><p>{p.servicesLede}</p></div>
          {p.services.map((s, i) => (
            <div className="svc" key={s.name} style={{ '--i': i }}>
              <span className="mono num">{p.code} / {String(i + 1).padStart(2, '0')}</span>
              <h3>{s.name}</h3>
              <div><p>{s.text}</p><div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div></div>
            </div>
          ))}
        </div>
      </section>

      <PillarDemo id={id} />

      {id === 'ai' && <Automations />}

      {p.band && (
        <section className="band sec lt">
          <div className="wrap">
            <div className="band-copy">
              <h2 className="d-m">A report you can read in five minutes<span className="dot">.</span></h2>
              <p>Every report opens with three lines: what happened against the target, why we believe it happened, and what we will change next month. Charts follow, but only the ones that support those lines.</p>
            </div>
            <img src={present} alt="The Paralox companions presenting a growth dashboard" width="1200" height="834" loading="lazy" decoding="async" />
          </div>
        </section>
      )}

      <Process />

      <section className="next lt">
        <div className="wrap">
          <a href={p.next.href}><span className="mono muted">{p.next.label}</span><span className="d-m">{p.next.title} <span className="arr">→</span></span></a>
        </div>
      </section>
    </>
  );
}
