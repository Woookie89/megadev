# P22 · Czat to nie host

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02

> **Lekcje:**
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Dostęp zdalny” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny) · [oryginał EN: „Getting remote”](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote)
> - S02E02 · Budowanie agenta → rozdział „Przepływy pracy i zadania długoterminowe” — [po polsku](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długoterminowe) · [oryginał EN: „Workflows and long-horizon tasks”](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks)

**Zasada.** Agent, który ma odpowiadać sam, musi działać jako serwis, niezależnie od sesji
harnessu.

**Przypadek.**
- S01E05: webhook na Renderze odpowiada 202 od razu, pracę robi w tle, a powtórzony ping
  z tym samym id pomija (idempotencja).
- S02E02 (otwarte): agent poczty działa jako proces `node` uruchomiony z sesji Claude Code
  i kończy się razem z nią.

---

← [P21](../04-orkiestracja/p21-deleguj-research.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P23](p23-stan-poza-procesem.md) →
