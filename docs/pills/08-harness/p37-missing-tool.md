# P37 · A missing tool: build a bridge, then make it permanent

> Chapter [8. The harness as a toolkit](README.md) · episodes: S01E03

> **Lessons:**
>
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)
> - S02E03 · Agentic Capabilities → chapter "Skills & Tools" — [original (EN)](../../s02e03-agentic-capabilities.md#skills--tools) · [Polish: „Skille i narzędzia”](../../pl/s02e03-agentic-capabilities.md#skille-i-narzędzia)

**Principle.** When the harness lacks a tool, build a workaround from what is on the
machine. Then replace it with a permanent tool, and write down the environment's traps.

**Case.**

- S01E03: no browser. The harness started the installed Chromium with a debug port and
  drove it through puppeteer-core, and the human signed in in that window. Permanent
  option: Playwright MCP.
- S01E02: ffmpeg and faster-whisper. Traps: PyAV did not work with the library, and ffmpeg
  called from a script hung without `-nostdin`.

**Apply.** Put environment traps in the "Can run" section of KEEP, so the next session does
not rediscover them.

---

← [P36](../07-human-in-the-loop/p36-show-the-plan-first.md) · [chapter](README.md) · [all pills](../README.md) · [P38](p38-skill-is-a-routine.md) →
