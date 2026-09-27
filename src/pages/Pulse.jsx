import { useState } from 'react';
import { POSTS, PULSE_FILTERS } from '../data/content';
import PostCard from '../components/PostCard';

export default function Pulse() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? POSTS : POSTS.filter((p) => p.kind === filter);
  return (
    <section className="pulse-sec sec lt">
      <div className="wrap">
        <div className="sec-head">
          <h1 className="d-xl">Pulse<span className="dot">.</span></h1>
          <p>Notes from the work: what we are building, testing and learning across AI, engineering, media and growth.</p>
        </div>
        <div className="pulse-filters" role="group" aria-label="Filter posts">
          {PULSE_FILTERS.map((f) => {
            const n = f.key === 'all' ? POSTS.length : POSTS.filter((p) => p.kind === f.key).length;
            if (!n) return null;
            return (
              <button key={f.key} type="button" className={filter === f.key ? 'on' : undefined} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}<span className="mono">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="posts">{list.map((p) => <PostCard key={p.id} p={p} />)}</div>
      </div>
    </section>
  );
}
