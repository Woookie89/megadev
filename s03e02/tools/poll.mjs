// Accumulates every channel item into raw/<channel>.json (dedup by id), polling with cursors.
// Usage: node tools/poll.mjs [rounds=1] [intervalSec=30]   (run from s03e02/)
import fs from 'node:fs';
const t = JSON.parse(fs.readFileSync('session.secrets.local.json', 'utf8')).session;
const api = 'https://hq.mega.dev/challenges/nothing-ships-unmarked/api';
const rounds = +(process.argv[2] ?? 1), every = +(process.argv[3] ?? 30) * 1000;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let quiet = 0;
for (let n = 0; n < rounds; n++) {
  let fresh = 0;
  for (const ch of ['desk', 'chat', 'mail']) {
    const f = `raw/${ch}.json`;
    const c = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : { items: [] };
    const r = await fetch(`${api}/channels/${ch}?` + new URLSearchParams({ t, ...(c.cursor ? { since: c.cursor } : {}) }));
    const b = await r.json();
    if (!r.ok) { console.log(new Date().toISOString(), ch, r.status, b.message ?? ''); continue; }
    const have = new Set(c.items.map(i => i.id));
    const add = b.items.filter(i => !have.has(i.id)).map(i => ({ ...i, seenAt: new Date().toISOString() }));
    c.items.push(...add); c.cursor = b.cursor;
    fs.writeFileSync(f, JSON.stringify(c, null, 2));
    for (const i of add) console.log(new Date().toISOString(), ch, i.id, i.from, i.text);
    fresh += add.length;
  }
  quiet = fresh ? 0 : quiet + 1;
  if (n < rounds - 1) await sleep(every);
}
console.log('done', new Date().toISOString(), 'quiet rounds at end:', quiet);
