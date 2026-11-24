# P10 · Check the result from outside, the way the recipient will see it

> Chapter [2. Contracts and "done"](README.md) · episodes: S02E02, S02E03, S03E01, S03E03

> **Lessons:**
>
> - S02E05 · Agent Reliability → chapter "Evaluation" — [original (EN)](../../s02e05-agent-reliability.md#evaluation) · [Polish: „Ewaluacja”](../../pl/s02e05-agent-reliability.md#ewaluacja)
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Quality" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#quality) · [Polish: „Jakość”](../../pl/s01e05-building-workflows-not-tool-stacks.md#jakość)
> - S03E03 · AI-Native Product Development → chapter "Feedback" — [original (EN)](../../s03e03-ai-native-product-development.md#feedback) · [Polish: „Informacja zwrotna”](../../pl/s03e03-ai-native-product-development.md#informacja-zwrotna)

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
- S03E03: the agent shipped issues to Cloudflare Workers on its own. Its `deploy` tool ran the
  tests, committed, deployed and read `/incidents` live at once, and the skill forbade `live: ✓`
  from a local test. Every `shipped · live: ✓` line came only after the new behaviour was read
  from the address (e.g. `/incidents/INC-0000` → 404). In the mock rehearsal the deploy was dry,
  so the agent wrote `waiting · live: ✗`. The `?status=` (#4) and `?since=` (#5) filters landed in
  one handler; each deploy checked its own filter live, and a test checked both together. The
  feed address had to go into `[env.production.vars]`, because the production environment does
  not inherit top-level vars. The course: "Merged is not deployed, and deployed is not live: a
  smoke on the live address after each deploy shows it, and a ship log written before the deploy
  can't know." and "Two changes on one handler: one can undo or block the other. Only the live
  answer says."

**Apply.** Every agent and service gets a dry mode (`--dry`, `selfcheck`) that runs the
whole path without side effects. An agent that deploys on its own has a deploy step that ends
in a read of the live address, and writes its log line only after it.

---

← [P09](p09-sent-is-not-confirmed.md) · [chapter](README.md) · [all pills](../README.md) · [P11](p11-empty-answer-is-an-error.md) →
