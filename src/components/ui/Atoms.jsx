import { T } from '../../data';

// Section label. Brand standards: JetBrains Mono for labels and metadata,
// with a single violet dot as the controlled accent.
export function Chip({ text, center, light }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: light ? 'rgba(255,255,255,.08)' : 'rgba(124,58,237,.07)',
      border: light ? '1px solid rgba(255,255,255,.16)' : '1px solid rgba(124,58,237,.18)',
      borderRadius: 30, padding: '6px 14px', marginBottom: 16,
      ...(center && { margin: '0 auto 16px', display: 'flex', width: 'fit-content' }),
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: light ? '#B69CFF' : T.violet, flexShrink: 0 }} />
      <span style={{
        fontSize: '.7rem', fontWeight: 500,
        color: light ? 'rgba(255,255,255,.82)' : T.violet,
        letterSpacing: 1.6, textTransform: 'uppercase',
        fontFamily: T.mono,
      }}>{text}</span>
    </div>
  );
}

// Highlighted words in a headline. Solid violet rather than a text gradient:
// the official gradient starts at Deep Purple, which disappears on ink.
export function GradText({ children }) {
  return <span style={{ color: T.violet }}>{children}</span>;
}

export function Heading({ children, dark, size = 'clamp(1.9rem,3.8vw,3.2rem)', center, white }) {
  return (
    <h2 style={{
      fontFamily: "'Satoshi', sans-serif", fontWeight: 900,
      fontSize: size, letterSpacing: '-1.5px', lineHeight: 1.08,
      color: white ? '#fff' : dark ? '#F7F6FA' : T.ink,
      margin: 0,
      ...(center && { textAlign: 'center' }),
    }}>
      {children}
    </h2>
  );
}
