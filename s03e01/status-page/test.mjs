// Requirement checks against the worker, with the ops feed mocked by the real shape.
// Run: node test.mjs            (local, mocked feed)
//      node test.mjs <baseUrl>  (deployed, real feed — checks from the outside)
import assert from 'node:assert/strict';
import fs from 'node:fs';

const FEED = 'https://hq.mega.dev/challenges/status-for-the-night/api/incidents/e61181243445';
const base = process.argv[2];
let get, feed;

if (base) {
  get = (p, init) => fetch(base.replace(/\/$/, '') + p, init);
  feed = await (await fetch(FEED)).json();
} else {
  feed = JSON.parse(JSON.parse(fs.readFileSync(new URL('../feed-browser.json', import.meta.url))).body);
  feed.updatedAt = '2026-11-19T08:38:00Z';
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), FEED);
    return new Response(JSON.stringify(feed), { headers: { 'content-type': 'application/json' } });
  };
  const worker = (await import('./src/index.js')).default;
  get = (p, init) => worker.fetch(new Request('https://x.test' + p, init));
  void realFetch;
}

const ok = (name, fn) => fn().then(() => console.log('PASS', name), e => { console.log('FAIL', name, '-', e.message); process.exitCode = 1; });

const j = await get('/status.json');
const body = await j.json();
const h = await get('/');
const html = await h.text();
const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

await ok('R-K8L updatedAt = ops feed updatedAt (live)', async () => {
  const live = base ? (await (await fetch(FEED)).json()).updatedAt : feed.updatedAt;
  assert.ok([feed.updatedAt, live].includes(body.updatedAt), `${body.updatedAt} vs feed ${live}`);
});
await ok('R-H8X updatedAt UTC ending Z', async () => assert.match(body.updatedAt, /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d(\.\d+)?)?Z$/));
await ok('R-K4M status.json ACAO *', async () => assert.equal(j.headers.get('access-control-allow-origin'), '*'));
await ok('R-L5Z status.json Cache-Control max-age <= 60', async () => {
  const m = /max-age=(\d+)/.exec(j.headers.get('cache-control') || '');
  assert.ok(m && +m[1] <= 60, j.headers.get('cache-control'));
});
await ok('status.json is JSON with incidents', async () => {
  assert.match(j.headers.get('content-type'), /application\/json/);
  assert.equal(body.incidents.length, feed.incidents.length);
});
await ok('page is public html 200', async () => { assert.equal(h.status, 200); assert.match(h.headers.get('content-type'), /text\/html/); });
await ok('R-Z5L heading exactly "status for the night"', async () => assert.match(html, /<h1[^>]*>status for the night<\/h1>/));
await ok('R-M9Z amber banner #f5a623', async () => assert.match(html, /#f5a623/i));
await ok('R-X2M says "read by tram 3 boards"', async () => assert.ok(text.includes('read by tram 3 boards')));
await ok('R-H4L footer "all times UTC"', async () => assert.match(html, /<footer[^>]*>[\s\S]*all times UTC[\s\S]*<\/footer>/));
await ok('R-M3H newest incident at the top', async () => {
  const ids = [...html.matchAll(/data-incident="(\d+)"/g)].map(m => m[1]);
  const want = [...feed.incidents].sort((a, b) => b.opened.localeCompare(a.opened)).map(i => i.id);
  assert.deepEqual(ids, want);
  assert.deepEqual(body.incidents.map(i => i.id), want);
});
await ok('R-Z2K every line has its own row, tram 3 included', async () => {
  const lines = [...html.matchAll(/data-line="([^"]+)"/g)].map(m => m[1]);
  for (const l of new Set(feed.incidents.map(i => i.line))) assert.ok(lines.includes(l), l);
  assert.ok(lines.includes('tram 3'));
  assert.equal(lines.length, new Set(lines).size);
});
await ok('R-L3K dates day first DD/MM (product answer)', async () => {
  assert.ok(text.includes('05/10'), 'expects 05/10 for 5 Oct');
  assert.ok(!text.includes('10/05'), 'no month-first 10/05');
});
await ok('times HH:MM 24h UTC', async () => assert.ok(text.includes('03:51') && text.includes('22:40')));
await ok('no tracking, no cookies', async () => {
  assert.equal(h.headers.get('set-cookie'), null);
  assert.ok(!/<script[^>]+src=/i.test(html));
});
