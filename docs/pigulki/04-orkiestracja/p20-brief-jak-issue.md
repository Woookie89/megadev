# P20 · Brief dla workera jest jak dobre issue

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04

**Zasada.** Worker nie dziedziczy rozmowy. Brief musi zawierać wszystko, czego worker nie
widzi: źródło, zakres, „gotowe, gdy”, blokady i warunki stopu.

**Przypadek.** S01E04, kształt issue: `Source: plan.md § <n>`, `Scope`, `Done when`,
`Blocked by`, `Suggested worker`. Komentarz zamykający: `done: …` / `worker: <harness> ·
<model> · <effort>` / `commit: <sha>`. Dzięki temu śladowi agent od #7 zauważył, że w
komentarzu do #4 wpisano zły model (`haiku-4.5` zamiast `haiku-5.5`). Workery mogą
sprawdzać się nawzajem, jeśli zostawiają ślad.

**Stosuj.** Szablon w [Dodatku A3](../szablony/brief-workera.md).

---

← [P19](p19-dobor-modelu-i-koszt.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P21](p21-deleguj-research.md) →
