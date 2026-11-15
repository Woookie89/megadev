# P17 · Contract first, in sequence; then parallelism

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04

> **Lessons:**
> - S02E04 · Multi-Agent Collaboration → chapter "Orchestration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#orchestration) · [Polish: „Orkiestracja”](../../pl/s02e04-multi-agent-collaboration.md#orkiestracja)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)

**Principle.** Build the shared foundations (types, interfaces, data format) first, in
order, with the strongest model. Only then split the rest across parallel workers.

**Why.** Parallel workers do not talk to each other. The shared contract is the only thing
that keeps them in sync. Without it, each invents its own.

**Case.** S01E04: #1 (types) and #2 (log reader) in the main session, then #3, #4, #5 and
#7 on Sonnet and Haiku subagents, each in its own worktree.

---

← [P16](../03-memory/p16-durability-ladder.md) · [chapter](README.md) · [all pills](../README.md) · [P18](p18-worktrees-and-hub-files.md) →
