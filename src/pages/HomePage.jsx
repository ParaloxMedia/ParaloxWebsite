import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Rocket, Bot, Code2, Video, Megaphone, Search, BarChart2,
  ChevronRight, ChevronDown, ArrowRight, CheckCircle2,
  Users, TrendingUp, Globe, Zap
} from 'lucide-react';
import { T, TAGWORDS, PREVIEW_PACKAGES } from '../data';
import { FadeUp } from '../components/ui/FadeUp';
import { Chip, GradText, Heading } from '../components/ui/Atoms';
import { BrandSlider } from '../components/ui/BrandSlider';
import { Testimonials } from '../components/ui/Testimonials';

/* ─── HERO ──────────────────────────────────────────────────────────────── */
function HeroSection({ dark }) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const yOrb = useTransform(scrollY, [0, 600], [0, -90]);
  const opH  = useTransform(scrollY, [0, 400], [1, 0]);
  const scH  = useTransform(scrollY, [0, 400], [1, 0.95]);
  const [aw, setAw] = useState(-1);

  useEffect(() => {
    const ts = TAGWORDS.map((_, i) => setTimeout(() => setAw(i), 1400 + i * 520));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <section style={{ minHeight: '100vh', paddingTop: 150,paddingBottom: 100, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* BG */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(-45deg,#0C0524,#180A44,#2A0868,#0C0320,#180040,#4808C0,#0C0118)', backgroundSize: '400% 400%', animation: 'gradFlow 14s ease infinite' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: .12, backgroundImage: 'linear-gradient(rgba(139,82,247,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.4) 1px,transparent 1px)', backgroundSize: '72px 72px' }} />
      <motion.div className="og" style={{ position: 'absolute', top: '18%', left: '10%', width: 'min(460px,48vw)', height: 'min(460px,48vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,29,232,.44),transparent 68%)', zIndex: 1, pointerEvents: 'none', y: yOrb }} />
      <div style={{ position: 'absolute', bottom: '12%', right: '8%', width: 'min(320px,38vw)', height: 'min(320px,38vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(168,85,247,.28),transparent 68%)', zIndex: 1, pointerEvents: 'none', animation: 'orbGlow 5s ease-in-out 1.5s infinite' }} />
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', zIndex: 1, width: 3 + Math.random() * 4, height: 3 + Math.random() * 4, borderRadius: '50%', background: ['rgba(139,82,247,.7)', 'rgba(96,239,255,.6)', 'rgba(255,107,255,.5)'][i % 3], left: `${8 + i * 8.2}%`, top: `${14 + ((i * 43) % 68)}%`, animation: `particleDrift ${3 + i * .38}s ease-in-out ${i * .3}s infinite` }} />
      ))}

      <motion.div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(16px,5%,60px)', paddingBottom: 100, opacity: opH, scale: scH }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 24, background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.17)', borderRadius: 30, padding: '8px 20px', backdropFilter: 'blur(10px)' }}>
          <div className="bk" style={{ width: 7, height: 7, borderRadius: '50%', background: '#60EFFF', boxShadow: '0 0 8px #60EFFF' }} />
          <span style={{ fontSize: 'clamp(.62rem,.75vw,.75rem)', fontWeight: 700, color: 'rgba(255,255,255,.92)', letterSpacing: 2.5, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>paralox media • est. 2025</span>
        </motion.div>

        {/* Headlines */}
        <div style={{ overflow: 'hidden', maxWidth: 'min(1000px,92vw)', width: '100%', marginBottom: 4 }}>
          <motion.h1 className="hh" initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .32, duration: .72, ease: [.22, 1, .36, 1] }}
            style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 400, fontSize: 'clamp(2.1rem,6.5vw,5.8rem)', lineHeight: 1.05, letterSpacing: '-2px', color: 'rgba(255,255,255,.88)', margin: 0 }}>
            Building the Future of
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', maxWidth: 'min(1100px,92vw)', width: '100%', marginBottom: 28 }}>
          <motion.h1 className="hh" initial={{ opacity: 0, y: '110%' }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .72, ease: [.22, 1, .36, 1] }}
            style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2.1rem,6.5vw,5.8rem)', lineHeight: 1.05, letterSpacing: '-2.5px', color: '#fff', margin: 0 }}>
            <span style={{ background: 'linear-gradient(135deg,#60EFFF,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI-Powered</span> Business Solutions
          </motion.h1>
        </div>

        {/* Tag words */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px,2vw,28px)', marginBottom: 40, flexWrap: 'wrap', minHeight: 40 }}>
          {TAGWORDS.map((w, i) => (
            <AnimatePresence key={w}>
              {aw >= i && (
                <motion.span initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .54, ease: [.22, 1, .36, 1] }}
                  style={{ fontFamily: "'Outfit',sans-serif", fontSize: 'clamp(.92rem,2.2vw,1.45rem)', letterSpacing: '-.2px', color: i === 3 ? '#fff' : 'rgba(255,255,255,.5)', fontWeight: i === 3 ? 700 : 300, display: 'flex', alignItems: 'center', gap: 7 }}>
                  {i === 3 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .2, duration: .4 }} style={{ width: 22, height: 2, background: 'linear-gradient(90deg,#60EFFF,#A855F7)', borderRadius: 2, transformOrigin: 'left' }} />}
                  {w}
                </motion.span>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}
          className="hb" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          <motion.button whileHover={{ y: -3, boxShadow: '0 16px 44px rgba(255,255,255,.2)' }} whileTap={{ scale: .96 }} onClick={() => navigate('/services')}
            style={{ padding: 'clamp(12px,1.8vw,15px) clamp(22px,3.5vw,36px)', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#fff', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(.88rem,1.8vw,1rem)', display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 8px 28px rgba(0,0,0,.28)' }}>
            <Rocket size={16} /> Explore Services
          </motion.button>
          <motion.button whileHover={{ y: -2, background: 'rgba(255,255,255,.14)' }} whileTap={{ scale: .96 }} onClick={() => navigate('/contact')}
            style={{ padding: 'clamp(12px,1.8vw,15px) clamp(18px,3vw,32px)', borderRadius: 50, cursor: 'pointer', border: '1.5px solid rgba(255,255,255,.32)', background: 'rgba(255,255,255,.07)', color: 'white', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 'clamp(.88rem,1.8vw,1rem)', display: 'flex', alignItems: 'center', gap: 9, backdropFilter: 'blur(10px)' }}>
            Get a Quote <ChevronRight size={15} />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }}
          className="sr2" style={{ display: 'flex', gap: 'clamp(18px,4.5vw,60px)', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.1)', justifyContent: 'center' }}>
          {[['35+', 'Global Brands'], ['412%', 'Avg. ROI'], ['5+', 'Countries'], ['360°', 'Services']].map(([n, l], i) => (
            <motion.div key={l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.15 + i * .1 }} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,3.2vw,2.4rem)', color: 'white', lineHeight: 1.05, textShadow: '0 0 26px rgba(139,82,247,.5)' }}>{n}</div>
              <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginTop: 2, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.4 }}
          style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
          <span style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.22)', letterSpacing: 2.5, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronDown size={16} color="rgba(255,255,255,.22)" /></motion.div>
        </motion.div>
      </motion.div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, zIndex: 4, background: `linear-gradient(to bottom,transparent,${dark ? '#080510' : '#F8F5FF'})` }} />
    </section>
  );
}

/* ─── SERVICES GRID ──────────────────────────────────────────────────────── */
function ServicesGrid({ dark }) {
  const navigate = useNavigate();
  const bg = dark ? '#0A0616' : '#F8F5FF';
  const cBg = dark ? 'rgba(20,8,44,.6)' : '#fff';
  const bd  = dark ? 'rgba(139,82,247,.15)' : 'rgba(91,29,232,.1)';

  const services = [
    { icon: <Bot size={24}/>,      title: 'AI-Driven Marketing',      desc: 'Intelligent automation that drives campaigns, targets audiences, and maximises every rupee of your ad spend.',      color: '#5B1DE8', tag: 'AI Powered' },
    { icon: <Code2 size={24}/>,    title: 'Web & App Development',    desc: 'Custom platforms built for scale — eCommerce, corporate sites, and mobile apps that perform.',                    color: '#7C3AED', tag: 'Tech' },
    { icon: <Video size={24}/>,    title: 'Video Production',         desc: 'Cinematic reels, promo videos, and UGC content that stops the scroll and drives real action.',                      color: '#8B52F7', tag: 'Creative' },
    { icon: <Megaphone size={24}/>,title: 'Social Media Management',  desc: 'End-to-end social management — daily content, strategy, and community across every platform.',                    color: '#A855F7', tag: 'Social' },
    { icon: <Search size={24}/>,   title: 'SEO & GEO Targeting',      desc: 'Strategic, location-based SEO that puts your brand in front of the right audience, globally.',                    color: '#6D28D9', tag: 'Growth' },
    { icon: <BarChart2 size={24}/>,title: 'Performance Marketing',    desc: 'Data-driven ad campaigns on Google and Meta that convert browsers into buyers.',                                  color: '#7C3AED', tag: 'Paid Ads' },
  ];

  return (
    <section style={{ background: bg, padding: 'clamp(52px,7vw,88px) clamp(16px,5%,60px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ marginBottom: 44 }}>
            <Chip text="What We Do" />
            <Heading dark={dark} size="clamp(1.9rem,3.8vw,3rem)">
              AI-Powered Digital Services<br /><GradText>Built for Modern Businesses</GradText>
            </Heading>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', marginTop: 12, maxWidth: 520, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.8, fontSize: 'clamp(.86rem,1.8vw,.97rem)' }}>
              We combine artificial intelligence with creative strategy to deliver results that actually move the needle for your brand.
            </p>
          </div>
        </FadeUp>

        {/* Service cards */}
        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 28 }}>
          {services.map(({ icon, title, desc, color, tag }, i) => (
            <FadeUp key={title} delay={i * 0.065}>
              <motion.div whileHover={{ y: -6, boxShadow: `0 18px 44px ${color}20` }}
                style={{ padding: '24px 22px', borderRadius: 18, background: cBg, border: `1px solid ${bd}`, height: '100%' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: `linear-gradient(135deg,${color},${color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 14, boxShadow: `0 6px 18px ${color}55` }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 'clamp(.88rem,1.5vw,.96rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 7, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.35 }}>{title}</div>
                <div style={{ fontSize: 'clamp(.79rem,1.4vw,.85rem)', color: dark ? '#9B8BC0' : '#7B6A9A', lineHeight: 1.75, marginBottom: 11, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{desc}</div>
                <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: `${color}16`, color, fontWeight: 700, fontSize: '.68rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{tag}</span>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        {/* Stats */}
        <FadeUp delay={0.18}>
          <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {[{ icon: <Users size={20}/>, n: '35+', l: 'Global Brands', c: '#5B1DE8' }, { icon: <TrendingUp size={20}/>, n: '412%', l: 'Avg. ROI', c: '#A855F7' }, { icon: <Globe size={20}/>, n: '5+', l: 'Countries', c: '#60EFFF' }, { icon: <Zap size={20}/>, n: '360°', l: 'Digital Services', c: '#FF6BFF' }].map(({ icon, n, l, c }) => (
              <div key={l} style={{ padding: '18px 16px', borderRadius: 16, background: cBg, border: `1px solid ${bd}`, textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: c }}>{icon}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem,2.8vw,1.9rem)', color: c, lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '.72rem', color: dark ? '#9B8BC0' : '#7B6A9A', fontFamily: "'Plus Jakarta Sans',sans-serif", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <motion.button whileHover={{ y: -2 }} onClick={() => navigate('/services')}
              style={{ padding: '11px 28px', borderRadius: 50, cursor: 'pointer', border: `2px solid ${T.p1}`, background: 'transparent', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.9rem', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'all .25s' }}
              onMouseOver={e => { e.currentTarget.style.background = T.p1; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.p1; }}>
              View All Services <ArrowRight size={14} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PACKAGES PREVIEW ───────────────────────────────────────────────────── */
function PackagesPreview({ dark, fmt }) {
  const navigate = useNavigate();
  const bg = dark ? 'rgba(12,4,26,.92)' : '#fff';
  const bd = dark ? 'rgba(139,82,247,.16)' : 'rgba(91,29,232,.09)';

  return (
    <section style={{ padding: 'clamp(52px,7vw,76px) clamp(16px,5%,60px)', background: dark ? 'rgba(91,29,232,.04)' : 'rgba(91,29,232,.02)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Chip text="Pricing" center />
            <Heading dark={dark} size="clamp(1.8rem,3.5vw,3rem)" center>Simple, Transparent <GradText>Pricing</GradText></Heading>
            <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', marginTop: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(.84rem,1.8vw,.92rem)' }}>Prices shown in your local currency.</p>
          </div>
        </FadeUp>

        <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }}>
          {PREVIEW_PACKAGES.map((p, i) => (
            <FadeUp key={p.n} delay={i * 0.09} style={{ height: '100%' }}>
              <motion.div whileHover={{ y: -7 }} style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'clamp(20px,3vw,26px) clamp(16px,2.5vw,22px)', borderRadius: 20, position: 'relative', overflow: 'hidden', border: p.feat ? `2px solid ${T.p1}` : `1px solid ${bd}`, background: p.feat ? 'linear-gradient(150deg,#5B1DE8,#7C3AED)' : bg, boxShadow: p.feat ? '0 18px 52px rgba(91,29,232,.3)' : 'none' }}>
                <div style={{ position: 'absolute', top: 13, right: 13, padding: '3px 10px', borderRadius: 20, fontSize: '.63rem', fontWeight: 800, background: p.tag === 'Most Popular' ? 'linear-gradient(135deg,#FF6BFF,#5B1DE8)' : p.tag === 'Startup' ? 'linear-gradient(135deg,#22C55E,#16A34A)' : 'linear-gradient(135deg,#60EFFF,#5B1DE8)', color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.tag}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1rem,1.8vw,1.15rem)', color: p.feat ? '#fff' : dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 5 }}>{p.n}</div>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,1.9rem)', lineHeight: 1.1, marginBottom: 3, ...(p.feat ? { color: '#fff' } : { background: `linear-gradient(135deg,${p.c},#A855F7)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }) }}>{fmt(p.price)}</div>
                <div style={{ fontSize: '.72rem', color: p.feat ? 'rgba(255,255,255,.5)' : '#9B8BC0', marginBottom: 14, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>/month</div>
                <div style={{ height: 1, background: p.feat ? 'rgba(255,255,255,.17)' : bd, marginBottom: 14 }} />
                <div style={{ flex: 1 }}>
                  {p.feats.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                      <CheckCircle2 size={12} color={p.feat ? 'rgba(255,255,255,.7)' : T.p1} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 'clamp(.78rem,1.4vw,.82rem)', color: p.feat ? 'rgba(255,255,255,.82)' : dark ? '#B8A0D8' : '#5B4080', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <motion.button whileTap={{ scale: .97 }} onClick={() => navigate('/packages')}
                  style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 50, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.85rem', transition: 'all .25s', ...(p.feat ? { background: 'rgba(255,255,255,.16)', color: '#fff', border: '2px solid rgba(255,255,255,.3)' } : { background: 'transparent', border: `2px solid ${T.p1}`, color: T.p1 }) }}
                  onMouseOver={e => { if (!p.feat) { e.currentTarget.style.background = T.p1; e.currentTarget.style.color = '#fff'; } }}
                  onMouseOut={e  => { if (!p.feat) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.p1; } }}>
                  Get Started
                </motion.button>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 22 }}>
            <motion.button whileHover={{ y: -2 }} onClick={() => navigate('/packages')}
              style={{ padding: '10px 26px', borderRadius: 50, cursor: 'pointer', border: `2px solid ${T.p1}`, background: 'transparent', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.88rem', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'all .25s' }}
              onMouseOver={e => { e.currentTarget.style.background = T.p1; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e  => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.p1; }}>
              View All Packages <ArrowRight size={13} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── PARTNERS ───────────────────────────────────────────────────────────── */
const PARTNERS = [
  { n: 'Google',    lg: <svg viewBox="0 0 24 24" width="48" height="16"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
  { n: 'Meta',      lg: <svg viewBox="0 0 70 22" width="58" height="18"><text x="0" y="18" fontFamily="'Outfit',sans-serif" fontWeight="800" fontSize="20" fill="#0082FB">Meta</text></svg> },
  { n: 'TikTok',    lg: <svg viewBox="0 0 24 24" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.06a8.16 8.16 0 004.77 1.52V7.13a4.85 4.85 0 01-1-.44z" fill="#010101"/></svg> },
  { n: 'Instagram', lg: <svg viewBox="0 0 24 24" width="19" height="19"><defs><radialGradient id="ig3" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#ig3)"/></svg> },
  { n: 'LinkedIn',  lg: <svg viewBox="0 0 24 24" width="19" height="19"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/></svg> },
  { n: 'Facebook',  lg: <svg viewBox="0 0 24 24" width="19" height="19"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg> },
];

function PartnersSection({ dark }) {
  const bg = dark ? 'rgba(12,4,26,.9)' : '#fff';
  const bd = dark ? 'rgba(139,82,247,.18)' : 'rgba(91,29,232,.09)';
  const d  = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section style={{ padding: '48px clamp(16px,5%,60px)', background: dark ? 'rgba(91,29,232,.03)' : 'rgba(91,29,232,.02)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeUp><p style={{ textAlign: 'center', fontSize: '.7rem', fontWeight: 700, letterSpacing: 2.8, color: '#9B8BC0', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Partnered with the world's leading platforms</p></FadeUp>
        <div style={{ overflow: 'hidden' }}>
          <div className="sl" style={{ display: 'flex', gap: 13, width: 'max-content', alignItems: 'center' }}>
            {d.map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.06, y: -3 }} style={{ padding: '12px 22px', borderRadius: 13, background: bg, border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', gap: 9, minWidth: 124, justifyContent: 'center' }}>
                <div>{p.lg}</div>
                <span style={{ fontSize: '.82rem', fontWeight: 700, color: dark ? '#C4B0E8' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", whiteSpace: 'nowrap' }}>{p.n}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── HOME PAGE EXPORT ───────────────────────────────────────────────────── */
export function HomePage({ dark, fmt }) {
  const navigate = useNavigate();
  return (
    <div>
      <HeroSection dark={dark} />
      <ServicesGrid dark={dark} />

      {/* Marquee bar */}
      <div style={{ background: T.grad, padding: '11px 0', overflow: 'hidden' }}>
        <div className="sl" style={{ display: 'flex', width: 'max-content' }}>
          {[...Array(2)].flatMap((_, ri) =>
            ['AI-Driven Marketing', 'Social Media', 'Web Development', 'AI Agents', 'Prompt Engineering', 'Performance Marketing', 'Video Production', 'SEO & GEO'].map((t, i) => (
              <div key={`${ri}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 18, marginRight: 28 }}>
                <span style={{ color: 'rgba(255,255,255,.9)', fontWeight: 700, fontSize: '.75rem', letterSpacing: 1.8, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t}</span>
                <span style={{ color: 'rgba(255,255,255,.25)' }}>+</span>
              </div>
            ))
          )}
        </div>
      </div>

      <PackagesPreview dark={dark} fmt={fmt} />
      <PartnersSection dark={dark} />
      <Testimonials dark={dark} />

      {/* Brand strip */}
      <section style={{ padding: '52px clamp(16px,5%,60px)', background: dark ? 'rgba(91,29,232,.04)' : 'rgba(91,29,232,.02)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUp><p style={{ textAlign: 'center', fontSize: '.75rem', fontWeight: 700, letterSpacing: 2.5, color: '#9B8BC0', textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Trusted by 35+ brands across 5+ countries</p></FadeUp>
          <BrandSlider dark={dark} />
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: 'clamp(52px,7vw,68px) clamp(16px,5%,60px)', background: dark ? '#0D0820' : '#fff' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ background: 'linear-gradient(135deg,#5B1DE8,#7C3AED,#A855F7)', borderRadius: 24, padding: 'clamp(28px,5vw,56px) clamp(18px,5vw,44px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: .05, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)' }} />
              <div style={{ position: 'relative' }}>
                <p style={{ color: 'rgba(255,255,255,.58)', fontSize: '.72rem', fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 10, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Ready to grow?</p>
                <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem,3.8vw,3rem)', color: '#fff', letterSpacing: '-1.5px', marginBottom: 10, lineHeight: 1.15 }}>You have Goals.<br />We have the Road Map.</h2>
                <p style={{ color: 'rgba(255,255,255,.62)', marginBottom: 24, maxWidth: 380, margin: '0 auto 24px', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.75, fontSize: '.9rem' }}>Turning your goals into milestones with digital strategy.</p>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} onClick={() => navigate('/contact')}
                  style={{ padding: '13px 36px', borderRadius: 50, border: 'none', cursor: 'pointer', background: '#fff', color: T.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '.93rem' }}>
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
