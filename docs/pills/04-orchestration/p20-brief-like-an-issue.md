# P20 · A brief for a worker is like a good issue

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04

> **Lessons:**
> - S01E02 · Steering Models Through Context → chapter "Subagents and Workers" — [original (EN)](../../s01e02-steering-models-through-context.md#subagents-and-workers) · [Polish: „Podagenci i wykonawcy”](../../pl/s01e02-steering-models-through-context.md#podagenci-i-wykonawcy)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)

**Principle.** A worker does not inherit the conversation. The brief must contain
everything the worker cannot see: source, scope, "done when", blockers and stop conditions.

**Case.** S01E04, issue shape: `Source: plan.md § <n>`, `Scope`, `Done when`,
`Blocked by`, `Suggested worker`. Closing comment: `done: …` / `worker: <harness> ·
<model> · <effort>` / `commit: <sha>`. Thanks to that trace, the agent working on #7
noticed that the comment on #4 named the wrong model (`haiku-4.5` instead of `haiku-5.5`).
Workers can check each other when they leave a trace.

**Apply.** Template in [Appendix A3](../templates/worker-brief.md).

---

← [P19](p19-model-choice-and-cost.md) · [chapter](README.md) · [all pills](../README.md) · [P21](p21-delegate-research.md) →
