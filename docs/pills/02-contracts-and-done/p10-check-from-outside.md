# P10 · Check the result from outside, the way the recipient will see it

> Chapter [2. Contracts and "done"](README.md) · episodes: S02E02, S02E03, S03E01

> **Lessons:**
>
> - S02E05 · Agent Reliability → chapter "Evaluation" — [original (EN)](../../s02e05-agent-reliability.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s02e05-agent-reliability.md#ewaluacja)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Quality" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#quality) · [Polish: „Jakość”](../../pl/s01e05-building-workflows-not-tool-stacks.md#jakość)

**Principle.** Before you hand something to a recipient who has limited attempts, run a
smoke test from their side.

**Case.**

- S01E04: the harness fetched the public link over HTTPS and confirmed the title and the
  marker.
- S01E05: a signed host selfcheck tested both models without spending the reviewer's
  questions.
- S02E02: a `node agent.mjs --dry "<mail text>"` mode or one test mail before giving the
  address to the course would have caught the model refusal and the blocked page reader
  before round one.
- S02E03: after the refusal for result size, the harness downloaded the course's calibration
  clip and measured the fix locally (822 B against a 1024 B limit) before it deployed. The
  second round passed. Earlier it walked the whole OAuth path on the live address with a
  script posing as a stranger client.
- S03E01: the same `test.mjs` (15 checks, one per requirement) ran locally and against the
  deployed address with the real feed. The claim went out only after 15/15 from outside,
  after a wait of about 2.5 minutes for the new subdomain's TLS certificate
  ([P50](p50-a-requirement-has-an-address-and-a-test.md)).

**Apply.** Every agent and service gets a dry mode (`--dry`, `selfcheck`) that runs the
whole path without side effects.

---

← [P09](p09-sent-is-not-confirmed.md) · [chapter](README.md) · [all pills](../README.md) · [P11](p11-empty-answer-is-an-error.md) →
