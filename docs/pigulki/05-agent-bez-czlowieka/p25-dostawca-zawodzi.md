# P25 · Dostawca modelu bywa zawodny: uwzględnij to w projekcie

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E02, S04E01

> **Lekcje:**
>
> - S02E02 · Budowanie agenta → rozdział „Dostawcy i konfiguracja” — [po polsku](../../pl/s02e02-building-an-agent.md#dostawcy-i-konfiguracja) · [oryginał EN: „Providers and configuration”](../../s02e02-building-an-agent.md#providers-and-configuration)
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Narzędzia od podszewki” — [po polsku](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) · [oryginał EN: „Tool use under the hood”](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood)

**Zasada.** Błędy chwilowe (429, 5xx), odmowy i blokady narzędzi po stronie dostawcy to
normalne zdarzenia, a nie wyjątki.

**Przypadek.**

- S01E05: jeden błąd 503 od Gemini i test writer się poddał, co kosztowało rundę.
- S02E02: odmowa (`content_filter`) od Opus i serwerowe `web_fetch` Anthropic z odmową dla
  domeny kursu (`url_not_allowed`).
- S04E01: ćwiczenie przez Pi dało 401 „API key expired”. Klucz OpenRouter skopiowany z `.env`
  wcześniejszego wyzwania wygasł, a błąd wyglądał jak awaria modelu. Przebieg ruszył po wpisaniu
  przez człowieka świeżego klucza. 401 to problem klucza, a nie modelu: zanim zmienisz model,
  sprawdź uwierzytelnienie.

**Stosuj.**

- Ponawianie przy 429 i 5xx.
- Łańcuch modeli zapasowych.
- Walidacja odpowiedzi ([P11](../02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md)).
- Własne narzędzia zamiast serwerowych tam, gdzie liczy się zasięg i log. Własne `fetch_url`
  działa u każdego dostawcy i zapisuje, co otwarto.

---

← [P24](p24-petla-potrzebuje-wyjscia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P26](p26-czas-jest-czescia-zachowania.md) →
