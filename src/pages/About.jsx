import { Fragment } from 'react';
import { ABOUT } from '../data/content';
import { Curves, Glass } from '../components/Glass';
import Particles from '../components/Particles';
import StatsBand from '../components/StatsBand';
import { HumanMachine, NotSimply } from '../sections/AboutSections';
import ceoPhoto from '../assets/team/abubakker.jpg';

const PRE = ['Building', 'the', 'future', 'of'];
const MAIN = ['AI-powered', 'business', 'solutions'];

function MissionHero() {
  return (
    <section className="ab-mission am-hero" aria-label="About Paralox Media">
      <div className="am-bg" aria-hidden="true">
        <div className="am-orb o1" /><div className="am-orb o2" /><div className="am-orb o3" />
        <div className="gridlines" />
        <Particles />
      </div>
      <Curves className="curves am-curves" draw />
      <div className="wrap mission-inner">
        <div className="am-star" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><linearGradient id="amStarG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#B69CFF" /></linearGradient></defs>
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(233,227,250,.14)" />
            <g className="am-orbit"><circle cx="60" cy="60" r="42" fill="none" stroke="rgba(201,181,255,.4)" strokeDasharray="2 7" /><circle cx="102" cy="60" r="3" fill="#C9B5FF" /></g>
            <path className="am-starp" transform="translate(36 37) scale(1)" d="M24 4c2 10.5 6.5 15 17 17-10.5 2-15 6.5-17 17-2-10.5-6.5-15-17-17C17.5 19 22 14.5 24 4z" fill="url(#amStarG)" />
          </svg>
        </div>
        <p className="mission-kicker am-in" style={{ '--d': '.2s' }}>About Paralox Media</p>
        <h1 className="mission-line">
          <span className="m-pre">
            {PRE.map((w, i) => (
              <Fragment key={w}><span className="w"><span style={{ '--d': `${(0.35 + i * 0.07).toFixed(2)}s` }}>{w}</span></span>{i < PRE.length - 1 && ' '}</Fragment>
            ))}
          </span>
          <span className="m-main">
            {MAIN.map((w, i) => (
              <Fragment key={w}>
                <span className="w"><span style={{ '--d': `${(0.71 + i * 0.12).toFixed(2)}s` }}>{w}{i === MAIN.length - 1 && <span className="dot">.</span>}</span></span>
                {i < MAIN.length - 1 && ' '}
              </Fragment>
            ))}
          </span>
        </h1>
        <p className="mission-sub am-in" style={{ '--d': '1.27s' }}>AI, engineering, media and growth working together to move ambitious businesses forward.</p>
        <div className="hero-actions am-in" style={{ '--d': '1.42s', justifyContent: 'center' }}>
          <a className="btn btn-white" href="#contact">Start a project <span className="arr">→</span></a>
          <a className="link" href="#services-home" style={{ color: '#fff' }}>Our services <span className="arr">→</span></a>
        </div>
      </div>
      <div className="am-cue am-in" style={{ '--d': '1.67s' }} aria-hidden="true"><span className="mono">Scroll</span><i /></div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <MissionHero />

      <HumanMachine />

      <NotSimply />

      <section className="ab-together sec">
        <Curves />
        <div className="wrap tg-grid">
          <div className="tg-copy">
            <h2 className="d-xl">Together<span className="dot" style={{ color: 'var(--lilac)' }}>.</span></h2>
            <p>“Together” names every partnership we build. Our work should feel collaborative, never cold or machine-driven.</p>
          </div>
          <ul className="pairs">{ABOUT.pairs.map(([a, b]) => <li key={a}><b>{a}</b><i>+</i><b>{b}</b></li>)}</ul>
        </div>
      </section>

      <section className="ceo sec lt" aria-labelledby="ceoTitle">
        <div className="wrap ceo-grid">
          <figure className="ceo-photo">
            <img src={ceoPhoto} alt="Abubakker Bakthathi, Founder and CEO of Paralox Media" loading="lazy" decoding="async" width="1050" height="1400" />
            <figcaption><b>Abubakker Bakthathi</b><span className="mono">Founder &amp; CEO</span></figcaption>
          </figure>
          <div className="ceo-copy">
            <p className="ceo-kicker mono"><span className="dm-dot" />A note from our founder</p>
            <h2 className="d-m" id="ceoTitle">CEO&rsquo;s message<span className="dot">.</span></h2>
            <div className="ceo-body">
              <span className="ceo-quote" aria-hidden="true">&ldquo;</span>
              <p>The future of business is evolving rapidly, with artificial intelligence transforming how organisations operate, communicate, and grow. Integrating AI is no longer simply an advantage—it is becoming essential for businesses that want to remain competitive and future-ready.</p>
              <p>At Paralox Media, we help businesses adopt AI in practical and meaningful ways. By combining AI, engineering, media, and growth strategies, we create solutions that improve efficiency, enhance customer experiences, and unlock new opportunities.</p>
              <p>We believe AI should not replace human creativity—it should strengthen it. Our mission is to help businesses confidently embrace this transformation and achieve sustainable growth in an AI-powered world.</p>
              <p className="ceo-close">Let&rsquo;s create the future together.</p>
            </div>
            <div className="ceo-sign">
              <b>Abubakker</b>
              <span>Founder &amp; CEO</span>
              <span>Paralox Media (Private) Limited</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-team sec lt">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="d-l">One team,<br />four disciplines<span className="dot">.</span></h2>
            <p>A small senior team leads every project, with specialists brought in per brief. The people who plan your work also deliver it.</p>
          </div>
          <div className="team">
            {ABOUT.team.map((m) => (
              <div className={`tm${m.lead ? ' tm-lead' : ''}`} key={m.name}>
                {m.lead ? <span className="av">{m.initials}</span> : <Glass glyph={m.g} />}
                <span className="mono">{m.role}</span><h3>{m.name}</h3><p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="ab-traits sec lt">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="d-l">Clear, calm<br />and exact<span className="dot">.</span></h2>
            <p>Four traits shape how we advise, build and write. No hype, no unverifiable claims, no exclamation marks.</p>
          </div>
          <div className="traits">
            {ABOUT.traits.map((t) => <div className="trait" key={t.t}><Glass glyph={t.g} /><h3>{t.t}</h3><p>{t.p}</p></div>)}
          </div>
          <div className="voice">
            <div className="v-yes"><span className="mono">We write</span><p>“We build AI agents that handle routine enquiries, so your team can spend more time with clients.”</p></div>
            <div className="v-no"><span className="mono">We avoid</span><p>“Revolutionary AI that will transform your business overnight!”</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
