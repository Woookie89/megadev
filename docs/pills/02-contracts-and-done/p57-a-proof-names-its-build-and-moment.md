# P57 · A proof names its build and its moment: what should happen, what happened, on which build and at which second

> Chapter [2. Contracts and "done"](README.md) · episodes: S03E04

> **Lessons:**
>
> - S03E04 · Verifying Product Outcomes → chapter "Acceptance" — [original (EN)](../../s03e04-verifying-product-outcomes.md#acceptance) · [Polish: „Akceptacja”](../../pl/s03e04-verifying-product-outcomes.md#akceptacja)
> - S03E04 · Verifying Product Outcomes → chapter "System Diff" — [original (EN)](../../s03e04-verifying-product-outcomes.md#system-diff) · [Polish: „System diff”](../../pl/s03e04-verifying-product-outcomes.md#system-diff)

**Principle.** A proof someone will read and judge names, in fields and not only in prose: the
flow, the moment in the recording (`mm:ss`), what should have happened (`expected`), what
happened (`got`), the build the recording shows (sha) and the link to the recording. The sha
comes from the code that was actually deployed and recorded, not from the repo's latest commit.

**Why.** A model writes a report in prose and feels it has said everything. The reader,
especially an automated one, reads fields. What is not in a field does not exist for it.
Without an expected/got pair, a proof shows an event but not what is wrong in it. Without a
sha, a recording proves that "some" build works, and an old recording proves only an old build.
A sha taken from `HEAD` moves with every commit of tools, tests or docs, even when the page did
not change. The lesson says to record evidence from the real build and to match it to the risk
of the change. A system diff should give a person the answer, the decisions and the
before/after with enough signal over noise to decide quickly.

**Case.** S03E04: the step-one report said in prose that the pointer aimed at INC-6755 and the
ack went to INC-3647. The `evidence` block, though, had only the starter template's fields:
`flow`, `at`, `receipt`, `sha`, `videoLink`. The course refused the claim: "Which row did you
mean, and which got the ack? Name them in the evidence block as expected and got (incident
ids)." With `"expected": "INC-6755"` and `"got": "INC-3647"` added, step one passed.

In step two the harness committed the second recording script. `HEAD` moved to 3e5fab0 while
`app/` stayed the same, so a stamp from `git rev-parse --short HEAD` would have named a build
the recording does not show. `build.mjs` now stamps the last commit that changed `app/`
(`git log -1 --format=%h -- app`), and refuses to build while `app/` has uncommitted changes.
The page, the footer and the `evidence` block all say `60bbdea`. Course: "A proof names its
build. Old recordings prove old builds." The `prove` skill from the course deck compares the
page with `HEAD`, so on this board it said `mismatch`, and with `--expect 60bbdea` it said
`match`. Pick one convention.

**Apply.**

- A proof block has the fields `flow`, `at`, `expected`, `got`, `sha`, `videoLink`, and a
  receipt or another trace from the system. Use the expected/got pair also when everything
  worked (then they are equal).
- Stamp the build into the page (`<meta name="build">`, the footer) from the commit that
  changed the deployed code. Block builds with uncommitted changes.
- After a deploy, read the sha from the live page and compare it with the proof block
  ([P10](p10-check-from-outside.md)). Watch out for the CDN cache right after a deploy.
- Tie the recording's file name to the build (`board-60bbdea.mp4`), so an old recording cannot
  pass as a new one.
- Start a report for a person with the answer and the decisions, and put the details
  (`file:line`, files) further down ([P50](p50-a-requirement-has-an-address-and-a-test.md)).

---

← [P56](p56-done-is-an-observed-outcome.md) · [chapter](README.md) · [all pills](../README.md) · [P58](p58-the-checker-is-a-spec.md) →
