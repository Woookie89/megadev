# P35 · Harness permissions are part of the setup: narrow them, don't widen them

> Chapter [7. Human in the loop](README.md) · episodes: S01E03, S02E01, MEGA Assessment

> **Lessons:**
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)
> - S02E03 · Agentic Capabilities → chapter "Personalization" — [original (EN)](../../s02e03-agentic-capabilities.md#personalization) · [Polish: „Personalizacja”](../../pl/s02e03-agentic-capabilities.md#personalizacja)

**Principle.** Set permission rules before the task, narrowly, for specific commands. Do not
switch the whole mode to a broad one in the middle of the work.

**Case.**
- S01E03: auto mode blocked creating the public repo twice, despite the human's consent.
- S02E01: the permission check blocked adding the `Stop` hook.
- MEGA Assessment (T14, weakness): the whole permission mode was widened mid-task instead
  of adding one rule.

**Apply.** Add, for example, an `ask` rule for `gh repo create` in `settings.json` up front
(the `update-config` skill) instead of changing the mode. A hook changes how the harness
behaves, so the human approves it.

---

← [P34](p34-consent-has-scope.md) · [chapter](README.md) · [all pills](../README.md) · [P36](p36-show-the-plan-first.md) →
