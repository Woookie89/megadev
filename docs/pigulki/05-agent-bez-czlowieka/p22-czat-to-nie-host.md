# P22 · Czat to nie host

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02

**Zasada.** Agent, który ma odpowiadać sam, musi działać jako serwis, niezależnie od sesji
harnessu.

**Przypadek.**
- S01E05: webhook na Renderze odpowiada 202 od razu, pracę robi w tle, a powtórzony ping
  z tym samym id pomija (idempotencja).
- S02E02 (otwarte): agent poczty działa jako proces `node` uruchomiony z sesji Claude Code
  i kończy się razem z nią.

---

← [P21](../04-orkiestracja/p21-deleguj-research.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P23](p23-stan-poza-procesem.md) →
