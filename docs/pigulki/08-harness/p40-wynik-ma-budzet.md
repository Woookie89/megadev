# P40 · Wynik narzędzia ma budżet bajtów

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S02E03

> **Lekcje:**
>
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Narzędzia od podszewki” — [po polsku](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) · [oryginał EN: „Tool use under the hood”](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood)
> - S02E02 · Budowanie agenta → rozdział „Projektowanie narzędzi” — [po polsku](../../pl/s02e02-building-an-agent.md#projektowanie-narzędzi) · [oryginał EN: „Designing tools”](../../s02e02-building-an-agent.md#designing-tools)
> - S02E03 · Możliwości agentów → rozdział „Projektowanie własnego MCP” — [po polsku](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) · [oryginał EN: „Designing a custom MCP”](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp)

**Zasada.** Ustal dla każdego narzędzia jedną liczbę: ile bajtów może mieć cały wynik.
Zwracaj tylko pola, których agent użyje w następnym kroku, i każde tylko raz.

**Dlaczego.** Wszystko, co zwraca narzędzie, trafia do kontekstu modelu i zostaje tam do
końca zadania. Każdy zbędny bajt zabiera miejsce na rozumowanie, kosztuje przy każdym
kolejnym wywołaniu i rozprasza model. Surowa odpowiedź API zwykle ma pola, których agent
nigdy nie użyje. Łatwo też wysłać to samo dwa razy: raz jako `structuredContent`, raz jako
jego tekstową kopię.

**Przypadek.** S02E03: kurs zmierzył wynik `transcribe` na swoim klipie kalibracyjnym:
„the whole result is 1394 B, over the 1024 B limit (structuredContent 569 B, text 569 B,
rest 256 B)”. Transkrypt był w wyniku dwa razy: jako pole `text` obok segmentów i jako kopia
JSON-a w bloku tekstowym. Po wycięciu pola `text`, języka i długości oraz zamianie kopii
JSON-a na linie `[start-end] tekst` wynik miał 822 B. Harness zmierzył to lokalnie na klipie
kursu, zanim zrobił deploy.

**Stosuj.**

- W kontrakcie narzędzia (`TOOL.md` ze skilla `hands`) zapisz budżet jednego wyniku
  w bajtach.
- O każde pole zapytaj: „co agent zrobi z tym dalej?”. Pole bez odpowiedzi wylatuje.
- Nie wysyłaj tych samych danych dwa razy. Blok tekstowy może być zwięzłym widokiem
  (np. jedna linia na rekord), a nie kopią JSON-a.
- Mierz cały wynik, z kopertą JSON-RPC, na danych odbiorcy, a nie na własnym przykładzie.

---

← [P39](p39-mcp-kontrakt-dla-klienta.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P41](p41-blad-mowi-co-poprawic.md) →
