# P30 · Najmniejsze uprawnienia, zadeklarowane jawnie

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S01E05

**Zasada.** Agent dostaje tylko te prawa, których potrzebuje. Nawet gdy model da się
przekonać, nie ma czym wykonać szkody.

**Przypadek.** S01E05: `/.well-known/mega-pulse.json` dawał pulse tylko `answer`, a test
writerowi tylko `test`. Przykład z kursu dawał też `comment`, `label` i `close`. Gdyby model
posłuchał issue #14, i tak nie mógłby zamknąć #12.

**Stosuj.** Obrona w głąb: filtr wejścia ([P29](p29-granica-zaufania-w-kodzie.md)) i wąskie narzędzia (P30) naraz.

---

← [P29](p29-granica-zaufania-w-kodzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P31](p31-uwierzytelnione-zadania.md) →
