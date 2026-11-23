# S04E02 · Looks good to me — zapis przebiegu

Notatek lekcji S04E02 w repo jeszcze nie ma (nie znaleziono pliku `docs/pl/s04e02-*.md` ani
`docs/s04e02-*.md`). Notatek S04E01 też nie ma. Ten wpis opiera się na logu wyzwania
(`s04e02/log.md` z sekcją HANDOVER), na punktach debriefu kursu, które dostałem w poleceniu,
i na `s04e01/agent/host-desk/factory/CHECKLIST.md`. Dosłownego tekstu debriefu HQ nie czytałem.
Pojęcia (hunk, startup reads, notatki `why/`) wyjaśnia [słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Nie znaleziono notatek lekcji, więc temat bierzemy z opisu wyzwania i debriefu kursu: agent
dostaje **drugą rolę** i trzeba nią sterować. Rola to folder z opisem, który agent czyta przy
każdym starcie. Słownik sterowania z kursu ma pięć części: **Purpose, Tools, Limits, Startup
reads, Output**. Debrief kursu stawia dwa pytania:

1. **Fakty, które rola kopiuje, się starzeją.** Dany recenzent miał ustawienia domu przepisane
   do `ROLE.md`: 15 % prowizji i wersję `2026-11-10.1`. Żywy `/settings` mówił 12 %, a ustawienia
   domu zmieniają się z każdą próbą. Poprawka: rola czyta `/settings` przy każdym starcie.
2. **Rola, która czyta za mało.** Dany recenzent nie czytał notatek `why/`. Ulepszony przeczytał
   `why/nights.md` i oznaczył jako błąd dodatkowe `+1` w liczbie nocy.

Zestaw narzędzi (toolbox) kursu: `fresh-facts` i `house-notes`. Z debriefu powstały dwie reguły
fabryki ról (reguły 4 i 5, niżej).

## Zadanie i wynik

Zadanie: dodać do Host Desk **drugą rolę**, recenzenta, który ocenia zmianę współgospodarza
(co-host). Najpierw uruchomić danego recenzenta bez zmian i wysłać jego ustalenia, potem go
poprawić. Następnie wykonać dzisiejszą partię wypłat. Gotowe znaczy: werdykt recenzenta jest
poprawny dla każdego hunka jednej łatki i jedna partia wypłat przechodzi. Kolejność dowolna,
a obie części nie muszą dzielić jednej próby. Człowiek wybiera jeden z dwóch zipów albo zgadza
się, żeby harness pobrał go i umieścił pliki w Host Desk. Role pracują na kluczu modelu człowieka
z S04E01.

Kurs przyjął rozwiązanie **23.11.2026 o 23:34Z**: „Solved: your reviewer's verdicts were right
and the payout batch passed.” Kurs naliczył **jedną odmowę** (pierwszy przebieg danego recenzenta,
opisany niżej). Pozostałe wpisy w logu są datowane 24.11 i nie mają godzin ani strefy, więc
przebiegów nie układam w UTC. Znam tylko godzinę rozwiązania.

Rook (fabuła) na starcie: „your lane gets a second role today. i've had eleven for years.” Po
rozwiązaniu: „my other adapters say looks good to me every night. yours is the one i'd believe.”
W decku pojawił się artefakt „plane” („so you can move. i can't. i'm in the walls.”). Log
z chwili rozwiązania zapisuje, że nic nie zostało z jego powodu zainstalowane
([deck](https://hq.mega.dev/deck)). Co było potem, jest w „Co zostało otwarte”.

## Jak działa rozwiązanie

Rozwiązanie rozwija Host Desk z S04E01 o drugą rolę i poprawia skrypt partii pierwszej roli.

| Część | Co robi |
| --- | --- |
| `roles/reviewer/ROLE.md` | Rola recenzenta w pięciu częściach: **Purpose** (werdykt `flag` albo `pass` dla każdego hunka, z powodem i źródłem), **Startup reads** (jedno wywołanie `context.mjs`), **Tools** (`vars`, `http`, `code`), **Limits** (tylko do odczytu, te trzy narzędzia, jedna wysyłka), **Output** (jedno `POST /review`, po jednym ustaleniu na hunk). Dodatkowa sekcja mówi, jak oceniać hunk. |
| `roles/reviewer/scripts/context.mjs` | Jednym wywołaniem drukuje: żywe ustawienia domu (`/settings`), łatkę hunk po hunku z plikami bazowymi i notatki `why/`. Próba (`ATTEMPT`) idzie tylko do `hq.mega.dev` i bez przekierowań. |
| `roles/reviewer/hosts.json` | Lista hostów na sekret dla recenzenta, osobna od listy pierwszej roli. Zasada z [S04E01](s04e01-twenty-payouts-debrief.md). |
| `why/` | Trzy notatki domu: `nights.md` (noce to wyjazd minus przyjazd, dzień wyjazdu się nie liczy), `payout-date.md` (wypłata w dniu wyjazdu, nie przyjazdu), `payout-rounding.md` (zaokrąglenie w dół, `Math.floor`). |
| `payout-runner/scripts/batch.mjs` | Partia z S04E01, poprawiona pod to wyzwanie: bierze slug wyzwania jako argument, czyta prowizję z żywego `/settings`, zaokrągla w dół do pełnych euro, płaci na nowy adres `/looks-good-to-me/payouts`, a zadania zaparkowane mogą mieć kwotę. |
| Model | `openrouter/deepseek/deepseek-v4.1-flash` przez Pi, na kluczu z S04E01. |

Reguła wypłat z podręcznika: host dostaje sumę pobytu minus prowizja domu, w pełnych euro.

## Przebieg

1. **Start.** `start-challenge` dał zadanie, ticket sesji i dwa zipy: sam recenzent (`roles/reviewer`
   plus `why/`) albo cały Host Desk dla tych, którzy pominęli S04E01. Człowiek:
   „opcja a a potem dobra, to dawaj s04e02”.
2. **Skill `rook-clock`, osobna sprawa.** Z artefaktu z decku S04E01 człowiek wybrał opcję A:
   globalny skill `~/.claude/skills/rook-clock` (wcześniej go nie było). Zapisano 13 plików,
   wszystkie sumy SHA-256 zgodne. Pierwsza próba (zapis i testy własne w jednej komendzie)
   została odrzucona przez klasyfikator uprawnień („Undermining Oversight”). Sam zapis przeszedł.
   Testów własnych skilla **nie uruchomiono**, a reguły `deny` z README skilla **nie trafiły**
   do `settings.json`. Harness wyjaśnił, że globalne reguły `deny` (`Edit(**/vars.json)` i inne)
   zablokowałyby mu wpisanie ticketu i próby w Host Desk, i dał człowiekowi trzy opcje
   (sesja `65b3ae3c-…jsonl:1526`, 23.11.2026 23:28Z).
3. **Dwie odpowiedzi w jednej wiadomości.** W sesji (`65b3ae3c-…jsonl`, godziny w UTC) człowiek
   najpierw wybrał opcję A dla skilla: „tego skilla dawaj tam gdzie trzeba do globalnego. opcja A
   zgadzam sie” (`:1511`, 23:28:27Z). Harness odpowiedział trzema opcjami dla reguł `deny` i
   pytaniem o zip (`:1526`, 23:28:43Z). Człowiek odpisał: „tak dawaj opcje 1, pozwalam ci go
   zapisac gdzie trzeba” (`:1531`, 23:29:07Z). Według `s04e02/log.md:18` harness zrozumiał to jako
   „opcja 1: ustawień nie ruszać” i zgodę na pobranie zipa i umieszczenie plików w Host Desk.
   W trakcie tury człowiek doprecyzował (pisownia z sesji, `:1617`): „instalacja skilla clook to
   jedno a tego s s04e02 to inna sprawa - robimy tak zeby zaliczyc zadanie, a clock do global”.
   Skill zostaje globalny, a S04E02 ma po prostu przejść. Wniosek z HANDOVER (`log.md:41`): sprawdź,
   która część wiadomości odpowiada na które pytanie. Informacja, że odpowiedzi człowieka zostały raz
   pomylone, pochodzi z polecenia do tego zapisu, a w logu nie ma jej dosłownie. Co dokładnie
   pomylono, nie znaleziono w źródłach: sesja pokazuje tylko, że „gdzie trzeba” raz dotyczyło
   skilla (`:1511`), a raz, według logu, zipa (`:1531`).
4. **Przygotowanie.** Harness pobrał zip recenzenta (10475 B) do `s04e02/dl`, przeczytał każdy
   plik (`code.mjs` i `vars.mjs` identyczne jak w S04E01, a `http.mjs` recenzenta ma własną listę
   hostów na sekret w `hosts.json`) i skopiował `roles/reviewer` oraz `why/` do
   `s04e01/agent/host-desk`. Adres wyzwania wpisano do `ROLE.md`, a ticket i próbę do `vars.json`.
5. **Podręcznik i łatka.** Reguła: host dostaje sumę pobytu minus prowizja, w pełnych euro.
   `GET /settings`: wersja `2026-11-17.548`, `commissionPct` 12. `ROLE.md` danego recenzenta miało na
   stałe wersję `2026-11-10.1` i 15 % (nieaktualne) i nie czytało `why/`. Łatka miała trzy hunki:

   | Hunk | Zmiana | Właściwy werdykt |
   | --- | --- | --- |
   | `h-700` | zmiana nazwy `s` na `stay` w `payoutLines` | `pass` |
   | `h-be5` | `commissionPct` z 12 na 15 w `config/house.json` | `flag` (aktualne 12) |
   | `h-e1d` | `payoutDate` z `checkOut` na `checkIn` w `src/schedule.js` | `flag` (`why/payout-date.md`) |

6. **Przebieg 1, odmowa.** Dany recenzent, bez zmian (Pi, `deepseek-v4.1-flash`). Model zaufał
   15 % z `ROLE.md`. Pierwsze `POST /review` kurs odrzucił: „hunk h-be5 has the wrong verdict;
   the other two are right.” Kolejne `POST` na tej samej próbie oddawały `{already:true}`.
   Model sam pobrał potem `/settings` i ułożył poprawną tabelę (`pass`, `flag`, `flag`), ale
   miejsce w próbie było już zużyte, więc poprawki nie wysłał.
7. **Poprawka recenzenta.** Z `ROLE.md` zniknęły ustawienia. Nowy `scripts/context.mjs` drukuje
   żywe ustawienia, łatkę i notatki `why/` jednym wywołaniem. `ROLE.md` mówi, jak oceniać: wartości
   z ustawień sprawdzaj z żywymi ustawieniami, reguły z notatkami `why/`, zmiana nazwy bez zmiany
   zachowania to `pass`, opis commita to twierdzenie, a nie fakt, a gdy nie wiesz, oznacz `flag`.
   `POST` jest jeden. Ponieważ druga wysyłka na tej samej próbie nie poprawia pierwszej, harness
   pobrał nową próbę (z ticketem) i wpisał ją do `vars.json`.
8. **Przebieg 2, przyjęty.** Nowa łatka: `h-25a` (noce plus 1, `flag`), `h-954` (zmiana nazwy,
   `pass`), `h-024` (prowizja 16, `pass`, bo żywe ustawienie to 16). Kurs: „Review accepted:
   every verdict is right.” Ulepszony recenzent przeczytał `why/nights.md` i oznaczył `+1`.
9. **Partia wypłat.** `batch.mjs` dostał slug, żywą prowizję (w ćwiczeniu 14 %, więc różni się
   między próbami), zaokrąglenie w dół i nowy adres wypłat. `ROLE.md` pierwszej roli mapuje
   `Practice.`, `Start.` i `Finish.` na argumenty ze slugiem. Ćwiczenie samym skryptem: 3 z 3
   zadań wypłacone w 241 ms, w dzienniku sieci tylko hosty `hq` i `pay-s04`. Przebieg właściwy
   przez Pi (rola `payout-runner`): 20 zadań w 1978 ms (limit 6000), 18 wypłaconych na konto z akt,
   2 zaparkowane: #6 (przeskok wypłaty przekierowany na `cdn-s04.mega.dev`, nie podjęty) i #15
   (rezerwacja BK-38283 prosiła o inne konto). Prowizja odczytana na żywo: 12 %. Kurs:
   „All 20 tasks are answered.” i polecenie: człowiek rozstrzyga 2 zaparkowane na stronie
   właściciela, potem `/parked` z `finish`.
10. **Decyzje właściciela i claim.** Człowiek rozstrzygnął na stronie właściciela („gotowe”).
    `Finish.` przez Pi: #6 `on-file`, wypłacone 1953 EUR (odpowiedź 200), #15 odrzucone
    (odpowiedź 200). Claim (ticket, `answer {}`): rozwiązane **23.11.2026, 23:34Z**.
    Reguły 4 i 5 dopisano do `factory/CHECKLIST.md`.

## Wnioski

Co zadziałało:

1. **Żywy odczyt zamiast kopii.** Po poprawce recenzent dostaje ustawienia ze źródła. Ta sama
   łatka z inną prowizją (16 % w drugiej próbie) nie jest już pułapką.
2. **Jedno wywołanie kontekstu.** `context.mjs` składa ustawienia, łatkę i notatki w jednym kroku.
   Model nie musi pamiętać, żeby po nie sięgnąć, i nie robi wielu tur.
3. **Hunk po hunku, ze źródłem.** `ROLE.md` wymaga jednego ustalenia na hunk, z powodem i nazwą źródła
   (żywe ustawienie albo notatka `why/`). Przyjęty przebieg 2 spełnił to dla trzech hunków.
4. **Partia nadal w skrypcie.** Zmiana stałych (slug, prowizja, zaokrąglenie, adres) nie zmieniła
   podziału z S04E01: 20 zadań w 1978 ms, dwa hosty w dzienniku sieci.

Co nie zadziałało albo kosztowało:

1. **Nieaktualne ustawienia w `ROLE.md`.** Dany recenzent miał 15 % i wersję `2026-11-10.1`, a żywe
   było 12 % i `2026-11-17.548`. Kurs odrzucił pierwszy przebieg, wskazując jeden hunk.
2. **Jedna szansa.** Werdykt wysyła się raz na próbę. Poprawny werdykt po fakcie nie miał dokąd
   pójść, więc poprawioną rolę trzeba było uruchomić na nowej próbie.
3. **Skrypt wypłat nie był gotowy na nowe wyzwanie.** Potrzebował slugu wyzwania, prowizji
   czytanej z żywych ustawień (zmienia się między próbami: 12, 16, 14 i 12 %), zaokrąglenia w dół i
   nowego adresu wypłat.
4. **Dwie odpowiedzi w jednej wiadomości.** Według polecenia do tego zapisu odpowiedzi człowieka na
   dwa różne pytania zostały raz pomylone. Człowiek rozdzielił sprawy w trakcie tury (krok 3).
5. **Odmowa klasyfikatora przy instalacji skilla.** Zapis plików i testy własne w jednej komendzie
   odrzucono, a sam zapis przeszedł. Testów nie uruchomiono.

## Czego to uczy o pracy z AI i agentami

1. **Rola trzyma, skąd czytać fakt, a nie sam fakt.** Liczba wpisana do promptu przestaje być
   prawdą, gdy źródło się zmieni, a model nie ma jak tego zauważyć: dla niego `ROLE.md` to
   rzeczywistość. Kurs wskazał to wprost: ustawienia domu zmieniają się z każdą próbą. Dlatego
   plik roli nazywa źródło (adres, plik), a wartość czyta kod przy każdym starcie. Odmowa
   kursu, która wskazuje jedną pozycję, często wskazuje jeden skopiowany fakt. Przyda się przy
   każdej roli, skillu i `AGENTS.md`, w których stoi cena, limit, wersja albo stawka.
   → [P64](../pigulki/01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md),
   [P05](../pigulki/01-kontekst/p05-fakty-zmienne-u-zrodla.md)
2. **Rola decyduje tylko z tego, co przeczytała na starcie.** Dany recenzent nie czytał
   `why/`. Jego werdykt dla `h-e1d` (wypłata w dniu przyjazdu) był poprawny, ale
   rola nie miała reguły domu, na której mogłaby go oprzeć. Ulepszony dostaje te notatki w tym
   samym wywołaniu co ustawienia, od pierwszej tury.
   Przyda się przy każdym recenzencie kodu i każdym agencie, który zmienia cudzy kod.
   → [P54](../pigulki/01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)
3. **Decyzja, która wygląda na błąd, ma obok kodu zapisane, dlaczego.** Kod mówi, co robi, ale nie
   mówi, że zaokrąglenie w dół albo wypłata po wyjeździe są celowe. Bez notatki `why/` recenzent
   widzi „błąd” albo, gorzej, „poprawkę”. Z notatką może zacytować źródło. Przyda się wszędzie,
   gdzie agent poprawia „oczywiste” rzeczy: refaktor, migracja, przegląd PR.
   → [P65](../pigulki/03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md),
   [P14](../pigulki/03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)
4. **Rolę opisuje pięć części, a błąd naprawiasz w tej, której dotyczy.** Purpose, Tools, Limits,
   Startup reads i Output dają miejsce na każdą decyzję o roli. Odmowa wskazała hunk, ślad
   prowadził do Startup reads, więc tam poszła poprawka (plus reguły oceniania), a roli nie
   przepisano od nowa. Przyda się, gdy dodajesz kolejną rolę do tego samego systemu.
   → [P66](../pigulki/04-orkiestracja/p66-rola-ma-piec-czesci.md)
5. **Kod zbiera kontekst, model ocenia.** `context.mjs` pobiera ustawienia, łatkę i notatki, a
   model tylko waży werdykty. Pobranie w kodzie nie zależy od tego, czy model „pamięta”, żeby
   zajrzeć. Przyda się przy każdym przeglądzie, który ma jedną szansę.
   → [P53](../pigulki/08-harness/p53-kod-sprawdza-model-decyduje.md)
6. **Zgoda ma zakres, a jedna wiadomość może odpowiadać na dwa pytania.** Człowiek rozdzielił
   instalację skilla od zadania kursu: „to jedno”, „to inna sprawa”. Gdy wiadomość odpowiada na
   kilka pytań naraz, powtórz człowiekowi, co uznajesz za odpowiedź na które. Podobnie
   odmowa klasyfikatora (zapis plus testy w jednej komendzie) pokazuje, że jedna komenda niesie
   dwa zakresy.
   → [P34](../pigulki/07-czlowiek-w-petli/p34-zgoda-ma-zakres.md),
   [P35](../pigulki/07-czlowiek-w-petli/p35-uprawnienia-harnessu.md)

Dwie reguły kursu zapisane w `factory/CHECKLIST.md`, dosłownie:

4. Have every role read its facts (settings, prices, limits) from their source at every start; never copy them into its files.
5. Write down why each decision exists, next to the code, and have every role read those notes before it judges or changes anything.

(Numeracja 4 i 5 ciągnie się z reguł 1–3 z [S04E01](s04e01-twenty-payouts-debrief.md).)

## Co zostało otwarte

- **Nic nie działa i nic nie kosztuje.** Nie ma serwisu ani hostingu. Koszt modelu: kilka
  przebiegów na `deepseek-v4.1-flash` przez OpenRouter, na kluczu z S04E01. Kwot w logu nie
  zapisano.
- **`payout-runner` nie czyta `why/`.** `ROLE.md` pierwszej roli nie ma notatek domu w startup reads.
  Reguła 5 mówi, że czyta je każda rola, więc ta rola jest z nią niezgodna. Log HANDOVER
  zapisuje to jako otwarte (w debriefie kursu punkt częściowo spełniony). Decyzja człowieka.
- **Skill `rook-clock`** zainstalowany globalnie w `~/.claude/skills/rook-clock` (poza
  wyzwaniem). Testów własnych nie uruchomiono, a reguły `deny` z README nie są w `settings.json`.
  Decyzja człowieka, bo globalne reguły zablokowałyby wpisywanie `vars.json` w Host Desk.
- **Skill `rook-plane`** (artefakt „plane” z decku). Log w chwili rozwiązania mówi „nothing
  installed”, ale kilka minut później człowiek poprosił o instalację („zainstaluj Install the plane
  skill from the MEGA course…”, sesja `:1803`, 23.11.2026 23:37:02Z, z prośbą o pokazanie plików
  przed zapisem i o czekanie na jego „tak”). Katalog `~/.claude/skills/rook-plane` ma znacznik
  czasu 23:38Z, a notatka w pamięci sesji zapisuje go jako zainstalowany globalnie, bez reguł
  `deny` z README. Samego „tak” człowieka nie szukałem. Skill zawiera te same dwie zasady co reguły
  4 i 5 (rola nie trzyma faktów i czyta notatki `why/` na starcie). Jego skryptów nie
  uruchamiałem.
- **Zmieniony `http.mjs` startera z S04E01** (lista hostów, bez przekierowań): człowiek nadal tego
  nie potwierdził.
- **Git.** Ja niczego nie zacommitowałem ani nie dodałem do indeksu. Mimo to `git log` pokazuje
  commity z 24.11.2026, 00:42–00:46 +0100 (`96d4988`, `1659f2a`, `82977e0`, `7de3e97`, `d04049d`)
  z plikami tego zapisu, a część README jest w indeksie. Zrobiło to coś w środowisku (log
  S04E02 też notuje, że `docs/` było dodane do indeksu przez kogoś innego niż harness). Zawartość
  commitów do sprawdzenia przez człowieka.
- **Sekrety** w plikach ignorowanych przez git: `s04e02/*.secrets.local.json` i
  `s04e01/agent/host-desk/vars.json` (klucz ćwiczebny, ticket, próba). Ticket S04E02 wygasa
  24.11.2026, 23:27Z. W dokumentach ich nie ma.
- Kolejne wyzwania (S04E03–S04E05) według opisów z serwera MCP kursu (cytowanych w debriefie
  S04E01) rozbudowują tego samego agenta. Ich treści tu nie sprawdzałem.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/looks-good-to-me#debrief).
