# P49 · Sprzeczne źródła nie wygrywają rangą: rozstrzyga właściciel, a do jego odpowiedzi budujesz tylko to, co pewne

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S03E01

> **Lekcje:**
>
> - S03E01 · Mechanika inżynierii produktu → rozdział „Odpowiedzialność” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) · [oryginał EN: „Ownership”](../../s03e01-mechanics-behind-product-engineering.md#ownership)
> - S03E01 · Mechanika inżynierii produktu → rozdział „Osąd” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#osąd) · [oryginał EN: „Judgment”](../../s03e01-mechanics-behind-product-engineering.md#judgment)

**Zasada.** Gdy dwa źródła mówią co innego albo prawdziwe dane łamią wymaganie, agent nie
wybiera strony i nie uzupełnia braku. Zapisuje obie strony z miejscem w źródle, zadaje
właścicielowi jedno pytanie, które je nazywa, i buduje tylko z tego, co niesporne. Brak
odpowiedzi też jest wynikiem: pokazujesz dane takie, jakie są, bez wymyślonej wartości
i bez przesądzania za właściciela.

**Dlaczego.** Model ma odruch domykania zadania. Przy sprzeczności wybierze źródło, które
wygląda na ważniejsze (specyfikacja przed dopiskiem na zrzucie ekranu), a puste pole wypełni
wiarygodnie wyglądającą wartością. Ranga dokumentu nie mówi jednak, czego chce właściciel.
Lekcja umieszcza zakres, założenia i kompromisy na styku product managera i inżyniera
produktu, czyli tam, gdzie decyduje człowiek. Przypomina też, że ani bazowa wiedza modelu,
ani sam kod nie niosą kontekstu takich decyzji. Wymyślona wartość na publicznej stronie
wygląda jak fakt, a cofnięcie czegoś, co już trafiło do użytkowników, kosztuje ich zaufanie.

**Przypadek.** S03E01: sześć źródeł wymagań do jednej strony statusu. Trzy sprzeczności:

- R-L3K (PDF: w dacie najpierw dzień, 05/10) i R-X6H (zrzut ekranu: najpierw miesiąc,
  10/05),
- R-H9K (PDF: tylko ostatnia noc) i R-Z6M (zdjęcie tablicy: cały tydzień),
- R-X5K (PDF: „each incident names who ran it”) i rekord 4471 z feedu, którego autor to „—”.

Harness nie rozstrzygnął żadnej. Każda trafiła na listę z pytaniem, które nazywa obie strony,
np. „R-X5K says each incident names who ran it, but feed record 4471 (...) has author "—":
who ran 4471, and what should the page show for it until we know?”. Kurs przyjął listę przy
pierwszej próbie: „no guesses in it. one of them answered you.” Produkt odpowiedział tylko
o daty: „dates day first, 05/10, the way the night shift writes them. R-L3K holds, R-X6H
goes.” Na zakres i autora odpowiedzi nie było, więc strona pokazuje wszystkie rekordy feedu
tak, jak przyszły, i nie ma kolumny z autorem. Rook: „you built what was agreed. the rest went
back as questions.”

**Stosuj.**

- Każda sprzeczność to jeden wpis: tag, druga strona (tag albo id rekordu), pytanie do
  właściciela i miejsce w źródle. Każda strona pary dostaje własny wpis.
- Sprawdzaj wymagania na prawdziwych danych. Wymaganie, które dane łamią, to też
  sprzeczność, tyle że z rekordem.
- Do czasu odpowiedzi buduj tak, żeby żadna strona nie wygrała: pokaż dane, jak przyszły,
  pomiń pole, którego nie da się wypełnić prawdą. Tekst zastępczy udający dane to błąd
  ([P11](../02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md)).
- Odpowiedź właściciela zapisz z datą i źródłem. Rozstrzyga tylko to, o co pytano
  ([P14](../03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)).
- Kto o czym decyduje, ustal z góry ([P33](p33-prawa-decyzyjne.md)).

---

← [P48](../02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P50](../02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) →
