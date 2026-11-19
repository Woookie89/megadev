# P53 · Kod pobiera, składa i sprawdza, a model decyduje: trzymaj każde po swojej stronie

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S03E02

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s03e02-translating-intent-into-agent-work.md#evaluation)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Wykonywalny Markdown a kod” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) · [oryginał EN: „Executable Markdown vs Code”](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code)

**Zasada.** W pracy z modelem rozdziel dwie strony. Kod pobiera dane, składa wynik, zapisuje
pliki i sprawdza wszystko, co da się sprawdzić deterministycznie: liczności, kształt,
odwołania, wymagane sekcje. Model podejmuje decyzje, które wymagają oceny, i zapisuje je
w jednym pliku decyzji. Wynik powstaje dopiero wtedy, gdy sprawdzenia przechodzą.

**Dlaczego.** Model dobrze waży sprzeczne prośby i pisze briefy, ale źle liczy i łatwo
gubi jeden element z dwudziestu. Ma też trudność z trzymaniem wielu warunków naraz. Skrypt
sprawdza to samo za każdym razem, szybko i za darmo. Lekcja S03E02 mówi wprost: wszystko, co
da się zweryfikować deterministycznie, powinien sprawdzać kod. Lekcja S01E05 wymienia
niezawodność, koszt i debugowanie jako słabości skilla wykonywanego tylko przez model
i proponuje zapisany skrypt. Gdy decyzje leżą osobno, a sprawdzenia osobno, wiadomo, co
testować kodem, a co oceniać, i błąd od razu wskazuje stronę.

**Przypadek.** S03E02: triage 21 zgłoszeń do trackera. Trzy pliki:

- `tools/poll.mjs` pobiera kanały z kursorem i deduplikacją po id,
- `tools/decisions.mjs` to decyzje modelu: znacznik, status, powód, `sources`, `blocked-by`
  i treść każdego issue,
- `tools/build.mjs` składa tracker z backlogu, kanałów i decyzji, uruchamia sprawdzenia
  z kroku 4 skilla `triage` i zapisuje pliki tylko po PASS.

Pierwsza budowa (10:58:25 UTC) dała FAIL: sześć nowych zgłoszeń nie było w żadnym issue,
a cztery briefy `agent-ready` (SCHED-4465, IN-4988, IN-7623, IN-2631) nie miały przypadku
tego, czego nie wolno zrobić: `acceptance has no "not" case`. Briefy wyglądały na gotowe. Model
dopisał brakujące przypadki, a druga budowa przeszła. Kurs zapisał ten podział w toolboxie
jako T3: „Code fetches and files; the model decides. Keep each on its own side and you know
what to test where.”

**Stosuj.**

- Każdą regułę ze skilla, którą da się zapisać jako warunek, zapisz w skrypcie: „każde id
  w dokładnie jednym miejscu”, „każde otwarte issue ma dokładnie jeden znacznik”, „każdy
  brief ma przypadek ‘not’”, „każde odwołanie wskazuje istniejący klucz”.
- Skrypt nie pisze plików, gdy coś nie przechodzi. Komunikat błędu nazywa element i regułę
  ([P41](p41-blad-mowi-co-poprawic.md)).
- Decyzje modelu trzymaj w jednym pliku danych, nie rozsiane po wynikach. Łatwo je przejrzeć,
  porównać i poprawić jedną.
- „Gotowe” znaczy, że sprawdzenia przechodzą
  ([P07](../02-kontrakty-i-gotowe/p07-gotowe-to-sprawdzenie.md)).

---

← [P52](../05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P54](../01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md) →
