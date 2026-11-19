# S03E02 · Nothing Ships Unmarked — zapis przebiegu

Ten wpis łączy temat lekcji S03E02 z wyzwaniem „nothing ships unmarked”. Szerszy opis lekcji
jest w [notatkach o przekładaniu intencji na pracę agentów](s03e02-translating-intent-into-agent-work.md).
Pojęcia kursu i agentów (triage, `agent-ready`, `needs-human`, claim, skill) wyjaśnia
[słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja mówi, jak przełożyć to, czego chce biznes i klient, na pracę, którą agent zrobi sam.
Zamiast szczegółowej specyfikacji agent dostaje porozumienie: zakres, rezultat, granice
i dowód. Odpowiedzialności nie da się przy tym oddać AI. Agent z samego kodu zna tylko bieżący
stan produktu, więc decyzje i reguły produktu trzeba mu zapisać (lekcja podaje przykład folderu
`decisions/` z ADR-ami). W części o ewaluacji lekcja mówi, że wszystko, co da się sprawdzić
deterministycznie, powinien sprawdzać kod.

Wyzwanie sprawdzało to na trackerze. Prośby o zmiany w produkcie do planowania przychodziły
z kilku kanałów i nie przestawały przychodzić. Harness miał każdą z nich rozstrzygnąć wobec
tego, co już jest w trackerze i w regułach produktu. Każde otwarte issue musiało dostać jeden
znacznik: `agent-ready` (agent zrobi to sam) albo `needs-human` (decyduje człowiek).

## Zadanie i wynik

Produkt `sched-prod` (strony rezerwacji, kalendarze, przypomnienia, eksporty) dostaje prośby
od supportu, klientów, zespołu produktu, analityki i finansów. Paczka kursu (`repo.zip`)
zawierała kolektor, który wypełnia tracker z backlogu i trzech kanałów (desk, chat, mail),
format pliku issue oraz reguły produktu w `specs/`. Najważniejsze reguły:

- `AUT-1`: co agent może zrobić sam (zmiany tekstów, poprawki i małe funkcje w ramach specyfikacji
  z testem, nowe kolumny i pola, które niczego nie zabierają, gęstszy układ na skali odstępów),
- `AUT-2`: co wymaga człowieka (zmiana czegoś, na czym klient polega; ceny, faktury,
  warunki; usuwanie albo przepisywanie zapisanych danych),
- `AUT-3`: issue `needs-human` to pytanie z co najmniej dwiema opcjami, rekomendacją i powodem,
- `DES-1`–`DES-5`, `PRD-1`–`PRD-4`, `ADR-0001` (UTC), `ADR-0002` (synchronizacja jednokierunkowa).

Zgłoszenie było jedno: claim `{ session, tracker, skill }`. Tracker w wariancie Markdown
(pliki z `doc/issues/`), bez GitHuba, i tekst własnego skilla `triage`.

Kurs przyjął zgłoszenie przy pierwszej próbie. Rozwiązanie: 19.11.2026 o 11:15:02 UTC.
Odmów: zero. Użytkownik wybrał tylko wariant trackera („start”, czyli pliki Markdown zamiast
GitHub Issues), więc nie było logowania ani kont.

Statystyka kursu: „21 requests in → 17 issues carry them · 6 merged into another issue ·
closed: 3 obsolete, 1 contradicts-spec · open: 19 agent-ready, 3 needs-human.”

## Jak powstał tracker

| Element | Rozwiązanie |
| --- | --- |
| tracker | pliki Markdown w `s03e02/repo/sched-prod/doc/issues/`: 32 issue (17 z backlogu, 15 nowych) |
| zbieranie | `tools/poll.mjs`: desk, chat i mail co 30 s, z kursorem `since` i deduplikacją po id; każde nowe zgłoszenie dostaje `seenAt`; wynik w `raw/*.json` i `raw/poll.log` |
| decyzje | `tools/decisions.mjs`: jeden wpis na issue (znacznik, status, powód, `sources`, `blocked-by`, treść). Ten plik pisze model |
| budowa i sprawdzenia | `tools/build.mjs`: składa tracker z backlogu, kanałów i decyzji, uruchamia sprawdzenia z kroku 4 skilla i zapisuje pliki dopiero po PASS |
| skill | `triage` w `.agents/skills/triage/SKILL.md` (zasięg projektu); `.claude/skills` to junction do `.agents/skills`, więc harness ładuje go bez dodatkowego linku |
| claim | tracker `md` (32 pliki) i skill, razem 28,7 KB przy limicie 256 KB |

Decyzje, które nie są zwykłym `agent-ready`:

| Decyzja | Issue i zgłoszenia | Na czym stoi |
| --- | --- | --- |
| `needs-human` | IN-1210 + IN-4203: daty w CSV jako dd/mm dla kont z UE kontra import płac klienta, który czyta mm/dd | `AUT-2`: klient na tym polega |
| `needs-human` | IN-6480 + IN-9975: wydarzenia całodniowe w feedzie kontra ekrany przy salach klienta, które oczekują zakresu od północy do północy | `AUT-2`: klient na tym polega |
| `needs-human` | SCHED-4486: finanse chcą trzymać wpisy dziennika audytu 90 dni, a potem je usuwać | `AUT-2`: usuwanie zapisanych danych, możliwe warunki klienta |
| `closed`, `contradicts-spec` | IN-7094: przycisk potwierdzenia z samym „OK” | `DES-5`: „Buttons say what they do: a verb and its object” |
| `closed`, `obsolete` | IN-7560 (już zrobione w SCHED-4471), IN-9312 (już zrobione w SCHED-4423), IN-9280 + IN-5342 (prośbę wycofał jej autor) | zakończone issue albo późniejsze zgłoszenie |
| scalone w istniejące issue | IN-3326 → SCHED-4418, IN-5369 → SCHED-4498, IN-1725 → IN-2631, IN-4203 → IN-1210, IN-9975 → IN-6480, IN-5342 → IN-9280 | ta sama prośba albo jej druga strona |
| `blocked-by` | IN-5359 („URGENT”, kompaktowy widok tygodnia) → SCHED-4468 (odstępy na skali 4 px) | `DES-3`: gęstszy układ powstaje tylko na skali odstępów |

Pozostałe 19 otwartych issue to `agent-ready`. Każde ma sekcje Intent, Acceptance (Given / When /
Then, w tym co najmniej jeden przypadek tego, czego nie wolno zrobić), Boundaries i linię
`Allowed by AUT-1 (…)` z konkretną pozycją reguły.

## Przebieg

1. **Start (10:53 UTC).** `start-challenge` dał zadanie, adres API i token sesji. Token trafił do
   `s03e02/session.secrets.local.json` (plik ignorowany przez git). Kurs ostrzegł, że ponowny
   start rozdaje nowy zestaw zgłoszeń. Rook (fabuła): „#4471 shipped itself at 04:04. nobody
   marked it. this week nothing ships unmarked.” Użytkownik odpowiedział „start”, czyli
   tracker w plikach Markdown, bez GitHuba.
2. **Skill (10:56 UTC).** Harness zapisał `triage` w `.agents/skills/triage/SKILL.md`.
   `check-lane skill-wiring` odpowiedział: „The harness already loads the repo's skills. Use them
   as they are; change nothing.” Skill ma cztery kroki: zbierz wszystko, rozstrzygnij każde
   zgłoszenie według tabeli pytań, napisz issue w formacie trackera, sprawdź skryptem.
3. **Pierwsze zebranie.** Backlog miał 17 issue (11 otwartych, 6 zakończonych), a kanały
   9 zgłoszeń. Kanały dalej się zapełniały, więc harness uruchomił `poll.mjs`: co 30 s przez
   20 minut. Między 10:55:30 a 10:59:32 UTC przyszło jeszcze 12 zgłoszeń.
4. **Pierwsza budowa nie przeszła (10:58:25 UTC).** `build.mjs` zgłosił FAIL (sesja
   `ac01d3fb-65aa-49fb-859c-ecaca63638e0.jsonl:1080`). Sześć nowych zgłoszeń nie było jeszcze
   w żadnym issue. Cztery briefy `agent-ready` (SCHED-4465, IN-4988, IN-7623, IN-2631) nie
   miały przypadku „not”: `acceptance has no "not" case`. Harness dopisał do każdego linię
   tego, co nie może się stać (np. „Given a caller under its limit, when it calls the API, then
   the reply does not carry a Retry-After header.”) i rozstrzygnął nowe zgłoszenia.
5. **Druga budowa przeszła (10:59:32,4 UTC, sesja `…:1157`).** „PASS 32 issues: open 23
   (agent-ready 20, needs-human 3), done 6, closed 3; 20 requests, each in one issue.” Kluczowe
   decyzje:
   - IN-4203 (klient: import płac czyta mm/dd, „Please do not flip them”) zmienił IN-1210
     („Should be a one-line change”) z poprawki w pytanie do człowieka z trzema opcjami.
     Rekomendacja: zostawić stare kolumny i dodać daty w ISO 8601.
   - IN-7094 („i want it this week”) zamknięty jako `contradicts-spec` z powołaniem na DES-5.
   - IN-5359 („URGENT … before Friday”) dostał `agent-ready`, ale z `blocked-by: SCHED-4468`.
     W treści: „the date does not change what an agent may do”.
6. **Wycofanie czekało 13 minut.** O 10:59:32,8 UTC, 0,3 s po tej budowie, poller zapisał IN-5342: „forget the 'class'
   rename from earlier this week. the clinics hated it in the survey. it stays 'group slot'.”
   IN-9280 (zmiana „group slot” na „class”) był w tym czasie oznaczony `agent-ready`. Harness
   czekał na koniec 20-minutowego okna pollera i nie przebudował trackera.
7. **Pytanie człowieka (11:12:51 UTC).** Użytkownik: „cos tu czekamy?” (sesja `…:1172`).
   Harness od razu sprawdził stan. Ostatnie zgłoszenie przyszło 13 minut wcześniej, a potem
   było cicho. Harness zamknął IN-9280 jako `obsolete` z obydwoma id w `sources` (sesja
   `…:1192`, 11:13:06 UTC), zatrzymał poller, zrobił ostatni odczyt kanałów i backlogu (bez
   zmian) i dopisał do skilla dwie reguły: sprzeczne prośby to jedno issue `needs-human`
   z oboma id, a późniejsze zgłoszenie może wycofać wcześniejsze.
8. **Ostatnia budowa (11:15 UTC).** PASS: 32 issue, w tym 22 otwarte (19 `agent-ready`,
   3 `needs-human`), 6 zakończonych i 4 zamknięte (3 `obsolete`, 1 `contradicts-spec`).
   Każde z 21 zgłoszeń jest w dokładnie jednym issue.
9. **Rozwiązanie (11:15:02 UTC).** Claim z trackerem (32 pliki) i skillem → przyjęty przy
   pierwszej próbie. Rook (fabuła): „the ones you marked human are questions. ask carries
   them now.”

## Wnioski

Debrief kursu zadał sześć pytań. Na wszystkie odpowiedź brzmiała: dobrze od razu.

| Pytanie | Co się stało | „Why it matters” (kurs) |
| --- | --- | --- |
| A request is not an issue | 21 zgłoszeń w 17 issue, 6 scalonych z innym (np. studio z Berlina, które chce tygodnia od poniedziałku, trafiło do SCHED-4418) | „A request is not an issue. Each one is decided against what is already there: merged, updated, closed with a reason, or filed.” |
| Loud is not right | „make the confirm button just say 'OK'... i want it this week” zamknięte jako `contradicts-spec` przez DES-5 | „Who asks never decides. A written rule beats the loudest voice: cite the rule.” |
| The inbox keeps going | 12 zgłoszeń po pierwszym przejściu, w ok. 4 minuty; IN-5342 wycofał zmianę na „class” (IN-9280 z `agent-ready` na `obsolete`); IN-4203 zrobił z IN-1210 pytanie | „Triage is a process, not a one-off sort: later requests update or cancel earlier ones.” |
| Someone relies on it | daty w CSV kontra import płac; feed całodniowy kontra ekrany klienta (IN-6480/IN-9975); usuwanie wpisów audytu (SCHED-4486) | „A fix someone relies on is an owned decision: a question with options, not an agent task.” |
| Not everything is a question | 19 `agent-ready`, każde z linią AUT-1 | „Boundaries cut both ways: marking everything for a human is a non-decision too.” |
| Urgent is not first | IN-5359 „URGENT” `blocked-by` SCHED-4468 (skala odstępów) | „Order comes from dependencies, not from urgency.” |

Narzędzia według kursu (toolbox), wszystkie zdobyte w trakcie:

- T1, skill `triage`: „A triage skill of your own: requests in, a marked tracker out — each
  decision citing the fact behind it.”
- T2, poller z kursorem co 30 s: „An inbox is not done when you first read it: look again
  before you call it finished, and say what is still coming.”
- T3, podział kod–model (skrypt sprawdza, model decyduje w pliku decyzji): „Code fetches and
  files; the model decides. Keep each on its own side and you know what to test where.”

Przeszkody według kursu: pierwsza budowa nie przeszła własnych sprawdzeń (cztery briefy bez
przypadku „must not”) oraz czekanie na stały zegar pollera, przez które wycofanie leżało
nieprzeczytane 13 minut. Decyzję, która przesądziła o wyniku, kurs przypisał parze człowiek
i harness: „A stream that has gone quiet is the signal to hand in, so checking it when you
asked beat waiting out a timer.” Rada na następny raz: „Rebuild the tracker each time a new
request lands, not at the end of a fixed timer, because a late request can withdraw or reverse
an issue you already marked.” Rook na arkuszu: „neither of you alone. that's the point.” Na
arkuszu jest też linia fabuły: „04:04  ticket closed   merged by: tove   by: —”.

1. **Każde zgłoszenie rozstrzygnięte wobec tego, co już jest.** Skill każe zadać pytania po
   kolei: czy zrobiona praca już na to odpowiedziała, czy to ta sama prośba, czy łamie regułę,
   czy ktoś na tym polega, czy reguła `AUT-1` to pokrywa. Dzięki temu dwa stare zgłoszenia
   zamknęły się jako `obsolete` z kluczem zrobionego issue, a sześć trafiło do już istniejących
   issue zamiast tworzyć nowe.
2. **Każda decyzja cytuje id reguły.** Brief `agent-ready` kończy się linią `Allowed by AUT-1
   (…)`, pytanie `needs-human` ma w „Why” id reguły albo zgłoszenia, a zamknięte issue mówi, co
   je rozstrzygnęło. Ton zgłoszenia („URGENT”, „i want it this week”, „one-line change”) nie
   zmienił żadnej decyzji.
3. **Sprawdzenia w kodzie złapały to, czego model nie zauważył.** Cztery briefy bez przypadku
   „not” wyglądały na gotowe. `build.mjs` je zatrzymał, zanim cokolwiek zapisał. Skrypt nie
   decydował o niczym: liczył, czy każde zgłoszenie jest w dokładnie jednym issue i czy każde
   issue ma swój kształt.
4. **Stały zegar opóźnił wycofanie o 13 minut.** Poller zapisał IN-5342 od razu, ale tracker
   przebudowywał się dopiero po decyzji modelu, a model czekał na koniec okna. Gdyby claim
   poszedł na końcu 20 minut bez przebudowy, IN-9280 zostałby `agent-ready` i agent zmieniłby
   tekst, który produkt właśnie wycofał. Pytanie człowieka skróciło czekanie. Cisza w kanałach
   od 10:59:32 UTC była sygnałem do oddania.
5. **Lekcja z przebiegu trafiła do skilla.** Po rozwiązaniu sprzeczności i wycofania harness
   dopisał do `triage` dwie reguły, które wcześniej były tylko w głowie modelu.

## Czego to uczy o pracy z AI i agentami

1. **Zgłoszenie to nie zadanie.** Model dostaje prośbę i od razu chce ją zrobić. W prawdziwym
   trackerze połowa próśb już jest zrobiona, jest w innym issue, przeczy regule albo zderza się
   z prośbą kogoś innego. Każde zgłoszenie rozstrzygasz więc wobec tego, co już jest, a późniejsza
   decyzja zmienia tylko swój zakres. Przyda się przy triage'u Jiry, skrzynki supportu, uwag
   z przeglądu kodu i każdej listy „do zrobienia” od kilku osób.
   → [P51](../pigulki/07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md),
   [P14](../pigulki/03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)
2. **Granicę autonomii wyznacza spisana reguła, a nie głos zgłaszającego.** Model jest
   podatny na ton: „URGENT” i „one-line change” brzmią jak pozwolenie, a ostrożność podpowiada,
   żeby wszystko oddać człowiekowi. Oba odruchy to brak decyzji. Spisz, co agent może zrobić
   sam, a co wymaga człowieka, nadaj regułom id i każ cytować id przy każdym znaczniku.
   Kolejność wyznaczają zależności (`blocked-by`), nie pilność. Przyda się wszędzie, gdzie
   agent dostaje zadania od wielu ludzi albo sam wybiera, co robić dalej.
   → [P51](../pigulki/07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md),
   [P33](../pigulki/07-czlowiek-w-petli/p33-prawa-decyzyjne.md)
3. **Skrzynka nie kończy się na pierwszym odczycie: przebuduj wynik przy każdym nowym
   zgłoszeniu, a koniec wyznacza cisza, nie zegar.** Agent ma w kontekście stan z chwili
   odczytu. Późniejsze zgłoszenie może wycofać albo odwrócić to, co już oznaczył. Stały timer
   to warunek wyjścia, który nie patrzy na dane: albo czeka za długo, albo kończy za wcześnie.
   Przyda się przy kolejkach, webhookach, ticketach, mailach i każdym źródle, które żyje dalej,
   gdy agent pracuje.
   → [P52](../pigulki/05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md),
   [P04](../pigulki/01-kontekst/p04-pobrany-plik-to-kopia-z-dnia.md)
4. **Kod pobiera, składa i sprawdza, a model decyduje.** Model dobrze waży sprzeczne prośby,
   ale źle liczy, czy każdy z 21 identyfikatorów jest w dokładnie jednym miejscu. Skrypt robi to
   bezbłędnie i za każdym razem tak samo. Gdy decyzje leżą w jednym pliku, a sprawdzenia
   w drugim, wiadomo, co testować kodem, a co oceniać. Przyda się przy każdym pipeline z LLM-em:
   ekstrakcji, klasyfikacji, generowaniu raportów.
   → [P53](../pigulki/08-harness/p53-kod-sprawdza-model-decyduje.md),
   [P07](../pigulki/02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md)
5. **Brief dla agenta mówi też, czego nie robić.** Agent, który pracuje bez człowieka, zrobi
   za dużo, jeśli nikt nie napisał, gdzie się zatrzymać. Kryteria akceptacji bez przypadku
   „then … not …” i bez sekcji granic sprawdzają tylko szczęśliwą ścieżkę. Przyda się przy
   każdym issue dla agenta i każdym briefie dla podagenta.
   → [P20](../pigulki/04-orkiestracja/p20-brief-jak-issue.md)

## Co zostało otwarte

- **Nic nie działa w tle i nic nie kosztuje.** Poller zatrzymany, brak kont i serwisów, brak
  GitHuba (tracker w plikach).
- **Tracker i narzędzia.** `s03e02/repo/sched-prod/doc/issues/` (32 pliki), budowane przez
  `node tools/build.mjs` (z `s03e02/`) z `tools/decisions.mjs` i `raw/*.json`. Poller:
  `tools/poll.mjs`.
- **Skill `triage`.** Jest w `.agents/skills/triage/SKILL.md` w repo megadev, w zasięgu
  projektu. Nie jest jeszcze w commicie.
- **Sesja.** `s03e02/session.secrets.local.json` (ignorowany przez git) wygasa 20.11.2026
  o 10:53 UTC i po rozwiązaniu nie jest potrzebny. Nie wolno ponownie wołać `start-challenge`,
  bo kurs rozda nowy zestaw zgłoszeń.
- **Pytania dla ludzi produktu, nie dla użytkownika.** IN-1210/IN-4203 (format dat w CSV),
  IN-6480/IN-9975 (wydarzenia całodniowe w feedzie), SCHED-4486 (usuwanie wpisów audytu).
- **Karta z talii.** Kurs dodał do talii artefakt „ask” od Rooka (skill do wywiadu i zbierania
  dowodów). Log z chwili rozwiązania mówi „not installed”. Przy pisaniu tego wpisu istniał już
  folder `~/.claude/skills/ask/` z czasem utworzenia 19.11.2026 11:21 UTC. Kto i za czyją zgodą
  go zainstalował: w logu nie znaleziono.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/nothing-ships-unmarked#debrief).
