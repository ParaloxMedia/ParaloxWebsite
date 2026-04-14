import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { T } from '../../data';

const PAGES = ['home', 'about', 'services', 'packages', 'contact'];
// const PAGES = ['home', 'about', 'services', 'packages', 'gallery', 'contact'];

const toPath = (p) => p === 'home' ? '/' : `/${p}`;

export function Nav({ dark, setDark }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [sc,   setSc]   = useState(false);

  const activePage = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = (p) => {
    navigate(toPath(p));
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
          display: 'flex', alignItems: 'center',
          padding: '0 clamp(16px,5%,60px)', justifyContent: 'space-between',
          background: dark ? (sc ? 'rgba(8,5,16,.97)' : 'rgba(8,5,16,.9)') : (sc ? 'rgba(255,255,255,.98)' : 'rgba(255,255,255,.92)'),
          backdropFilter: 'blur(22px)',
          borderBottom: dark ? '1px solid rgba(139,82,247,.12)' : '1px solid rgba(91,29,232,.07)',
          boxShadow: sc ? '0 4px 22px rgba(91,29,232,.09)' : 'none',
          transition: 'background .3s, box-shadow .3s',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>

        {/* Logo */}
        {/* <motion.div whileHover={{ scale: 1.04 }} onClick={() => go('home')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.4rem', background: T.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>paralox</div>
          <div style={{ fontSize: '.5rem', letterSpacing: 4, color: dark ? '#9B8BC0' : '#8B7AAA', fontWeight: 700, marginTop: -2, textTransform: 'uppercase' }}>MEDIA</div>
        </motion.div> */}
  <motion.img 
          src={dark ? "/images/Logo/Paralox Logo BW.png" : "/images/Logo/Paralox Logo Color.png"} 
          alt="Paralox Media" 
          onClick={() => go('home')} 
          whileHover={{ scale: 1.04 }} 
          style={{ height: 180, cursor: 'pointer' }} 
        />
        {/* Desktop links */}
        <div className="nd" style={{ display: 'flex', gap: 2 }}>
          {PAGES.map(p => (
            <motion.button key={p} onClick={() => go(p)} whileHover={{ y: -1 }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 11px', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: activePage === p ? 700 : 500, fontSize: '.85rem', color: activePage === p ? T.p1 : dark ? '#B8A0D8' : '#4B3275', borderRadius: 8, textTransform: 'capitalize', position: 'relative' }}>
              {p}
              {activePage === p && <motion.div layoutId="np" style={{ position: 'absolute', bottom: -2, left: '20%', width: '60%', height: 2, background: T.grad, borderRadius: 2, transform: 'translateX(-50%)' }} />}
            </motion.button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <motion.button whileHover={{ scale: 1.08 }} onClick={() => setDark(!dark)}
            style={{ width: 35, height: 35, borderRadius: 9, border: dark ? '1px solid rgba(139,82,247,.3)' : '1px solid rgba(91,29,232,.14)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#B8A0D8' : T.p1 }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => go('contact')}
            style={{ padding: '8px 18px', borderRadius: 50, border: 'none', cursor: 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.83rem', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 5px 16px rgba(91,29,232,.33)' }}>
            Get Started <ArrowRight size={13} />
          </motion.button>
          <button onClick={() => setOpen(!open)} className="nh"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: dark ? '#F0E8FF' : '#1A0A2E', display: 'none', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 26, stiffness: 250 }}
            style={{ position: 'fixed', top: 64, right: 0, bottom: 0, width: '76%', maxWidth: 290, zIndex: 999, background: dark ? 'rgba(8,5,16,.98)' : 'rgba(255,255,255,.98)', backdropFilter: 'blur(20px)', padding: '1.6rem 1.3rem', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '-5px 0 32px rgba(91,29,232,.13)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {PAGES.map((p, i) => (
              <motion.button key={p} initial={{ x: 32, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }} onClick={() => go(p)}
                style={{ background: activePage === p ? 'rgba(91,29,232,.1)' : 'transparent', border: 'none', cursor: 'pointer', padding: '12px 15px', borderRadius: 11, textAlign: 'left', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: activePage === p ? 700 : 400, fontSize: '.98rem', color: activePage === p ? T.p1 : dark ? '#F0E8FF' : '#1A0A2E', textTransform: 'capitalize' }}>
                {p}
              </motion.button>
            ))}
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }} onClick={() => go('contact')}
              style={{ marginTop: 10, padding: '12px', borderRadius: 50, border: 'none', cursor: 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.96rem' }}>
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
