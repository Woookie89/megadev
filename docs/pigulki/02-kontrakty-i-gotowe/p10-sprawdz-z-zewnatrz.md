# P10 · Sprawdź wynik z zewnątrz, tak jak zobaczy go odbiorca

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E02

**Zasada.** Zanim oddasz coś odbiorcy z limitem prób, zrób test dymny z jego perspektywy.

**Przypadek.**
- S01E04: harness pobrał publiczny link przez HTTPS i potwierdził tytuł i marker.
- S01E05: podpisany selfcheck hosta testował oba modele, nie zużywając pytań recenzenta.
- S02E02: tryb `node agent.mjs --dry "<treść maila>"` albo jeden mail testowy przed podaniem
  adresu kursowi wykryłby odmowę modelu i blokadę czytnika przed pierwszą rundą.

**Stosuj.** Każdy agent i serwis dostaje tryb próbny (`--dry`, `selfcheck`), który przechodzi
całą ścieżkę bez skutków ubocznych.

---

← [P09](p09-wyslane-to-nie-potwierdzone.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P11](p11-pusta-odpowiedz-to-blad.md) →
