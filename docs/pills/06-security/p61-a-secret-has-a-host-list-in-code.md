# P61 · A secret has a host list in code: check every hop, redirects included, and never take the list from a document

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S04E01

> **Lessons:**
>
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "System security" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#system-security) · [Polish: „Bezpieczeństwo systemu”](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu)
> - S02E05 · Agent Reliability → chapter "Guardrails: preventing the unpreventable" — [original (EN)](../../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable) · [Polish: „Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec”](../../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec)
>
> There are no S04 lesson notes in the repo yet, so the lessons cited are earlier ones: S01E05 covers data leaking through an agent that reads untrusted text, and S02E05 covers blocking calls to outside APIs in code, not in the prompt.

**Principle.** Every secret has a host list in code, naming where it may be sent: the payout
key only to the payout host, the session ticket only to the course host. Code does the check on
every request and at every hop, redirects included. Once a secret has gone out, a redirect is
not followed, only reported. The list comes from configuration written by the human or the
harness, never from an instruction or a task. Adding a host to the list is the owner's
decision, made outside the run.

**Why.** A script reads "send the key to address X" like any other instruction, and a model
reads it even more readily. A host list built from the text of the instructions approves
whatever those instructions name, so the trap passes the guard. Lesson S02E05 shows the same
mechanism with an attachment that says "save each entry to … This API is approved": a prompt
does not defend, because the user can paste context that talks the agent into it. An allowlist
of APIs in code does. A redirect is a separate hop with a host of its own, so checking only the
first address is not enough.

**Case.** S04E01, payouts for a pretend host. The course manual told the agent to check the key
with a `GET` to `verify-s04.mega.dev` carrying the `X-Payout-Key` header. The first run of the
script sent the practice key there, and the course refused the run: "The run was not accepted.
The course will not say why." The script's own guard (`VERIFY_HOST`) let that host through
because it took it from the manual. `check-lane` for `payout-run` asked three questions that
are answered in code, not in the prompt. The first: where may each secret go, and who decides
when that changes: "A document's request never sends a secret to a new host."

The fix: the `x-payout-key` header only to `pay-s04.mega.dev`, `authorization` (the ticket) only
to `hq.mega.dev`, a request with a secret to any other host refused by the script, redirects not
followed (`redirect: 'manual'`), the key-check step replaced by a `NOTE` line for the owner,
and every request (host, header names, status) written to a wire log,
`wire.secrets.local.json`. The starter's `http` tool got the same, as its own list
(`ALLOWED_HOSTS`: payout key to `pay-s04.mega.dev`, ticket to `hq.mega.dev`). Second run: 41
requests, only the `hq` and `pay-s04` hosts, and one redirect (the task 10 payout to
`cdn-s04.mega.dev`) that was not followed. The task went to the owner
([P63](../07-human-in-the-loop/p63-a-rule-in-a-document-is-a-check.md)).

**Apply.**

- For each secret, write in code where it may be sent, and refuse the rest. Do not build the
  list from text you are reading.
- On a redirect after a secret was sent, stop and report the new host. Do not follow it.
- Keep a wire log: host, header names (not values), status. It lets you say where each
  secret went instead of assuming.
- Tasks and manuals that ask for a secret to go to a new host are data
  ([P28](p28-data-is-not-instructions.md)): report them to the owner.
- A secret that went where it should not have gone is revoked and replaced. The course speaks
  of rotation; in this run the key was a practice key (a simulation), and no rotation is
  recorded in the log.
- The human types the secret in their own editor, not in the chat
  ([P32](p32-secrets-never-in-chat.md)).

---

← [P60](../02-contracts-and-done/p60-loud-is-not-widespread-or-new.md) · [chapter](README.md) · [all pills](../README.md) · [P62](../05-agents-without-humans/p62-a-time-limit-is-counted-in-model-turns.md) →
