import { useRef } from 'react';
import { Glass } from '../components/Glass';
import { Dot, Label, useCaseStudyMotion } from './Article';

/** Project case study at /work/<id>. Same visual language as Pulse articles, plus video. */
export default function Project({ project: p }) {
  const root = useRef(null);
  useCaseStudyMotion(root);

  return (
    <article className="pp pj" ref={root}>
      {/* 1. Full-screen hero */}
      <header className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: `url(${p.hero})` }} />
        <div className="cs-hero-shade" />
        <a className="cs-back mono" href="/#work">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Selected work
        </a>
        <div className="cs-hero-copy wrap">
          <div className="cs-pills fu" style={{ '--d': '.2s' }}>
            <span>{p.pillar}</span>
            <span>{p.client}</span>
            <span>{p.year}</span>
          </div>
          <p className="cs-kicker mono fu" style={{ '--d': '.3s' }}>{p.kicker}</p>
          <h1 className="cs-title fu" style={{ '--d': '.4s' }}>{p.headline}</h1>
          <p className="cs-sum fu" style={{ '--d': '.55s' }}><Dot /><span>{p.summary}</span></p>
        </div>
        <span className="cs-cue" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7" /></svg>
        </span>
      </header>

      {/* 2. Facts + story */}
      <section className="cs-main">
        <div className="wrap cs-grid">
          <aside className="cs-side">
            <dl>
              {p.facts.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}
            </dl>
            <span className="cs-rule" aria-hidden="true" />
          </aside>
          <div className="cs-story">
            <Label>The project</Label>
            {p.story.map((t, i) => <p key={i} className={`cs-reveal${i === 0 ? ' lead' : ''}`}>{t}</p>)}
          </div>
        </div>
      </section>

      {/* 3. The work: films. preload="none" so nothing downloads until someone presses play. */}
      <section className="cs-dark pj-films">
        <div className="wrap">
          <div className="cs-reveal"><Label>The films</Label></div>
          <div className="pj-video-grid">
            {p.videos.map((v, i) => (
              <figure key={v.src} className={`pj-video cs-reveal${i === 0 ? ' feature' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="pj-frame">
                  <video controls playsInline preload="none" poster={v.poster} aria-label={`${p.title}: ${v.title}`}>
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <figcaption><b>{v.title}</b><span>{v.text}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What we delivered */}
      <section className="cs-dark cs-high">
        <div className="wrap">
          <div className="cs-reveal"><Label>What we delivered</Label></div>
          <ul>
            {p.deliverables.map((d, i) => (
              <li key={d.title} className="cs-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <Glass glyph={d.glyph} className="ic" />
                <b>{d.title}</b>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Summary + call to action */}
      <section className="cs-dark cs-result">
        <div className="wrap cs-result-in">
          <div className="cs-result-copy cs-reveal">
            <Label>In short</Label>
            <p>{p.summary}</p>
          </div>
          <span className="cs-line" aria-hidden="true" />
          <a className="btn btn-primary cs-reveal" href={p.cta.href}>{p.cta.label} <span className="arr">→</span></a>
        </div>
      </section>
    </article>
  );
}
