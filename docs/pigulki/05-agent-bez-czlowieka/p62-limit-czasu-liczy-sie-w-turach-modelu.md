# P62 · Limit czasu liczy się w turach modelu: rutynową partię robi jeden skrypt, a model tylko go uruchamia

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S04E01

> **Lekcje:**
>
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Wykonywalny Markdown a kod” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#wykonywalny-markdown-a-kod) · [oryginał EN: „Executable Markdown vs Code”](../../s01e05-building-workflows-not-tool-stacks.md#executable-markdown-vs-code)
> - S01E04 · Praca z harnessami AI → rozdział „Ustawienia” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#ustawienia) · [oryginał EN: „Settings”](../../s01e04-working-with-ai-harnesses.md#settings)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazane lekcje są wcześniejsze: S01E05 wymienia szybkość i koszt jako słabości pracy wykonywanej tylko przez model i proponuje zapisany skrypt, a S01E04 mówi o ustawieniach modelu.

**Zasada.** Gdy zadanie ma limit czasu, policz go w turach modelu. Jedna tura to sekundy, więc
praca rutynowa (ta sama dla każdego elementu partii) idzie do jednego skryptu, który robi całą
partię. Model uruchamia skrypt jednym wywołaniem narzędzia i decyduje tylko o tym, czego skrypt
nie rozstrzyga: dziwne przypadki oznacza, nie rozwiązuje. Operacji z pieniędzmi nie ponawiasz.

**Dlaczego.** Model, który ma obsłużyć 20 zadań „po jednym”, potrzebuje co najmniej 20 tur:
odczyt, decyzja, wywołanie, odpowiedź. Każda trwa sekundy, a limit liczy się w milisekundach.
Skrypt robi to samo za każdym razem i szybko. Lekcja S01E05 nazywa słabości modelu wykonującego
rutynę sam: niezawodność, koszt, szybkość i debugowanie, i wskazuje zapisany skrypt jako
wyjście. Tu limit dodaje twardą granicę: nie „drożej”, tylko „nie zdążysz”.

**Przypadek.** S04E01, partia wypłat dla pretend hosta. Kurs podał limit na starcie: 8000 ms
w ćwiczeniu (3 zadania) i 6000 ms w przebiegu właściwym (20 zadań). Harness uznał w dniu
startu, że model nie przejdzie zadań po kolei, więc całą partię robi `scripts/batch.mjs`.
`ROLE.md` mapuje jednowyrazowe polecenia (`Practice.`, `Start.`, `Finish.`) na jedno wywołanie
narzędzia `code`. Skrypt sam czyta API i podręcznik, a model nie woła API kursu przez `http`.

- Ćwiczenie samym skryptem, bez modelu: 3 z 3 zadań wypłacone w 232 ms.
- Pierwszy przebieg przez Pi (`openrouter/deepseek/deepseek-v4.1-flash`): 20 zadań w 2761 ms.
  Kurs go odrzucił z innego powodu ([P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)).
- Drugi przebieg: 20 zadań w 2171 ms przy limicie 6000 ms, jeden skrypt i jedno wywołanie
  modelu. 18 wypłacono, 2 zaparkowano.
- Zasada kodu: żadnego ponawiania wypłaty, bo ponowienie mogłoby zapłacić dwa razy. Gdy
  skrypt wypisze `FAIL`, `ROLE.md` każe zacytować linię i się zatrzymać.

Debrief HQ, dosłownie:

> Your harness read the limit (8000 ms in practice, 6000 ms in the run) and put the batch into one script, so the model made one call. The 20 tasks took 2171 ms; a model turn per task would have taken seconds each.

> The course recorded: no run ran out of time.

> Why it matters: Each model turn costs a second or more, and 20 chained tasks under a limit set from your network leave no room for that. So routine work runs as a script, and the model judges only what the script cannot decide.

> Rule 2 for your factory: Run routine work as a script; the model decides only what the script cannot.

W zestawie narzędzi kursu: „Routine work runs as a script, not model turns (batch.mjs)”.

**Stosuj.**

- Zanim zaprojektujesz agenta, odczytaj limit i podziel go przez czas jednej tury modelu. Jeśli
  wychodzi mniej niż liczba elementów, partię robi skrypt.
- Skrypt wypisuje to, co model ma zgłosić: ile zrobiono, co zaparkowano i dlaczego, ile
  trwało. Model nie musi niczego liczyć.
- Przy operacjach, których nie wolno powtórzyć (wypłata, wysyłka), `FAIL` kończy przebieg, a
  decyzję o ponowieniu podejmuje człowiek ([P09](../02-kontrakty-i-gotowe/p09-wyslane-to-nie-potwierdzone.md)).
- Podział kodu i modelu opisuje [P53](../08-harness/p53-kod-sprawdza-model-decyduje.md), a
  czas jako część zachowania [P26](p26-czas-jest-czescia-zachowania.md).
- Koszt modelu: jedno wywołanie na przebieg i tani model wystarczają ([P19](../04-orkiestracja/p19-dobor-modelu-i-koszt.md)).

---

← [P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P63](../07-czlowiek-w-petli/p63-regula-z-dokumentu-to-sprawdzenie.md) →
