# P21 · Delegate research, not just building

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: MEGA Assessment

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Subagents and Workers" — [original (EN)](../../s01e02-steering-models-through-context.md#subagents-and-workers) · [Polish: „Podagenci i workery”](../../pl/s01e02-steering-models-through-context.md#podagenci-i-workery)
> - S01E01 · Mechanics Behind Generative AI → chapter "Generalized Steering" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#generalized-steering) · [Polish: „Uogólnione sterowanie”](../../pl/s01e01-mechanics-behind-generative-ai.md#uogólnione-sterowanie)

**Principle.** Send independent questions (several services; docs and code) to subagents.
What comes back to the main thread should be a conclusion, not an exploration dump.

**Why.** Research in the main thread leaves thousands of lines in context that get in the
way of later decisions and bring compaction closer ([P01](../01-context/p01-compaction-is-lossy.md)).

**Case.** MEGA Assessment: T15 (delegation fit) 25%. Anti-pattern "wasted context":
research, checking and implementation in one thread.

---

← [P20](p20-brief-like-an-issue.md) · [chapter](README.md) · [all pills](../README.md) · [P22](../05-agents-without-humans/p22-chat-is-not-a-host.md) →
