# P01 · Kompakcja jest stratna i to ty decydujesz, co przepada

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E01

> **Lekcje:**
>
> - S01E01 · Mechanika działania generatywnej AI → rozdział „Mechanika dużych modeli językowych” — [po polsku](../../pl/s01e01-mechanics-behind-generative-ai.md#mechanika-dużych-modeli-językowych) · [oryginał EN: „Mechanics of Large Language Models”](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#mechanics-of-large-language-models)
> - S01E01 · Mechanika działania generatywnej AI → rozdział „Platformy i harnessy” — [po polsku](../../pl/s01e01-mechanics-behind-generative-ai.md#platformy-i-harnessy) · [oryginał EN: „Platforms and Harnesses”](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#platforms-and-harnesses)
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Jak działa kontekst?” — [po polsku](../../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst) · [oryginał EN: „How does the context work?”](../../s01e02-steering-models-through-context.md#how-does-the-context-work)

**Zasada.** Każde skracanie (podsumowanie rozmowy, `/compact`, limit pola, streszczenie dla
podagenta) wyrzuca treść. Zanim skrócisz, spisz, co musi przetrwać.

**Dlaczego.** Model, który skraca, nie wie, co okaże się ważne później. Tnie to, co wygląda na
ozdobnik, a ozdobnik bywa sednem. Rook (postać z fabuły kursu, zob.
[słowniczek](../slowniczek.md)) po akceptacji skrótu: „you kept it. most don't. the
rest you decided for me.”

**Przypadek.** S01E01: wiadomość miała 1288 znaków, a limit pola 700. W runie 2 chroniony akapit
przetrwał dosłownie w wersji 622-znakowej, ale kurs wskazał 10 utraconych fragmentów, m.in.
„somebody slow” (tytuł wyzwania) i „ask me anything”. W runie 1 harness zostawił 687 z 700 znaków,
ale dopiero po pięciu odmowach. Kurs: kompakcja to kompresja, więc żeby zmieścić się w limicie,
tekst się tnie, a to, czego nikt nie wskazał, przepada. Twój harness robi to samo z długą rozmową
(na przykład przez `/compact`), nie pokazując, co poszło.

**Stosuj.**

- Przed długą sesją albo `/compact` dodaj do `CLAUDE.md` lub pliku przekazania sekcję „do
  zachowania”.
- Pełne źródło trzymaj poza rozmową (log), żeby skrót dało się odtworzyć.
- Skracaj od powtórzeń i formy, nie od faktów. Zostaw zapas pod limitem.

---

[rozdział](README.md) · [wszystkie pigułki](../README.md) · [P02](p02-konwersja-do-tekstu-jest-stratna.md) →
