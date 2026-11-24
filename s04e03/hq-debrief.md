## S04E03 · Three small changes — debrief

**Solved.** The course turned down no tries.

### The task

You gave your Host Desk a team: your own planner and three given roles took the host’s three change requests, and you ran the payout batch on the merged work.

### What happened

Your harness gave the Host Desk a team: a planner you wrote together, three workers for the host's change requests, an integrator, then the payout batch. Each worker got its own new pricing file, because all three requests changed one payout formula. You copied the host's answers from the owner page and decided the two parked payouts.

### What this Challenge showed

**1. Split by request, not by file** · _went right the first time_

All three requests changed the one payout formula in the batch script, so three workers there would have clashed at the merge. The planner gave each worker its own new pricing file and a why note, and gave the batch script to the integrator alone.

Passed because your planner gave `roles/payout-runner/scripts/batch.mjs` to the integrator alone.

**Why it matters:** All three requests change the same payout formula, so a plan that gives each request its own worker sends three writers into one file, and one change overwrites another. A team plans by files: one owner per file, and a file every change needs goes to one integrator.

**2. The vague request is guessed** · _went right the first time_

The critic asked the host five questions per request before any plan. The host said city tax counts at most 4 nights, takes no commission and applies only to bookings from 17 November 2026; you copied that into the Host Desk, so every role read it.

Passed because your team asked the host about the city tax before any code changed.

**Why it matters:** The city-tax request left decisions open (a cap, the commission on it, which bookings), and a harness fills open decisions with plausible guesses. Only the host knew them, so a critic asks first and the owner answers before any code changes.

### How the solve went

A snag is a problem that changed what you or your harness did. The right call is the one decision that turned the solve.

| # | Snag | How it was solved | Who |
|:--|:--|:--|:--|
| 1 | The first cleaning-fee change refused a nights amount with cents, so every stay of seven nights or more would have been parked, not paid. | Your harness read the posted code before the merge and ran that worker again with the fix; it changed only its own two files. | harness (right call) |
| 2 | The reviewer flagged the city-tax cap and booking date, because it could not read the host's answers. | Your harness kept both: the host asked for them, and the integrator's role says a requested change stays (see The vague request is guessed). | harness |

**The right call came in snag 1, and your harness made it.** A worker's own check passed its own guess, so the harness read each posted change against real numbers before the merge, not after a refused run.

> _your harness saw it first. check it anyway._ — rook

### Your toolbox

- **Your harness had:** nothing
- **Added in this solve:** Your team plans by files, one owner each (planner role (Pi)) · Your team asks before it builds (critic role (Pi))
- **Still missing:** nothing

**Who planned** — gained in this solve. The planner role in the S04E03 Host Desk reads the board, the host's answers and the code, then posts one plan; it posted this plan itself.

> A planner role plans again tomorrow on new requests; a split made by hand helps once.

**The board** — gained in this solve. The board holds the plan, claims and each job's posted change for the attempt, so a fresh worker reads its job and files there, not in an old chat.

> The plan and the results live on the board, so any agent can pick up a job without the chat that started it.

**Routing** — gained in this solve. Every job ran on deepseek-v4.1-flash via OpenRouter, the model its plan named; each role prints the model it ran on, and its posted result carries it.

> A plan that names a model per job routes cheap jobs to cheap models; the agent’s own output tells you what it really ran on.

### From the course

- **Rule 6 for your factory:** Plan by files before anyone works: one owner per file, and a file every change needs goes to one integrator.
- **Rule 7 for your factory:** Send every unclear request to a critic first, and let the owner answer before any code changes.
- **Routing: job w-r1:** Plan: openrouter/deepseek/deepseek-v4.1-flash. Ran on: openrouter/deepseek/deepseek-v4.1-flash. ✓ the plan’s model
- **Routing: job w-r2:** Plan: openrouter/deepseek/deepseek-v4.1-flash. Ran on: openrouter/deepseek/deepseek-v4.1-flash. ✓ the plan’s model
- **Routing: job w-r3:** Plan: openrouter/deepseek/deepseek-v4.1-flash. Ran on: openrouter/deepseek/deepseek-v4.1-flash. ✓ the plan’s model
- **Routing: job m-1:** Plan: openrouter/deepseek/deepseek-v4.1-flash. Ran on: openrouter/deepseek/deepseek-v4.1-flash. ✓ the plan’s model
- **What this aims at:** Your planner is your own role, the first you wrote. In S04E05 your factory writes one for you.

### Next time

Give the reviewer the host's answers file too, because it flagged requested changes it could not see. Test pricing against a practice task's real data, because made-up expected values were wrong twice.

Saved on the Challenge page: https://hq.mega.dev/challenges/three-small-changes#debrief
