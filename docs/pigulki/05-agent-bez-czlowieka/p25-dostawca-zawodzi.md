# P25 · Dostawca modelu zawodzi, więc projektuj na to

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02

**Zasada.** Błędy chwilowe (429, 5xx), odmowy i blokady narzędzi po stronie dostawcy to
normalne zdarzenia, a nie wyjątki.

**Przypadek.**
- S01E05: jeden błąd 503 od Gemini i test writer się poddał, co kosztowało rundę.
- S02E02: odmowa (`content_filter`) od Opus i serwerowe `web_fetch` Anthropic z odmową dla
  domeny kursu (`url_not_allowed`).

**Stosuj.**
- Ponawianie przy 429 i 5xx.
- Łańcuch modeli zapasowych.
- Walidacja odpowiedzi ([P11](../02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md)).
- Własne narzędzia zamiast serwerowych tam, gdzie liczy się zasięg i log. Własne `fetch_url`
  działa u każdego dostawcy i zapisuje, co otwarto.

---

← [P24](p24-petla-potrzebuje-wyjscia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P26](p26-czas-jest-czescia-zachowania.md) →
