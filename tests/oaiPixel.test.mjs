import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import { EventEmitter } from 'node:events';

const pixelSource = readFileSync(new URL('../src/lib/oaiPixel.js', import.meta.url), 'utf8').replaceAll('export ', '');
function browser() {
  const calls = [], requests = [];
  const context = vm.createContext({
    window: { oaiq: (...args) => calls.push(args), crypto: webcrypto, location: { origin: 'https://paraloxmedia.com', pathname: '/contact' } },
    document: { title: 'Contact' }, TextEncoder,
    localStorage: { getItem: () => null, setItem: () => { throw new Error('storage blocked'); } },
    fetch: async (...args) => { requests.push(args); },
  });
  vm.runInContext(pixelSource, context);
  return { context, calls, requests, run: (code) => vm.runInContext(code, context) };
}
test('consent precedes init; acceptance records one page even when storage is blocked', () => {
  const b = browser();
  b.run('startPixel(); trackPageView();');
  assert.equal(b.calls[0][0], 'consent');
  assert.equal(b.calls[0][1], false);
  assert.equal(b.calls.filter(c => c[0] === 'measure').length, 0);
  b.run('setConsent(true); trackPageView(); startPixel();');
  assert.equal(b.calls.filter(c => c[0] === 'init').length, 1);
  assert.equal(b.calls.filter(c => c[0] === 'measure').length, 1);
  b.run("window.location.pathname = '/about'; trackPageView(); setConsent(false); track('lead_created');");
  assert.equal(b.calls.filter(c => c[0] === 'measure').length, 2);
  assert.equal(b.requests.length, 0);
});
test('static conversion measures once with hashed matching and no server request', async () => {
  const b = browser(); b.run("setConsent(true); track('lead_created', {}, { email: ' Test@example.com ' });");
  for (let n = 0; n < 50 && !b.calls.some(c => c[1] === 'lead_created'); n++) await new Promise(r => setTimeout(r, 5));
  const event = b.calls.find(c => c[1] === 'lead_created');
  assert.ok(event[3].event_id);
  assert.equal(b.calls.filter(c => c[1] === 'lead_created').length, 1);
  assert.equal(b.requests.length, 0);
  const matching = b.calls.find(c => c[0] === 'init' && c[1].user);
  assert.equal(matching[1].pixelId, undefined);
  assert.match(matching[1].user.email_sha256, /^[a-f0-9]{64}$/);
});
test('throwing SDK cannot break navigation or form success', () => {
  const b = browser(); b.run("setConsent(true); window.oaiq = () => { throw Error('blocked'); };");
  assert.doesNotThrow(() => b.run("trackPageView(); track('lead_created'); setConsent(false);"));
});
const serverSource = readFileSync(new URL('../server.cjs', import.meta.url), 'utf8');
const section = serverSource.slice(serverSource.indexOf('const ADS_PIXEL_ID'), serverSource.indexOf('const server = http.createServer'));
async function serverEvent(body, cookie = '') {
  const sent = [];
  const ctx = vm.createContext({ process: { env: { OPENAI_ADS_API_KEY: 'placeholder-for-mocked-fetch' } }, crypto: await import('node:crypto'), require: () => ({ isIP: () => 0 }), ORIGIN: 'https://paraloxmedia.com', URL, AbortSignal, console: { warn() {} }, fetch: async (url, options) => { sent.push(JSON.parse(options.body)); return { ok: true }; } });
  vm.runInContext(section, ctx);
  const req = new EventEmitter(); Object.assign(req, { method: 'POST', headers: { origin: 'https://paraloxmedia.com', cookie }, socket: {} });
  let status;
  const promise = ctx.handleConversion(req, { writeHead(code) { status = code; }, end() {} });
  req.emit('data', JSON.stringify(body)); req.emit('end'); await promise;
  return { sent, status };
}
test('server strips URL secrets and preserves opaque attribution cookies', async () => {
  const result = await serverEvent({ event: 'lead_created', id: 'one', consent: true, source_url: 'https://paraloxmedia.com/contact?email=private#secret' }, '__oppref=opaque%2Fvalue; __obref=bad%escape');
  assert.equal(result.status, 204);
  assert.equal(result.sent[0].events[0].oppref, 'opaque%2Fvalue');
  assert.equal(result.sent[0].events[0].user.obref, 'bad%escape');
  assert.equal(result.sent[0].events[0].source_url, 'https://paraloxmedia.com/contact');
});
test('server rejects malformed body and does not forward without consent', async () => {
  assert.equal((await serverEvent(null)).status, 400);
  assert.equal((await serverEvent({ event: 'lead_created', id: 'two' })).sent.length, 0);
  const r = await serverEvent({ event: 'lead_created', id: 'three', consent: true, source_url: 'https://untrusted.example/private' });
  assert.equal(r.sent[0].events[0].source_url, 'https://paraloxmedia.com/');
});
