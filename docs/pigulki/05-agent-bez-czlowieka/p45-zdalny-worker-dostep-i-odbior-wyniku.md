# P45 · Zdalny worker: zaplanuj dostęp i odbiór wyniku

> Rozdział [5. Agent bez człowieka: host, pętla, wyjścia](README.md) · epizody: S02E04

> **Lekcje:**
> - S02E04 · Współpraca wielu agentów → rozdział „Architektury wieloagentowe” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#architektury-wieloagentowe) · [oryginał EN: „Multi-agent architectures”](../../s02e04-multi-agent-collaboration.md#multi-agent-architectures)
> - S02E04 · Współpraca wielu agentów → rozdział „Agent2Agent” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#agent2agent) · [oryginał EN: „Agent2Agent”](../../s02e04-multi-agent-collaboration.md#agent2agent)

**Zasada.** Worker uruchomiony poza twoim komputerem ma dostęp tylko do tego, na co pozwala
jego środowisko, a wynik wraca tylko drogą zaplanowaną w briefie. Zanim przekażesz mu
zadanie, sprawdź trzy rzeczy: sieć (czy potrzebne domeny są na liście dozwolonych),
dostęp do narzędzi zadania i miejsce, z którego odbierzesz wynik.

**Dlaczego.** Sandbox w chmurze nie dziedziczy niczego z twojego komputera: nie ma twoich
serwerów MCP, plików ani dostępu do sieci. Ma tylko to, co mu udostępnisz. Zablokowana sieć
albo brak narzędzia wyjdą na jaw dopiero w trakcie uruchomienia, a jednorazowego
uruchomienia nie da się po prostu powtórzyć. Wynik też nie wraca sam: worker kończy pracę
u siebie, a główny agent musi wiedzieć, gdzie i w jakiej postaci go odebrać.

**Przypadek.** S02E04: job-1 trafił do jednorazowej routine w claude.ai/code, czyli
zadania uruchamianego w chmurze Anthropic. Harness wykrył dwie przeszkody przed
uruchomieniem:

1. Routine może korzystać tylko z konektorów claude.ai (Gmail, Notion itp.), a nie
   z dowolnego adresu MCP. Harness dał więc workerowi własnego klienta MCP
   (`tools/mcp.mjs`, bez zależności) w prywatnym repo. Link zadania, który działa jak
   klucz, przekazał tylko w prompcie routine.
2. Domyślne ustawienie sieci (Trusted) nie przepuszcza `hq.mega.dev`. Użytkownik zmienił je
   przed startem na Limited z domeną kursu.

Odbiór wyniku opisał brief: worker kończy pracę wiadomością z liniami `JOB1_RECORD:`
i `JOB1_SUBMIT_REPLY:`, a główny agent pobiera log uruchomienia (`get_run_log`).
Uruchomienie trwało 33 s, a `submit` został przyjęty za pierwszym razem. Kurs: „A remote
worker reaches only what its place allows, so open the course domain before the run
instead of learning it from a failed one.” oraz „A job sent away comes back only if the
handoff planned the way home.”

**Stosuj.**

- Przed przekazaniem zadania: z jakimi domenami worker musi się łączyć i czy lista
  dozwolonych domen je obejmuje?
- Jak worker dostanie się do narzędzi: przez konektor, plik konfiguracyjny MCP czy własnego
  klienta w repo?
- Przetestuj klienta lokalnie operacjami, które niczego nie zmieniają (`tools/list`,
  `resources/list`), żeby nie zmarnować jednorazowego uruchomienia.
- W briefie zapisz, którędy wróci wynik: znacznik w ostatniej wiadomości, plik, komentarz
  albo log uruchomienia. Upewnij się, że główny agent umie go odczytać.
- Klucze trzymaj tylko w prompcie widocznym dla właściciela albo w sekretach środowiska,
  nigdy w repo ([P32](../06-bezpieczenstwo/p32-sekrety-nie-przez-czat.md)).

---

← [P44](../04-orkiestracja/p44-normalizuj-przed-zlaczeniem.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P46](p46-testuj-droge-z-hosta-agenta.md) →
