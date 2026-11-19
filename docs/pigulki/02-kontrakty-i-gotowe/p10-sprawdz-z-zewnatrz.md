# P10 · Sprawdź wynik z zewnątrz, tak jak zobaczy go odbiorca

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E02, S02E03, S03E01, S03E03

> **Lekcje:**
>
> - S02E05 · Niezawodność agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s02e05-agent-reliability.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s02e05-agent-reliability.md#evaluation)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Jakość” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#jakość) · [oryginał EN: „Quality”](../../s01e05-building-workflows-not-tool-stacks.md#quality)
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Informacja zwrotna” — [po polsku](../../pl/s03e03-ai-native-product-development.md#informacja-zwrotna) · [oryginał EN: „Feedback”](../../s03e03-ai-native-product-development.md#feedback)

**Zasada.** Zanim oddasz coś odbiorcy z limitem prób, zrób test dymny (smoke test) z jego perspektywy.

**Przypadek.**

- S01E04: harness pobrał publiczny link przez HTTPS i potwierdził tytuł i znacznik lane, czyli toru
  (`LANE_MARKER`).
- S01E05: podpisany selfcheck hosta testował oba modele, nie zużywając pytań recenzenta.
- S02E02: tryb `node agent.mjs --dry "<treść maila>"` albo jeden mail testowy przed podaniem
  adresu kursowi wykryłby odmowę modelu i blokadę czytnika stron przed pierwszą rundą.
- S02E03: po odmowie za rozmiar wyniku harness pobrał klip kalibracyjny kursu i zmierzył
  poprawkę lokalnie (822 B przy limicie 1024 B), zanim zrobił deploy. Druga runda przeszła.
  Wcześniej przeszedł całą ścieżkę OAuth na wdrożonym, publicznym adresie skryptem udającym
  obcego klienta.
- S03E01: ten sam `test.mjs` (15 sprawdzeń, po jednym na wymaganie) działał lokalnie i na
  wdrożonym adresie z prawdziwym feedem. Claim poszedł dopiero po 15/15 z zewnątrz, po
  odczekaniu ok. 2,5 minuty na certyfikat TLS nowej subdomeny
  ([P50](p50-wymaganie-ma-adres-i-test.md)).
- S03E03: agent sam wdrażał issues na Cloudflare Workers. Jego narzędzie `deploy` uruchamiało
  testy, commitowało, wdrażało i od razu czytało `/incidents` na żywo, a skill zabraniał
  `live: ✓` z lokalnego testu. Każda linia `shipped · live: ✓` powstała dopiero po odczycie
  nowego zachowania z adresu (np. `/incidents/INC-0000` → 404). W próbie na makiecie deploy był
  na sucho, więc agent napisał `waiting · live: ✗`. Filtry `?status=` (#4) i `?since=` (#5)
  trafiły do jednego handlera. Każde wdrożenie sprawdzało na żywo swój filtr, a test sprawdzał
  oba razem. Adres feedu musiał trafić do `[env.production.vars]`, bo środowisko produkcyjne nie
  dziedziczy zmiennych z poziomu głównego. Kurs: „Merged is not deployed, and deployed is not
  live: a smoke on the live address after each deploy shows it, and a ship log written before
  the deploy can't know.” oraz „Two changes on one handler: one can undo or block the other.
  Only the live answer says.”

**Stosuj.** Każdy agent i serwis dostaje tryb próbny (`--dry`, `selfcheck`), który przechodzi
całą ścieżkę bez skutków ubocznych. Agent, który sam wdraża, ma krok „wdróż” zakończony
odczytem z adresu na żywo, a wpis w dzienniku pisze dopiero po nim.

---

← [P09](p09-wyslane-to-nie-potwierdzone.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P11](p11-pusta-odpowiedz-to-blad.md) →
