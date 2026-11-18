# P09 · A step that waits on the other side closes when they confirm

> Chapter [2. Contracts and "done"](README.md) · episodes: S01E04

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)

**Principle.** "Sent" and "confirmed" are two different states. Cleanup depends on the
confirmation, not on sending.

**Case.** S01E04: the harness closed issue #8 right after sending the link to the reviewer.
Course: "you closed #8 before the reviewer looked." Refusal, reopen, close only after the
confirmation.

**Apply.** In a plan, write outside steps as "waiting on X" with an explicit completion
signal. Block the steps after it on that signal.

---

← [P08](p08-test-must-fail-first.md) · [chapter](README.md) · [all pills](../README.md) · [P10](p10-check-from-outside.md) →
