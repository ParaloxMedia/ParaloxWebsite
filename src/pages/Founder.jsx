import { useEffect, useRef, useState } from 'react';
import { FOUNDER } from '../data/founder';
import { track } from '../lib/oaiPixel';
import { CONTACT } from '../data/content';
import { Glass } from '../components/Glass';
import { BrandIcon } from '../components/Icons';
import { finePointer, prefersReducedMotion } from '../hooks/useHashRoute';
import coverImg from '../assets/pulse/sunday-morning-cover.jpg';

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
 * the hero shrinks into a framed card as a collage of his talks and events gathers around it,
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

/** A YouTube Short: its poster until pressed, then the privacy-enhanced player. */
function ShortVideo({ id, poster, title }) {
  const [on, setOn] = useState(false);
  return on
    ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
    : (
      <button type="button" className="pj-yt" onClick={() => setOn(true)} aria-label={`Play: ${title}`}>
        <img src={poster} alt={`Abubakker Bakthathi presenting: ${title}`} loading="lazy" decoding="async" />
        <span className="pj-yt-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
      </button>
    );
}

/** His social profiles as round icon links. */
function SocialLinks({ items, className = '' }) {
  return (
    <ul className={`fx-socials ${className}`}>
      {items.map((s) => (
        <li key={s.key}><a href={s.url} target="_blank" rel="noopener me" aria-label={`Abubakker Bakthathi on ${s.label}`}><BrandIcon name={s.key} /></a></li>
      ))}
    </ul>
  );
}

/** The sticky events list: the item whose still is in view is marked active. */
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
      track('appointment_scheduled', { amount: total * 100, currency: 'USD' }, { name: f.name, email: f.email, phone: f.phone });
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
  const work = p.events.map((e) => ({ ...e, src: e.image }));
  const active = useActiveWork(workRef, work.length);
  useFounderMotion(root);
  // Floating "Book a consultation" button: visible after the hero, hidden at the form.
  const [fab, setFab] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const c = document.getElementById('consult');
      const pastHero = window.scrollY > window.innerHeight * 1.2;
      // Hidden from the form onwards (form, FAQ and footer), so it never covers them.
      const reachedForm = c && c.getBoundingClientRect().top < window.innerHeight * 0.85;
      setFab(pastHero && !reachedForm);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  // Why section: words and cards reveal in sequence when it scrolls into view.
  const whyRef = useRef(null);
  useEffect(() => {
    const el = whyRef.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { el.classList.add('in'); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -20% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // A pointer glow on the advisory cards (fine pointers only).
  const glow = (e) => {
    if (!finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--gx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--gy', `${e.clientY - r.top}px`);
  };
  const W = '/team/abubakker/web/';
  const collage = [`${W}bl2-main.jpg`, `${W}derana-talk.jpg`, `${W}grok-main.jpg`, `${W}wia-main.jpg`, `${W}paralox-talk.jpg`, `${W}derana-main.jpg`];

  return (
    <div className="fx" ref={root}>
      <a className={`fx-fab${fab ? ' on' : ''}`} href="#consult" aria-hidden={!fab} tabIndex={fab ? 0 : -1}>
        <i aria-hidden="true" />Book a consultation · ${p.rate.amount}/hr <span className="arr">→</span>
      </a>
      {/* 1. Hero: full-bleed portrait that shrinks into a framed card as a collage of his talks and events gathers around it. */}
      <section className="fx-hero" aria-labelledby="fx-title">
        <div className="fx-stage">
          <div className="fx-collage" aria-hidden="true">
            {collage.map((src, i) => <div key={i} className={`fx-tile t${i}`}><img src={src} alt="" loading="lazy" decoding="async" /></div>)}
          </div>
          <div className="fx-card">
            {/* Desktop: the wide banner; phones keep the portrait crop. */}
            <picture>
              <source media="(min-width: 900px)" srcSet={p.banner} width="1280" height="720" />
              <img className="fx-photo" src={p.hero} alt={`${p.name}, ${p.role}`} width="1650" height="2200" decoding="async" fetchPriority="high" />
            </picture>
            <div className="fx-shade" aria-hidden="true" />
            <div className="fx-copy wrap">
              <p className="fx-kicker mono fu" style={{ '--d': '.05s' }}>{p.name} · {p.kicker}</p>
              <h1 id="fx-title" className="fx-h1">
                {p.heroLines.map((l, i) => <span key={l} className="ln"><span className="fu" style={{ '--d': `${0.12 + i * 0.09}s` }}>{l}{i === p.heroLines.length - 1 && <span className="dot">.</span>}</span></span>)}
              </h1>
              <div className="fx-side fu" style={{ '--d': '.5s' }}>
                {p.heroSide.map((s) => <p key={s[0]}>{s[0]}<br />{s[1]}</p>)}
              </div>
              <div className="fx-actions fu" style={{ '--d': '.6s' }}>
                <a className="fx-pill" href="#consult"><i aria-hidden="true" />Book a consultation · ${p.rate.amount}/hr</a>
                <SocialLinks items={p.socials} />
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

      {/* 3. Workshops, talks and events: gradient arch, sticky list beside a stack of stills */}
      <section className="fx-work" aria-labelledby="fx-work-h">
        <div className="fx-arch" aria-hidden="true" />
        <div className="wrap">
          <h2 className="fx-big" id="fx-work-h">Workshops, talks<br />and events<span className="dot">.</span></h2>
          <div className="fx-work-in" ref={workRef}>
            <ol className="fx-work-list">
              {work.map((w, i) => (
                <li key={w.title} className={i === active ? 'on' : undefined}>
                  <a href={w.href}><span className="mono">{w.kind}</span><b>{w.title}</b><span>{w.meta}</span></a>
                </li>
              ))}
            </ol>
            <div className="fx-work-stack">
              {work.map((w, i) => {
                const ext = w.href.startsWith('http');
                return (
                  <a key={w.title} href={w.href} className="fx-shot" data-work={i} {...(ext && { target: '_blank', rel: 'noopener' })}>
                    <img src={w.src} alt={w.title} loading="lazy" decoding="async" style={w.pos ? { objectPosition: w.pos } : undefined} />
                    {w.thumbs?.length > 0 && <span className="fx-thumbs" aria-hidden="true">{w.thumbs.map((t) => <img key={t} src={t} alt="" loading="lazy" decoding="async" />)}</span>}
                    <span className="fx-shot-cap"><span><b>{w.title}</b><small>{w.text}</small></span><i className="arr" aria-hidden="true">{ext ? '↗' : '→'}</i></span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why work with him */}
      <section className="fx-why sec" aria-labelledby="fx-why-h" ref={whyRef}>
        <span className="fx-why-orb" aria-hidden="true" />
        <div className="wrap">
          <h2 className="fx-big center fx-why-title" id="fx-why-h">
            {'Why work with Abubakker?'.split(' ').map((word, i) => <span key={i} className="w" style={{ '--i': i }}>{word}</span>)}
          </h2>
          <p className="fx-sub fx-why-sub">AI training and advice from someone who builds with it.</p>
          <ul className="fx-why-grid">
            {p.why.map((w, i) => (
              <li key={w.title} className="fx-why-card" style={{ '--i': i }} onPointerMove={glow}>
                <span className="fx-why-num mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <Glass glyph={w.glyph} className="ic" />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <span className="fx-why-line" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Training: where he lectures and trains */}
      <section className="fx-teach sec" id="teaching" aria-labelledby="fx-teach-h">
        <div className="wrap">
          <h2 className="fx-big" id="fx-teach-h">Where he trains<span className="dot">.</span></h2>
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
          <div className="fx-workshop">
            <div className="fx-short"><ShortVideo id={p.workshop.youtube} poster={p.workshop.poster} title={p.workshop.title} /></div>
            <div>
              <p className="rc-kick">Inside a workshop</p>
              <h3>{p.workshop.title}</h3>
              <p className="mono fx-ws-meta">{p.workshop.meta}</p>
              <p>{p.workshop.text}</p>
              <a className="link" href={p.workshop.channel} target="_blank" rel="noopener me" style={{ color: '#fff' }}>More on his YouTube <span className="arr">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. As featured in: The Sunday Morning */}
      <section className="fd-feature sec" id="feature" aria-labelledby="fd-feature-h">
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
        <div className="wrap fd-story-in">
          <div>
            <h2 className="d-m" id="fd-story-h">From engineer to founder<span className="dot">.</span></h2>
            {p.story.map((t, i) => <p key={i} className={i === 0 ? 'lead' : undefined}>{t}</p>)}
          </div>
          <figure className="fd-story-photo">
            <img src={p.portrait} alt={`${p.name}, ${p.role}`} width="975" height="1300" loading="lazy" decoding="async" />
            <figcaption className="mono">{p.name} · Founder &amp; CEO, Paralox Media</figcaption>
          </figure>
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
        <span className="fx-trust-orb" aria-hidden="true" />
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
      <section className="cr-apply sec fx-consult" id="consult" aria-labelledby="fd-consult-h">
        <span className="fx-consult-ring r1" aria-hidden="true" />
        <span className="fx-consult-ring r2" aria-hidden="true" />
        <div className="wrap cr-apply-in">
          <div className="cr-apply-intro">
            <p className="fx-consult-badge"><i aria-hidden="true" />Now booking · one-to-one with Abubakker</p>
            <h2 className="d-m" id="fd-consult-h">{p.consult.title}<span className="dot">.</span></h2>
            <p className="fd-price"><b>${p.rate.amount}</b> <span>USD per hour</span></p>
            <p>{p.consult.text}</p>
            <ul className="fd-includes">{p.consult.includes.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="fx-consult-social"><span className="mono">Follow Abubakker</span><SocialLinks items={p.socials} /></div>
          </div>
          <ConsultForm />
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="faq sec lt" aria-labelledby="fd-faq-h">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <h2 className="d-l" id="fd-faq-h">About<br />Abubakker<span className="dot">.</span></h2>
            <p>Prefer to write? <a className="link" href={`mailto:${p.email}`} style={{ color: 'var(--violet)' }}>{p.email} <span className="arr">→</span></a></p>
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
