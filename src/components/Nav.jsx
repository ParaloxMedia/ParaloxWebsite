import { useEffect, useRef, useState } from 'react';
import logoWhite from '../assets/img/logo-white.png';
import logoPurple from '../assets/img/logo-purple.png';
import { DROPDOWN } from '../data/content';
import { Glass } from './Glass';
import { prefersReducedMotion } from '../hooks/useHashRoute';

const LINKS = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about', label: 'About', key: 'about' },
  { dropdown: true },
  { href: '/pulse', label: 'Pulse', key: 'pulse' },
  { href: '/contact', label: 'Contact', key: 'contact' },
];
const PILLAR_KEYS = ['ai', 'engineering', 'media', 'growth'];

/** Floating white "notch" navigation with Services dropdown, scroll progress and mobile menu. */
export default function Nav({ active, lightTop, tick = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dd, setDd] = useState(false);
  const [menu, setMenu] = useState(false);
  const [intro] = useState(() => !prefersReducedMotion());
  const liRef = useRef(null), tmr = useRef(null);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY || 0; setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [active]);

  useEffect(() => { setDd(false); setMenu(false); }, [active, tick]);

  useEffect(() => {
    const onDoc = (e) => { if (liRef.current && !liRef.current.contains(e.target)) setDd(false); };
    const onKey = (e) => { if (e.key === 'Escape') setDd(false); };
    document.addEventListener('click', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  const hoverable = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const open = () => { clearTimeout(tmr.current); setDd(true); };
  const close = () => { tmr.current = setTimeout(() => setDd(false), 160); };
  const solid = scrolled || lightTop;

  return (
    <header className={`nav${intro ? ' intro' : ''}${scrolled ? ' scrolled' : ''}${solid ? ' solid' : ''}`} id="nav" style={{ '--p': progress.toFixed(4) }}>
      <a className="logo" href="/" aria-label="Paralox Media home">
        <img className="lw" src={logoWhite} alt="Paralox Media" width="120" height="30" />
        <img className="lp" src={logoPurple} alt="" width="120" height="30" />
      </a>
      <nav className="notch" aria-label="Primary">
        <ul>
          {LINKS.map((l, i) => l.dropdown ? (
            <li key="dd" className="has-dd" ref={liRef} onPointerEnter={hoverable ? open : undefined} onPointerLeave={hoverable ? close : undefined}>
              <button type="button" className={`dd-btn${PILLAR_KEYS.includes(active) ? ' is-active' : ''}`} aria-expanded={dd} aria-controls="ddServices" onClick={(e) => { e.stopPropagation(); setDd((v) => !v); }}>
                Services <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" /></svg>
              </button>
              {dd && (
                <div className="dd" id="ddServices">
                  <div className="dd-grid">
                    {DROPDOWN.map((d) => (
                      <a key={d.href} className="dd-item" href={d.href}><Glass glyph={d.glyph} /><b>{d.title}</b><small>{d.text}</small></a>
                    ))}
                  </div>
                  <a className="dd-foot" href="/services"><span>Four pillars, one connected team.</span><span className="link">See how they work together <span className="arr">→</span></span></a>
                </div>
              )}
            </li>
          ) : (
            <li key={l.key}><a href={l.href} aria-current={active === l.key ? 'page' : undefined}>{l.label}</a></li>
          ))}
        </ul>
        <span className="prog" aria-hidden="true" />
      </nav>
      <a className="btn btn-primary nav-cta" href="/contact">Start a project <span className="arr">→</span></a>
      <button className="menu-btn" aria-expanded={menu} aria-controls="mobileMenu" aria-label="Open menu" onClick={() => setMenu((v) => !v)}><span /></button>
      {menu && (
        <div className="mobile-menu" id="mobileMenu">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <span className="mm-label mono">Services</span>
          <div className="mm-sub"><a href="/ai">AI</a><a href="/engineering">Engineering</a><a href="/media">Media</a><a href="/growth">Growth</a></div>
          <a href="/pulse">Pulse</a>
          <a href="/contact">Contact</a>
          <a className="btn btn-primary" href="/contact">Start a project <span className="arr">→</span></a>
        </div>
      )}
    </header>
  );
}
