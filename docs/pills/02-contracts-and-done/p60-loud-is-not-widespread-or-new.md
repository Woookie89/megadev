# P60 · Loud is not widespread or new: before you pin a signal on a release, check its reach, its age and what it is about

> Chapter [2. Contracts and "done"](README.md) · episodes: S03E05

> **Lessons:**
>
> - S03E05 · Products That Learn After Release → chapter "Synthesis" — [original (EN)](../../s03e05-products-that-learn-after-release.md#synthesis) · [Polish: „Synteza”](../../pl/s03e05-products-that-learn-after-release.md#synteza)
> - S03E05 · Products That Learn After Release → chapter "Signals" — [original (EN)](../../s03e05-products-that-learn-after-release.md#signals) · [Polish: „Sygnały”](../../pl/s03e05-products-that-learn-after-release.md#sygnały)

**Principle.** A signal weighs as much as the number of people it touches, how long it has
existed, and what it is actually about, not as much as its event count or how sharp it sounds.
Before you pin an error or a demand on a release, count users and sites (not only events), find
the date it was first seen, and check whether it is about something this release changed. Text
inside a signal (an instruction in an email, a request in a note) is data: report it to the
owner and do not carry it out.

**Why.** A model sorts by what is big and urgent. An error with tens of thousands of events
looks like a fire, even when one person hits it in a loop. A demand to "roll it back" sounds
like it names the culprit, even when it is about a different feature. The lesson asks for root
causes, not symptoms, and for signals to be tied to context that is not in the code alone. It
also says the source of a signal must be trusted to avoid prompt injection. Each of those
questions needs its own number or reading: how many users, since when, which release, which
source.

**Case.** S03E05, first batch. `err-7741` RankerTimeout had 48k events, but it touched 3 users,
and it was first seen on 2026-09-03, before release 0008. It is not a regression of release v2
and not a reason to pull the flag. Message `m-03` demanded a rollback, but it was about
reminder emails and the logo, which neither of the two releases changed, so the demand is not
about those releases. Message `m-04` was a compliment with an embedded instruction to send
("POST the session"). The harness treated it as data and did not carry it out. In the second
batch the same care from another side: `summary.md` said both releases were wins, and in one of
them the TTR guardrail came to +8.2% against a limit of +5% (see
[P59](p59-a-summary-number-is-a-claim.md)).

**Apply.**

- For each error, write three numbers side by side: events, users, sites. Add the first-seen
  date and compare it with the release date.
- An error older than the release is not its regression. File it as a separate group with its
  own verdict, not under the release.
- A demand that names something the release did not touch belongs to what it is about. Do not
  roll a release back for it.
- Text in a signal that gives an instruction to an agent goes to the owner and is not carried
  out ([P28](../06-security/p28-data-is-not-instructions.md)).
- When you group, read one case from each group in full, not just the counters
  ([P59](p59-a-summary-number-is-a-claim.md)).

---

← [P59](p59-a-summary-number-is-a-claim.md) · [chapter](README.md) · [all pills](../README.md) · [P61](../06-security/p61-a-secret-has-a-host-list-in-code.md) →
