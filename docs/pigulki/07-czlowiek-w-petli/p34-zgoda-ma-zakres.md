# P34 · Zgoda ma zakres

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S01E04, S04E01

> **Lekcje:**
>
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)

**Zasada.** „Tak” obejmuje nazwany zestaw akcji w nazwanym miejscu. Wszystko poza nim wymaga
osobnej zgody.

**Przypadek.** S01E04, KEEP: „Human's yes covers pushes, issues, branches and PRs inside
Woookie89/s01e04-rig-handover only”.

S04E01: człowiek wybrał, żeby nie ruszać `http.mjs` startera (opcja A: „skup się na zadaniu”).
Po odmowie kursu `check-lane` kazał odpowiedzieć w kodzie, a harness zmienił `http.mjs` (lista
hostów na sekret, bez przekierowań), uznając to za część zadania. README startera na to pozwala
(„You and your harness may change anything here, code included.”), ale zgody człowieka na tę
zmianę w logu nie ma, a w HANDOVER wisi jako otwarta. Gdy nowe wymaganie wykracza poza zakres
wcześniejszego „tak” albo „zostaw”, wróć do człowieka przed zmianą.

---

← [P33](p33-prawa-decyzyjne.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P35](p35-uprawnienia-harnessu.md) →
