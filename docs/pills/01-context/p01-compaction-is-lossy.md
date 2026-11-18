# P01 · Compaction is lossy, and you decide what gets lost

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S01E01

> **Lessons:**
>
> - S01E01 · Mechanics Behind Generative AI → chapter "Mechanics of Large Language Models" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models) · [Polish: „Mechanika dużych modeli językowych”](../../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych)
> - S01E01 · Mechanics Behind Generative AI → chapter "Platforms and Harnesses" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#platforms-and-harnesses) · [Polish: „Platformy i harnessy”](../../pl/s01e01-mechanics-behind-generative-ai.md#platformy-i-harnessy)
> - S01E02 · Steering Models Through Context → chapter "How does the context work?" — [original (EN)](../../s01e02-steering-models-through-context.md#how-does-the-context-work) · [Polish: „Jak działa kontekst?”](../../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst)

**Principle.** Every cut (a conversation summary, `/compact`, a field limit, a summary for
a subagent) throws content away. Before you cut, write down what must survive.

**Why.** The model doing the cutting does not know what will matter later. It cuts what
looks like decoration, and decoration is sometimes the point. Rook, after accepting the
shortened message: "you kept it. most don't. the rest you decided for me."

**Case.** S01E01: the message had 1288 characters and the field allowed 700. The protected
paragraph survived word for word (622 characters), but the course listed 10 lost
fragments, among them "somebody slow" (the challenge title) and "ask me anything".

**Apply.**

- Before a long session or `/compact`, add a "keep" section to `CLAUDE.md` or the handover
  file.
- Keep the full source outside the conversation (a log), so the cut can be rebuilt.
- Cut repetition and form, not facts. Leave headroom under the limit.

---

[chapter](README.md) · [all pills](../README.md) · [P02](p02-conversion-to-text-is-lossy.md) →
