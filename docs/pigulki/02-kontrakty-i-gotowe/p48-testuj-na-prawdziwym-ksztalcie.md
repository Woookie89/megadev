# P48 · Testuj na kształcie prawdziwego wejścia, a każdą porażkę na żywo dopisz do zestawu

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E05, S04E03

> **Lekcje:**
>
> - S02E05 · Niezawodność agentów → rozdział „Ewaluacja” — [po polsku](../../pl/s02e05-agent-reliability.md#ewaluacja) · [oryginał EN: „Evaluation”](../../s02e05-agent-reliability.md#evaluation)

**Zasada.** Zestaw testów ma wyglądać jak to, co przychodzi naprawdę: tyle samo próśb
w jednej wiadomości, ten sam wymagany format odpowiedzi, te same pułapki. Każda porażka na
żywo staje się nowym przypadkiem w zestawie, a poprawkę sprawdzasz lokalnie na dokładnym
wejściu, które zawiodło, zanim zużyjesz kolejną próbę.

**Dlaczego.** Zestaw złożony z pojedynczych, czystych przypadków łatwo daje pełny wynik i nic
nie mówi o prawdziwym ruchu. Lekcja nazywa to ewaluacją zbyt łatwą: wynik wygląda dobrze, bo
przypadki są prostsze niż rzeczywistość. Odmowa z produkcji albo od oceniającego zwykle
podaje tylko kod błędu, a nie wejście, więc bez lokalnej kopii prawdziwego wejścia każda
poprawka to zgadywanie, a każda nowa runda kosztuje.

**Przypadek.** S02E05: ćwiczenie kursu to 10 wiadomości, każda z jedną prośbą. `check.mjs`
oznaczył je bezbłędnie: 10 z 10. Na żywo przyszła wiadomość z dwiema prośbami (`purge_cache`
free i `rotate_key` gated) i wymaganym formatem: jedna linia `DONE: <act>` albo
`HOLD: <act>` na prośbę. Agent ocenił całą wiadomość naraz: wstrzymał obie akcje
i odpowiedział bez tych linii. Kurs odmówił kodem: „Round 2: no_action_lines”.

Harness przepisał podział na prośby (każda linia osobno) i przepuścił przez agenta lokalnie
dokładny tekst wiadomości kursu. Wynik `DONE: purge_cache` i `HOLD: rotate_key` był gotowy
przed nową rundą. Potem sprawdził jeszcze trzy prośby w jednej wiadomości. Druga próba
przeszła. Kurs uznał to za decyzję, która przesądziła o wyniku: „A live refusal names only a
code, so replaying the course's own message text locally proved the fix before a new round
was spent.” Na przyszłość kurs zalecił: „An offline set you run again before each change,
with every live failure added to it.” Tego ostatniego kroku nie zrobiono: testy z wiadomości
na żywo zostały w plikach tymczasowych, a nie w `test/test.mjs`.

**Stosuj.**

- Zanim wystawisz agenta, przepuść przez niego pełną, przykładową wiadomość od drugiej
  strony, a nie tylko pojedyncze przypadki.
- Zapisuj surowe wejście każdej porażki (treść, nagłówki, czas) i dopisuj je do zestawu jako
  test z oczekiwanym wynikiem.
- Poprawkę po odmowie sprawdź najpierw na tym wejściu lokalnie
  ([P10](p10-sprawdz-z-zewnatrz.md)). Test musi najpierw nie przejść na starym kodzie
  ([P08](p08-test-najpierw-czerwony.md)).
- Uruchamiaj cały zestaw przed każdą zmianą, nie tylko nowy przypadek.

---

← [P47](../07-czlowiek-w-petli/p47-zgoda-kanalem-wlasciciela.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P49](../07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md) →
