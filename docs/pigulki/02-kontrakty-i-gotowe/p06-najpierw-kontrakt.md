# P06 · Najpierw kontrakt, potem wysyłka

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S01E01, S01E03

**Zasada.** Zanim wyślesz cokolwiek do API, formularza albo oceniającego, znajdź jego
kontrakt: schemat, przykład odpowiedzi, opis pól. Zgadywanie kosztuje próby.

**Przypadek.**
- S01E01: `schema.json` był ukryty w źródle strony i podał pola `from`, `compactedMessage`
  oraz limit 700 znaków.
- S01E04: kształt claimu `{repo, preview}` zapisany w KEEP, zanim powstał kod.
- S01E03 (odwrotnie): README mówiło „your signature”. Harness podpisał stronę nazwą
  z GitHuba, a kurs przyjmował tylko `ticket` ze `start-challenge`. Jedna odmowa.

**Stosuj.**
- Szukaj: `schema`, `openapi`, przykłady odpowiedzi, README, źródło strony.
- Niejednoznaczne słowo w wymaganiach („podpis”, „gotowe”, „liczba zgłoszeń”) sprawdź
  w źródle, zanim zbudujesz na nim pracę.
- Skill `read` z talii kursu robi to systematycznie.

---

← [P05](../01-kontekst/p05-fakty-zmienne-u-zrodla.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P07](p07-gotowe-to-sprawdzenie.md) →
