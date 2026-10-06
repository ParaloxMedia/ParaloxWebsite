import { useEffect, useRef, useState } from 'react';
import { WORK } from '../data/content';
import { Glass } from '../components/Glass';
import { Dot, Gallery, Label, useCaseStudyMotion } from './Article';

/**
 * Instagram posts via Instagram's official embed: the video plays on the page but stays
 * hosted on Instagram, so views count there. embed.js swaps each placeholder for Instagram's
 * player; the placeholders are injected as raw HTML so React never reconciles that swap.
 */
function InstagramPosts({ posts, className = '' }) {
  const box = useRef(null);
  useEffect(() => {
    const run = () => window.instgrm?.Embeds.process();
    if (window.instgrm) { run(); return; }
    let s = document.querySelector('script[data-ig-embed]');
    if (!s) {
      s = Object.assign(document.createElement('script'), { src: 'https://www.instagram.com/embed.js', async: true });
      s.dataset.igEmbed = '';
      document.body.appendChild(s);
    }
    s.addEventListener('load', run);
    return () => s.removeEventListener('load', run);
  }, []);
  const html = posts.map((code) => {
    const url = `https://www.instagram.com/p/${code}/`;
    return `<div class="pj-ig-item"><blockquote class="instagram-media" data-instgrm-permalink="${url}?utm_source=ig_embed" data-instgrm-version="14"><a href="${url}" target="_blank" rel="noopener">View this post on Instagram</a></blockquote></div>`;
  }).join('');
  return <div ref={box} className={`pj-ig ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * A YouTube film: its thumbnail and a play button until pressed, then YouTube's player
 * (privacy-enhanced domain), so nothing from YouTube loads for visitors who never play it.
 */
function YouTubeFilm({ id, poster, title }) {
  const [on, setOn] = useState(false);
  return on ? (
    <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
  ) : (
    <button type="button" className="pj-yt" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
      <img src={poster} alt="" loading="lazy" decoding="async" />
      <span className="pj-yt-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
    </button>
  );
}

/** Project case study at /work/<id>. Same visual language as Pulse articles, plus video. */
export default function Project({ project: p }) {
  const root = useRef(null);
  useCaseStudyMotion(root);
  // Projects kept off the home page link back to the Works page instead of Selected work.
  const fromWorks = WORK.find((w) => w.href === `/work/${p.id}`)?.home === false;

  return (
    <article className="pp pj" ref={root}>
      {/* 1. Full-screen hero */}
      <header className={`cs-hero${p.heroShade ? ` hero-${p.heroShade}` : ''}`}>
        <div className="cs-hero-bg" style={{ backgroundImage: `url(${p.hero})` }} />
        <div className="cs-hero-shade" />
        <a className="cs-back mono" href={fromWorks ? '/works' : '/#work'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          {fromWorks ? 'All work' : 'Selected work'}
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
              {p.facts.map(([k, v, href]) => (
              <div key={k}><dt className="mono">{k}</dt><dd>{href ? <a href={href} target="_blank" rel="noopener">{v} ↗</a> : v}</dd></div>
            ))}
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
      {p.videos?.length > 0 && (
      <section className="cs-dark pj-films">
        <div className="wrap">
          <div className="cs-reveal"><Label>The films</Label></div>
          <div className={`pj-video-grid${p.videos.length === 1 && p.videos[0].portrait ? ' solo' : p.videos.some((v) => v.portrait) ? ' has-portrait' : p.videos.length % 2 === 0 ? ' pair' : ''}`}>
            {p.videos.map((v, i) => (
              <figure key={v.src || v.youtube} className={`pj-video cs-reveal${i === 0 ? ' feature' : ''}${v.portrait ? ' portrait' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="pj-frame">
                  {v.youtube ? <YouTubeFilm id={v.youtube} poster={v.poster} title={`${p.title}: ${v.title}`} /> : (
                    <video controls playsInline preload="none" poster={v.poster} aria-label={`${p.title}: ${v.title}`}>
                      <source src={v.src} type="video/mp4" />
                    </video>
                  )}
                </div>
                <figcaption><b>{v.title}</b><span>{v.text}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Reels: Instagram embeds */}
      {p.reels?.length > 0 && (
        <section className="cs-dark pj-films pj-reels">
          <div className="wrap">
            <div className="pj-reels-head cs-reveal">
              <Label>The reels</Label>
              {p.instagram?.href && <a className="link" href={p.instagram.href} target="_blank" rel="noopener" style={{ color: '#fff' }}>{p.instagram.label} <span className="arr">↗</span></a>}
            </div>
            <InstagramPosts posts={p.reels} className="pj-ig-row" />
          </div>
        </section>
      )}

      {/* Instagram groups (e.g. reels, then posters), each a titled swipe row */}
      {p.instagram?.length > 0 && (
        <section className="cs-dark pj-films pj-reels pj-ig-groups">
          <div className="wrap">
            {p.instagram.map((g) => (
              <div key={g.title} className="pj-ig-group">
                <div className="pj-reels-head cs-reveal">
                  <Label>{g.title}</Label>
                  {g.text && <p className="pj-ig-text">{g.text}</p>}
                </div>
                <InstagramPosts posts={g.posts} className="pj-ig-row" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Photos and behind the scenes, side by side when a project has both */}
      {p.photos?.length > 0 && p.bts && (
        <section className="pj-split">
          <div className="wrap pj-split-in">
            <div className="pj-split-gal"><Gallery photos={p.photos} bare /></div>
            <aside className="pj-split-bts cs-reveal">
              <Label>Behind the scenes</Label>
              <p>{p.bts.text}</p>
              <InstagramPosts posts={[p.bts.post]} />
            </aside>
          </div>
        </section>
      )}

      {/* Behind the scenes on its own */}
      {p.bts && !p.photos?.length && (
        <section className="cs-main pj-bts">
          <div className="wrap pj-bts-in">
            <div className="pj-bts-copy cs-reveal">
              <Label>Behind the scenes</Label>
              <p className="lead">{p.bts.text}</p>
            </div>
            <InstagramPosts posts={[p.bts.post]} />
          </div>
        </section>
      )}

      {/* Photos on their own */}
      {p.photos?.length > 0 && !p.bts && <Gallery photos={p.photos} />}

      {/* 4. What we delivered */}
      <section className="cs-dark cs-high">
        <div className="wrap">
          <div className="cs-reveal"><Label>What we delivered</Label></div>
          <ul className={p.deliverables.length % 4 === 0 ? 'cols-4' : p.deliverables.length % 3 === 0 ? 'cols-3' : undefined}>
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
