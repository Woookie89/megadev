# P34 · Consent has a scope

> Chapter [7. Human in the loop](README.md) · episodes: S01E04, S04E01, S04E02

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)

**Principle.** A "yes" covers a named set of actions in a named place. Anything outside it
needs its own yes.

**Case.** S01E04, KEEP: "Human's yes covers pushes, issues, branches and PRs inside
Woookie89/s01e04-rig-handover only".

S04E01: the human chose to leave the starter's `http.mjs` alone (option A: "focus on the
task"). After the course's refusal, `check-lane` said to answer in code, and the harness changed
`http.mjs` (a host list per secret, no redirects), treating it as part of the task. The
starter's README allows it ("You and your harness may change anything here, code included."),
but the log holds no consent from the human for that change, and HANDOVER lists it as open.
When a new requirement goes beyond the scope of an earlier "yes" or "leave it", go back to the
human before the change.

S04E02: one message from the human ("tak dawaj opcje 1, pozwalam ci go zapisac gdzie trzeba",
session `65b3ae3c-…jsonl:1531`) arrived while the harness had asked two different questions: about
`deny` rules for the global skill `rook-clock` (three options) and about fetching the reviewer zip
into the Host Desk. Earlier, "gdzie trzeba" had meant the skill (`:1511`: "tego skilla dawaj tam
gdzie trzeba do globalnego. opcja A zgadzam sie"). By `s04e02/log.md:18`, the harness read the
message as "option 1: leave the settings alone" and "yes, fetch the zip and place the files in the
Host Desk", and did exactly that: it fetched the zip, read every file and copied `roles/reviewer`
and `why/`. Mid-turn the human separated the two matters: "instalacja skilla clook to jedno a tego
s s04e02 to inna sprawa" (`:1617`, spelling as in the session). The brief for this write-up says the
human's answers were mixed up once, and the sources do not say which answer was assigned to which
question. When one message answers several questions, repeat to the human what you take as the
answer to which before you act. Consent to fetch the zip did not cover changing settings or
anything outside the Host Desk.

---

← [P33](p33-decision-rights.md) · [chapter](README.md) · [all pills](../README.md) · [P35](p35-harness-permissions.md) →
