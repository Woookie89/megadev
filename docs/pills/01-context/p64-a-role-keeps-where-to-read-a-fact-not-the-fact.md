# P64 · A role keeps where to read a fact, not the fact: read settings, prices and limits from their source at every start

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S04E02

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Personality and Environmental Awareness" — [original (EN)](../../s02e01-agentic-primitives.md#personality-and-environmental-awareness) · [Polish: „Osobowość i świadomość środowiska”](../../pl/s02e01-agentic-primitives.md#osobowość-i-świadomość-środowiska)
>
> There are no S04 lesson notes in the repo yet, so the lesson cited is an earlier one: S02E01 says an agent that works without us needs a map of available resources, or at least information about where to find them.

**Principle.** The file that describes a role (`ROLE.md`, a skill, `AGENTS.md`) names the source of a
fact: an address, a file, a command. It does not copy the fact. A fact that changes outside the
role (settings, prices, limits, rates, versions) is read by the role's code at every start and
handed to the model together with the time of the read. When the course or a user rejects one item
of a result, first check whether that item depends on a copied number.

**Why.** To the model, the role file is reality. It does not know the number in it has a date, and it
has no way to tell that the source moved on. The model will carry the number into its result in a
confident tone, even when it has a tool that could read the source. Lesson S02E01 says an agent
without a human needs a map of the resources available to it, or at least information about where
to find them. That points to a place rather than copying its content, and only a pointer does not
go stale together with the source. The principle is close to
[P05](p05-check-changing-facts-at-source.md) (check changing facts at the source, not in the
model's memory), [P04](p04-a-download-is-a-dated-copy.md) (a download is a dated copy) and
[P23](../05-agents-without-humans/p23-state-outside-the-process.md) (read the source of truth live).
The difference: here the copy sits in the role's instructions, not in the model's memory or in a
downloaded file.

**Case.** S04E02, the second role in the Host Desk: a reviewer of the co-host's change. The given
reviewer's `ROLE.md` had hard-coded "House settings": version `2026-11-10.1`, commission 15 %. The live
`GET /settings` said: version `2026-11-17.548`, `commissionPct` 12. The patch raised the commission
in hunk `h-be5` from 12 to 15. The model trusted the 15 % in `ROLE.md`, gave that hunk the wrong
verdict, and the course refused the run: "hunk h-be5 has the wrong verdict; the other two are
right." The refusal named one hunk, and the trail led to one copied number. After the refusal the
model fetched `/settings` itself and built the right table, but a verdict is sent once per attempt,
so it was too late.

The fix: `ROLE.md` holds no settings. The script `context.mjs` reads the live `/settings` at every
start and prints it first. The course stressed that the house's settings change with every attempt:
in the log the commission was 12 % (attempt 1), 16 % (attempt 2, a second patch), 14 % (the payout
practice) and 12 % (the payout run). `batch.mjs` likewise reads the commission live. The course
wrote it down as rule 4 in `factory/CHECKLIST.md`: "Have every role read its facts (settings,
prices, limits) from their source at every start; never copy them into its files." In the course's
toolbox: "Your roles read their facts at every start (context.mjs and live settings read)".

The HQ debrief, verbatim:

> Failed until you made your reviewer read `/settings` at every start.

> Why it matters: The settings pasted into the reviewer's file were a snapshot, and the house's settings changed with every attempt, so a role that trusted its own file judged against old numbers. A role reads its facts from their source at every start.

**Apply.**

- Review `ROLE.md`, skills and `AGENTS.md` for numbers, versions and rates. Every one that has a
  source outside the file becomes a pointer to the source and a read in code.
- The script does the read when the role starts and prints the value with its version or time. The
  model does not have to remember to do it ([P53](../08-harness/p53-code-checks-the-model-decides.md)).
- Rules of reasoning (how to judge) stay in the role file. Values the judgment depends on come
  from the source.
- Treat scripts with similar constants (amounts, addresses, a challenge slug) the same way: a new
  challenge means new values, so read them from the manual or the API, not from the previous script.
- When a refusal points at a single item, look for a copied fact before you change the model or the
  prompt.

---

← [P63](../07-human-in-the-loop/p63-a-rule-in-a-document-is-a-check.md) · [chapter](README.md) · [all pills](../README.md) · [P65](../03-memory/p65-a-decision-has-its-why-next-to-the-code.md) →
