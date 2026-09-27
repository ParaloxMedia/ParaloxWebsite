import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, T } from '../../data';
import { FadeUp } from './FadeUp';
import { Chip, GradText, Heading } from './Atoms';

export function Testimonials({ dark }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const t   = TESTIMONIALS[idx];
  const bg  = dark ? 'rgba(34,31,44,.6)' : '#fff';
  const bd  = dark ? 'rgba(124,58,237,.13)' : 'rgba(124,58,237,.09)';

  return (
    <section style={{ padding: 'clamp(52px,7vw,76px) clamp(16px,5%,60px)', background: dark ? '#0D0820' : '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Chip text="Client Reviews" center />
            <Heading dark={dark} size="clamp(1.8rem,3.5vw,3rem)" center>
              What Our <GradText>Clients Say</GradText>
            </Heading>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }}
              style={{ maxWidth: 640, margin: '0 auto 28px', background: bg, border: `1px solid ${bd}`, borderRadius: 20, padding: 'clamp(18px,4vw,38px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: T.grad }} />
              <Quote size={24} color={T.p2} style={{ opacity: .3, marginBottom: 12 }} />
              <p style={{ fontSize: 'clamp(.9rem,1.8vw,1.06rem)', lineHeight: 1.85, color: dark ? '#C9C4D6' : '#3B2A5E', fontStyle: 'italic', marginBottom: 20, fontFamily: "'Satoshi',sans-serif" }}>"{t.t}"</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: T.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Satoshi',sans-serif", fontWeight: 800, fontSize: '.95rem' }}>{t.n[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontFamily: "'Satoshi',sans-serif", color: dark ? '#F7F6FA' : '#191720', fontSize: '.86rem' }}>{t.n}</div>
                    <div style={{ fontSize: '.72rem', color: dark ? '#A9A4B8' : '#6B6778', fontFamily: "'Satoshi',sans-serif" }}>{t.r} · {t.c}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>{[...Array(t.s)].map((_, i) => <Star key={i} size={12} fill="#7C3AED" color="#7C3AED" />)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeUp>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer', background: i === idx ? T.p1 : 'rgba(124,58,237,.2)', transition: 'all .3s' }} />
          ))}
        </div>

        {/* Mini cards */}
        <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13 }}>
          {TESTIMONIALS.slice(0, 3).map((item, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <motion.div whileHover={{ y: -4 }} onClick={() => setIdx(i)}
                style={{ padding: 15, borderRadius: 14, cursor: 'pointer', border: `1px solid ${i === idx ? T.p1 : bd}`, background: bg, transition: 'border-color .3s' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 7 }}>{[...Array(item.s)].map((_, j) => <Star key={j} size={10} fill="#7C3AED" color="#7C3AED" />)}</div>
                <p style={{ fontSize: '.78rem', lineHeight: 1.6, color: dark ? '#C9C4D6' : '#4A4658', marginBottom: 10, fontFamily: "'Satoshi',sans-serif", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{item.t}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: T.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '.75rem', fontFamily: "'Satoshi',sans-serif" }}>{item.n[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '.74rem', fontFamily: "'Satoshi',sans-serif", color: dark ? '#F7F6FA' : '#191720' }}>{item.n}</div>
                    <div style={{ fontSize: '.66rem', color: dark ? '#A9A4B8' : '#A9A4B8', fontFamily: "'Satoshi',sans-serif" }}>{item.c}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
