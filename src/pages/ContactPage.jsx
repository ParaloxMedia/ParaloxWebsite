import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Briefcase, Send, CheckCircle2, MessageCircle, Facebook, Instagram, Linkedin, Globe } from 'lucide-react';
import { T } from '../data';
import { useSEO } from '../hooks/useSEO';
import { FadeUp } from '../components/ui/FadeUp';

const SERVICES_LIST = ['Social Media Management','AI-Driven Digital Marketing','Website / App Development','AI Agent Development','Performance Marketing','Video Production','SEO & Content','Custom Package'];

export function ContactPage({ dark }) {
  useSEO({
    title: 'Contact Us | Get a Free AI & Digital Marketing Quote | Paralox Media',
    description: 'Contact Paralox Media to discuss AI agent development, digital marketing, social media management, or web development. Get a free consultation for your business today.',
  });
  const [form, setForm] = useState({ fname: '', lname: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const bd = dark ? 'rgba(139,82,247,.22)' : 'rgba(91,29,232,.16)';
  const pillS = {
    display: 'flex', alignItems: 'center', gap: 9,
    height: 46, padding: '0 5px 0 15px',
    border: `1.5px solid ${bd}`, borderRadius: 999,
    background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF',
    transition: 'border-color .25s, box-shadow .25s',
  };
  const inputS = {
    flex: 1, height: '100%', border: 'none', outline: 'none', background: 'transparent',
    color: dark ? '#F0E8FF' : '#1A0A2E',
    fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem',
  };
  const labelS = { display: 'block', fontSize: '.71rem', fontWeight: 600, color: dark ? '#B8A0D8' : '#5B4080', marginBottom: 7, fontFamily: "'Plus Jakarta Sans',sans-serif" };
  const iconWrap = { display: 'flex', alignItems: 'center', justifyContent: 'center', color: dark ? '#8B7BB0' : '#8B7BAC', flexShrink: 0 };

  const h   = e => setForm({ ...form, [e.target.name]: e.target.value });
  const focus   = e => { e.target.parentElement.style.borderColor = T.p2; e.target.parentElement.style.boxShadow = `0 0 0 3px ${dark ? 'rgba(139,82,247,.18)' : 'rgba(91,29,232,.12)'}`; };
  const blur    = e => { e.target.parentElement.style.borderColor = bd; e.target.parentElement.style.boxShadow = 'none'; };
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
    <div style={{ paddingTop: 118, paddingBottom: 90, minHeight: '90vh' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 clamp(16px,5%,24px)' }}>

        <FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: T.p1, background: dark ? 'rgba(139,82,247,.16)' : 'rgba(91,29,232,.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 18, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Contact Us
            </span>
            <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,5.5vw,2.9rem)', color: dark ? '#F0E8FF' : '#1A0A2E', letterSpacing: '-1.5px', lineHeight: 1.12, marginBottom: 14 }}>
              Let's Get In Touch.
            </h1>
            <p style={{ maxWidth: 420, color: dark ? '#9B8BC0' : '#7B6A9A', fontSize: '.92rem', lineHeight: 1.75, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 40 }}>
              Or just reach out manually to us at{' '}
              <a href="mailto:info@paraloxmedia.com" style={{ color: T.p1, fontWeight: 600, textDecoration: 'none' }}>info@paraloxmedia.com</a>
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div>
                <label style={labelS}>Full Name</label>
                <div style={pillS}>
                  <span style={iconWrap}><User size={17} /></span>
                  <input name="fname" value={form.fname} onChange={h} onFocus={focus} onBlur={blur} placeholder="John" style={inputS} required />
                </div>
              </div>
              <div>
                <label style={labelS}>Last Name</label>
                <div style={pillS}>
                  <span style={iconWrap}><User size={17} /></span>
                  <input name="lname" value={form.lname} onChange={h} onFocus={focus} onBlur={blur} placeholder="Doe" style={inputS} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelS}>Email Address</label>
              <div style={pillS}>
                <span style={iconWrap}><Mail size={17} /></span>
                <input name="email" type="email" value={form.email} onChange={h} onFocus={focus} onBlur={blur} placeholder="info@paraloxmedia.com" style={inputS} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }} className="g1">
              <div>
                <label style={labelS}>Phone / WhatsApp</label>
                <div style={pillS}>
                  <span style={iconWrap}><Phone size={17} /></span>
                  <input name="phone" type="tel" value={form.phone} onChange={h} onFocus={focus} onBlur={blur} placeholder="+94 75 032 8833" style={inputS} />
                </div>
              </div>
              <div>
                <label style={labelS}>Service Interested In</label>
                <div style={pillS}>
                  <span style={iconWrap}><Briefcase size={17} /></span>
                  <select name="service" value={form.service} onChange={h} onFocus={focus} onBlur={blur} style={{ ...inputS, cursor: 'pointer' }}>
                    <option value="">Select...</option>
                    {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <label style={labelS}>Message</label>
            <textarea
              name="message" value={form.message} onChange={h}
              onFocus={e => { e.target.style.borderColor = T.p2; e.target.style.boxShadow = `0 0 0 3px ${dark ? 'rgba(139,82,247,.18)' : 'rgba(91,29,232,.12)'}`; }}
              onBlur={e => { e.target.style.borderColor = bd; e.target.style.boxShadow = 'none'; }}
              rows={4} placeholder="Tell us about your project..." required
              style={{
                width: '100%', marginTop: 0, marginBottom: 22, padding: '13px 15px', boxSizing: 'border-box',
                border: `1.5px solid ${bd}`, borderRadius: 18, resize: 'vertical', outline: 'none',
                background: dark ? 'rgba(12,4,26,.8)' : '#F8F5FF', color: dark ? '#F0E8FF' : '#1A0A2E',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '.88rem', transition: 'border-color .25s, box-shadow .25s',
              }}
            />

            <motion.button whileHover={{ y: -2, boxShadow: '0 10px 28px rgba(91,29,232,.4)' }} whileTap={{ scale: .97 }} onClick={sub} disabled={loading}
              style={{ width: '100%', padding: '14px', borderRadius: 999, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: T.grad, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '.94rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 20px rgba(91,29,232,.3)', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Sending...' : 'Submit Form'} <Send size={16} />
            </motion.button>

            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: 14, padding: '11px', borderRadius: 14, textAlign: 'center', background: 'rgba(34,197,94,.09)', border: '1px solid rgba(34,197,94,.24)', color: '#16A34A', fontWeight: 600, fontSize: '.83rem', fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <CheckCircle2 size={15} /> Message sent! We'll get back to you within 24 hours.
                </motion.div>
              )}
            </AnimatePresence>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 34 }}>
              {[
                { icon: <MessageCircle size={15}/>, link: 'https://wa.me/94750328833' },
                { icon: <Facebook size={14}/>, link: 'https://www.facebook.com/paralox.media/' },
                { icon: <Instagram size={14}/>, link: 'https://www.instagram.com/paralox.media/' },
                { icon: <Linkedin size={14}/>, link: 'https://www.linkedin.com/company/paralox-media' },
                { icon: <Globe size={14}/>, link: null },
              ].map(({ icon, link }, i) => (
                <motion.a key={i} href={link || '#'} target={link ? '_blank' : undefined} rel="noreferrer" whileHover={{ y: -3 }}
                  style={{ width: 36, height: 36, borderRadius: '50%', background: dark ? 'rgba(139,82,247,.12)' : 'rgba(91,29,232,.08)', border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.p1, textDecoration: 'none' }}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
