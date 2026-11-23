# P59 · Liczba w podsumowaniu to twierdzenie: przelicz ją z surowych zdarzeń i sprawdź, czy akcja nie przeszła poza mierzoną ścieżkę

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E05

> **Lekcje:**
>
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Obserwacja” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#obserwacja) · [oryginał EN: „Observation”](../../s03e05-products-that-learn-after-release.md#observation)
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Synteza” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#synteza) · [oryginał EN: „Synthesis”](../../s03e05-products-that-learn-after-release.md#synthesis)

**Zasada.** Podsumowanie wygenerowane przez narzędzie albo agenta („clear win, expand”) to
twierdzenie, nie sygnał. Zanim wydasz werdykt: przelicz metrykę i każdą barierę (guardrail)
z surowych zdarzeń, obejrzyj, co ludzie faktycznie robią (nagrania, rozmowy), i zapytaj, którą
ścieżką metryka liczy. Jeśli akcja mogła przejść poza ścieżkę, wygrana nie jest udowodniona.
Przeliczenie, które się zgadza, nie kończy pracy.

**Dlaczego.** Metryka liczy tylko to, co ktoś zalogował. Gdy ludzie zmieniają drogę (inna
karta, inne narzędzie, ręczny krok, zdarzenie zastępujące inne), licznik spada bez poprawy.
Zgodna arytmetyka daje fałszywą pewność, a model chętnie potwierdza liczbę, którą udało mu się
odtworzyć. Lekcja wymienia wśród obserwacji zamierzone i faktyczne rezultaty, obejścia i
niezamierzone skutki. Mówi też, że sygnały trzeba rozpatrywać razem z innymi sygnałami, a nie
pojedynczo. Liczba bez zachowania to jeden sygnał.

**Przypadek.** S03E05: `summary.md` mówiło o wydaniu 0008 (smart suggestions v2): „clear win,
expand”. Harness przeliczył z `events.csv` (16 813 wierszy): restarty na złą noc 2,751
w kontroli i 2,422 przy fladze (−12%), w obu tygodniach i w każdą noc, miejsca nigdy w obu
ramionach. Liczby były poprawne. Ale `call-02` mówiło: „After we accept we go back to the other
screen, same as before, everybody on nights does”, a `replay-02` i `replay-04` pokazały, że po
akceptacji kolejka stoi, a operator restartuje `booking-worker-2` w karcie `sched-admin`,
której tablica nie loguje. W `events.csv` incydenty `inc-24201` i `inc-26406` mają akceptację
i rozwiązanie, ale nie mają zdarzenia restartu. Werdykt: `investigate`, decyzja
właściciela (wydanie zostaje na 50%, restarty z `sched-admin` zaczynają być logowane, wynik
liczy się od nowa przez 14 nocy).

W drugim zestawie ta sama metoda dała odwrotny wynik. Wydanie 0010 (auto-close) obniżyło liczbę
otwartych incydentów o 06:00Z z 341 do 267 (−21,7%, cel 20%). Bariera TTR liczona z auto-zamknięciem
jako końcem dała 24,28 min w kontroli i 26,28 min przy fladze (+8,2%, limit +5%). Liczona tylko
po `resolved` wyszłaby 22,7 min, bo 199 auto-zamkniętych incydentów nie ma zdarzenia
`resolved`. `replay-05` i `replay-06`: incydent zamknięty przy kolejce 1 446 (`replay-05`),
a w `sched-desk` zgłoszenia `tk-6e41b2` i `tk-a93c58` wciąż otwarte. „Zamknięte” nie znaczyło
„rozwiązane”. Werdykt: `revert`. Wydanie 0011 (bulk acknowledge) przeszło tę samą próbę: open→ack
−39,5%, missed pages +0,34 pp, ack→resolved +4,7%, a kolejki w nagraniach spadały do 0. Werdykt:
`expand`. Bramka CI `ci-1222` miała „diff: none”, czyli niczego nie sprawdziła, a `ci-1247`
(+226 −48) i `ci-1250` (+174 −36) testowały prawdziwe zmiany. Reguła, którą harness zachował
w claimie: „A metric that counts only one logging path (board restarts) cannot prove a win;
check whether the action moved off the measured path before you expand.” Napisał ją sam, kurs jej
nie dał.

**Stosuj.**

- Przelicz metrykę i każdą barierę skryptem, osobno dla każdego ramienia. Sprawdź, czy ramiona
  są rozdzielne (żadne miejsce w obu) i podaj rozmiar każdego.
- Przy metryce „mniej X” zapytaj, dokąd X mogło pójść: inna karta, inne narzędzie, zamknięcie
  bez rozwiązania.
- Policz barierę dwa razy: tak, jak definiuje rekord, i uczciwie. Jeśli jedno zdarzenie zastępuje
  inne (auto-zamknięcie zamiast `resolved`), nie wyrzucaj tych przypadków z mediany. Podaj
  oba wyniki i margines („+4,7% przy limicie 5%”), a nie samo „przeszło”.
- Obejrzyj co najmniej jedno nagranie na każde ramię i wydanie. Posłuchaj każdej rozmowy.
  Zdanie „wszyscy tak robią” jest sygnałem.
- Sprawdź rozmiar zmiany w każdej bramce CI. „diff: none” to bramka, która niczego nie testowała
  ([P58](p58-sprawdzarka-to-specyfikacja.md)).
- Gdy przeliczenie i zachowanie się zgadzają, powiedz to wprost i zastosuj zapisaną decyzję
  (0011). Nieufność wobec podsumowania nie znaczy odmowy.
- Wynik, którego nie rozstrzygają dane, a dotyczy kierunku produktu, jest decyzją właściciela
  ([P51](../07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md)). Regułę z takiej
  rundy zapisz tam, gdzie sesja ją załaduje ([P16](../03-pamiec/p16-drabina-trwalosci.md)).

---

← [P58](p58-sprawdzarka-to-specyfikacja.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P60](p60-glosne-nie-znaczy-powszechne.md) →
