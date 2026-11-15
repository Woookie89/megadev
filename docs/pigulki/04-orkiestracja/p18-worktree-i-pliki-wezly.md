# P18 · Każdy worker w swoim worktree, a konflikty zbiegają się w plikach-węzłach

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04

**Zasada.** Równoległe zapisy wymagają osobnych checkoutów. Konflikty i tak pojawią się
w plikach, które wszyscy muszą dotknąć (router, index, config).

**Przypadek.** S01E04: merge #3 i #4 zatrzymał się na konflikcie w tym samym pliku aplikacji
(rejestracja tras). Harness scalił go ręcznie, a przed pushem uruchomił typecheck i 25
testów. MEGA Assessment (T19): równoległe sesje kursowe dzieliły jedno drzewo robocze, więc
nieśledzone pliki z kilku wątków mieszały się. Widać to w `git status`, gdzie leżą jeszcze
`s01e04/wt-3`…`wt-7`.

**Stosuj.**
- Pliki-węzły przypisz jednemu workerowi albo zaplanuj ich scalenie.
- Po każdym merge'u uruchom testy.
- Po zakończeniu sprzątnij worktrees (`git worktree remove`).

---

← [P17](p17-kontrakt-przed-rownolegloscia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P19](p19-dobor-modelu-i-koszt.md) →
