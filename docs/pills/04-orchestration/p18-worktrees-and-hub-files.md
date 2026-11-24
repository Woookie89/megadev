# P18 · One worktree per worker; conflicts gather in hub files

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04, S04E03

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)

**Principle.** Parallel writes need separate checkouts. Conflicts will still appear in the
files everyone has to touch (router, index, config). So the plan splits work by files, not by
tasks: one owner per file, and a file every change needs goes to one integrator.

**Why.** Parallel workers do not see each other's changes. Two jobs in one file mean a conflict at
the merge or, worse, a change that silently overwrites the other. A split by task (one worker per
request) looks natural, but when every task changes the same file, it sends several writers to one
place. Lesson S02E04 says that in a team of agents even the simplest actions easily overlap.

**Case.** S01E04: merging #3 and #4 stopped on a conflict in the same app file (route
registration). The harness merged it by hand and ran typecheck and 25 tests before
pushing. MEGA Assessment (T19): parallel course sessions shared one working tree, so
untracked files from several threads got mixed. The worktrees `s01e04/wt-3`…`wt-7` sat in
the repo for a week after merging, until the cleanup on 15.11.2026.

S04E03: three host requests (a long-stay discount, a city tax, a cleaning fee without commission)
changed the same payout formula in `batch.mjs`. The Host Desk planner, a role written with the human,
gave that file to no worker. Each worker got two new files of its own: a pure function
`roles/payout-runner/scripts/pricing/<name>.mjs` and a note `why/<name>.md`. `batch.mjs` and the
payout-runner's `ROLE.md` went to one merge job (`m-1`, integrator), which wired the three functions
in the order the host's answers gave. The workers ran in parallel, each in its own worktree
(`../host-desk-w-r1`…`w-r3`). The board accepted every change, and their paths were only the plan's
files. The three merges went through without a conflict. The course: "Passed because your planner
gave `roles/payout-runner/scripts/batch.mjs` to the integrator alone." Rule 6 for your factory:
"Plan by files before anyone works: one owner per file, and a file every change needs goes to one
integrator."

**Apply.**

- Give hub files to one worker, or plan their merge.
- Before the workers start, list the files each task changes. A file more than one task needs goes
  to the integrator, and the workers write new files of their own that it wires in.
- No file belongs to two jobs. The plan gives paths exactly as `git diff` prints them.
- Run the tests after every merge.
- Clean up worktrees when done (`git worktree remove`).

---

← [P17](p17-contract-before-parallelism.md) · [chapter](README.md) · [all pills](../README.md) · [P19](p19-model-choice-and-cost.md) →
