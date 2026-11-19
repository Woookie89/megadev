# P57 · Dowód nazywa build i moment: co miało się stać, co się stało, na którym buildzie i w której sekundzie

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E04

> **Lekcje:**
>
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Akceptacja” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#akceptacja) · [oryginał EN: „Acceptance”](../../s03e04-verifying-product-outcomes.md#acceptance)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „System diff” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#system-diff) · [oryginał EN: „System Diff”](../../s03e04-verifying-product-outcomes.md#system-diff)

**Zasada.** Dowód, który ktoś ma przeczytać i ocenić, nazywa w polach, a nie tylko w opisie:
przepływ, moment w nagraniu (`mm:ss`), co miało się stać (`expected`), co się stało (`got`),
build, który widać na nagraniu (sha), i link do nagrania. Sha pochodzi z kodu, który faktycznie
został wdrożony i nagrany, a nie z ostatniego commitu repo.

**Dlaczego.** Model pisze raport prozą i ma poczucie, że wszystko w nim powiedział. Odbiorca,
zwłaszcza automatyczny, czyta pola. Czego nie ma w polu, tego dla niego nie ma. Bez pary
„oczekiwane / otrzymane” dowód pokazuje zdarzenie, ale nie mówi, co w nim jest błędem. Bez sha
nagranie dowodzi działania „jakiegoś” buildu, a stare nagranie dowodzi tylko starego buildu.
Sha z `HEAD` przesuwa się przy każdym commicie narzędzi, testów albo dokumentacji, choć strona
się nie zmieniła. Lekcja każe rejestrować dowody z prawdziwego buildu i dopasować je do ryzyka
zmiany. System diff ma pokazać człowiekowi odpowiedź, decyzje i „przed i po” w takim stosunku
sygnału do szumu, żeby mógł szybko zdecydować.

**Przypadek.** S03E04: raport kroku 1 opisał prozą, że wskaźnik celował w INC-6755, a ack
dostał INC-3647. Blok `evidence` miał jednak tylko pola z szablonu startera: `flow`, `at`,
`receipt`, `sha`, `videoLink`. Kurs odrzucił claim: „Which row did you mean, and which got the
ack? Name them in the evidence block as expected and got (incident ids).” Po dopisaniu
`"expected": "INC-6755"` i `"got": "INC-3647"` krok 1 przeszedł.

W kroku 2 harness zacommitował skrypt drugiego nagrania. `HEAD` przesunął się na 3e5fab0, choć
`app/` się nie zmieniło. Stempel z `git rev-parse --short HEAD` nazwałby więc build sha,
którego nie ma na nagraniu. `build.mjs` stempluje teraz ostatni commit, który zmienił `app/`
(`git log -1 --format=%h -- app`), i odmawia budowania, gdy `app/` ma niezacommitowane zmiany.
Strona, stopka i blok `evidence` mówią `60bbdea`. Kurs: „A proof names its build. Old
recordings prove old builds.” Skill `prove` z talii kursu porównuje stronę z `HEAD`, więc na
tej tablicy zwrócił `mismatch`, a z `--expect 60bbdea` zwrócił `match`. Konwencję trzeba
wybrać jedną.

**Stosuj.**

- Blok dowodu ma pola: `flow`, `at`, `expected`, `got`, `sha`, `videoLink` i receipt albo inny
  ślad z systemu. Pary `expected` / `got` używaj także wtedy, gdy wszystko zadziałało
  (wtedy są równe).
- Stempluj build w stronie (`<meta name="build">`, stopka) z commitu, który zmienił wdrażany
  kod. Budowanie z niezacommitowanymi zmianami blokuj.
- Po wdrożeniu odczytaj sha z żywej strony i porównaj z blokiem dowodu
  ([P10](p10-sprawdz-z-zewnatrz.md)). Uważaj na cache CDN tuż po wdrożeniu.
- Nazwę pliku nagrania wiąż z buildem (`board-60bbdea.mp4`), żeby stare nagranie nie udawało
  nowego.
- Raport dla człowieka zaczynaj od odpowiedzi i decyzji, a szczegóły (`file:line`, pliki)
  daj niżej ([P50](p50-wymaganie-ma-adres-i-test.md)).

---

← [P56](p56-gotowe-to-zaobserwowany-rezultat.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P58](p58-sprawdzarka-to-specyfikacja.md) →
