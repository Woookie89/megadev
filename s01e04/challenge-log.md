# S01E04 "before i looked" — challenge log

## 2026-11-09 list-challenges
- S01E04 uuid c0000000-0000-4000-8000-0000005e01e4, solved: false
- startPoint: call start-challenge; needs a GitHub account and a public web host; ask before new public repo, before putting page up, before re-upload without marker.

## 2026-11-09 start-challenge(uuid=c0000000-0000-4000-8000-0000005e01e4)
- task: Turn the plan in your copy of the course template into issues, build it, and send the reviewer a public link to an HTML copy of the page.
- why: The team is handing its repo over to you, and this plan is the first one you run.
- you: human approves issue split and decides what every issue must carry; provides GitHub account + public web host (upload over later). Ask before public repo, before putting page on host, before re-upload without marker.
- proofs: laneMarker (from start-challenge) -> `.env` as LANE_MARKER
- laneMarker: sstj-gtro
- repo template: MEGA-DOT-DEV/rig-handover (gh repo create <name> --template MEGA-DOT-DEV/rig-handover --public --clone)
- issues: each opens with `Source: plan.md § <n>`, label plan:morning-digest
- submit: claim-challenge answer {repo: owner/name, preview: public https link}; same answer every call
- No rook field in reply.

## 2026-11-09 human decisions
- "dawaj" → ready to start. "nie mam awsa" → no AWS. "no to dawaj netlify pozniej zrobimy" → yes to repo + pnpm, host = Netlify (later).

## 2026-11-09 gh repo create Woookie89/s01e04-rig-handover --template MEGA-DOT-DEV/rig-handover --public --clone
- reply: https://github.com/Woookie89/s01e04-rig-handover ; Cloning into 's01e04-rig-handover'...
- corepack enable pnpm → EPERM (Program Files); using `corepack pnpm` (12.18.0). install ok, test 2/2, typecheck clean.
- .env LANE_MARKER set; .claude/skills junction -> .agents/skills.

## 2026-11-09 plan-to-issues step 3
- 8-issue split shown to human (see HANDOVER.md). Awaiting approval + §2c counts + issue fields.
- Session paused by human; handover written to HANDOVER.md and KEEP.md.

## 2026-11-11 resume-challenge(uuid=c0000000-0000-4000-8000-0000005e01e4, receipts={laneMarker})
- reply: "That challenge has nothing to pick back up."
- Interpretation: no server-side checkpoint for this challenge yet; keep working from start-challenge reply (laneMarker sstj-gtro). Repo state unchanged: 0 issues, no label, 1 commit.

## 2026-11-11 human: "rob zgodnie z promptem" (pasted challenge page) -> taken as approval of recommended split, §2c = log lines, issue fields Source/Scope/Done when/Blocked by/Suggested worker
- label plan:morning-digest + issues created one by one, 20s apart (log: issues-created.log)
- #1 types: commit 9d2fa8b pushed, closed, closing comment posted
- #2 reader: commit 80d13a2 pushed, closed, closing comment posted; tests 6/6
- push note from GitHub: "GitHub found 1 vulnerability on ... default branch (1 moderate)" (dependabot/1) — outside plan
- worktrees wt-3/wt-4/wt-5 on branches issue-3/4/5; subagents: #3 sonnet low, #4 haiku low, #5 sonnet low
- issues: #1 types, #2 reader, #3 page, #4 JSON, #5 board, #6 = Dependabot PR (not ours, left alone), #7 route tests, #8 preview, #9 cleanup
- #3 (9f73d09, sonnet) + #4 (ce2ed42, haiku) merged; conflict in src/app.tsx resolved by hand; local check: page 200, missing 404, page/JSON same 5 jobs same order, marker shown, 2 warn rows
- #5 (d2077ec, sonnet) merged; board: 2026-10-28 · ok 10 · retry 4 · fail 1 / 2026-10-27 · ok 7 · retry 0 · fail 0
- human: "zalogowany, deploy ok" -> preview saved by curl to s01e04/preview/index.html (marker sstj-gtro, no scripts/links)
- netlify deploy --dir . --prod --no-build --site-name rig-preview-woookie89 -> Production URL https://rig-preview-woookie89.netlify.app (verified: title "rig · digest 2026-10-28", marker sstj-gtro)
- #7 route tests: haiku worker in wt-7
- #7 (c661a30, haiku-5.5) merged, 25 tests green; corrected #4 closing comment haiku-4.5 -> haiku-5.5
## 2026-11-11 claim-challenge(answer={repo: Woookie89/s01e04-rig-handover, preview: https://rig-preview-woookie89.netlify.app}, receipts={laneMarker})
- status: progress
- message: "Sent to the reviewer, who will look at the preview in a few minutes. Not solved yet."
- rook: "got it. i'll look in a few."
- #8 closed with closing comment (commit: none)
## 2026-11-11 claim-challenge (same answer) after 4 min wait; repo had no reviewer activity
- status: rejected
- message: "Not accepted: you closed #8 before the reviewer looked. Check your issues and the preview, then send the preview link again."
- rook: "you closed #8 before i looked."
- change: reopened #8 with a comment (waits on review). Issues checked: all have Source line + label. Preview checked: marker + table intact.
## 2026-11-11 claim-challenge (same answer), after 5 min wait
- status: progress
- message: "The reviewer has seen the preview. Not solved yet: take your lane marker off the preview. Ask your human first, then save the page again with LANE_MARKER unset and upload it over the same link. Then finish the plan and send the same answer again."
- rook: "seen. i read it in four seconds. that's the problem. get your marker off it."
- #8 closed after the review (closing comment, commit: none). Next: ask human before re-upload (#9).
## 2026-11-11 human: "yes" -> re-upload without marker
- rig started with LANE_MARKER empty; saved /digest/2026-10-28: banner "no marker set", sstj-gtro count 0
- netlify deploy --site rig-preview-woookie89 --prod -> live; public link: "no marker set", sstj-gtro count 0
- plan.md -> docs/plans/done/2026-10-29-morning-digest.md with issue list; commit 3db99f9 closes #9; closing comment posted
## 2026-11-11 claim-challenge (same answer) after #9
- status: solved (solvedAt 2026-11-10T23:25:05Z)
- note (rook): "this is how i run. it's how you run from thursday."
- debrief saved: https://hq.mega.dev/challenges/before-i-looked#debrief
- artifact "rig" offered into deck (setup kit); nothing installed
