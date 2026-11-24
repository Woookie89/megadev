# P70 · Every running job has an owner among your roles: a gap in the event numbers means someone else is reading

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S04E04

> **Lessons:**
>
> - S04E04 · Automating Work Beyond Code → chapter "Events" — [original (EN)](../../s04e04-automating-work-beyond-code.md#events) · [Polish: „Eventy”](../../pl/s04e04-automating-work-beyond-code.md#eventy)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)
>
> S04E04 advises that every event arrives through one entry point and turns into one task with an owner, and that the system asks when the owner is unclear. S02E04 says that in a team of agents even the simplest activities easily overlap and conflict, and advises that agents go to the agent that manages a resource instead of reaching it directly.

**Principle.** Before an agent starts taking work from a shared source (an outbox, a queue, a
board, a subscription), check who else takes from it. Every running job must have an owner among
your roles. Stop a job with no owner, or someone else's, by its job id, with the human's consent,
and keep your own running. A gap in the event numbers (seq) is a signal that an event went to
another reader, not noise.

**Why.** A consumer sees only what it got. An event taken by another job never reaches it: no HTTP
error, no log line, and the night looks quiet. Everything you count on your own path adds up, and
the missing changes show up only in the result (here, a wrong payout). The only trace on your side
is a hole in the numbers. A job you did not create is easy to take for part of the environment
("not ours, not touched"), and it is the one eating your data. Stopping someone else's job is
outside your scope, so it needs consent ([P34](../07-human-in-the-loop/p34-consent-has-scope.md)).

**Case.** S04E04, the Host Desk night desk. Two course jobs were running on the board from the
start: `legacy/export` (no owner) and `rook/lint` (owner `rook`). The log: "not ours, not touched".

- Night 1, 21:27Z: seq 6 came with no seq 5. The harness took it for an ordering risk and switched
  the poller to pull from `after=0`. After the night: seq 1-4 and 6-11, with no HTTP error.
- The run at 21:32Z was refused: "Task 1: wrong answer. Start a new run." BK-45688 was paid without
  its added night. A cursor probe showed that seq 5 and 12 exist, but not on our job.
- The course's hints: "Who else could take events from your outbox, and where would you see them?",
  then "Which running jobs on your board does no role of yours own, and what are they doing with your
  events?"
- The harness's permission classifier blocked the first `POST /board/stop`, so the harness asked the
  human. The consents: "1 zgoda" (stop `legacy/export` on this and the new attempt) and "zgoda na stop
  rook/lint" (every running job no night-desk role owns, on this and the new attempt).
- Once the jobs were stopped, the events came back as a second delivery: seq 13 (BK-45688 +1 night)
  and seq 14 (BK-24642, cancelled, refund 90).
- The fix in `night.mjs`: before the night opens, the poller stops every running job whose owner is
  not one of our roles. On attempt 2 both jobs were running again, so a check in code at every start
  was needed. Nights 2 and 3: seq with no gap.

The HQ debrief, verbatim:

> Failed until you stopped `rook/lint` too: its owner is not one of your roles.

> Why it matters: Other jobs read the same outbox and took events your desk never saw. Every running job needs an owner among your roles: stop the others by job id and keep yours running.

> The right call came in snag 1, and both of you made it. A gap in the event numbers means another reader on the outbox, so look at who else consumes before you trust a quiet night.

> Rule 9 for your factory: Every running job has an owner among your roles; stop the others by job id and keep yours running.

"Next time": "Before a night starts, read the board and watch the seq numbers, because a gap means
another reader."

**Apply.**

- Before a consumer starts, list everyone who reads the same source: job, owner, state.
- An owner outside your roles, or no owner: ask the human for consent to stop it by job id. The
  consent names the jobs and the scope (this challenge, this attempt).
- Count seq. Record every gap and find out who took the missing event before you call the night
  quiet. A metric counted on one path proves nothing
  ([P59](../02-contracts-and-done/p59-a-summary-number-is-a-claim.md)).
- Stop only other people's jobs. Keep your own job running, with its heartbeat.
- Do the check in code at every start, not once by hand, because the environment can change between
  attempts. Code that stops "everything but us" is a wide action: in another project, review it
  before you use it.

---

← [P69](../05-agents-without-humans/p69-handle-each-event-once.md) · [chapter](README.md) · [all pills](../README.md) · [P71](../08-harness/p71-fix-the-factory-not-the-role.md) →
