# P16 · The durability ladder: the more important the rule, the higher you write it

> Chapter [3. Memory outside the chat](README.md) · episodes: S01E04, S03E05, MEGA Assessment

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Harness Personalization" — [original (EN)](../../s01e02-steering-models-through-context.md#harness-personalization) · [Polish: „Personalizacja harnessu”](../../pl/s01e02-steering-models-through-context.md#personalizacja-harnessu)
> - S02E03 · Agentic Capabilities → chapter "Personalization" — [original (EN)](../../s02e03-agentic-capabilities.md#personalization) · [Polish: „Personalizacja”](../../pl/s02e03-agentic-capabilities.md#personalizacja)
> - S03E05 · Products That Learn After Release → chapter "Feedback Loops" — [original (EN)](../../s03e05-products-that-learn-after-release.md#feedback-loops) · [Polish: „Pętle sprzężenia zwrotnego”](../../pl/s03e05-products-that-learn-after-release.md#pętle-sprzężenia-zwrotnego)

**Principle.** The same rule can live on different rungs. The higher it is, the less it
depends on the model's memory:

| Rung | Example | Who enforces it |
| --- | --- | --- |
| chat | "remember to…" | nobody; lost at compaction |
| log, debrief | `challenge-log.md`, `*-debrief.md` | the human, if they read it |
| KEEP / HANDOVER | `s01e04/KEEP.md` | the next session, if it reads it at start |
| skill / `AGENTS.md` / `CLAUDE.md` | `github-cli-routine`, the issue shape | the harness loads it automatically |
| settings / hook | an `ask` rule in `settings.json`, a `Stop` hook | the harness enforces it; the model cannot skip it |

**Case.** S01E04: the approved issue shape and the Netlify commands stayed only in issues
and the log, so they would be lost at the next plan. S01E03: the `github-cli-routine` skill
carried over to later challenges. MEGA Assessment (T24, strength): you turned a consent
procedure into `ask` rules in settings, so it no longer depends on memory. S03E05: the course asked for one
kept rule (the harness wrote it itself: "A metric that counts only one logging path (board
restarts) cannot prove a win; check whether the action moved off the measured path before you
expand."). After the solve it lived only in the log and on the course record, that is, on the
"log" rung, and the course recorded it as T2 "partly". The next day (24.11.2026) it went into
the project rule `.claude/rules/measure-every-path.md`, which a session loads at start,
together with the `decide` skill.

**Apply.** When you do something a second time, or when something "must always happen",
move it one rung up.

---

← [P15](p15-ask-past-sessions.md) · [chapter](README.md) · [all pills](../README.md) · [P17](../04-orchestration/p17-contract-before-parallelism.md) →
