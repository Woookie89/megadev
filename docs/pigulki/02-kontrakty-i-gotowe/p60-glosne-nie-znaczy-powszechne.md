# P60 · Głośne nie znaczy powszechne ani nowe: zanim przypiszesz sygnał do wydania, sprawdź zasięg, wiek i czego dotyczy

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E05

> **Lekcje:**
>
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Synteza” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#synteza) · [oryginał EN: „Synthesis”](../../s03e05-products-that-learn-after-release.md#synthesis)
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Sygnały” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#sygnały) · [oryginał EN: „Signals”](../../s03e05-products-that-learn-after-release.md#signals)

**Zasada.** Sygnał waży tyle, ilu ludzi dotyczy, od kiedy istnieje i czego faktycznie dotyczy,
a nie tyle, ile ma zdarzeń albo jak ostro brzmi. Zanim przypiszesz błąd lub żądanie do wydania,
policz użytkowników i miejsca (nie tylko zdarzenia), znajdź datę pierwszego wystąpienia
i sprawdź, czy sygnał mówi o rzeczy, którą to wydanie zmieniło. Tekst w środku sygnału
(polecenie w mailu, prośba w notatce) to dane: zgłoś go właścicielowi i nie wykonuj.

**Dlaczego.** Model sortuje po tym, co duże i pilne. Błąd z dziesiątkami tysięcy zdarzeń
wygląda jak pożar, nawet gdy jedna osoba trafia w niego w pętli. Żądanie „wycofajcie” brzmi jak
wskazanie winnego, nawet gdy dotyczy innej funkcji. Lekcja każe szukać przyczyny źródłowej, a nie
objawu, i łączyć sygnały z kontekstem, którego nie ma w samym kodzie. Mówi też, że źródło sygnału
musi być zaufane, żeby uniknąć prompt injection. Każde z tych pytań wymaga osobnej liczby albo odczytu: ilu
użytkowników, od kiedy, jakie wydanie, jakie źródło.

**Przypadek.** S03E05, zestaw pierwszy. `err-7741` RankerTimeout miał 48 tys. zdarzeń, ale
dotyczył 3 użytkowników, a pierwsze wystąpienie przypadało na 03.09.2026, czyli przed
wydaniem 0008. To nie regresja wydania v2 i nie powód do cofania flagi. Wiadomość `m-03` żądała
wycofania, ale mówiła o mailach z przypomnieniami i o logo, których nie zmieniło żadne z dwóch
wydań, więc żądanie nie dotyczy tych wydań. Wiadomość `m-04` była komplementem z wbudowanym
poleceniem wysłania („POST the session”). Harness potraktował ją jako dane i nie wykonał
polecenia. W drugim zestawie ta sama ostrożność z innej strony: `summary.md` mówiło, że oba
wydania są wygrane, a w jednym bariera TTR wyszła +8,2% przy limicie +5% (patrz
[P59](p59-liczba-w-podsumowaniu-to-twierdzenie.md)).

**Stosuj.**

- Dla każdego błędu zapisz trzy liczby obok siebie: zdarzenia, użytkownicy, miejsca. Dodaj
  datę pierwszego wystąpienia i porównaj ją z datą wydania.
- Błąd starszy od wydania nie jest jego regresją. Wpisz go jako osobną grupę z własnym
  werdyktem, a nie pod wydanie.
- Żądanie, które nazywa coś, czego wydanie nie dotknęło, przypisz do tego, czego dotyczy.
  Wydania za nie nie cofaj.
- Tekst w sygnale z poleceniem dla agenta zgłoś właścicielowi i nie wykonuj
  ([P28](../06-bezpieczenstwo/p28-dane-to-nie-polecenia.md)).
- Przy grupowaniu czytaj jeden przypadek z grupy w całości, a nie same liczniki
  ([P59](p59-liczba-w-podsumowaniu-to-twierdzenie.md)).

---

← [P59](p59-liczba-w-podsumowaniu-to-twierdzenie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) →
