import { useEffect, useState } from 'react';
import { CONTACT, WORK } from '../data/content';
import { WorkCard } from '../sections/HomeSections';
import { unseal } from '../lib/sealed';
import '../styles/ratecard.css';

/**
 * Private works page at /works/<token>, shared by link only. Which projects it
 * shows (public ones by their /work/ link, or private ones in full) is published
 * encrypted and decrypted with the link's token (see scripts/private-page.mjs).
 */
export default function Works({ token }) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let live = true;
    unseal('works', 'works', token)
      .then((r) => live && setState(r ? { status: 'ok', page: r.data } : { status: 'invalid' }))
      .catch(() => live && setState({ status: 'invalid' }));
    return () => { live = false; };
  }, [token]);

  if (state.status !== 'ok') {
    return (
      <section className="rc-gate">
        <div className="wrap">
          <p className="rc-kick">Paralox Media · Works</p>
          {state.status === 'loading'
            ? <h1>Loading the work…</h1>
            : (<>
                <h1>This link is not available.</h1>
                <p>This page is shared privately, and this link may have expired. Ask us for a new one.</p>
                <div className="rc-hero-actions">
                  <a className="btn btn-primary" href="/contact">Contact us <span className="arr">→</span></a>
                  <a className="link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </>)}
        </div>
      </section>
    );
  }

  const { page } = state;
  const items = page.items
    .map((it) => (typeof it === 'string' ? WORK.find((w) => w.href === it) : it))
    .filter(Boolean);
  return (
    <>
      <header className="rc-hero">
        <div className="wrap">
          <p className="rc-private"><span aria-hidden="true">●</span> Shared privately with you</p>
          <p className="rc-kick">Paralox Media · Portfolio</p>
          <h1>{page.title}<span className="dot">.</span></h1>
          <p className="rc-tagline">{page.intro}</p>
          <p className="rc-pillars mono">AI · Engineering · Media · Growth</p>
        </div>
      </header>
      <section className="work sec lt">
        <div className="wrap">
          <div className="bento">
            {items.map((w) => <WorkCard key={w.title} w={w} />)}
          </div>
        </div>
      </section>
    </>
  );
}
