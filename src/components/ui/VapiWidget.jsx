import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Vapi from '@vapi-ai/web';

const VAPI_PUBLIC_KEY = '90cc186d-f7f7-40f1-a539-85049bd2c10d'; // Replace with your VAPI public key
const ASSISTANT_ID    = '9ef421ad-bd10-4169-b8b2-6d874fe5afe3';

export function VapiWidget({ dark }) {
  const [status, setStatus]   = useState('idle');   // idle | connecting | active | error
  const [isMuted, setIsMuted] = useState(false);
  const [volume,  setVolume]  = useState(0);
  const vapiRef = useRef(null);

  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start',  () => setStatus('active'));
    vapi.on('call-end',    () => { setStatus('idle'); setVolume(0); setIsMuted(false); });
    vapi.on('error', (e)  => { console.error('[Vapi error]', e); setStatus('error'); });
    vapi.on('volume-level', (v) => setVolume(v));

    return () => {
      vapi.stop();
    };
  }, []);

  const handleToggle = async () => {
    if (status === 'idle' || status === 'error') {
      setStatus('connecting');
      try {
        await vapiRef.current.start(ASSISTANT_ID);
      } catch (e) {
        console.error('[Vapi start error]', e);
        setStatus('error');
      }
    } else if (status === 'active') {
      vapiRef.current.stop();
    }
  };

  const handleMute = (e) => {
    e.stopPropagation();
    const next = !isMuted;
    vapiRef.current.setMuted(next);
    setIsMuted(next);
  };

  const isActive      = status === 'active';
  const isConnecting  = status === 'connecting';
  const pulse         = isActive && volume > 0.05;

  const bg = isActive
    ? 'linear-gradient(120deg,#3E2087,#7C3AED)'
    : dark
      ? 'linear-gradient(120deg,#3E2087,#7C3AED)'
      : 'linear-gradient(120deg,#3E2087,#7C3AED)';

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>

      {/* Tooltip label */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              background: '#2d0a0a',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b44',
              borderRadius: 12,
              padding: '8px 14px',
              fontSize: 13,
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 600,
              boxShadow: '0 4px 20px #ff000033',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Nova is Sleeping Now 
          </motion.div>
        )}
        {status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: dark ? '#1E0F45' : '#fff',
              color: dark ? '#F7F6FA' : '#191720',
              border: '1px solid #7C3AED44',
              borderRadius: 12,
              padding: '8px 14px',
              fontSize: 13,
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 600,
              boxShadow: '0 4px 20px #7C3AED33',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Talk to Agent Nova
          </motion.div>
        )}

        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            style={{
              background: dark ? '#1E0F45' : '#fff',
              color: '#7C3AED',
              border: '1px solid #7C3AED44',
              borderRadius: 12,
              padding: '8px 14px',
              fontSize: 13,
              fontFamily: "'Satoshi',sans-serif",
              fontWeight: 600,
              boxShadow: '0 4px 20px #7C3AED33',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
            onClick={handleMute}
          >
            {/* Sound bars */}
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
              {[0.4, 1, 0.6, 0.9, 0.5].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scaleY: pulse ? h * (0.5 + volume) : 0.3 }}
                  transition={{ duration: 0.15, delay: i * 0.04 }}
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: 14,
                    background: '#7C3AED',
                    borderRadius: 2,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </span>
            {isMuted ? 'Unmute' : 'Mute'} · End call
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        animate={pulse ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={pulse ? { duration: 0.5, repeat: Infinity } : {}}
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: bg,
          border: 'none',
          cursor: isConnecting ? 'wait' : 'pointer',
          boxShadow: isActive
            ? '0 0 0 0 #7C3AED66, 0 8px 32px #7C3AED66'
            : '0 8px 32px #7C3AED55',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          outline: 'none',
        }}
        title={isActive ? 'End call' : 'Talk to Nova'}
      >
        {/* Ripple ring when active */}
        {isActive && (
          <motion.span
            animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid #7C3AED99',
            }}
          />
        )}

        {isConnecting ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            style={{ display: 'block', width: 26, height: 26, border: '3px solid #fff5', borderTop: '3px solid #fff', borderRadius: '50%' }}
          />
        ) : isActive ? (
          /* End-call icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="white"/>
            <line x1="18" y1="6" x2="6" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          /* Phone icon */
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="white"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
