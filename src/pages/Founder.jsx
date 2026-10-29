import { useEffect, useRef, useState } from 'react';
import { FOUNDER } from '../data/founder';
import { CLIENTS, CONTACT, WORK } from '../data/content';
import { Glass } from '../components/Glass';
import { finePointer, prefersReducedMotion } from '../hooks/useHashRoute';
import coverImg from '../assets/pulse/sunday-morning-cover.jpg';
import teamImg from '../assets/careers/team.jpg';
import '../styles/ratecard.css';
import '../styles/careers.css';
import '../styles/founder.css';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
/** How far (0–1) a tall section has scrolled through its sticky stage. */
const stageProgress = (el) => {
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
};

/**
 * Scroll motion for the page, one rAF loop writing styles directly:
 * the hero shrinks into a framed card as a collage of work gathers around it,
 * and the advisory cards slide sideways while their section is pinned.
 * Skipped for reduced motion and on narrow screens (they get plain layouts).
 */
function useFounderMotion(root) {
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const hero = el.querySelector('.fx-hero');
    const card = el.querySelector('.fx-card');
    const tiles = [...el.querySelectorAll('.fx-tile')];
    const copy = el.querySelector('.fx-copy');
    const rail = el.querySelector('.fx-rail');
    const track = el.querySelector('.fx-track');
    let raf = 0;
    const frame = () => {
      raf = 0;
      if (window.innerWidth < 900) {
        [card, copy, track, ...tiles].forEach((n) => n && n.removeAttribute('style'));
        return;
      }
      if (hero && card) {
        const p = stageProgress(hero);
        const k = 1 - (1 - clamp01(p / 0.75)) ** 3; // ease out
        card.style.transform = `scale(${1 - k * 0.42})`;
        card.style.borderRadius = `${k * 36}px`;
        if (copy) copy.style.transform = `translate3d(0, ${-k * 40}px, 0)`;
        tiles.forEach((t, i) => {
          const d = clamp01((p - 0.08 - i * 0.03) / 0.5);
          t.style.opacity = String(d);
          t.style.transform = `translate3d(0, ${(1 - d) * 60}px, 0) scale(${0.9 + d * 0.1})`;
        });
      }
      if (rail && track) {
        const p = stageProgress(rail);
        const travel = Math.max(0, track.scrollWidth - window.innerWidth + 96);
        track.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    frame();
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => { window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); cancelAnimationFrame(raf); };
  }, [root]);
}

/** The sticky work list: the item whose still is in view is marked active. */
function useActiveWork(listRef, count) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const items = [...(listRef.current?.querySelectorAll('[data-work]') || [])];
    if (!items.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setActive(Number(e.target.dataset.work));
    }), { rootMargin: '-45% 0px -45% 0px' });
    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [listRef, count]);
  return active;
}

/** The consultation request: sent by email (contact form endpoint); time and payment confirmed by reply. */
function ConsultForm() {
  const c = FOUNDER.consult;
  const [f, setF] = useState({ name: '', email: '', phone: '', company: '', topic: '', hours: '1', when: '', notes: '' });
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const total = FOUNDER.rate.amount * Number(f.hours);

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const er = {};
    if (!f.name.trim()) er.name = 'Add your name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = 'Add a valid email address.';
    if (!f.topic) er.topic = 'Choose what you want to talk about.';
    if (!f.notes.trim()) er.notes = 'Tell Abubakker a little about your business and question.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setStatus('sending');
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${f.name.trim()} - Consultation request (${f.hours}h, USD ${total})`,
          // A copy goes straight to Abubakker (Formspree's _cc; the form itself delivers to info@).
          _cc: FOUNDER.email,
          type: 'Consultation with Abubakker Bakthathi',
          name: f.name, email: f.email, phone: f.phone || '—', company: f.company || '—',
          topic: f.topic, duration: `${f.hours} hour(s), USD ${total}`, preferred_time: f.when || '—', message: f.notes,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cr-done fd-form" role="status">
        <span className="cr-done-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
        <h3>Request sent<span className="dot">.</span></h3>
        <p>Thank you, {f.name.split(' ')[0]}. We will reply to {f.email} within one working day to confirm a time and how to pay for your {f.hours}-hour session.</p>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div className={`cr-field${props.full ? ' cr-full' : ''}${errs[k] ? ' has-err' : ''}`}>
      <label className="cr-label" htmlFor={`fd-${k}`}>{label}{props.req && <i aria-hidden="true"> *</i>}</label>
      {props.area
        ? <textarea id={`fd-${k}`} value={f[k]} onChange={set(k)} rows={4} placeholder={props.ph} />
        : <input id={`fd-${k}`} type={props.type || 'text'} value={f[k]} onChange={set(k)} placeholder={props.ph} autoComplete={props.auto} />}
      {errs[k] && <span className="cr-err" role="alert">{errs[k]}</span>}
    </div>
  );

  return (
    <form className="cr-form fd-form" onSubmit={submit} noValidate>
      <div className="cr-grid">
        {field('name', 'Your name', { req: true, auto: 'name' })}
        {field('email', 'Email', { req: true, type: 'email', auto: 'email' })}
        {field('phone', 'Phone / WhatsApp', { type: 'tel', auto: 'tel', ph: 'Optional' })}
        {field('company', 'Company', { auto: 'organization', ph: 'Optional' })}
        <div className={`cr-field${errs.topic ? ' has-err' : ''}`}>
          <label className="cr-label" htmlFor="fd-topic">What do you want to talk about?<i aria-hidden="true"> *</i></label>
          <select id="fd-topic" value={f.topic} onChange={set('topic')}>
            <option value="">Select</option>
            {c.topics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errs.topic && <span className="cr-err" role="alert">{errs.topic}</span>}
        </div>
        <div className="cr-field">
          <span className="cr-label">Length</span>
          <div className="cr-pills">
            {c.durations.map((h) => (
              <button key={h} type="button" className={f.hours === String(h) ? 'on' : undefined} aria-pressed={f.hours === String(h)} onClick={() => setF((v) => ({ ...v, hours: String(h) }))}>
                {h} hour{h > 1 ? 's' : ''} · ${FOUNDER.rate.amount * h}
              </button>
            ))}
          </div>
        </div>
        {field('when', 'Preferred days and times', { full: true, ph: 'For example: weekday evenings, Sri Lanka time' })}
        {field('notes', 'Your business and what you want to get out of the call', { full: true, area: true, req: true })}
      </div>
      <div className="cr-submit-row">
        <button className="btn btn-primary cr-submit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? <><span className="cr-spin" aria-hidden="true" /> Sending…</> : <>Request a session · ${total} <span className="arr">→</span></>}
        </button>
        <small>No payment now. We confirm the time and how to pay by email. Prefer to write? <a href={`mailto:${FOUNDER.email}?subject=${encodeURIComponent('Consultation request')}`}>{FOUNDER.email}</a></small>
      </div>
      {status === 'failed' && (
        <div className="cr-fail" role="alert">
          <b>We could not send your request just now.</b>
          <span>Please try again, or message us on <a href={`${CONTACT.whatsapp}?text=${encodeURIComponent('Hi, I would like to book a consultation with Abubakker.')}`} target="_blank" rel="noopener">WhatsApp</a> or email Abubakker at <a href={`mailto:${FOUNDER.email}?subject=${encodeURIComponent('Consultation request')}`}>{FOUNDER.email}</a>.</span>
        </div>
      )}
    </form>
  );
}

/** /abubakker-bakthathi: the founder's personal page (unlinked; found through search). */
export default function Founder() {
  const p = FOUNDER;
  const root = useRef(null);
  const workRef = useRef(null);
  const work = p.work.map((h) => WORK.find((w) => w.href === h)).filter(Boolean);
  const active = useActiveWork(workRef, work.length);
  useFounderMotion(root);
  // A pointer glow on the advisory cards (fine pointers only).
  const glow = (e) => {
    if (!finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };
  const collage = [work[0]?.image, coverImg, work[1]?.image, teamImg, work[2]?.image, work[3]?.image].filter(Boolean);

  return (
    <div className="fx" ref={root}>
      {/* 1. Hero: full-bleed portrait that shrinks into a framed card as a collage of work gathers around it. */}
      <section className="fx-hero" aria-labelledby="fx-title">
        <div className="fx-stage">
          <div className="fx-collage" aria-hidden="true">
            {collage.map((src, i) => <div key={i} className={`fx-tile t${i}`}><img src={src} alt="" loading="lazy" decoding="async" /></div>)}
          </div>
          <div className="fx-card">
            <img className="fx-photo" src={p.hero} alt={`${p.name}, ${p.role}`} width="1650" height="2200" decoding="async" fetchPriority="high" />
            <div className="fx-shade" aria-hidden="true" />
            <div className="fx-copy wrap">
              <p className="fx-kicker mono fu" style={{ '--d': '.05s' }}>{p.name} · Colombo, Sri Lanka</p>
              <h1 id="fx-title" className="fx-h1">
                {p.heroLines.map((l, i) => <span key={l} className="ln"><span className="fu" style={{ '--d': `${0.12 + i * 0.09}s` }}>{l}{i === p.heroLines.length - 1 && <span className="dot">.</span>}</span></span>)}
              </h1>
              <div className="fx-side fu" style={{ '--d': '.5s' }}>
                {p.heroSide.map((s) => <p key={s[0]}>{s[0]}<br />{s[1]}</p>)}
              </div>
              <div className="fx-actions fu" style={{ '--d': '.6s' }}>
                <a className="fx-pill" href="#consult"><i aria-hidden="true" />Book a consultation · ${p.rate.amount}/hr</a>
                <a className="link" href={p.linkedin} target="_blank" rel="noopener me" style={{ color: '#fff' }}>LinkedIn <span className="arr">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro + highlights */}
      <section className="fx-intro sec" aria-label="Introduction">
        <div className="wrap">
          <p className="fx-lede">{p.lede}</p>
          <ul className="aa-proof-grid fx-proof">
            {p.highlights.map((h) => (
              <li key={h.label}><a href={h.href}><b>{h.stat}</b><span>{h.label}</span><i className="arr" aria-hidden="true">→</i></a></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Work he has led: gradient arch, sticky list beside a stack of stills */}
      <section className="fx-work" aria-labelledby="fx-work-h">
        <div className="fx-arch" aria-hidden="true" />
        <div className="wrap">
          <h2 className="fx-big" id="fx-work-h">Work he has led<span className="dot">.</span></h2>
          <div className="fx-work-in" ref={workRef}>
            <ol className="fx-work-list">
              {work.map((w, i) => (
                <li key={w.href} className={i === active ? 'on' : undefined}>
                  <a href={w.href}><b>{w.title}</b><span>{w.meta}</span></a>
                </li>
              ))}
            </ol>
            <div className="fx-work-stack">
              {work.map((w, i) => (
                <a key={w.href} href={w.href} className="fx-shot" data-work={i}>
                  <img src={w.image} alt={w.title} loading="lazy" decoding="async" />
                  <span className="fx-shot-cap"><b>{w.title}</b><i className="arr" aria-hidden="true">→</i></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why work with him */}
      <section className="fx-why sec" aria-labelledby="fx-why-h">
        <div className="wrap">
          <h2 className="fx-big center" id="fx-why-h">Why work with Abubakker?</h2>
          <p className="fx-sub">AI advice from someone who ships it.</p>
          <ul className="fx-why-grid">
            {p.why.map((w) => <li key={w.title}><Glass glyph={w.glyph} className="ic" /><h3>{w.title}</h3><p>{w.text}</p></li>)}
          </ul>
        </div>
      </section>

      {/* Teaching: where he lectures and trains */}
      <section className="fx-teach sec" id="teaching" aria-labelledby="fx-teach-h">
        <div className="wrap">
          <h2 className="fx-big" id="fx-teach-h">Where he teaches AI<span className="dot">.</span></h2>
          <p className="fx-teach-sub">20+ sessions, 500+ people trained, from boardrooms to classrooms.</p>
          <ul className="fx-teach-grid">
            {p.teaching.map((t) => {
              const Tag = t.href ? 'a' : 'div';
              return (
                <li key={t.org}>
                  <Tag className="fx-teach-card" {...(t.href && { href: t.href, target: '_blank', rel: 'noopener' })}>
                    <span className="mono">{t.when}</span>
                    <b>{t.org}</b>
                    <span className="fx-teach-role">{t.role}</span>
                    <p>{t.text}</p>
                    {t.href && <span className="link">Trainer profile <span className="arr">↗</span></span>}
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5. As featured in: The Sunday Morning */}
      <section className="fd-feature sec" aria-labelledby="fd-feature-h">
        <div className="wrap fd-feature-in">
          <a className="fd-cover" href={p.feature.url} target="_blank" rel="noopener" aria-label={`Read “${p.feature.headline}” at The Morning`}>
            <img src={coverImg} alt={`${p.name} on the cover of Happinez at The Sunday Morning, ${p.feature.date}`} loading="lazy" decoding="async" />
          </a>
          <div className="fd-feature-copy">
            <p className="rc-kick">As featured in · {p.feature.outlet}</p>
            <h2 className="d-m" id="fd-feature-h">{p.feature.headline}<span className="dot">.</span></h2>
            <p className="fd-byline mono">By {p.feature.author} · {p.feature.date}</p>
            <ul className="fd-feature-quotes">{p.feature.quotes.map((q) => <li key={q}><blockquote>“{q}”</blockquote></li>)}</ul>
            <div className="fd-feature-actions">
              <a className="btn btn-white" href={p.feature.url} target="_blank" rel="noopener">Read the full interview <span className="arr">↗</span></a>
              <a className="link" href={p.feature.story} style={{ color: '#fff' }}>See the cover and pages <span className="arr">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. What he advises on: cards that slide sideways while the section is pinned */}
      <section className="fx-rail" aria-labelledby="fx-rail-h">
        <div className="fx-rail-stage">
          <div className="wrap fx-rail-head">
            <h2 className="fx-big" id="fx-rail-h">What he advises on<span className="dot">.</span></h2>
            <p>Six areas where an hour with Abubakker saves months of trial and error.</p>
          </div>
          <ol className="fx-track">
            {p.expertise.map((x, i) => (
              <li key={x.title} className={`fx-svc${i === 0 ? ' hot' : ''}`} onPointerMove={glow}>
                <a href="#consult" aria-label={`Book a consultation about ${x.title}`}>
                  <span className="fx-svc-go" aria-hidden="true">↗</span>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                  <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Story */}
      <section className="fd-story sec lt" aria-labelledby="fd-story-h">
        <div className="wrap">
          <h2 className="d-m" id="fd-story-h">From engineer to founder<span className="dot">.</span></h2>
          {p.story.map((t, i) => <p key={i} className={i === 0 ? 'lead' : undefined}>{t}</p>)}
        </div>
      </section>

      {/* 8. Skills */}
      <section className="fd-skills sec lt" aria-labelledby="fd-skills-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="fd-skills-h">Skills<span className="dot">.</span></h2><p>Six-plus years across software, AI and growth, from writing code to leading teams and campaigns.</p></div>
          <div className="fd-skill-grid">
            {p.skills.map((g) => (
              <div key={g.group} className="fd-skill">
                <p className="mono">{g.group}</p>
                <ul>{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Recognition and talks: hairline rows */}
      <section className="fx-rec sec" aria-labelledby="fx-rec-h">
        <div className="wrap">
          <h2 className="fx-big" id="fx-rec-h">Recognition<br />and talks<span className="dot">.</span></h2>
          <ul className="fx-rec-list">
            {p.recognition.map((r) => (
              <li key={r.title + r.meta}><a href={r.href}><b>{r.title}</b><span className="mono">{r.meta}</span><i className="arr" aria-hidden="true">→</i></a></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. Trusted by: a statement with client logos drifting around it */}
      <section className="fx-trust" aria-labelledby="fx-trust-h">
        <ul className="fx-logos" aria-hidden="true">
          {CLIENTS.slice(0, 10).map((c, i) => <li key={c.name} className={`l${i}`}><img src={c.logo} alt="" loading="lazy" decoding="async" /></li>)}
        </ul>
        <h2 className="fx-big center" id="fx-trust-h">{p.trust.map((l) => <span key={l}>{l}<br /></span>)}</h2>
      </section>

      {/* 11. In his words */}
      <section className="fd-quotes sec" aria-label="In his words">
        <div className="wrap">
          <p className="rc-kick">In his words</p>
          <ul>
            {p.quotes.map((q) => (
              <li key={q.text}><blockquote>“{q.text}”</blockquote><a className="mono" href={q.href}>{q.source} <span className="arr">→</span></a></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. Consultation */}
      <section className="cr-apply sec" id="consult" aria-labelledby="fd-consult-h">
        <div className="wrap cr-apply-in">
          <div className="cr-apply-intro">
            <p className="rc-kick">Consultation</p>
            <h2 className="d-m" id="fd-consult-h">{p.consult.title}<span className="dot">.</span></h2>
            <p className="fd-price"><b>${p.rate.amount}</b> <span>USD per hour</span></p>
            <p>{p.consult.text}</p>
            <ul className="fd-includes">{p.consult.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <ConsultForm />
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="faq sec lt" aria-labelledby="fd-faq-h">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <h2 className="d-l" id="fd-faq-h">About<br />Abubakker<span className="dot">.</span></h2>
            <p>Want to work with his team instead? <a className="link" href="/contact" style={{ color: 'var(--violet)' }}>Start a project <span className="arr">→</span></a></p>
          </div>
          <div className="faq-list">
            {p.faq.map((f, i) => (
              <details className="qa" name="fd-faq" open={i === 0} key={f.q}>
                <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                <div className="qa-a"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
