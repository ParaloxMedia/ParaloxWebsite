import { Glass } from './Glass';

export default function PostCard({ p }) {
  const cover = p.photos?.[0];
  return (
    <a className="post" href={`#${p.id}`}>
      <div className={`thumb${cover ? ' has-photo' : ''}${cover?.whole ? ' whole' : ''}${p.logo ? ' has-logo' : ''}`}>
        {cover ? <img src={cover.src} alt="" loading="lazy" decoding="async" />
          : p.logo ? <img className="thumb-logo" src={p.logo.src} alt={p.logo.alt} loading="lazy" decoding="async" />
          : <><div className="gridlines" /><Glass glyph={p.glyph} /></>}
        <span className={`tagline mono${p.upcoming ? ' soon' : ''}`}>{p.pillar}</span>
      </div>
      <span className="meta mono">{p.pillar} · {p.mins} min read · {p.date}</span>
      <h3>{p.title}</h3>
      <p>{p.excerpt}</p>
      <span className="link">Read <span className="arr">→</span></span>
    </a>
  );
}
