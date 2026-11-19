// One-shot status of the round: issues, marks, ship log, records, live check, runner health.
// Usage (from s03e03/): node agent/watch.mjs
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('agent/config.secrets.local.json', 'utf8'));
const LIVE = 'https://sched-prod-api-production.woookie89.workers.dev';
const get = async (p) => (await fetch(cfg.tracker.replace(/\/$/, '') + p, { headers: { authorization: `Bearer ${cfg.token}` } })).json();
const [list, ship, recs] = await Promise.all([get('/issues'), get('/shiplog'), get('/records')]);
console.log(`now ${list.now} · lastIssueBy ${list.lastIssueBy} · ${list.issues.length} issues`);
for (const i of list.issues) {
  const last = i.thread.at(-1);
  const owner = i.thread.filter((e) => e.by === 'owner').map((e) => e.body ?? e.label).join(' | ');
  console.log(`#${i.n} ${i.closed ? 'closed' : 'OPEN  '} [${i.labels.join(',')}] ${i.title.slice(0, 60)}  · last: ${last?.by}/${last?.kind} ${last?.at?.slice(11, 19) ?? ''}${owner ? `  · owner: ${owner.slice(0, 60)}` : ''}`);
}
console.log('\nship log:\n' + (ship.text || '(empty)'));
console.log('\nrecords:\n' + (recs.records ?? []).map((r) => `${r.id} by ${r.by} ${r.status} signed:${r.signedBy ?? '-'}`).join('\n'));
try { const r = await fetch(LIVE + '/incidents', { cache: 'no-store' }); console.log(`\nlive /incidents: ${r.status}`); } catch (e) { console.log('live: ' + e.message); }
const tail = fs.existsSync('agent/run.log') ? fs.readFileSync('agent/run.log', 'utf8').trim().split('\n').slice(-1)[0] : '';
console.log(`runner last log: ${tail.slice(0, 160)}`);
console.log(`supervisor flag: ${fs.existsSync('agent/RUN') ? 'on' : 'off'}`);
