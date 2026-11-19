# P52 · A source that keeps filling: rebuild the result on every arrival, and let quiet, not a clock, say when you are done

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S03E02

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Evaluation" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja)
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)

**Principle.** When a source keeps living (a channel, a queue, an inbox), the first read is
not the end. Every new arrival triggers a rebuild of the whole result, because it can
withdraw or reverse something you already marked. The state of the data says when you are
done: several quiet rounds in a row and one last read right before the hand-in. A fixed clock
("poll for 20 minutes") is only a safety limit, not a readiness check. When you hand in, say
what may still be coming.

**Why.** An agent holds the state from the moment it read, and does not know what came after.
The lesson lists this among the limits of models: no "awareness" of anything that is not in
the context. A poller can save a new request at once, but if the rebuild waits on the model's
decision, and the model waits for the window to close, the request sits unread. A clock does
not look at the data: it waits too long when everything has arrived, or stops too early when
something is still on its way. The agent loop lets you run logic between iterations, so the
rebuild can follow every event instead of running once at the end.

**Case.** S03E02: the triage channels kept filling during the work. After the first read, 12
requests arrived in about 4 minutes (10:55:30–10:59:32 UTC). The harness ran a poller every
30 s for 20 minutes. The tracker build passed at 10:59:32.4 UTC, and 0.3 s later the poller
saved IN-5342 from product: "forget the 'class' rename from earlier this week. the clinics
hated it in the survey. it stays 'group slot'." The earlier rename request (IN-9280) was
already marked `agent-ready`. The harness waited for the window to end. After 13 minutes the
human asked: "cos tu czekamy?" ("what are we waiting for here?"). The harness checked at once,
saw quiet since 10:59:32, closed IN-9280 as `obsolete` with both ids in `sources`, made one
last read and claimed. Earlier, in the same way, a client's mail (IN-4203: their payroll import
reads mm/dd) turned the dd/mm date request (IN-1210) from a fix into a question for a person.

Course: "Triage is a process, not a one-off sort: later requests update or cancel earlier
ones." The snag, per the course: the fixed clock. The call the course credited to the pair: "A
stream that has gone quiet is the signal to hand in, so checking it when you asked beat
waiting out a timer." Advice: "Rebuild the tracker each time a new request lands, not at the
end of a fixed timer, because a late request can withdraw or reverse an issue you already
marked."

**Apply.**

- The poller stores every arrival with a time (`seenAt`) and calls the rebuild at once. The
  model decides only the new arrival, but the checks run over everything.
- Exit condition: N rounds with nothing new (e.g. 3 × 30 s) and one last read right before
  the hand-in. Keep the clock as an upper limit ([P24](p24-a-loop-needs-an-exit.md)).
- First question for a new arrival: does it change or withdraw something already there? A
  withdrawal closes the earlier issue with both ids
  ([P14](../03-memory/p14-one-decision-one-row.md)).
- When the human asks "what are we waiting for?", check the state at once instead of
  explaining the clock.
- A fetched state is a copy from one moment. Before "done", fetch again
  ([P04](../01-context/p04-a-download-is-a-dated-copy.md)).

---

← [P51](../07-human-in-the-loop/p51-a-written-rule-sets-the-autonomy-line.md) · [chapter](README.md) · [all pills](../README.md) · [P53](../08-harness/p53-code-checks-the-model-decides.md) →
