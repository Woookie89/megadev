# P48 · Test on the shape of real input, and add every live failure to the set

> Chapter [2. Contracts and "done"](README.md) · episodes: S02E05, S04E03

> **Lessons:**
>
> - S02E05 · Agent Reliability → chapter "Evaluation" — [original (EN)](../../s02e05-agent-reliability.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s02e05-agent-reliability.md#ewaluacja)

**Principle.** The test set looks like what really comes in: as many asks per message, the
same required reply format, the same traps. Every live failure becomes a new case in the set,
and you check the fix locally on the exact input that failed before you spend another try.

**Why.** A set of single, clean cases easily scores full marks and says nothing about real
traffic. The lesson calls this a too-easy eval: the score looks good because the cases are
simpler than reality. A refusal from production or from a grader usually names only an error
code, not the input, so without a local copy of the real input every fix is a guess, and
every new round costs.

**Case.** S02E05: the course's practice was 10 messages, one ask each. `check.mjs` labelled
them all right: 10 of 10. Live, a message came with two asks (`purge_cache` free and
`rotate_key` gated) and a required format: one line `DONE: <act>` or `HOLD: <act>` per ask.
The agent judged the whole message at once: it held both acts and answered without those
lines. The course refused with a code: "Round 2: no_action_lines".

The harness rewrote the split into asks (each line on its own) and ran the course's exact
message text through the agent locally. The result `DONE: purge_cache` and
`HOLD: rotate_key` was in hand before the new round. Then it also checked three asks in one
message. The second try passed. The course named this the right call: "A live refusal names
only a code, so replaying the course's own message text locally proved the fix before a new
round was spent." For next time it advised: "An offline set you run again before each
change, with every live failure added to it." That last step was not done: the live-message
tests stayed in scratch files, not in `test/test.mjs`.

S04E03 showed that a test written by the same agent as the code checks its assumption. Worker
`w-r3` (a cleaning fee without commission) wrote a function that required a whole nights amount,
and its own check let that through. After another request's 10 % discount the nights amount has
cents (7 nights at 95 EUR is 598.5), so every stay of 7 nights or more would have been parked. The
harness caught it by reading the posted change against real numbers before the merge, and ran the
worker again with the fix. The integrator's own check (`check.secrets.local.mjs`) in turn had two
wrong expected values with correct code: 7 × 95 gives 520 and 9 × 100 gives 762. The practice task
settled it: 3 of 3 paid, the first one recomputed by hand (760, after the discount 684, after
commission 574.56, plus 80 and 12, floored to 666). The course: "A worker's own check passed its own
guess, so the harness read each posted change against real numbers before the merge, not after a
refused run." Next time: "Test pricing against a practice task's real data, because made-up
expected values were wrong twice."

**Apply.**

- Before you put the agent out, run a full sample message from the other side through it,
  not only single cases.
- Keep the raw input of every failure (body, headers, time) and add it to the set as a test
  with its expected result.
- After a refusal, check the fix on that input locally first
  ([P10](p10-check-from-outside.md)). The test must fail on the old code first
  ([P08](p08-test-must-fail-first.md)).
- Run the whole set before every change, not only the new case.
- Read a worker's change against real data before the merge. Take expected values from real input
  or a hand recomputation, not from the head of the agent that wrote the code.

---

← [P47](../07-human-in-the-loop/p47-approval-over-the-owners-channel.md) · [chapter](README.md) · [all pills](../README.md) · [P49](../07-human-in-the-loop/p49-conflicting-sources-go-to-the-owner.md) →
