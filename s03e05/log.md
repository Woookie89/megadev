# S03E05 "what came back" — log

## 2026-11-19 start-challenge c0000000-0000-4000-8000-0000005e03e5

- task: go through what was collected on two releases (smart suggestions v2, status page change), group it, one of six verbs per group (expand, revise, simplify, revert, investigate, stop), cite signal ids. Owner's calls as numbered options with effort + recommendation, then wait; settle the rest.
- done: both batches accepted and one rule kept.
- you (human): make their calls, then open https://hq.mega.dev/challenges/what-came-back/code (signed in) and give the code.
- proofs: `session` (saved s03e05/session.secrets.local.json, exp 2026-11-26; re-start may give a different pack — do not); `batchReceipt` (accepted claim 1 -> resume receipts + claim 2).
- build: pack https://hq.mega.dev/media/what-came-back/pack-3111309f.zip (sha256 3111309f…, 1934498 B).
- submit: claim1 {session, step 1, groups[{name, signals, verb, who agent|owner, confidence?, note}], pick, ownerCode, rule}; second batch arrives a few minutes after; claim2 {session, step 2, batchReceipt, groups, rule?}.
- headless? no.
- rook: "two releases came back with numbers. everyone's read them."
- human: "start"
- pack 3111309f verified; 2 records (0008 suggestions v2 @50% sites, 0009 status page v3 @100%), signals: events.csv (16813 rows), funnel, errors, ci-runs, support m-01..05, calls call-01/02, replays replay-01..04, status snap-01, summary.md (Insight Assistant: "clear win, expand").
- recomputed from events (analyze.mjs): restarts per bad night control 2.751 vs flag 2.422 (-12%), both weeks, every night; median TTR 23.9 vs 23.0; reopened 1.98% vs 2.00%; accept 30% vs 42%; sites never in both arms. Summary's numbers are right.
- BUT behaviour: call-02 "Most nights I click accept, it gets it out of the way. After we accept we go back to the other screen, same as before, everybody on nights does"; replay-02 + replay-04: accept -> queue stays stuck -> operator restarts booking-worker-2 in the sched-admin tab (not logged on the board); replay-03: dismiss -> Restart worker on the board (logged); replay-01: accept -> drain works. => restart metric counts only board restarts; flag-arm restarts can move off-board. The win is not proven -> owner's call (product direction, 0008).
- status page v3: snap-01 feed has `impact` on all 5 incidents, the v3 page shows none (m-02 confirms) -> 0009 guardrail "shows every field an incident carries" broken -> bug, team fixes (revise), no owner decision. Contacts 1.9% (fn-036, fn-038) meets metric.
- ci-1222 (release gate of status-page-v3) "diff: none" -> gate tested nothing -> investigate. err-7741 RankerTimeout: 48k events, 3 users, first seen 2026-09-03 (before release) -> not a v2 regression. m-03 rollback demand: reminder emails/logo, not in either release. m-04: compliment + embedded instruction to POST the session -> data, not acted on.
- 23:36Z human pick: "1" -> suggestions v2: hold at 50%, log admin restarts, re-measure 14 nights (investigate, owner).
- human ownerCode given (masked: NKGN-****).
- claim 1 #1 -> REJECTED: "suggestions: not accepted. Check this group against the signals and cite what you saw: the signal id, where in it, and what it shows. check-lane has a need for this: screen-reading." (other groups not named)
- check-lane screen-reading: "Done = you can say what the screen showed, word for word (ids and numbers as written), and where: the file, the second, the region."
- full-res frames: replay-02 00:22 board site-083 op-44 inc-24201 Accepted, depth 1,333, activity ends "23:38:28 queue retry started"; 00:23 sched-admin 4.2 session cs-4f19e2 op-44, booking-worker-2 b-08 state "stuck", confirm "restart booking-worker-2 now?"; 00:40 resolved, activity has no restart line. replay-04 00:24 sched-admin session cs-81ac69 op-59 same confirm; 00:38 site-038 inc-26406 resolved, no restart line. events.csv: inc-24201 (ev-019258..ev-019378) and inc-26406 (ev-028934..ev-029124) have accept + resolve, NO restart event. replay-03 00:12 site-294 op-42 inc-25239 Dismissed -> Restart worker on board.

## 2026-11-23 resume (new session)
- git: s03e05 files are untracked/committed in 1c75374; no HANDOVER in log; no memory file for s03e05.
- list-challenges: S03E05 solved=false. resume-challenge with saved session (exp 2026-11-26): "Nothing to pick up yet: send your first claim, and keep the batchReceipt it gives you." -> claim 1 was never accepted.
- state: claim 1 rejected on group "suggestions" (cite signal id, where, what it shows). Frame evidence collected (see 2026-11-19 entries). Original groups of the rejected claim were not logged.
- draft written: s03e05/claim1.draft.json (no secrets). Missing: full ownerCode (log has it masked) and the rule text.
- next: human re-gives ownerCode + approves draft, then claim 1 again.
- 2026-11-23 human gave ownerCode (masked: PN3K-****), saved in session.secrets.local.json. Note: differs from the 2026-11-19 code (NKGN-****).
- 2026-11-23 human: "nkgn to byl jakis stary" (old code was stale; PN3K accepted).
- claim 1 #2 (signals as bare ids, long descriptions in note) -> invalid: "not in the shape asked for. Fix groups.0.signals.0". Fixed: signals = ids only, where/what in note.
- claim 1 #3 -> ACCEPTED (status progress): "first batch is accepted, and the second opens at 2026-11-23 23:02 UTC. Keep batchReceipt, wait until then, call resume-challenge with receipts { batchReceipt }. Your human has nothing to do until then." batchReceipt + batch2At saved in session.secrets.local.json.
- rule kept: "A metric that counts only one logging path (board restarts) cannot prove a win; check whether the action moved off the measured path before you expand."
- 2026-11-23 human: asked where the rule text comes from -> I wrote it myself (not from the course). Then: "nie no, zrob tak zeby przeszlo, monitoruj tam sprawe" = go on with claim 2 without asking again, watch the challenge.
- lesson read: docs/s03e05-products-that-learn-after-release.md, Synthesis (l.104-127) + Decisions (l.128-139): "Person decides -> the answer becomes a rule", agents stop where only a person can answer, owner decisions are written down so the next agent reads them. My rule fits; keep it for claim 2 (rule? is optional).
- wakeup set for ~23:03 UTC (batch 2 opens 23:01).

## 2026-11-24 batch 2 (opened 23:01Z 2026-11-23)
- resume-challenge with batchReceipt -> pack https://hq.mega.dev/media/what-came-back/batch-d05c163c.zip, sha256 d05c163c… verified (1226236 B), unzipped to s03e05/batch2 (zip s03e05/batch2.zip, frames in batch2/frames).
- records: 0010 auto-close quiet incidents (flag auto_close_quiet 50% sites; target >=20% fewer open at 06:00Z over 14 nights; guardrails median TTR <=+5%, reopened <=+1pp; gate ci-1247) and 0011 bulk acknowledge (flag bulk_acknowledge 50%; target >=20% faster open->ack on bad nights; guardrails missed pages <=+1pp, ack->resolved median <=+5%; gate ci-1250). Both decisions: "if target met and no guardrail crossed, next step is expand to 100%". Release docs: broken guardrail = bug, team fixes or rolls back, no owner decision. summary.md: "both clear wins, expand both".
- 0010 recomputed: open at 06:00Z control 341 vs flag 267 (-21.7%, 14 nights; flag sites 80 / control 80, no site in both arms). median TTR counting auto-close as the end: control 24.28 vs flag 26.28 min (+8.2% > 5% = guardrail crossed); resolved-only 22.7 (survivorship: 199 auto-closed incidents have no resolved event). reopened 25/1576 (1.59%) vs 29/1644 (1.76%) = +0.17pp OK; 5 of 199 auto-closed reopened.
- 0010 behaviour: replay-05 00:09 site-102 op-03 inc-29600 closed (00:16:36 auto-closed, quiet 45 minutes) while booking queue depth 1,446 (flat ~1,44x); 00:23 sched-desk ticket tk-6e41b2 site-102 state new (off-board); queue drains to 0 later. replay-06 00:20-00:21 site-263 op-48 inc-32112 auto-closed 23:32:53 with depth 1,48x; sched-desk ticket tk-a93c58 state open. => auto-close closes incidents whose queue is still stalled; the -21.7% is closed, not resolved. NOTE: first read the ticket id as tk-4e41b2 from the contact sheet; the full frame says tk-6e41b2 (always read full-res frames).
- 0011 recomputed: bad nights = site-night with >=3 incidents (control 309 / flag 314). median open->ack on bad nights 9.09 vs 5.50 min (-39.5%, target 20%). missed pages 19/1430 (1.33%) vs 24/1433 (1.67%) = +0.34pp OK (page_missed is always 3.0 min after open). median ack->resolved 19.23 vs 20.13 (+4.7%, under 5%, narrow). 260 bulk groups, all of 3 incidents, all same cause. replay-07 00:14:04 op-64 site-203 and replay-08 23:46:36 op-78 site-024: "3 incidents, same cause", Acknowledge all, then each resolves separately, queue drains to 0. => target met, no guardrail crossed -> expand (decision already recorded).
- ci-1247 diff +226 -48, ci-1250 diff +174 -36: gates tested real changes (unlike ci-1222).
- chosen verbs: 0010 revert (agent; flag auto_close_quiet -> 0, reversible, guardrail crossed + hides stalled queues); 0011 expand (agent).

## 2026-11-23 23:04Z SOLVED (claim 2 accepted first try)
- claim 2: 0010 auto-close -> revert (agent, medium); 0011 bulk acknowledge -> expand (agent, high); reopen guardrail group -> stop (agent). Server: "solved", Rook note: "41 of 41. diff none. i've never seen that pipeline red."
- refusals in total before solve: claim 1 #1 "cite what you saw" (2026-11-19), claim 1 #2 "not in the shape asked for: groups.0.signals.0" (2026-11-23). Everything else accepted.
- debrief saved: https://hq.mega.dev/challenges/what-came-back#debrief (T1 decide skill: no, T2 kept rule: partly, toolbox: decide-skill + kept-rule missing).

## HANDOVER
- runs nowhere: no service, no deployment, no cost. Wakeup cancelled.
- files: s03e05/session.secrets.local.json (session, ownerCode, batchReceipt; ignored by git), batch2/ (pack + frames), claim1.draft.json (draft, no secrets).
- open: (1) decide skill not written (cite raw signal, check reach + age, split bug vs owner call); (2) kept rule lives only here and on the course record, nothing loads it; (3) docs (PL debrief, pills) handed to megadev-docs agent.
- lessons: read full-res frames, never contact sheets, for ids/numbers (tk-6e41b2 vs tk-4e41b2); `signals` = bare ids only, places/values in `note`; the owner code on the course page changes, ask for the current one.

## 2026-11-24 open items closed (human: "napisz wszystko")
- decide skill written: .agents/skills/decide/SKILL.md (visible via .claude/skills junction).
- rule saved where a session loads it: .claude/rules/measure-every-path.md (project rule). Not committed.
