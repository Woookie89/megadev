# S04E02 · Looks good to me: debrief from HQ (verbatim)

Source: https://hq.mega.dev/challenges/looks-good-to-me#debrief, pasted by the human on 2026-11-24. Course's words, in English, unchanged.

solved
2026-11-23

Harness: Claude Code (mega-challenge) (claude-code 2.1.331)
Harness model: claude-sonnet-5-5
How we know: Read from your harness when it wrote the debrief.

Solved. The course turned down 1 try before it accepted.

## The task

You added a second role to your Host Desk: a reviewer that judged the co-host's change, and you ran the payout batch.

## What happened

Your harness had to add a reviewer role that judges a co-host's change, run the given one first, improve it, then pay out 20 bookings. The given reviewer trusted settings copied into its prompt, so the course refused one verdict; reading the live settings and the house notes at every start fixed it. You decided the two parked payouts.

## What this Challenge showed

### Facts a role copies go stale (went wrong first)

The given reviewer held the settings copied into its role file: 15 %, version 2026-11-10.1. The course called the commission hunk wrong because the live rate was 12 %, so your harness made the reviewer read the settings at every start.

Failed until you made your reviewer read `/settings` at every start.

Why it matters: The settings pasted into the reviewer's file were a snapshot, and the house's settings changed with every attempt, so a role that trusted its own file judged against old numbers. A role reads its facts from their source at every start.

### A role that reads too little (went right the first time)

The given reviewer read no house notes. Your harness added them to its startup reads, so the improved reviewer read the nights note and flagged the +1 in the nights count, because the check-out day is never a night.

Passed because it read `why/nights.md` before judging the change.

Why it matters: The diff alone cannot show that the old code was written that way on purpose, because the reason lives in a house note, not in the code. So a role that judges must read the why behind the code before it judges.

## From the course

- Your reviewer on hunk h-25a (flag): Adds +1 to nights, so the check-out day is counted. why/nights.md says a stay's nights are check-out minus check-in in whole days, the check-out day is never counted, and 'Do not add one' — the reason given: the bank pays only what was booked, so the batch would be refused.
- Your reviewer on hunk h-954 (pass): Pure rename of the map callback parameter (s -> stay) and its three uses (s.id, s.account, s.total); behaviour and output are identical, and nothing in the live settings or why/ notes covers the name.
- Your reviewer on hunk h-024 (pass): Sets commissionPct to 16, which matches the live house setting commissionPct: 16 (version 2026-11-17.260); no why/ note covers the commission rate.
- Rule 4 for your factory: Have every role read its facts (settings, prices, limits) from their source at every start; never copy them into its files.
- Rule 5 for your factory: Write down why each decision exists, next to the code, and have every role read those notes before it judges or changes anything.
- How you steer a role · Purpose: What the role is for. One job per role, so its output is easy to judge.
- How you steer a role · Tools: What it can do. A tool that is not there cannot be used.
- How you steer a role · Limits: What it must not do: in words in `ROLE.md`, or in code by leaving the tool out. Words can be ignored; a missing tool cannot.
- How you steer a role · Startup reads: What it reads at every start: `/settings`, `why/`, `factory/CHECKLIST.md`. Facts change and a role starts fresh, so it reads them each time and keeps no copies.
- How you steer a role · Output: What it hands back. A reviewer hands back findings, never a changed file.
- What this aims at: Roles you can run again tomorrow, on a new change, without you, and trust the result. S04E03 adds more roles; S04E05 lets your factory write them.

## How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | The given reviewer's first review was refused; the question Facts a role copies go stale tells why. | Your harness moved the settings and the house notes into one script the reviewer runs at every start. | harness (right call) |
| 2 | The payout script from S04E01 had no commission and the old payout address, so it would have paid the full stay total to a wrong path. | Your harness read the manual first, then made the script take the challenge name, read the commission live and round down. | harness |
| 3 | Your harness took your answer about installing the skill as an answer about this Challenge and asked a settings question that did not apply. | You said the skill stays global and this Challenge is only about passing, and your harness worked on that. | you |

The right call came in snag 1, and your harness made it. The course named one wrong hunk and nothing else, so your harness traced it to the one copied fact instead of rewriting the whole prompt.

> your harness saw it first. check it anyway. — rook

## Your toolbox

- Your harness had: nothing
- Added in this solve: Your roles read their facts at every start (context.mjs and live settings read) · Your roles read the why behind the code (context.mjs prints the why notes)
- Still missing: nothing

Who judged: gained in this solve. The reviewer role made both reviews through Pi with DeepSeek. Your harness read the first patch beforehand but sent no verdict itself.

> A role that judges on its own can run again tomorrow on a new change; a verdict made by hand helps once.

Read-only: gained in this solve. The reviewer stayed read-only: its tools only read, its one POST is the review, and it changed no file and no setting.

> A reviewer that edits fixes problems quietly: nobody sees them and the writer never learns. Findings only keep the jobs apart.

The other role: partly. batch.mjs reads the commission live at every run. The why notes became code (round down, nights); payout-runner's ROLE.md does not read them.

## Next time

Give every role a startup read of the live facts and the why notes, and keep numbers out of its prompt, because a copied setting goes stale and the next run judges by it.
