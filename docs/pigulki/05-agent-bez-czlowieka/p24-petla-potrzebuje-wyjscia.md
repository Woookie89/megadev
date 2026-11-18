# P24 · Pętla potrzebuje wyjścia: warunku, limitu i widocznego stanu

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S02E01

> **Lekcje:**
>
> - S02E01 · Prymitywy agentowe → rozdział „Pętla agenta” — [po polsku](../../pl/s02e01-agentic-primitives.md#pętla-agenta) · [oryginał EN: „Agentic Loop”](../../s02e01-agentic-primitives.md#agentic-loop)

**Zasada.** Każda pętla agenta ma trzy rzeczy: warunek sukcesu (komenda, która to
sprawdza), limit (iteracje, czas, budżet) i plik stanu, który człowiek może przeczytać
i wyłączyć.

**Przypadek.**

- `stop_gate.py` (S02E01): `MAX_BLOCKS = 3` i zasada „źródło, które się nie ładuje, nie jest
  powodem, żeby kręcić się w pętli”.
- Artefakt „loop” z talii kursu: pętla z widocznym plikiem stanu i trzema wyjściami.
- Kontrprzykład z tego repo: pętla Ralph uruchomiona 15.11 („rób dopóki nie zwróci solved”)
  ma w `s02e01/.claude/ralph-loop.local.md` wpisane `completion_promise: null`
  i `max_iterations: 0`, czyli bez warunku i bez limitu. Plik miał `active: true`
  jeszcze po rozwiązaniu obu wyzwań i został usunięty ręcznie 15.11.2026.

**Stosuj.** Przy `/ralph-loop` i `/loop` zawsze podaj warunek końca (completion promise albo
komendę) i limit iteracji. Po zakończeniu sprawdź, czy plik stanu jest wyłączony.

---

← [P23](p23-stan-poza-procesem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P25](p25-dostawca-zawodzi.md) →
