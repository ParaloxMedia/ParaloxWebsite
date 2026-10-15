import { useEffect, useRef } from 'react';
import { STATS, WORK, WORK_PILLARS } from '../data/content';
import { WorkCard } from '../sections/HomeSections';
import { finePointer, prefersReducedMotion } from '../hooks/useHashRoute';
import '../styles/ratecard.css';

// Mouse depth for each image in the hero stack (px at the edge of the hero; see .px in global.css).
const DEPTH = [22, -30, 14];

/**
 * Motion for the Works page: cards reveal as they scroll in, tilt toward the cursor
 * with a light sheen, the hero stack drifts with scroll, and the stats count up.
 * Everything is skipped for reduced motion; tilt only runs on a fine pointer.
 */
function useWorksMotion(root) {
  useEffect(() => {
    const el = root.current;
    const cards = [...el.querySelectorAll('.wk-rv')];
    const nums = [...el.querySelectorAll('[data-count]')];
    if (prefersReducedMotion()) {
      cards.forEach((c) => c.classList.add('in'));
      return undefined;
    }

    // Reveal
    const io = 'IntersectionObserver' in window && new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    if (io) cards.forEach((c) => io.observe(c)); else cards.forEach((c) => c.classList.add('in'));

    // Count-up stats
    const t0 = performance.now();
    let countRaf = requestAnimationFrame(function tick(t) {
      const k = Math.min(1, (t - t0) / 1400), e = 1 - (1 - k) ** 3;
      nums.forEach((n) => { n.textContent = Math.round(Number(n.dataset.count) * e); });
      if (k < 1) countRaf = requestAnimationFrame(tick);
    });

    // Hero stack drifts up as the page scrolls
    const hero = el.querySelector('.wk-hero');
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        hero?.style.setProperty('--sy', Math.min(window.scrollY, window.innerHeight).toFixed(0));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Card tilt and sheen, following the cursor
    const offs = [];
    if (finePointer()) {
      cards.forEach((c) => {
        const move = (e) => {
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--tx', ((x - 0.5) * 7).toFixed(2));
          c.style.setProperty('--ty', ((0.5 - y) * 7).toFixed(2));
          c.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
          c.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        };
        const leave = () => { c.style.setProperty('--tx', 0); c.style.setProperty('--ty', 0); };
        c.addEventListener('pointermove', move);
        c.addEventListener('pointerleave', leave);
        offs.push(() => { c.removeEventListener('pointermove', move); c.removeEventListener('pointerleave', leave); });
      });
    }

    return () => {
      if (io) io.disconnect();
      cancelAnimationFrame(countRaf); cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
      offs.forEach((off) => off());
    };
  }, [root]);
}

/** /works and /works/<pillar>: projects, linked from the home page, footer and pillar pages (not the main nav). */
export default function Works({ pillar }) {
  const cat = pillar && WORK_PILLARS[pillar];
  const root = useRef(null);
  const tabsRef = useRef(null);
  useWorksMotion(root);
  // On phones the tabs scroll sideways; bring the current one into view (horizontally only).
  useEffect(() => {
    const row = tabsRef.current, cur = row?.querySelector('[aria-current]');
    if (row && cur && row.scrollWidth > row.clientWidth) row.scrollLeft = cur.offsetLeft - row.offsetLeft - 16;
  }, [pillar]);
  // Pillar lists use equal tiles: the home page's large/small mix only fits the full list.
  const items = cat ? WORK.filter((w) => w.pillars?.includes(pillar)).map((w) => ({ ...w, size: undefined })) : WORK;
  const stack = items.filter((w) => w.image).slice(0, 3);
  const brands = STATS.find((s) => s.plus);
  return (
    <div ref={root}>
      <header className="rc-hero wk-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap wk-hero-in">
          <div className="wk-hero-copy">
            <p className="rc-kick fu" style={{ '--d': '.05s' }}>Paralox Media · {cat ? `Work · ${cat.name}` : 'Portfolio'}</p>
            <h1 className="fu" style={{ '--d': '.15s' }}>{cat ? cat.heading : 'Our work'}<span className="dot">.</span></h1>
            <p className="rc-tagline fu" style={{ '--d': '.28s' }}>
              {cat ? cat.intro : 'Launch films, web platforms, campaigns and content we have produced for brands in Sri Lanka and beyond. Open any project for the full case study.'}
            </p>
            <dl className="wk-stats fu" style={{ '--d': '.4s' }}>
              <div><dt><span data-count={items.length}>{items.length}</span></dt><dd>{items.length === 1 ? 'Project' : 'Projects'}</dd></div>
              <div><dt><span data-count={4}>4</span></dt><dd>Pillars</dd></div>
              {brands && <div><dt><span data-count={brands.n}>{brands.n}</span>+</dt><dd>Brands</dd></div>}
            </dl>
            <nav className="wk-tabs fu" style={{ '--d': '.5s' }} aria-label="Work by pillar" ref={tabsRef}>
              <a href="/works" aria-current={!cat ? 'page' : undefined}>All work</a>
              {Object.entries(WORK_PILLARS).map(([key, c]) => (
                <a key={key} href={`/works/${key}`} aria-current={pillar === key ? 'page' : undefined}>{c.name}</a>
              ))}
            </nav>
          </div>
          {stack.length > 0 && (
            <div className={`wk-stack n${stack.length}`} aria-hidden="true">
              {stack.map((w, i) => (
                <figure key={w.title} className={`wk-float f${i}`}>
                  <div className="wk-bob">
                    <div className="px" style={{ '--d': `${DEPTH[i]}px` }}>
                      <img src={w.image} alt="" decoding="async" />
                      <figcaption className="mono">{w.code}</figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          )}
        </div>
      </header>
      <section className="work sec lt" aria-label={cat ? `${cat.name} projects` : 'Projects'}>
        <div className="wrap">
          {items.length ? (
            <div className="bento">
              {items.map((w, i) => <WorkCard key={w.title} w={w} className="wk-rv" style={{ '--i': i % 4 }} />)}
            </div>
          ) : (
            <p className="wk-empty">Case studies for this pillar are on the way. <a className="link" href="/contact">Ask us for examples <span className="arr">→</span></a></p>
          )}
        </div>
      </section>
    </div>
  );
}
