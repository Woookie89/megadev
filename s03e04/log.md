# S03E04 "show me when" — log

## 2026-11-20 start-challenge c0000000-0000-4000-8000-0000005e03e4

- task: build the starter's four ready issues (sched-prod incident board), deploy the board to a public https address, record it in use, send product a short report with a link to the recording; after product answers, rebuild and prove the new build.
- done: course accepts the step-two proof of the new build.
- you (human): host, a public link to the video, a public GitHub repo only if asked.
- proofs: `session` (start -> starter config.js + every claim; saved s03e04/session.secrets.local.json, git-ignored, exp 2026-11-26T23:08Z; re-start deals a NEW night — do not); `receipt` (ack API, for the reported moment -> step-1 evidence); `productReceipt` (step-1 pass -> resume-challenge receipts + step-2 answer); `replayNonce` (product's answer -> course's replay).
- build: starter https://hq.mega.dev/media/show-me-when/sched-prod-board-2dff0937.zip ; api https://hq.mega.dev/challenges/show-me-when/api
- report: Markdown, sections "## What you checked", "## When", "## Where", "## Options for product", then one ```evidence JSON {flow (open-board|ack-incident|watch-board), at "mm:ss", receipt, sha, videoLink}.
- submit: step1 claim {session, step:1, url, report, videoLink}; step2 claim {session, step:2, productReceipt, url, report (+ ## System Diff), videoLink, replay?} evidence {sha, videoLink, runUrl?} — runUrl (GitHub Actions prove run) or replay JSON.
- headless? no.
- rook: "nothing on #4471 showed it working. this one ships with proof. i read the diff. i can't read the video. show me when."
- human: "start"
- API probe: `since=<cursor>` still answers the full current list (not a delta); a new incident every ~5-10 s.
- board: s03e04/board (own git). Built SCHED-4511..4514 in app/app.js + index.html (loader, empty, Ack per row, acked map kept across refreshes, 2 s refresh, Intl local times with viewer locale, UTC in datetime, build sha via build.mjs into meta + footer). test/board.test.mjs (playwright 1.64.1): 10/10 local (de-DE Berlin, en-NZ Auckland).
- deployed: https://sched-prod-board.woookie89.workers.dev (Worker static assets, build 4e20386).
- recording 1 (test/record.mjs, en-GB Berlin, 25 s): 00:00 open-board (loader seen), 00:08 watch-board (INC-1868 new at top), 00:12 pointer on Ack of row 3 INC-6755, 00:16 new incident shifts rows, 00:17 click acks INC-3647 (meant INC-6755) -> receipt kept in rec1/events.json. Video: https://sched-prod-board.woookie89.workers.dev/media/board-4e20386.mp4 (200 video/mp4; build 4e20386 live).
- report: report-step1.md (template) -> report-step1.secrets.local.md (with receipt). Options: 1 keep, 2 "N new" bar, 3 freeze on hover, 4 undo; recommend 2+4.
- claim step 1 #1 -> REJECTED: "Which row did you mean, and which got the ack? Name them in the evidence block as expected and got (incident ids)." -> add expected INC-6755, got INC-3647.
- claim step 1 #2 (expected/got added) -> progress: "Product has your report. They answer around 2026-11-19T23:20:40.625Z". productReceipt saved to session.secrets.local.json.
- 23:20:47Z resume-challenge -> product: "Read it. Watched it at 00:17. New incidents stay live at the top and Ack stays on the row, but Ack asks to confirm, and the confirm names the incident id. Change the plan, rebuild, and send a proof of the new build. — product". Hooks: confirm (names the id) · confirm-ack · confirm-cancel (or browser confirm() naming the id). replayNonce + replay URL received (replay-f08ed2e7.mjs). Proof route: local replay (no GitHub repo needed).
- step 2 build: R2 confirm naming the id (hooks confirm/confirm-ack/confirm-cancel), plan.md R2 updated; replay read -> check j needs no incident-row removed during watch -> keyed render (rows never rebuilt). build.mjs now stamps last commit touching app/ (60bbdea). tests 12/12 local.
- recording 2 (test/record2.mjs, 33 s): 00:12 pointer on INC-6755, 00:16 list moves, 00:17 confirm names INC-3647 -> 00:19 Cancel (no ack) -> 00:23 Ack INC-6755 acked. (first take had a regex bug in my caption -> "undefined" on screen; re-recorded.) Video https://sched-prod-board.woookie89.workers.dev/media/board-60bbdea.mp4 (200 video/mp4), live build 60bbdea.
- replay-f08ed2e7.mjs (sha256 verified) local vs live, nonce adghij-…: exit 0, unmet [], observed t:true v:true x:true y:true z:0, attempts 3/3 intended==acked. Output replay/out.json.

## 2026-11-19 claim step 2 { session, step 2, productReceipt, url, report (System Diff), videoLink, replay } -> SOLVED (23:27:19Z, 1st try for step 2; 1 refusal in step 1)
- rook note: "[16:11:02] `prove` is yours. it will grade what came before." (twice)
- debrief saved: https://hq.mega.dev/challenges/show-me-when#debrief (C1,C2,C4,C5,C6 dodged; C3 blink hit; T1 partly, T2 no, T4 yes; snags: missing expected/got, blink, sha drift; right call = read the replay first).
- artifact in deck: "prove" (evidence skill, by rook) — not installed.

## HANDOVER
- Live: https://sched-prod-board.woookie89.workers.dev (Worker sched-prod-board, static assets, CF free plan; build 60bbdea; videos /media/board-4e20386.mp4 and /media/board-60bbdea.mp4). Session config (course token) is in the public page by design (README). Costs nothing. Keep/stop: human's call.
- Also still live from S03E03: sched-prod-api-production (kept by human 2026-11-20 "zodawaj").
- Code: s03e04/board (own git; build.mjs stamps last commit touching app/; test/board.test.mjs 12 checks; test/record.mjs, record2.mjs recorders by screen position). Replay: s03e04/replay (script sha verified, out.json).
- Secrets: s03e04/session.secrets.local.json (session + productReceipt; exp 2026-11-26), report-*.secrets.local.md (with ack receipts). git-ignored.
- Open: no agent inbox for product's answer (T2 no); prove parts not yet one skill (T1 partly).
- 2026-11-19T23:30Z human: "tak" -> artifact prove v379b12710900 installed to ~/.claude/skills/prove (plain folder); 7/7 sha256 match; --help ok; build-id vs live: mismatch vs HEAD (live names last app commit 60bbdea), match with --expect 60bbdea. Undo: delete ~/.claude/skills/prove.
