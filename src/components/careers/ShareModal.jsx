import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Check, ExternalLink, Share2 } from 'lucide-react';
import { T } from '../../data';

const WA_ICON = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LI_ICON = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FB_ICON = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export function ShareModal({ dark, vacancy, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/careers#${vacancy.id}`;
  const shareText = `Check out this ${vacancy.title} opening at Paralox Media! 🚀`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${vacancy.title} at Paralox Media`, text: shareText, url: shareUrl });
    }
  };

  const SHARE_OPTIONS = [
    {
      label: 'WhatsApp',
      color: '#25D366',
      textColor: '#fff',
      icon: <WA_ICON />,
      url: `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
    },
    {
      label: 'LinkedIn',
      color: '#0A66C2',
      textColor: '#fff',
      icon: <LI_ICON />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: 'Facebook',
      color: '#1877F2',
      textColor: '#fff',
      icon: <FB_ICON />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="share-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,.72)',
          backdropFilter: 'blur(10px)',
          zIndex: 1200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 16px',
        }}
      >
        <motion.div
          key="share-card"
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: dark ? '#0D0520' : '#fff',
            border: `1px solid ${dark ? 'rgba(139,82,247,.24)' : 'rgba(91,29,232,.14)'}`,
            borderRadius: 22,
            padding: '28px 26px',
            width: '100%', maxWidth: 400,
            boxShadow: '0 32px 80px rgba(0,0,0,.5)',
            fontFamily: "'Plus Jakarta Sans',sans-serif",
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: T.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Share2 size={14} />
                </div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: '1.1rem', color: dark ? '#F0E8FF' : '#1A0A2E' }}>
                  Share This Role
                </h3>
              </div>
              <p style={{ fontSize: '.76rem', color: dark ? '#8870B8' : '#7B6A9A', paddingLeft: 38 }}>
                {vacancy.title} · Paralox Media
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: 9,
                background: dark ? 'rgba(139,82,247,.1)' : 'rgba(91,29,232,.07)',
                border: `1px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: dark ? '#B8A0D8' : T.p1, flexShrink: 0,
              }}
            >
              <X size={14} />
            </motion.button>
          </div>

          {/* Share platforms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {SHARE_OPTIONS.map(({ label, color, textColor, icon, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 13,
                  padding: '12px 15px', borderRadius: 13,
                  background: dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.025)',
                  border: `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.07)'}`,
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'background .2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)'}
                onMouseOut={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.025)'}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 9, background: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: textColor, flexShrink: 0,
                  boxShadow: `0 4px 12px ${color}44`,
                }}>
                  {icon}
                </div>
                <span style={{ fontWeight: 600, fontSize: '.9rem', color: dark ? '#E8D8FF' : '#1A0A2E', flex: 1 }}>
                  Share on {label}
                </span>
                <ExternalLink size={13} style={{ color: dark ? '#6B5A88' : '#B8A0C8' }} />
              </motion.a>
            ))}
          </div>

          {/* Copy link row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
            <div style={{
              flex: 1, padding: '10px 12px', borderRadius: 10,
              background: dark ? 'rgba(139,82,247,.08)' : 'rgba(91,29,232,.04)',
              border: `1px solid ${dark ? 'rgba(139,82,247,.2)' : 'rgba(91,29,232,.12)'}`,
              fontFamily: 'monospace', fontSize: '.72rem',
              color: dark ? '#B8A0D8' : '#5B4080',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              display: 'flex', alignItems: 'center',
            }}>
              {shareUrl}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyLink}
              style={{
                padding: '10px 16px', borderRadius: 10, border: 'none',
                cursor: 'pointer',
                background: copied ? 'linear-gradient(135deg,#16A34A,#22C55E)' : T.grad,
                color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700, fontSize: '.8rem',
                display: 'flex', alignItems: 'center', gap: 5,
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background .35s',
                boxShadow: copied ? '0 4px 14px rgba(22,163,74,.35)' : '0 4px 14px rgba(91,29,232,.3)',
              }}
            >
              {copied ? <Check size={13} /> : <Link2 size={13} />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>

          {/* Native share if supported */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNativeShare}
              style={{
                width: '100%', marginTop: 12,
                padding: '10px', borderRadius: 10,
                border: `1px dashed ${dark ? 'rgba(139,82,247,.3)' : 'rgba(91,29,232,.2)'}`,
                background: 'transparent', cursor: 'pointer',
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600,
                fontSize: '.82rem', color: dark ? '#B8A0D8' : T.p1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Share2 size={13} /> More sharing options
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
