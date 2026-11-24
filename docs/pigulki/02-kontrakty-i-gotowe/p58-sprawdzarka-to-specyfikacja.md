# P58 · Sprawdzarka odbiorcy to specyfikacja: przeczytaj ją przed pierwszym buildem

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E04, S04E04

> **Lekcje:**
>
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Bramki jakości” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#bramki-jakości) · [oryginał EN: „Quality Gates”](../../s03e04-verifying-product-outcomes.md#quality-gates)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Akceptacja” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#akceptacja) · [oryginał EN: „Acceptance”](../../s03e04-verifying-product-outcomes.md#acceptance)

**Zasada.** Gdy odbiorca ma własną sprawdzarkę (skrypt replay, workflow CI, testy akceptacyjne,
walidator formatu), przeczytaj ją, zanim zaczniesz budować. To najdokładniejsza specyfikacja,
jaką dostaniesz: mówi, co zostanie zmierzone, a nie tylko, co zostało opisane. Każde jej
sprawdzenie zamień na własny test, zanim uruchomisz ją na prawdziwym wyniku.

**Dlaczego.** README i opis zadania mówią, czego autor chce, ale skrótem. Sprawdzarka mówi
to samo dokładnie, bo musi to policzyć. Agent buduje według tekstu, który ma w kontekście.
Sprawdzarki, której nie przeczytał, nie bierze pod uwagę, więc o różnicy dowiaduje się
z odmowy, a odmowa zwykle nie mówi wszystkiego. Lekcja mówi, że bramki jakości powinny być
w większości deterministyczne i że agent jeszcze przed końcem zadania powinien wiedzieć, co
zrobi z weryfikacją i dowodami. Deterministyczną bramkę da się przeczytać.

**Przypadek.** S03E04: pierwszy build tablicy przebudowywał całą listę przez `innerHTML` co
2 s. Na ekranie lista mrugała, a użytkownik tracił miejsce. Testy tego nie widziały. Replay
kursu przyszedł z odpowiedzią produktu i harness przeczytał go przed uruchomieniem. Litery
nonce (`a d g h i j`) wybierały sprawdzenia, a sprawdzenie j liczyło wiersze `incident-row`
usunięte z DOM podczas obserwacji tablicy i wymagało zera. Harness przeszedł na render po
kluczu (wiersze już widoczne zostają, nowe wchodzą nad nimi) i dodał własny test z tym samym
`MutationObserver`. Replay na żywej tablicy: `unmet: []`, `z: 0`. Kurs zapisał to jako decyzję,
która przesądziła o wyniku: „A course's checker is a spec you can read, so reading the replay
before the run turned a hidden fail into a fix.” oraz „A refresh that redraws everything blinks
and loses your place. Change only what changed.”

Ten sam replay pokazał też inne sprawdzenia: cichą noc (loader ma zniknąć, a pusta lista ma
pokazać `empty`; kurs: „An empty answer is an answer: a loader must end.”), potwierdzenie,
które nazywa wybrany incydent, i trzy acki z celowaniem. Rada kursu na następny raz: „Read the
course's checker before the first build, and record the plan's tensions as scenarios, because
the refused evidence and the blink both came from checks you could see up front.”

S04E04: sprawdzarka była ukryta. Odmowy mówiły „Task 1: wrong answer. Start a new run.” albo „The run
was not accepted. The course will not say why.”, a każde ponowne pobranie podręcznika zakładało nową
próbę i nową 10-minutową noc. Dwie rzeczy skróciły drogę. Po pierwsze, mechanika podpowiedzi ze strony
HQ: podpowiedź przychodzi od drugiej nieudanej próby w tym samym miejscu, a rozwiązanie po podpowiedzi
liczy się jako rozwiązanie z pomocą (sesja `3152bc38-….jsonl:1070`). `POST /run` na tej samej próbie
dał nowy przebieg z tym samym zadaniem 1, więc druga odpowiedź przyniosła podpowiedź bez nowej nocy.
Dwa przebiegi testowe na odrzuconej już próbie (`node batch.mjs run`) dały dwie kolejne. Po drugie,
odmowa wskazała `check-lane night-run`, a ta potrzeba powiedziała, co kurs czyta: zapisy desku
(co kurs wysłał, dostarczenie po dostarczeniu, i co desk zrobił), czy każdy wynik mówi, co desk
naprawdę zrobił, i które zdarzenia należały do właściciela. Z tego wynika rada HQ na następny raz:
wysyłaj jeden wynik na id zdarzenia, bo kurs czyta każdy wynik jako twierdzenie
([P69](../05-agent-bez-czlowieka/p69-kazde-zdarzenie-obsluz-raz.md)). Wyzwanie i tak wymagało trzech
nocy, a kurs liczy 9 odmów, 7 z podpowiedzią. Gdy sprawdzarki nie da się przeczytać, czytaj to, co o
niej mówi odbiorca (opis potrzeby, podpowiedź), i szukaj najtańszej drogi do jej odpowiedzi, zanim
zapłacisz pełną cenę nowej próby.

**Stosuj.**

- Przed pierwszym buildem wypisz wszystko, co sprawdza odbiorca: skrypty, workflow CI, szablon
  dowodu, haki (`data-testid`). Każde sprawdzenie to jeden wiersz i jeden twój test.
- Gdy sprawdzarka przychodzi później (jak replay z odpowiedzią produktu), przeczytaj ją przed
  pierwszym uruchomieniem, nie po porażce.
- Sprawdzarki nie edytuj i nie obchodź. Sprawdź jej sumę, jeśli odbiorca ją podaje
  (`sha256sum -c`).
- Napięcia w planie zapisz od razu jako scenariusze
  ([P56](p56-gotowe-to-zaobserwowany-rezultat.md)).
- Najpierw kontrakt, potem wysyłka: sprawdzarka jest częścią kontraktu
  ([P06](p06-najpierw-kontrakt.md)).

---

← [P57](p57-dowod-nazywa-build-i-moment.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P59](p59-liczba-w-podsumowaniu-to-twierdzenie.md) →
