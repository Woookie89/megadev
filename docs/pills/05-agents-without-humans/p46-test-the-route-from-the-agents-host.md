# P46 · Test the route to the human from where the agent runs

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S02E05

> **Lessons:**
> - S01E05 · Building Workflows, Not Tool Stacks → chapter "Getting remote" — [original (EN)](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote) · [Polish: „Dostęp zdalny”](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny)

**Principle.** Every route the agent uses to reach a human or another service (a phone push,
mail, a webhook, an API) is tested from the agent's host, not from your own machine. Do it
before you leave the agent alone.

**Why.** To a server, the same request from your laptop and from the host are two different
requests: another IP address, another quota counter, another reputation. Free hosts go out
to the internet from shared addresses used by many other customers. Free plans often count
their quota per IP, so other people's apps use it up before your agent sends anything. An
account token does not help when the plan counts by address anyway. The failure shows only
when the agent runs alone, which is when nobody is watching it.

**Case.** S02E05: the agent on a free Render web service (Frankfurt) was to push to the phone
through ntfy.sh. Every push from Render failed with 429 "limit reached: daily message quota
reached", while the same push from the human's PC got 200. The free anonymous ntfy.sh quota
is counted per IP. The ntfy account token changed nothing: the account check showed
`limits.basis "ip"` on the free plan. A Telegram bot became the main route, tested from Render
before the window. The course: the push arrives "in under a second", and the toolbox kept "A
push route from your agent to you, tested from where the agent runs."

**Apply.**

- Before the start, send a real test push, mail or webhook from the host and check that it
  arrived, not only that the request ran.
- Check in the service's pricing what the quota counts by: IP, account, key.
- Log the status of every call (e.g. `{"type":"tg","status":200}`), so a refusal shows in the
  logs and not as silence on the phone ([P27](p27-agent-sees-its-logs.md)).
- Keep a second route and send in parallel where the notice is critical
  ([P25](p25-providers-fail.md)).

---

← [P45](p45-remote-worker-way-there-and-back.md) · [chapter](README.md) · [all pills](../README.md) · [P47](../07-human-in-the-loop/p47-approval-over-the-owners-channel.md) →
