# P07 · „Gotowe” wyznacza sprawdzenie, a nie poczucie końca

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S02E01, MEGA Assessment

> **Lekcje:**
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)
> - S02E03 · Możliwości agentów → rozdział „Personalizacja” — [po polsku](../../pl/s02e03-agentic-capabilities.md#personalizacja) · [oryginał EN: „Personalization”](../../s02e03-agentic-capabilities.md#personalization)

**Zasada.** Agent kończy, gdy przechodzi konkretne sprawdzenie: komenda, test albo odpowiedź
systemu. Bez tego o końcu decyduje raport samego agenta.

**Dlaczego.** Pętla agenta (S02E01) kończy się, gdy model przestaje prosić o narzędzia.
Modele mają skłonność do ogłaszania sukcesu, a długi, zapełniony kontekst tylko ją wzmacnia.
Zewnętrzne sprawdzenie nie ma tej skłonności.

**Przypadek.** S02E01: dwie odmowy przed rozwiązaniem. Harness napisał `stop_gate.py`, który
przed zakończeniem pracy pobiera listę źródeł i odsyła agenta z powrotem, jeśli coś jest
nieprzeczytane. MEGA Assessment: T06 (sprawdzalne kryteria akceptacji) to najsłabsza cecha
(38%).

**Stosuj.**
- Każde zlecenie kończ zdaniem „gotowe, gdy …”, np. „gotowe, gdy `pytest` jest zielony
  i logowanie przechodzi w prawdziwej przeglądarce”.
- W pętlach użyj `./verify` (rook-loop, done-check) albo hooka `Stop`.
- Bramka potrzebuje limitu (w `stop_gate.py` jest to `MAX_BLOCKS = 3`), inaczej sama staje
  się pętlą bez wyjścia.

---

← [P06](p06-najpierw-kontrakt.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P08](p08-test-najpierw-czerwony.md) →
