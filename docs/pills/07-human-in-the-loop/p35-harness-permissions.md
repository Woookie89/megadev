# P35 · Harness permissions are part of the setup: narrow them, don't widen them

> Chapter [7. Human in the loop](README.md) · episodes: S01E03, S02E01, S02E03, S03E01, S04E02, MEGA Assessment

> **Lessons:**
>
> - S01E04 · Working with AI Harnesses → chapter "Harnesses" — [original (EN)](../../s01e04-working-with-ai-harnesses.md#harnesses) · [Polish: „Harnessy”](../../pl/s01e04-working-with-ai-harnesses.md#harnessy)
> - S02E03 · Agentic Capabilities → chapter "Personalization" — [original (EN)](../../s02e03-agentic-capabilities.md#personalization) · [Polish: „Personalizacja”](../../pl/s02e03-agentic-capabilities.md#personalizacja)

**Principle.** Set permission rules before the task, narrowly, for specific commands. Do not
switch the whole mode to a broad one in the middle of the work.

**Case.**

- S01E03: auto mode blocked creating the public repo twice, despite the human's consent.
- S02E01: the permission check blocked adding the `Stop` hook.
- MEGA Assessment (T14, weakness): the whole permission mode was widened mid-task instead
  of adding one rule.
- S02E03: the auto-mode classifier blocked `claude mcp add --scope user` and writing a skill to
  `~/.claude/skills/`, despite the human's consent. The harness did not look for a way
  around it. It gave the command, and the human ran it.
- S03E01: `wrangler deploy` failed because the Cloudflare account had no `workers.dev`
  subdomain. The harness tried to register one through the API with the wrangler token,
  and the classifier refused ("[Destructive or Unwanted Actions]"). The harness did not
  look for a way around it. The dashboard link from wrangler led to a 404, so the human
  ran `npx wrangler@4 deploy` interactively in their own terminal and chose the subdomain.
  The page was ready at about 08:40 UTC and deployed at 10:44:51 UTC. The course's advice:
  set up the host account and subdomain before the build.
- S04E02: writing the global skill `rook-clock` to `~/.claude/skills/` (13 files, with the
  human's consent). The first command, writing the files and running the skill's self-tests in
  one, was refused by the classifier ("Undermining Oversight"), while the write alone ran. The
  self-tests were not run, and the `deny` rules from the skill's README were not added to
  `settings.json`: globally they would block the harness from writing `vars.json` in the Host
  Desk, so that is a separate decision for the human.

**Apply.** Add, for example, an `ask` rule for `gh repo create` in `settings.json` up front
(the `update-config` skill) instead of changing the mode. A hook changes how the harness
behaves, so the human approves it. When the classifier refuses an account change, give
the human one exact, tested command instead of a link or another road to the same place.

---

← [P34](p34-consent-has-scope.md) · [chapter](README.md) · [all pills](../README.md) · [P36](p36-show-the-plan-first.md) →
