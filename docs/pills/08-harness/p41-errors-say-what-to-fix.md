# P41 · A tool error tells the model what to fix

> Chapter [8. The harness as a toolkit](README.md) · episodes: S02E03

> **Lessons:**
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)
> - S02E03 · Agentic Capabilities → chapter "Designing a custom MCP" — [original (EN)](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp) · [Polish: „Projektowanie własnego MCP”](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp)

**Principle.** A wrong call returns a result with `isError: true` and one sentence for the
model. The sentence names the bad value, says what is wrong with it and what to send
instead. No exception, no stack trace and no protocol error.

**Why.** The model fixes its next call only from what it reads in the error. "Not a supported
audio file" says something is wrong, but not which argument or what to do. So the model
guesses again or gives up. An exception or a JSON-RPC error often never reaches the model at
all, because the harness shows it to the user.

**Case.** S02E03: the course called `transcribe` with a login page and with a missing file.
Its verdict: "the tool error does not name the url; a helpful one names it and says what is
wrong with it". After the fix:

- "https://hq.mega.dev/login is not a supported audio file (type "text/html"). Use wav, mp3,
  m4a, ogg, webm, flac or aac."
- "Could not download the audio at https://hq.mega.dev/media/s02e03/missing.mp3: download
  answered HTTP 404."

**Apply.**

- Every known error has a row in the contract's errors table: the field, what is wrong, what
  to send next.
- Validate input inside the tool and return the failure as an `isError` result, not as a
  protocol error.
- When no field is wrong (a timeout, a busy provider), say so, and say when to send the same
  call again.
- Test the wrong inputs: a page instead of a file, a 404, a bad url scheme, an empty file.

---

← [P40](p40-results-have-a-budget.md) · [chapter](README.md) · [all pills](../README.md) · [P42](p42-big-bytes-beside-the-model.md) →
