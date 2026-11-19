# P20 · A brief for a worker is like a good issue

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04, S02E04, S03E02

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Subagents and Workers" — [original (EN)](../../s01e02-steering-models-through-context.md#subagents-and-workers) · [Polish: „Podagenci i workery”](../../pl/s01e02-steering-models-through-context.md#podagenci-i-workery)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agent architectures" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures) · [Polish: „Architektury wieloagentowe”](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe)
> - S03E02 · Translating Intent into Agent Work → chapter "Requirements and decomposition" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition) · [Polish: „Wymagania i dekompozycja”](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja)

**Principle.** A worker does not inherit the conversation. The brief must contain
everything the worker cannot see: source, scope, "done when", blockers and stop conditions.

**Case.** S01E04, issue shape: `Source: plan.md § <n>`, `Scope`, `Done when`,
`Blocked by`, `Suggested worker`. Closing comment: `done: …` / `worker: <harness> ·
<model> · <effort>` / `commit: <sha>`. Thanks to that trace, the agent working on #7
noticed that the comment on #4 named the wrong model (`haiku-4.5` instead of `haiku-5.5`).
Workers can check each other when they leave a trace.

S02E04: each worker's brief held one job, the skill's name and version, its only tools (the
job's MCP server), a retry limit ("retry at most once after fixing what it names") and the
way home: end with a message holding the marker `JOB2_SUBMIT_REPLY:` (remotely
`JOB1_SUBMIT_REPLY:`) and the whole `submit` reply. Both workers delivered on the first try,
and the main agent asked them nothing ([P43](p43-skill-travels-with-the-job.md),
[P45](../05-agents-without-humans/p45-remote-worker-way-there-and-back.md)).

S03E02: an `agent-ready` issue in the tracker is a brief an agent ships from without asking a
person. Format: Intent, Acceptance (Given / When / Then, with at least one "then … not …"
case), Boundaries ("Must not touch …", with every client "leave it as it is" copied in) and an
`Allowed by AUT-1 (…)` line. The first tracker build stopped four briefs that had no "not"
case (`acceptance has no "not" case`), e.g. SCHED-4465 (the Retry-After header). The line
added: "Given a caller under its limit, when it calls the API, then the reply does not carry a
Retry-After header." The lesson calls this an agreement: scope, outcome, boundaries and proof
([P53](../08-harness/p53-code-checks-the-model-decides.md)).

**Apply.** Template in [Appendix A3](../templates/worker-brief.md).

---

← [P19](p19-model-choice-and-cost.md) · [chapter](README.md) · [all pills](../README.md) · [P21](p21-delegate-research.md) →
