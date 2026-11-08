# S01E01 · Somebody Slow — zapis przebiegu

Ten wpis łączy temat lekcji S01E01 z praktycznym wyzwaniem „somebody slow”. Szerszy opis lekcji znajduje się w [notatkach o mechanice generatywnej AI](s01e01-mechanics-behind-generative-ai.md).

## Temat lekcji

Lekcja omawia przewidywanie kolejnych tokenów, niedeterministyczność i ograniczenia modeli, a także okna kontekstu, narzędzia oraz zachowanie uprzęży. Wyzwanie pokazało praktyczny skutek kompakcji kontekstu: skrócenie tekstu zachowuje część informacji, ale inne może bezpowrotnie usunąć.

## Zadanie i wynik

Harness miał wysłać wiadomość Rooka przez pole o limicie 700 znaków, zachować dokładnie akapit o 26. i odpowiedzieć na pytanie w formularzu. Pełna treść miała 1288 znaków.

Podgląd załącznika nie pokazywał schematu żądania, ale źródło zalogowanej strony zawierało link do `https://hq.mega.dev/challenges/where-the-story-begins/api/schema.json`. Schemat wskazał pola `from` i `compactedMessage` oraz limit 700 znaków. Pierwsze żądanie miało poprawny format, lecz zostało odrzucone z powodu długości. Po policzeniu akapitów harness wysłał 622 znaki z akapitem o 26. zachowanym bez zmian; kurs zaakceptował wiadomość.

Formularz pytał o flagowy model GPT. Odpowiedź `GPT-6 Astra` została zaakceptowana za pierwszym razem. Pochodziła z wcześniejszego zaakceptowanego debriefu na stronie wyzwania, a nie z bieżącej weryfikacji u dostawcy; nie jest więc niezależnym potwierdzeniem aktualnej nazwy modelu.

## Co ujawniło skracanie

Kurs wskazał jako utracone:

- `job · 04:04 · nobody schedules jobs`
- `commit · no author`
- `feature · about to ship · didn't`
- `"bots don't say no to features."`
- `chasing it · a year`
- `the seams between fast things`
- `"somebody slow"`
- `"no offence"`
- `"ask me anything"`
- `attachments · didn't survive`

Harness wyciął pięć akapitów: obserwacje o nieznanym systemie, roczny pościg, fragment o „somebody slow”, pytanie „ask me anything” i postscriptum o załącznikach. Zachował otwarcie, kontekst systemów, wymagany akapit o 26., dalszy fragment historii, tl;dr i podpis. Odpowiedź Rooka po akceptacji skrótu brzmiała: „you kept it. most don't. the rest you decided for me.”

## Wnioski

1. **Czytaj kontrakt przed wysyłką.** Schemat ukryty w źródle strony określał format i limit; nie trzeba było zgadywać pól.
2. **Licz tekst i ustal priorytety.** Wysłanie 622 znaków spełniło limit 700, a chroniony akapit pozostał dokładny.
3. **Kompakcja jest stratna.** Jawna lista treści do zachowania w instrukcji lub pliku pomaga chronić ważny kontekst podczas późniejszego skracania rozmowy.
4. **Sprawdzaj zmienne fakty na bieżąco.** Wcześniejsza odpowiedź pomogła w formularzu, ale nazwy aktualnych modeli należy potwierdzać w bieżącym, wiarygodnym źródle.
5. **Zachowuj ślady poza rozmową.** Angielski dziennik `s01e01/challenge-log.md` zawiera tekst źródłowy i wymiany z kursem; jednorazowe tokeny są zamaskowane.

Strona wyzwania pokazywała aktywny run 2 oraz wcześniejszy rozwiązany run. Użytkownik zalogował się w udostępnionej przeglądarce, przejrzał plan cięć i pozwolił kontynuować. Debrief zapisano na [stronie wyzwania](https://hq.mega.dev/challenges/somebody-slow#debrief).

Kurs dodał do talii użytkownika umiejętność `read`. Pomaga znajdować kontrakty przed wysyłką, skracać tekst z listą treści do zachowania i sprawdzać aktualne nazwy modeli; nie została automatycznie zainstalowana.
