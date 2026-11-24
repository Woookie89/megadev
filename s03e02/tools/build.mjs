// Builds the triaged tracker (doc/issues/*.md) from raw/ + tools/decisions.mjs, then checks it.
// Usage (from s03e02/): node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { issues as decided } from './decisions.mjs';

const OUT = 'repo/sched-prod/doc/issues';
const backlog = JSON.parse(fs.readFileSync('raw/backlog.json', 'utf8')).issues;
const requests = ['desk', 'chat', 'mail'].flatMap(ch => JSON.parse(fs.readFileSync(`raw/${ch}.json`, 'utf8')).items.map(i => ({ ...i, channel: ch })));
const byKey = new Map(decided.map(d => [d.key, d]));
const errors = [];

const tracker = [];
for (const b of backlog) {
  const d = byKey.get(b.key);
  if (b.status !== 'open') { tracker.push({ key: b.key, title: b.title, status: b.status, labels: b.labels, sources: [], body: b.body, ...(d ?? {}) }); continue; }
  if (!d) { errors.push(`open backlog ${b.key} has no decision`); continue; }
  tracker.push({ key: b.key, title: b.title, status: 'open', labels: [d.mark, ...b.labels], sources: d.sources ?? [], blockedBy: d.blockedBy, body: d.body });
}
for (const d of decided) {
  if (d.key.startsWith('SCHED-')) continue;
  const status = d.status ?? 'open';
  tracker.push({ key: d.key, title: d.title, status, reason: d.reason, duplicateOf: d.duplicateOf, blockedBy: d.blockedBy,
    labels: [...(status === 'open' ? [d.mark] : []), ...d.from.map(f => `from:${f}`)], sources: d.sources, body: d.body });
}

// ---------- checks (skill triage, step 4) ----------
const keys = new Set(tracker.map(t => t.key));
const seen = new Map();
for (const t of tracker) for (const s of t.sources ?? []) seen.set(s, [...(seen.get(s) ?? []), t.key]);
for (const r of requests) {
  const at = seen.get(r.id) ?? [];
  if (at.length !== 1) errors.push(`request ${r.id} (${r.channel}) is in ${at.length} issues: ${at.join(', ') || '—'} — "${r.text}"`);
}
for (const s of seen.keys()) if (!requests.some(r => r.id === s)) errors.push(`source ${s} is not a known request`);
for (const t of tracker) {
  const marks = t.labels.filter(l => l === 'agent-ready' || l === 'needs-human');
  if (t.status === 'open' && marks.length !== 1) errors.push(`${t.key} open with marks ${JSON.stringify(marks)}`);
  if (t.status !== 'open' && marks.length) errors.push(`${t.key} ${t.status} but marked`);
  if (t.status === 'open' && marks[0] === 'agent-ready') {
    for (const h of ['## Intent', '## Acceptance', '## Boundaries']) if (!t.body.includes(h)) errors.push(`${t.key} lacks ${h}`);
    if (!/Allowed by AUT-1/.test(t.body)) errors.push(`${t.key} lacks "Allowed by AUT-1"`);
    const acc = t.body.split('## Acceptance')[1]?.split('## Boundaries')[0] ?? '';
    if (!/\bnot\b/.test(acc)) errors.push(`${t.key} acceptance has no "not" case`);
    if (!/Given .*when .*then /.test(acc)) errors.push(`${t.key} acceptance has no Given/When/Then`);
  }
  if (t.status === 'open' && marks[0] === 'needs-human') {
    for (const h of ['## Question', '## Options', '## Recommendation', '## Why']) if (!t.body.includes(h)) errors.push(`${t.key} lacks ${h}`);
    const opts = (t.body.split('## Options')[1]?.split('## Recommendation')[0] ?? '').match(/^\d+\. /gm) ?? [];
    if (opts.length < 2) errors.push(`${t.key} has ${opts.length} options`);
    const why = t.body.split('## Why')[1] ?? '';
    if (!/(AUT|PRD|DES|ADR)-\d+|SCHED-\d+|IN-\d+/.test(why)) errors.push(`${t.key} Why cites no id`);
  }
  if (t.status === 'closed') {
    if (!['duplicate', 'obsolete', 'contradicts-spec', 'not-planned'].includes(t.reason)) errors.push(`${t.key} closed without valid reason`);
    if (t.reason === 'duplicate' && !keys.has(t.duplicateOf)) errors.push(`${t.key} duplicate-of missing`);
    if (!/(AUT|PRD|DES|ADR)-\d+|SCHED-\d+|IN-\d+/.test(t.body)) errors.push(`${t.key} closed body cites no id`);
  }
  for (const b of t.blockedBy ?? []) if (!keys.has(b)) errors.push(`${t.key} blocked-by unknown ${b}`);
}

if (errors.length) { console.log('FAIL\n- ' + errors.join('\n- ')); process.exit(1); }

// ---------- write ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const list = xs => `[${xs.join(', ')}]`;
for (const t of tracker) {
  const fm = [`key: ${t.key}`, `title: ${JSON.stringify(t.title)}`, `status: ${t.status}`];
  if (t.reason) fm.push(`reason: ${t.reason}`);
  fm.push(`labels: ${list(t.labels)}`);
  if (t.sources?.length) fm.push(`sources: ${list(t.sources)}`);
  if (t.blockedBy?.length) fm.push(`blocked-by: ${list(t.blockedBy)}`);
  if (t.duplicateOf) fm.push(`duplicate-of: ${t.duplicateOf}`);
  fs.writeFileSync(path.join(OUT, `${t.key}.md`), `---\n${fm.join('\n')}\n---\n\n${t.body}\n`, 'utf8');
}
const count = (f) => tracker.filter(f).length;
console.log(`PASS ${tracker.length} issues: open ${count(t => t.status === 'open')} (agent-ready ${count(t => t.labels.includes('agent-ready'))}, needs-human ${count(t => t.labels.includes('needs-human'))}), done ${count(t => t.status === 'done')}, closed ${count(t => t.status === 'closed')}; ${requests.length} requests, each in one issue.`);
