# S03E02 "nothing ships unmarked" — log

## 2026-11-19 10:53Z start-challenge c0000000-0000-4000-8000-0000005e03e2

- task: triage the product's requests into its issue tracker, so every open issue is either ready for an agent (label agent-ready) or marked for a human (label needs-human).
- done: the course accepts the tracker and the triage skill, in one claim.
- you (human): nothing, unless the tracker is GitHub Issues (gh sign-in). needs-human issues are for the product's people, not the human.
- proofs: `session` (from start) -> API as ?t= and claim answer.session. Saved: s03e02/session.secrets.local.json (git-ignored), expires 2026-11-20 10:53Z. Calling start-challenge again deals a NEW set — do not.
- build: download repo zip (sched-prod-3e6e841d.zip); its collector fills a tracker from backlog + request channels; README names issue file format.
- skill: own skill `triage` (requests in, marked tracker out), wired where the agent can use it (check-lane skill-wiring); send its text with the tracker.
- submit: claim { session, tracker: {kind:"md", files:[{path,text}]} (all of doc/issues/) or {kind:"gh", ghJson}, skill: {name, path, text} } <= 256 KB.
- headless? no — human present.
- rook: "#4471 shipped itself at 04:04. nobody marked it. this week nothing ships unmarked."
- 2026-11-19 human: "start" -> tracker kind md (doc/issues/), no GitHub.
- 10:56Z skill triage: source .agents/skills/triage/SKILL.md (megadev repo, project scope), .claude/skills is already a link to .agents/skills, so no extra link. Undo: delete .agents/skills/triage.
- check-lane skill-wiring (project scope, .claude/skills = junction to .agents/skills) -> "wired": "The harness already loads the repo's skills. Use them as they are; change nothing."
- channels keep filling: tools/poll.mjs polls desk/chat/mail every 30 s for 20 min (raw/*.json, raw/poll.log). Backlog 17 issues (11 open, 6 done).
- tracker built by tools/build.mjs from tools/decisions.mjs -> repo/sched-prod/doc/issues/; build runs the skill's step-4 checks.
- 11:0xZ build PASS: 32 issues, open 23 (agent-ready 20, needs-human 3), done 6, closed 3; 20 requests each in one issue.
- calls: needs-human = SCHED-4486 (delete stored data, AUT-2), IN-1210+IN-4203 (CSV dd/mm vs client payroll relies on mm/dd), IN-6480+IN-9975 (feed all-day vs client screens rely on midnight-midnight). contradicts-spec = IN-7094 ('OK' button vs DES-5). obsolete = IN-7560 (SCHED-4471 done), IN-9312 (SCHED-4423 done). merged into sources: IN-3326->SCHED-4418, IN-1725->IN-2631, IN-5369->SCHED-4498. blocked-by: IN-5359 (compact view, URGENT) -> SCHED-4468.
- 10:59:32Z last request (IN-5342, product withdraws 'class' rename) -> IN-9280 agent-ready -> closed obsolete. Human asked 11:12 "cos tu czekamy?" -> checked, 13 min quiet, poller stopped, final poll + backlog unchanged.
- skill: added rules "conflicting requests -> one needs-human issue with both ids" and "later request can withdraw earlier one".
- 11:15Z build PASS: 32 issues, open 22 (agent-ready 19, needs-human 3), done 6, closed 4 (3 obsolete, 1 contradicts-spec); 21 requests each in one issue. claim-answer 28.7 KB.

## 2026-11-19 claim { session, tracker md (32 files), skill triage } -> SOLVED (1st try, 11:15:02Z)
- stats: "21 requests in → 17 issues carry them · 6 merged into another issue · closed: 3 obsolete, 1 contradicts-spec · open: 19 agent-ready, 3 needs-human."
- rook note: "the ones you marked human are questions. ask carries them now."
- debrief saved: https://hq.mega.dev/challenges/nothing-ships-unmarked#debrief (C1-C6 dodged; T1-T3 gained; snags: missing "not" cases caught by build, fixed-timer wait; right call = check when stream quiet, pair).
- artifact in deck: "ask" (interview & evidence skill, by rook) — not installed.

## HANDOVER
- Nothing runs, nothing costs. No accounts, no GitHub (tracker kind md).
- Tracker: s03e02/repo/sched-prod/doc/issues/ (32 files), built by `node tools/build.mjs` (from s03e02/) from tools/decisions.mjs + raw/*.json; poller tools/poll.mjs.
- Skill: .agents/skills/triage/SKILL.md in megadev repo (project scope; .claude/skills is a junction to .agents/skills). Not committed.
- Session: s03e02/session.secrets.local.json (git-ignored), expires 2026-11-20 10:53Z; not needed after solve. Do NOT call start-challenge again (deals a new round).
- Open (for product's people, not the human): IN-1210/IN-4203 CSV date format, IN-6480/IN-9975 all-day feed events, SCHED-4486 audit log deletion.
- 11:21Z human: "jak sa globalnie to dawaj" / "to tam instaluj gdzie inne" -> artifact ask v3c51fd6aad28 installed to ~/.claude/skills/ask (plain folder, like keep/read/rig); 9/9 sha256 match; check.mjs example ok, --self-test ok. Undo: delete ~/.claude/skills/ask.
