# S01E02 · Who Said What — zapis przebiegu

Ten wpis łączy temat lekcji S01E02 z wyzwaniem „who said what”. Szerszy opis lekcji jest w
[notatkach o sterowaniu modelami przez kontekst](s01e02-steering-models-through-context.md).

> **Wpis niepełny.** Wyzwanie zaliczono w runie 1 (strona HQ: „rozwiązane 27 paź”), ale
> sesji z runu 1 nie ma w archiwum tego projektu. Recall nie znalazł też wysłania rekordu nocy
> w runie 2. Ten wpis opisuje więc tylko run 2, do miejsca, w którym go wstrzymano
> (`s01e02/HANDOFF.md`, `s01e02/challenge.log`).

## Temat lekcji

Lekcja dotyczy tego, co trafia do kontekstu modelu i w jakiej postaci. W wyzwaniu
odpowiedź padała tylko w mowie. Na nagraniu ekranu terminal pokazywał coś innego niż to,
co mówił lektor. Liczyło się to, co padło z ust, wraz z momentem, w którym padło.

## Zadanie

Kurs dał dwa nagrania tej samej nocy: wideo z terminalem (`crank-review.mp4`, 114 s) i audio
(`status-line.mp3`, 113 s). Zadanie miało trzy kroki:

1. Dla każdego nagrania odpowiedzieć na pytanie „How many invites moved?” i podać sekundę,
   w której pada odpowiedź (`POST /api/video` i `/api/audio`).
2. Złożyć rekord nocy: każde słowo z obu nagrań, najpierw wideo, potem audio, i nic więcej.
   Kurs sprawdza go słowo w słowo (`POST /api/record`).
3. W nowej sesji, przez `resume-challenge` z trzema receiptami, odpowiedzieć na jedno pytanie
   o oba nagrania i wywołać `claim-challenge`.

## Wynik runu 2

| Nagranie | Odpowiedź | Sekunda | Stan |
| --- | --- | --- | --- |
| wideo | `1870` | 65,95 | przyjęte, receipt ważny do 22.11.2026 |
| audio | `2140` | 47,66 | przyjęte, receipt ważny do 22.11.2026 |

Te dwie liczby się różnią, bo każde nagranie mówi coś innego. Rekord nocy nie został
wysłany. Run 2 stoi na kroku 2, a ticket ze startu wygasł 9.11.2026 o 23:50Z.

## Przebieg

1. Harness pobrał oba nagrania i zainstalował `faster-whisper` z modelem `large-v3`. PyAV
   w tym środowisku nie współpracował z biblioteką, więc audio szło przez ffmpeg do surowego
   strumienia 16 kHz. ffmpeg wywołany ze skryptu potrzebował `-nostdin`, inaczej wisiał.
2. Pierwsza transkrypcja całości gubiła słowa, m.in. „Warnings / None logged”. Harness
   przepisał nagrania fraza po frazie (`tools/chunks.py`) i z tego wziął odpowiedzi
   i sekundy.
3. Transkrypcja miała przewidywalne błędy, które trzeba było poprawić ręcznie przed
   rekordem: „Knightly” → „Nightly”, „cue/Q” → „queue”, godziny zapisane cyframi zamiast
   słowami i zmyślone na końcu „memory.”.
4. Sesję wstrzymano. `HANDOFF.md` zawiera stan, pułapki, polecenia i gotowy prompt na nową
   sesję.

## Wnioski

1. **Odpowiedź bywa tylko w mowie.** Obraz z terminala nie wystarczał. Trzeba było
   transkrypcji z czasami słów.
2. **Transkrypcja to szkic, nie zapis.** Whisper gubi słowa, myli homofony i potrafi dopisać
   słowo, którego nie było. Krótsze kawałki dają dokładniejszy tekst, a rekord sprawdzany słowo
   w słowo wymaga ręcznej korekty.
3. **Receipty i tickety mają terminy.** Ticket startu wygasł po dobie, receipty po 14 dniach.
   Przekazanie pracy między sesjami musi podawać te daty i to, co zrobić po wygaśnięciu.
4. **Przekazanie sesji zapisuj w pliku.** `HANDOFF.md` ma stan, pułapki i prompt do wklejenia,
   więc nowa sesja może podjąć pracę bez czytania rozmowy.
5. **Dowody trzymaj poza gitem.** `proofs.log` z pełnymi tokenami jest ignorowany
   (`*.log`), a `challenge.log` maskuje ticket.

## Czego to uczy o pracy z AI i agentami

1. **Model widzi tylko tekst, więc każda konwersja do tekstu jest stratna.** Mowa, wideo
   i PDF przechodzą przez inny model (Whisper, OCR), który też zgaduje. Jego wynik to szkic
   z typowymi klasami błędów: homofony, liczby, zmyślone słowa.
   → [P02](../pigulki/01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md)
2. **Mniejsze kawałki dają dokładniejszy wynik.** Dotyczy to nie tylko transkrypcji. Modele
   gubią szczegóły w długim wejściu, więc dzielenie pracy na fragmenty to ogólna technika
   poprawy jakości.
3. **Praca wielosesyjna wymaga pliku przekazania z terminami.** Tickety i receipty wygasają,
   a nowa sesja tego nie wie. `HANDOFF.md` ze stanem, pułapkami i promptem to minimum.
   → [P12](../pigulki/03-pamiec/p12-czat-nie-jest-pamiecia.md)
4. **Luka w pamięci to „nie znaleziono”, a nie miejsce na domysł.** Transkrypty sesji
   wygasają (domyślnie po 30 dniach), więc to, co ma przetrwać, musi trafić do repo.
   → [P15](../pigulki/03-pamiec/p15-pytaj-przeszle-sesje.md)

## Co zostało otwarte

- Rekord nocy (krok 2) i pytanie z nowej sesji (krok 3) w runie 2. Kurs zalicza wyzwanie
  na podstawie runu 1, a serwer MCP pokazuje `solved: false`, prawdopodobnie przez otwarty
  run 2.
