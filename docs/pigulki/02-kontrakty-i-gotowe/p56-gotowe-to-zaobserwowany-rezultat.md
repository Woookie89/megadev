# P56 · „Gotowe” to zaobserwowany rezultat: sprawdzaj produkt tak, jak używa go człowiek, w czasie i na nagraniu

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E04

> **Lekcje:**
>
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Akceptacja” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#akceptacja) · [oryginał EN: „Acceptance”](../../s03e04-verifying-product-outcomes.md#acceptance)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Weryfikacja” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#weryfikacja) · [oryginał EN: „Verification”](../../s03e04-verifying-product-outcomes.md#verification)

**Zasada.** Zielone testy mówią, że kod robi to, co sprawdza test. Nie mówią, że produkt
działa dla człowieka. Pracę z interfejsem uznajesz za gotową, gdy zobaczysz rezultat:
nagranie prawdziwego przepływu na wdrożonym buildzie, wykonanego tak, jak robi to człowiek.
Wskaźnik dojeżdża do przycisku, chwilę celuje, klika w miejsce, które widział. Nagranie
oglądasz w każdym momencie, w którym coś się dzieje.

**Dlaczego.** Narzędzia do testów przeglądarki czekają, aż strona się ustabilizuje, i szukają
elementu od nowa w chwili kliknięcia. Człowiek nie czeka: patrzy, celuje i klika chwilę
później, a w tym czasie strona może się zmienić. Błędy, które żyją w czasie (odświeżenie
w trakcie celowania, lista, która się przesuwa, wyścig dwóch zdarzeń), nie istnieją w świecie
testu. Agent, który sam pisze testy i sam je uruchamia, ma przy tym naturalną skłonność do
sprawdzania w warunkach wygodnych dla kodu. Lekcja mówi, że raport agenta „gotowe” nie oznacza
dostarczonej pracy i że agent może generować dowody zamiast je rejestrować. Dlatego
„laboratorium agentowe” pozwala agentowi używać aplikacji jak użytkownik: klikać, pisać
i nagrywać krótkie filmy z prawdziwego buildu.

**Przypadek.** S03E04: tablica incydentów odświeża się co 2 s (R4), a nowe incydenty wchodzą
na górę listy (R1). Test harnessu „Ack acks that incident and marks the row (R2)” przechodził:
kliknięcie lokatorem Playwrighta trafiało w przycisk wiersza, który test wskazał. Nagranie
z kliknięciem po współrzędnych ekranu pokazało co innego. W 00:12 wskaźnik stoi na Ack
incydentu INC-6755 w wierszu 3, w 00:16 przychodzi nowy incydent i wszystkie wiersze zjeżdżają
o jeden, a w 00:17 klik potwierdza INC-3647. INC-6755 zostaje bez dyżurnego. Kurs: „Done is an
observed outcome, not green tests. Some bugs live in time: only a recording of a person using
it shows them.” oraz „Test runners wait for the page to settle; people do not. Verification has
to behave like a person.”

Replay kursu działa tak samo: obserwuje tablicę, a potem trzy razy celuje w trzeci
niepotwierdzony wiersz, przepuszcza nowe incydenty w trakcie celowania i klika po 300 ms.
Po zmianie z kroku 2 (potwierdzenie, które nazywa id) wszystkie trzy acki trafiły w zamierzony
incydent. Kurs: „A test checks the code you hand over; a replay checks the product people use,
live, in time.”

**Stosuj.**

- Dla każdego przepływu z planu nagraj jeden przebieg na wdrożonym buildzie. Klikaj po
  współrzędnych, po chwili celowania, a nie lokatorem, który czeka na element.
- Zapisuj momenty `mm:ss` z tym, co się stało (`events.json`), i obejrzyj każdy z nich, zanim
  napiszesz „działa”.
- Napięcia w planie (dwa wymagania, które razem coś psują) nagraj jako osobne scenariusze.
- Test zostaw jako bramkę dla kodu, a nagranie lub replay jako dowód dla produktu. Jedno nie
  zastępuje drugiego ([P07](p07-gotowe-to-sprawdzenie.md),
  [P10](p10-sprawdz-z-zewnatrz.md)).
- Czas traktuj jako część zachowania: odświeżenie, opóźnienie i kolejność zdarzeń należą do
  scenariusza ([P26](../05-agent-bez-czlowieka/p26-czas-jest-czescia-zachowania.md)).
- Dowód z nagrania musi nazwać build i moment ([P57](p57-dowod-nazywa-build-i-moment.md)).

---

← [P55](../07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P57](p57-dowod-nazywa-build-i-moment.md) →
