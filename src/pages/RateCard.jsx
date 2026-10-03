import { Fragment, useEffect, useState } from 'react';
import { CONTACT } from '../data/content';
import '../styles/ratecard.css';

/**
 * Private 2026 rate card at /rate-card/<token>. Nothing about pricing is in the
 * public bundle: the content comes from the server, which only answers for valid
 * share links (see server.cjs and scripts/rate-card.mjs).
 */

const fmtLkr = (n) => n.toLocaleString('en-US');

function Price({ p, big = false }) {
  if (!p) return null;
  if (p.quote) return <span className="rc-quote">Request a quote</span>;
  if (p.text) return <span className={`rc-price${big ? ' big' : ''}`}><b>{p.text}</b>{p.unit && <small> {p.unit}</small>}</span>;
  return (
    <span className={`rc-price${big ? ' big' : ''}`}>
      <i>LKR</i> <b>{fmtLkr(p.lkr)}{p.to ? `–${fmtLkr(p.to)}` : ''}</b>{p.plus && <em>+</em>}
      {p.unit && <small> {p.unit}</small>}
    </span>
  );
}

function Block({ b }) {
  switch (b.type) {
    case 'feature':
      return (
        <div className="rc-feature">
          <div>
            <p className="rc-kick">{b.label}</p>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
          <div className="rc-feature-price">{b.priceLabel && <p className="rc-kick">{b.priceLabel}</p>}<Price p={b.price} big /></div>
        </div>
      );
    case 'chips':
      return (
        <div className="rc-block">
          <p className="rc-sub">{b.title}</p>
          <ul className="rc-chips">{b.items.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      );
    case 'cta':
      return (
        <div className="rc-cta">
          <div><p className="rc-kick">{b.label}</p><p>{b.text}</p></div>
          <p className="rc-cta-line">{b.line}</p>
        </div>
      );
    case 'cards':
      return (
        <div className="rc-block">
          {b.title && <p className="rc-sub">{b.title}</p>}
          <div className={`rc-cards n${b.items.length}`}>
            {b.items.map((c) => (
              <div key={c.name} className={`rc-card${c.dark ? ' dark' : ''}`}>
                <div className="rc-card-top"><h4>{c.name}</h4>{c.price?.quote && <Price p={c.price} />}</div>
                {c.text && <p>{c.text}</p>}
                {c.price && !c.price.quote && <Price p={c.price} big />}
              </div>
            ))}
          </div>
        </div>
      );
    case 'lists':
      return (
        <div className="rc-block">
          {b.title && <p className="rc-sub">{b.title}</p>}
          <div className="rc-lists">
            {b.groups.map((g) => (
              <div key={g.title} className="rc-list">
                <p className="rc-list-head"><span>{g.title}</span>{g.note && <small>{g.note}</small>}</p>
                {g.rows.map((r, i) => (
                  <div key={`${r.name}-${i}`} className="rc-row">
                    <div><b>{r.name}</b>{r.note && <small>{r.note}</small>}</div>
                    <Price p={r.price} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    case 'matrix':
      return (
        <div className="rc-block">
          {b.title && <p className="rc-sub">{b.title}</p>}
          <div className="rc-matrix-wrap">
            <table className="rc-matrix">
              <thead><tr><th>{b.corner || ''}</th>{b.cols.map((c, i) => <th key={c} className={i === b.highlight ? 'hl' : undefined}>{c}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((r) => (
                  <tr key={r.name}>
                    <th scope="row"><b>{r.name}</b>{r.note && <small>{r.note}</small>}</th>
                    {r.cells.map((c, i) => <td key={i} data-col={b.cols[i]} className={i === b.highlight ? 'hl' : undefined}><Price p={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'tiers':
      return (
        <div className="rc-tiers">
          {b.items.map((t) => (
            <div key={t.name} className={`rc-tier${t.featured ? ' dark' : ''}`}>
              <p className="rc-kick">{t.label}</p>
              <h3>{t.name}</h3>
              {t.price && <Price p={t.price} big />}
              {t.text && <p className="rc-tier-text">{t.text}</p>}
              <ul>{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          ))}
        </div>
      );
    case 'steps':
      return (
        <div className="rc-steps">
          <p className="rc-kick">{b.title}</p>
          <ol>
            {b.items.map((s, i) => (
              <Fragment key={s}>
                {b.equation && i > 0 && <span className="rc-op" aria-hidden="true">{i === b.items.length - 1 ? '=' : '+'}</span>}
                <li className={i === b.items.length - 1 ? 'last' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
              </Fragment>
            ))}
          </ol>
        </div>
      );
    case 'note':
      return <p className="rc-note">{b.label && <b>{b.label}</b>}{b.text}</p>;
    default:
      return null;
  }
}

export default function RateCard({ token }) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let live = true;
    fetch(`/api/rate-card/${encodeURIComponent(token)}`, { cache: 'no-store', referrerPolicy: 'no-referrer' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((card) => live && setState({ status: 'ok', card }))
      .catch(() => live && setState({ status: 'invalid' }));
    return () => { live = false; };
  }, [token]);

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (state.status !== 'ok') {
    return (
      <section className="rc-gate">
        <div className="wrap">
          <p className="rc-kick">Paralox Media · Rate card</p>
          {state.status === 'loading'
            ? <h1>Loading the rate card…</h1>
            : (<>
                <h1>This link is not available.</h1>
                <p>The rate card is shared privately, and this link may have expired. Ask us for a new one.</p>
                <div className="rc-hero-actions">
                  <a className="btn btn-primary" href="/contact">Contact us <span className="arr">→</span></a>
                  <a className="link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
              </>)}
        </div>
      </section>
    );
  }

  const { card } = state;
  return (
    <article className="rc">
      <header className="rc-hero">
        <div className="wrap">
          <p className="rc-private"><span aria-hidden="true">●</span> Shared privately with you</p>
          <p className="rc-kick">Edition {card.edition} · Colombo, Sri Lanka</p>
          <h1><span>{card.edition}</span> {card.title}</h1>
          <p className="rc-tagline">{card.tagline}</p>
          <p className="rc-pillars mono">AI · Engineering · Media · Growth</p>
          <div className="rc-hero-actions">
            <a className="btn btn-white" href={`/api/rate-card/${encodeURIComponent(token)}/pdf`} rel="noreferrer">Download PDF <span className="arr">↓</span></a>
            <a className="link" href="/contact" style={{ color: '#fff' }}>Request a quote <span className="arr">→</span></a>
          </div>
        </div>
      </header>

      <section className="rc-overview">
        <div className="wrap">
          <p className="rc-intro">{card.intro}</p>
          <div className="rc-legend">
            {card.legend.map((l) => <div key={l.label}><Price p={l.price} /><small>{l.label}</small></div>)}
          </div>
          <nav className="rc-jump" aria-label="Rate card sections">
            {card.pillars.map((pl, i) => (
              <button key={pl.key} type="button" onClick={() => jump(`rc-${pl.key}`)}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span><b>{pl.name}</b><small>{pl.summary}</small>
              </button>
            ))}
          </nav>
        </div>
      </section>

      {card.pillars.map((pl, pi) => (
        <section key={pl.key} id={`rc-${pl.key}`} className="rc-pillar">
          <div className="wrap">
            <p className="rc-pillar-head"><span className="mono">{String(pi + 1).padStart(2, '0')}</span>{pl.name}</p>
            {pl.sheets.map((sh) => (
              <div key={sh.title} className="rc-sheet">
                <p className="rc-tag"><span>{pl.name}</span>{sh.label}</p>
                <h2>{sh.title}</h2>
                <p className="rc-sheet-intro">{sh.intro}</p>
                {sh.blocks.map((b, i) => <Block key={i} b={b} />)}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="rc-terms">
        <div className="wrap">
          <p className="rc-tag"><span>Terms</span>Commercial terms</p>
          <h2>Commercial Terms</h2>
          <p className="rc-sheet-intro">How we work together: clear, simple and agreed before any project begins.</p>
          <ol>{card.terms.map((t, i) => <li key={i}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{t}</li>)}</ol>
        </div>
      </section>
    </article>
  );
}
