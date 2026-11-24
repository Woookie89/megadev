# P23 · Keep state where it survives a restart; read the source of truth live

> Chapter [5. Agents without a human: host, loop, exits](README.md) · episodes: S01E05, S02E02, S02E03, S02E05, S04E04

> **Lessons:**
>
> - S02E01 · Agentic Primitives → chapter "Agentic Loop" — [original (EN)](../../s02e01-agentic-primitives.md#agentic-loop) · [Polish: „Pętla agenta”](../../pl/s02e01-agentic-primitives.md#pętla-agenta)
> - S02E02 · Building an Agent → chapter "Workflows and long-horizon tasks" — [original (EN)](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks) · [Polish: „Przepływy pracy i zadania długookresowe”](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe)
> - S04E01 · Mechanics Behind Autonomous Systems → chapter "State" — [original (EN)](../../s04e01-mechanics-behind-autonomous-systems.md#state) · [Polish: „{{pl-state-title}}”](../../pl/s04e01-mechanics-behind-autonomous-systems.md#{{pl-state-anchor}})

**Principle.** Agent state lives in an outside system, not in process memory. Project state
is read from the source of truth, not from a copy in a file.

**Case.**

- S02E02: state in AgentMail (threads and the labels `replied`, `ignored`, `failed`), so a
  restart loses nothing.
- S01E05: `plan.md` claimed #12 had shipped, while the tracker showed it open. Pulse reads
  the tracker on every ping. A plan is not a tracker.
- S02E03: Render's free web service has no disk and sleeps after 15 minutes. Postgres holds
  the notes, files and OAuth tokens, so they survived a deploy, a night and a cold start. The
  course came back hours later and found its data.
- S02E05: the agent kept held acts and reply addresses (`replyUrl`) only in process memory.
  An env var change on Render started a deploy on its own, and the restart wiped the first
  held ask. Deploying a fix inside the try window lost the reply address of the held
  `rotate_key`. The fix was operational: `replyUrl` in the event log, no deploys inside the
  window, the new signing key only in the running process, with no env var change. The state
  itself still lives in memory. The course: "Never redeploy inside the window, because held
  asks live in memory." See also [P26](p26-timing-is-behavior.md).
- S04E04: the night desk poller kept its state on disk (`night/state.json`: results by event id,
  the first body of every id, the seqs handled, the cursor), so a restart went on from the same
  state. On night 2, at 21:48:13Z, the poller died right after acking a guest message: `EPERM` on
  `renameSync` from `state.json.tmp` to `state.json`, because Windows locked the file. The state
  save itself killed a long-running process. The fix (commit `67d9dc6`): on an error the save falls
  back to a direct write and never throws. Restart at 21:48:38Z, and the open message got its result
  at 21:48:43Z, about 33 s after it was sent. HQ: "Without you — partly. State on disk let the
  poller restart after a crash on night two and answer the open message in 33 s; it still runs
  inside this chat session." The state survived the restart, but the process still lived in the
  chat ([P22](p22-chat-is-not-a-host.md)). A state save in an unwatched loop must not throw, and an
  event handled only halfway must stay in the state as not handled
  ([P69](p69-handle-each-event-once.md)).

---

← [P22](p22-chat-is-not-a-host.md) · [chapter](README.md) · [all pills](../README.md) · [P24](p24-a-loop-needs-an-exit.md) →
