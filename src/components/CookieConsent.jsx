import { useEffect, useState } from 'react';
import { pixelEnabled, setConsent, startPixel, storedConsent } from '../lib/oaiPixel';

/** A small consent bar, shown only when the measurement pixel is switched on and not yet answered. */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!pixelEnabled()) return;
    startPixel();
    if (!storedConsent()) setOpen(true);
  }, []);
  if (!open) return null;
  const answer = (yes) => { setConsent(yes); setOpen(false); };
  return (
    <div className="cc-bar" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p>We use a measurement cookie to see which ads bring visitors to Paralox Media. No personal data is sold.</p>
      <div className="cc-actions">
        <button type="button" className="cc-no" onClick={() => answer(false)}>Decline</button>
        <button type="button" className="cc-yes" onClick={() => answer(true)}>Accept</button>
      </div>
    </div>
  );
}
