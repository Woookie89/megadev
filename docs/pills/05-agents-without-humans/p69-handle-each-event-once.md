# P69 · Handle each event once: a retry gets only an ack, and a changed repeat goes to the owner

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S04E04

> **Lessons:**
>
> - S04E04 · Automating Work Beyond Code → chapter "Events" — [original (EN)](../../s04e04-automating-work-beyond-code.md#events) · [Polish: „{{pl-events-title}}”](../../pl/s04e04-automating-work-beyond-code.md#{{pl-events-anchor}})
> - S04E01 · Mechanics Behind Autonomous Systems → chapter "Runtime" — [original (EN)](../../s04e01-mechanics-behind-autonomous-systems.md#runtime) · [Polish: „{{pl-runtime-title}}”](../../pl/s04e01-mechanics-behind-autonomous-systems.md#{{pl-runtime-anchor}})
> - S02E02 · Building an Agent → chapter "Workflows and long-horizon tasks" — [original (EN)](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) · [Polish: „Przepływy pracy i zadania długookresowe”](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe)
>
> S04E04, in its "Identify" step, says the same event delivered twice must stay one piece of work, while the same event with different content is a change, not a retry. S04E01 describes an outbox that keeps one email per send key, so a crash never delivers the same email twice. S02E02 warns that parallel updates may even lose data, so we need queues or versioning.

**Principle.** An event from a queue, a webhook or an outbox has an id. Outside the chat, write
down the id of every event you handled, its body (or a hash of it) and the result you sent. Each
delivery then takes one of three ways:

- a new id: handle the event and send one result;
- the same id and the same body: a retry, so only acknowledge it (ack), with no second change and
  no second result;
- the same id and a different body: not a retry but a change you cannot settle. Change nothing,
  answer `conflict` and hand it to the owner.

One id means at most one change and exactly one result.

**Why.** Queues and outboxes deliver at least once: they send an event again until they are sure
the receiver has it, also after an ack. An agent that acts on every delivery does a repeat twice:
it adds the night twice or refunds twice. Dedup by id alone has two more holes. It loses a real
change that came under the same id, and answering `applied` to it is untrue, because nothing
changed. And a result sent to the other side is a claim. A second `applied` to a retry says "I
applied it again", even when the code changed nothing. The receiver counts results, not the agent's
intentions.

**Case.** S04E04, the Host Desk night desk. During a 10-minute night the course's outbox sends
booking events (`booking.changed`, `booking.cancelled`, `guest.message`), each with an `id`, a `seq`
and a `delivery` number. Every event needs its result within 2 minutes: `applied`, `conflict` or
`parked`.

- From the first night the `night.mjs` poller kept results by id in `night/state.json`, so no retry
  changed a booking twice. Seq 3 was the second delivery of seq 1: the same result, no second night.
- Night 1, 21:28:42Z: seq 9 was `evt_cdb77737eb5b`, delivery 2, with different data (BK-74595: 3
  nights, while the first delivery said 2). The desk answered `applied` and changed nothing. The
  harness posted `conflict` by hand at 21:29:07Z, but the course kept the first result for the id
  (`stored: "applied"`). The course's hint after the refused run: "If an event comes back with the
  same id but says something new, is it still a retry?" The fix (commit `a7ebd03`): the poller keeps
  the first body of every id, and the same id with a new body gets `conflict`, with no change. The
  booking goes to `night/parked.json`, and the payout batch flags it `needs-owner`.
- Night 2: the desk answered the retries (seq 3 and 7) with a second `applied`. The course refused
  the run with the hint: "How many times did your desk tell the course it applied that event?" The
  fix (commit `b9925e7`): a retry gets only an ack.
- Night 3: 12 events, 10 results (retries seq 3 and 7 acked only), and seq 9 (BK-91479: 2 nights,
  then 3) got `conflict`, which the course stored. The owner chose the first message: 551 EUR. The
  run was accepted.

The HQ debrief, verbatim:

> Why it matters: The outbox sends an event again until it is sure you have it, also after an ack. A desk that does every delivery does a repeat twice. Keep the ids you handled outside the chat and skip a repeat.

> Why it matters: An event came back with its id but a new body. Skipping it by id loses a real change; applying it blindly guesses. Keep each event's body hash with its id and send a changed repeat to the owner.

> Rule 8 for your factory: Handle each event once: keep its id and body hash; skip a repeat, send a changed repeat to the owner.

"Next time": "Send one result per event id, because the course reads every result as a claim."

**Apply.**

- Before you handle the first event, fix the key (the event id) and a place for state that survives
  a restart: the id, the body or its hash, the result sent
  ([P23](p23-state-outside-the-process.md)).
- For every delivery, check the three ways in code: a new id, a retry, a changed repeat. The model
  should not decide this.
- Send one result per id. A retry is not a chance to "confirm once more".
- A result says what you really did: `applied` only when the change went in. The receiver reads a
  result the way it reads a number in a summary, as a claim
  ([P59](../02-contracts-and-done/p59-a-summary-number-is-a-claim.md)).
- A changed repeat is the owner's call. Do not pick a version yourself, neither the first nor the
  last ([P49](../07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md)).
- Do not retry an irreversible action (a payout, an email) without a key that guards a single run
  ([P62](p62-a-time-limit-is-counted-in-model-turns.md)).

---

← [P68](../07-human-in-the-loop/p68-an-unclear-request-goes-to-a-critic-first.md) · [chapter](README.md) · [all pills](../README.md) · [P70](../04-orchestration/p70-every-running-job-has-an-owner.md) →
