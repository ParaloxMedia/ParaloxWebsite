import { PROCESS } from '../data/content';

export default function Process() {
  return (
    <section className="process sec lt">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="d-m">From idea<br />to growth<span className="dot">.</span></h2>
          <p>The same five stages on every project, so you always know where the work stands.</p>
        </div>
        <ol className="steps">
          {PROCESS.map((s) => <li key={s.t}><span className="mono">{s.n}</span><h4>{s.t}</h4><p>{s.p}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
