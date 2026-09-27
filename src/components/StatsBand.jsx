import { STATS } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';

function Stat({ n, plus, l }) {
  const [ref, v] = useCountUp(n);
  return (
    <div className="st">
      <span className="num"><span ref={ref}>{v}</span>{plus && <em>+</em>}</span>
      <span className="st-l">{l}</span>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section className="stats" aria-label="Paralox in numbers">
      <div className="wrap stats-grid">{STATS.map((s) => <Stat key={s.l} {...s} />)}</div>
    </section>
  );
}
