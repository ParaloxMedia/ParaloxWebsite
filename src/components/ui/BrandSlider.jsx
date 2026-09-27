import { motion } from 'framer-motion';
import { CLIENTS } from '../../data';

// Two opposing marquees of client logos. Tiles are square because most
// supplied logos are square artwork; `contain` keeps the rest uncropped.
export function BrandSlider({ dark }) {
  const bd = dark ? 'rgba(255,255,255,.08)' : '#E6E4EC';
  const d  = [...CLIENTS, ...CLIENTS];

  const Item = ({ c }) => (
    <motion.div whileHover={{ y: -3 }}
      title={c.n}
      style={{ width: 104, height: 104, flexShrink: 0, borderRadius: 20, overflow: 'hidden', background: '#FFFFFF', border: `1px solid ${bd}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={c.logo} alt={c.n} loading="lazy" draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', padding: c.pad ? 14 : 0, boxSizing: 'border-box' }} />
    </motion.div>
  );

  return (
    <div style={{ overflow: 'hidden', padding: '6px 0' }}>
      <div className="sl" style={{ display: 'flex', gap: 14, width: 'max-content', marginBottom: 14 }}>
        {d.map((c, i) => <Item key={`a${i}`} c={c} />)}
      </div>
      <div className="sr" style={{ display: 'flex', gap: 14, width: 'max-content' }}>
        {[...d].reverse().map((c, i) => <Item key={`b${i}`} c={c} />)}
      </div>
    </div>
  );
}
