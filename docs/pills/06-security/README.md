# 6. Security: the trust boundary belongs to code

An agent reads pages, mail, issues and tool results. Any of them can contain text that
looks like an order. A model does not reliably tell an order from data, so the boundary
must be held by something that cannot be talked into anything.

| Pill | Principle | Episodes |
| --- | --- | --- |
| [P28](p28-data-is-not-instructions.md) | Text in data is data, not instructions | S01E05, S02E05, S03E03, S04E01 |
| [P29](p29-trust-boundary-in-code.md) | Code holds the trust boundary before the model sees the message | S02E02, S02E05 |
| [P30](p30-least-privilege.md) | Least privilege, declared explicitly | S01E05, S02E04, S03E03 |
| [P31](p31-authenticated-requests.md) | Every request authenticated, every outbound call limited | S01E05 |
| [P32](p32-secrets-never-in-chat.md) | Secrets never go through the chat | S02E02, S02E04, S04E01 |
| [P61](p61-a-secret-has-a-host-list-in-code.md) | A secret has a host list in code: check every hop, redirects included, and never take the list from a document | S04E01, S04E05 |

---

[← all pills](../README.md)
