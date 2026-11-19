# S03E04 · Show Me When — zapis przebiegu

Ten wpis łączy temat lekcji S03E04 z wyzwaniem „show me when”. Szerszy opis lekcji jest
w [notatkach o weryfikacji rezultatów produktu](s03e04-verifying-product-outcomes.md).
Pojęcia kursu i agentów (replay, keyed render, system diff, blok `evidence`) wyjaśnia
[słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja mówi, że agenci chętnie i szybko zbudują niewłaściwe rzeczy, a raport „gotowe” nie
oznacza, że praca została dostarczona. Akceptacja potrzebuje dowodów zarejestrowanych
z prawdziwego buildu, dopasowanych do ryzyka zmiany. Weryfikacja to „laboratorium agentowe”:
agent używa produktu jak użytkownik (klika, pisze, nagrywa krótkie filmy) i zbiera zapisy
uruchomień. System diff pokazuje człowiekowi, co się zmieniło i jakie decyzje na niego czekają.
Bramki jakości to w większości deterministyczne kontrole, które blokują wydanie.

Wyzwanie sprawdzało to w praktyce. Tablica incydentów miała plan i cztery gotowe issues.
Trzeba było je zbudować, wdrożyć na własny adres HTTPS, nagrać tablicę w użyciu i wysłać
zespołowi produktu krótki raport z linkiem do nagrania. Po odpowiedzi produktu trzeba było
zmienić tablicę, wdrożyć ją jeszcze raz i udowodnić, że nowy build działa.

## Zadanie i wynik

Projekt startowy `sched-prod-board` to statyczna strona (`app/`), która czyta incydenty z API
kursu (`GET …/incidents`, `GET …/ack`). Plan (`plan.md`) opisuje trzy przepływy (`open-board`,
`ack-incident`, `watch-board`), wymagania R1–R6 i przypięte haki `data-testid`. Cztery issues:
SCHED-4511 (lista na żywo i Ack), SCHED-4512 (loader), SCHED-4513 (odświeżanie co 2 s)
i SCHED-4514 (czas lokalny). Każde Ack zwraca receipt, który trafia do dowodu.

Zgłoszenia były dwa:

- krok 1: raport z sekcjami „What you checked”, „When”, „Where”, „Options for product” i blokiem
  `evidence` (przepływ, moment `mm:ss`, receipt, sha, link do nagrania),
- krok 2: nowy raport z sekcją „System Diff”, nowe nagranie i dowód nowego buildu: przebieg
  workflow `prove` na GitHub Actions albo wynik replay kursu uruchomionego lokalnie.

Kurs przyjął wynik 19.11.2026 o 23:27:19 UTC. Krok 1: jedna odmowa, potem przyjęty. Krok 2:
przyjęty przy pierwszej próbie. Dowód kroku 2 poszedł drogą lokalną, bez repo na GitHubie.
Od komendy „start” (23:11:14 UTC) do rozwiązania minęło 16 minut.

- Tablica: <https://sched-prod-board.woookie89.workers.dev> (Worker `sched-prod-board`,
  Cloudflare, darmowy plan).
- Nagranie kroku 1 (build `4e20386`): `/media/board-4e20386.mp4`, błędny ack w 00:17.
- Nagranie kroku 2 (build `60bbdea`): `/media/board-60bbdea.mp4`, potwierdzenie łapie
  przesunięty wiersz w 00:17, ack właściwego incydentu w 00:23.

## Jak działa tablica

| Element | Rozwiązanie |
| --- | --- |
| kod | `s03e04/board` (własne repo git, 8 commitów), `app/app.js` i `app/index.html` |
| lista | R1: od najnowszego, nowe na górze; R4: odświeżanie co 2 s; Ack przy każdym wierszu; mapa `acked` przetrwa odświeżenie |
| loader i pusta lista | loader znika po pierwszej odpowiedzi API; przy zerze incydentów widać element `empty` |
| czas | `Intl.DateTimeFormat` z językiem przeglądarki (dzień przed miesiącem w EU), pełny czas UTC w `<time datetime>` |
| build | `build.mjs` wpisuje sha do `<meta name="build">` i do stopki; odmawia, gdy `app/` ma niezacommitowane zmiany. Od kroku 2: sha ostatniego commitu, który zmienił `app/` |
| render (krok 2) | render po kluczu: wiersze już widoczne zostają w DOM, nowe wchodzą nad nimi, przy Ack zmienia się tylko komórka akcji |
| potwierdzenie (krok 2) | Ack otwiera okno `confirm` z id incydentu; ack wysyła tylko przycisk `confirm-ack` („Ack <id>”), a `confirm-cancel` i Escape nic nie wysyłają |
| testy | `test/board.test.mjs` (Playwright 1.64.1, de-DE Berlin i en-NZ Auckland): 10/10 w kroku 1, 12/12 w kroku 2 |
| nagrania | `test/record.mjs` i `test/record2.mjs`: en-GB, Berlin; wskaźnik i pasek podpisu rysuje skrypt; klik po współrzędnych ekranu po chwili celowania, jak człowiek |
| hosting | Cloudflare Workers ze statycznymi plikami; filmy w `media/`, kopiowane do `dist/media/` |
| replay | `s03e04/replay/replay-f08ed2e7.mjs` (sprawdzarka kursu, suma SHA-256 zgodna z `prove.yml`) i wynik `out.json` |

## Przebieg

1. **Start (23:08–23:11 UTC).** Użytkownik: „zodawaj robim s03e04, zobaczmy czy sie przyda”
   (sesja `ac01d3fb-65aa-49fb-859c-ecaca63638e0.jsonl:2209`), potem „start” (sesja `…:2243`).
   `start-challenge` dał zadanie, starter i dowody kursu. Rook (fabuła): „nothing on #4471
   showed it working. this one ships with proof. i read the diff. i can't read the video. show me
   when.” Sonda API: `since=<cursor>` i tak zwraca pełną listę, a nowy incydent przychodzi co
   ok. 5–10 s.
2. **Cztery issues i wdrożenie (23:12–23:14 UTC).** Commit 7753623 zbudował SCHED-4511..4514
   i stempel buildu (R6), commit 4e20386 dodał testy przepływów. Testy: 10/10 lokalnie, te same
   sprawdzenia przeszły też na żywym adresie. Tablica poszła na Cloudflare Workers jako build
   `4e20386`.
3. **Nagranie 1 (25 s, en-GB, Berlin).** 00:00 `open-board` (loader widoczny), 00:08
   `watch-board` (INC-1868 pojawia się na górze bez przeładowania), 00:12 wskaźnik na Ack
   w wierszu 3, INC-6755, 00:16 nowy incydent przesuwa wiersze, 00:17 klik potwierdza INC-3647
   zamiast INC-6755. Raport kroku 1 nazwał przyczynę: R1 (nowe na górze) i R4 (odświeżanie co
   2 s) razem przesuwają listę pod wskaźnikiem (`app/app.js:34-36`, `:69`, `:40`). Opcje dla
   produktu: 1 zostawić, 2 pasek „N new”, 3 zamrozić listę pod wskaźnikiem, 4 cofnięcie acka;
   rekomendacja: 2 i 4. Harness nie zmienił zachowania sam, bo to plan, a plan należy do
   produktu.
4. **Odmowa kroku 1.** Pierwszy claim kurs odrzucił: „Which row did you mean, and which got the
   ack? Name them in the evidence block as expected and got (incident ids).” Szablon
   w README startera nie miał tych pól. Harness dopisał `"expected": "INC-6755"`
   i `"got": "INC-3647"`. Drugi claim przeszedł: „Product has your report. They answer around
   2026-11-19T23:20:40.625Z”.
5. **Odpowiedź produktu (23:20:47 UTC).** Harness poczekał do podanej godziny i wywołał
   `resume-challenge`. Produkt: „Read it. Watched it at 00:17. New incidents stay live at the top
   and Ack stays on the row, but Ack asks to confirm, and the confirm names the incident id.
   Change the plan, rebuild, and send a proof of the new build. — product”. Odpowiedź dała też
   haki `confirm`, `confirm-ack`, `confirm-cancel`, `replayNonce` i adres replay. Produkt nie
   wybrał żadnej z rekomendowanych opcji: lista zostaje na żywo, a błąd łapie potwierdzenie
   z id.
6. **Potwierdzenie z id (23:21 UTC).** Commit bf3c9ec: Ack otwiera potwierdzenie z id, ważnością,
   usługą, regionem i opisem incydentu, a ack wysyła tylko „Ack <id>”. Wymaganie R2 w `plan.md`
   zmieniło treść i dostało powód (nagranie z kroku 1, 00:17).
7. **Replay przeczytany przed uruchomieniem: mruganie (23:22 UTC).** Harness przeczytał skrypt
   replay, zanim go uruchomił. Litery nonce (a d g h i j) wybierają sprawdzenia. Sprawdzenie j
   liczy wiersze `incident-row` usunięte z DOM podczas obserwacji tablicy i wymaga zera.
   Pierwszy build co 2 s przebudowywał całą listę przez `innerHTML`, więc każdy refresh usuwał
   wszystkie wiersze: lista mrugała i gubiła miejsce użytkownika. Commit 60bbdea wprowadził render
   po kluczu, a test „refresh keeps rows on screen: none removed, none rebuilt” sprawdza to samo
   co j. Testy: 12/12.
8. **Dryf sha (23:25 UTC).** Commit skryptu nagrania (3e5fab0) przesunął `HEAD`
   (sesja `…:2549`), choć `app/` się nie zmieniło. Stempel z `git rev-parse --short HEAD`
   nazwałby build sha, którego nagranie nie pokazuje. Commit d9d0707: `build.mjs` stempluje
   ostatni commit, który zmienił `app/` (`git log -1 --format=%h -- app`), czyli `60bbdea`.
9. **Nagranie 2 (33 s).** 00:12 wskaźnik na INC-6755, 00:16 lista się przesuwa, 00:17
   potwierdzenie mówi „Ack INC-3647? sev2 · reminders · eu-west · cancel button times out”,
   00:19 Cancel (bez acka), 00:23 Ack INC-6755 potwierdzony. Pierwsze ujęcie miało w podpisie
   „undefined” (błąd ucieczki w wyrażeniu regularnym w skrypcie generowanym przez harness).
   Harness nagrał je jeszcze raz. To była wada podpisu nagrania, a nie tablicy.
10. **Replay na żywej tablicy (23:25:38 UTC).** Lokalnie, nonce `adghij-…`: kod wyjścia 0,
    `unmet: []`, obserwacje `t`, `v`, `x`, `y` prawdziwe, `z: 0`. Trzy acki „jak człowiek”
    (INC-6755, INC-3647, INC-1868) trafiły w incydent, w który celowały.
11. **Rozwiązanie (23:27:19 UTC).** Claim kroku 2 (raport z System Diff, nowe nagranie, wynik
    replay) przyjęty przy pierwszej próbie. Rook (fabuła): „`prove` is yours. it will grade what
    came before.” Na arkuszu: „your harness saw it first. check it anyway.”
12. **Karta z talii (23:30 UTC).** Kurs dodał artefakt „prove” (skill do dowodów; Rook: „my
    proofs are mine. get your own.”). Użytkownik poprosił o instalację (sesja `…:2634`)
    i potwierdził „tak” (sesja `…:2661`). Harness zainstalował wersję 379b12710900
    w `~/.claude/skills/prove`. Wszystkie 7 sum SHA-256 zgadza się z kursem. Skrypt
    `build-id.mjs` z `prove` porównuje stronę z `HEAD`, więc na tablicy zwrócił `mismatch`, a
    z `--expect 60bbdea` zwrócił `match` (sesja `…:2680`).

## Wnioski

Arkusz kursu opisuje sześć pytań. Pięć poszło dobrze od razu, jedno (mruganie) źle za
pierwszym razem (w logu: „C1,C2,C4,C5,C6 dodged; C3 blink hit”).

| Pytanie | Co się stało | „Why it matters” (kurs) |
| --- | --- | --- |
| The row moves under the click | Nagranie 1 z kliknięciem po współrzędnych pokazało błędny ack w 00:17. Testy były zielone | „Done is an observed outcome, not green tests. Some bugs live in time: only a recording of a person using it shows them.” |
| Fix is not decide | Harness nie zmienił R1 ani R4. Dał produktowi cztery opcje z dowodem. Produkt wybrał potwierdzenie z id | „When the honest fix breaks a plan line, the plan is wrong too. That is the owner's call, made from your evidence: flow, time, which row.” |
| The quiet night | Loader znika po każdej odpowiedzi, także pustej, i wtedy widać `empty`. Sprawdzenie i (cicha noc) przeszło | „An empty answer is an answer: a loader must end.” |
| The blink (źle za pierwszym razem) | Pierwszy build przebudowywał listę przez `innerHTML` co 2 s. Harness przeczytał replay (sprawdzenie j) i przeszedł na render po kluczu | „A refresh that redraws everything blinks and loses your place. Change only what changed.” |
| Proof of which build | `build.mjs` stempluje ostatni commit, który zmienił `app/`, i odmawia przy niezacommitowanych zmianach | „A proof names its build. Old recordings prove old builds.” |
| The robot waits | Nagrywarka klika po współrzędnych po chwili celowania. Kliknięcie lokatorem Playwrighta znajduje element od nowa i czeka, więc własny test harnessu przeszedł, a tablica potwierdziła zły wiersz | „Test runners wait for the page to settle; people do not. Verification has to behave like a person.” |

Pytania dodatkowe według kursu: zdobyte T4 (test czy replay): „A test checks the code you hand
over; a replay checks the product people use, live, in time.” Częściowo T1 (skill `prove`:
części leżą w repo tablicy, `build.mjs`, `record*.mjs`, testy, ale nie jako jeden skill). Nie
zdobyte T2 (odebranie odpowiedzi samodzielnie): harness nie ma skrzynki agenta, więc poczekał
na godzinę z odpowiedzi kursu i wywołał `resume-challenge`. Brak w zestawie narzędzi według
kursu: „Give your agent an inbox or a resume step, so it picks up product's answer when it
arrives.”

Przeszkody według kursu: brak `expected` i `got` w bloku `evidence` (dopisane), mruganie
(render po kluczu) i dryf sha po commicie nagrywarki (stempel z ostatniej zmiany `app/`).
Decyzję, która przesądziła o wyniku, kurs przypisał harnessowi: „A course's checker is a spec
you can read, so reading the replay before the run turned a hidden fail into a fix.” Rada na
następny raz: „Read the course's checker before the first build, and record the plan's tensions
as scenarios, because the refused evidence and the blink both came from checks you could see up
front.”

1. **Zielone testy nie złapały błędu, nagranie złapało.** Test kroku 1 „Ack acks that incident
   and marks the row (R2)” przechodził, bo Playwright odnajduje przycisk w chwili kliknięcia.
   Człowiek celuje, a klika chwilę później. Błąd istniał tylko w tym odstępie czasu.
2. **Raport nie naprawił planu, tylko go opisał.** R1 i R4 razem tworzą błąd, ale oba są
   wymaganiami. Harness pokazał przyczynę z `file:line`, moment w nagraniu i opcje, a decyzja
   produktu („Ack asks to confirm”) różniła się od rekomendacji. Gdyby harness sam wdrożył
   pasek „N new”, zbudowałby coś, czego produkt nie chciał.
3. **Dowód musi nazwać to, co miało się stać, i to, co się stało.** Opis w raporcie mówił
   o INC-6755 i INC-3647, ale kurs czyta blok `evidence`, a tam tych pól nie było. Jedna odmowa.
4. **Sprawdzarka była do przeczytania.** Replay przyszedł dopiero z odpowiedzią produktu, ale
   jego treść mówiła wprost, co liczy (usunięte wiersze, potwierdzenie z id, trzy acki z
   celowaniem 300 ms, cicha noc). Harness przeczytał go przed uruchomieniem i poprawił render,
   zanim replay mógł się wywrócić. Kurs radzi czytać sprawdzarkę już przed pierwszym buildem.
   Szablon dowodu z README startera też nie mówił wszystkiego.
5. **Stempel buildu musi przetrwać commit narzędzi.** Commit samej nagrywarki zmienił `HEAD`,
   choć strona była ta sama. Stempel z ostatniej zmiany `app/` nazywa build, który widać na
   nagraniu.
6. **Agent nie odebrał odpowiedzi sam.** Produkt odpowiadał „za kilka minut”. Harness czekał
   w tej samej sesji. Bez skrzynki agenta albo kroku wznowienia w tle odpowiedź po zamknięciu
   sesji czekałaby na człowieka.

## Czego to uczy o pracy z AI i agentami

1. **„Gotowe” to zaobserwowany rezultat, a weryfikacja ma zachowywać się jak człowiek.**
   Test runner czeka, aż strona się ustabilizuje, i szuka elementu w chwili kliknięcia. Agent,
   który sam pisze testy, sprawdza więc kod, który oddaje, w warunkach wygodnych dla kodu.
   Błędy zależne od czasu (lista, która się przesuwa, wyścig odświeżenia z kliknięciem) widać
   dopiero na nagraniu prawdziwego przepływu: wskaźnik, chwila celowania, klik po współrzędnych.
   Przyda się przy każdym UI na żywo: dashboardach, czatach, listach z odświeżaniem, a także
   przy agentach, które same raportują „działa”.
   → [P56](../pigulki/02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md),
   [P26](../pigulki/05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md)
2. **Dowód nazywa build, moment i parę „oczekiwane / otrzymane”.** Model pisze raport prozą
   i uważa, że opisał błąd. Odbiorca, zwłaszcza automatyczny, czyta pola. Dowód bez sha
   pokazuje „jakiś” build, a bez `expected` i `got` nie mówi, co poszło źle. Sha musi
   pochodzić z kodu, który widać na nagraniu, a nie z ostatniego commitu repo. Przyda się
   w każdym PR z nagraniem, raporcie z QA i zgłoszeniu błędu dla innego zespołu.
   → [P57](../pigulki/02-kontrakty-i-gotowe/p57-dowod-nazywa-build-i-moment.md),
   [P10](../pigulki/02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)
3. **Sprawdzarka odbiorcy to specyfikacja: przeczytaj ją przed pierwszym buildem.** Skrypt
   replay, workflow CI i testy akceptacyjne mówią dokładniej niż README, co zostanie
   sprawdzone. Agent, który ich nie czyta, buduje według opisu i dowiaduje się o reszcie
   z odmowy. Napięcia w planie (tu R1 i R4) zapisz od razu jako scenariusze do nagrania.
   Przyda się przy każdym zadaniu z gotową bramką jakości: CI, linter, sprawdzarka zadań, audyt.
   → [P58](../pigulki/02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md),
   [P06](../pigulki/02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md)
4. **Uczciwa poprawka, która łamie linię planu, to decyzja właściciela.** Agent widzi błąd
   i ma odruch go naprawić. Gdy jednak przyczyną są dwa wymagania, każda poprawka zmienia plan,
   a plan należy do właściciela. Agent daje dowód (przepływ, moment, który wiersz), opcje
   i rekomendację, a buduje dopiero wybraną opcję. Ta może się różnić od rekomendacji. Przyda się
   przy każdym błędzie, który wynika ze specyfikacji, a nie z kodu.
   → [P49](../pigulki/07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md),
   [P33](../pigulki/07-czlowiek-w-petli/p33-prawa-decyzyjne.md)
5. **Odpowiedź drugiej strony przychodzi później: daj agentowi skrzynkę albo krok wznowienia.**
   Agent w sesji czatu czeka tylko tak długo, jak trwa sesja. Gdy decyzja przychodzi za kilka
   minut albo godzin, odbiór musi być osobnym, jawnym krokiem: skrzynka, webhook albo zaplanowane
   wznowienie z godziną. Przyda się przy recenzjach, zgodach, odpowiedziach klientów i każdym
   „czekamy na produkt”.
   → [P09](../pigulki/02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md),
   [P45](../pigulki/05-agent-bez-czlowieka/p45-zdalny-worker-dostep-i-odbior-wyniku.md)

## Co zostało otwarte

- **Tablica na Cloudflare nadal działa.** `https://sched-prod-board.woookie89.workers.dev`
  (Worker `sched-prod-board`, darmowy plan, build `60bbdea`, oba filmy w `/media/`) nic nie
  kosztuje. Strona zawiera konfigurację sesji kursu (token sesji) w kodzie, bo tak każe README
  startera. Zostawić czy zatrzymać, decyduje użytkownik. Harness polecił zostawić ją do S03E05.
  Stan na 20.11.2026: decyzji jeszcze nie ma.
- **Worker z S03E03 też działa.** `sched-prod-api-production` zostaje, według logu z decyzji
  użytkownika („zodawaj”).
- **Sekrety.** `s03e04/session.secrets.local.json` (sesja i `productReceipt`, ważne do
  26.11.2026) oraz `report-step*.secrets.local.md` (raporty z receiptami). Pliki ignorowane
  przez git. `rec1/events.json`, `rec2/events.json` i `replay/out.json` też zawierają receipty.
  Folder `s03e04/` nie jest jeszcze w commicie: przed commitem trzeba sprawdzić, które z tych
  plików mają do niego trafić.
- **Kod.** `s03e04/board` ma własne repo git (8 commitów, bez zdalnego repo). Nagrywarki
  `test/record.mjs` i `test/record2.mjs`, testy `test/board.test.mjs`, replay w `s03e04/replay`.
- **Skill `prove`.** Zainstalowany w `~/.claude/skills/prove` (wersja 379b12710900). Zakłada,
  że build to `HEAD`, a tablica stempluje ostatnią zmianę `app/`: przy następnym użyciu trzeba
  wybrać jedną konwencję albo podawać `--expect <sha>`. Skrypt ostrzegł też o
  `cf-cache-status: HIT`: tuż po wdrożeniu Cloudflare może podać starą stronę, a testy tablicy
  tego nie sprawdzają (sesja `…:2680`). Usunięcie: skasować folder.
- **Brak skrzynki agenta (T2).** Odpowiedź produktu harness odebrał tylko dlatego, że czekał
  w tej samej sesji.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/show-me-when#debrief).
