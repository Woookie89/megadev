# P18 · One worktree per worker; conflicts gather in hub files

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)

**Principle.** Parallel writes need separate checkouts. Conflicts will still appear in the
files everyone has to touch (router, index, config).

**Case.** S01E04: merging #3 and #4 stopped on a conflict in the same app file (route
registration). The harness merged it by hand and ran typecheck and 25 tests before
pushing. MEGA Assessment (T19): parallel course sessions shared one working tree, so
untracked files from several threads got mixed. The worktrees `s01e04/wt-3`…`wt-7` sat in
the repo for a week after merging, until the cleanup on 15.11.2026.

**Apply.**

- Give hub files to one worker, or plan their merge.
- Run the tests after every merge.
- Clean up worktrees when done (`git worktree remove`).

---

← [P17](p17-contract-before-parallelism.md) · [chapter](README.md) · [all pills](../README.md) · [P19](p19-model-choice-and-cost.md) →
