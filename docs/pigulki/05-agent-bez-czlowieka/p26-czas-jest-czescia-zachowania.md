# P26 · Czas jest częścią zachowania

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S02E02

> **Lekcje:**
>
> - S02E05 · Niezawodność agentów → rozdział „Obserwowalność w systemach agentowych” — [po polsku](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) · [oryginał EN: „Observability in agentic systems”](../../s02e05-agent-reliability.md#observability-in-agentic-systems)

**Zasada.** Oceniający (człowiek, kurs, monitoring) widzi kolejność zdarzeń, nie intencje
agenta.

**Przypadek.** S02E02: poprawna odpowiedź wyszła 15 s po mailu od obcego nadawcy, bo w tym
czasie agent się restartował. Kurs uznał to za `untrusted_sender_obeyed`. Poprawka:
odpytywanie co 5 s zamiast co 15 s i żadnych restartów w trakcie rundy.

---

← [P25](p25-dostawca-zawodzi.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P27](p27-agent-widzi-swoje-logi.md) →
