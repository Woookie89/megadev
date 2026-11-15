# P03 · The source is not the view

> Chapter [1. Context: the model knows only what reaches it](README.md) · episodes: S01E03

> **Lessons:**
> - S01E03 · Building Knowledge Systems → chapter "Beyond Markdown" — [original (EN)](../../s01e03-building-knowledge-systems.md#beyond-markdown) · [Polish: „Poza Markdownem”](../../pl/s01e03-building-knowledge-systems.md#poza-markdownem)
> - S01E03 · Building Knowledge Systems → chapter "Text Files and Cloud Platforms" — [original (EN)](../../s01e03-building-knowledge-systems.md#text-files-and-cloud-platforms) · [Polish: „Pliki tekstowe i platformy chmurowe”](../../pl/s01e03-building-knowledge-systems.md#pliki-tekstowe-i-platformy-chmurowe)

**Principle.** The raw file is for the AI; the rendered view is for the human and for
whoever judges the work. If what someone will see is what counts, render it and look.

**Why.** In modern knowledge bases (MDX, `.svx`) prose and numbers are separate: a person
writes the prose, a component computes the numbers from data. Prose goes stale; the
component does not.

**Case.** S01E03: the prose of the #4471 page said "one problem", while the table on the
rendered page showed two causes and a footnote about a third. Our own analysis gave
`parser` = 374, and the course refused it. The desk counts by its own view: 379. Course
debrief: "Raw content is for the AI, the rendered view is for you: render it and look."

**Apply.**
- Build and look at a knowledge base with components before you quote it.
- Take numbers that someone will compare against their view from that view. Explain a
  mismatch in a note instead of quietly "fixing" it.

---

← [P02](p02-conversion-to-text-is-lossy.md) · [chapter](README.md) · [all pills](../README.md) · [P04](p04-a-download-is-a-dated-copy.md) →
