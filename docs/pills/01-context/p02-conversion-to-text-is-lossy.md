# P02 · Context is text, and every conversion to text is lossy

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S01E02

> **Lessons:**
>
> - S01E01 · Mechanics Behind Generative AI → chapter "Mechanics of Large Language Models" — [original (EN)](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models) · [Polish: „Mechanika dużych modeli językowych”](../../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych)
> - S01E03 · Building Knowledge Systems → chapter "Purpose of the knowledge bases" — [original (EN)](../../s01e03-building-knowledge-systems.md#purpose-of-the-knowledge-bases) · [Polish: „Cel baz wiedzy”](../../pl/s01e03-building-knowledge-systems.md#cel-baz-wiedzy)

**Principle.** Speech, video, PDFs or screenshots must first be translated into text. The
translator (Whisper, OCR, a parser) is a model too, and it makes mistakes.

**Why.** Transcription models guess the most likely word. They confuse homophones, drop
short phrases, and in silence they can add a word nobody said.

**Case.** S01E02: the answer was only in speech, while the terminal in the video showed
something else. Whisper `large-v3` dropped "Warnings / None logged", wrote "Knightly" for
"Nightly" and "cue" for "queue", and added a non-existent "memory." at the end.

**Apply.**

- A transcript is a draft, not a record.
- Shorter chunks give more accurate text (phrase by phrase instead of the whole file).
- A record checked word for word needs manual correction of known error classes:
  homophones, numbers (digits or words), hallucinations at the end of a recording.
- Word timestamps let you go back to an exact spot and transcribe it again.

---

← [P01](p01-compaction-is-lossy.md) · [chapter](README.md) · [all pills](../README.md) · [P03](p03-source-is-not-the-view.md) →
