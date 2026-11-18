# P11 · An empty answer or placeholder text is an error, not a result

> Chapter [2. Contracts and "done"](README.md) · episodes: S02E02

> **Lessons:**
>
> - S02E05 · Agent Reliability → chapter "Guardrails: preventing the unpreventable" — [original (EN)](../../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable) · [Polish: „Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec”](../../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec)
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)

**Principle.** Validate the model's answer before sending: is it there, does it have the
required format. If not, retry or switch models. Do not send placeholder text.

**Case.** S02E02: Opus 5.5 via OpenRouter returned an empty answer (`content_filter`), and
the agent sent a reply with no value. The round was lost just as with a wrong value.

**Apply.** A format validator (e.g. one line `ANSWER: <value>`) as the condition to send;
an empty answer is an exception to handle.

---

← [P10](p10-check-from-outside.md) · [chapter](README.md) · [all pills](../README.md) · [P12](../03-memory/p12-chat-is-not-memory.md) →
