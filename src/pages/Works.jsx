import { WORK } from '../data/content';
import { WorkCard } from '../sections/HomeSections';
import '../styles/ratecard.css';

/** /works: every project, linked from the home page and footer (not the main nav). */
export default function Works() {
  return (
    <>
      <header className="rc-hero">
        <div className="wrap">
          <p className="rc-kick">Paralox Media · Portfolio</p>
          <h1>Our work<span className="dot">.</span></h1>
          <p className="rc-tagline">Launch films, web platforms, campaigns and content we have produced for brands in Sri Lanka and beyond. Open any project for the full case study.</p>
          <p className="rc-pillars mono">AI · Engineering · Media · Growth</p>
        </div>
      </header>
      <section className="work sec lt" aria-label="Projects">
        <div className="wrap">
          <div className="bento">
            {WORK.map((w) => <WorkCard key={w.title} w={w} />)}
          </div>
        </div>
      </section>
    </>
  );
}
