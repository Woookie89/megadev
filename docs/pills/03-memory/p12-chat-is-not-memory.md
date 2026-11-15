# P12 · Chat is not memory: write handovers to a file

> Chapter [3. Memory outside the chat](README.md) · episodes: S01E01, S01E02

> **Lessons:**
> - S01E02 · Steering Models Through Context → chapter "How does the context work?" — [original (EN)](../../s01e02-steering-models-through-context.md#how-does-the-context-work) · [Polish: „Jak działa kontekst?”](../../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst)
> - S02E01 · Agentic Primitives → chapter "Context and Memory" — [original (EN)](../../s02e01-agentic-primitives.md#context-and-memory) · [Polish: „Kontekst i pamięć”](../../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć)

**Principle.** When work moves to a new session, leave a handover file: state, what is done
(with sources), what is left, traps, expiry dates, ready-to-run commands and a prompt to
paste.

**Why.** A new session starts from zero. Without a file it either guesses or re-derives
what was settled, often walking down dead ends that were already ruled out.

**Case.**
- S01E02, `HANDOFF.md`: a transcription process left running in the background, with how
  to tell whether it finished and what to do if not; the list of known Whisper errors; the
  expiry dates of the ticket and receipts.
- S01E04, `HANDOVER.md` + `KEEP.md`: the work was finished in a new session two days later.
- MEGA Assessment (T12, T24): conclusions from long debugging stayed only in the chat, so
  the next attempt had to work everything out again.

**Apply.** Template in [Appendix A1](../templates/handoff.md). End the day with a file, not a message.

---

← [P11](../02-contracts-and-done/p11-empty-answer-is-an-error.md) · [chapter](README.md) · [all pills](../README.md) · [P13](p13-keep-finding-with-source.md) →
