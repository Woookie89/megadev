# P03 · Źródło to nie widok

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E03

**Zasada.** Surowy plik jest dla AI, a wyrenderowany widok jest dla człowieka i dla tego, kto
ocenia. Jeśli liczy się to, co ktoś zobaczy, wyrenderuj i patrz.

**Dlaczego.** W nowoczesnych bazach wiedzy (MDX, `.svx`) tekst i liczby są osobno: tekst
pisze człowiek, liczby liczy komponent z danych. Tekst się starzeje, a komponent nie.

**Przypadek.** S01E03: tekst strony #4471 mówił „jeden problem”, a tabela na zrenderowanej
stronie pokazywała dwie przyczyny i przypis o trzeciej. Własna analiza dała `parser` = 374
i kurs ją odrzucił. Desk liczy według swojego widoku, czyli 379. Debrief kursu: „Raw content
is for the AI, the rendered view is for you: render it and look.”

**Stosuj.**
- Bazę wiedzy z komponentami zbuduj i obejrzyj, zanim ją zacytujesz.
- Liczby, które ktoś będzie porównywał ze swoim widokiem, bierz z jego widoku.
  Rozbieżność opisz w nocie, nie „poprawiaj” jej po cichu.

---

← [P02](p02-konwersja-do-tekstu-jest-stratna.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P04](p04-pobrany-plik-to-kopia-z-dnia.md) →
