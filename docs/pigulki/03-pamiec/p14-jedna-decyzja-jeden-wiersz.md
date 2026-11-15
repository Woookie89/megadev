# P14 · Jedna decyzja to jeden wiersz, a późniejsza nadpisuje tylko swój zakres

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S02E01

**Zasada.** Plan zapisuj jako tabelę: obszar, decyzja, źródło (sesja i czas). Nowa decyzja
zastępuje tylko to, czego dotyczy.

**Dlaczego.** Wiersz, który łączy kilka decyzji, ukrywa to, czego brakuje. Nadpisanie całego
planu przy każdej zmianie gubi decyzje, których nikt nie zmieniał.

**Przypadek.** S02E01: pierwszy plan łączył obraz, port i dialekt w jednym wierszu. Kurs:
„Your plan doesn't say which image version.” Później zespół ops zmienił magazyn (Postgres
zamiast SQLite), ale Drizzle i schemat zespołu A zostały w mocy. S01E03: ADR-y „supersede,
not overwrite”.

**Stosuj.** Przy konflikcie źródeł pytaj: „czego dokładnie dotyczy późniejsza decyzja?”.
Szablon w [Dodatku A4](../szablony/tabela-decyzji.md).

---

← [P13](p13-keep-ustalenie-ze-zrodlem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P15](p15-pytaj-przeszle-sesje.md) →
