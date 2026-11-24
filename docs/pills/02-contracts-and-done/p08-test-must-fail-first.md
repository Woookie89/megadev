# P08 · A test that was never red proves nothing

> Chapter [2. Contracts and "done"](README.md) · episodes: S01E05

> **Lessons:**
>
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Quality" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#quality) · [Polish: „Jakość”](../../pl/s01e05-building-workflows-not-tool-stacks.md#jakość)
> - S02E05 · Agent Reliability → chapter "Evaluation" — [original (EN)](../../s02e05-agent-reliability.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s02e05-agent-reliability.md#ewaluacja)

**Principle.** A test for a fix must first fail on the code without the fix, then pass with
the fix.

**Why.** A test written after the fix often checks what the code already does, not the bug.
Without a red run you do not know whether the test touches the bug at all.

**Case.** S01E05: the test writer ran its draft on the unfixed code (red), then with the fix
(green). Bug #12: a row whose owner was "—" vanished from the digest.

**Apply.** In a brief for an agent that writes tests, require both results in its report.

---

← [P07](p07-done-is-a-check.md) · [chapter](README.md) · [all pills](../README.md) · [P09](p09-sent-is-not-confirmed.md) →
