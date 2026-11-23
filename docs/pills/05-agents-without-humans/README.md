# 5. Agents without a human: host, loop, exits

From S01E05 on, agents answer on their own: to a webhook, to an email, in a loop. Nobody
sits at the chat to correct them. So everything a human would do by reflex (retry, ignore a
stranger, stop) has to be in code.

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P22](p22-chat-is-not-a-host.md) | A chat is not a host | S01E05, S02E02, S02E05 |
| [P23](p23-state-outside-the-process.md) | Keep state where it survives a restart; read the source of truth live | S01E05, S02E02, S02E03, S02E05 |
| [P24](p24-a-loop-needs-an-exit.md) | A loop needs an exit: a condition, a limit and visible state | S02E01 |
| [P25](p25-providers-fail.md) | Model providers fail, so design for it | S01E05, S02E02, S04E01 |
| [P26](p26-timing-is-behavior.md) | Timing is part of behavior | S02E02 |
| [P27](p27-agent-sees-its-logs.md) | The agent must see its own logs | S01E05, S02E03, S02E05, S03E03, S04E01 |
| [P45](p45-remote-worker-way-there-and-back.md) | A remote worker: plan the way there and the way home | S02E04 |
| [P46](p46-test-the-route-from-the-agents-host.md) | Test the route to the human from where the agent runs | S02E05 |
| [P52](p52-rebuild-on-every-arrival.md) | A source that keeps filling: rebuild the result on every arrival, and let quiet, not a clock, say when you are done | S03E02 |
| [P62](p62-a-time-limit-is-counted-in-model-turns.md) | A time limit is counted in model turns: one script does the routine batch, and the model only starts it | S04E01 |

---

[← all pills](../README.md)
