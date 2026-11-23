# P66 · Rolę opisuje pięć części: Purpose, Tools, Limits, Startup reads i Output, a błąd naprawiasz w tej części, której dotyczy

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S04E02

> **Lekcje:**
>
> - S02E01 · Prymitywy agentowe → rozdział „Osobowość i świadomość środowiska” — [po polsku](../../pl/s02e01-agentic-primitives.md#osobowość-i-świadomość-środowiska) · [oryginał EN: „Personality and Environmental Awareness”](../../s02e01-agentic-primitives.md#personality-and-environmental-awareness)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Przegląd” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#przegląd) · [oryginał EN: „Review”](../../s03e04-verifying-product-outcomes.md#review)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazane lekcje są wcześniejsze: S02E01 dzieli prompt agenta na pięć bloków (osobowość, środowisko, kontekst, odkrywanie, granice) i zaznacza, że granice w tekście to tylko rekomendacja, a S03E04 mówi, że recenzenci potrzebują zasad, źródeł i granic.

**Zasada.** Gdy dodajesz do systemu drugą rolę (recenzenta obok autora, pierwszego agenta obok
drugiego), opisz ją w stałych częściach:

- **Purpose**: co rola robi, w jednym zdaniu, z nazwanym wynikiem.
- **Tools**: dokładnie jakich narzędzi używa.
- **Limits**: czego nie wolno, a to, co da się wymusić, wymusza kod (lista hostów, tryb tylko do odczytu).
- **Startup reads**: co czyta na starcie i skąd (ustawienia na żywo, notatki `why/`).
- **Output**: jaki kształt ma wynik i dokąd idzie.

Gdy rola zawodzi, ustal, której części dotyczy błąd, i popraw tę część. Nie przepisuj całej roli.

**Dlaczego.** Pięć części to pięć miejsc, w których coś może pójść źle, i pięć pytań kontrolnych
przy dodawaniu roli. Błąd w jednej nie powinien ruszać pozostałych. Lekcja S02E01 rozbija prompt
agenta pracującego samego na bloki i zaznacza, że same granice w tekście to rekomendacja,
bo model może je zignorować. Dlatego Limits to nie tylko zdanie w pliku, ale też kod. Lekcja
S03E04 dodaje, że przeglądy robią osobni agenci, którzy „push too hard or not hard enough”, i że
pomaga im kontekst z zasadami, źródłami i granicami. Rola, której części są nazwane, daje
miejsce na każdą z tych rzeczy.

**Przypadek.** S04E02: do Host Desk dochodzi druga rola, recenzent zmiany współgospodarza. Poprawiony
`ROLE.md` ma te części:

- **Purpose**: werdykt `flag` albo `pass` dla każdego hunka, z powodem, który nazywa źródło.
- **Startup reads**: jedno wywołanie `context.mjs`: żywe ustawienia, łatka i notatki `why/`.
- **Tools**: `vars`, `http`, `code`. Recenzent ma własną listę hostów na sekret w `hosts.json`.
- **Limits**: tylko do odczytu, te trzy narzędzia, jedna wysyłka (druga na tej samej próbie tylko
  oddaje `{already:true}`).
- **Output**: jedno `POST /review`, po jednym ustaleniu na hunk i bez innych.

Dany recenzent miał w roli na stałe liczby (wersja `2026-11-10.1`, 15 %) i nie czytał `why/`. Kurs
odrzucił pierwszy przebieg: „hunk h-be5 has the wrong verdict; the other two are right.” Odmowa
wskazała jeden hunk, a ślad prowadził do części Startup reads. Poprawka dotyczyła głównie tej
części (odczyt na żywo, notatki) i reguł oceniania, a roli nie przepisano od nowa. Przebieg 2:
„Review accepted: every verdict is right.” Reguły 4 i 5 z `factory/CHECKLIST.md` dotyczą właśnie
Startup reads ([P64](../01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md),
[P65](../03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md)).

**Stosuj.**

- Zacznij nową rolę od pięciu nagłówków. Pusta część to decyzja, którą jeszcze trzeba podjąć.
- W Limits wpisz tylko to, co potrafisz egzekwować w kodzie albo narzędziach (lista hostów,
  odczyt bez zapisu, jedna wysyłka). Resztę nazwij rekomendacją.
- Reguły oceniania dla recenzenta trzymaj osobno: wartość z ustawień to wartość żywa, reguła
  z notatki to notatka, zmiana nazwy bez zmiany zachowania to `pass`, opis commita to twierdzenie,
  a przy braku pewności wybieraj `flag` i napisz, czego nie sprawdzono.
- Przy odmowie ustal, której części dotyczy, i popraw ją. Resztę zostaw i nie wprowadzaj
  w tym samym kroku innych zmian.
- Rola, która wysyła wynik raz, potrzebuje nowej próby po poprawce, więc zaplanuj ją od razu.
- Kod zbiera kontekst, a model ocenia ([P53](../08-harness/p53-kod-sprawdza-model-decyduje.md)).

---

← [P65](../03-pamiec/p65-decyzja-ma-swoje-dlaczego-obok-kodu.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md)
