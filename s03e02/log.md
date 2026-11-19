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
