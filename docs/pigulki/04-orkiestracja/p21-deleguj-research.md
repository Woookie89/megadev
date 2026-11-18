# P21 · Deleguj research, nie tylko budowę

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: MEGA Assessment

> **Lekcje:**
>
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Podagenci i workery” — [po polsku](../../pl/s01e02-steering-models-through-context.md#podagenci-i-workery) · [oryginał EN: „Subagents and Workers”](../../s01e02-steering-models-through-context.md#subagents-and-workers)
> - S01E01 · Mechanika działania generatywnej AI → rozdział „Uogólnione sterowanie” — [po polsku](../../pl/s01e01-mechanics-behind-generative-ai.md#uogólnione-sterowanie) · [oryginał EN: „Generalized Steering”](../../../s01e01/s01e01-mechanics-behind-generative-ai.md#generalized-steering)

**Zasada.** Niezależne pytania (kilka usług, dokumentacja i kod) zlecaj podagentom.
Do głównego wątku ma wrócić wniosek, a nie surowy zapis poszukiwań.

**Dlaczego.** Research w głównym wątku zostawia w kontekście tysiące linii, które przeszkadzają
w późniejszych decyzjach i przyspieszają kompakcję ([P01](../01-kontekst/p01-kompakcja-jest-stratna.md)).

**Przypadek.** MEGA Assessment: T15 (trafność delegowania) 25%. Antywzorzec „zmarnowany
kontekst”: research, sprawdzanie i implementacja w jednym wątku.

---

← [P20](p20-brief-jak-issue.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P22](../05-agent-bez-czlowieka/p22-czat-to-nie-host.md) →
