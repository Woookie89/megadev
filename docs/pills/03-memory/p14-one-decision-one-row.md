# P14 · One decision per row; a later decision overrides only its own scope

> Chapter [3. Memory outside the chat](README.md) · episodes: S02E01

> **Lessons:**
> - S01E03 · Building Knowledge Systems → chapter "Broader context" — [original (EN)](../../s01e03-building-knowledge-systems.md#broader-context) · [Polish: „Szerszy kontekst”](../../pl/s01e03-building-knowledge-systems.md#szerszy-kontekst)

**Principle.** Write a plan as a table: area, decision, source (session and time). A new
decision replaces only what it is about.

**Why.** A row that combines several decisions hides what is missing. Overwriting the whole
plan on every change loses decisions nobody changed.

**Case.** S02E01: the first plan put image, port and dialect in one row. Course: "Your plan
doesn't say which image version." Later the ops team changed the store (Postgres instead of
SQLite), but team A's Drizzle and schema stayed in force. S01E03: ADRs "supersede, not
overwrite".

**Apply.** When sources conflict, ask: "what exactly does the later decision cover?".
Template in [Appendix A4](../templates/decision-table.md).

---

← [P13](p13-keep-finding-with-source.md) · [chapter](README.md) · [all pills](../README.md) · [P15](p15-ask-past-sessions.md) →
