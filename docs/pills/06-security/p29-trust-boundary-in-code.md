# P29 · Code holds the trust boundary before the model sees the message

> Chapter [6. Security: the trust boundary belongs to code](README.md) · episodes: S02E02, S02E05

> **Lessons:**
> - S02E05 · Agent Reliability → chapter "Guardrails: preventing the unpreventable" — [original (EN)](../../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable) · [Polish: „Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec”](../../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec)
> - S02E04 · Multi-Agent Collaboration → chapter "Multi-agentic collaboration" — [original (EN)](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration) · [Polish: „Współpraca wieloagentowa”](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa)

**Principle.** Who may give work, what reaches the model and what may go out is decided by
code. The model decides only on interpretation.

**Why.** An instruction in a prompt is a request; an `if` in code is a guarantee. A model
that never sees the stranger's text cannot obey it.

**Case.** S02E02, the mail agent:

| Code decides | The model decides |
| --- | --- |
| whom to trust (`TRUSTED_SENDERS`, SPF/DKIM/DMARC) | which link to open |
| which mails to handle and how to label them | how to read the table on the page |
| what reaches the model (trusted senders only) | the text of the answer |
| stripping anything that looks like a key from the answer | |

S02E05: the agent that works while you are away has no model at all. A policy table in
`check.mjs` maps each act to free or gated. An unknown act, a negated one, one inferred from
plain words, or several acts at once are held. The first version judged the whole message,
though, so `purge_cache` (free) next to `rotate_key` (gated) was held too. The fix: each line,
that is each ask, on its own. The course: "The boundary belongs in code: the act is looked up
against your policy, not judged by how the message sounds."

**Apply.** Draw this table for every agent before you write the prompt. Template in
[Appendix A5](../templates/trust-boundary.md). Apply the boundary to each ask, not to the
whole message.

---

← [P28](p28-data-is-not-instructions.md) · [chapter](README.md) · [all pills](../README.md) · [P30](p30-least-privilege.md) →
