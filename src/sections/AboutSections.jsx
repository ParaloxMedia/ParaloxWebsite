import { ABOUT } from '../data/content';
import HandsTouch from '../components/HandsTouch';

/** "Human creativity × machine intelligence" with the hands panel. Used on About and Home. */
export function HumanMachine() {
  return (
    <section className="ab-hero lt sec">
      <div className="ab-glow" aria-hidden="true" />
      <div className="wrap ab-hero-grid">
        <div className="ab-copy">
          <h2 className="d-xl">Human creativity <span className="x">×</span> machine intelligence<span className="dot">.</span></h2>
          <p className="lede">Paralox Media brings together intelligent technology, creative production and growth expertise to help ambitious businesses build their future.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">Work with us <span className="arr">→</span></a>
            <a className="link" href="#services-home">Our services <span className="arr">→</span></a>
          </div>
        </div>
        <div className="ab-panel" aria-hidden="true">
          <div className="gridlines" />
          <span className="mono ab-tag">Human × AI</span>
          <HandsTouch />
        </div>
      </div>
    </section>
  );
}

/** "Paralox is not simply…" strike list and positioning statement. Used on About and Home. */
export function NotSimply() {
  return (
    <section className="ab-not sec lt">
      <div className="wrap">
        <p className="ab-not-lead mono">Paralox is not simply</p>
        <ul className="strike">{ABOUT.strike.map((s) => <li key={s}>{s}</li>)}</ul>
        <p className="ab-state">We are a <b>creative technology company</b> building intelligent systems, experiences and media for the next generation of businesses. We connect all of these disciplines into one system<span className="dot">.</span></p>
      </div>
    </section>
  );
}
