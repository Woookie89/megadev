# P12 · Czat nie jest pamięcią: przekazanie pracy zapisuj w pliku

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S01E01, S01E02

> **Lekcje:**
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Jak działa kontekst?” — [po polsku](../../pl/s01e02-steering-models-through-context.md#jak-działa-kontekst) · [oryginał EN: „How does the context work?”](../../s01e02-steering-models-through-context.md#how-does-the-context-work)
> - S02E01 · Prymitywy agentowe → rozdział „Kontekst i pamięć” — [po polsku](../../pl/s02e01-agentic-primitives.md#kontekst-i-pamięć) · [oryginał EN: „Context and Memory”](../../s02e01-agentic-primitives.md#context-and-memory)

**Zasada.** Gdy praca przechodzi do nowej sesji, zostaw plik przekazania: stan, co zrobione
(ze źródłem), co zostało, pułapki, terminy ważności, gotowe komendy i prompt do wklejenia.

**Dlaczego.** Nowa sesja zaczyna od zera. Bez pliku albo zgaduje, albo odtwarza to, co już
ustalono. Często też powtarza wykluczone już ślepe uliczki.

**Przypadek.**
- S01E02, `HANDOFF.md`: proces transkrypcji zostawiony w tle, z opisem, jak sprawdzić, czy
  skończył, i co zrobić, jeśli nie. Lista znanych błędów Whispera. Daty wygaśnięcia ticketu
  i receiptów.
- S01E04, `HANDOVER.md` + `KEEP.md`: praca dokończona w nowej sesji po dwóch dniach.
- MEGA Assessment (T12, T24): wnioski z długiego debugowania zostawały tylko w czacie,
  więc kolejna próba ustalała wszystko od nowa.

**Stosuj.** Szablon w [Dodatku A1](../szablony/handoff.md). Kończ dzień plikiem, nie wiadomością.

---

← [P11](../02-kontrakty-i-gotowe/p11-pusta-odpowiedz-to-blad.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P13](p13-keep-ustalenie-ze-zrodlem.md) →
