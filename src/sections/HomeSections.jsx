import { Fragment, useEffect, useRef, useState } from 'react';
import { CAPABILITIES, CLIENTS, CONTACT, FAQ, FLOWS, POSTS, REVIEWS, TICKER, WHY, WORK } from '../data/content';
import { Curves, Glass, Star } from '../components/Glass';
import { Scene } from '../components/Scenes';
import { GoogleLogo } from '../components/Icons';
import PostCard from '../components/PostCard';

export function Ticker() {
  const row = (hidden) => (
    <div className="tk-row" aria-hidden={hidden || undefined}>
      {TICKER.map((w) => <Fragment key={w.t}><span className={w.o ? 'o' : undefined}>{w.t}</span><Star /></Fragment>)}
    </div>
  );
  return (
    <section className="ticker lt" aria-label="What we do">
      <div className="tk-track">{row(false)}{row(true)}</div>
    </section>
  );
}

export function Clients() {
  const set = (hidden) => (
    <ul className="cl-set" aria-hidden={hidden || undefined}>
      {CLIENTS.map((c) => (
        <li key={c.name} className={`cl-logo${c.fit === 'contain' ? ' fit' : ''}${c.dark ? ' dark' : ''}`}>
          <img src={c.logo} alt={hidden ? '' : c.name} title={c.name} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="clients lt" aria-labelledby="clTitle">
      <div className="wrap">
        <div>
          <h2 className="cl-title" id="clTitle">Trusted by leading brands<span className="dot">.</span></h2>
          <p>Brands we have produced work for, directly and with agency partners.</p>
        </div>
        <div className="cl-marquee"><div className="cl-track">{set(false)}{set(true)}</div></div>
      </div>
    </section>
  );
}

/** Tabbed capabilities with auto-advance (pauses on hover / off-screen). */
export function Capabilities() {
  const [active, setActive] = useState('ai');
  const [cycle, setCycle] = useState(0);
  const [hover, setHover] = useState(false);
  const [offscreen, setOffscreen] = useState(true);
  const secRef = useRef(null);
  useEffect(() => {
    const el = secRef.current;
    if (!('IntersectionObserver' in window)) { setOffscreen(false); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => setOffscreen(!e.isIntersecting)), { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const select = (k) => { setActive(k); setCycle((c) => c + 1); };
  const next = (k) => { const i = CAPABILITIES.findIndex((c) => c.key === k); select(CAPABILITIES[(i + 1) % CAPABILITIES.length].key); };
  const current = CAPABILITIES.find((c) => c.key === active);
  return (
    <section ref={secRef} className={`caps sec lt${hover || offscreen ? ' paused' : ''}`} id="services-home"
      onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-l">Ideate, build<br />and scale<span className="dot">.</span></h2>
          <p>Every Paralox service sits under one of four pillars. One team runs all four, so strategy, build and delivery stay connected.</p>
        </div>
        <div className="caps-grid">
          <div className="caps-list">
            {CAPABILITIES.map((c) => (
              <div key={c.key} className={`cap${active === c.key ? ' is-on' : ''}`}>
                <button className="cap-head" type="button" aria-expanded={active === c.key} aria-controls={`capb-${c.key}`} onClick={() => select(c.key)}>
                  <span className="cap-top"><span className="cap-bar"><i key={active === c.key ? cycle : 'idle'} onAnimationEnd={() => next(c.key)} /></span></span>
                  <span className="cap-title">{c.title}<span className="dot">.</span></span>
                </button>
                <div className="cap-body" id={`capb-${c.key}`}>
                  <div>
                    <p>{c.desc}</p>
                    <div className="chips-s">{c.chips.map((x) => <span key={x}>{x}</span>)}</div>
                    <a className="link" href={c.href}>Explore {c.title} <span className="arr">→</span></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="caps-stage" aria-hidden="true">
            <div className="gridlines" />
            <div className="cs-meta mono"><span><b>{current.title}</b></span><span>System status / <b>Active</b></span></div>
            {CAPABILITIES.map((c) => <Scene key={c.key} name={c.key} className={`cs${active === c.key ? ' is-on' : ''}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r }) {
  return (
    <article className="rv-card">
      <div className="rv-stars" aria-label={`${r.rating} out of 5 stars`}>
        {Array.from({ length: Math.round(r.rating) }, (_, i) => <svg key={i} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9z" /></svg>)}
      </div>
      <p>{r.text}</p>
      <div className="rv-who">
        <span className="rv-av">{r.photo ? <img src={r.photo} alt="" referrerPolicy="no-referrer" loading="lazy" /> : r.name.charAt(0)}</span>
        <span><b>{r.url ? <a href={r.url} target="_blank" rel="noopener" style={{ color: 'inherit' }}>{r.name}</a> : r.name}</b><small>Google review{r.date ? ` · ${r.date}` : ''}</small></span>
      </div>
    </article>
  );
}

/** Google reviews in three auto-scrolling columns (empty state links to Google). */
export function Reviews() {
  const groups = [[], []];
  REVIEWS.forEach((r, i) => groups[i % 2].push(r));
  // Seconds each card spends scrolling past, so there is time to read it.
  const perCard = [10, 11];
  return (
    <section className="reviews sec" id="reviews" aria-labelledby="rvTitle">
      <Curves glowOpacity={0.4} />
      <div className="wrap rv-wrap">
        <div className="rv-head">
          <span className="rv-pill"><GoogleLogo />Google reviews</span>
          <h2 className="d-l" id="rvTitle">What our clients say<span className="dot" style={{ color: 'var(--lilac)' }}>.</span></h2>
          <p>Reviews from the businesses we build with, published on our Google Business profile.</p>
          <div className="rv-actions"><a className="btn btn-white btn-sm" href={CONTACT.reviewsUrl} target="_blank" rel="noopener">Read all reviews on Google <span className="arr">↗</span></a></div>
        </div>
        {REVIEWS.length ? (
          <div className="rv-cols">
            {[...groups, REVIEWS].map((g, i) => {
              const list = g.length ? g : REVIEWS;
              const all = i === groups.length;
              return (
                <div className={`rv-col${all ? ' rv-all' : ''}`} key={i}>
                  <div className="rv-track" style={{ '--dur': `${list.length * (perCard[i] ?? 10)}s` }}>
                    {list.map((r, j) => <ReviewCard key={`a${j}`} r={r} />)}
                    <div aria-hidden="true" style={{ display: 'contents' }}>{list.map((r, j) => <ReviewCard key={`b${j}`} r={r} />)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rv-empty">
            <span className="rv-g"><GoogleLogo /></span>
            <b>Our Google reviews</b>
            <p>See what clients say about working with Paralox, straight from our Google Business profile.</p>
            <a className="link" href={CONTACT.reviewsUrl} target="_blank" rel="noopener" style={{ color: '#fff' }}>Open reviews on Google <span className="arr">↗</span></a>
          </div>
        )}
      </div>
    </section>
  );
}

export function Automations() {
  return (
    <section className="auto sec lt">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-l">Automations<br />that do real work<span className="dot">.</span></h2>
          <p>Three workflows we build often. Each one starts with a task your team repeats every day, and keeps a person in the loop where judgement matters.</p>
        </div>
        <div className="flows">
          {FLOWS.map((f) => (
            <article className="flow" key={f.title}>
              <header><span className="mono">{f.tag}</span><h3>{f.title}</h3></header>
              <ol className="nodes">
                {f.nodes.map((n) => (
                  <li key={n.b}><Glass glyph={n.g} /><span className="txt"><span className="mono">{n.k}</span><b>{n.b}</b><small>{n.s}</small></span></li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkCard({ w }) {
  const Tag = w.href ? 'a' : 'article';
  return (
    <Tag className={`wk${w.size ? ` wk-${w.size}` : ''}${w.href ? ' wk-link' : ''}`} {...(w.href && { href: w.href })}>
      <div className={`wk-vis${w.image ? ' has-img' : ''}`}>
        {w.image ? <img src={w.image} alt="" loading="lazy" decoding="async" /> : <><div className="gridlines" /><Glass glyph={w.glyph} tilt /></>}
        <span className="code mono">{w.code}</span><span className="yr mono">{w.year || '2026'}</span>
      </div>
      <div className="wk-body">
        <span className="mono">{w.meta}</span><h3>{w.title}</h3><p>{w.text}</p>
        {w.chips && <div className="chips-s">{w.chips.map((c) => <span key={c}>{c}</span>)}</div>}
        {w.href && <span className="link wk-more">View project <span className="arr">→</span></span>}
      </div>
    </Tag>
  );
}

export function Work() {
  return (
    <section className="work sec lt" id="work">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-l">Selected<br />work<span className="dot">.</span></h2>
          <div>
            <p>Recent projects across media, engineering and growth. Open any project for the full case study.</p>
            <a className="link" href="/works">See all work <span className="arr">→</span></a>
          </div>
        </div>
        <div className="bento">
          {WORK.filter((w) => w.home !== false).map((w) => (
            // Projects with a case study (href) are links and show a still from the work.
            <WorkCard key={w.title} w={w} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="light sec lt">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-l">One system,<br />built with you<span className="dot">.</span></h2>
          <p>We are not a social-media agency, a software house or a production company. We connect all of these disciplines into one working system.</p>
        </div>
        <div className="why-grid">
          {WHY.map((w) => <div className="why" key={w.t}><span className="mono">{w.k}</span><h3>{w.t}<span className="dot">.</span></h3><p>{w.p}</p></div>)}
        </div>
      </div>
    </section>
  );
}

export function PulsePreview() {
  return (
    <section className="pulse-sec sec lt">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-l">Pulse<span className="dot">.</span></h2>
          <p>Notes from the work: what we are building, testing and learning across AI, engineering, media and growth.</p>
        </div>
        <div className="posts posts-row">{POSTS.slice(0, 3).map((p) => <PostCard key={p.id} p={p} />)}</div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq sec lt">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <h2 className="d-l">Questions,<br />answered<span className="dot">.</span></h2>
          <p>Anything else, write to <span className="copyable" style={{ color: 'var(--ink-text)', fontWeight: 700 }}>{CONTACT.email}</span>.</p>
          <div><a className="btn btn-primary btn-sm" href="/contact">Start a project <span className="arr">→</span></a></div>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details className="qa" name="faq" open={i === 0} key={f.q}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <div className="qa-a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
