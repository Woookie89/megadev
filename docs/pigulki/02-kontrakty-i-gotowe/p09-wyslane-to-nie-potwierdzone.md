# P09 · Krok, który czeka na drugą stronę, zamykasz po jej potwierdzeniu

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S01E04, S03E04

> **Lekcje:**
>
> - S01E04 · Praca z harnessami AI → rozdział „Harnessy” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#harnessy) · [oryginał EN: „Harnesses”](../../s01e04-working-with-ai-harnesses.md#harnesses)

**Zasada.** „Wysłane” i „potwierdzone” to dwa różne stany. Sprzątanie zależy od
potwierdzenia, nie od wysyłki.

**Przypadek.** S01E04: harness zamknął issue #8 zaraz po wysłaniu linku recenzentowi. Kurs:
„you closed #8 before the reviewer looked.” Odmowa, ponowne otwarcie, zamknięcie dopiero po
potwierdzeniu.

S03E04: po raporcie z kroku 1 kurs podał tylko, kiedy produkt odpowie („They answer around
2026-11-19T23:20:40.625Z”). README startera dawało dwie drogi odbioru: mail do skrzynki agenta,
jeśli ją zbudowano, albo `resume-challenge`. Harness nie miał skrzynki. Czekał w tej samej
sesji do podanej godziny i o 23:20:47 UTC wywołał `resume-challenge`. Kurs uznał samodzielny
odbiór odpowiedzi (T2) za niezdobyty: „Give your agent an inbox or a resume step, so it picks
up product's answer when it arrives.”

**Stosuj.** W planie zapisuj kroki zewnętrzne jako „czeka na X” z jawnym sygnałem
zakończenia. Kroki, które po nim następują, wstrzymaj do nadejścia tego sygnału. Gdy
odpowiedź może przyjść później, niż trwa sesja, odbiór zrób osobnym krokiem: skrzynka,
webhook albo zaplanowane wznowienie o podanej godzinie.

---

← [P08](p08-test-najpierw-czerwony.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P10](p10-sprawdz-z-zewnatrz.md) →
