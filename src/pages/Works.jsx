import { useEffect, useRef } from 'react';
import { WORK, WORK_PILLARS } from '../data/content';
import { WorkCard } from '../sections/HomeSections';
import '../styles/ratecard.css';

/** /works and /works/<pillar>: projects, linked from the home page, footer and pillar pages (not the main nav). */
export default function Works({ pillar }) {
  const cat = pillar && WORK_PILLARS[pillar];
  const tabsRef = useRef(null);
  // On phones the tabs scroll sideways; bring the current one into view (horizontally only).
  useEffect(() => {
    const row = tabsRef.current, cur = row?.querySelector('[aria-current]');
    if (row && cur && row.scrollWidth > row.clientWidth) row.scrollLeft = cur.offsetLeft - row.offsetLeft - 16;
  }, [pillar]);
  // Pillar lists use equal tiles: the home page's large/small mix only fits the full list.
  const items = cat ? WORK.filter((w) => w.pillars?.includes(pillar)).map((w) => ({ ...w, size: undefined })) : WORK;
  return (
    <>
      <header className="rc-hero">
        <div className="wrap">
          <p className="rc-kick">Paralox Media · {cat ? `Work · ${cat.name}` : 'Portfolio'}</p>
          <h1>{cat ? cat.heading : 'Our work'}<span className="dot">.</span></h1>
          <p className="rc-tagline">
            {cat ? cat.intro : 'Launch films, web platforms, campaigns and content we have produced for brands in Sri Lanka and beyond. Open any project for the full case study.'}
          </p>
          <nav className="wk-tabs" aria-label="Work by pillar" ref={tabsRef}>
            <a href="/works" aria-current={!cat ? 'page' : undefined}>All work</a>
            {Object.entries(WORK_PILLARS).map(([key, c]) => (
              <a key={key} href={`/works/${key}`} aria-current={pillar === key ? 'page' : undefined}>{c.name}</a>
            ))}
          </nav>
        </div>
      </header>
      <section className="work sec lt" aria-label={cat ? `${cat.name} projects` : 'Projects'}>
        <div className="wrap">
          {items.length ? (
            <div className="bento">
              {items.map((w) => <WorkCard key={w.title} w={w} />)}
            </div>
          ) : (
            <p className="wk-empty">Case studies for this pillar are on the way. <a className="link" href="/contact">Ask us for examples <span className="arr">→</span></a></p>
          )}
        </div>
      </section>
    </>
  );
}
