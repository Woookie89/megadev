# P14 · Jedna decyzja to jeden wiersz, a późniejsza nadpisuje tylko swój zakres

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S02E01, S03E02

> **Lekcje:**
>
> - S01E03 · Tworzenie systemów wiedzy → rozdział „Szerszy kontekst” — [po polsku](../../pl/s01e03-building-knowledge-systems.md#szerszy-kontekst) · [oryginał EN: „Broader context”](../../s01e03-building-knowledge-systems.md#broader-context)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)

**Zasada.** Plan zapisuj jako tabelę: obszar, decyzja, źródło (sesja i czas). Nowa decyzja
zastępuje tylko to, czego dotyczy.

**Dlaczego.** Wiersz, który łączy kilka decyzji, ukrywa to, czego brakuje. Nadpisanie całego
planu przy każdej zmianie gubi decyzje, których nikt nie zmieniał.

**Przypadek.** S02E01: pierwszy plan łączył obraz, port i dialekt w jednym wierszu. Kurs:
„Your plan doesn't say which image version.” Później zespół ops zmienił magazyn (Postgres
zamiast SQLite), ale Drizzle i schemat zespołu A zostały w mocy. S01E03: ADR-y „supersede,
not overwrite”.

S03E02: w triage'u zgłoszenia przychodziły dalej, gdy tracker był już oznaczony. IN-5342 od
zespołu produktu („forget the 'class' rename from earlier this week”) wycofał wcześniejszą
prośbę IN-9280, oznaczoną już `agent-ready`. Harness nie skasował IN-9280, tylko zamknął je
jako `obsolete` z oboma id w `sources`. Mail klienta IN-4203 („Please do not flip them”)
nie unieważnił prośby IN-1210 o daty dd/mm, tylko zmienił jej status: z poprawki w pytanie do
człowieka z oboma id. Każda późniejsza prośba zmieniła tylko to, czego dotyczyła. Kurs:
„Triage is a process, not a one-off sort: later requests update or cancel earlier ones.”
([P52](../05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md)).

**Stosuj.** Przy konflikcie źródeł pytaj: „czego dokładnie dotyczy późniejsza decyzja?”.
Szablon w [Dodatku A4](../szablony/tabela-decyzji.md).

---

← [P13](p13-keep-ustalenie-ze-zrodlem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P15](p15-pytaj-przeszle-sesje.md) →
