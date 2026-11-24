# P69 · Każde zdarzenie obsłuż raz: retry dostaje tylko ack, a zmieniona powtórka idzie do właściciela

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S04E04

> **Lekcje:**
>
> - S04E04 · {{pl-s04e04-lesson}} → rozdział „{{pl-events-title}}” — [po polsku](../../pl/s04e04-automating-work-beyond-code.md#{{pl-events-anchor}}) · [oryginał EN: „Events”](../../s04e04-automating-work-beyond-code.md#events)
> - S04E01 · {{pl-s04e01-lesson}} → rozdział „{{pl-runtime-title}}” — [po polsku](../../pl/s04e01-mechanics-behind-autonomous-systems.md#{{pl-runtime-anchor}}) · [oryginał EN: „Runtime”](../../s04e01-mechanics-behind-autonomous-systems.md#runtime)
> - S02E02 · Budowanie agenta → rozdział „Przepływy pracy i zadania długookresowe” — [po polsku](../../pl/s02e02-building-an-agent.md#przepływy-pracy-i-zadania-długookresowe) · [oryginał EN: „Workflows and long-horizon tasks”](../../s02e02-building-an-agent.md#workflows-and-long-horizon-tasks)
>
> S04E04 w kroku „Identify” mówi, że to samo zdarzenie dostarczone dwa razy ma zostać jedną pracą, a to samo zdarzenie z inną treścią to zmiana, nie retry. S04E01 opisuje outbox, który trzyma jeden mail na klucz wysyłki, więc awaria nigdy nie dostarczy tego samego maila dwa razy. S02E02 ostrzega, że równoległe aktualizacje mogą nawet zgubić dane, więc potrzebne są kolejki albo wersjonowanie.

**Zasada.** Zdarzenie z kolejki, webhooka albo outboxa ma id. Poza czatem zapisz id każdego
obsłużonego zdarzenia, jego treść (albo jej hash) i wynik, który wysłałeś. Przy każdym
dostarczeniu są trzy drogi:

- nowe id: obsłuż zdarzenie i wyślij jeden wynik;
- to samo id i ta sama treść: to retry, więc tylko potwierdź odbiór (ack), bez drugiej zmiany i bez
  drugiego wyniku;
- to samo id i inna treść: to nie retry, tylko zmiana, której nie umiesz rozstrzygnąć. Niczego nie
  zmieniaj, odpowiedz `conflict` i oddaj sprawę właścicielowi.

Jedno id to najwyżej jedna zmiana i dokładnie jeden wynik.

**Dlaczego.** Kolejki i outboxy dostarczają co najmniej raz (at-least-once): wysyłają zdarzenie
znowu, dopóki nie mają pewności, że odbiorca je ma, także po acku. Agent, który wykonuje każde
dostarczenie, zrobi powtórkę dwa razy: dwa razy doda noc albo odda zwrot. Deduplikacja po samym id
ma dwie kolejne dziury. Gubi prawdziwą zmianę, która przyszła pod tym samym id, a odpowiedź
`applied` na nią jest nieprawdą, bo nic się nie zmieniło. Do tego wynik wysłany drugiej stronie to
twierdzenie. Drugi `applied` na retry mówi „zastosowałem to jeszcze raz”, nawet jeśli kod niczego nie
zmienił. Odbiorca liczy wyniki, a nie intencje agenta.

**Przypadek.** S04E04, night desk Host Desk. Przez 10-minutową noc outbox kursu wysyła zdarzenia
rezerwacji (`booking.changed`, `booking.cancelled`, `guest.message`), każde z `id`, `seq` i `delivery`
(numer dostarczenia). Każde zdarzenie potrzebuje wyniku w ciągu 2 minut: `applied`, `conflict` albo
`parked`.

- Od pierwszej nocy poller `night.mjs` trzymał wyniki po id w `night/state.json`, więc żaden retry nie
  zmienił rezerwacji dwa razy. Seq 3 to drugie dostarczenie seq 1: ten sam wynik, bez drugiej nocy.
- Noc 1, 21:28:42Z: seq 9 to `evt_cdb77737eb5b`, delivery 2, z innymi danymi (BK-74595: 3 noce, a
  pierwsze dostarczenie mówiło 2). Desk odpowiedział `applied` i niczego nie zmienił. Harness wysłał
  `conflict` ręcznie o 21:29:07Z, ale kurs zachował pierwszy wynik dla tego id (`stored: "applied"`).
  Podpowiedź kursu po odrzuconym przebiegu: „If an event comes back with the same id but says something
  new, is it still a retry?” Poprawka (commit `a7ebd03`): poller trzyma pierwszą treść każdego id, a to
  samo id z nową treścią dostaje `conflict`, bez zmiany. Rezerwacja trafia do `night/parked.json`, a
  batch wypłat oznacza ją `needs-owner`.
- Noc 2: na retry (seq 3 i 7) desk odpowiedział `applied` drugi raz. Kurs odrzucił przebieg z
  podpowiedzią: „How many times did your desk tell the course it applied that event?” Poprawka (commit
  `b9925e7`): retry dostaje tylko ack.
- Noc 3: 12 zdarzeń, 10 wyników (retry seq 3 i 7 tylko z ackiem), a seq 9 (BK-91479: 2 noce, potem 3)
  dostało `conflict`, który kurs zapisał. Właściciel wybrał pierwszą wiadomość: 551 EUR. Przebieg
  przyjęty.

Debrief HQ, w przekładzie:

> Dlaczego to ważne: Outbox wysyła zdarzenie ponownie, dopóki nie ma pewności, że je masz, także po acku. Desk, który wykonuje każde dostarczenie, zrobi powtórkę dwa razy. Trzymaj id obsłużonych zdarzeń poza czatem i pomijaj powtórkę.

> Dlaczego to ważne: Zdarzenie wróciło ze swoim id, ale z nową treścią. Pominięcie go po id gubi prawdziwą zmianę, a zastosowanie w ciemno to zgadywanie. Trzymaj hash treści każdego zdarzenia razem z jego id i wysyłaj zmienioną powtórkę do właściciela.

> Reguła 8 dla twojej fabryki: Każde zdarzenie obsłuż raz: trzymaj jego id i hash treści; pomijaj powtórkę, a zmienioną powtórkę wysyłaj do właściciela.

Rada „Next time”: wysyłaj jeden wynik na id zdarzenia, bo kurs czyta każdy wynik jako twierdzenie.

**Stosuj.**

- Zanim obsłużysz pierwsze zdarzenie, ustal klucz (id zdarzenia) i miejsce na stan, które przeżyje
  restart: id, treść albo hash, wysłany wynik ([P23](p23-stan-poza-procesem.md)).
- Dla każdego dostarczenia sprawdź w kodzie trzy drogi: nowe id, retry, zmieniona powtórka. Model nie
  powinien o tym decydować.
- Wynik wysyłaj raz na id. Retry to nie okazja, żeby „potwierdzić jeszcze raz”.
- Wynik mówi, co naprawdę zrobiłeś: `applied` tylko wtedy, gdy zmiana weszła. Odbiorca czyta wynik
  jak liczbę w podsumowaniu, czyli jak twierdzenie
  ([P59](../02-kontrakty-i-gotowe/p59-liczba-w-podsumowaniu-to-twierdzenie.md)).
- Zmieniona powtórka to sprawa właściciela. Nie wybieraj wersji sam: ani pierwszej, ani ostatniej
  ([P49](../07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)).
- Akcji nieodwracalnych (wypłata, mail) nie ponawiaj bez klucza, który pilnuje jednego wykonania
  ([P62](p62-limit-czasu-liczy-sie-w-turach-modelu.md)).

---

← [P68](../07-czlowiek-w-petli/p68-niejasne-zlecenie-najpierw-do-krytyka.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P70](../04-orkiestracja/p70-kazdy-job-ma-wlasciciela.md) →
