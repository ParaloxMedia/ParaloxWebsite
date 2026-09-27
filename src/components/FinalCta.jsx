import { useState } from 'react';
import { CONTACT } from '../data/content';
import { Curves } from './Glass';
import { copyText } from './Icons';

function CopyBtn({ value }) {
  const [label, setLabel] = useState('Copy');
  return (
    <button type="button" className="copy" onClick={() => copyText(value).then((ok) => { setLabel(ok ? 'Copied' : 'Select and copy'); setTimeout(() => setLabel('Copy'), 1600); })}>{label}</button>
  );
}

export default function FinalCta() {
  return (
    <section className="cta" id="finalCta">
      <Curves glowOpacity={0.55} />
      <div className="wrap">
        <h2 className="d-xl">Let's create the future together<span className="dot" style={{ color: 'var(--lilac)' }}>.</span></h2>
        <div className="cta-row">
          <a className="btn btn-white" href="/contact">Start a project <span className="arr">→</span></a>
          <div className="contact-line">
            <span className="copyable">{CONTACT.email} <CopyBtn value={CONTACT.email} /></span>
            <span className="copyable">{CONTACT.phone} <CopyBtn value={CONTACT.phoneRaw} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
