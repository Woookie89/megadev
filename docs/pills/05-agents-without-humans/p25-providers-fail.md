# P25 · Model providers fail, so design for it

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05, S02E02, S04E01

> **Lessons:**
>
> - S02E02 · Building an Agent → chapter "Providers and configuration" — [original (EN)](../../s02e02-building-an-agent.md#providers-and-configuration) · [Polish: „Dostawcy i konfiguracja”](../../pl/s02e02-building-an-agent.md#dostawcy-i-konfiguracja)
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)

**Principle.** Transient errors (429, 5xx), refusals and provider-side tool blocks are
normal events, not exceptions.

**Case.**

- S01E05: one 503 from Gemini and the test writer gave up, which cost a round.
- S02E02: a refusal (`content_filter`) from Opus, and Anthropic's server-side `web_fetch`
  refusing the course domain (`url_not_allowed`).
- S04E01: practice through Pi returned 401 "API key expired". The OpenRouter key copied from
  the `.env` of an earlier challenge had expired, and the error looked like a model fault. The
  run went ahead once the human typed a fresh key. A 401 is a key problem, not a model problem:
  check the authentication before you change the model.

**Apply.**

- Retry on 429 and 5xx.
- A chain of fallback models.
- Validate the answer ([P11](../02-contracts-and-done/p11-empty-answer-is-an-error.md)).
- Your own tools instead of server-side ones where reach and logging matter. A custom
  `fetch_url` works with any provider and logs what it opened.

---

← [P24](p24-a-loop-needs-an-exit.md) · [chapter](README.md) · [all pills](../README.md) · [P26](p26-timing-is-behavior.md) →
