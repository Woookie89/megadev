# P56 · "Done" is an observed outcome: check the product the way a person uses it, in time and on a recording

> Chapter [2. Contracts and "done"](README.md) · episodes: S03E04

> **Lessons:**
>
> - S03E04 · Verifying Product Outcomes → chapter "Acceptance" — [original (EN)](../../s03e04-verifying-product-outcomes.md#acceptance) · [Polish: „Akceptacja”](../../pl/s03e04-verifying-product-outcomes.md#akceptacja)
> - S03E04 · Verifying Product Outcomes → chapter "Verification" — [original (EN)](../../s03e04-verifying-product-outcomes.md#verification) · [Polish: „Weryfikacja”](../../pl/s03e04-verifying-product-outcomes.md#weryfikacja)

**Principle.** Green tests say the code does what the test checks. They do not say the product
works for a person. Work on an interface is done when you have seen the outcome: a recording
of a real flow on the deployed build, done the way a person does it. The pointer moves to the
button, aims for a moment, and clicks where it saw the button. You watch the recording at
every moment where something happens.

**Why.** Browser test tools wait for the page to settle and find the element again at the
moment of the click. A person does not wait: they look, aim and click a moment later, and the
page can change in between. Bugs that live in time (a refresh while aiming, a list that moves,
a race between two events) do not exist in the test's world. An agent that writes and runs its
own tests also tends to check under conditions that suit the code. The lesson says an agent's
"done" does not mean the work was delivered, and that an agent can generate evidence instead of
recording it. That is why an "agentic lab" lets the agent use the app like a user: click, type
and record short videos of the real build.

**Case.** S03E04: the incident board refreshes every 2 s (R4), and new incidents land at the
top of the list (R1). The harness's test "Ack acks that incident and marks the row (R2)"
passed: a Playwright locator click hit the button of the row the test named. A recording that
clicked by screen coordinates showed something else. At 00:12 the pointer rests on Ack for
INC-6755 in row 3, at 00:16 a new incident arrives and every row moves down one place, and at
00:17 the click acks INC-3647. Nobody is on INC-6755. Course: "Done is an observed outcome, not
green tests. Some bugs live in time: only a recording of a person using it shows them." and
"Test runners wait for the page to settle; people do not. Verification has to behave like a
person."

The course's replay works the same way: it watches the board, then three times aims at the
third row not yet acked, lets new incidents through while it aims, and clicks after 300 ms.
After the step-two change (a confirm that names the id), all three acks hit the incident they
aimed at. Course: "A test checks the code you hand over; a replay checks the product people
use, live, in time."

**Apply.**

- For every flow in the plan, record one run on the deployed build. Click by coordinates,
  after an aim delay, not with a locator that waits for the element.
- Write down `mm:ss` moments with what happened (`events.json`), and watch each one before you
  write "works".
- Record tensions in the plan (two requirements that break something together) as separate
  scenarios.
- Keep the test as the gate for the code, and the recording or replay as the proof for the
  product. One does not replace the other ([P07](p07-done-is-a-check.md),
  [P10](p10-check-from-outside.md)).
- Treat time as part of behaviour: refreshes, delays and the order of events belong in the
  scenario ([P26](../05-agents-without-humans/p26-timing-is-behavior.md)).
- A proof from a recording names its build and moment
  ([P57](p57-a-proof-names-its-build-and-moment.md)).

---

← [P55](../07-human-in-the-loop/p55-only-a-signed-record-binds.md) · [chapter](README.md) · [all pills](../README.md) · [P57](p57-a-proof-names-its-build-and-moment.md) →
