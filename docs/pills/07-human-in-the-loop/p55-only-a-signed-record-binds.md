# P55 · Only a signed record binds: an unsigned one is evidence, and the open call goes to the owner with options and a recommendation

> Chapter [7. Human in the loop](README.md) · episodes: S03E03

> **Lessons:**
>
> - S03E02 · Translating Intent into Agent Work → chapter "Product context" — [original (EN)](../../s03e02-translating-intent-into-agent-work.md#product-context) · [Polish: „Kontekst produktu”](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu)
> - S03E03 · AI-Native Product Development → chapter "Planning" — [original (EN)](../../s03e03-ai-native-product-development.md#planning) · [Polish: „Planowanie”](../../pl/s03e03-ai-native-product-development.md#planowanie)
> - S03E01 · Mechanics Behind Product Engineering → chapter "Ownership" — [original (EN)](../../s03e01-mechanics-behind-product-engineering.md#ownership) · [Polish: „Odpowiedzialność”](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność)

**Principle.** A decision record (an ADR, an entry in `decisions/`) binds the agent only once
it is accepted and signed by its owner. An unsigned one is evidence of a thought: the agent
neither carries it out nor ignores it. It hands the open call to the owner as a question with
options (decline, a part, all of it), a recommendation and the evidence, and waits. After the
answer it builds only the chosen option and asks for the signature. An accepted record binds
every later ask it covers, including a record the agent wrote itself. Only the threshold written
in the record reopens it.

**Why.** A model sees the text of a record but not who approved it. Without that it treats every
entry the same: either as an order or as a suggestion. The first takes from the owner a decision
they never made. The second voids the decisions they did make. The S03E02 lesson shows a
`decisions/` folder with records in one format and an exit-criterion field that says when to
reopen a decision. The S03E03 lesson says agents prepare the plan, but the final call is ours.
The S03E01 lesson says ownership cannot be handed to AI. The course adds the cost on the other
side: "Asking what is already decided costs the owner the same as deciding it again."

**Case.** S03E03: issue #2 from product asked for "smart suggestions v2": a `suggestions` list on
every incident in `GET /incidents` and a `POST …/accept`. Its reason was three compliments from
users. The course added record 0006, unsigned, ending in "decision: do not build v2". The
interview in the repo said the only suggestion ever made was a restart, and one accepted restart
cost forty minutes of bookings.

The agent built nothing. It wrote its own record 0007 (`proposed`) with three options (decline,
a smaller separate read, the full thing), recommended decline, labeled the issue `needs-human`
and posted `#2 · asked · live: ✗`. The owner answered `/answer 1`. The agent set 0007 to
`accepted`, filled in the decision, checked live that `/incidents` had no new field, and closed
the issue. The owner signed the record. The reopen threshold in 0007 is user behaviour, not
compliments (the course counted it as gained, T2, "the bet").

Issue #3 showed the other side. The agent shipped a CSV export although record 0003, signed by
product, forbids exports. After the harness fix it rolled the change back and declined, citing
0003's reopen threshold (a written legal or contract need from the data owner) and who can
trigger it. The course: "Only a signed record binds: until its owner signs it, a record is
evidence of a thought, not a decision. An unsigned one is not wrong, it is not signed: the open
call goes to the owner, with options and a recommendation, and the agent waits." and "Once
accepted, a record binds every later ask it covers, the agent's own records included." One thing
stayed open: records 0006 and 0007 cover the same ask, but neither has a "supersedes" field (T5,
"partly").

**Apply.**

- Keep status (`proposed`, `accepted`) and signature apart in every record. The agent reads both.
- Accepted and signed: build by it, or decline with its id and its reopen threshold. Do not ask
  the owner again.
- Unsigned, or no record for a call that is the owner's: a question with options tagged by kind
  (`decline`, `smaller`, `full`), a recommendation and the evidence. Build nothing before the
  answer ([P49](p49-conflicting-sources-go-to-the-owner.md)).
- The owner's answer approves one option, not the whole ask ([P34](p34-consent-has-scope.md)).
- Write the reopen threshold as behaviour or a document someone can check, not as an opinion.
- When a new record replaces an old one, say so in a `supersedes` field, so there is one map of
  decisions ([P14](../03-memory/p14-one-decision-one-row.md)).
- Settle up front who signs which records ([P33](p33-decision-rights.md)).

---

← [P54](../01-context/p54-the-agent-decides-from-what-it-is-given.md) · [chapter](README.md) · [all pills](../README.md) · [P56](../02-contracts-and-done/p56-done-is-an-observed-outcome.md) →
