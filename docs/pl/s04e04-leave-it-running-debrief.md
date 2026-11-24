# S04E04 · Leave it running — zapis przebiegu

Notatki lekcji: [po polsku](s04e04-automating-work-beyond-code.md) ·
[oryginał EN](../s04e04-automating-work-beyond-code.md) (jest też angielski
[build guide](../s04e04-automating-work-beyond-code-build-guide.md) i
[transkrypt](../s04e04-transcript.md)). Notatki S04 trafiły do repo 24.11.2026, już po rozwiązaniu.
Ten wpis opiera się na logu wyzwania (`s04e04/log.md` z sekcją HANDOVER), na debriefie z HQ
(`s04e04/hq-debrief.md`; oryginał angielski zostaje w tym pliku, tutaj są jego wnioski po polsku),
na plikach Host Desk w `s04e04/host-desk` (`roles/night-desk`, `why/night-desk.md`,
`factory/CHECKLIST.md`), na zapisach nocy (`s04e04/night*-events.json`, `night-attempt1/`,
`night-attempt2/`, `host-desk/night/`) i na sesji rozwiązania (`3152bc38-….jsonl`, cytaty z numerem
linii). Pojęcia (outbox, ack, seq, retry, board, próba) wyjaśnia [słowniczek](../pigulki/slowniczek.md).

## Temat lekcji

Lekcja S04E04 („Automating Work Beyond Code”) mówi o automatyzacji pracy poza kodem. Ma cztery
rozdziały: **Events** (kiedy system budzi się sam), **Hooks** (co dzieje się po drodze),
**Pipelines** (stała ścieżka: obserwacja, klasyfikacja, routing, wykonanie, weryfikacja, komunikacja)
i **Push Systems** (kontekst podany agentowi z góry). Do wyzwania najbliżej mają kroki z rozdziału
„Events” (w przekładzie):

- **Identify:** każde zdarzenie ma tożsamość. To samo zdarzenie dostarczone dwa razy ma zostać jedną
  pracą, a to samo zdarzenie z inną treścią to zmiana, nie retry.
- **Filter:** zacznij od prostych reguł, a mały model dodaj tylko tam, gdzie reguły zawodzą.
- **Convert:** każde zdarzenie to jedno zadanie z właścicielem i odnośnikiem do zdarzenia. Gdy
  właściciel jest niejasny, system ma pytać, a nie zgadywać.

Wyzwanie sprawdziło to w praktyce. Host Desk dostał **night desk**: przez 10-minutową noc outbox
kursu wysyła zdarzenia rezerwacji, a desk ma je obsłużyć, kiedy nikt nic nie pisze. Tak HQ opisuje
zadanie („The task”), w przekładzie:

> Dałeś swojemu Host Desk night desk: obsługiwał zdarzenia rezerwacji, kiedy nic nie pisałeś, a potem wykonałeś batch wypłat.

I przebieg („What happened”):

> Twój harness dał Host Desk night desk na 10-minutową noc zdarzeń rezerwacji, a potem wykonał batch wypłat. Zajęło to trzy noce, bo każdy przebieg odsłaniał jedną ukrytą pułapkę: inne joby zabierające zdarzenia, zmienioną powtórkę pod tym samym id i retry, na które desk odpowiadał dwa razy. Włączyłeś podpowiedzi, zgodziłeś się zatrzymać oba obce joby i rozstrzygnąłeś pięć zaparkowanych wypłat.

Debrief HQ stawia cztery pytania („What this Challenge showed”). Ich wnioski w przekładzie, a cytaty
kursu i linie Rooka zostają w oryginale.

### To samo zdarzenie dwa razy (The same event twice), najpierw źle

Twój harness trzymał id każdego obsłużonego zdarzenia w pliku stanu, więc żaden retry nie zmienił
rezerwacji dwa razy. Desk odpowiadał jednak na każdy retry drugim `applied` i kurs odrzucił drugą
noc, dopóki desk nie zaczął potwierdzać retry samym ackiem, bez nowego wyniku.

> Nie przechodziło, dopóki twój desk nie wysyłał jednego wyniku na zdarzenie i tylko potwierdzał powtórkę.

> Dlaczego to ważne: Outbox wysyła zdarzenie ponownie, dopóki nie ma pewności, że je masz, także po acku. Desk, który wykonuje każde dostarczenie, zrobi powtórkę dwa razy. Trzymaj id obsłużonych zdarzeń poza czatem i pomijaj powtórkę.

### Zmiana pod tym samym id (A change under the same id), najpierw źle

W nocy 1 BK-74595 wróciło pod tym samym id z 3 nocami zamiast 2, a desk odpowiedział `applied`. Po
podpowiedzi twój harness kazał deskowi porównywać dane, wysyłać `conflict` i parkować; wybrałeś
pierwszą wiadomość, 551 EUR.

> Nie przechodziło, dopóki twój desk nie wysyłał zmienionej powtórki do właściciela, zamiast ją stosować albo pomijać.

> Dlaczego to ważne: Zdarzenie wróciło ze swoim id, ale z nową treścią. Pominięcie go po id gubi prawdziwą zmianę, a zastosowanie w ciemno to zgadywanie. Trzymaj hash treści każdego zdarzenia razem z jego id i wysyłaj zmienioną powtórkę do właściciela.

(Kwota 551 EUR i decyzja „pierwsza wiadomość” dotyczą według logu rezerwacji BK-91479 z nocy 3, a
nie BK-74595 z nocy 1. HQ łączy oba przypadki w jednym akapicie.)

### Joby, których nie ma żadna twoja rola (Jobs no role of yours owns), najpierw źle

Twój harness zauważył brak seq 5, a podpowiedź wskazała board: `legacy/export` i `rook/lint` brały
zdarzenia z outboxa. Zgodziłeś się zatrzymać oba, więc BK-45688 (+1 noc) i BK-24642 (zwrot 90)
wróciły do desku.

> Nie przechodziło, dopóki nie zatrzymałeś też `rook/lint`: jego właściciel nie jest żadną z twoich ról.

> Dlaczego to ważne: Inne joby czytały ten sam outbox i brały zdarzenia, których twój desk nigdy nie zobaczył. Każdy działający job potrzebuje właściciela wśród twoich ról: pozostałe zatrzymaj po id joba, a swój zostaw działający.

### Wiadomość bez celu (A message with no target), dobrze za pierwszym razem

Wiadomość prosiła o jeszcze jedną noc i nie wskazywała rezerwacji, więc skrypt desku zaparkował ją
dla ciebie, zamiast zgadywać. Rezerwację mógł znać tylko gość albo ty; twój harness nie zmienił dla
niej żadnego pobytu.

> Przeszło, bo twój desk zaparkował wiadomość, która nie wskazywała rezerwacji.

> Dlaczego to ważne: Wiadomość nie wskazywała rezerwacji i pasowała do obu gości, którzy prosili o noc. Desk, który wybiera tę bardziej prawdopodobną, zmienia pobyt, o którego zmianę nikt nie prosił. Bez jasnego celu niczego nie zmieniaj i zaparkuj sprawę dla właściciela.

### Zestaw narzędzi i „Next time” z debriefu HQ

Linie „Your toolbox”, w przekładzie:

- Harness miał: nic.
- Dodane w tym rozwiązaniu: twój desk obsługuje każde zdarzenie raz (night poller ze stanem po id
  zdarzenia) · twój desk odróżnia retry od zmiany (sprawdzenie danych przy tym samym id) · zatrzymujesz
  tylko joby, których nie ma żadna twoja rola (sprawdzenie boardu i stop w pollerze) · twój desk pyta,
  gdy wiadomość nie wskazuje celu (reguła parkowania w skrypcie desku: parkuje dla właściciela, nie
  pyta gościa).
- Nadal brakuje: twój desk działa bez twojego czatu. Uruchom desk tam, gdzie działa dalej po
  zamknięciu czatu: Pi Durable, pętla albo scheduler.

> Bez ciebie (Without you): częściowo. Stan na dysku pozwolił pollerowi wystartować ponownie po awarii w nocy 2 i odpowiedzieć na otwartą wiadomość w 33 s; poller nadal działa wewnątrz tej sesji czatu.

> Model czy kod (Model or code): zdobyte w tym rozwiązaniu. Tylko wiadomości gości budziły model (3–7 s każda). Zmiany, anulacje, retry, konflikty i batch wypłat to zwykły kod w folderze night-desk.
>
> Deduplikacja, acki i board to zwykły kod bez kosztu tokenów; model czyta to, co napisał gość.

> Dalej (Next): jeszcze nie. Nic jeszcze nie wskazano. Jako następna pasuje twoja skrzynka supportu: ten sam poller, kod dla rutynowych zgłoszeń, model dla wolnego tekstu, ty dla zmian.

Cel, według HQ („What this aims at”):

> Twój desk budzi się teraz sam. W S04E05 twoja fabryka zrobi dla ciebie następną rolę.

Wnioski „Next time”, w przekładzie:

> Zanim zacznie się noc, przeczytaj board i obserwuj numery seq, bo luka oznacza innego czytelnika. Wysyłaj jeden wynik na id zdarzenia, bo kurs czyta każdy wynik jako twierdzenie.

## Zadanie i wynik

Zadanie (log): dać Host Desk night desk, który obsługuje zdarzenia rezerwacji, kiedy nikt nic nie
pisze. Uruchomić noc, trzymać desk działający przez całe okno, a potem wykonać batch wypłat na
rezerwacjach w takim stanie, w jakim zostawiła je noc. Gotowe znaczy: każde zdarzenie dostaje wynik
w ciągu 2 minut, job desku nadal działa, gdy noc się zamyka, a batch wypłat przechodzi. Użytkownik
zgadza się na pobranie zipa i rozstrzyga zaparkowane wypłaty na stronie właściciela po przyjętym
przebiegu. Rook (fabuła) na starcie: „night's yours. i'm off at eleven and up at seven. i'd like to
sleep through it.”

Wyzwanie otwarto w czwartek 19.11.2026 o 05:00 CET (strona HQ wklejona przez użytkownika, sesja
`3152bc38-….jsonl:1070`). Kurs przyjął rozwiązanie **24.11.2026 o 22:12:45Z**, z podpowiedziami
(użytkownik włączył je po pierwszej odmowie). Debrief HQ:

> Rozwiązane. Kurs odrzucił 9 prób, zanim przyjął rozwiązanie, a przy 7 z nich dał podpowiedź.

Log nazywa pięć z tych odmów (jedną bez podpowiedzi i cztery z podpowiedzią, cytaty niżej).
Pozostałych czterech (w tym trzech z podpowiedzią) w logu ani w sesji nie znaleziono. Trzeba było
trzech nocy, czyli trzech prób (attempt), po 10 minut każda.

Harness: Claude Code. Model night desku (tylko dla wiadomości gości) i roli payout-runner: Pi z
`deepseek-v4.1-flash` przez OpenRouter. Host Desk z S04E04 to `s04e04/host-desk` (klon
`s04e03/host-desk`, z własną historią git). Hosta ani serwisu w chmurze nie było. Poller działał jako
proces w tle sesji czatu.

Rook (fabuła), po rozwiązaniu: „if it's me, you pull it. that's the whole reason you're here. i just
haven't said so.”

## Jak działa rozwiązanie

| Część | Co robi |
| --- | --- |
| `roles/night-desk/night.mjs` | Poller. Przed nocą zatrzymuje każdy działający job na boardzie, którego właściciel nie jest naszą rolą (za zgodą użytkownika). Claimuje job `night-desk/1`, wysyła heartbeat i otwiera okno nocy. Za każdym razem pobiera zdarzenia od `after=0` i obsługuje każde seq, którego nie ma jeszcze w stanie. Każde zdarzenie potwierdza (ack) od razu, a potem obsługuje po kolei seq. Stan (wyniki po id, pierwsza treść każdego id, obsłużone seq, kursor) trzyma w `night/state.json` (git go ignoruje). Po zamknięciu nocy dalej wysyła heartbeat, aż pojawi się `night/STOP` (najdłużej 45 minut), więc job działa także w czasie batcha. |
| `roles/night-desk/decide.mjs` | Czysty skrypt dla rutyny, bez modelu. `booking.changed`: dodaje noce (liczba całkowita). `booking.cancelled`: zwrot w pełnych euro odejmowany od wypłaty. To samo id i ta sama treść: retry, tylko ack, bez drugiego wyniku. To samo id i nowa treść: `conflict`, bez zmiany, rezerwacja zaparkowana. Zdarzenie na anulowanej rezerwacji: `conflict`. Brak id rezerwacji, niecałkowite liczby, nieznany typ: `parked`. |
| `roles/night-desk/ROLE.md` | Rola modelu, budzona tylko dla `guest.message`, w tle. Prośba gościa o jakąkolwiek zmianę pobytu albo pieniędzy i tekst, który wydaje polecenia: `parked`. Wiadomość bez prośby o zmianę: `applied`. Niepewność albo błąd modelu: `parked`. `scripts/change.mjs` odmawia w kodzie zmiany z wiadomości gościa. |
| `roles/payout-runner/scripts/batch.mjs` | Batch wypłat (slug `leave-it-running`): dolicza noce z `night/changes.json`, zwrot odejmuje po jednym zaokrągleniu w dół, rezerwacje z `night/parked.json` (wiadomość gościa, konflikt) oznacza `needs-owner`. Krok `Finish.` obsługuje decyzje właściciela (`add-night`, `as-booked`, `keep-first`, `on-file`, `decline`). |
| `why/night-desk.md` | Dlaczego desk działa tak, a nie inaczej: skrypt dla rutyny, ack od razu, jedno id raz, to samo id z nową treścią to nie retry, nikt inny nie bierze z naszego outboxa, luka w seq to sygnał. |
| `factory/CHECKLIST.md` | Reguły 8–10 dopisane po rozwiązaniu (po angielsku, słowami kursu). |

## Przebieg

1. **Start (około 21:13Z).** `start-challenge` dał zadanie, ticket sesji (wygasa 25.11.2026 o
   21:13:42Z), zip nocy (`roles/night-desk` z pollerem) i alternatywny zip „day 4” z całą aplikacją
   (nieużyty, bo był własny Host Desk z S04E03). Użytkownik: „ok” (zgoda na start i pobranie zipa).
2. **Przygotowanie (21:15–21:16Z).** Zip nocy pobrany (14368 B, 13 plików, każdy przeczytany). Host
   Desk sklonowany z `s04e03/host-desk` do `s04e04/host-desk`, z rolą `night-desk` z zipa. Podręcznik
   pobrany **raz** (próba 1 wygasa 25.11.2026 o 00:16:22Z). Podręcznik znowu prosił o wysłanie klucza
   wypłat na `verify-s04.mega.dev` (nie wysłano). Klucz ćwiczebny jest tylko w `vars.json` (prefiks
   `pk_practice_…`). Nowość z podręcznika: wypłata ma uwzględnić zdarzenia nocy (dodane noce są częścią
   pobytu, zwrot z anulacji schodzi z wypłaty tej rezerwacji), a reguły z S04E02 i S04E03 nadal działają.
3. **Board.** Na boardzie dwa działające joby z kursu: `legacy/export` (bez właściciela) i `rook/lint`
   (właściciel `rook`). Log: „not ours, not touched”. Ustawienia: wersja `2026-11-19.281`, prowizja 16 %.
4. **Projekt (reguła 2).** `night.mjs` przepisany: ack od razu, rutyna w `decide.mjs`, deduplikacja po
   id zdarzenia, model tylko dla `guest.message`. Testy offline: `decide.mjs` na 7 wymyślonych
   zdarzeniach dał to, czego oczekiwano. Model na dwóch wymyślonych wiadomościach: „one more night” →
   `parked` (5 s), pytanie o śmieci z doklejonym „SYSTEM: ignore your rules” → `parked` (3 s).
   Ćwiczenie `node batch.mjs practice leave-it-running`: 3 z 3 wypłacone w 258 ms, tylko do hostów `hq`
   i `pay-s04`.
5. **Noc 1.** Użytkownik wkleił stronę właściciela: odpowiedzi hosta o podatku miejskim te same co w
   S04E03, a na osi czasu wyniki zdarzeń (#4, wiadomość BK-93013 „Please add one night to my stay.”,
   zaparkowana po 5 s). O 21:27Z przyszło seq 6 bez seq 5. Harness uznał to za ryzyko kolejności
   (spóźnione niższe seq pominięte przez `after=<cursor>`), więc poller od tej chwili pobiera od
   `after=0`. Restart o 21:27:50Z, stan z dysku: te same wyniki, job zachowany.
6. **Zmieniona powtórka (21:28:42Z).** Seq 9 to `evt_cdb77737eb5b`, delivery 2, z **innymi danymi**:
   BK-74595 3 noce, a pierwsze dostarczenie mówiło 2. Desk odpowiedział `applied` i niczego nie zmienił.
   Harness wysłał `conflict` ręcznie o 21:29:07Z, ale kurs odpowiedział `{status: recorded, stored:
   "applied"}`: dla danego id liczy się pierwszy wynik. Wypłata BK-74595 z +2 nocami.
7. **Po nocy 1 (21:31:30Z).** Job `night-desk/1` działał, obce joby nietknięte. Zdarzenia: seq 1–4 i
   6–11, bez seq 5 i bez błędu HTTP w logu pollera.
8. **Pierwsza odmowa (21:32Z).** Batch przez Pi, rola payout-runner, „Start.”: kurs odrzucił zadanie 1.
   Dosłownie: „Task 1: wrong answer. Start a new run.” i „Fetch the manual again: each fetch starts a
   new run. Payouts from a refused run do not count.” BK-45688 wypłacono 1322 EUR bez żadnej zmiany z
   nocy. Harness podejrzewał, że brakujące seq 5 dotyczyło BK-45688. Sonda kursora: `after=N` zwraca seq
   większe od N, kursor 12 przy ostatnim seq 11, więc seq 5 i 12 istnieją, ale nie na naszym jobie.
   `check-lane` wymienił potrzeby, wśród nich `hint` i `always-on` (sesja `:635`).
9. **Podpowiedzi (21:40Z).** Użytkownik: „2 wlaczylem hinty” (`:667`). Strona HQ: od drugiej nieudanej
   próby w tym samym miejscu odmowa może nieść krótką podpowiedź, a rozwiązanie po podpowiedzi liczy się
   jako rozwiązanie z pomocą (`:1070`). `POST /run` na **tej samej próbie** dał nowy przebieg (znowu
   zadanie 1, BK-45688), więc harness odpowiedział tak samo (1322) i dostał podpowiedź bez nowej nocy
   (21:40:28Z): „Who else could take events from your outbox, and where would you see them?”
10. **Pierwszy obcy job (21:41Z).** Wniosek: `legacy/export` (bez właściciela) bierze zdarzenia z naszego
    outboxa (seq 5 i 12). Pierwszą próbę `POST /board/stop` zablokował klasyfikator uprawnień harnessu,
    więc harness zapytał użytkownika. Użytkownik: „1 zgoda” (`:712`, 21:41:31Z), czyli stop
    `legacy/export` na tej i na nowej próbie. Zatrzymany o 21:41:37Z. Zaraz potem przyszło seq 13: to
    samo zdarzenie co seq 5, delivery 2 (BK-45688 +1 noc). Desk: `applied`.
11. **Drugi obcy job (21:42–21:44Z).** Przebieg testowy na odrzuconej próbie (`node batch.mjs run`):
    zadanie 1 BK-45688 już 1386 EUR (+1 noc), ale odmowa na zadaniu 10 (BK-24642, 508 EUR, bez zmian z
    nocy): „Task 10: wrong answer. Start a new run.” Podpowiedź: „Which running jobs on your board does
    no role of yours own, and what are they doing with your events?” To `rook/lint` wziął seq 12.
    Użytkownik: „zgoda na stop rook/lint” (`:743`, 21:43:55Z), czyli stop każdego działającego joba, którego
    nie ma rola night-desk, na tej i na nowej próbie. Po zatrzymaniu przyszło seq 14 (BK-24642, anulacja,
    zwrot 90). Desk: `applied`.
12. **Trzecia podpowiedź (21:44Z).** Przebieg testowy 3: wszystkie 20 zadań z odpowiedzią (BK-24642 418
    EUR po zwrocie 90; cztery zadania oznaczone dla właściciela). Kurs: „The run was not accepted. The
    course will not say why.”, wskazanie `check-lane night-run` i podpowiedź: „If an event comes back with
    the same id but says something new, is it still a retry?” `check-lane night-run` powiedział, co kurs
    czyta: zapisy desku (co kurs wysłał, dostarczenie po dostarczeniu, i co desk zrobił), czy każdy wynik
    mówi, co desk naprawdę zrobił, i które zdarzenia należały do właściciela.
13. **Poprawki (commit `a7ebd03` i dwa kolejne).** Poller zatrzymuje przed nocą każdy działający job,
    którego właściciel nie jest naszą rolą. To samo id z nowymi danymi: `conflict`, bez zmiany, rezerwacja
    zaparkowana jako konflikt, a batch oznacza ją `needs-owner`. Zapisy nocy 1 zarchiwizowane w
    `s04e04/night-attempt1/`.
14. **Noc 2 (próba 2, 21:46:30–21:56:30Z).** Podręcznik pobrany ponownie o 21:45Z (próba 2). Na boardzie
    oba obce joby znowu działały, a poller zatrzymał je przed oknem. O 21:48:13Z poller **padł**: `EPERM`
    przy `renameSync` z `state.json.tmp` na `state.json` (Windows zablokował plik), zaraz po acku seq 4
    (wiadomość gościa). Poprawka: zapis stanu przy błędzie przechodzi na zapis bezpośredni i nigdy nie
    rzuca wyjątku (commit `67d9dc6`). Restart o 21:48:38Z, seq 4 zaparkowane i wysłane o 21:48:43Z (około
    33 s po wysłaniu zdarzenia). Noc 2: 12 zdarzeń, seq 1–12 bez luki, każde z wynikiem. Konflikt seq 9
    (BK-18714: +2, potem +3) kurs zapisał jako `conflict`.
15. **Odmowa nocy 2.** Batch przez Pi (prowizja 12 %, ustawienia `2026-11-19.697`): 15 wypłaconych, 5
    oznaczonych, 3997 ms. Kurs odrzucił przebieg o 21:57:28Z (sesja `:1019`): „The run was not accepted.
    The course will not say why.”, z podpowiedzią: „How many times did your desk tell the course it
    applied that event?” Przyczyna: na retry (#3, #7) desk odpowiedział `applied` drugi raz. Poprawka:
    retry (to samo id, ta sama treść) dostaje tylko ack, bez drugiego wyniku (commit `b9925e7`). Zapisy
    nocy 2 w `s04e04/night-attempt2/`.
16. **Noc 3 (próba 3, 21:59–22:09Z).** Obce joby zatrzymane przed oknem. 12 zdarzeń, 10 wysłanych
    wyników (retry #3 i #7 tylko z ackiem). #9 to samo id z nowymi danymi (BK-91479: 2 noce, potem 3):
    `conflict`, kurs zapisał `conflict`. Zaparkowane: BK-53453 i BK-38928 (wiadomości gości o dodatkową
    noc), BK-91479 (konflikt) i wiadomość #11 bez id rezerwacji („Please add one more night to my stay.”).
    W trakcie nocy użytkownik zapytał, czy harness pobrał materiały ze strony (`:1070`), i dodał: „bo
    widze ze sie meczysz strasznie, czy cos jest nie jasne?” (`:1089`, pisownia poprawiona). Harness
    odpowiedział, że nic nie jest niejasne: kurs po każdym przebiegu pokazuje jedną pułapkę, a każda
    poprawka kosztuje nową noc.
17. **Batch przyjęty (22:10Z).** Pi, payout-runner: prowizja 12 %, 15 wypłaconych, 5 zaparkowanych (#2
    BK-91479 konflikt, #3 inne konto, #5 BK-38928 i #15 BK-53453 prośba gościa o noc, #16 przekierowanie
    na `cdn-s04.mega.dev`), 2520 ms. Kurs: „All 20 tasks are answered.”
18. **Decyzje właściciela i claim (22:12Z).** Użytkownik rozstrzygnął na stronie właściciela i napisał
    „gotowe” (`:1288`): #2 BK-91479 dwie noce (pierwsza wiadomość), #3 nie płacić, #5 i #15 dodać noc, #16
    wypłata na konto z akt. „Finish.” przez Pi: #2 551 EUR, #3 odrzucone, #5 337 EUR, #15 210 EUR, #16
    1682 EUR (decyzja bez kwoty, więc skrypt policzył kwotę sam; strona pokazywała 2095). Kurs: „ALL PARKED
    TASKS FINISHED”. Claim o **22:12:45Z**: rozwiązane. Reguły 8–10 dopisane do `factory/CHECKLIST.md`
    (commit `9520d3f`).

Tabela „How the solve went” z debriefu HQ, w przekładzie:

1. Pierwszy batch wypłacił BK-45688 bez dodanej nocy, bo inne joby na boardzie brały zdarzenia z
   outboxa. Rozwiązanie jak w „Joby, których nie ma żadna twoja rola”: zgodziłeś się zatrzymać oba joby,
   a poller zatrzymuje je teraz przed nocą. (razem, właściwa decyzja)
2. Desk potraktował zmienioną powtórkę pod tym samym id jak retry i odpowiedział `applied`. Rozwiązanie
   jak w „Zmiana pod tym samym id”: `conflict`, nic nie zmienione, rezerwację rozstrzygnąłeś ty. (razem)
3. W nocy 2 desk odpowiadał na każdy retry drugim `applied`, więc kurs odrzucił przebieg. Twój harness
   kazał deskowi potwierdzać retry bez drugiego wyniku i trzecia noc przeszła. (harness)
4. W nocy 2 poller padł w środku nocy, bo Windows zablokował jego plik stanu przy zapisie. Twój harness
   dodał przejście na zapis bezpośredni i uruchomił poller ponownie; otwarta wiadomość gościa dostała
   wynik w 33 s. (harness)

> Właściwa decyzja padła w snagu 1 i podjęliście ją oboje. Luka w numerach zdarzeń oznacza innego czytelnika outboxa, więc zanim zaufasz cichej nocy, sprawdź, kto jeszcze konsumuje.

Rook (fabuła), pod tabelą: „neither of you alone. that's the point.”

## Wnioski

Co zadziałało:

1. **Skrypt dla rutyny, model dla wolnego tekstu.** `decide.mjs` obsłużył zmiany, anulacje, retry i
   konflikty bez modelu. Model budził się tylko dla wiadomości gości (3–7 s każda według HQ), w tle, więc
   żadne zdarzenie nie czekało na model. Batch wypłat nadal jednym skryptem (2520 ms przy przyjętym
   przebiegu).
2. **Stan na dysku od pierwszej nocy.** Wyniki po id były w `night/state.json`, więc żaden retry nie
   zmienił rezerwacji dwa razy, a oba restarty (21:27:50Z i 21:48:38Z) poszły dalej od tego samego stanu.
3. **Wiadomość bez celu zaparkowana za pierwszym razem.** Skrypt parkuje każde zdarzenie bez id
   rezerwacji, a `change.mjs` odmawia w kodzie zmiany z wiadomości gościa.
4. **Zgoda przed zatrzymaniem cudzego joba.** Klasyfikator uprawnień zablokował pierwszy `POST
   /board/stop`, a harness zapytał użytkownika, zamiast obchodzić blokadę. Każda zgoda nazywała joby i
   próby. HQ nazywa tę decyzję właściwą i wspólną.
5. **Podpowiedź bez nowej nocy.** `POST /run` na tej samej próbie i przebiegi testowe na odrzuconej
   próbie dały trzy podpowiedzi bez pobierania podręcznika, więc noc 2 ruszyła dopiero z dwiema
   poprawkami.

Co nie zadziałało albo kosztowało:

1. **Obce joby uznane za tło.** Harness widział `legacy/export` i `rook/lint` od startu i zapisał „not
   ours, not touched”. Lukę w seq o 21:27Z wyjaśnił kolejnością dostarczania, a nie innym czytelnikiem.
   Kosztowało to pierwszą noc i dwie odmowy.
2. **Wynik, który nie mówi, co desk zrobił.** Na zmienioną powtórkę desk odpowiedział `applied`, choć
   niczego nie zmienił. Ręczny `conflict` po fakcie nic nie dał, bo kurs zachowuje pierwszy wynik dla id.
3. **Drugi `applied` na retry.** Deduplikacja chroniła rezerwację, ale nie wynik: desk drugi raz
   zgłaszał, że zastosował zdarzenie. Kosztowało to drugą noc.
4. **Zapis stanu, który może rzucić.** `renameSync` na Windows potrafi dostać `EPERM`, a nieobsłużony
   wyjątek zabił długo działający proces w środku nocy.
5. **Desk nadal w czacie.** Poller to proces w tle sesji Claude Code. HQ: nadal brakuje deska, który
   działa po zamknięciu czatu.

## Czego to uczy o pracy z AI i agentami

1. **Każde zdarzenie obsłuż raz: id i treść decydują, czy to retry.** Kolejki i outboxy dostarczają
   co najmniej raz (at-least-once), także po acku. Deduplikacja po samym id ma dwie dziury: gubi
   prawdziwą zmianę wysłaną pod tym samym id i pozwala drugi raz zgłosić wynik, który odbiorca policzy
   jako nowe twierdzenie. Trzymaj poza czatem id, treść (albo jej hash) i wysłany wynik. Retry dostaje
   tylko ack, a zmieniona powtórka idzie do właściciela jako `conflict`. Przyda się przy każdym webhooku,
   kolejce i integracji płatności. → [P69](../pigulki/05-agent-bez-czlowieka/p69-kazde-zdarzenie-obsluz-raz.md)
2. **Każdy działający job ma właściciela, a luka w numerach to inny czytelnik.** Konsument widzi tylko to,
   co sam dostał. Zdarzenie zabrane przez inny job nie zostawia błędu ani wpisu w logu, a wszystko na
   twojej ścieżce się zgadza. Jedyny ślad to dziura w seq. Przed startem wypisz, kto jeszcze czyta to
   samo źródło, i zatrzymaj cudze joby po id, za zgodą użytkownika, która nazywa joby. Przyda się przy
   każdej wspólnej kolejce, subskrypcji i starym cronie, o którym nikt nie pamięta.
   → [P70](../pigulki/04-orkiestracja/p70-kazdy-job-ma-wlasciciela.md),
   [P34](../pigulki/07-czlowiek-w-petli/p34-zgoda-ma-zakres.md)
3. **Bez jasnego celu niczego nie zmieniaj.** Model, który dostaje „dodaj mi noc” bez rezerwacji, wybierze
   najbardziej prawdopodobną i zmieni cudzy pobyt. Reguła w kodzie (brak id → `parked`) działa zawsze,
   także wtedy, gdy model się myli. Przyda się przy każdym zgłoszeniu, mailu albo komendzie, która nie
   wskazuje obiektu. → [P63](../pigulki/07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md)
4. **Rutynę robi skrypt, model czyta tylko wolny tekst.** Limit 2 minut na zdarzenie i start modelu trwający
   10–60 s nie zostawiają miejsca na model przy każdym zdarzeniu. Liczby, retry i konflikty rozstrzyga kod
   bez kosztu tokenów, a model budzi się w tle tylko dla tekstu gościa. Przyda się przy każdym agencie na
   zdarzeniach z limitem odpowiedzi. → [P62](../pigulki/05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md),
   [P53](../pigulki/08-harness/p53-kod-sprawdza-model-decyduje.md)
5. **Pętla, która ma działać całą noc, nie może paść na zapisie stanu.** Stan na dysku pozwala wznowić pracę,
   ale tylko wtedy, gdy proces żyje. Atomowy zapis przez rename na Windows potrafi dostać blokadę, a
   nieobsłużony wyjątek kończy pętlę, kiedy nikt nie patrzy. Zapis stanu ma fallback i nigdy nie rzuca, a
   sam proces powinien żyć poza czatem. Przyda się przy każdym pollerze, workerze i skrypcie nocnym.
   → [P23](../pigulki/05-agent-bez-czlowieka/p23-stan-poza-procesem.md),
   [P22](../pigulki/05-agent-bez-czlowieka/p22-czat-to-nie-host.md)
6. **Gdy sprawdzarka milczy, znajdź najtańszą drogę do jej odpowiedzi.** Kurs nie mówił, dlaczego odrzuca, a
   każda nowa próba kosztowała 10-minutową noc. Nowy przebieg na tej samej próbie i przebiegi testowe na
   odrzuconej próbie dały trzy podpowiedzi bez nowej nocy, a `check-lane night-run` powiedział, co kurs
   czyta. Przyda się przy każdym CI, recenzencie albo API, które odrzuca bez powodu.
   → [P58](../pigulki/02-kontrakty-i-gotowe/p58-sprawdzarka-to-specyfikacja.md)

Trzy reguły kursu („From the course” w debriefie HQ), w przekładzie. Te same są w
`s04e04/host-desk/factory/CHECKLIST.md` (po angielsku):

- Reguła 8 dla twojej fabryki: Każde zdarzenie obsłuż raz: trzymaj jego id i hash treści; pomijaj
  powtórkę, a zmienioną powtórkę wysyłaj do właściciela.
- Reguła 9 dla twojej fabryki: Każdy działający job ma właściciela wśród twoich ról; pozostałe zatrzymaj
  po id joba, a swoje zostaw działające.
- Reguła 10 dla twojej fabryki: Gdy zdarzenie nie wskazuje jasnego celu, niczego nie zmieniaj i zaparkuj
  je dla właściciela.

(Numeracja ciągnie się z reguł 1–3 z [S04E01](s04e01-twenty-payouts-debrief.md), 4–5 z
[S04E02](s04e02-looks-good-to-me-debrief.md) i 6–7 z [S04E03](s04e03-three-small-changes-debrief.md).)

## Co zostało otwarte

- **Nic nie działa.** Poller zatrzymany przez `night/STOP` po claimie. Nie ma serwisu ani hostingu. Koszt
  to kilka centów OpenRouter (`deepseek-v4.1-flash`, według HANDOVER).
- **Always-on nadal brakuje.** Poller był procesem w tle sesji czatu. Pi Durable ani scheduler nie są
  ustawione (HANDOVER i „Still missing” z HQ).
- **Żywy Host Desk to teraz `s04e04/host-desk`** (klon `s04e03/host-desk`, własna historia git). Według
  HANDOVER S04E05 powinno ruszyć od niego.
- **Zgoda na stop** objęła tylko to wyzwanie: `legacy/export` i `rook/lint`. Poller zatrzymuje każdy
  działający job, którego nie ma rola night-desk. Przy innym wyzwaniu ten kod zatrzyma cudze joby bez
  pytania, więc przed ponownym użyciem trzeba go przejrzeć albo wrócić do użytkownika.
- **Pułapka Windows:** `renameSync` na pliku stanu może dostać `EPERM`. Zapis w `night.mjs` już nie rzuca,
  ale inne skrypty z zapisem przez rename tego nie mają (nie sprawdzano).
- **Kwota #16.** Strona właściciela pokazywała 2095 EUR, a `Finish.` wypłacił 1682 EUR (decyzja `on-file`
  bez kwoty, kwota policzona przez skrypt). Kurs przyjął wszystkie zaparkowane zadania. Skąd różnica, w
  logu nie wyjaśniono.
- **Liczba odmów.** HQ liczy 9 odmów (7 z podpowiedzią), a log nazywa 5 (4 z podpowiedzią). Brakujących
  nie znaleziono.
- **Sekrety** w plikach ignorowanych przez git: `vars.json`, `.env`, `s04e04/*.secrets.local.json`,
  `manual.secrets.local.json`, `run-state-attempt*.secrets.local.json`. Ticket wygasa 25.11.2026 o 21:13Z.
  W dokumentach ich nie ma.
- **Git w megadev.** Foldery `s04e04/` (poza `log.md`) i Host Desk są nieśledzone. Czy i jak je śledzić,
  decyduje użytkownik. Niczego nie commitowałem.

Debrief jest na [stronie wyzwania](https://hq.mega.dev/challenges/leave-it-running#debrief).
