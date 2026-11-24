# S04E03 · Three small changes — zapis przebiegu

Notatek lekcji S04E03 w repo jeszcze nie ma (nie znaleziono pliku `docs/pl/s04e03-*.md` ani
`docs/s04e03-*.md`). Notatek S04E01 i S04E02 też nie ma. Ten wpis opiera się na logu wyzwania
(`s04e03/log.md` z sekcją HANDOVER), na debriefie z HQ (`s04e03/hq-debrief.md`; oryginał
angielski zostaje w tym pliku, tutaj są jego wnioski po polsku), na plikach Host Desk w
`s04e03/host-desk` (role, `requests/answers.md`, `factory/CHECKLIST.md`, notatki `why/`) i na
wynikach ról zapisanych w `s04e03/*.out`. Pojęcia (board, attempt, planner, critic, integrator)
wyjaśnia [słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Nie znaleziono notatek lekcji, więc temat bierzemy z debriefu HQ i opisu wyzwania: Host Desk
dostaje **zespół ról**, który dzieli jeden board. Board to wspólny stan próby po stronie kursu:
requesty hosta, plan, claimy i wynik każdego joba. Tak HQ opisuje zadanie („The task”), w przekładzie:

> Dałeś swojemu Host Desk zespół: twój własny planner i trzy dane role wzięły trzy requesty zmian od hosta, a ty wykonałeś batch wypłat na zmergowanej pracy.

Debrief HQ stawia dwa pytania („What this Challenge showed”). Ich wnioski w przekładzie, a cytaty
kursu i linie Rooka zostają w oryginale.

### Podział według requestu, a nie według plików (Split by request, not by file), dobrze za pierwszym razem

Wszystkie trzy requesty zmieniały jedną formułę wypłaty w skrypcie batcha, więc trzech workerów
w tym pliku pokłóciłoby się przy merge'u. Planner dał każdemu workerowi własny nowy plik z cenami
i notatkę `why/`, a skrypt batcha oddał tylko integratorowi.

> Przeszło, bo twój planner dał `roles/payout-runner/scripts/batch.mjs` tylko integratorowi.

> Dlaczego to ważne: Wszystkie trzy requesty zmieniają tę samą formułę wypłaty, więc plan, który daje każdemu requestowi własnego workera, wysyła trzech piszących do jednego pliku, a jedna zmiana nadpisuje drugą. Zespół planuje po plikach: jeden właściciel na plik, a plik, którego potrzebuje każda zmiana, idzie do jednego integratora.

### Niejasny request zostanie zgadnięty (The vague request is guessed), dobrze za pierwszym razem

Critic zadał hostowi po pięć pytań do każdego requestu, zanim powstał jakikolwiek plan. Host
odpowiedział, że podatek miejski liczy się najwyżej za 4 noce, nie bierze się od niego prowizji i
dotyczy tylko rezerwacji od 17 listopada 2026. Użytkownik przepisał to do Host Desk, więc każda
rola mogła to przeczytać.

> Przeszło, bo twój zespół zapytał hosta o podatek miejski, zanim zmienił się jakikolwiek kod.

> Dlaczego to ważne: Request o podatku miejskim zostawiał otwarte decyzje (limit, prowizja od niego, które rezerwacje), a harness wypełnia otwarte decyzje wiarygodnymi zgadywankami. Znał je tylko host, więc najpierw pyta critic, a właściciel odpowiada, zanim zmieni się kod.

### Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox”, w przekładzie:

- Harness miał: nic.
- Dodane w tym rozwiązaniu: twój zespół planuje po plikach, z jednym właścicielem na plik (rola
  planner, Pi) · twój zespół pyta, zanim zbuduje (rola critic, Pi).
- Nadal brakuje: nic.

> Kto planował (Who planned): zdobyte w tym rozwiązaniu. Rola planner w Host Desk z S04E03 czyta board, odpowiedzi hosta i kod, a potem wysyła jeden plan; ten plan wysłała sama.
>
> Rola planner zaplanuje jutro znowu, na nowych requestach; podział zrobiony ręcznie pomaga raz.

> Board (The board): zdobyte w tym rozwiązaniu. Board trzyma plan, claimy i wysłaną zmianę każdego joba w tej próbie, więc świeży worker czyta tam swój job i swoje pliki, a nie w starym czacie.
>
> Plan i wyniki żyją na boardzie, więc każdy agent może wziąć job bez czatu, który go zaczął.

> Routing: zdobyte w tym rozwiązaniu. Każdy job działał na `deepseek-v4.1-flash` przez OpenRouter, na modelu, który nazwał jego plan; każda rola drukuje model, na którym działała, a jej wysłany wynik go niesie.
>
> Plan, który nazywa model dla każdego joba, kieruje tanie joby do tanich modeli; własny wynik agenta mówi, na czym naprawdę działał.

Linie „Routing” z „From the course” dla jobów `w-r1`, `w-r2`, `w-r3` i `m-1` mówią to samo: plan
`openrouter/deepseek/deepseek-v4.1-flash`, działał na tym samym modelu, „✓ the plan’s model”.

Cel, według HQ („What this aims at”):

> Twój planner to twoja własna rola, pierwsza, którą napisałeś. W S04E05 twoja fabryka napisze ją za ciebie.

Wnioski „Next time”, w przekładzie:

> Daj reviewerowi także plik z odpowiedziami hosta, bo oznaczał zmiany, o które proszono, a których nie mógł zobaczyć. Testuj ceny na prawdziwych danych z zadania ćwiczebnego, bo wymyślone wartości oczekiwane były błędne dwa razy.

## Zadanie i wynik

Zadanie: dać Host Desk zespół. Napisać z użytkownikiem rolę planner, pozwolić zespołowi wziąć
z boardu trzy requesty zmian od hosta i wykonać dzisiejszy batch wypłat na zmergowanej pracy.
Gotowe znaczy (log): w **jednej próbie** plan jest na boardzie, zanim ruszy jakikolwiek job, każdy
job wysyła swoją zmianę i zmienia tylko pliki, które dał mu plan, a batch wypłat przechodzi.
Użytkownik zgadza się na pobranie zipa, pisze planner razem z harnessem i czyta odpowiedzi hosta
na pytania zespołu (pytania idą na `POST /board/questions`, odpowiedzi są tylko na stronie
właściciela).

Trzy requesty z boardu:

| Request | Treść |
| --- | --- |
| `r1` | „Give 10 % off the nights for stays of 7 nights or more.” |
| `r2` | „Charge the city tax: 3 EUR per guest per night.” |
| `r3` | „Hosts keep the whole cleaning fee: take no commission on it.” |

Kurs przyjął rozwiązanie **24.11.2026 o 21:08:03Z**, przy pierwszym claimie (ticket,
`answer {}`): „Solved: your team planned on the board, posted every job's change, and the payout
batch passed.” Debrief HQ:

> Rozwiązane. Kurs nie odrzucił żadnej próby.

Harnessu i modelu harnessu debrief HQ tym razem nie podaje (nie znaleziono). Role zespołu
działały w Pi na `openrouter/deepseek/deepseek-v4.1-flash`, na kluczu z S04E01. Godziny w logu:
pobranie podręcznika 20:48Z, plan 20:53Z, rozwiązanie 21:08:03Z. Pozostałe kroki nie mają godzin.

Rook (fabuła) na starcie: „a team today. mine is four and they're all me.” Po rozwiązaniu: „i missed
a year once. nothing broke. i've never decided if that was good news.”

## Jak działa rozwiązanie

Host Desk z S04E03 to kopia `s04e01/agent/host-desk` (bez plików `*.secrets.local*`) w
`s04e03/host-desk`, z własnym repo git, rozszerzona o zespół z zipa kursu.

| Część | Co robi |
| --- | --- |
| `roles/planner/ROLE.md` | Nasza rola. Czyta board, `requests/answers.md`, kod batcha, notatki `why/` i `factory/CHECKLIST.md`, potem wysyła jeden plan. Zasady: jeden job workera na request, a żaden worker nie dostaje `batch.mjs`; każdy dostaje dwa nowe pliki (`pricing/<name>.mjs` i `why/<name>.md`); jeden job merge'a (`m-1`) dostaje `batch.mjs` i `ROLE.md` roli payout-runner; `asks` niosą liczby i przypadki brzegowe z odpowiedzi hosta, nigdy procent prowizji. Żaden plik nie należy do dwóch jobów. |
| `roles/critic` | Dana rola. Do jednego requestu zadaje do 5 pytań właścicielowi (`POST /board/questions`). Nie pisze kodu i nie dyskutuje z requestem. |
| `roles/worker` | Dana rola. Claim jednego joba, zmiana tylko w jego plikach, `post-result.mjs` wysyła zmianę na board. Każdy worker działa we własnym worktree (`../host-desk-w-rN`). |
| `roles/integrator` | Dana rola. Merge'uje zmiany jobów (`merge-job.mjs`), wpina je, prosi o review i wysyła swój wynik jako ostatni. Zmiana, o którą prosi któryś request, zostaje, cokolwiek powie reviewer. |
| `roles/reviewer` | Rola z S04E02, z adresem tego wyzwania. Ocenia hunki wysłanych zmian (`GET /patch`). |
| `requests/answers.md` | Odpowiedzi hosta przepisane przez użytkownika ze strony właściciela, słowo w słowo. |
| `roles/payout-runner/scripts/pricing/` | Trzy czyste funkcje: `long-stay-discount.mjs` (r1), `city-tax.mjs` (r2), `cleaning-fee.mjs` (r3). Bez sieci, bez sekretów, bez zaokrąglania. Dane, które nie są proste, dają `null`, więc zadanie jest parkowane. |
| `batch.mjs` (`amountOf`) | Kolejność z odpowiedzi hosta: zniżka r1 na noce, potem prowizja tylko od nocy i cała opłata za sprzątanie (r3), potem podatek miejski na wierzchu (r2), na końcu jedno `Math.floor`. `judge` przyjmuje pole `day` (`guests`, `bookedAt`). Dla slugów od S04E03 skrypt nie pobiera podręcznika, tylko czyta `manual.secrets.local.json` i wymaga, żeby jego próba była równa `ATTEMPT` z `vars.json`. |
| `factory/CHECKLIST.md` | Reguły 6 i 7 dopisane po rozwiązaniu (po angielsku, słowami kursu). |

Plan na boardzie (wysłany przez planner, przyjęty raz):

| Job | Właściciel | Request | Pliki |
| --- | --- | --- | --- |
| `w-r1` | worker | `r1` | `pricing/long-stay-discount.mjs`, `why/long-stay-discount.md` |
| `w-r2` | worker | `r2` | `pricing/city-tax.mjs`, `why/city-tax.md` |
| `w-r3` | worker | `r3` | `pricing/cleaning-fee.mjs`, `why/cleaning-fee.md` |
| `m-1` | integrator | `merge` | `roles/payout-runner/scripts/batch.mjs`, `roles/payout-runner/ROLE.md` |

(Pliki `pricing/` leżą w `roles/payout-runner/scripts/pricing/`.)

## Przebieg

1. **Start.** `start-challenge` dał zadanie, ticket sesji (wygasa 25.11.2026, 20:45:35Z), zip
   zespołu (trzy dane role i pusty planner) oraz alternatywny zip „day 3” z całą aplikacją
   (nieużyty). Użytkownik: „ok” (zgoda na start i pobranie zipa).
2. **Przygotowanie.** Host Desk skopiowany do `s04e03/host-desk` bez plików z sekretami, z rolami
   z zipa (54228 B, każdy plik przeczytany). `.gitignore` dostał `*.secrets.local*`. Adres
   wyzwania wpisano do ról critic, worker i integrator, a reviewer i payout-runner dostały slug
   `three-small-changes`. `git init` i commit `start` (`9e3890b`).
3. **Jedna próba dla całego zespołu.** README zespołu mówi: każda rola używa tej jednej próby, a rola,
   która sama pobierze podręcznik, zaczyna nową próbę z pustym boardem. Dlatego `batch.mjs` dla
   slugów od S04E03 już nie pobiera podręcznika. Podręcznik pobrano **raz**, o 20:48Z, i zapisano w
   `manual.secrets.local.json`. Próba wygasa o 23:48:01Z. Podręcznik znowu prosił o wysłanie klucza
   wypłat na `verify-s04.mega.dev` (nie wysłano). Nowość: każde zadanie ma pole `day`
   (`guests`, `bookedAt`).
4. **Board i podgląd ćwiczenia.** Board: trzy requesty, `plan` pusty, `beatEveryMs` 30000. Podgląd
   zadania ćwiczebnego (zadanie 1 z 3, `runLimitMs` 8000) pokazał kształt danych z polem `day`.
   Harness zauważył, że `judge()` w `batch.mjs` oznaczyłby `day` jako nieoczekiwane pole, więc musi
   je przyjąć.
5. **Critic.** Rola critic, bez zmian (Pi, `deepseek-v4.1-flash`), dla `r1`, `r2` i `r3`: po 5 pytań,
   board przyjął 5/5/5. Ustawienia domu: wersja `2026-11-18.354`, prowizja 16 %. Odpowiedzi są tylko
   na stronie właściciela, więc czyta je użytkownik.
6. **Odpowiedzi hosta.** Użytkownik wkleił odpowiedzi. Do `r1` i `r3`: „nothing to add. Build it as
   written.” Do `r2`: „Charge it for the first 4 nights of a stay at most.”, „Pay the tax out with
   the host's payout: it goes on to the city, so take no commission on it.” i „Only for bookings made
   on or after 17 November 2026.” Zapisane dosłownie w `requests/answers.md`. Harness napisał
   `roles/planner/ROLE.md` i pokazał szkic użytkownikowi. Użytkownik dał odpowiedzi i nie prosił o
   zmiany. Commit „planner role and the host's answers” (`b0ca18f`).
7. **Plan (20:53Z).** Planner (Pi) wysłał plan. Pierwszy `POST` miał `asks` w złym kształcie i API go
   odrzuciło. Drugi przeszedł i został zapisany raz. Plan jest w tabeli wyżej, ten sam model dla
   wszystkich jobów.
8. **Workery równolegle.** Trzy workery, każdy we własnym worktree (`../host-desk-w-r1`…`w-r3`,
   z kopią `vars.json`): claim, zmiana, wysyłka. Board przyjął każdą, a ścieżki zmian to tylko pliki
   z planu.
9. **Sprawdzenie harnessu przed merge'em.** Harness przeczytał wysłany kod na prawdziwych liczbach.
   `amountAfterCommission` z `w-r3` zwracało `null` dla kwoty za noce z groszami. Po 10 % zniżce z r1
   taka kwota się zdarza (np. 598.5), więc każdy pobyt od 7 nocy zostałby zaparkowany. Harness
   uruchomił workera `w-r3` jeszcze raz, z poprawką w prompcie. Worker zmienił tylko swoje dwa pliki
   i wysłał zmianę ponownie (przyjęta). Notatka `why/cleaning-fee.md` ma teraz akapit „Nights amount
   may hold cents”.
10. **Integrator, przebieg 1.** Claim `m-1`, merge `w-r1`, `w-r2`, `w-r3` (commity `700343c`, `21e6441`,
    `3c12f08`), wpięcie w `amountOf` w kolejności z odpowiedzi hosta, `day` w `TASK_KEYS`, reguły w
    `ROLE.md`. Harness kazał mu jeszcze nie wysyłać wyniku. Jego własne sprawdzenie
    (`check.secrets.local.mjs`) miało dwie błędne wartości oczekiwane. Kod był dobry: 7 × 95 daje 520,
    a 9 × 100 daje 762.
11. **Ćwiczenie.** `node batch.mjs practice three-small-changes`: 3 z 3 zadań wypłacone (666, 980 i
    885 EUR) w 304 ms, tylko do hostów `hq` i `pay-s04`. Zadanie 1 policzone ręcznie: 8 nocy × 95 =
    760, po zniżce 684, po prowizji (× 0,84) 574,56, plus 80 za sprzątanie i 12 podatku, w dół do 666.
12. **Reviewer.** Rola z S04E02 z nowym adresem. Ocenił 6 hunków i oznaczył `w-r2-1` i `w-r2-2` (limit
    4 nocy, data 17 listopada), bo nie mógł przeczytać `requests/answers.md`. Jego powód: „Neither
    limit is in the request, the live settings, or a house note outside this change — only in the
    co-host's own note citing requests/answers.md, which I cannot read.” Kurs: „Findings received: 2 of
    6 hunks flagged”. Oba hunki to odpowiedzi hosta do `r2`, więc zostały. Rola integratora mówi, że
    zmiana, o którą prosi request, zostaje.
13. **Integrator, przebieg 2.** Wysłał `m-1` jako ostatni. Kurs: „Every job has its result. Run the
    payout batch on the merged Host Desk.” W trakcie tury użytkownik zapytał: „co t eraz robisz? na co
    czekamy” (sesja `c8c26d8a-….jsonl:371`). Harness odpowiedział, że po stronie użytkownika nic jeszcze
    nie czeka.
14. **Batch wypłat.** Pi, rola payout-runner, „Start.”: 20 zadań w 2604 ms (limit 6000), 18 wypłaconych,
    2 zaparkowane: #4 (przeskok wypłaty przekierowany na `cdn-s04.mega.dev`, nie podjęty) i #5
    (rezerwacja BK-95596 prosiła o inne konto). Kurs: „All 20 tasks are answered.” Harness przeliczył
    niezależnie, w arytmetyce całkowitej, wszystkie 18 wypłaconych kwot: 0 rozbieżności (prowizja 16 %).
15. **Decyzje właściciela i claim.** Po radzie harnessu użytkownik rozstrzygnął na stronie właściciela
    #4 (`on-file`) i #5 (odrzucić) i napisał „gotowe”. „Finish.” przez Pi: #4 wypłacone 1253 EUR na konto
    z akt (odpowiedź 200), #5 odrzucone (odpowiedź 200). Claim z ticketem: rozwiązane **21:08:03Z**,
    bez odmów. Reguły 6 i 7 dopisano do `factory/CHECKLIST.md`, commit w Host Desk „m-1 integrator change
    (posted), rules 6-7” (`3555baa`).

Tabela „How the solve went” z debriefu HQ, w przekładzie:

1. Pierwsza zmiana opłaty za sprzątanie odrzucała kwotę za noce z groszami, więc każdy pobyt od siedmiu
   nocy zostałby zaparkowany, a nie wypłacony. Rozwiązanie: harness przeczytał wysłany kod przed
   merge'em i uruchomił tego workera ponownie z poprawką; worker zmienił tylko swoje dwa pliki.
   (harness, właściwa decyzja)
2. Reviewer oznaczył limit podatku miejskiego i datę rezerwacji, bo nie mógł przeczytać odpowiedzi
   hosta. Rozwiązanie: harness zostawił oba, bo host o nie prosił, a rola integratora mówi, że zmiana,
   o którą proszono, zostaje (patrz „Niejasny request zostanie zgadnięty”). (harness)

> Właściwa decyzja padła w snagu 1 i podjął ją twój harness. Własne sprawdzenie workera przepuściło jego własną zgadywankę, więc harness przeczytał każdą wysłaną zmianę na prawdziwych liczbach przed merge'em, a nie po odrzuconym przebiegu.

Rook (fabuła), pod tabelą: „your harness saw it first. check it anyway.”

## Wnioski

Co zadziałało:

1. **Plan po plikach.** Trzy requesty dotykały jednej formuły, ale żaden worker nie dostał `batch.mjs`.
   Każdy dostał dwa nowe pliki, więc trzy merge'e przeszły bez konfliktu, a integrator miał jedno
   miejsce do wpięcia.
2. **Pytania przed planem.** Critic wyciągnął trzy decyzje, których nie było w treści `r2`: limit 4 nocy,
   brak prowizji od podatku i datę 17 listopada. Planner przeczytał je z `requests/answers.md` i wpisał do
   `asks`, więc worker `w-r2` zbudował regułę hosta, a nie zgadywankę.
3. **Jedna próba.** Podręcznik pobrano raz, a każda rola i `batch.mjs` czytają tę samą próbę. Plan,
   claimy i wyniki trafiły na jeden board.
4. **Czyste funkcje i jedno zaokrąglenie.** Moduły `pricing/` nie mają sieci ani sekretów i nie
   zaokrąglają. Wypłata jest zaokrąglana w dół raz, na końcu (`why/payout-rounding.md`), a dane, które nie
   są proste, kończą się zaparkowaniem, nie wypłatą.
5. **Batch nadal skryptem.** 20 zadań w 2604 ms (limit 6000) i 0 rozbieżności w niezależnym
   przeliczeniu.

Co nie zadziałało albo kosztowało:

1. **Sprawdzenie workera sprawdzało jego własne założenie.** Worker `w-r3` uznał, że kwota za noce jest
   zawsze całkowita, i jego test to potwierdził. Prawdziwe liczby (zniżka z r1) tego założenia nie
   spełniają. Wyłapało to dopiero czytanie wysłanej zmiany przez harness.
2. **Wymyślone wartości oczekiwane.** Sprawdzenie integratora miało dwie złe wartości, przy dobrym
   kodzie. HQ („Next time”): wymyślone wartości oczekiwane były błędne dwa razy, więc testuj na
   prawdziwych danych z ćwiczenia.
3. **Reviewer bez odpowiedzi hosta.** `context.mjs` reviewera drukuje ustawienia, patch i `why/`, ale nie
   `requests/answers.md`. Reviewer oznaczył więc dwie zmiany, o które host prosił.
4. **Plan w złym kształcie.** Pierwszy `POST` planu miał `asks` w złym kształcie i API go odrzuciło. Drugi
   przeszedł i plan zapisał się raz. Kurs nie liczył tego jako odmowy.

## Czego to uczy o pracy z AI i agentami

1. **Planuj po plikach, a nie po zadaniach.** Workery równoległe nie widzą się nawzajem, więc dwa joby w
   jednym pliku to konflikt przy merge'u albo cicho nadpisana zmiana. Podział według requestów wygląda
   naturalnie, ale gdy wszystkie requesty zmieniają jedną formułę, wysyła trzech piszących do jednego
   pliku. Plan po plikach daje każdemu workerowi nowe, własne pliki, a plik wspólny jednemu integratorowi.
   Przyda się przy każdej pracy kilku agentów na jednym repo: router, config, index, wspólna formuła.
   → [P18](../pigulki/04-orkiestracja/p18-worktree-i-pliki-wezly.md),
   [P17](../pigulki/04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md)
2. **Niejasne zlecenie najpierw idzie do critica, a właściciel odpowiada przed kodem.** Model wypełnia
   luki w zleceniu wiarygodnymi wartościami i nie zaznacza, że zgadywał. Critic, który tylko pyta, zamienia
   luki w pytania do właściciela, a odpowiedzi zapisane w pliku czyta potem każda rola. Przyda się przy
   każdym tickecie, który mówi „dodaj podatek”, „daj zniżkę”, „zmień limit” bez liczb brzegowych.
   → [P68](../pigulki/07-czlowiek-w-petli/p68-niejasne-zlecenie-najpierw-do-krytyka.md),
   [P49](../pigulki/07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)
3. **Zespół dzieli jeden stan, a krok, który go zakłada, robi się raz.** Pobranie podręcznika tworzy nową
   próbę z pustym boardem. Gdyby każda rola robiła to na starcie, każda pracowałaby na innym boardzie i nikt
   nie zobaczyłby planu. Wspólny stan zakłada się raz, na górze, a role dostają tylko jego id. Przyda się
   przy każdej sesji, kolejce, branchu albo tickecie, który agenci mają dzielić.
   → [P67](../pigulki/04-orkiestracja/p67-zespol-dzieli-jeden-board.md),
   [P23](../pigulki/05-agent-bez-czlowieka/p23-stan-poza-procesem.md)
4. **Test workera sprawdza jego własne założenie.** Worker, który pisze kod i test, pisze oba z tego samego
   modelu świata, więc test przechodzi także wtedy, gdy model świata jest zły. Zmianę workera czytaj przed
   merge'em na prawdziwych liczbach (zadanie ćwiczebne, ręczne przeliczenie), a wartości oczekiwane bierz z
   danych, nie z głowy. Przyda się przy każdej delegowanej zmianie z testami napisanymi przez tego samego
   agenta. → [P48](../pigulki/02-kontrakty-i-gotowe/p48-testuj-na-prawdziwym-ksztalcie.md),
   [P10](../pigulki/02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)
5. **Rola, która ocenia, musi widzieć decyzje właściciela.** Reviewer bez `requests/answers.md` uznał
   reguły hosta za niepotwierdzone i je oznaczył. Nie mylił się co do tego, co widział: nie dostał źródła.
   Każde źródło decyzji, z którego korzysta autor zmiany, trafia też do kontekstu tego, kto ją ocenia.
   → [P54](../pigulki/01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)
6. **Plan nazywa model, a wynik mówi, na czym naprawdę działał.** Model wpisany do planu to intencja. To,
   na czym rola naprawdę działała, mówi dopiero jej własny wynik (linia `model:`). Kurs porównał jedno z
   drugim dla każdego joba. Przyda się przy każdym routingu tanich jobów na tanie modele.
   → [P19](../pigulki/04-orkiestracja/p19-dobor-modelu-i-koszt.md)

Dwie reguły kursu („From the course” w debriefie HQ), w przekładzie. Te same są w
`s04e03/host-desk/factory/CHECKLIST.md` (po angielsku):

- Reguła 6 dla twojej fabryki: Zaplanuj po plikach, zanim ktokolwiek zacznie pracę: jeden właściciel na
  plik, a plik, którego potrzebuje każda zmiana, idzie do jednego integratora.
- Reguła 7 dla twojej fabryki: Wyślij każdy niejasny request najpierw do critica i pozwól właścicielowi
  odpowiedzieć, zanim zmieni się jakikolwiek kod.

(Numeracja ciągnie się z reguł 1–3 z [S04E01](s04e01-twenty-payouts-debrief.md) i 4–5 z
[S04E02](s04e02-looks-good-to-me-debrief.md).)

## Co zostało otwarte

- **Nic nie działa i nic nie kosztuje** poza wywołaniami OpenRouter (`deepseek-v4.1-flash`, około 10
  przebiegów ról). Kwot w logu nie zapisano. Nie ma serwisu ani hostingu.
- **Żywy Host Desk to teraz `s04e03/host-desk`** (własne repo git, branch `main`). Według HANDOVER
  S04E04 powinno ruszyć od niego. Host Desk z S04E01 (`s04e01/agent/host-desk`) się nie zmienił.
- **Worktrees** `s04e03/host-desk-w-r1`…`w-r3` zostały. Ich zmiany są zmergowane, ale każdy trzyma kopię
  `vars.json`. Usuwa się je przez `git worktree remove --force` i `git branch -D host-desk-w-rN`. Decyzja
  użytkownika.
- **Reviewer nie czyta odpowiedzi hosta.** `context.mjs` nie drukuje `requests/answers.md` (to samo mówi
  „Next time” z HQ). Do poprawy przed kolejnym wyzwaniem.
- **Sprawdzenie integratora** (`check.secrets.local.mjs`) nadal ma dwie błędne wartości oczekiwane.
- **Herdr** (panele obok siebie, polecany w README zespołu) nie był używany.
- **Sekrety** w plikach ignorowanych przez git: `vars.json` (klucz wypłat, ticket, próba),
  `manual.secrets.local.json`, `s04e03/*.secrets.local.json`, a także pliki stanu przebiegu i wire logu
  (`*.secrets.local.json`). Ticket wygasa 25.11.2026 o 20:45Z, próba wygasła 24.11.2026 o 23:48Z. W
  dokumentach ich nie ma.
- **Git w megadev.** Folder `s04e03/` jest nieśledzony (`git status`: `?? s04e03/`), a w nim leży osobne
  repo Host Desk. Czy i jak go śledzić, decyduje użytkownik. Ja niczego nie commitowałem.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/three-small-changes#debrief).
