# P58 · The recipient's checker is a spec: read it before the first build

> Chapter [2. Contracts and "done"](README.md) · episodes: S03E04, S04E04

> **Lessons:**
>
> - S03E04 · Verifying Product Outcomes → chapter "Quality Gates" — [original (EN)](../../s03e04-verifying-product-outcomes.md#quality-gates) · [Polish: „Bramki jakości”](../../pl/s03e04-verifying-product-outcomes.md#bramki-jakości)
> - S03E04 · Verifying Product Outcomes → chapter "Acceptance" — [original (EN)](../../s03e04-verifying-product-outcomes.md#acceptance) · [Polish: „Akceptacja”](../../pl/s03e04-verifying-product-outcomes.md#akceptacja)

**Principle.** When the recipient has its own checker (a replay script, a CI workflow,
acceptance tests, a format validator), read it before you build. It is the most precise spec
you will get: it says what will be measured, not only what was described. Turn each of its
checks into a test of your own before you run it against the real result.

**Why.** A README and a task description say what the author wants, but in short. The checker
says the same thing precisely, because it has to count it. An agent builds from the text in its
context. A checker it has not read does not count for it, so it learns about the gap from a
refusal, and a refusal rarely says everything. The lesson says quality gates should be mostly
deterministic, and that an agent should know before it finishes what it will do about
verification and evidence. A deterministic gate can be read.

**Case.** S03E04: the board's first build rebuilt the whole list through `innerHTML` every
2 s. On screen the list blinked and the user lost their place. The tests did not see it. The
course's replay came with product's answer, and the harness read it before running it. The
nonce letters (`a d g h i j`) chose the checks, and check j counted `incident-row` elements
removed from the DOM while the board was watched, and required zero. The harness switched to a
keyed render (rows already on screen stay, new ones are inserted above them) and added its own
test with the same `MutationObserver`. The replay against the live board: `unmet: []`, `z: 0`.
The course named this the call that turned the solve: "A course's checker is a spec you can
read, so reading the replay before the run turned a hidden fail into a fix." and "A refresh
that redraws everything blinks and loses your place. Change only what changed."

The same replay showed other checks too: the quiet night (the loader must end, and an empty
list must show `empty`; course: "An empty answer is an answer: a loader must end."), a confirm
that names the chosen incident, and three acks with an aim delay. The course's advice for next
time: "Read the course's checker before the first build, and record the plan's tensions as
scenarios, because the refused evidence and the blink both came from checks you could see up
front."

S04E04: the checker was hidden. The refusals said "Task 1: wrong answer. Start a new run." or "The
run was not accepted. The course will not say why.", and every new fetch of the manual started a new
attempt and a new 10-minute night. Two things made the way shorter. First, the hint mechanics on the
HQ page: "From your 2nd failed try at the same spot, a refusal can carry a short hint. A Solve after
a hint counts as solved with help." (session `3152bc38-….jsonl:1070`). `POST /run` on the same
attempt dealt a new run with the same task 1, so the second answer brought the hint without a new
night. Two test runs on the already refused attempt (`node batch.mjs run`) brought two more. Second,
a refusal pointed at `check-lane night-run`, and that need said what the course reads: the desk's
records (what the course sent, delivery by delivery, and what the desk did), whether each result
says what the desk really did, and which events were the owner's. Hence the HQ advice for next
time: "Send one result per event id, because the course reads every result as a claim."
([P69](../05-agents-without-humans/p69-handle-each-event-once.md)). The challenge still took three
nights, and the course counts 9 refusals, 7 with a hint. When the checker cannot be read, read what
the recipient says about it (a need's description, a hint), and look for the cheapest way to its
answer before you pay the full price of a new attempt.

**Apply.**

- Before the first build, list everything the recipient checks: scripts, CI workflows, the
  proof template, hooks (`data-testid`). Each check is one row and one test of yours.
- When the checker arrives later (like the replay with product's answer), read it before the
  first run, not after a failure.
- Do not edit or route around the checker. Verify its checksum when the recipient gives one
  (`sha256sum -c`).
- Write the plan's tensions down as scenarios right away
  ([P56](p56-done-is-an-observed-outcome.md)).
- Contract first, then send: the checker is part of the contract
  ([P06](p06-contract-first.md)).

---

← [P57](p57-a-proof-names-its-build-and-moment.md) · [chapter](README.md) · [all pills](../README.md) · [P59](p59-a-summary-number-is-a-claim.md) →
