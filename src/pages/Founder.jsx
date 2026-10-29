import { useState } from 'react';
import { FOUNDER } from '../data/founder';
import { CONTACT } from '../data/content';
import { Glass } from '../components/Glass';
import coverImg from '../assets/pulse/sunday-morning-cover.jpg';
import '../styles/ratecard.css';
import '../styles/careers.css';
import '../styles/founder.css';

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
  return (
    <>
      <header className="rc-hero wk-hero fd-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap fd-hero-in">
          <div>
            <p className="rc-kick fu" style={{ '--d': '.05s' }}>{p.kicker}</p>
            <h1 className="fu" style={{ '--d': '.15s' }}>{p.name}<span className="dot">.</span></h1>
            <p className="fd-role fu" style={{ '--d': '.22s' }}>{p.role}</p>
            <p className="rc-tagline fu" style={{ '--d': '.3s' }}>{p.lede}</p>
            <div className="rc-hero-actions fu" style={{ '--d': '.42s' }}>
              <a className="btn btn-white" href="#consult">Book a consultation · ${p.rate.amount}/hr <span className="arr">↓</span></a>
              <a className="link" href={p.linkedin} target="_blank" rel="noopener me" style={{ color: '#fff' }}>LinkedIn <span className="arr">↗</span></a>
              <a className="link" href={`mailto:${FOUNDER.email}`} style={{ color: '#fff' }}>{FOUNDER.email} <span className="arr">→</span></a>
            </div>
          </div>
          <figure className="fd-portrait fu" style={{ '--d': '.25s' }}>
            <div className="px" style={{ '--d': '14px' }}>
              <img src={p.portrait} alt={`${p.name}, ${p.role}`} width="975" height="1300" decoding="async" fetchPriority="high" />
            </div>
          </figure>
        </div>
      </header>

      <section className="aa-proof sec lt" aria-label="Highlights">
        <div className="wrap">
          <ul className="aa-proof-grid">
            {p.highlights.map((h) => (
              <li key={h.label}><a href={h.href}><b>{h.stat}</b><span>{h.label}</span><i className="arr" aria-hidden="true">→</i></a></li>
            ))}
          </ul>
        </div>
      </section>

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

      <section className="fd-story sec lt" aria-labelledby="fd-story-h">
        <div className="wrap">
          <div>
            <h2 className="d-m" id="fd-story-h">From engineer to founder<span className="dot">.</span></h2>
            {p.story.map((t, i) => <p key={i} className={i === 0 ? 'lead' : undefined}>{t}</p>)}
          </div>
        </div>
      </section>

      <section className="cr-why sec lt" aria-labelledby="fd-exp-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="fd-exp-h">What he advises on<span className="dot">.</span></h2><p>Practical AI advice from someone who builds AI films, agents and automation for brands every week.</p></div>
          <ul className="cr-why-grid fd-exp">
            {p.expertise.map((w) => <li key={w.title}><Glass glyph={w.glyph} className="ic" /><b>{w.title}</b><p>{w.text}</p></li>)}
          </ul>
        </div>
      </section>

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

      <section className="aa-more sec lt" aria-labelledby="fd-press-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="fd-press-h">Press and talks<span className="dot">.</span></h2><p>Interviews, features and events.</p></div>
          <ul className="aa-more-grid">
            {p.press.map((x) => {
              const ext = x.href.startsWith('http');
              return <li key={x.href}><a href={x.href} {...(ext && { target: '_blank', rel: 'noopener' })}><span className="mono">{x.source || (ext ? 'The Morning' : 'Paralox Pulse')}</span><b>{x.name}</b><i className="arr" aria-hidden="true">{ext ? '↗' : '→'}</i></a></li>;
            })}
          </ul>
        </div>
      </section>

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
    </>
  );
}
