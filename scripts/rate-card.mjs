// Private rate card: share links and encryption.
//
// The repository is public and the site can be served as static files, so the
// rate card is published only encrypted (public/sealed/). The browser decrypts
// it with the token in the share link; without a valid link it is unreadable.
// The readable files live in private/rate-card/ (git-ignored): card.json, the
// PDF and links.json.
//
// Each seal picks a new random content key, encrypts the card and the PDF with
// it, and stores that key once per active link, wrapped with a key derived from
// the link's token. Revoking a link drops its entry and rotates the content key.
//
//   node scripts/rate-card.mjs new "Client name"   create a share link
//   node scripts/rate-card.mjs list                show all links
//   node scripts/rate-card.mjs revoke <link|name>  switch a link off
//   node scripts/rate-card.mjs seal                re-encrypt after editing card.json or the PDF
//
// Commit public/sealed/ and deploy after every change.
import { createCipheriv, createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'private/rate-card');
const OUT = join(ROOT, 'public/sealed');
const LINKS = join(DIR, 'links.json');
const SITE = 'https://paraloxmedia.com';

// Must match src/pages/RateCard.jsx and server.cjs.
const sha256 = (s) => createHash('sha256').update(s).digest();
const linkId = (token) => sha256(`plx-rc-id:${token}`).toString('hex').slice(0, 32);
const linkKey = (token) => sha256(`plx-rc-key:${token}`);

/** AES-256-GCM in the WebCrypto layout: ciphertext followed by the 16-byte tag. */
function encrypt(key, data) {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  return { iv, data: Buffer.concat([c.update(data), c.final(), c.getAuthTag()]) };
}

const readLinks = () => (existsSync(LINKS) ? JSON.parse(readFileSync(LINKS, 'utf8')) : []);
const writeLinks = (links) => writeFileSync(LINKS, `${JSON.stringify(links, null, 2)}\n`);
const url = (token) => `${SITE}/rate-card/${token}`;

function seal() {
  const active = readLinks().filter((l) => !l.revoked);
  const key = randomBytes(32);
  const card = encrypt(key, Buffer.from(JSON.stringify(JSON.parse(readFileSync(join(DIR, 'card.json'), 'utf8')))));
  const pdfFile = join(DIR, 'rate-card.pdf');
  const pdf = existsSync(pdfFile) ? encrypt(key, readFileSync(pdfFile)) : null;
  const links = Object.fromEntries(active.map((l) => {
    const w = encrypt(linkKey(l.token), key);
    return [linkId(l.token), { iv: w.iv.toString('base64'), key: w.data.toString('base64') }];
  }));
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'rate-card.json'), `${JSON.stringify({
    v: 2, links, card: { iv: card.iv.toString('base64'), data: card.data.toString('base64') },
    pdf: pdf ? { iv: pdf.iv.toString('base64'), file: 'rate-card.bin' } : null,
  })}\n`);
  if (pdf) writeFileSync(join(OUT, 'rate-card.bin'), pdf.data);
  console.log(`Sealed rate card → public/sealed/ (${active.length} active link(s)).`);
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'new') {
  const name = args.join(' ').trim() || 'Shared link';
  const token = randomBytes(18).toString('base64url'); // 144 bits: not guessable
  writeLinks([...readLinks(), { token, name, created: new Date().toISOString().slice(0, 10) }]);
  seal();
  console.log(`\n${name}\n${url(token)}\n\nCommit public/sealed/ and deploy for the link to work.`);
} else if (cmd === 'list') {
  const links = readLinks();
  if (!links.length) console.log('No links yet. Create one with: node scripts/rate-card.mjs new "Client name"');
  for (const l of links) console.log(`${l.revoked ? 'REVOKED ' : 'active  '} ${l.created}  ${l.name.padEnd(28)} ${url(l.token)}`);
} else if (cmd === 'revoke') {
  const q = args.join(' ').trim();
  const links = readLinks();
  const hit = links.filter((l) => !l.revoked && (q.endsWith(l.token) || l.name.toLowerCase() === q.toLowerCase()));
  if (!hit.length) { console.error(`No active link matches "${q}".`); process.exit(1); }
  hit.forEach((l) => { l.revoked = new Date().toISOString().slice(0, 10); });
  writeLinks(links);
  seal();
  console.log(`Revoked: ${hit.map((l) => l.name).join(', ')}. Commit public/sealed/ and deploy for it to take effect.`);
} else if (cmd === 'seal') {
  seal();
} else {
  console.log('Usage: node scripts/rate-card.mjs new "Client name" | list | revoke <link|name> | seal');
}
