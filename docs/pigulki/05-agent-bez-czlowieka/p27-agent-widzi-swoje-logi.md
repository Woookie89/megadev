# P27 · Agent musi widzieć własne logi

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S01E05, S02E03, S02E05, S03E03, S04E01

> **Lekcje:**
>
> - S02E05 · Niezawodność agentów → rozdział „Obserwowalność w systemach agentowych” — [po polsku](../../pl/s02e05-agent-reliability.md#obserwowalność-w-systemach-agentowych) · [oryginał EN: „Observability in agentic systems”](../../s02e05-agent-reliability.md#observability-in-agentic-systems)
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Informacja zwrotna” — [po polsku](../../pl/s03e03-ai-native-product-development.md#informacja-zwrotna) · [oryginał EN: „Feedback”](../../s03e03-ai-native-product-development.md#feedback)

**Zasada.** Jeśli harness nie widzi logów serwisu, nie zdiagnozuje go. Użytkownik staje się
wtedy kurierem logów.

**Przypadek.** S01E05: przyczynę (test writer poddał się po 503) harness znalazł dopiero
w logach Rendera wklejonych przez użytkownika. S02E02: lokalny `log.md` zapisywał każde
`received`, `replied`, `ignored` i `fetch_url`. To pozwoliło potwierdzić, że wartość nie
jest zmyślona, i odtworzyć oś czasu porażki. S02E03: harness zainstalował Render CLI
(użytkownik zalogował je w przeglądarce) i sam przeczytał logi `mcp-home`. Zobaczył w nich,
że kurs zarejestrował się przez Client ID Metadata Document (jeden ze sposobów rejestracji
klienta OAuth) i które narzędzia wołał. Nikt nie musiał
wklejać logów.

S02E05: log statusów dla kursu powstał z linii JSON, które agent zapisywał przy każdym
zdarzeniu (`received`, `notified`, `owner_answered`, `replied`), z czasem ISO
i przesunięciem strefy. 12 linii zgodziło się z czasami kursu i kurs przyjął je za pierwszym
razem. Te linie żyły jednak tylko w pamięci procesu i w logach Rendera, a nie w pliku. Kurs:
log jest wiarygodny tylko wtedy, gdy powstaje osobno dla każdego zdarzenia, z offsetami strefy, i zgadza się z czasami, które zapisał ktoś inny.

S03E03: harness śledził agenta, który sam dostarczał issues. Pierwszy monitor, `tail -F` na
`run.log`, niczego nie pokazał, bo na Windowsie nie widział dopisków robionych przez inny
proces. Nie było błędu, tylko cisza. Harness zastąpił go pollerem samego trackera
(`events.mjs`, co 30 s): jedna linia na nowe issue, etykietę, komentarz właściciela,
zamknięcie, linię ship logu, podpis rekordu i restart runnera. Po tej zamianie harness
zauważył błędne wdrożenie eksportu CSV 12 s po jego linii w ship logu i poprawił agenta, zanim
runda się skończyła ([P54](../01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md)).

S04E01: skrypt obciął końcową odpowiedź kursu do 400 znaków (`.slice(0,400)`), więc podpowiedź
(`hint`) z odmowy przyszła ucięta: „What did your agent do alone in that run: ...”. Kierunek
wskazał `pointer` na `check-lane`. Po poprawce pełna końcowa odpowiedź trafia do
`run-final.secrets.local.json`, a wire log `wire.secrets.local.json` pokazuje każdy request
([P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)). Wniosek z HANDOVER: czytaj
odmowę w całości. HQ w tabeli „How the solve went” (snag 3): odmowa przyszła z podpowiedzią, którą harness uciął
na 400 znakach; więcej mówi pytanie „Run log”. Linia „Run log” z zestawu narzędzi kursu, w przekładzie:

> Log przebiegu (Run log): zdobyte w tym rozwiązaniu. Każdy przebieg zapisuje pełną końcową odpowiedź i wire log (host, nazwy headerów, status) w `scripts/`; następna sesja czyta je najpierw, gdy przebieg zawodzi.
>
> Agent, który działa sam, potrzebuje logu do przeczytania po przebiegu, bo nikt nie patrzył, jak zawodzi.

**Stosuj.** Logi dostępne z CLI, endpoint selfcheck, log każdej akcji agenta z czasem.
Monitor agenta w tle czyta źródło prawdy (tracker, API), a nie plik logu innego procesu.
Monitor, który milczy, sprawdź zdarzeniem, które na pewno powinien pokazać.

---

← [P26](p26-czas-jest-czescia-zachowania.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P28](../06-bezpieczenstwo/p28-dane-to-nie-polecenia.md) →
