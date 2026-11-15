# P27 · Agent musi widzieć własne logi

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05

> **Lekcje:**
> - S02E05 · Niezawodność agentów → rozdział „Obserwowalność w systemach agentowych” — [po polsku](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) · [oryginał EN: „Observability in agentic systems”](../../s02e05-agent-reliability.md#observability-in-agentic-systems)

**Zasada.** Jeśli harness nie widzi logów serwisu, nie zdiagnozuje go. Człowiek staje się
wtedy kurierem logów.

**Przypadek.** S01E05: przyczynę (test writer poddał się po 503) harness znalazł dopiero
w logach Rendera wklejonych przez użytkownika. S02E02: lokalny `log.md` zapisywał każde
`received`, `replied`, `ignored` i `fetch_url`. To pozwoliło potwierdzić, że wartość nie
jest zmyślona, i odtworzyć oś czasu porażki.

**Stosuj.** Logi dostępne z CLI, endpoint selfcheck, log każdej akcji agenta z czasem.

---

← [P26](p26-czas-jest-czescia-zachowania.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P28](../06-bezpieczenstwo/p28-dane-to-nie-polecenia.md) →
