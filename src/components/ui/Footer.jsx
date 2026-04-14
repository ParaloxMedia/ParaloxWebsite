import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Globe, MapPin, Facebook, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { T } from '../../data';

const PAGES    = ['home','about','services','packages','gallery','contact'];
const SERVICES = ['AI Marketing','Social Media','Web Dev','Video Production','AI Agents','Performance Marketing'];

export function Footer({ dark }) {
  const navigate = useNavigate();
  const go = (p) => { navigate(p === 'home' ? '/' : `/${p}`); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer style={{ background: dark ? '#050310' : '#09011A', borderTop: '1px solid rgba(139,82,247,.08)', padding: 'clamp(28px,5vw,36px) clamp(16px,5%,60px) clamp(18px,4vw,22px)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fcols" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 'clamp(16px,3vw,2rem)', marginBottom: 24 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.3rem', background: 'linear-gradient(135deg,#A855F7,#60EFFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 7 }}>Paralox Media Private Limited</div>
            <p style={{ fontSize: '.78rem', lineHeight: 1.75, color: 'rgba(255,255,255,.26)', maxWidth: 210, marginBottom: 13 }}>Building the Future of AI-Powered Business Solutions.</p>
            <div style={{ display: 'flex', gap: 7 }}>
              {[
                { icon: <Facebook size={12}/>, link: 'https://www.facebook.com/paralox.media/' },
                { icon: <Instagram size={12}/>, link: 'https://www.instagram.com/paralox.media/' },
                { icon: <Linkedin size={12}/>, link: 'https://www.linkedin.com/company/paralox-media' },
                { icon: <Globe size={12}/>, link: null }
              ].map(({ icon, link }, i) => (
                <motion.a key={i} href={link || '#'} target={link ? '_blank' : undefined} rel="noreferrer" whileHover={{ y: -2 }}
                  style={{ width: 29, height: 29, borderRadius: 7, background: 'rgba(139,82,247,.18)', border: '1px solid rgba(139,82,247,.22)', cursor: 'pointer', color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div className="hide-mobile">
            <div style={{ fontWeight: 600, fontSize: '.73rem', color: 'rgba(255,255,255,.4)', letterSpacing: 0.8, marginBottom: 11, textTransform: 'uppercase' }}>Pages</div>
            {PAGES.map(p => (
              <div key={p} onClick={() => go(p)}
                style={{ fontSize: '.77rem', color: 'rgba(255,255,255,.27)', marginBottom: 7, cursor: 'pointer', textTransform: 'capitalize', transition: 'color .2s' }}
                onMouseOver={e => e.target.style.color = 'rgba(168,85,247,.8)'}
                onMouseOut={e  => e.target.style.color = 'rgba(255,255,255,.27)'}>
                {p}
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="hide-mobile">
            <div style={{ fontWeight: 600, fontSize: '.73rem', color: 'rgba(255,255,255,.4)', letterSpacing: 0.8, marginBottom: 11, textTransform: 'uppercase' }}>Services</div>
            {SERVICES.map(s => (
              <div key={s} style={{ fontSize: '.77rem', color: 'rgba(255,255,255,.27)', marginBottom: 7 }}>{s}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 600, fontSize: '.73rem', color: 'rgba(255,255,255,.4)', letterSpacing: 0.8, marginBottom: 11, textTransform: 'uppercase' }}>Contact</div>
            {[
              { icon: <Phone size={10}/>,         v: '+94 75 032 8833',        href: 'tel:+94750328833' },
              { icon: <MessageCircle size={10}/>,  v: 'WhatsApp',               href: 'https://wa.me/94750328833' },
              { icon: <Mail size={10}/>,           v: 'info@paraloxmedia.com',  href: 'mailto:info@paraloxmedia.com' },
              { icon: <MapPin size={10}/>,         v: 'Nawala Rd, Sri Lanka',   href: null },
            ].map(({ icon, v, href }) => (
              <a key={v} href={href || undefined} target={href ? '_blank' : undefined} rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.27)', fontSize: '.76rem', textDecoration: 'none', marginBottom: 7, transition: 'color .2s' }}
                onMouseOver={e => e.currentTarget.style.color = 'rgba(168,85,247,.7)'}
                onMouseOut={e  => e.currentTarget.style.color = 'rgba(255,255,255,.27)'}>
                <span style={{ color: 'rgba(168,85,247,.52)' }}>{icon}</span>
                {v}
              </a>
            ))}
          </div>
        </div>

    
      </div>
    </footer>
  );
}
