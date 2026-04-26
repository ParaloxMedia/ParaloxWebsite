import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Globe, Facebook, Instagram, Linkedin, Send, Bot, BarChart2, Zap, CheckCircle2 } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';

const CONTACT_CARDS = [
  { icon: <Phone size={17}/>,         l: 'Call Us',   v: '+94 75 032 8833',       href: 'tel:+94750328833',                c: '#5B1DE8' },
  { icon: <MessageCircle size={17}/>, l: 'WhatsApp',  v: 'Chat with us now',       href: 'https://wa.me/94750328833',       c: '#25D366' },
  { icon: <Mail size={17}/>,          l: 'Email Us',  v: 'info@paraloxmedia.com', href: 'mailto:info@paraloxmedia.com',    c: '#EA4335' },
  { icon: <MapPin size={17}/>,        l: 'Visit Us',  v: '31/8 Mosque Lane, Nawala Rd, Sri Lanka', href: null,            c: '#F59E0B' },
];

const SERVICES_LIST = ['Social Media Management','AI-Driven Digital Marketing','Website / App Development','AI Agent Development','Performance Marketing','Video Production','SEO & Content','Custom Package'];

export function ContactPage({ dark }) {
  useSEO({
    title: 'Contact Us | Get a Free AI & Digital Marketing Quote — Paralox Media',
    description: 'Contact Paralox Media to discuss AI agent development, digital marketing, social media management, or web development. Get a free consultation for your business today.',
  });
  const [form, setForm] = useState({ fname: '', lname: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const bd = dark ? 'rgba(139,82,247,.13)' : 'rgba(91,29,232,.09)';
  const iS = {
    width: '100%', padding: '11px 13px', borderRadius: 10,
    border: `1.5px solid ${bd}`,
    background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF',
    color: dark ? '#F0E8FF' : '#1A0A2E',
    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color .25s,box-shadow .25s',
  };

  const h   = e => setForm({ ...form, [e.target.name]: e.target.value });
  const sub = async () => {
    if (!form.fname || !form.email || !form.message) {
      alert('Please fill in required fields');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/xlgojvpr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: form.fname,
          lname: form.lname,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ fname: '', lname: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 86, paddingBottom: 72 }}>

      {/* Purple header band */}
      <div style={{ background: 'linear-gradient(135deg,#0C0524,#2A0868,#1A0A48)', padding: 'clamp(40px,7vw,52px) clamp(16px,5%,60px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .11, backgroundImage: 'linear-gradient(rgba(139,82,247,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(139,82,247,.4) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', top: '-40%', right: '10%', width: 'min(380px,50vw)', height: 'min(380px,50vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,29,232,.42),transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center', paddingBottom: 44 }}>
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16, background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 30, padding: '6px 16px' }}>
            <div className="bk" style={{ width: 6, height: 6, borderRadius: '50%', background: '#60EFFF' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 700, color: 'rgba(255,255,255,.85)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Get In Touch</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5vw,4.2rem)', color: 'white', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 11 }}>
            Let's Build Something<br />
            <span style={{ background: 'linear-gradient(135deg,#60EFFF,#A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Remarkable</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}
            style={{ color: 'rgba(255,255,255,.5)', maxWidth: 420, margin: '0 auto', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.8, fontSize: 'clamp(.84rem,1.8vw,.94rem)' }}>
            Whether you're a startup or an established brand, we're here to craft the perfect digital strategy for you.
          </motion.p>

          {/* Contact cards */}
          <div className="ctc4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 13, marginTop: 36 }}>
            {CONTACT_CARDS.map(({ icon, l, v, href, c }, i) => (
              <motion.a key={l} href={href || undefined} target={href ? '_blank' : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 + i * .08 }}
                whileHover={{ y: -5 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, padding: '18px 12px', borderRadius: 16, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', backdropFilter: 'blur(12px)', textDecoration: 'none', cursor: href ? 'pointer' : 'default' }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 5px 16px ${c}66` }}>{icon}</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '.66rem', fontWeight: 700, letterSpacing: 1.2, color: 'rgba(255,255,255,.44)', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>{l}</div>
                  <div style={{ fontWeight: 600, fontSize: '.8rem', color: 'rgba(255,255,255,.84)', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{v}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Form section */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(36px,6vw,52px) clamp(16px,5%,60px) 0' }}>
        <div className="ctg" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'clamp(24px,4vw,3rem)', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <FadeUp>
            <div style={{ position: 'sticky', top: 88 }}>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem,2.5vw,1.5rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 6 }}>Ready to start?</h3>
              <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: dark ? '#9B8BC0' : '#7B6A9A', marginBottom: 24, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Fill in the form and our team will get back to you within 24 hours.</p>
              <div style={{ marginBottom: 24 }}>
                {[
                  [<Bot size={15}/>,      'AI-first strategies tailored to your brand'],
                  [<BarChart2 size={15}/>, 'Transparent reporting every step of the way'],
                  [<Globe size={15}/>,    'Local insight, global execution'],
                  [<Zap size={15}/>,      'Results-driven, not just activity-driven'],
                ].map(([ic, text], j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, marginBottom: 13 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(91,29,232,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.p1, flexShrink: 0, marginTop: 1 }}>{ic}</div>
                    <span style={{ fontSize: '.84rem', lineHeight: 1.65, color: dark ? '#B8A0D8' : '#5B4080', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{text}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontWeight: 700, marginBottom: 10, color: dark ? '#F0E8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.87rem' }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                {[
                  { icon: <Facebook size={13}/>, link: 'https://www.facebook.com/paralox.media/' },
                  { icon: <Instagram size={13}/>, link: 'https://www.instagram.com/paralox.media/' },
                  { icon: <Linkedin size={13}/>, link: 'https://www.linkedin.com/company/paralox-media' },
                  { icon: <Globe size={13}/>, link: null }
                ].map(({ icon, link }, i) => (
                  <motion.a key={i} href={link || '#'} target={link ? '_blank' : undefined} rel="noreferrer" whileHover={{ y: -3 }} style={{ width: 34, height: 34, borderRadius: 8, background: T.grad, border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>{icon}</motion.a>
                ))}
              </div>
              <motion.a href="https://wa.me/94750328833" target="_blank" rel="noreferrer" whileHover={{ y: -2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '12px 16px', borderRadius: 13, background: 'rgba(37,211,102,.1)', border: '1px solid rgba(37,211,102,.26)', textDecoration: 'none' }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(37,211,102,.17)'}
                onMouseOut={e  => e.currentTarget.style.background = 'rgba(37,211,102,.1)'}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#25D366,#128C7E)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}><MessageCircle size={16} /></div>
                <div>
                  <div style={{ fontSize: '.67rem', fontWeight: 700, letterSpacing: 1, color: '#25D366', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>WhatsApp — Quick Chat</div>
                  <div style={{ fontWeight: 600, fontSize: '.85rem', color: dark ? '#F0E8FF' : '#1A0A2E', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>+94 75 032 8833</div>
                </div>
              </motion.a>
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.12}>
            <div style={{ padding: 'clamp(20px,4vw,34px)', borderRadius: 20, border: `1px solid ${dark ? 'rgba(139,82,247,.17)' : 'rgba(91,29,232,.1)'}`, background: dark ? 'rgba(12,4,26,.85)' : '#fff', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(1.15rem,2.5vw,1.3rem)', color: dark ? '#F0E8FF' : '#1A0A2E', marginBottom: 4 }}>Send Us a Message</h3>
              <p style={{ color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.82rem', marginBottom: 20, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>We'll respond within 24 hours.</p>

              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }} className="g1">
                {[['fname','First Name','John'], ['lname','Last Name','Doe']].map(([n, l, p]) => (
                  <div key={n}>
                    <label style={{ display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l}</label>
                    <input name={n} value={form[n]} onChange={h} placeholder={p} style={iS} />
                  </div>
                ))}
              </div>

              {[{ n: 'email', l: 'Email', p: 'info@paraloxmedia.com', t: 'email' }, { n: 'phone', l: 'Phone / WhatsApp', p: '+94 75 032 8833', t: 'tel' }].map(({ n, l, p, t }) => (
                <div key={n} style={{ marginBottom: 10 }}>
                  <label style={{ display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l}</label>
                  <input name={n} type={t} value={form[n]} onChange={h} placeholder={p} style={iS} />
                </div>
              ))}

              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Service Interested In</label>
                <select name="service" value={form.service} onChange={h} style={{ ...iS, cursor: 'pointer' }}>
                  <option value="">Select a service...</option>
                  {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 17 }}>
                <label style={{ display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Message</label>
                <textarea name="message" value={form.message} onChange={h} placeholder="Tell us about your project..." rows={4} style={{ ...iS, resize: 'vertical' }} />
              </div>

              <motion.button whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(91,29,232,.4)' }} whileTap={{ scale: .97 }} onClick={sub} disabled={loading}
                style={{ width: '100%', padding: '13px', borderRadius: 50, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.93rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: '0 6px 20px rgba(91,29,232,.3)', opacity: loading ? 0.7 : 1 }}>
                <Send size={15} /> {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ marginTop: 12, padding: '11px', borderRadius: 10, textAlign: 'center', background: 'rgba(34,197,94,.09)', border: '1px solid rgba(34,197,94,.24)', color: '#16A34A', fontWeight: 600, fontSize: '.83rem', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <CheckCircle2 size={15} /> Message sent! We'll get back to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
