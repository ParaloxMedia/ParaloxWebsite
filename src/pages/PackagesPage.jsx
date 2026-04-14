import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Brain, Code2, Video, Sparkles, Search, Layers } from 'lucide-react';
import { T, SMM_PACKAGES, DM_PACKAGES, STARTUP_PACKAGES } from '../data';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';

const CUSTOM = [
  { icon: <Brain size={22}/>,    t: 'AI Agent Development',    d: 'Custom AI agents for customer support, lead gen, and task automation.',           c: '#5B1DE8' },
  { icon: <Code2 size={22}/>,    t: 'Website & App Development',d: 'From landing pages to full eCommerce platforms and mobile apps.',                  c: '#7C3AED' },
  { icon: <Video size={22}/>,    t: 'Video Production',         d: 'Cinematic brand videos, product promos, social reels, and ad creatives.',          c: '#8B52F7' },
  { icon: <Sparkles size={22}/>, t: 'Prompt Engineering',       d: 'AI-generated videos, music, creative content, and brand assets.',                   c: '#A855F7' },
  { icon: <Search size={22}/>,   t: 'SEO & GEO Targeting',      d: 'Strategic content and technical SEO to rank locally and globally.',                 c: '#6D28D9' },
  { icon: <Layers size={22}/>,   t: 'Brand Identity & Design',  d: 'Logo, brand guidelines, templates, and visual identity systems.',                   c: '#0891B2' },
];

function PkgCard({ p, dark }) {
  const navigate = useNavigate();
  const bd  = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.08)';
  const bg  = dark ? 'rgba(12,4,26,.92)'    : '#fff';

  const badgeBg = p.badge === 'Most Popular' || p.badge === 'Popular' || p.badge === 'Best Value'
    ? 'linear-gradient(135deg,#FF6BFF,#5B1DE8)'
    : p.badge === 'Startup Special'
      ? 'linear-gradient(135deg,#22C55E,#16A34A)'
      : 'linear-gradient(135deg,#60EFFF,#5B1DE8)';

  return (
    <motion.div whileHover={{ y: -6 }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'clamp(18px,2.5vw,24px) clamp(14px,2vw,20px)', borderRadius: 18, position: 'relative', overflow: 'hidden', border: p.feat ? `2px solid ${T.p1}` : `1px solid ${bd}`, background: p.feat ? 'linear-gradient(150deg,#5B1DE8,#7C3AED)' : bg, boxShadow: p.feat ? '0 16px 48px rgba(91,29,232,.3)' : 'none' }}>
      {p.badge && <div style={{ position: 'absolute', top: 12, right: 12, padding: '3px 9px', borderRadius: 20, fontSize: '.62rem', fontWeight: 800, background: badgeBg, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.badge}</div>}
      <div style={{ fontSize: '.64rem', fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', color: p.feat ? 'rgba(255,255,255,.5)' : '#9B8BC0', marginBottom: 3, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.sub}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(.98rem,1.8vw,1.12rem)', color: p.feat ? '#fff' : dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 5 }}>{p.n}</div>
      <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,1.85rem)', lineHeight: 1.1, marginBottom: 3, ...(p.feat ? { color: '#fff' } : { background: `linear-gradient(135deg,${T.p1},${T.p3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }) }}>LKR {p.price.toLocaleString()}</div>
      <div style={{ fontSize: '.7rem', color: p.feat ? 'rgba(255,255,255,.5)' : '#9B8BC0', marginBottom: 13, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>/month</div>
      <div style={{ height: 1, background: p.feat ? 'rgba(255,255,255,.17)' : bd, marginBottom: 13 }} />
      <div style={{ flex: 1 }}>
        {p.feats.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 8 }}>
            <CheckCircle2 size={12} color={p.feat ? 'rgba(255,255,255,.7)' : T.p1} style={{ marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 'clamp(.77rem,1.4vw,.81rem)', color: p.feat ? 'rgba(255,255,255,.82)' : dark ? '#B8A0D8' : '#5B4080', lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f}</span>
          </div>
        ))}
      </div>
      <motion.button whileTap={{ scale: .97 }} onClick={() => navigate('/contact')}
        style={{ width: '100%', marginTop: 14, padding: '10px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.84rem', transition: 'all .25s', ...(p.feat ? { background: 'rgba(255,255,255,.17)', color: '#fff', border: '2px solid rgba(255,255,255,.3)' } : { background: 'transparent', border: `2px solid ${T.p1}`, color: T.p1 }) }}
        onMouseOver={e => { if (!p.feat) { e.currentTarget.style.background = T.p1; e.currentTarget.style.color = '#fff'; } }}
        onMouseOut={e  => { if (!p.feat) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.p1; } }}>
        Get Started
      </motion.button>
    </motion.div>
  );
}

export function PackagesPage({ dark }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.08)';

  const tabs = ['SMM Plans', 'Digital Marketing', 'Startup Special', 'Custom Services'];

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px,5%,60px)' }}>

        <FadeUp>
          <Chip text="Pricing Plans" />
          <Heading dark={dark} size="clamp(1.9rem,3.8vw,3.2rem)">Choose Your <GradText>Package</GradText></Heading>
          <p style={{ color: dark ? '#B8A0D8' : '#5B4080', maxWidth: 480, marginTop: 10, marginBottom: 24, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.84rem,1.8vw,.95rem)' }}>All packages customisable. Currency auto-detected by location.</p>
        </FadeUp>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {tabs.map((t, i) => (
            <motion.button key={t} whileTap={{ scale: .97 }} onClick={() => setTab(i)}
              style={{ padding: '8px 17px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.82rem', transition: 'all .25s', ...(tab === i ? { background: T.grad, color: '#fff', border: 'none', boxShadow: '0 5px 16px rgba(91,29,232,.3)' } : { background: 'transparent', border: `2px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.14)'}`, color: dark ? '#B8A0D8' : '#5B4080' }) }}>
              {t}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 11 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {tab === 0 && (
              <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 15, alignItems: 'stretch' }}>
                {SMM_PACKAGES.map((p, i) => <FadeUp key={p.n} delay={i * 0.06} style={{ height: '100%' }}><PkgCard p={p} dark={dark} /></FadeUp>)}
              </div>
            )}
            {tab === 1 && (
              <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 15, alignItems: 'stretch' }}>
                {DM_PACKAGES.map((p, i) => <FadeUp key={p.n} delay={i * 0.06} style={{ height: '100%' }}><PkgCard p={p} dark={dark} /></FadeUp>)}
              </div>
            )}
            {tab === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, maxWidth: 600, alignItems: 'stretch' }} className="g1">
                {STARTUP_PACKAGES.map((p, i) => <FadeUp key={p.n} delay={i * 0.06} style={{ height: '100%' }}><PkgCard p={p} dark={dark} /></FadeUp>)}
              </div>
            )}
            {tab === 3 && (
              <div>
                <p style={{ color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 22, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.86rem,1.8vw,.94rem)', lineHeight: 1.75, maxWidth: 540 }}>
                  These services are fully custom-scoped. Pricing is determined after consultation.
                </p>
                <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  {CUSTOM.map(({ icon, t, d, c }, i) => (
                    <FadeUp key={t} delay={i * 0.06}>
                      <motion.div whileHover={{ y: -4 }} style={{ padding: '20px 18px', border: `1px solid ${bd}`, borderRadius: 14, background: dark ? 'rgba(20,8,44,.5)' : '#fff', display: 'flex', gap: 13, alignItems: 'flex-start', height: '100%' }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${c},${c}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: `0 5px 15px ${c}44` }}>{icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: 5, fontSize: '.9rem', fontFamily: "'Plus Jakarta Sans',sans-serif", color: dark ? '#F0E8FF' : '#1A0A2E' }}>{t}</div>
                          <div style={{ fontSize: '.8rem', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.7, marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{d}</div>
                          <motion.button whileHover={{ y: -1 }} onClick={() => navigate('/contact')}
                            style={{ padding: '6px 14px', borderRadius: 50, cursor: 'pointer', border: `2px solid ${c}`, background: 'transparent', color: c, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.75rem', display: 'flex', alignItems: 'center', gap: 5, transition: 'all .25s' }}
                            onMouseOver={e => { e.currentTarget.style.background = c; e.currentTarget.style.color = '#fff'; }}
                            onMouseOut={e  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c; }}>
                            Get a Quote <ArrowRight size={11} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <FadeUp delay={0.14}>
          <div style={{ marginTop: 24, padding: '13px 18px', borderRadius: 12, background: 'rgba(91,29,232,.05)', border: `1px solid ${bd}`, textAlign: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.82rem,1.8vw,.87rem)', color: dark ? '#B8A0D8' : '#5B4080' }}>
            All packages customisable <span onClick={() => navigate('/contact')} style={{ color: T.p1, fontWeight: 700, cursor: 'pointer' }}>Contact us</span> for a tailored solution.
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
