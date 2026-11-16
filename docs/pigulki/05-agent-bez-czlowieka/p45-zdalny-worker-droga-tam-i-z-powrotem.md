# P45 · Zdalny worker: zaplanuj drogę tam i z powrotem

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S02E04

> **Lekcje:**
> - S02E04 · Współpraca wielu agentów → rozdział „Architektury wieloagentowe” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) · [oryginał EN: „Multi-agent architectures”](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures)
> - S02E04 · Współpraca wielu agentów → rozdział „Agent2Agent” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#agent2agent) · [oryginał EN: „Agent2Agent”](../../s02e04-multi-agent-collaboration.md#agent2agent)

**Zasada.** Worker poza twoją maszyną sięga tylko tam, gdzie pozwala mu jego miejsce,
i wraca tylko drogą, którą zaplanował brief. Przed przekazaniem sprawdź trzy rzeczy:
sieć (allowlistę), dostęp do narzędzi zadania i miejsce, z którego odczytasz wynik.

**Dlaczego.** Sandbox w chmurze nie dziedziczy niczego z twojego komputera. Nie ma twoich
serwerów MCP, twoich plików ani twojej sieci. Ma tylko to, co mu otworzysz i dostarczysz.
Błąd sieci albo brak narzędzia wyjdzie dopiero w trakcie przebiegu, a jednorazowy przebieg
się nie powtórzy. Wynik też nie wraca sam: worker kończy pracę w swoim miejscu, a główny
agent musi wiedzieć, gdzie i w jakim kształcie go odebrać.

**Przypadek.** S02E04: job-1 poszedł do jednorazowej routine w claude.ai/code. Dwie
przeszkody harness wyłapał przed przebiegiem:

1. Routine dostaje tylko konektory z claude.ai, a nie dowolny adres MCP. Harness dał więc
   workerowi `tools/mcp.mjs`, klienta MCP bez zależności, w prywatnym repo. Link zadania
   (klucz) przekazał tylko w prompcie routine.
2. Domyślna sieć środowiska to Trusted, która nie wpuszcza `hq.mega.dev`. Użytkownik
   ustawił Limited z domeną kursu przed startem.

Droga z powrotem była w briefie: worker kończy wiadomością z `JOB1_RECORD:`
i `JOB1_SUBMIT_REPLY:`, a główny agent pobiera log przebiegu (`get_run_log`). Przebieg
trwał 33 s, `submit` przeszedł za pierwszym razem. Kurs: „A remote worker reaches only what
its place allows, so open the course domain before the run instead of learning it from a
failed one.” oraz „A job sent away comes back only if the handoff planned the way home.”

**Stosuj.**

- Przed przekazaniem: jakie domeny worker musi otworzyć i czy allowlista je przepuszcza?
- Którędy worker dojdzie do narzędzi: konektor, plik konfiguracyjny MCP, własny klient
  w repo?
- Sprawdź klienta lokalnie bez kroku zadania (`tools/list`, `resources/list`), żeby nie
  zużyć jednorazowego przebiegu.
- W briefie zapisz drogę powrotu: marker w końcowej wiadomości, plik, komentarz, log
  przebiegu. Upewnij się, że główny agent umie go odczytać.
- Klucze tylko w prompcie widocznym dla właściciela albo w sekretach środowiska, nigdy
  w repo ([P32](../06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md)).

---

← [P44](../04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md)
