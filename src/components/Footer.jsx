import logoWhite from '../assets/img/logo-white.png';
import { CONTACT } from '../data/content';
import { Fragment } from 'react';
import { Star } from './Glass';
import { MailIcon, PhoneIcon, PinIcon, Socials } from './Icons';

const PILLARS = [{ t: 'AI' }, { t: 'Engineering', o: true }, { t: 'Media' }, { t: 'Growth', o: true }];

export default function Footer() {
  return (
    <footer>
      <div className="foot-tk">
        <div className="tk-track">
          {[0, 1, 2, 3].map((k) => (
            <div className="tk-row" key={k} aria-hidden={k > 0 || undefined}>
              {PILLARS.map((w) => <Fragment key={w.t}><span className={w.o ? 'o' : undefined}>{w.t}</span><Star /></Fragment>)}
            </div>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="foot">
          <div>
            <img src={logoWhite} alt="Paralox Media" width="128" height="32" />
            <p style={{ margin: 0, maxWidth: '22rem' }}>A creative technology company building intelligent systems, experiences and media for the next generation of businesses.</p>
            <Socials />
          </div>
          <div><h4>Services</h4><ul><li><a href="#ai">AI</a></li><li><a href="#engineering">Engineering</a></li><li><a href="#media">Media</a></li><li><a href="#growth">Growth</a></li></ul></div>
          <div><h4>Company</h4><ul><li><a href="#about">About</a></li><li><a href="#pulse">Pulse</a></li><li><a href="#contact">Contact</a></li></ul></div>
          <div><h4>Contact</h4><ul className="foot-contact">
            <li><MailIcon /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li><PhoneIcon /><a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a></li>
            <li><PinIcon /><a href={CONTACT.mapUrl} target="_blank" rel="noopener">{CONTACT.addressLines[0]}<br />{CONTACT.addressLines[1]}</a></li>
          </ul></div>
        </div>
        <div className="foot-bottom mono"><span>© 2026 {CONTACT.company}</span></div>
      </div>
    </footer>
  );
}
