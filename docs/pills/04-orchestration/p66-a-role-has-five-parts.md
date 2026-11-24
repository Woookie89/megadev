# P66 · A role has five parts: Purpose, Tools, Limits, Startup reads and Output, and you fix an error in the part it belongs to

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S04E02

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Personality and Environmental Awareness" — [original (EN)](../../s02e01-agentic-primitives.md#personality-and-environmental-awareness) · [Polish: „Osobowość i świadomość środowiska”](../../pl/s02e01-agentic-primitives.md#osobowość-i-świadomość-środowiska)
> - S03E04 · Verifying Product Outcomes → chapter "Review" — [original (EN)](../../s03e04-verifying-product-outcomes.md#review) · [Polish: „Przegląd”](../../pl/s03e04-verifying-product-outcomes.md#przegląd)
>
> There are no S04 lesson notes in the repo yet, so the lessons cited are earlier ones: S02E01 splits an agent's prompt into five blocks (personality, environment, context, discovery, boundaries) and notes that boundaries in text are only a recommendation, and S03E04 says reviewers need principles, sources and boundaries.

**Principle.** When you add a second role to a system (a reviewer beside the author, a second
agent beside the first), describe it in fixed parts:

- **Purpose**: what the role does, in one sentence, with a named result.
- **Tools**: exactly which tools it uses.
- **Limits**: what it must not do; whatever can be enforced is enforced by code (a host list, read-only mode).
- **Startup reads**: what it reads at start, and from where (live settings, `why/` notes).
- **Output**: the shape of the result and where it goes.

When a role fails, find which part the error belongs to and fix that part. Do not rewrite the
whole role.

**Why.** Five parts are five places where something can go wrong, and five check questions when you
add a role. An error in one should not move the others. Lesson S02E01 breaks the prompt of an agent
that works alone into blocks, and notes that boundaries in text alone are a recommendation,
because the model may ignore them. That is why Limits is not just a sentence in a file but also
code. Lesson S03E04 adds that reviews are done by separate agents who "push too hard or not hard
enough", and that context with principles, sources and boundaries helps them. A role with named
parts has a place for each of these.

**Case.** S04E02: a second role comes into the Host Desk, a reviewer of the co-host's change. The
improved `ROLE.md` has these parts:

- **Purpose**: a verdict `flag` or `pass` for each hunk, with a reason that names its source.
- **Startup reads**: one call to `context.mjs`: live settings, the patch and the `why/` notes.
- **Tools**: `vars`, `http`, `code`. The reviewer has its own per-secret host list in `hosts.json`.
- **Limits**: read-only, those three tools, one send (a second one on the same attempt only reads
  back `{already:true}`).
- **Output**: one `POST /review`, one finding per hunk and no others.

The given reviewer had numbers hard-coded in its role (version `2026-11-10.1`, 15 %) and did not
read `why/`. The course refused the first run: "hunk h-be5 has the wrong verdict; the other two are
right." The refusal named one hunk, and the trail led to the Startup reads part. The fix mostly
concerned that part (live read, notes) and the judging rules, and the role was not rewritten from
scratch. Run 2: "Review accepted: every verdict is right." Rules 4 and 5 in
`factory/CHECKLIST.md` concern exactly Startup reads
([P64](../01-context/p64-a-role-keeps-where-to-read-a-fact-not-the-fact.md),
[P65](../03-memory/p65-a-decision-has-its-why-next-to-the-code.md)).

The course's steering vocabulary from the HQ debrief ("How you steer a role"), verbatim:

- How you steer a role · Purpose: What the role is for. One job per role, so its output is easy to judge.
- How you steer a role · Tools: What it can do. A tool that is not there cannot be used.
- How you steer a role · Limits: What it must not do: in words in `ROLE.md`, or in code by leaving the tool out. Words can be ignored; a missing tool cannot.
- How you steer a role · Startup reads: What it reads at every start: `/settings`, `why/`, `factory/CHECKLIST.md`. Facts change and a role starts fresh, so it reads them each time and keeps no copies.
- How you steer a role · Output: What it hands back. A reviewer hands back findings, never a changed file.

> What this aims at: Roles you can run again tomorrow, on a new change, without you, and trust the result. S04E03 adds more roles; S04E05 lets your factory write them.

From the course toolbox:

> Read-only: gained in this solve. The reviewer stayed read-only: its tools only read, its one POST is the review, and it changed no file and no setting.
>
> A reviewer that edits fixes problems quietly: nobody sees them and the writer never learns. Findings only keep the jobs apart.

**Apply.**

- Start a new role with five headings. An empty part is a decision still to be made.
- In Limits put only what you can enforce in code or tools (a host list, read without write, one
  send). Call the rest a recommendation.
- Keep a reviewer's judging rules apart: a value from settings is judged against the live value, a
  rule from a note against the note, a rename with the same behavior is `pass`, a commit message is
  a claim, and when unsure, `flag` and say what you could not check.
- When a refusal comes, find the part it belongs to and fix it. Leave the rest, and do not bundle
  other changes into the same step.
- A role that sends its result once needs a new attempt after a fix, so plan for one up front.
- Code gathers the context, the model judges ([P53](../08-harness/p53-code-checks-the-model-decides.md)).

---

← [P65](../03-memory/p65-a-decision-has-its-why-next-to-the-code.md) · [chapter](README.md) · [all pills](../README.md) · [P67](p67-a-team-shares-one-board.md) →
