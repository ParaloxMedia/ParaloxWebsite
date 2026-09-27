import { ICON_PATHS } from '../lib/iconPaths';
import { SOCIALS } from '../data/content';

export const BrandIcon = ({ name, ...rest }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}><path fill="currentColor" d={ICON_PATHS[name]} /></svg>
);

/** Google's four-colour "G" logo. */
export const GoogleLogo = (props) => (
  <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

export function Socials() {
  return (
    <div className="socials">
      {SOCIALS.map((s) => (
        <a key={s.key} className="soc" href={s.url} target="_blank" rel="noopener" aria-label={`Paralox Media on ${s.label}`}>
          <BrandIcon name={s.key} />
        </a>
      ))}
    </div>
  );
}

export const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 16.5 16.5 7.5" /><path d="M9 7.5h7.5V15" /></svg>
);
export const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="3" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
);

/** Copies text; returns a promise resolving true/false. */
export function copyText(text) {
  try { return navigator.clipboard.writeText(text).then(() => true, () => false); } catch { return Promise.resolve(false); }
}
export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 5.6a5.2 5.2 0 0 1 4.1 4.1" /><path d="M14.1 2a8.9 8.9 0 0 1 7.9 7.9" /><path d="M5.2 3.6h2.9l1.9 4.8-2.4 1.5a11.3 11.3 0 0 0 5 5l1.5-2.4 4.8 1.9v2.9a2 2 0 0 1-2.2 2A17.4 17.4 0 0 1 3.2 5.8a2 2 0 0 1 2-2.2Z" /></svg>
);
export const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="3.2" /><path d="m4.2 8 6.7 4.8a2 2 0 0 0 2.2 0L19.8 8" /></svg>
);
export const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10.2" r="2.6" /></svg>
);
