import { AI_AGENCY } from '../data/aiAgency';
import { WORK } from '../data/content';
import { Glass } from '../components/Glass';
import { WorkCard, bento } from '../sections/HomeSections';
import '../styles/ratecard.css';
import '../styles/careers.css';
import '../styles/aiagency.css';

/** /ai-agency-sri-lanka: Paralox Media as an AI creative and technology agency in Sri Lanka. */
export default function AiAgency() {
  const a = AI_AGENCY;
  const featured = bento(['/work/renault-ai-tvc', '/work/nissan-gravite', '/work/webxpay-govpay']
    .map((h) => WORK.find((w) => w.href === h)).filter(Boolean));
  return (
    <>
      <header className="rc-hero wk-hero aa-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap">
          <p className="rc-kick fu" style={{ '--d': '.05s' }}>Paralox Media · Colombo, Sri Lanka</p>
          <h1 className="fu" style={{ '--d': '.15s' }}>AI creative &amp; technology agency in Sri Lanka<span className="dot">.</span></h1>
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
            {a.proof.map((p) => (
              <li key={p.stat}><a href={p.href}><b>{p.stat}</b><span>{p.label}</span><i className="arr" aria-hidden="true">→</i></a></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="aa-sides sec lt" aria-labelledby="aa-sides-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="aa-sides-h">Two halves, one team<span className="dot">.</span></h2><p>Most agencies in Sri Lanka do creative or technology. We do both, with AI at the centre of each.</p></div>
          <div className="aa-sides-grid">
            {a.sides.map((s) => (
              <article key={s.key} className={`aa-side aa-${s.key}`}>
                <p className="rc-kick">{s.kicker}</p>
                <h3>{s.title}</h3>
                <p className="aa-side-text">{s.text}</p>
                <ul className="aa-points">{s.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <p className="aa-work-label mono">Recent work</p>
                <ul className="aa-work">{s.work.map((w) => <li key={w.href}><a href={w.href}>{w.name} <span className="arr">→</span></a></li>)}</ul>
                <a className="link" href={s.href}>All {s.key} services <span className="arr">→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work sec lt" aria-labelledby="aa-work-h">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="d-m" id="aa-work-h">AI work for real brands<span className="dot">.</span></h2>
            <div><p>Films, campaigns and platforms made with AI for brands in Sri Lanka.</p><a className="link" href="/works">See all work <span className="arr">→</span></a></div>
          </div>
          <div className="bento">{featured.map((w) => <WorkCard key={w.title} w={w} />)}</div>
        </div>
      </section>

      <section className="cr-why sec lt" aria-labelledby="aa-why-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="aa-why-h">Why brands choose Paralox<span className="dot">.</span></h2><p>What sets an AI agency apart is the work it has shipped. Here is ours.</p></div>
          <ul className="cr-why-grid">
            {a.why.map((w) => <li key={w.title}><Glass glyph={w.glyph} className="ic" /><b>{w.title}</b><p>{w.text}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="faq sec lt" aria-labelledby="aa-faq-h">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <h2 className="d-l" id="aa-faq-h">AI agency,<br />answered<span className="dot">.</span></h2>
            <p>Planning an AI film, agent or campaign? Tell us what you need.</p>
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
    </>
  );
}
