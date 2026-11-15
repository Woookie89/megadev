# P15 · Pytaj przeszłe sesje zamiast zgadywać i czytaj je wszystkie

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S01E02, S02E01

> **Lekcje:**
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)
> - S02E05 · Niezawodność agentów → rozdział „Obserwowalność w systemach agentowych” — [po polsku](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) · [oryginał EN: „Observability in agentic systems”](../../s02e05-agent-reliability.md#observability-in-agentic-systems)

**Zasada.** Gdy odpowiedź jest w dawnej sesji, przeszukaj sesje i cytuj `plik:linia`.
„Nie znaleziono” to też wynik, który trzeba podać, a nie lukę do zapełnienia z pamięci.

**Przypadek.**
- S02E01: decyzje były rozrzucone po sesjach Claude Code, Codex i wątkach podagentów. Jeden
  skrypt (`s02e01/work/dump.py`) czytał wszystkie formaty, więc nic nie umknęło.
- S01E02: recall pokazał, że sesji z runu 1 nie ma w archiwum. Debrief został oznaczony jako
  niepełny, zamiast dopowiadać przebieg.

**Stosuj.** Skill rook-loop (recall). Wszystko, co ma żyć dłużej niż 30 dni, przenieś do
plików w repo.

---

← [P14](p14-jedna-decyzja-jeden-wiersz.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P16](p16-drabina-trwalosci.md) →
