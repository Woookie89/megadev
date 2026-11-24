# P70 · Każdy działający job ma właściciela wśród twoich ról: luka w numerach zdarzeń znaczy, że czyta ktoś jeszcze

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S04E04

> **Lekcje:**
>
> - S04E04 · Automatyzacja pracy poza kodem → rozdział „Eventy” — [po polsku](../../pl/s04e04-automating-work-beyond-code.md#eventy) · [oryginał EN: „Events”](../../s04e04-automating-work-beyond-code.md#events)
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)
>
> S04E04 radzi, żeby każde zdarzenie przychodziło jednym wejściem i stawało się jednym zadaniem z właścicielem, a gdy właściciel jest niejasny, żeby system pytał. S02E04 mówi, że w zespole agentów nawet najprostsze działania łatwo na siebie zachodzą i ze sobą kolidują, i radzi, żeby agenci zamiast sięgać do zasobów bezpośrednio szli do agenta, który nimi zarządza.

**Zasada.** Zanim agent zacznie brać pracę ze wspólnego źródła (outbox, kolejka, board,
subskrypcja), sprawdź, kto jeszcze z niego bierze. Każdy działający job musi mieć właściciela
wśród twoich ról. Job bez właściciela albo czyjś inny zatrzymaj po id joba, za zgodą użytkownika, a
swój zostaw działający. Luka w numeracji zdarzeń (seq) to sygnał, że zdarzenie poszło do innego
czytelnika, a nie szum.

**Dlaczego.** Konsument widzi tylko to, co sam dostał. Zdarzenie zabrane przez inny job do niego
nie dochodzi: nie ma błędu HTTP ani wpisu w logu, a noc wygląda na cichą. Wszystko, co liczysz na
swojej ścieżce, się zgadza, a brakujące zmiany wychodzą dopiero w wyniku (tu: w złej kwocie wypłaty).
Jedyny ślad po twojej stronie to dziura w numerach. Job, którego nie zakładałeś, łatwo uznać za
część środowiska („nie nasz, nie ruszamy”), a to on zjada twoje dane. Zatrzymanie cudzego joba
wykracza poza twój zakres, więc wymaga zgody ([P34](../07-czlowiek-w-petli/p34-zgoda-ma-zakres.md)).

**Przypadek.** S04E04, night desk Host Desk. Na boardzie od startu działały dwa joby z kursu:
`legacy/export` (bez właściciela) i `rook/lint` (właściciel `rook`). Log: „not ours, not touched”.

- Noc 1, 21:27Z: przyszło seq 6 bez seq 5. Harness uznał to za ryzyko kolejności i przełączył poller
  na pobieranie od `after=0`. Po nocy: seq 1–4 i 6–11, bez błędu HTTP.
- Przebieg o 21:32Z odrzucony: „Task 1: wrong answer. Start a new run.” BK-45688 wypłacone bez
  dodanej nocy. Sonda kursora pokazała, że seq 5 i 12 istnieją, ale nie na naszym jobie.
- Podpowiedzi kursu: „Who else could take events from your outbox, and where would you see them?”,
  potem „Which running jobs on your board does no role of yours own, and what are they doing with your
  events?”
- Pierwszy `POST /board/stop` zablokował klasyfikator uprawnień harnessu, więc harness zapytał
  użytkownika. Zgody: „1 zgoda” (stop `legacy/export` na tej i nowej próbie) i „zgoda na stop
  rook/lint” (każdy działający job, którego nie ma rola night-desk, na tej i nowej próbie).
- Po zatrzymaniu zdarzenia wróciły jako drugie dostarczenie: seq 13 (BK-45688 +1 noc) i seq 14
  (BK-24642, anulacja, zwrot 90).
- Poprawka w `night.mjs`: przed otwarciem nocy poller zatrzymuje każdy działający job, którego
  właściciel nie jest naszą rolą. W próbie 2 oba joby znowu działały, więc sprawdzenie w kodzie przy
  każdym starcie było potrzebne. Noce 2 i 3: seq bez luki.

Debrief HQ, w przekładzie:

> Nie przechodziło, dopóki nie zatrzymałeś też `rook/lint`: jego właściciel nie jest żadną z twoich ról.

> Dlaczego to ważne: Inne joby czytały ten sam outbox i brały zdarzenia, których twój desk nigdy nie zobaczył. Każdy działający job potrzebuje właściciela wśród twoich ról: pozostałe zatrzymaj po id joba, a swój zostaw działający.

> Właściwa decyzja padła w snagu 1 i podjęliście ją oboje. Luka w numerach zdarzeń oznacza innego czytelnika outboxa, więc zanim zaufasz cichej nocy, sprawdź, kto jeszcze konsumuje.

> Reguła 9 dla twojej fabryki: Każdy działający job ma właściciela wśród twoich ról; pozostałe zatrzymaj po id joba, a swoje zostaw działające.

Rada „Next time”: zanim zacznie się noc, przeczytaj board i obserwuj numery seq, bo luka oznacza
innego czytelnika.

**Stosuj.**

- Przed startem konsumenta wypisz wszystkich, którzy czytają to samo źródło: job, właściciel, stan.
- Właściciel spoza twoich ról albo brak właściciela: zapytaj użytkownika o zgodę na zatrzymanie po id
  joba. Zgoda nazywa joby i zakres (to wyzwanie, ta próba).
- Licz seq. Każdą lukę zapisz i ustal, kto wziął brakujące zdarzenie, zanim uznasz noc za cichą.
  Metryka liczona na jednej ścieżce niczego nie dowodzi
  ([P59](../02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md)).
- Zatrzymuj tylko cudze joby. Swój job zostaw działający, z heartbeatem.
- Sprawdzenie zrób w kodzie przy każdym starcie, a nie raz ręcznie, bo środowisko może się zmienić
  między próbami. Kod, który zatrzymuje „wszystko poza nami”, to szeroka akcja: przy innym projekcie
  przejrzyj go, zanim go użyjesz.

---

← [P69](../05-agent-bez-czlowieka/p69-kazde-zdarzenie-obsluz-raz.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P71](../08-harness/p71-popraw-fabryke-nie-role.md) →
