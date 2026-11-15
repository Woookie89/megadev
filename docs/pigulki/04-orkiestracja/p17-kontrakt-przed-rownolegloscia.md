# P17 · Najpierw kontrakt po kolei, potem równoległość

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04

**Zasada.** Wspólne fundamenty (typy, interfejsy, format danych) zrób najpierw, po kolei,
najmocniejszym modelem. Dopiero potem rozdziel resztę na równoległe workery.

**Dlaczego.** Workery równoległe nie rozmawiają ze sobą. Wspólny kontrakt to jedyna rzecz,
która je synchronizuje. Bez niego każdy wymyśli swój.

**Przypadek.** S01E04: #1 (typy) i #2 (czytnik logu) w głównej sesji, potem #3, #4, #5 i #7
na podagentach Sonnet i Haiku, każdy w osobnym worktree.

---

← [P16](../03-pamiec/p16-drabina-trwalosci.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P18](p18-worktree-i-pliki-wezly.md) →
