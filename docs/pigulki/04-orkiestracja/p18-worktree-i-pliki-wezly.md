# P18 · Każdy worker w swoim worktree, a konflikty zbiegają się w plikach-węzłach

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04

> **Lekcje:**
> - S01E04 · Praca z harnessami AI → rozdział „Harnessy” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#harnessy) · [oryginał EN: „Harnesses”](../../s01e04-working-with-ai-harnesses.md#harnesses)
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)

**Zasada.** Równoległe zapisy wymagają osobnych checkoutów. Konflikty i tak pojawią się
w plikach, które wszyscy muszą dotknąć (router, index, config).

**Przypadek.** S01E04: merge #3 i #4 zatrzymał się na konflikcie w tym samym pliku aplikacji
(rejestracja tras). Harness scalił go ręcznie, a przed pushem uruchomił typecheck i 25
testów. MEGA Assessment (T19): równoległe sesje kursowe dzieliły jedno drzewo robocze, więc
nieśledzone pliki z kilku wątków mieszały się. Worktrees `s01e04/wt-3`…`wt-7` leżały
w repo jeszcze tydzień po scaleniu, aż do sprzątania 15.11.2026.

**Stosuj.**
- Pliki-węzły przypisz jednemu workerowi albo zaplanuj ich scalenie.
- Po każdym merge'u uruchom testy.
- Po zakończeniu sprzątnij worktrees (`git worktree remove`).

---

← [P17](p17-kontrakt-przed-rownolegloscia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P19](p19-dobor-modelu-i-koszt.md) →
