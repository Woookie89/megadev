# P43 · The skill travels with the job

> Chapter [4. Orchestration: many agents, one result](README.md) · episodes: S02E04

> **Lessons:**
> - S02E04 · Multi-Agent Collaboration → chapter "Agent2Agent" — [original (EN)](../../s02e04-multi-agent-collaboration.md#agent2agent) · [Polish: „Agent2Agent”](../../pl/s02e04-multi-agent-collaboration.md#agent2agent)
> - S02E04 · Multi-Agent Collaboration → chapter "Takeaways" — [original (EN)](../../s02e04-multi-agent-collaboration.md#takeaways) · [Polish: „Najważniejsze wnioski”](../../pl/s02e04-multi-agent-collaboration.md#najważniejsze-wnioski)

**Principle.** Delegation means the work leaves the main agent: the worker has its own
context and its own connection to the tools. The skill that says *how* to do the job has
to travel with it. A skill the main agent read is not a skill the worker used.

**Why.** Agents don't share threads. A worker sees only its brief and what its own harness
loads. A tool says *what* can be done. Without the procedure the worker does the obvious
thing: it searches the default scope, reads every field, hands back a raw dump. The skill
turns that dump into the shape the next reader needs.

**Case.** S02E04: two course jobs, two skills, two workers.

- The local `claude -p` had `voice-to-memo` in `.claude/skills/` of its own folder, and its
  prompt said to load it and named version 1. The notes came out in the skill's shape: one
  per event, with `@m:ss`, repeats included (11 notes).
- The cloud routine cloned a private repo that held only `incident-lookup`. The worker
  first compared that copy with the skill served on the job link, then searched `ops/live`
  instead of the default archive and never read the `crew` field.

The course: "A tool says what; a skill says how. The skill has to travel with the job — a
skill the main agent read is not one the worker used." Both `submit` calls passed on the
first try.

**Apply.**

- Put the skill where the worker's harness loads it from: `.claude/skills/` in its folder,
  the repo it clones, the CI image.
- Name the skill and its version in the brief. When the course or the team serves the skill
  at the source, the worker compares its copy with the original.
- The main agent does not retell the skill to the worker in its own words. A summary drops
  exactly the rules that separate the procedure from the obvious thing.
- Brief template with a skill field: [A3](../templates/worker-brief.md).

---

← [P42](../08-harness/p42-big-bytes-beside-the-model.md) · [chapter](README.md) · [all pills](../README.md) · [P44](p44-normalize-before-joining.md) →
