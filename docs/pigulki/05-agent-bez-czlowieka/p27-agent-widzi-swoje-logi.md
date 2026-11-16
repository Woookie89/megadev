# P27 · Agent musi widzieć własne logi

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E03, S02E05

> **Lekcje:**
> - S02E05 · Niezawodność agentów → rozdział „Obserwowalność w systemach agentowych” — [po polsku](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) · [oryginał EN: „Observability in agentic systems”](../../s02e05-agent-reliability.md#observability-in-agentic-systems)

**Zasada.** Jeśli harness nie widzi logów serwisu, nie zdiagnozuje go. Człowiek staje się
wtedy kurierem logów.

**Przypadek.** S01E05: przyczynę (test writer poddał się po 503) harness znalazł dopiero
w logach Rendera wklejonych przez użytkownika. S02E02: lokalny `log.md` zapisywał każde
`received`, `replied`, `ignored` i `fetch_url`. To pozwoliło potwierdzić, że wartość nie
jest zmyślona, i odtworzyć oś czasu porażki. S02E03: harness zainstalował Render CLI
(człowiek zalogował je w przeglądarce) i sam przeczytał logi `mcp-home`. Zobaczył w nich,
że kurs zarejestrował się przez Client ID Metadata Document (jeden ze sposobów rejestracji
klienta OAuth) i które narzędzia wołał. Nikt nie musiał
wklejać logów.

S02E05: log statusów dla kursu powstał z linii JSON, które agent zapisywał przy każdym
zdarzeniu (`received`, `notified`, `owner_answered`, `replied`), z czasem ISO
i przesunięciem strefy. 12 linii zgodziło się z czasami kursu i kurs przyjął je za pierwszym
razem. Te linie żyły jednak tylko w pamięci procesu i w logach Rendera, a nie w pliku. Kurs:
„A log is believable only when it is written per event, with offsets, and agrees with times
someone else kept.”

**Stosuj.** Logi dostępne z CLI, endpoint selfcheck, log każdej akcji agenta z czasem.

---

← [P26](p26-czas-jest-czescia-zachowania.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P28](../06-bezpieczenstwo/p28-dane-to-nie-polecenia.md) →
