# P02 · Kontekst to tekst, a każda konwersja do tekstu jest stratna

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S01E02

**Zasada.** Mowa, wideo, PDF czy zrzut ekranu trzeba najpierw przetłumaczyć na tekst.
Tłumacz (Whisper, OCR, parser) to też model, który się myli.

**Dlaczego.** Modele transkrypcji zgadują najbardziej prawdopodobne słowo. Mylą homofony,
gubią krótkie frazy, a na ciszy potrafią dopisać słowo, którego nie było.

**Przypadek.** S01E02: odpowiedź była tylko w mowie, a terminal na wideo pokazywał co innego.
Whisper `large-v3` zgubił „Warnings / None logged”, zapisał „Knightly” zamiast „Nightly”,
„cue” zamiast „queue” i dopisał na końcu nieistniejące „memory.”.

**Stosuj.**
- Transkrypcja to szkic, nie zapis.
- Krótsze kawałki dają dokładniejszy wynik (fraza po frazie zamiast całości naraz).
- Zapis sprawdzany słowo w słowo wymaga ręcznej korekty znanych klas błędów: homofonów,
  liczb (cyfry czy słowa), halucynacji na końcu nagrania.
- Znaczniki czasu słów pozwalają wrócić do konkretnego miejsca i przepisać je ponownie.

---

← [P01](p01-kompakcja-jest-stratna.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P03](p03-zrodlo-to-nie-widok.md) →
