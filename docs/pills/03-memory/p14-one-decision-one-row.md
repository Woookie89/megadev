# P14 · One decision per row; a later decision overrides only its own scope

> Chapter [3. Memory outside the chat](README.md) · episodes: S02E01, S03E02

> **Lessons:**
>
> - S01E03 · Building Knowledge Systems → chapter "Broader context" — [original (EN)](../../s01e03-building-knowledge-systems.md#broader-context) · [Polish: „Szerszy kontekst”](../../pl/s01e03-building-knowledge-systems.md#szerszy-kontekst)
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)

**Principle.** Write a plan as a table: area, decision, source (session and time). A new
decision replaces only what it is about.

**Why.** A row that combines several decisions hides what is missing. Overwriting the whole
plan on every change loses decisions nobody changed.

**Case.** S02E01: the first plan put image, port and dialect in one row. Course: "Your plan
doesn't say which image version." Later the ops team changed the store (Postgres instead of
SQLite), but team A's Drizzle and schema stayed in force. S01E03: ADRs "supersede, not
overwrite".

S03E02: during triage, requests kept arriving after the tracker was already marked. IN-5342
from product ("forget the 'class' rename from earlier this week") withdrew the earlier
request IN-9280, already marked `agent-ready`. The harness did not delete IN-9280; it closed
it as `obsolete` with both ids in `sources`. The client mail IN-4203 ("Please do not flip
them") did not cancel the dd/mm date request IN-1210; it changed its status, from a fix to a
question for a person with both ids. Each later request changed only what it was about.
Course: "Triage is a process, not a one-off sort: later requests update or cancel earlier
ones." ([P52](../05-agents-without-humans/p52-rebuild-on-every-arrival.md)).

**Apply.** When sources conflict, ask: "what exactly does the later decision cover?".
Template in [Appendix A4](../templates/decision-table.md).

---

← [P13](p13-keep-finding-with-source.md) · [chapter](README.md) · [all pills](../README.md) · [P15](p15-ask-past-sessions.md) →
