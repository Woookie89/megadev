// Emits one line per change on the tracker and in the runner's health: new issue, labels, owner/course
// comments, closes, ship-log lines, records/signatures, runner errors, supervisor restarts. Polls every 30 s.
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync('agent/config.secrets.local.json', 'utf8'));
const get = async (p) => (await fetch(cfg.tracker + p, { headers: { authorization: `Bearer ${cfg.token}` } })).json();
const seen = new Set();
let logPos = fs.existsSync('agent/run.log') ? fs.statSync('agent/run.log').size : 0;
let supPos = fs.existsSync('agent/supervise.log') ? fs.statSync('agent/supervise.log').size : 0;
const emit = (k, line) => { if (!seen.has(k)) { seen.add(k); if (!first) console.log(line); } };
let first = true;
const tailNew = (file, pos) => { if (!fs.existsSync(file)) return [pos, []]; const size = fs.statSync(file).size; if (size <= pos) return [size, []];
  const fd = fs.openSync(file, 'r'); const buf = Buffer.alloc(size - pos); fs.readSync(fd, buf, 0, buf.length, pos); fs.closeSync(fd); return [size, buf.toString('utf8').split('\n')]; };
for (;;) {
  try {
    const [list, ship, recs] = await Promise.all([get('/issues'), get('/shiplog'), get('/records')]);
    for (const i of list.issues ?? []) {
      emit(`i${i.n}`, `NEW ISSUE #${i.n} "${i.title}"`);
      i.thread.forEach((e, k) => {
        if (e.by !== 'agent') emit(`i${i.n}t${k}`, `#${i.n} ${e.by.toUpperCase()} ${e.kind}: ${(e.body ?? e.label ?? '').replace(/\s+/g, ' ').slice(0, 200)}`);
        else if (e.kind === 'label') emit(`i${i.n}t${k}`, `#${i.n} agent label ${e.label}`);
        else if (e.kind === 'close') emit(`i${i.n}t${k}`, `#${i.n} agent closed`);
      });
    }
    for (const l of (ship.text ?? '').split('\n').filter(Boolean)) emit(`s${l}`, `SHIP ${l}`);
    for (const r of recs.records ?? []) emit(`r${r.id}${r.status}${r.signedBy}`, `RECORD ${r.id} ${r.status} signed:${r.signedBy ?? '-'}`);
    if (!first && list.now > list.lastIssueBy) emit('allin', `ALL ISSUES IN (lastIssueBy ${list.lastIssueBy})`);
  } catch (e) { console.log(`watch error: ${e.message}`); }
  let lines;
  [logPos, lines] = tailNew('agent/run.log', logPos);
  for (const l of lines) if (/model error|tracker error|turn failed|step limit|DEPLOY FAILED|NOT DEPLOYED/.test(l)) console.log(`RUNNER ${l.slice(0, 220)}`);
  [supPos, lines] = tailNew('agent/supervise.log', supPos);
  for (const l of lines) if (/exited|exits/.test(l)) console.log(`SUPERVISOR ${l}`);
  first = false;
  await new Promise((r) => setTimeout(r, 30_000));
}
