import { Fragment, useRef, useState } from 'react';
import { CONTACT } from '../data/content';
import { ArrowUpRight, BrandIcon, CopyIcon, MailIcon, PhoneIcon, PinIcon, Socials, copyText } from '../components/Icons';
import MapCard from '../components/MapCard';
import { prefersReducedMotion } from '../hooks/useHashRoute';

const PILLS = [
  { id: 'p-ai', value: 'AI' },
  { id: 'p-eng', value: 'Engineering' },
  { id: 'p-media', value: 'Media' },
  { id: 'p-growth', value: 'Growth' },
];

function Trace({ a = '.85', b = '.65' }) {
  return (
    <g className="c2-tr">
      <g stroke="url(#c2Fade)" strokeWidth="1.5">
        <path className="tr" d="M-12 100 H30 Q58 100 72 120 L100 160 Q114 180 142 180 H340" />
        <path className="tr t2" d="M-12 154 H8 Q36 154 50 174 L126 242 Q140 258 168 258 H352" opacity=".62" />
      </g>
      <circle className="nd" cx="166" cy="180" r="6" fill="#07040F" stroke={`rgba(233,227,250,${a})`} strokeWidth="1.5" />
      <circle className="nd n2" cx="320" cy="258" r="6" fill="#07040F" stroke={`rgba(201,181,255,${b})`} strokeWidth="1.5" />
    </g>
  );
}

function CopyGo({ value, label }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className={`c2-go copy-go${ok ? ' ok' : ''}`} aria-label={label}
      onClick={() => copyText(value).then((r) => { if (r) { setOk(true); setTimeout(() => setOk(false), 1400); } })}>
      <CopyIcon />
    </button>
  );
}

function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', phone: '', message: '' });
  const [needs, setNeeds] = useState([]);
  const [err, setErr] = useState('');
  const [txt, setTxt] = useState('');
  const [copyLabel, setCopyLabel] = useState('Copy message');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const doneRef = useRef(null);

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const toggle = (v) => setNeeds((n) => (n.includes(v) ? n.filter((x) => x !== v) : [...n, v]));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const name = f.name.trim(), email = f.email.trim(), phone = f.phone.trim(), msg = f.message.trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) { setErr('Add your name, a valid email and a short message.'); return; }
    if (phone && !/^\+?[\d\s()-]{7,}$/.test(phone)) { setErr('Check the mobile number: digits, spaces and an optional + only.'); return; }
    setErr('');
    const ordered = PILLS.map((p) => p.value).filter((v) => needs.includes(v));
    const text = `Hello Paralox Media,\n\n${msg}\n\n${ordered.length ? `Interested in: ${ordered.join(', ')}\n` : ''}From: ${name} (${email}${phone ? `, ${phone}` : ''})`;
    setTxt(text);
    setStatus('sending');
    const reveal = () => requestAnimationFrame(() => doneRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' }));
    try {
      // Delivered by email to info@paraloxmedia.com; `email` becomes the reply-to address.
      const res = await fetch(CONTACT.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New enquiry from ${name} via paraloxmedia.com`,
          name, email, phone: phone || '—', interested_in: ordered.join(', ') || '—', message: msg,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setF({ name: '', email: '', phone: '', message: '' });
      setNeeds([]);
    } catch {
      setStatus('failed'); // keep the prepared message so it can still be sent another way
    }
    reveal();
  };

  return (
    <form className="c2-form" noValidate onSubmit={submit}>
      <label className="sr" htmlFor="c2-name">Name</label>
      <input className="c2-input" id="c2-name" name="name" placeholder="Name" autoComplete="name" value={f.name} onChange={set('name')} />
      <label className="sr" htmlFor="c2-email">Email</label>
      <input className="c2-input" id="c2-email" name="email" type="email" placeholder="Email" autoComplete="email" value={f.email} onChange={set('email')} />
      <label className="sr" htmlFor="c2-phone">Mobile number</label>
      <input className="c2-input" id="c2-phone" name="phone" type="tel" inputMode="tel" placeholder="Mobile number" autoComplete="tel" value={f.phone} onChange={set('phone')} />
      <fieldset className="c2-pills"><legend className="sr">Interested in</legend>
        {PILLS.map((p) => (
          <Fragment key={p.id}>
            <input type="checkbox" id={p.id} value={p.value} checked={needs.includes(p.value)} onChange={() => toggle(p.value)} />
            <label htmlFor={p.id}>{p.value}</label>
          </Fragment>
        ))}
      </fieldset>
      <label className="sr" htmlFor="c2-msg">Message</label>
      <textarea className="c2-input c2-area" id="c2-msg" name="message" placeholder="Message" value={f.message} onChange={set('message')} />
      {err && <p className="c2-err" role="alert">{err}</p>}
      <button className="c2-submit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'sent' && (
        <div className="c2-done c2-sent" ref={doneRef} role="status">
          <span className="mono">Message sent</span>
          <p>Thank you. Your message is with our team at {CONTACT.email}, and we will reply to the email you gave us.</p>
          <small>Need us sooner? <a href={CONTACT.whatsapp} target="_blank" rel="noopener">Message us on WhatsApp ↗</a></small>
        </div>
      )}
      {status === 'failed' && txt && (
        <div className="c2-done" ref={doneRef}>
          <span className="mono">We could not send it just now</span>
          <p className="c2-fail">Your message is below. Send it on WhatsApp, or copy it and email us.</p>
          <pre>{txt}</pre>
          <div className="c2-done-row">
            <a className="c2-submit c2-wa" href={`${CONTACT.whatsapp}?text=${encodeURIComponent(txt)}`} target="_blank" rel="noopener">Send on WhatsApp <span className="arr">↗</span></a>
            <button type="button" className="c2-ghost" onClick={() => copyText(txt).then((ok) => { setCopyLabel(ok ? 'Copied' : 'Select and copy'); setTimeout(() => setCopyLabel('Copy message'), 1600); })}>{copyLabel}</button>
          </div>
          <small>Or email it to <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry via paraloxmedia.com')}&body=${encodeURIComponent(txt)}`}>{CONTACT.email}</a></small>
        </div>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <section className="c2" aria-labelledby="c2Title">
      <div className="c2-glow" aria-hidden="true" />
      <div className="c2-glowLow" aria-hidden="true" />
      <div className="c2-vig" aria-hidden="true" />
      <div className="c2-grain" aria-hidden="true" />
      <svg className="c2-traces" viewBox="0 0 1600 900" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="c2Fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(233,227,250,.85)" /><stop offset=".45" stopColor="rgba(201,181,255,.55)" /><stop offset="1" stopColor="rgba(201,181,255,0)" />
          </linearGradient>
        </defs>
        <Trace />
        <g transform="translate(1600, 42) scale(-1, 1)"><Trace a=".8" b=".6" /></g>
      </svg>
      <span className="c2-watermark" aria-hidden="true">Contact</span>

      <div className="wrap c2-body">
        <div className="c2-left">
          <span className="c2-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.2" /><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" /></svg>Say hello</span>
          <h1 className="c2-title" id="c2Title">Let's build it<span className="dot">.</span></h1>
          <p className="c2-lede">Tell us what your business needs next, and we will show you how AI, engineering, media and growth can get it there.</p>
          <ul className="c2-channels">
            <li><a className="c2-ch" href={CONTACT.whatsapp} target="_blank" rel="noopener">
              <span className="c2-ico" aria-hidden="true"><BrandIcon name="whatsapp" /></span>
              <span className="c2-txt"><span className="c2-t">Chat on WhatsApp</span><span className="c2-v">{CONTACT.phone}</span></span>
              <span className="c2-go" aria-hidden="true"><ArrowUpRight /></span>
            </a></li>
            <li><div className="c2-ch">
              <span className="c2-ico" aria-hidden="true"><PhoneIcon /></span>
              <span className="c2-txt"><span className="c2-t">Call the hotline</span><span className="c2-v copyable">{CONTACT.phone}</span></span>
              <CopyGo value={CONTACT.phoneRaw} label="Copy phone number" />
            </div></li>
            <li><div className="c2-ch">
              <span className="c2-ico" aria-hidden="true"><MailIcon /></span>
              <span className="c2-txt"><span className="c2-t">Email the team</span><span className="c2-v copyable">{CONTACT.email}</span></span>
              <CopyGo value={CONTACT.email} label="Copy email address" />
            </div></li>
            <li><a className="c2-ch" href={CONTACT.mapUrl} target="_blank" rel="noopener">
              <span className="c2-ico" aria-hidden="true"><PinIcon /></span>
              <span className="c2-txt"><span className="c2-t">Visit Paralox HQ</span><span className="c2-v">{CONTACT.address}</span></span>
              <span className="c2-go" aria-hidden="true"><ArrowUpRight /></span>
            </a></li>
          </ul>
          <div className="c2-social"><span className="mono">Follow Paralox</span><Socials /></div>
        </div>
        <ContactForm />
      </div>

      <div className="wrap c2-map"><MapCard /></div>
    </section>
  );
}
