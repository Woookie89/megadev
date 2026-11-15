# P11 · Pusta odpowiedź i tekst zastępczy to błąd, nie wynik

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E02

**Zasada.** Odpowiedź modelu waliduj przed wysłaniem: czy jest, czy ma wymagany format.
Gdy nie ma, ponów albo zmień model. Nie wysyłaj tekstu zastępczego.

**Przypadek.** S02E02: Opus 5.5 przez OpenRouter zwrócił pustą odpowiedź (`content_filter`),
a agent wysłał tekst bez wartości. Przegrana runda tak samo jak przy złej wartości.

**Stosuj.** Walidator formatu (np. wiersz `ANSWER: <value>`) jako warunek wysłania, a pusta
odpowiedź liczy się jako wyjątek do obsłużenia.

---

← [P10](p10-sprawdz-z-zewnatrz.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P12](../03-pamiec/p12-czat-nie-jest-pamiecia.md) →
