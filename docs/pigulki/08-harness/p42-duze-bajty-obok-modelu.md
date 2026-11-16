# P42 · Duże bajty idą obok modelu, nie przez niego

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S02E03

> **Lekcje:**
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Narzędzia od podszewki” — [po polsku](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) · [oryginał EN: „Tool use under the hood”](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood)
> - S02E03 · Możliwości agentów → rozdział „Model Context Protocol” — [po polsku](../../pl/s02e03-agentic-capabilities.md#model-context-protocol) · [oryginał EN: „Model Context Protocol”](../../s02e03-agentic-capabilities.md#model-context-protocol)

**Zasada.** Plik, audio, obraz i długi log nie podróżują w argumentach ani w wyniku jako
tekst czy base64. Narzędzie przyjmuje url, który samo pobierze, albo ścieżkę na maszynie,
która ma plik. Duży wynik idzie do pliku albo pod url. Model dostaje adres, rozmiar
i pierwszą linię.

**Dlaczego.** Wszystko w argumentach model musi wygenerować token po tokenie, a wszystko
w wyniku trafia do jego kontekstu. 8 MB pliku jako base64 to około 11 MB tekstu. Model tego
nie przepisze bez błędu i nie zmieści w kontekście. Url albo ścieżka kosztuje kilkadziesiąt
bajtów, a bajty płyną między maszynami bez udziału modelu.

**Przypadek.** S02E03: kurs kazał wgrać log `2026-10-05.log` (8,5 MB) przez narzędzie
`upload`. Harness wysłał go skryptem prosto na endpoint MCP, więc base64 nie przeszło przez
model. Model widział kilka pierwszych linii i zwrócony link z rozmiarem, a bajty pobrane
z linku były identyczne z lokalnymi. Kontrakt `upload` przyjmuje jednak `content_base64`.
Według reguły 4 skilla `hands` to błąd projektu: zadziałał tylko dlatego, że wysłał to skrypt.
`transcribe` od początku przyjmował url.

**Stosuj.**

- Żadne pole wejścia nie trzyma zawartości pliku. Zapytaj: „gdzie leży wejście i czy
  narzędzie tam sięgnie?”.
- Upload na zdalny serwer: osobna ścieżka HTTP na bajty (PUT albo podpisany url), a narzędzie
  dostaje i zwraca tylko adres.
- Url od modelu: tylko `http` i `https`, bez adresów lokalnych i prywatnych, z limitem
  rozmiaru i czasu ([P31](../06-bezpieczenstwo/p31-uwierzytelnione-zadania.md)).
- Gdy jednak musisz przenieść bajty w tej sesji, zrób to skryptem, a nie przez model.

---

← [P41](p41-blad-mowi-co-poprawic.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P43](../04-orkiestracja/p43-przekaz-skill-z-zadaniem.md) →
