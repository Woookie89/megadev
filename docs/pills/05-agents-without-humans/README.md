# 5. Agents without a human: host, loop, exits

From S01E05 on, agents answer on their own: to a webhook, to an email, in a loop. Nobody
sits at the chat to correct them. So everything a human would do by reflex (retry, ignore a
stranger, stop) has to be in code.

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P22](p22-chat-is-not-a-host.md) | A chat is not a host | S01E05, S02E02 |
| [P23](p23-state-outside-the-process.md) | Keep state where it survives a restart; read the source of truth live | S01E05, S02E02, S02E03 |
| [P24](p24-a-loop-needs-an-exit.md) | A loop needs an exit: a condition, a limit and visible state | S02E01 |
| [P25](p25-providers-fail.md) | Model providers fail, so design for it | S01E05, S02E02 |
| [P26](p26-timing-is-behavior.md) | Timing is part of behavior | S02E02 |
| [P27](p27-agent-sees-its-logs.md) | The agent must see its own logs | S01E05, S02E03 |
| [P45](p45-remote-worker-way-there-and-back.md) | A remote worker: plan the way there and the way home | S02E04 |

---

[← all pills](../README.md)
