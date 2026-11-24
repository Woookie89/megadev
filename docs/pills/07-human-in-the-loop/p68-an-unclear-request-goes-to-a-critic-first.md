# P68 · An unclear request goes to a critic first, and the owner answers before any code changes

> Chapter [7. Human in the loop](README.md) · episodes: S04E03

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Requirements and decomposition" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition) · [Polish: „Wymagania i dekompozycja”](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja)
> - S03E01 · Mechanics Behind Product Engineering → chapter "Ownership" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#ownership) · [Polish: „Odpowiedzialność”](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność)
>
> There are no S04 lesson notes in the repo yet, so the lessons cited are earlier ones: S03E02 says that instead of a detailed spec we look for an agreement (scope, outcome, boundaries, proof) and that the goal is to find blind spots and edge cases before the work starts, and S03E01 says it is simplest to implement the feature you were asked for, but ownership means looking for the missing context from the business and the users.

**Principle.** Before anyone plans or writes code for a request, a separate role (a critic) reads it
and asks the owner what the request leaves open: the scope, the numbers, the dates, who it is for,
the data already there, how we know it worked. The critic only asks. It writes no code and does not
argue with the request. The owner's answers go word for word into a file every later role reads.
What the owner did not settle is named as a gap in the plan, not filled in.

**Why.** A short request ("charge the city tax: 3 EUR per guest per night") looks complete. A model
asked to build it fills every gap with a plausible value: no cap on nights, commission or none, for
all bookings. It does not mark that it guessed, and code with that guess passes its own tests,
because the test came from the same assumption. Only the owner knew, and lesson S03E02 reminds us
that ownership cannot be delegated to AI. A role whose only output is questions has no urge to close
the task, so it turns gaps into questions, not code.

**Case.** S04E03: three host requests on the board. The given critic role (Pi,
`deepseek-v4.1-flash`) asked 5 questions for each (`POST /board/questions`, the board took 5/5/5).
The answers were only on the owner page, so the human copied them. For `r1` and `r3`: "nothing to
add. Build it as written." For `r2` ("Charge the city tax: 3 EUR per guest per night.") three
decisions the text did not have:

- "Charge it for the first 4 nights of a stay at most."
- "Pay the tax out with the host's payout: it goes on to the city, so take no commission on it."
- "Only for bookings made on or after 17 November 2026."

The harness saved them verbatim in `requests/answers.md`, and the planner put them in the `asks` of
job `w-r2`. The worker built `city-tax.mjs` with those three rules, and the note `why/city-tax.md`
has a "Gap (do not guess)" section for what the host did not say (0 guests, a missing `day`, an odd
date): the task is parked. The course:

> The city-tax request left decisions open (a cap, the commission on it, which bookings), and a harness fills open decisions with plausible guesses. Only the host knew them, so a critic asks first and the owner answers before any code changes.

Rule 7 for your factory: "Send every unclear request to a critic first, and let the owner answer
before any code changes."

The answers must reach every role, the judging one too. The S04E02 reviewer did not read
`requests/answers.md` and flagged the 4-night cap and the date as unverified
([P54](../01-context/p54-the-agent-decides-from-what-it-is-given.md)).

**Apply.**

- Send every request that changes behaviour (a price, a limit, a tax, a permission) through a critic
  before the plan exists. A cap on questions (5 here) forces the ones that change the code.
- The critic asks about the scope, the numbers, the dates, who it is for, the data already there and
  the proof it works. It proposes no solutions and does not argue with the request.
- Save the answers word for word, with date and source, in one file next to the code
  ([P14](../03-memory/p14-one-decision-one-row.md)). Every role, the reviewer included, reads it at
  start.
- On "nothing to add", build exactly the request text. On silence about one specific thing, name the
  gap in the plan and park that case instead of guessing.
- When two sources say different things, that is not a gap but a conflict: the owner settles it
  ([P49](p49-conflicting-sources-go-to-the-owner.md)).

---

← [P67](../04-orchestration/p67-a-team-shares-one-board.md) · [chapter](README.md) · [all pills](../README.md) · [P69](../05-agents-without-humans/p69-handle-each-event-once.md) →
