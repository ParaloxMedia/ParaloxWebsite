import { useRef, useState } from 'react';
import { CONTACT } from '../data/content';
import { APPLY_ENDPOINT, CAREER_FAQ, VACANCIES, WHY_JOIN } from '../data/careers';
import { Glass } from '../components/Glass';
import { prefersReducedMotion } from '../hooks/useHashRoute';
import '../styles/ratecard.css';
import '../styles/careers.css';

const OPEN_APPLICATION = 'Open application';
const MAX_CV_MB = 5;
const MAX_SAMPLE_MB = 10;
const CV_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const EXPERIENCE = ['Less than 1 year', '1–2 years', '2–3 years', '3–5 years', '5–8 years', '8+ years'];
const SOURCES = ['LinkedIn', 'Instagram', 'Facebook', 'TikTok', 'Paralox website', 'Referral', 'Other'];

const EMPTY = {
  fullName: '', email: '', phone: '', location: '', workSetup: 'Hybrid',
  position: '', experience: '', currentTitle: '', startDate: '', expectedSalary: '', employmentType: '',
  portfolioLink: '', linkedinUrl: '', source: '', referral: '',
  whyJoin: '', whyFit: '', proudProject: '', aiTools: '', comfortableFeedback: 'yes', ownEquipment: 'yes', additionalInfo: '',
};

const mb = (f) => (f ? f.size / 1024 / 1024 : 0);
// A File as plain base64 (no data: prefix), the format the Apps Script expects.
const toBase64 = (file) => new Promise((resolve, reject) => {
  if (!file) { resolve(''); return; }
  const r = new FileReader();
  r.onload = () => resolve(String(r.result).split(',')[1] || '');
  r.onerror = () => reject(r.error);
  r.readAsDataURL(file);
});

function FileField({ id, label, hint, accept, file, onFile, error }) {
  const [drag, setDrag] = useState(false);
  return (
    <div className={`cr-field cr-full${error ? ' has-err' : ''}`}>
      <span className="cr-label">{label}</span>
      <label htmlFor={id} className={`cr-drop${drag ? ' drag' : ''}${file ? ' has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0] || null); }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {file ? <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 14l2 2 4-4" /> : <path d="M12 16V4m0 0l-4 4m4-4l4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />}
        </svg>
        <span>{file ? <><b>{file.name}</b> · {mb(file).toFixed(1)} MB</> : <><b>Choose a file</b> or drag it here</>}</span>
        <small>{hint}</small>
        <input id={id} type="file" accept={accept} onChange={(e) => onFile(e.target.files[0] || null)} />
      </label>
      {file && <button type="button" className="cr-clear" onClick={() => onFile(null)}>Remove file</button>}
      {error && <span className="cr-err" role="alert">{error}</span>}
    </div>
  );
}

function ApplyForm({ formRef, position, setPosition }) {
  const [f, setF] = useState(EMPTY);
  const [cv, setCv] = useState(null);
  const [sample, setSample] = useState(null);
  const [agree, setAgree] = useState(false);
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const doneRef = useRef(null);

  const role = VACANCIES.find((v) => v.title === position);
  const portfolioRequired = position !== OPEN_APPLICATION && role?.portfolio !== false;
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const field = (k, label, props = {}, required = false) => (
    <div className={`cr-field${props.full ? ' cr-full' : ''}${errs[k] ? ' has-err' : ''}`}>
      <label className="cr-label" htmlFor={`cr-${k}`}>{label}{required && <i aria-hidden="true"> *</i>}</label>
      {props.area
        ? <textarea id={`cr-${k}`} value={f[k]} onChange={set(k)} rows={props.rows || 4} placeholder={props.placeholder} required={required} />
        : <input id={`cr-${k}`} type={props.type || 'text'} value={f[k]} onChange={set(k)} placeholder={props.placeholder} autoComplete={props.auto} inputMode={props.mode} required={required} />}
      {errs[k] && <span className="cr-err" role="alert">{errs[k]}</span>}
    </div>
  );
  const select = (k, label, options, required = false, value, onChange) => (
    <div className={`cr-field${errs[k] ? ' has-err' : ''}`}>
      <label className="cr-label" htmlFor={`cr-${k}`}>{label}{required && <i aria-hidden="true"> *</i>}</label>
      <select id={`cr-${k}`} value={value ?? f[k]} onChange={onChange || set(k)} required={required}>
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {errs[k] && <span className="cr-err" role="alert">{errs[k]}</span>}
    </div>
  );

  const validate = () => {
    const e = {};
    if (!f.fullName.trim()) e.fullName = 'Add your full name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Add a valid email address.';
    if (!/^\+?[\d\s()-]{7,}$/.test(f.phone.trim())) e.phone = 'Add a phone or WhatsApp number.';
    if (!f.location.trim()) e.location = 'Add your current city.';
    if (!position) e.position = 'Choose the role you are applying for.';
    if (portfolioRequired && !/^https?:\/\/\S+\.\S+/.test(f.portfolioLink.trim())) e.portfolioLink = 'Add a link to your portfolio or showreel (starting with https://).';
    if (!cv) e.cv = 'Attach your CV.';
    else if (!CV_TYPES.includes(cv.type) && !/\.(pdf|docx?)$/i.test(cv.name)) e.cv = 'The CV must be a PDF or Word file.';
    else if (mb(cv) > MAX_CV_MB) e.cv = `The CV must be under ${MAX_CV_MB} MB.`;
    if (sample && mb(sample) > MAX_SAMPLE_MB) e.sample = `The file must be under ${MAX_SAMPLE_MB} MB. Share larger work as a link.`;
    if (!f.whyJoin.trim()) e.whyJoin = 'Tell us briefly why you want to join.';
    if (!agree) e.agree = 'Please confirm your details are accurate.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) {
      const first = formRef.current?.querySelector('.has-err input, .has-err select, .has-err textarea, .has-err .cr-drop');
      first?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
      first?.focus?.({ preventScroll: true });
      return;
    }
    setStatus('sending');
    try {
      const [cvB64, sampleB64] = await Promise.all([toBase64(cv), toBase64(sample)]);
      // text/plain keeps this a "simple" request (no CORS preflight); the script parses the JSON body.
      const res = await fetch(APPLY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...f, position,
          cv: cvB64, cvName: cv.name, cvType: cv.type || 'application/pdf',
          ...(sample && { workSamples: sampleB64, workSamplesName: sample.name, workSamplesType: sample.type || 'application/octet-stream' }),
          submittedAt: new Date().toISOString(),
        }),
      });
      const out = await res.json().catch(() => ({}));
      // The script always answers 200; failures are reported in the message.
      if (!res.ok || /error/i.test(out.message || '')) throw new Error(out.message || `HTTP ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
    requestAnimationFrame(() => doneRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' }));
  };

  if (status === 'sent') {
    return (
      <div className="cr-done" ref={doneRef} role="status">
        <span className="cr-done-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
        <h3>Application sent<span className="dot">.</span></h3>
        <p>Thank you, {f.fullName.split(' ')[0]}. Your application for <b>{position}</b> is with our team, and a confirmation is on its way to {f.email}. We shortlist within 3 to 5 working days.</p>
        <button type="button" className="btn btn-primary" onClick={() => { setF(EMPTY); setCv(null); setSample(null); setAgree(false); setPosition(''); setStatus('idle'); }}>Apply for another role <span className="arr">→</span></button>
      </div>
    );
  }

  return (
    <form className="cr-form" ref={formRef} onSubmit={submit} noValidate>
      <fieldset>
        <legend><span className="mono">01</span>About you</legend>
        <div className="cr-grid">
          {field('fullName', 'Full name', { auto: 'name' }, true)}
          {field('email', 'Email', { type: 'email', auto: 'email' }, true)}
          {field('phone', 'Phone / WhatsApp', { type: 'tel', auto: 'tel', mode: 'tel', placeholder: '+94 7X XXX XXXX' }, true)}
          {field('location', 'Current city', { auto: 'address-level2', placeholder: 'Colombo' }, true)}
          <div className="cr-field cr-full">
            <span className="cr-label">Preferred work setup</span>
            <div className="cr-pills" role="radiogroup" aria-label="Preferred work setup">
              {['On-site', 'Hybrid', 'Remote'].map((o) => (
                <button key={o} type="button" role="radio" aria-checked={f.workSetup === o} className={f.workSetup === o ? 'on' : undefined} onClick={() => setF((v) => ({ ...v, workSetup: o }))}>{o}</button>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend><span className="mono">02</span>The role</legend>
        <div className="cr-grid">
          {select('position', 'Role', [...VACANCIES.map((v) => v.title), OPEN_APPLICATION], true, position, (e) => setPosition(e.target.value))}
          {select('employmentType', 'Employment type', ['Full-time', 'Part-time', 'Freelance', 'Internship'])}
          {select('experience', 'Years of experience', EXPERIENCE)}
          {field('currentTitle', 'Current job title', { placeholder: 'Or “Student”' })}
          {field('startDate', 'Earliest start date', { type: 'date' })}
          {field('expectedSalary', 'Expected monthly salary', { placeholder: 'LKR' })}
        </div>
      </fieldset>

      <fieldset>
        <legend><span className="mono">03</span>Your work</legend>
        <div className="cr-grid">
          {field('portfolioLink', portfolioRequired ? 'Portfolio or showreel link' : 'Portfolio link (optional)', { type: 'url', placeholder: 'https://' }, portfolioRequired)}
          {field('linkedinUrl', 'LinkedIn (optional)', { type: 'url', placeholder: 'https://linkedin.com/in/…' })}
          <FileField id="cr-cv" label="CV *" hint={`PDF or Word, up to ${MAX_CV_MB} MB`} accept=".pdf,.doc,.docx" file={cv} onFile={setCv} error={errs.cv} />
          <FileField id="cr-sample" label="Work sample (optional)" hint={`Any file up to ${MAX_SAMPLE_MB} MB. Larger work? Add a link above.`} file={sample} onFile={setSample} error={errs.sample} />
        </div>
      </fieldset>

      <fieldset>
        <legend><span className="mono">04</span>A few questions</legend>
        <div className="cr-grid">
          {field('whyJoin', 'Why do you want to join Paralox Media?', { area: true, full: true }, true)}
          {field('whyFit', 'What makes you a good fit for this role?', { area: true, full: true })}
          {field('proudProject', 'A project you are proud of, and your part in it', { area: true, full: true })}
          {field('aiTools', 'Which AI tools do you use in your work?', { full: true, placeholder: 'Or “None yet”' })}
          <div className="cr-field">
            <span className="cr-label">Comfortable with feedback and deadlines?</span>
            <div className="cr-pills">{['yes', 'no'].map((o) => <button key={o} type="button" aria-pressed={f.comfortableFeedback === o} className={f.comfortableFeedback === o ? 'on' : undefined} onClick={() => setF((v) => ({ ...v, comfortableFeedback: o }))}>{o === 'yes' ? 'Yes' : 'No'}</button>)}</div>
          </div>
          <div className="cr-field">
            <span className="cr-label">Do you have your own equipment and software?</span>
            <div className="cr-pills">{['yes', 'no'].map((o) => <button key={o} type="button" aria-pressed={f.ownEquipment === o} className={f.ownEquipment === o ? 'on' : undefined} onClick={() => setF((v) => ({ ...v, ownEquipment: o }))}>{o === 'yes' ? 'Yes' : 'No'}</button>)}</div>
          </div>
          {select('source', 'Where did you hear about this role?', SOURCES)}
          {f.source === 'Referral' ? field('referral', 'Who referred you?') : <div className="cr-field cr-spacer" aria-hidden="true" />}
          {field('additionalInfo', 'Anything else? (optional)', { area: true, full: true, rows: 3 })}
        </div>
      </fieldset>

      <label className={`cr-check${errs.agree ? ' has-err' : ''}`}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>The information I have given is accurate, and Paralox Media may contact me about this application.</span>
      </label>
      {errs.agree && <span className="cr-err" role="alert">{errs.agree}</span>}

      <div className="cr-submit-row">
        <button className="btn btn-primary cr-submit" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? <><span className="cr-spin" aria-hidden="true" /> Sending your application…</> : <>Submit application <span className="arr">→</span></>}
        </button>
        <small>Your CV goes straight to our hiring team. Nothing is shared outside Paralox Media.</small>
      </div>
      {status === 'failed' && (
        <div className="cr-fail" ref={doneRef} role="alert">
          <b>We could not send your application just now.</b>
          <span>Please try again in a minute, or email your CV and portfolio to <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Application: ${position}`)}`}>{CONTACT.email}</a> with the role in the subject.</span>
        </div>
      )}
    </form>
  );
}

/** /careers: open roles and the application form (applications land in Google Drive). */
export default function Careers() {
  const [position, setPosition] = useState('');
  const [open, setOpen] = useState(VACANCIES[0]?.id);
  const formRef = useRef(null);
  const applyRef = useRef(null);

  const applyFor = (title) => {
    setPosition(title);
    applyRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => formRef.current?.querySelector('#cr-fullName')?.focus({ preventScroll: true }), prefersReducedMotion() ? 0 : 700);
  };

  return (
    <>
      <header className="rc-hero wk-hero cr-hero" data-parallax>
        <div className="gridlines" />
        <span className="wk-orb" aria-hidden="true" />
        <div className="wrap">
          <p className="rc-kick fu" style={{ '--d': '.05s' }}>Paralox Media · Careers</p>
          <h1 className="fu" style={{ '--d': '.15s' }}>Build the future with us<span className="dot">.</span></h1>
          <p className="rc-tagline fu" style={{ '--d': '.28s' }}>We are a creative technology team in Colombo, working across AI, engineering, media and growth for brands like Renault, Nissan and Keells. We are hiring at junior level: if you are starting out and want your work to be seen, join us.</p>
          <dl className="wk-stats fu" style={{ '--d': '.4s' }}>
            <div><dt>{VACANCIES.length}</dt><dd>Open roles</dd></div>
            <div><dt>3–5</dt><dd>Days to shortlist</dd></div>
            <div><dt>Colombo</dt><dd>Remote · Hybrid</dd></div>
          </dl>
          <div className="rc-hero-actions fu" style={{ '--d': '.5s' }}>
            <a className="btn btn-white" href="#roles">See open roles <span className="arr">↓</span></a>
            <button type="button" className="link cr-link-btn" onClick={() => applyFor(OPEN_APPLICATION)}>Send an open application <span className="arr">→</span></button>
          </div>
        </div>
      </header>

      <section className="cr-why sec lt" aria-labelledby="cr-why-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="cr-why-h">Why Paralox<span className="dot">.</span></h2><p>Small team, real clients, and work that ships: TV commercials, platforms and campaigns people actually see.</p></div>
          <ul className="cr-why-grid">
            {WHY_JOIN.map((w) => (
              <li key={w.title}><Glass glyph={w.glyph} className="ic" /><b>{w.title}</b><p>{w.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cr-roles sec lt" id="roles" aria-labelledby="cr-roles-h">
        <div className="wrap">
          <div className="sec-head"><h2 className="d-m" id="cr-roles-h">Open roles<span className="dot">.</span></h2><p>Junior roles for people early in their careers. Open a role for the details, then apply in one step.</p></div>
          <div className="cr-list">
            {VACANCIES.map((v) => {
              const isOpen = open === v.id;
              return (
                <article key={v.id} className={`cr-role${isOpen ? ' open' : ''}`} id={`role-${v.id}`}>
                  <button type="button" className="cr-role-head" aria-expanded={isOpen} aria-controls={`role-body-${v.id}`} onClick={() => setOpen(isOpen ? null : v.id)}>
                    <span className="cr-role-title">
                      <span className="cr-tags"><span className="mono">{v.team}</span>{v.urgent && <span className="cr-urgent mono">Hiring now</span>}</span>
                      <b>{v.title}</b>
                    </span>
                    <span className="cr-meta"><span>{v.type}</span><span>{v.location}</span></span>
                    <span className="cr-plus" aria-hidden="true" />
                  </button>
                  <div className="cr-role-body" id={`role-body-${v.id}`} hidden={!isOpen}>
                    <p>{v.summary}</p>
                    <span className="mono">What you bring</span>
                    <ul>{v.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                    <button type="button" className="btn btn-primary" onClick={() => applyFor(v.title)}>Apply for this role <span className="arr">→</span></button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cr-apply sec" id="apply" ref={applyRef} aria-labelledby="cr-apply-h">
        <div className="wrap cr-apply-in">
          <div className="cr-apply-intro">
            <p className="rc-kick">Apply</p>
            <h2 className="d-m" id="cr-apply-h">Tell us about you<span className="dot">.</span></h2>
            <p>It takes about five minutes. Fields marked * are required.</p>
            <ol className="cr-steps">
              <li><span className="mono">01</span>You apply here</li>
              <li><span className="mono">02</span>We shortlist in 3–5 working days</li>
              <li><span className="mono">03</span>An interview or short task</li>
              <li><span className="mono">04</span>An offer</li>
            </ol>
          </div>
          <ApplyForm formRef={formRef} position={position} setPosition={setPosition} />
        </div>
      </section>

      <section className="faq sec lt" aria-labelledby="cr-faq-h">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <h2 className="d-l" id="cr-faq-h">Hiring,<br />answered<span className="dot">.</span></h2>
            <p>Anything else, write to <span className="copyable" style={{ color: 'var(--ink-text)', fontWeight: 700 }}>{CONTACT.email}</span>.</p>
          </div>
          <div className="faq-list">
            {CAREER_FAQ.map((f, i) => (
              <details className="qa" name="cr-faq" open={i === 0} key={f.q}>
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
