import { useRef, useState } from 'react';
import { VACANCIES } from '../data/careers';
import { ApplySection, RoleCard } from './Careers';
import { prefersReducedMotion } from '../hooks/useHashRoute';
import '../styles/ratecard.css';
import '../styles/careers.css';

/** /careers/<id>: one open role, its details and the application form with the role chosen. */
export default function Job({ job: v }) {
  const [position, setPosition] = useState(v.title);
  const formRef = useRef(null);
  const applyRef = useRef(null);
  const others = VACANCIES.filter((o) => o.id !== v.id);

  const apply = () => {
    setPosition(v.title);
    applyRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => formRef.current?.querySelector('#cr-fullName')?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 700);
  };

  return (
    <>
      <header className="rc-hero wk-hero cr-hero cr-job-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap cr-job-hero-in">
          <div>
            <a className="cr-back-link mono fu" href="/careers#roles" style={{ '--d': '.02s' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5m6 6l-6-6 6-6" /></svg>
              All open roles
            </a>
            <p className="rc-kick fu" style={{ '--d': '.08s' }}>Careers · {v.team}{v.urgent ? ' · Hiring now' : ''}</p>
            <h1 className="fu" style={{ '--d': '.15s' }}>{v.title}<span className="dot">.</span></h1>
            <p className="rc-tagline fu" style={{ '--d': '.28s' }}>{v.summary}</p>
            <ul className="cr-job-chips fu" style={{ '--d': '.38s' }}>
              <li>{v.type}</li>
              <li>{v.location}</li>
              <li>Paralox Media, Colombo</li>
            </ul>
            <div className="rc-hero-actions fu" style={{ '--d': '.48s' }}>
              <button type="button" className="btn btn-white" onClick={apply}>Apply for this role <span className="arr">↓</span></button>
            </div>
          </div>
          {v.poster && (
            <div className="cr-job-poster fu" style={{ '--d': '.3s' }}>
              <div className="px" style={{ '--d': '18px' }}>
                <img src={v.poster} alt={`We are hiring: ${v.title} at Paralox Media`} width="1122" height="1402" decoding="async" />
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="cr-job sec lt" aria-label="About the role">
        <div className="wrap cr-job-in">
          {v.duties && (
            <div className="cr-job-block">
              <p className="rc-kick">What you’ll do</p>
              <ul>{v.duties.map((r, i) => <li key={r} style={{ '--i': i }}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{r}</li>)}</ul>
            </div>
          )}
          <div className="cr-job-block">
            <p className="rc-kick">What you bring</p>
            <ul>{v.requirements.map((r, i) => <li key={r} style={{ '--i': i }}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{r}</li>)}</ul>
          </div>
          <aside className="cr-job-facts">
            <dl>
              <div><dt className="mono">Team</dt><dd>{v.team}</dd></div>
              <div><dt className="mono">Type</dt><dd>{v.type}</dd></div>
              <div><dt className="mono">Location</dt><dd>{v.location}</dd></div>
              <div><dt className="mono">Shortlisting</dt><dd>Within 3–5 working days</dd></div>
            </dl>
            <button type="button" className="btn btn-primary" onClick={apply}>Apply now <span className="arr">→</span></button>
          </aside>
        </div>
      </section>

      <ApplySection sectionRef={applyRef} formRef={formRef} position={position} setPosition={setPosition} title={`Apply: ${v.title}`} />

      {others.length > 0 && (
        <section className="cr-roles sec lt" aria-labelledby="cr-more-h">
          <div className="wrap">
            <div className="sec-head"><h2 className="d-m" id="cr-more-h">More open roles<span className="dot">.</span></h2><p>Not quite the one? See what else we are hiring for.</p></div>
            <div className="cr-list">{others.map((o, i) => <RoleCard key={o.id} v={o} i={i} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
