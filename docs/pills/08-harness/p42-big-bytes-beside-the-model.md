# P42 · Big bytes travel beside the model, not through it

> Chapter [8. The harness as a toolkit](README.md) · episodes: S02E03

> **Lessons:**
> - S01E02 · Steering Models Through Context → chapter "Tool use under the hood" — [original (EN)](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood) · [Polish: „Narzędzia od podszewki”](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki)
> - S02E03 · Agentic Capabilities → chapter "Model Context Protocol" — [original (EN)](../../s02e03-agentic-capabilities.md#model-context-protocol) · [Polish: „Model Context Protocol”](../../pl/s02e03-agentic-capabilities.md#model-context-protocol)

**Principle.** Files, audio, images and long logs never travel in arguments or results as text
or base64. The tool takes a URL it fetches itself, or a path on the machine that has the
file. A big output goes to a file or a URL. The model gets the address, the size and the
first line.

**Why.** The model must generate everything in the arguments token by token, and everything
in the result lands in its context. An 8 MB file is about 11 MB of base64 text. The model
cannot copy that without errors and cannot fit it in context. A URL or a path costs a few
dozen bytes, and the bytes move between machines without the model.

**Case.** S02E03: the course asked for an 8.5 MB log, `2026-10-05.log`, to go up through the
`upload` tool. The harness sent it with a script straight to the MCP endpoint, so the base64
never passed through the model. The model saw a few first lines and the returned link with
its size, and the bytes served from the link matched the local file. The `upload` contract
still takes `content_base64`. By rule 4 of the `hands` skill that is a design flaw, which
worked only because a script sent the file. `transcribe` took a URL from the start.

**Apply.**

- No input field holds file contents. Ask: "where does the input live, and can the tool reach
  it there?".
- Upload to a remote server: a separate HTTP route for the bytes (PUT or a signed URL), and
  the tool takes and returns only the address.
- A URL from the model: `http` and `https` only, no local or private addresses, with a size
  and time limit ([P31](../06-security/p31-authenticated-requests.md)).
- When you must move bytes in this session anyway, do it with a script, not through the
  model.

---

← [P41](p41-errors-say-what-to-fix.md) · [chapter](README.md) · [all pills](../README.md) · [P43](../04-orchestration/p43-skill-travels-with-the-job.md) →
