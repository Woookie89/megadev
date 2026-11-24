# P68 · Niejasne zlecenie idzie najpierw do critica, a właściciel odpowiada, zanim zmieni się kod

> Rozdział [7. Human in the loop](README.md) · epizody: S04E03

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Wymagania i dekompozycja” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja) · [oryginał EN: „Requirements and decomposition”](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition)
> - S03E01 · Mechanika inżynierii produktu → rozdział „Odpowiedzialność” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) · [oryginał EN: „Ownership”](../../s03e01-mechanics-behind-product-engineering.md#ownership)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazane lekcje są wcześniejsze: S03E02 mówi, że zamiast szczegółowej specyfikacji szukamy porozumienia (zakres, rezultat, granice, dowód) i że celem jest odkryć martwe punkty i przypadki brzegowe, zanim praca się zacznie, a S03E01 mówi, że najprościej jest zaimplementować funkcję, o którą poproszono, ale odpowiedzialność wymaga szukania brakującego kontekstu u biznesu i użytkowników.

**Zasada.** Zanim ktokolwiek zaplanuje albo napisze kod do zlecenia, osobna rola (critic) czyta je i
zadaje właścicielowi pytania o to, czego zlecenie nie rozstrzyga: zakres, liczby, daty, kogo dotyczy,
jakie dane już są, po czym poznać, że działa. Critic tylko pyta. Nie pisze kodu i nie dyskutuje ze
zleceniem. Odpowiedzi właściciela trafiają słowo w słowo do pliku, który czyta każda następna rola.
Czego właściciel nie rozstrzygnął, to w planie zostaje nazwane jako luka, a nie wypełnione.

**Dlaczego.** Krótkie zlecenie („dolicz podatek miejski 3 EUR za osobę za noc”) wygląda na kompletne.
Model, który dostaje je do zbudowania, wypełni każdą lukę wiarygodną wartością: bez limitu nocy, z
prowizją albo bez, dla wszystkich rezerwacji. Nie zaznaczy, że zgadywał, a kod z taką zgadywanką
przejdzie własne testy, bo test powstał z tego samego założenia. Znał je tylko właściciel, a lekcja
S03E02 przypomina, że odpowiedzialności nie da się delegować AI. Rola, której jedynym wynikiem są
pytania, nie ma odruchu domykania zadania, więc luki zamienia w pytania, a nie w kod.

**Przypadek.** S04E03: trzy requesty hosta na boardzie. Dana rola critic (Pi,
`deepseek-v4.1-flash`) zadała po 5 pytań do każdego (`POST /board/questions`, board przyjął 5/5/5).
Odpowiedzi były tylko na stronie właściciela, więc przepisał je użytkownik. Do `r1` i `r3`: „nothing to
add. Build it as written.” Do `r2` („Charge the city tax: 3 EUR per guest per night.”) trzy decyzje,
których w treści nie było:

- „Charge it for the first 4 nights of a stay at most.”
- „Pay the tax out with the host's payout: it goes on to the city, so take no commission on it.”
- „Only for bookings made on or after 17 November 2026.”

Harness zapisał je dosłownie w `requests/answers.md`, a planner wpisał je do `asks` joba `w-r2`. Worker
zbudował `city-tax.mjs` z tymi trzema regułami, a notatka `why/city-tax.md` ma sekcję „Gap (do not
guess)” na to, czego host nie powiedział (0 gości, brak `day`, dziwna data): zadanie jest parkowane.
Kurs, w przekładzie:

> Request o podatku miejskim zostawiał otwarte decyzje (limit, prowizja od niego, które rezerwacje), a harness wypełnia otwarte decyzje wiarygodnymi zgadywankami. Znał je tylko host, więc najpierw pyta critic, a właściciel odpowiada, zanim zmieni się kod.

Reguła 7 dla twojej fabryki (w przekładzie): wyślij każdy niejasny request najpierw do critica i pozwól
właścicielowi odpowiedzieć, zanim zmieni się jakikolwiek kod.

Odpowiedzi muszą trafić do każdej roli, także do tej, która ocenia. Reviewer z S04E02 nie czytał
`requests/answers.md` i oznaczył limit 4 nocy i datę jako niepotwierdzone
([P54](../01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)).

**Stosuj.**

- Każde zlecenie zmiany zachowania (cena, limit, podatek, uprawnienie) przepuść przez critica, zanim
  powstanie plan. Limit pytań (tu 5) zmusza do wyboru tych, które zmieniają kod.
- Critic pyta o zakres, liczby, daty, kogo dotyczy, dane, które już są, i o dowód działania. Nie
  proponuje rozwiązań i nie dyskutuje z prośbą.
- Odpowiedzi zapisz słowo w słowo, z datą i źródłem, w jednym pliku obok kodu
  ([P14](../03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)). Każda rola, także reviewer, czyta go na
  starcie.
- Na „nic do dodania” buduj dokładnie treść zlecenia. Na milczenie w konkretnej sprawie: nazwij lukę w
  planie i zaparkuj przypadek, zamiast zgadywać.
- Gdy dwa źródła mówią co innego, to nie luka, tylko sprzeczność: rozstrzyga właściciel
  ([P49](p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)).

---

← [P67](../04-orkiestracja/p67-zespol-dzieli-jeden-board.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md)
