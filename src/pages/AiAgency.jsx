import { LANDING_PAGES } from '../data/aiAgency';
import { WORK } from '../data/content';
import { Glass } from '../components/Glass';
import { WorkCard, bento } from '../sections/HomeSections';
import '../styles/ratecard.css';
import '../styles/careers.css';
import '../styles/aiagency.css';

/**
 * Landing pages for what people search for: AI agency, AI video, agentic AI in Sri Lanka.
 * One layout, content from src/data/aiAgency.js (also used for their search data).
 */
export default function AiAgency({ page: a }) {
  const featured = bento(a.featured.map((h) => WORK.find((w) => w.href === h)).filter(Boolean));
  const others = LANDING_PAGES.filter((o) => o.path !== a.path);
  return (
    <>
      <header className="rc-hero wk-hero aa-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap">
          <p className="rc-kick fu" style={{ '--d': '.05s' }}>{a.kicker}</p>
          <h1 className="fu" style={{ '--d': '.15s' }}>{a.h1}<span className="dot">.</span></h1>
          <p className="rc-tagline fu" style={{ '--d': '.28s' }}>{a.lede}</p>
          {a.rating?.count > 0 && (
            <a className="aa-rating fu" style={{ '--d': '.38s' }} href={a.rating.url} target="_blank" rel="noopener">
              <span className="aa-stars" aria-hidden="true">★★★★★</span>
              <b>{a.rating.value.toFixed(1)}</b> on Google · {a.rating.count} reviews <span className="arr">↗</span>
            </a>
          )}
          <div className="rc-hero-actions fu" style={{ '--d': '.48s' }}>
            <a className="btn btn-white" href="/contact">Start a project <span className="arr">→</span></a>
            <a className="link" href="/works" style={{ color: '#fff' }}>See our work <span className="arr">→</span></a>
          </div>
        </div>
      </header>

      <section className="aa-proof sec lt" aria-label="Proof">
        <div className="wrap">
          <ul className="aa-proof-grid">
            {a.proof.map((p) => {
              const ext = p.href.startsWith('http');
              return (
                <li key={p.label}><a href={p.href} {...(ext && { target: '_blank', rel: 'noopener' })}><b>{p.stat}</b><span>{p.label}</span><i className="arr" aria-hidden="true">{ext ? '↗' : '→'}</i></a></li>
              );
            })}
          </ul>
        </div>
      </section>

      {a.film && (
        <section className="aa-film sec" aria-labelledby="aa-film-h">
          <div className="wrap aa-film-in">
            <div className="aa-film-copy">
              <p className="rc-kick">Made with AI</p>
              <h2 className="d-m" id="aa-film-h">{a.film.title}<span className="dot">.</span></h2>
              <p>{a.film.caption}</p>
              <a className="link" href={a.film.href} style={{ color: '#fff' }}>How we made it <span className="arr">→</span></a>
            </div>
            <div className="aa-film-frame">
              <video controls playsInline preload="none" poster={a.film.poster} aria-label={a.film.title}>
                <source src={a.film.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      <section className="aa-sides sec lt" aria-labelledby="aa-sides-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="aa-sides-h">{a.sidesTitle}<span className="dot">.</span></h2><p>{a.sidesText}</p></div>
          <div className="aa-sides-grid">
            {a.sides.map((s) => (
              <article key={s.title} className={`aa-side aa-${s.key}`}>
                <p className="rc-kick">{s.kicker}</p>
                <h3>{s.title}</h3>
                <p className="aa-side-text">{s.text}</p>
                <ul className="aa-points">{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <p className="aa-work-label mono">See it in action</p>
                <ul className="aa-work">{s.work.map((w) => <li key={w.href}><a href={w.href}>{w.name} <span className="arr">→</span></a></li>)}</ul>
                <a className="link" href={s.href}>{s.hrefLabel} <span className="arr">→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {a.steps?.length > 0 && (
        <section className="cs-main pj-process" aria-labelledby="aa-steps-h">
          <div className="wrap">
            <div className="sec-head"><h2 className="d-m" id="aa-steps-h">How we work<span className="dot">.</span></h2><p>A clear process, agreed in writing before work begins.</p></div>
            <ol>
              {a.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <b>{s.title}</b>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="work sec lt" aria-labelledby="aa-work-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="d-m" id="aa-work-h">{a.workTitle}<span className="dot">.</span></h2>
            <div><p>{a.workText}</p><a className="link" href="/works">See all work <span className="arr">→</span></a></div>
          </div>
          <div className="bento">{featured.map((w) => <WorkCard key={w.title} w={w} />)}</div>
        </div>
      </section>

      <section className="cr-why sec lt" aria-labelledby="aa-why-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="aa-why-h">{a.whyTitle}<span className="dot">.</span></h2><p>{a.whyText}</p></div>
          <ul className="cr-why-grid">
            {a.why.map((w) => <li key={w.title}><Glass glyph={w.glyph} className="ic" /><b>{w.title}</b><p>{w.text}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="faq sec lt" aria-labelledby="aa-faq-h">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <h2 className="d-l" id="aa-faq-h">{a.faqTitle[0]}<br />{a.faqTitle[1]}<span className="dot">.</span></h2>
            <p>{a.faqIntro}</p>
            <div><a className="btn btn-primary btn-sm" href="/contact">Start a project <span className="arr">→</span></a></div>
          </div>
          <div className="faq-list">
            {a.faq.map((f, i) => (
              <details className="qa" name="aa-faq" open={i === 0} key={f.q}>
                <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                <div className="qa-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="aa-more sec lt" aria-label="More from Paralox Media">
        <div className="wrap">
          <ul className="aa-more-grid">
            {others.map((o) => (
              <li key={o.path}><a href={o.path}><span className="mono">Also from Paralox Media</span><b>{o.h1}</b><i className="arr" aria-hidden="true">→</i></a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
