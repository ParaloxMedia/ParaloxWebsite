import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { TEAM_DATA, T } from '../../data';

export function TeamCarousel({ dark }) {
  const [cur, setCur] = useState(0);
  const total = TEAM_DATA.length;
  const next = useCallback(() => setCur(i => (i + 1) % total), [total]);
  const prev = () => setCur(i => (i - 1 + total) % total);

  useEffect(() => {
    const t = setInterval(next, 4200);
    return () => clearInterval(t);
  }, [next]);

  const bd  = dark ? 'rgba(124,58,237,.18)' : 'rgba(124,58,237,.12)';
  const cBg = dark ? 'rgba(34,31,44,.92)'    : '#fff';

  return (
    <div style={{ position: 'relative', width: '100%', padding: '20px 0 48px' }}>
      {/* 3-D Stage */}
      <div style={{ position: 'relative', height: 'clamp(520px,55vw,520px)', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1100px', overflow: 'hidden' }}>
        {TEAM_DATA.map((m, i) => {
          let pos = i - cur;
          if (pos > Math.floor(total / 2)) pos -= total;
          if (pos < -Math.floor(total / 2)) pos += total;
          const isCenter = pos === 0;
          const isAdj    = Math.abs(pos) === 1;

          return (
            <motion.div key={i}
              animate={{
                x: `${pos * 46}%`,
                scale: isCenter ? 1 : isAdj ? 0.78 : 0.55,
                rotateY: `${pos * -13}deg`,
                zIndex: isCenter ? 10 : isAdj ? 5 : 1,
                opacity: isCenter ? 1 : isAdj ? 0.28 : 0,
                filter: isCenter ? 'blur(0px)' : 'blur(3px)',
              }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', width: 'clamp(260px,38vw,340px)', cursor: isAdj ? 'pointer' : 'default', visibility: Math.abs(pos) > 2 ? 'hidden' : 'visible' }}
              onClick={() => isAdj && setCur(i)}
            >
              <div style={{ borderRadius: 22, overflow: 'hidden', background: isCenter ? cBg : dark ? 'rgba(34,31,44,.7)' : 'rgba(247,246,250,.85)', border: isCenter ? `2px solid ${m.accentColor}44` : `1px solid ${bd}`, boxShadow: isCenter ? '0 28px 64px rgba(124,58,237,.24)' : 'none', transition: 'background .3s' }}>
                {/* Header */}
                <div style={{ height: 190, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.image ? 'transparent' : m.grad }}>
                  {m.image ? (
                    <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  ) : (
                    <>
                      <div style={{ position: 'absolute', inset: 0, opacity: .09, backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,1) 0,rgba(255,255,255,1) 1px,transparent 0,transparent 50%)', backgroundSize: '14px 14px' }} />
                      <div style={{ position: 'absolute', bottom: -44, left: -44, width: 190, height: 190, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
                      <div style={{ position: 'absolute', top: -32, right: -32, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ width: 82, height: 82, borderRadius: '50%', background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: '1.55rem', border: '2px solid rgba(255,255,255,.32)', boxShadow: '0 8px 24px rgba(0,0,0,.28)' }}>
                          {m.initials}
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(255,255,255,.14)', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 148, height: 148, borderRadius: '50%', border: '1px solid rgba(255,255,255,.07)', pointerEvents: 'none' }} />
                      </div>
                    </>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,0,0,.72),transparent)', padding: '18px 16px 12px', zIndex: 3 }}>
                    <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: 'white', lineHeight: 1.2 }}>{m.name}</div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.68)', fontFamily: "'Satoshi',sans-serif", marginTop: 1 }}>{m.role}</div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: '16px 16px 18px' }}>
                  <p style={{ fontSize: '.82rem', lineHeight: 1.72, color: dark ? '#C9C4D6' : '#4A4658', marginBottom: 12, fontFamily: "'Satoshi',sans-serif" }}>{m.bio}</p>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: m.link || m.stats ? 12 : 0 }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ padding: '2px 9px', borderRadius: 20, background: 'rgba(124,58,237,.09)', color: T.p1, fontSize: '.68rem', fontWeight: 700, fontFamily: "'Satoshi',sans-serif" }}>{t}</span>
                    ))}
                  </div>
                  {m.stats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 10, paddingTop: 10, borderTop: `1px solid ${bd}` }}>
                      {m.stats.map(([n, l]) => (
                        <div key={l} style={{ textAlign: 'center' }}>
                          <div style={{ fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: '1.05rem', color: T.violet }}>{n}</div>
                          <div style={{ fontSize: '.62rem', color: dark ? '#A9A4B8' : '#6B6778', fontFamily: "'Satoshi',sans-serif" }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.76rem', fontWeight: 700, color: T.p1, textDecoration: 'none', fontFamily: "'Satoshi',sans-serif" }}>
                      <ExternalLink size={12} /> View Portfolio
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prev / Next */}
      <button onClick={prev} style={{ position: 'absolute', left: 'clamp(2px,1.5vw,14px)', top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', border: `1px solid ${bd}`, background: dark ? 'rgba(34,31,44,.85)' : 'rgba(255,255,255,.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.p1, zIndex: 20, backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(124,58,237,.18)' }}>
        <ChevronLeft size={17} />
      </button>
      <button onClick={next} style={{ position: 'absolute', right: 'clamp(2px,1.5vw,14px)', top: '50%', transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', border: `1px solid ${bd}`, background: dark ? 'rgba(34,31,44,.85)' : 'rgba(255,255,255,.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.p1, zIndex: 20, backdropFilter: 'blur(8px)', boxShadow: '0 4px 14px rgba(124,58,237,.18)' }}>
        <ChevronRight size={17} />
      </button>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {TEAM_DATA.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 22 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', background: i === cur ? T.p1 : 'rgba(124,58,237,.22)', transition: 'all .3s' }} />
        ))}
      </div>
    </div>
  );
}
