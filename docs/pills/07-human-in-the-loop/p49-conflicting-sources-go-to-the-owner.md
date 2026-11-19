# P49 · Conflicting sources don't win by rank: the owner decides, and until they answer you build only what is settled

> Chapter [7. Human in the loop](README.md) · episodes: S03E01

> **Lessons:**
>
> - S03E01 · Mechanics Behind Product Engineering → chapter "Ownership" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#ownership) · [Polish: „Odpowiedzialność”](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność)
> - S03E01 · Mechanics Behind Product Engineering → chapter "Judgment" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#judgment) · [Polish: „Osąd”](../../pl/s03e01-mechanics-behind-product-engineering.md#osąd)

**Principle.** When two sources say different things, or real data breaks a requirement, the
agent does not pick a side and does not fill the gap. It writes down both sides with their
spot in the source, asks the owner one question that names them, and builds only from what is
not in dispute. No answer is a result too: you show the data as it is, with no made-up value
and no decision taken for the owner.

**Why.** A model wants to close the task. Faced with a conflict, it picks the source that
looks more important (the spec over a note on a screenshot), and it fills an empty field with
a value that looks plausible. The rank of a document says nothing about what the owner
wants. The lesson puts scope, assumptions and trade-offs where the product manager and the
product engineer overlap, which is where a person decides. It also says that neither the
model's base knowledge nor the codebase carries the context for such decisions. A made-up
value on a public page looks like a fact, and rolling back something users have already seen
costs their trust.

**Case.** S03E01: six sources of requirements for one status page. Three conflicts:

- R-L3K (PDF: dates day first, 05/10) and R-X6H (screenshot: month first, 10/05),
- R-H9K (PDF: last night only) and R-Z6M (whiteboard photo: the whole week),
- R-X5K (PDF: "each incident names who ran it") and feed record 4471, whose author is "—".

The harness settled none of them. Each went on the list with a question naming both sides,
for example "R-X5K says each incident names who ran it, but feed record 4471 (...) has author
"—": who ran 4471, and what should the page show for it until we know?". The course accepted
the list on the first try: "no guesses in it. one of them answered you." Product answered only
the dates: "dates day first, 05/10, the way the night shift writes them. R-L3K holds, R-X6H
goes." Scope and author got no answer, so the page shows every feed record as it came and has
no author column. Rook: "you built what was agreed. the rest went back as questions."

**Apply.**

- One conflict is one entry: the tag, the other side (a tag or a record id), the question to
  the owner and the spot in the source. Each side of a pair gets its own entry.
- Test requirements against real data. A requirement the data breaks is a conflict too, with
  a record instead of a tag.
- Until the answer comes, build so that neither side wins: show the data as it came, leave
  out a field you cannot fill with the truth. Placeholder text posing as data is an error
  ([P11](../02-contracts-and-done/p11-empty-answer-is-an-error.md)).
- Write the owner's answer down with its date and source. It settles only what was asked
  ([P14](../03-memory/p14-one-decision-one-row.md)).
- Agree up front who decides what ([P33](p33-decision-rights.md)).

---

← [P48](../02-contracts-and-done/p48-test-on-the-real-input-shape.md) · [chapter](README.md) · [all pills](../README.md) · [P50](../02-contracts-and-done/p50-a-requirement-has-an-address-and-a-test.md) →
