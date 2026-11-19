# P49 · Sprzeczne źródła nie wygrywają rangą: rozstrzyga właściciel, a do jego odpowiedzi budujesz tylko to, co pewne

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S03E01, S03E04

> **Lekcje:**
>
> - S03E01 · Mechanika inżynierii produktu → rozdział „Odpowiedzialność” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) · [oryginał EN: „Ownership”](../../s03e01-mechanics-behind-product-engineering.md#ownership)
> - S03E01 · Mechanika inżynierii produktu → rozdział „Osąd” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#osąd) · [oryginał EN: „Judgment”](../../s03e01-mechanics-behind-product-engineering.md#judgment)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „System diff” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#system-diff) · [oryginał EN: „System Diff”](../../s03e04-verifying-product-outcomes.md#system-diff)

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

S03E04 pokazało tę samą zasadę na błędzie, a nie na dwóch dokumentach. Dwa wymagania planu
tablicy incydentów, R1 (nowe incydenty na żywo na górze) i R4 (odświeżanie co 2 s), razem
przesuwały listę pod wskaźnikiem, a Ack trafiał w inny incydent. Każda uczciwa poprawka
zmieniała linię planu, więc harness niczego nie zmienił. Wysłał produktowi dowód (przepływ
`ack-incident`, moment 00:17, oczekiwany INC-6755, otrzymany INC-3647, `file:line`) i cztery
opcje z rekomendacją: pasek „N new” i cofnięcie acka. Produkt wybrał coś innego: „New incidents
stay live at the top and Ack stays on the row, but Ack asks to confirm, and the confirm names
the incident id.” Harness zbudował tylko to, a zmianę i jej powód wpisał do R2 w `plan.md`.
Kurs: „When the honest fix breaks a plan line, the plan is wrong too. That is the owner's call,
made from your evidence: flow, time, which row.” System diff z lekcji kończy się tak samo: agent
pokazuje odpowiedź i decyzje z rekomendowaną opcją, a decydujemy my.

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
- Gdy poprawka błędu zmienia wymaganie, to też sprzeczność: wyślij dowód i opcje, a zbuduj
  tylko opcję wybraną przez właściciela, nawet jeśli to nie twoja rekomendacja
  ([P57](../02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md)).
- Kto o czym decyduje, ustal z góry ([P33](p33-prawa-decyzyjne.md)).

---

← [P48](../02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P50](../02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) →
