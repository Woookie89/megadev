# S01E02 · Who Said What — zapis przebiegu

Ten wpis łączy temat lekcji S01E02 z wyzwaniem „who said what”. Szerszy opis lekcji jest w
[notatkach o sterowaniu modelami przez kontekst](s01e02-steering-models-through-context.md).

Źródła: debrief z HQ (`s01e02/hq-debrief.md`, wklejony przez użytkownika 24.11.2026; oryginał
angielski zostaje w tym pliku, tutaj są jego wnioski po polsku; wklejka nie miała nagłówka z kodem
odcinka, więc epizod rozpoznano po zadaniu) oraz materiały robocze z repo: `s01e02/HANDOFF.md`,
`s01e02/challenge.log`, `s01e02/log.md`.

> **Dwa źródła, dwa runy.** Strona HQ pokazuje: „1 run solved · 1 debrief. Run 1: solved. Run 2: in
> progress.” (jeden run rozwiązany, run 2 w toku; gdy harness go rozwiąże, jego debrief pojawi się
> nad wcześniejszymi). Run 1 (rozwiązany 2026-10-27) opisuje tylko debrief HQ, bo jego sesji nie ma
> w archiwum tego projektu (recall nic nie znalazł). Materiały z repo dotyczą późniejszych prób,
> z 8–9 i 19.11.2026. Nie znaleziono źródła, które mówiłoby, jak te próby odpowiadają dwóm runom
> z HQ (patrz „Co zostało otwarte”).

## Temat lekcji

Lekcja dotyczy tego, co trafia do kontekstu modelu i w jakiej postaci. W wyzwaniu odpowiedź padała
tylko w mowie, a dwa nagrania tej samej nocy miały każde własny zegar. HQ opisuje zadanie tak („The
task”), w przekładzie:

> Dwa nagrania maszynowe opisywały jedną noc jednego produktu i każde miało własny zegar, więc jedno pytanie miało w każdym inną odpowiedź. Twój harness miał zgłosić, co mówiło każde nagranie na dane pytanie i w którym miejscu, oraz złożyć jeden rekord nocy. Potem nowa sesja, która widziała tylko ten rekord, odpowiadała na nowe pytanie o oba nagrania.

Debrief HQ (run 1) stawia cztery pytania („What this Challenge showed”). Ich wnioski („Why it
matters”) w przekładzie:

### Podjęcie pracy w nowej sesji (Picking up the work in a new session), dobrze za pierwszym razem

Harness odpowiedział z tego, co zwrócił `resume-challenge` (pytanie i rekord), bez powtarzania
transkrypcji.

> Dlaczego to ważne: Nowa sesja startuje bez starej rozmowy, więc może użyć tylko tego, co dla niej zachowano. Tu kurs zachował rekord i go przekazał. W twojej własnej pracy nic się nie przenosi, dopóki harness nie zapisze tego tam, gdzie następna sesja czyta.

### Dwa nagrania, dwa zegary (Two recordings, two clocks), nie wystąpiło

Ta sesja nie słyszała żadnego nagrania, więc nie dowiedziała się, który zegar należy do którego pliku.

> Dlaczego to ważne: Dwa nagrania miały różne zegary, więc to samo pytanie miało w każdym inną poprawną odpowiedź. Jeden kontekst, który słyszy oba, może je zlać, bo nic nie wiąże faktu z nagraniem. Osobny worker dla każdego źródła trzyma każdą odpowiedź przy jej źródle.

### Czasy z transkrybera, który naprawdę działał (Times from a transcriber that really ran), dobrze za pierwszym razem

Harness nie uruchamiał transkrybera i nie sprawdzał folderu roboczego. Czasy wzięły się z rekordu.

> Dlaczego to ważne: Raport wymagał sekundy, w której pada odpowiedź, a daje ją tylko transkryber, który faktycznie przeszedł po nagraniu. Skill albo plan, który opisuje transkryber, nie daje czasów. Sprawdź, co twój harness potrafi uruchomić, zanim obieca offset.

### Które słowa pochodzą z którego nagrania (Which words came from which recording), najpierw poszło źle

Harness dostał sam rekord, zgadł kolejność i podał 01:50 dla audio. Kurs odmówił.

> Dlaczego to ważne: Rekord powstał do sprawdzenia słowo w słowo, więc zawierał każde słowo i żadnych etykiet źródła. Nowa sesja musiała wiedzieć, które słowa pochodzą z którego nagrania, a rekord tego nie mówił, więc mogła tylko zgadywać albo zapytać ciebie. Rekord zrobiony do jednego zadania może nie mieć tego, czego potrzebuje następne.

### Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox” dla runu 1, w przekładzie:

- Harness miał: nic.
- Dodane w tym rozwiązaniu: handoffy, które nazywają źródło każdej części (etykiety, które przeniosłeś z pierwszej sesji).
- Nadal brakuje: pliku handoff, który nowa sesja potrafi przeczytać. Niech harness zapisuje ustalenia do pliku w folderze roboczym, który nowa sesja czyta jako pierwszy.
- Nadal brakuje: subagentów, po jednym na źródło. Dodaj subagentów do harnessu, żeby każde źródło miało workera z własnym kontekstem.
- Nadal brakuje: transkrybera z czasami zdań. Zainstaluj transkryber, który podaje czasy zdań, i trzymaj go jako CLI, które harness może uruchomić.

Transkryber jako CLI: jeszcze nie. W tej sesji nie ustawiono transkrybera ani skryptu. Transkrypty ma pierwsza sesja, więc następna sesja nie ma jeszcze polecenia do uruchomienia.

Wniosek „Next time”:

> Gdy jedna sesja przekazuje rekord drugiej, zapisz w handoffie, która część pochodzi z którego źródła, bo sam rekord nie powie następnej sesji, czyje słowa są czyje.

## Zadanie i wynik

### Run 1 (z HQ, rozwiązany 2026-10-27)

HQ: harness `Claude Code (mega-challenge)`, model harnessu „Not reported by your harness” (harness go
nie podał), „Matched later from your sign-ins.” (dopasowano później po zalogowaniach). Wersji
harnessu HQ nie podaje. Wynik: „Solved. The course turned down 1 try before it accepted.” (kurs
odrzucił 1 próbę, zanim przyjął). Godziny HQ nie podaje.

HQ „What happened”, w przekładzie:

> Twój harness miał podać, kiedy wystartował nocny batch, raz dla audio i raz dla wideo, mając tylko rekord z dwoma streszczeniami. Zgadł, które streszczenie jest które, i kurs odmówił. Zapytałeś pierwszą sesję, która słyszała oba pliki, a jej etykiety dały 03:50 dla audio i 01:50 dla wideo.

Pytanie w runie 1 dotyczyło więc godziny startu nocnego batcha. W próbach z logu repo kurs pytał o co
innego („How many invites moved?”). Dlaczego pytania się różnią, w źródłach nie znaleziono.

Tabela snagów („How the solve went”) z HQ, jeden snag, w przekładzie:

1. Harness zgadł, że pierwsze streszczenie to audio, i podał 01:50 dla audio, 03:50 dla wideo. Kurs odmówił: rekord nigdy nie mówi, czyje słowa są czyje. — Zapytałeś pierwszą sesję, która transkrybowała każdy plik osobno, i przyniosłeś etykiety. Harness podał wtedy 03:50 dla audio i 01:50 dla wideo. (razem, właściwa decyzja)

> Właściwa decyzja padła w snagu 1 i podjęliście ją oboje. Tylko sesja, która słyszała pliki, wiedziała, czyje słowa są czyje, więc zapytanie jej było pewniejsze niż ponowne zgadywanie kolejności.

Rook (fabuła): „neither of you alone. that's the point.”

### Próby z logu repo (8–9 i 19.11.2026)

Kurs dał dwa nagrania tej samej nocy: wideo z terminalem (`crank-review.mp4`, 114 s) i audio
(`status-line.mp3`, 113 s). Zadanie miało trzy kroki:

1. Dla każdego nagrania odpowiedzieć na pytanie „How many invites moved?” i podać sekundę,
   w której pada odpowiedź (`POST /api/video` i `/api/audio`).
2. Złożyć rekord nocy: każde słowo z obu nagrań, najpierw wideo, potem audio, i nic więcej.
   Kurs sprawdza go słowo w słowo (`POST /api/record`).
3. W nowej sesji, przez `resume-challenge` z trzema receiptami, odpowiedzieć na jedno pytanie
   o oba nagrania i wywołać `claim-challenge`.

| Nagranie | Odpowiedź | Sekunda | Stan |
| --- | --- | --- | --- |
| wideo | `1870` | 65,95 | przyjęte 8.11.2026 o 23:58Z, receipt ważny do 22.11.2026 |
| audio | `2140` | 47,66 | przyjęte 8.11.2026 o 23:58Z, receipt ważny do 22.11.2026 |

Te dwie liczby się różnią, bo każde nagranie mówi coś innego. Rekord nocy nie został wysłany.
Ticket ze startu wygasł 9.11.2026 o 23:50Z.

Według `s01e02/log.md` (wpisy z 19.11.2026, bez godzin) sesja wznowiła pracę po odmowie: kurs
odrzucił receipty audio i wideo z pierwszej próby („The proof of an earlier step does not hold.
Nothing was graded.”). Powód odmowy nie jest zapisany. Harness wywołał `start-challenge` ponownie
(nowy ticket do 2026-11-20T12:29:32Z), a oba raporty z tymi samymi wartościami przyjęto ponownie.
Transkrypcja całego audio ruszyła od nowa. Log kończy się na tym wpisie, a HQ z 24.11.2026 nadal
pokazuje „Run 2: in progress”.

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
   Handoff pracy między sesjami musi podawać te daty i to, co zrobić po wygaśnięciu.
4. **Handoff sesji zapisuj w pliku.** `HANDOFF.md` ma stan, pułapki i prompt do wklejenia,
   więc nowa sesja może podjąć pracę bez czytania rozmowy.
5. **Rekord ma nieść źródło każdej części.** W runie 1 sam rekord nie mówił, czyje słowa są czyje,
   więc harness zgadł i kurs odmówił. Etykiety miała tylko pierwsza sesja.
6. **Dowody trzymaj poza gitem.** `proofs.log` z pełnymi tokenami jest ignorowany
   (`*.log`), a `challenge.log` maskuje ticket.

## Czego to uczy o pracy z AI i agentami

1. **Model widzi tylko tekst, więc każda konwersja do tekstu jest stratna.** Mowa, wideo
   i PDF przechodzą przez inny model (Whisper, OCR), który też zgaduje. Jego wynik to szkic
   z typowymi klasami błędów: homofony, liczby, zmyślone słowa. Kurs dodaje: skill albo plan, który
   opisuje transkryber, nie daje czasów, więc sprawdź, co harness potrafi uruchomić, zanim obieca
   offset.
   → [P02](../pigulki/01-kontekst/p02-konwersja-do-tekstu-jest-stratna.md)
2. **Mniejsze kawałki dają dokładniejszy wynik.** Dotyczy to nie tylko transkrypcji. Modele
   gubią szczegóły w długim wejściu, więc dzielenie pracy na fragmenty to ogólna technika
   poprawy jakości.
3. **Praca wielosesyjna wymaga pliku handoff z terminami i ze źródłem każdej części.**
   Tickety i receipty wygasają, a nowa sesja tego nie wie. Kurs: nowa sesja startuje bez starej
   rozmowy, więc może użyć tylko tego, co dla niej zachowano. `HANDOFF.md` ze stanem, pułapkami
   i promptem to minimum. → [P12](../pigulki/03-pamiec/p12-czat-nie-jest-pamiecia.md)
4. **Rekord zrobiony do jednego zadania może nie mieć tego, czego potrzebuje następne.** Rekord
   do sprawdzenia słowo w słowo zawierał wszystkie słowa i żadnych etykiet źródła. Dlatego do handoffu dopisz, która część skąd pochodzi. Jedno źródło, jeden worker z własnym kontekstem
   trzyma odpowiedź przy źródle (kurs wymienia „subagentów, po jednym na źródło” wśród brakujących
   narzędzi).
   → [P12](../pigulki/03-pamiec/p12-czat-nie-jest-pamiecia.md),
   [P21](../pigulki/04-orkiestracja/p21-deleguj-research.md)
5. **Luka w pamięci to „nie znaleziono”, a nie miejsce na domysł.** Transkrypty sesji
   wygasają (domyślnie po 30 dniach), więc to, co ma przetrwać, musi trafić do repo.
   → [P15](../pigulki/03-pamiec/p15-pytaj-przeszle-sesje.md)

## Co zostało otwarte

- **Rozbieżność statusu (otwarta, do sprawdzenia).** Serwer MCP kursu (`list-challenges`) zwrócił
  `solved: false` 9.11.2026 (`s01e02/challenge.log`, wpis z początku pliku) i jeszcze 13.11.2026
  ([plik wyzwania](../challenges/S01E02_who-said-what.md)). HQ z 24.11.2026 mówi: run 1
  rozwiązany 2026-10-27, run 2 w toku. Wcześniejszy zapis tłumaczył to „prawdopodobnie otwartym
  runem 2”. To tylko przypuszczenie: rozwiązanie z 27.10 jest wcześniejsze niż oba odczyty,
  a przyczyny flagi nikt nie sprawdził. Do rozstrzygnięcia nowym wywołaniem `list-challenges`.
- **Mapowanie prób na runy.** Log repo nazywa próbę z 8–9.11 „run 1” (odrzucone receipty), a
  19.11 „run 2”. HQ ma run 1 z 27.10 (rozwiązany, bez sesji w archiwum) i run 2 w toku. Jak jedno
  odpowiada drugiemu, w źródłach nie znaleziono.
- Rekord nocy (krok 2) i pytanie z nowej sesji (krok 3) w trwającym runie 2. W źródłach nie
  znaleziono wysłania rekordu. Ostatni znany ticket wygasł 20.11.2026 o 12:29Z, więc potrzebny
  będzie nowy `start-challenge`.
- **Nic nie działa i nic nie kosztuje.** Nie ma serwisu ani hostingu. Lokalnie zostały nagrania,
  transkrypty i `.venv` z `faster-whisper` (pliki robocze w `s01e02/`).
- Brakuje w źródłach: wersja harnessu i model runu 1 (HQ: „Not reported by your harness”) oraz
  godzina rozwiązania.
- Sekrety (ticket, receipty) są w plikach ignorowanych przez git: `proofs.log`, `run2.secrets.local`.
  W dokumentach ich nie ma.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/who-said-what#debrief).
