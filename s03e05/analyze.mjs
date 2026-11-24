import fs from 'node:fs';
const rows = fs.readFileSync(process.argv[2] ?? 'events.csv', 'utf8').trim().split('\n').slice(1).map((l) => { const p = l.split(','); return { id: p[0], ts: p[1], site: p[2], arm: p[3], night: p[4], inc: p[5], op: p[6], ev: p[7], detail: p.slice(8).join(',') }; });
const by = (xs, k) => xs.reduce((m, x) => ((m[k(x)] ??= []).push(x), m), {});
const med = (a) => { const s = [...a].sort((x, y) => x - y); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : NaN; };
// arm per site
const siteArms = Object.entries(by(rows, (r) => r.site)).map(([s, rs]) => [s, [...new Set(rs.map((r) => r.arm))]]);
console.log('sites in both arms:', siteArms.filter(([, a]) => a.length > 1).length, 'of', siteArms.length);
for (const arm of ['control', 'flag']) {
  const R = rows.filter((r) => r.arm === arm);
  const incs = by(R, (r) => r.inc);
  const sn = by(R.filter((r) => r.ev === 'incident_opened'), (r) => r.site + '|' + r.night);
  const bad = new Set(Object.entries(sn).filter(([, v]) => v.length >= 3).map(([k]) => k));
  const allSN = new Set(R.map((r) => r.site + '|' + r.night));
  const restartsBad = R.filter((r) => r.ev === 'restart' && bad.has(r.site + '|' + r.night)).length;
  const ttr = Object.values(incs).map((es) => { const o = es.find((e) => e.ev === 'incident_opened'); const z = es.find((e) => e.ev === 'incident_resolved'); return o && z ? (Date.parse(z.ts) - Date.parse(o.ts)) / 60000 : null; }).filter((x) => x !== null);
  const n = Object.keys(incs).length;
  const shown = R.filter((r) => r.ev === 'suggestion_shown').length, acc = R.filter((r) => r.ev === 'suggestion_accepted').length;
  const reopened = new Set(R.filter((r) => r.ev === 'incident_reopened').map((r) => r.inc)).size;
  console.log(`${arm}: sites ${new Set(R.map((r) => r.site)).size}, site-nights ${allSN.size}, bad nights ${bad.size}, restarts on bad nights ${restartsBad} -> ${(restartsBad / bad.size).toFixed(3)}/bad night; all restarts ${R.filter((r) => r.ev === 'restart').length}; incidents ${n}; accept ${acc}/${shown}=${(acc / shown).toFixed(3)}; median TTR ${med(ttr).toFixed(1)} min; reopened ${reopened}/${n}=${(100 * reopened / n).toFixed(2)}%`);
  // restarts that follow an accepted suggestion on the same incident
  const afterAccept = Object.values(incs).filter((es) => es.some((e) => e.ev === 'suggestion_accepted') && es.some((e) => e.ev === 'restart')).length;
  console.log(`   incidents with accept+restart ${afterAccept}; with restart ${Object.values(incs).filter((es) => es.some((e) => e.ev === 'restart')).length}`);
}
