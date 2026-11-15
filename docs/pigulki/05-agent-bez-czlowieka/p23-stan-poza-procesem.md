# P23 · Stan trzymaj tam, gdzie przetrwa restart, a źródło prawdy czytaj na żywo

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02

> **Lekcje:**
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)
> - S02E02 · Budowanie agenta → rozdział „Przepływy pracy i zadania długoterminowe” — [po polsku](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długoterminowe) · [oryginał EN: „Workflows and long-horizon tasks”](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks)

**Zasada.** Stan agenta ma żyć w systemie zewnętrznym, a nie w pamięci procesu. Stan
projektu czytaj ze źródła prawdy, a nie z kopii w pliku.

**Przypadek.**
- S02E02: stan w AgentMail (wątki i etykiety `replied`, `ignored`, `failed`), więc restart
  niczego nie gubi.
- S01E05: `plan.md` twierdził, że #12 jest wydane, a tracker pokazywał je jako otwarte.
  Pulse czyta tracker przy każdym pingu. Plan to nie tracker.

---

← [P22](p22-czat-to-nie-host.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P24](p24-petla-potrzebuje-wyjscia.md) →
