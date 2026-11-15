# P06 · Contract first, then send

> Chapter [2. Contracts and "done"](README.md) · episodes: S01E01, S01E03

> **Lessons:**
> - S01E01 · Mechanics Behind Generative AI → chapter "Mechanics of Large Language Models" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models) · [Polish: „Mechanika dużych modeli językowych”](../../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych)
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)

**Principle.** Before you send anything to an API, a form or a grader, find its contract:
the schema, an example response, the field descriptions. Guessing costs attempts.

**Case.**
- S01E01: a `schema.json` hidden in the page source gave the fields `from` and
  `compactedMessage` and the 700-character limit.
- S01E04: the claim shape `{repo, preview}` went into KEEP before any code was written.
- S01E03 (the other way round): the README said "your signature". The harness signed the
  page with the GitHub name, but the course accepted only the `ticket` from
  `start-challenge`. One refusal.

**Apply.**
- Look for `schema`, `openapi`, example responses, the README, the page source.
- Check an ambiguous word in the requirements ("signature", "done", "report count") in the
  source before you build work on it.
- The `read` skill from the course deck does this systematically.

---

← [P05](../01-context/p05-check-changing-facts-at-source.md) · [chapter](README.md) · [all pills](../README.md) · [P07](p07-done-is-a-check.md) →
