# P10 · Sprawdź wynik z zewnątrz, tak jak zobaczy go odbiorca

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E02, S02E03

> **Lekcje:**
> - S02E05 · Niezawodność agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s02e05-agent-reliability.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s02e05-agent-reliability.md#evaluation)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Jakość” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#jakość) · [oryginał EN: „Quality”](../../s01e05-building-workflows-not-tool-stacks.md#quality)

**Zasada.** Zanim oddasz coś odbiorcy z limitem prób, zrób test dymny (smoke test) z jego perspektywy.

**Przypadek.**
- S01E04: harness pobrał publiczny link przez HTTPS i potwierdził tytuł i znacznik pasa
  (`LANE_MARKER`).
- S01E05: podpisany selfcheck hosta testował oba modele, nie zużywając pytań recenzenta.
- S02E02: tryb `node agent.mjs --dry "<treść maila>"` albo jeden mail testowy przed podaniem
  adresu kursowi wykryłby odmowę modelu i blokadę czytnika stron przed pierwszą rundą.
- S02E03: po odmowie za rozmiar wyniku harness pobrał klip kalibracyjny kursu i zmierzył
  poprawkę lokalnie (822 B przy limicie 1024 B), zanim zrobił deploy. Druga runda przeszła.
  Wcześniej przeszedł całą ścieżkę OAuth na wdrożonym, publicznym adresie skryptem udającym
  obcego klienta.

**Stosuj.** Każdy agent i serwis dostaje tryb próbny (`--dry`, `selfcheck`), który przechodzi
całą ścieżkę bez skutków ubocznych.

---

← [P09](p09-wyslane-to-nie-potwierdzone.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P11](p11-pusta-odpowiedz-to-blad.md) →
