# P09 · A step that waits on the other side closes when they confirm

> Chapter [2. Contracts and "done"](README.md) · episodes: S01E04, S03E04

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)

**Principle.** "Sent" and "confirmed" are two different states. Cleanup depends on the
confirmation, not on sending.

**Case.** S01E04: the harness closed issue #8 right after sending the link to the reviewer.
Course: "you closed #8 before the reviewer looked." Refusal, reopen, close only after the
confirmation.

S03E04: after the step-one report, the course said only when product would answer ("They
answer around 2026-11-19T23:20:40.625Z"). The README offered two ways to get the answer: mail
to an agent inbox, if you built one, or `resume-challenge`. The harness had no inbox. It waited
in the same session until that time and called `resume-challenge` at 23:20:47 UTC. The course
marked "picked up alone" (T2) as not gained: "Give your agent an inbox or a resume step, so it
picks up product's answer when it arrives."

**Apply.** In a plan, write outside steps as "waiting on X" with an explicit completion
signal. Block the steps after it on that signal. When the answer comes later than the
session may last, make picking it up a step of its own: an inbox, a webhook or a scheduled
resume at the stated time.

---

← [P08](p08-test-must-fail-first.md) · [chapter](README.md) · [all pills](../README.md) · [P10](p10-check-from-outside.md) →
