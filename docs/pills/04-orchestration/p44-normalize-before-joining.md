# P44 · Normalize before you join

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S02E04

> **Lessons:**
>
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)
> - S02E04 · Multi-Agent Collaboration → chapter "Orchestration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#orchestration) · [Polish: „Orkiestracja”](../../pl/s02e04-multi-agent-collaboration.md#orkiestracja)

**Principle.** Joining the results is the main agent's own job. Two sources have two frames
of reference: time zone, unit, currency, identifiers. First bring both into one frame, in
code, and only then join.

**Why.** A model joins by how values look. "22:35" from one source matches "ten thirty-five"
from the other, even when they are different moments. Daylight saving changes, zone offsets
and calendar exceptions are changing facts the model does not compute reliably from memory
([P05](../01-context/p05-check-changing-facts-at-source.md)). Workers should not do it
either: each knows only its own source, and its skill tells it to keep the value as the
source gives it.

**Case.** S02E04: job 1 returned a record from 2026-10-31, 22:35, clock US Eastern. The
job 2 clip said "Desk time, central European.". On 31 October the US was still on daylight
time (EDT, UTC-4, change on 1 Nov at 02:00), while Europe was already on standard time
(since 25 Oct). That week the gap is 5 hours, not 6. The main agent converted it with
`Intl` (`America/New_York`, `Europe/Berlin`): 22:35 EDT → 02:35Z → 03:35 CET → the note
"Three thirty-five … @1:00". Traps: the same clock for both sources gives @0:09, and EST
(UTC-5) gives @1:13. The course: "The merge is the main agent's own job: two sources, two
frames of reference — normalize before joining."

**Apply.**

- For every field that comes from two sources, ask: what frame is each one in?
- Workers return the value with its frame (`clock: US Eastern`, currency, unit), without
  converting it.
- Code converts it, with a library that knows the rules (`Intl`, `zoneinfo`, a rate table),
  through UTC or another shared base.
- Check the result both ways and list the traps that would give a different answer.

---

← [P43](p43-skill-travels-with-the-job.md) · [chapter](README.md) · [all pills](../README.md) · [P45](../05-agents-without-humans/p45-remote-worker-way-there-and-back.md) →
