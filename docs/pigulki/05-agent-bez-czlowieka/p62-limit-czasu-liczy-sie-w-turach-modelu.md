# P62 · Limit czasu liczy się w turach modelu: rutynowy batch robi jeden skrypt, a model tylko go uruchamia

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S04E01, S04E04

> **Lekcje:**
>
> - S04E04 · {{pl-s04e04-lesson}} → rozdział „{{pl-events-title}}” — [po polsku](../../pl/s04e04-automating-work-beyond-code.md#{{pl-events-anchor}}) · [oryginał EN: „Events”](../../s04e04-automating-work-beyond-code.md#events) (krok „Filter”: najpierw proste reguły, mały model tylko tam, gdzie reguły zawodzą)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Wykonywalny Markdown a kod” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) · [oryginał EN: „Executable Markdown vs Code”](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code)
> - S01E04 · Praca z harnessami AI → rozdział „Ustawienia” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#ustawienia) · [oryginał EN: „Settings”](../../s01e04-working-with-ai-harnesses.md#settings)
>
> Lekcje S01E05 i S01E04 wskazano, zanim notatki S04 trafiły do repo: S01E05 wymienia szybkość i koszt jako słabości pracy wykonywanej tylko przez model i proponuje zapisany skrypt, a S01E04 mówi o ustawieniach modelu.

**Zasada.** Gdy zadanie ma limit czasu, policz go w turach modelu. Jedna tura to sekundy, więc
praca rutynowa (ta sama dla każdego elementu batcha) idzie do jednego skryptu, który robi cały batch. Model uruchamia skrypt jednym wywołaniem narzędzia i decyduje tylko o tym, czego skrypt
nie rozstrzyga: dziwne przypadki oznacza, nie rozwiązuje. Operacji z pieniędzmi nie ponawiasz.

**Dlaczego.** Model, który ma obsłużyć 20 zadań „po jednym”, potrzebuje co najmniej 20 tur:
odczyt, decyzja, wywołanie, odpowiedź. Każda trwa sekundy, a limit liczy się w milisekundach.
Skrypt robi to samo za każdym razem i szybko. Lekcja S01E05 nazywa słabości modelu wykonującego
rutynę sam: niezawodność, koszt, szybkość i debugowanie, i wskazuje zapisany skrypt jako
wyjście. Tu limit dodaje twardą granicę: nie „drożej”, tylko „nie zdążysz”.

**Przypadek.** S04E01, batch wypłat dla pretend hosta. Kurs podał limit na starcie: 8000 ms
w ćwiczeniu (3 zadania) i 6000 ms w przebiegu właściwym (20 zadań). Harness uznał w dniu
startu, że model nie przejdzie zadań po kolei, więc cały batch robi `scripts/batch.mjs`.
`ROLE.md` mapuje jednowyrazowe polecenia (`Practice.`, `Start.`, `Finish.`) na jedno wywołanie
narzędzia `code`. Skrypt sam czyta API i podręcznik, a model nie woła API kursu przez `http`.

- Ćwiczenie samym skryptem, bez modelu: 3 z 3 zadań wypłacone w 232 ms.
- Pierwszy przebieg przez Pi (`openrouter/deepseek/deepseek-v4.1-flash`): 20 zadań w 2761 ms.
  Kurs go odrzucił z innego powodu ([P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)).
- Drugi przebieg: 20 zadań w 2171 ms przy limicie 6000 ms, jeden skrypt i jedno wywołanie
  modelu. 18 wypłacono, 2 zaparkowano.
- Zasada kodu: żadnego retry wypłaty, bo retry mógłby zapłacić dwa razy. Gdy
  skrypt wypisze `FAIL`, `ROLE.md` każe zacytować linię i się zatrzymać.

Debrief HQ, w przekładzie:

> Twój harness odczytał limit (8000 ms w ćwiczeniu, 6000 ms w przebiegu) i włożył batch do jednego skryptu, więc model zrobił jedno wywołanie. 20 zadań zajęło 2171 ms; tura modelu na każde zadanie zajęłaby po kilka sekund.

> Kurs zapisał: żaden przebieg nie wyczerpał czasu.

> Dlaczego to ważne: Każda tura modelu kosztuje sekundę lub więcej, a 20 zadań połączonych łańcuchem pod limitem ustawionym z twojej sieci nie zostawia na to miejsca. Dlatego rutynowa praca idzie skryptem, a model ocenia tylko to, czego skrypt nie potrafi rozstrzygnąć.

> Reguła 2 dla twojej fabryki: Rutynową pracę wykonuj skryptem; model decyduje tylko o tym, czego skrypt nie rozstrzygnie.

W zestawie narzędzi kursu: rutynowa praca idzie skryptem, a nie turami modelu (`batch.mjs`).

S04E04, night desk: każde zdarzenie nocy potrzebuje wyniku w ciągu 2 minut, a start modelu trwa 10–60 s
(`why/night-desk.md`), więc kolejka wywołań modelu mogłaby przekroczyć limit. Zmiany i anulacje
rezerwacji to zwykłe liczby, więc rozstrzyga je skrypt `decide.mjs`. Retry i konflikty też. Model (Pi,
`deepseek-v4.1-flash`) budzi się tylko dla `guest.message`, w tle, a gdy zawiedzie albo nie zdąży,
wiadomość jest parkowana. Batch wypłat nadal robi jeden skrypt (2520 ms w przyjętym przebiegu). Debrief
HQ, w przekładzie:

> Model czy kod: zdobyte w tym rozwiązaniu. Tylko wiadomości gości budziły model (3–7 s każda). Zmiany, anulacje, retry, konflikty i batch wypłat to zwykły kod w folderze night-desk.
>
> Deduplikacja, acki i board to zwykły kod bez kosztu tokenów; model czyta to, co napisał gość.

**Stosuj.**

- Zanim zaprojektujesz agenta, odczytaj limit i podziel go przez czas jednej tury modelu. Jeśli
  wychodzi mniej niż liczba elementów, batch robi skrypt.
- Skrypt wypisuje to, co model ma zgłosić: ile zrobiono, co zaparkowano i dlaczego, ile
  trwało. Model nie musi niczego liczyć.
- Przy operacjach, których nie wolno powtórzyć (wypłata, wysyłka), `FAIL` kończy przebieg, a
  decyzję o ponowieniu podejmuje użytkownik ([P09](../02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md)).
- Podział kodu i modelu opisuje [P53](../08-harness/p53-kod-sprawdza-model-decyduje.md), a
  czas jako część zachowania [P26](p26-czas-jest-czescia-zachowania.md).
- Koszt modelu: jedno wywołanie na przebieg i tani model wystarczają ([P19](../04-orkiestracja/p19-dobor-modelu-i-koszt.md)).

---

← [P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P63](../07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) →
