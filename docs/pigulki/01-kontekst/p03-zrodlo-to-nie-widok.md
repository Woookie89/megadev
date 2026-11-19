# P03 · Źródło to nie widok

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E03, S03E01

> **Lekcje:**
>
> - S01E03 · Tworzenie systemów wiedzy → rozdział „Poza Markdownem” — [po polsku](../../pl/s01e03-building-knowledge-systems.md#poza-markdownem) · [oryginał EN: „Beyond Markdown”](../../s01e03-building-knowledge-systems.md#beyond-markdown)
> - S01E03 · Tworzenie systemów wiedzy → rozdział „Pliki tekstowe i platformy chmurowe” — [po polsku](../../pl/s01e03-building-knowledge-systems.md#pliki-tekstowe-i-platformy-chmurowe) · [oryginał EN: „Text Files and Cloud Platforms”](../../s01e03-building-knowledge-systems.md#text-files-and-cloud-platforms)

**Zasada.** Surowy plik jest dla AI, a wyrenderowany widok jest dla człowieka i dla tego, kto
ocenia. Jeśli liczy się to, co ktoś zobaczy, wyrenderuj i patrz.

**Dlaczego.** W nowoczesnych bazach wiedzy (MDX, `.svx`) tekst i liczby są osobno: tekst
pisze człowiek, liczby liczy komponent z danych. Tekst się starzeje, a komponent nie.

**Przypadek.** S01E03: tekst strony #4471 mówił „jeden problem”, a tabela na wyrenderowanej
stronie pokazywała dwie przyczyny i przypis o trzeciej. Własna analiza dała `parser` = 374
i kurs ją odrzucił. Desk wsparcia z wyzwania liczy według swojego widoku, czyli 379. Debrief kursu: „Raw content
is for the AI, the rendered view is for you: render it and look.”

S03E01: jedno ze źródeł wymagań to bieżąca tablica „tram 3 board”, dostępna tylko na
stronie wyzwania po zalogowaniu. Tablica rysowała swój tekst, więc w jej kodzie nie było
czego przeczytać. Harness wyrenderował ją w Chromium, którym sterował przez Chrome DevTools
Protocol, zapisał zrzut i z niego odczytał wymaganie R-X2M: „read by tram 3 boards”.
Pytanie kursu „The board draws it”: dobrze od razu.

**Stosuj.**

- Bazę wiedzy z komponentami zbuduj i obejrzyj, zanim ją zacytujesz.
- Liczby, które ktoś będzie porównywał ze swoim widokiem, bierz z jego widoku.
  Rozbieżność opisz w nocie, nie „poprawiaj” jej po cichu.
- Strona, która rysuje treść (canvas, wykres, mapa), nie ma jej w HTML. Wyrenderuj ją
  w przeglądarce, zapisz zrzut z godziną i czytaj zrzut.

---

← [P02](p02-konwersja-do-tekstu-jest-stratna.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P04](p04-pobrany-plik-to-kopia-z-dnia.md) →
