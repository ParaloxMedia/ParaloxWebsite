import { useEffect, useRef, useState } from 'react';
import { POSTS } from '../data/content';
import { prefersReducedMotion } from '../hooks/useHashRoute';
import { Glass } from '../components/Glass';

/** Header image: an explicit hero, else the first photo that can be cropped. */
const heroOf = (p) => p.hero || p.photos?.find((ph) => !ph.whole)?.src || null;

const Dot = () => <span className="cs-dot" aria-hidden="true" />;
const Label = ({ children }) => <p className="cs-label mono"><Dot />{children}</p>;

/** Fade sections up as they scroll into view, and drift the hero image (parallax). */
function useCaseStudyMotion(root) {
  useEffect(() => {
    const el = root.current;
    const items = [...el.querySelectorAll('.cs-reveal')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -12% 0px' });
    items.forEach((i) => io.observe(i));

    const bg = el.querySelector('.cs-hero-bg');
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = Math.min(window.scrollY, window.innerHeight);
        if (bg) bg.style.transform = `translate3d(0, ${(y * 0.2).toFixed(1)}px, 0) scale(1.06)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [root]);
}

function Gallery({ photos }) {
  const [i, setI] = useState(0);
  const ph = photos[i];
  const go = (d) => setI((n) => (n + d + photos.length) % photos.length);
  return (
    <section className="cs-gallery wrap" aria-label="Photos">
      <div className="cs-gal-head cs-reveal">
        <Label>Gallery</Label>
        {photos.length > 1 && <span className="mono cs-count"><b>{String(i + 1).padStart(2, '0')}</b> / {String(photos.length).padStart(2, '0')}</span>}
      </div>
      <div className={`cs-stage cs-reveal${ph.whole ? ' whole' : ''}`}>
        <a href={ph.src} target="_blank" rel="noopener" aria-label={`${ph.caption} (open full size)`}>
          <img key={ph.src} src={ph.src} alt={ph.caption} />
        </a>
        {photos.length > 1 && (
          <>
            <button type="button" className="cs-arrow prev" onClick={() => go(-1)} aria-label="Previous photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" className="cs-arrow next" onClick={() => go(1)} aria-label="Next photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      <p className="cs-caption">{ph.caption}{ph.whole && <span className="mono"> · Click to open full size ↗</span>}</p>
      {photos.length > 1 && (
        <div className="cs-thumbs cs-reveal">
          {photos.map((t, k) => (
            <button key={t.src} type="button" className={k === i ? 'on' : undefined} onClick={() => setI(k)} aria-label={`Show photo ${k + 1}: ${t.caption}`} aria-pressed={k === i}>
              <img src={t.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Article({ post }) {
  const root = useRef(null);
  useCaseStudyMotion(root);

  const hero = heroOf(post);
  const ev = post.event;
  const facts = [
    ['Date', post.date],
    ['Type', post.pillar],
    ['Venue', ev?.venue],
    ['Location', ev?.location],
    ['Time', ev?.time],
    ['Seats', ev?.seats && `${ev.seats} seats`],
    ['Reading time', `${post.mins} min`],
  ].filter(([, v]) => v);

  const idx = POSTS.findIndex((p) => p.id === post.id);
  const next = POSTS.length > 1 ? POSTS[(idx + 1) % POSTS.length] : null;
  const nextBg = next && heroOf(next);
  const external = post.cta?.href.startsWith('http');

  return (
    <article className="pp" ref={root}>
      {/* 1. Full-screen hero */}
      <header className={`cs-hero${hero ? '' : ' no-photo'}`}>
        {hero
          ? <div className="cs-hero-bg" style={{ backgroundImage: `url(${hero})` }} />
          : <div className="cs-hero-bg brand"><div className="gridlines" /></div>}
        {!hero && post.logo && <div className="cs-hero-logo"><img src={post.logo.src} alt={post.logo.alt} /></div>}
        <div className="cs-hero-shade" />
        <a className="cs-back mono" href="#pulse">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          All of Pulse
        </a>
        <div className="cs-hero-copy wrap">
          <div className="cs-pills fu" style={{ '--d': '.2s' }}>
            <span className={post.upcoming ? 'soon' : undefined}>{post.pillar}</span>
            <span>{post.date}</span>
          </div>
          <p className="cs-kicker mono fu" style={{ '--d': '.3s' }}>{post.kicker || ev?.venue || 'Paralox Pulse'}</p>
          <h1 className="cs-title fu" style={{ '--d': '.4s' }}>{post.title}</h1>
          <p className="cs-sum fu" style={{ '--d': '.55s' }}><Dot /><span>{post.excerpt}</span></p>
        </div>
        <span className="cs-cue" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9l-7 7-7-7" /></svg>
        </span>
      </header>

      {/* 2. Details + story */}
      <section className="cs-main">
        <div className="wrap cs-grid">
          <aside className="cs-side">
            <dl>
              {facts.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}
            </dl>
            {post.logo && <div className="cs-side-logo"><img src={post.logo.src} alt={post.logo.alt} /></div>}
            <span className="cs-rule" aria-hidden="true" />
          </aside>
          <div className="cs-story">
            <Label>The story</Label>
            {post.body.map((t, i) => <p key={i} className={`cs-reveal${i === 0 ? ' lead' : ''}`}>{t}</p>)}
          </div>
        </div>
      </section>

      {/* 3. Highlights */}
      {post.highlights?.length > 0 && (
        <section className="cs-dark cs-high">
          <div className="wrap">
            <div className="cs-reveal"><Label>Highlights</Label></div>
            <ul>
              {post.highlights.map((h, i) => (
                <li key={h.title} className="cs-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                  <Glass glyph={h.glyph} className="ic" />
                  <b>{h.title}</b>
                  <p>{h.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 4. Gallery */}
      {post.photos?.length > 0 && <Gallery photos={post.photos} />}

      {/* 5. Summary + call to action */}
      <section className="cs-dark cs-result">
        <div className="wrap cs-result-in">
          <div className="cs-result-copy cs-reveal">
            <Label>In short</Label>
            <p>{post.excerpt}</p>
          </div>
          <span className="cs-line" aria-hidden="true" />
          {post.cta && (external
            ? <a className="btn btn-primary cs-reveal" href={post.cta.href} target="_blank" rel="noopener">{post.cta.label} <span className="arr">↗</span></a>
            : <a className="btn btn-primary cs-reveal" href={post.cta.href}>{post.cta.label} <span className="arr">→</span></a>)}
        </div>
      </section>

      {/* 6. Next story */}
      {next && (
        <a className="cs-next" href={`#${next.id}`}>
          <div className={`cs-next-bg${nextBg ? '' : ' brand'}`} style={nextBg ? { backgroundImage: `url(${nextBg})` } : undefined} />
          <div className="cs-next-copy">
            <p>Next story</p>
            <h2>{next.title}</h2>
            <span className="mono">{next.kicker || next.pillar}</span>
            <i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></i>
          </div>
        </a>
      )}
    </article>
  );
}
