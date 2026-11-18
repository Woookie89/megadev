# P41 · Błąd narzędzia mówi modelowi, co poprawić

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S02E03

> **Lekcje:**
>
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Narzędzia od podszewki” — [po polsku](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) · [oryginał EN: „Tool use under the hood”](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood)
> - S02E03 · Możliwości agentów → rozdział „Projektowanie własnego MCP” — [po polsku](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) · [oryginał EN: „Designing a custom MCP”](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp)

**Zasada.** Złe wywołanie zwraca wynik z `isError: true` i jednym zdaniem dla modelu.
Zdanie nazywa złą wartość, mówi, co z nią nie tak, i co wysłać zamiast niej. Bez wyjątku,
bez stack trace'a i bez błędu protokołu.

**Dlaczego.** Model poprawia następne wywołanie wyłącznie na podstawie tego, co przeczyta
w błędzie. „Not a supported audio file” mówi, że coś jest źle, ale nie mówi, który argument
ani co zrobić. Model zgaduje wtedy jeszcze raz albo się poddaje. Wyjątek i błąd JSON-RPC
często nie docierają do modelu wcale, bo harness pokazuje je użytkownikowi.

**Przypadek.** S02E03: kurs wywołał `transcribe` ze stroną logowania i z brakującym plikiem.
Oceniał: „the tool error does not name the url; a helpful one names it and says what is
wrong with it”. Po poprawce:

- „<https://hq.mega.dev/login> is not a supported audio file (type "text/html"). Use wav, mp3,
  m4a, ogg, webm, flac or aac.”
- „Could not download the audio at <https://hq.mega.dev/media/s02e03/missing.mp3>: download
  answered HTTP 404.”

**Stosuj.**

- Każdy znany błąd ma wiersz w tabeli błędów kontraktu: pole, co jest nie tak, co wysłać
  dalej.
- Walidację wejścia rób w narzędziu i zwracaj ją jako wynik z `isError`, a nie jako błąd
  protokołu.
- Gdy żadne pole nie jest złe (timeout, dostawca zajęty), powiedz to i podaj, kiedy
  powtórzyć to samo wywołanie.
- Przetestuj złe wejścia: stronę zamiast pliku, 404, zły schemat url, pusty plik.

---

← [P40](p40-wynik-ma-budzet.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P42](p42-duze-bajty-obok-modelu.md) →
