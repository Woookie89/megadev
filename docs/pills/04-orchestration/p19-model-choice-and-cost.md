# P19 · Match the model to the task, and treat cost as a requirement

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S01E04, S01E05, S02E02, S04E01, S04E03

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Settings" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#settings) · [Polish: „Ustawienia”](../../pl/s01e04-working-with-ai-harnesses.md#ustawienia)

**Principle.** Logic, contracts and decisions get the strongest model. Mechanical,
well-described tasks get a cheaper one. An unattended agent gets a call limit and a budget.

**Case.**

- S01E04: every issue had a "Suggested worker" field (strongest or cheaper).
- S01E05: from free Gemini to OpenRouter, then to DeepSeek because of the bill. A daily
  limit of 15 model calls.
- S02E02: a few cents per mail on Opus 5.5 and no spending limit (left open).
- S04E01: `openrouter/deepseek/deepseek-v4.1-flash` through Pi and one model call per run,
  because the work goes through a script
  ([P62](../05-agents-without-humans/p62-a-time-limit-is-counted-in-model-turns.md)). The log
  says the cost is cents, and the human gave the key's daily limit as 2 USD. The model-provider
  account and the spending are the human's, so the harness asked before using them.
- S04E03: the team's plan names a model per job (the `model` field), and every role prints the
  model it really ran on at the end (`model: …`). All four jobs had
  `openrouter/deepseek/deepseek-v4.1-flash` in the plan and ran on it. The course: "A plan that names
  a model per job routes cheap jobs to cheap models; the agent’s own output tells you what it really
  ran on."

---

← [P18](p18-worktrees-and-hub-files.md) · [chapter](README.md) · [all pills](../README.md) · [P20](p20-brief-like-an-issue.md) →
