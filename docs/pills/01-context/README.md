# 1. Context: the model knows only what reaches it

A model has no access to the world. It has only its context window: the text (and images)
the harness put into it. Anything not there does not exist for the model. Anything there
that is stale or distorted, the model takes as true.

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P01](p01-compaction-is-lossy.md) | Compaction is lossy, and you decide what gets lost | S01E01 |
| [P02](p02-conversion-to-text-is-lossy.md) | Context is text, and every conversion to text is lossy | S01E02, S03E01 |
| [P03](p03-source-is-not-the-view.md) | The source is not the view | S01E03, S03E01 |
| [P04](p04-a-download-is-a-dated-copy.md) | A download is a dated copy | S01E03, S02E01 |
| [P05](p05-check-changing-facts-at-source.md) | Check changing facts at the source, not in the model's memory | S01E01, S02E03, S04E02 |
| [P54](p54-the-agent-decides-from-what-it-is-given.md) | An agent decides only from what it is given: put every rule source in its context from the first turn | S03E03, S04E02, S04E03 |
| [P64](p64-a-role-keeps-where-to-read-a-fact-not-the-fact.md) | A role keeps where to read a fact, not the fact: read settings, prices and limits from their source at every start | S04E02 |

---

[← all pills](../README.md)
