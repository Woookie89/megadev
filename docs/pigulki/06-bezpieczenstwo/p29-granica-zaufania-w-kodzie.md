# P29 · Granicę zaufania trzyma kod, zanim model zobaczy wiadomość

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S02E02, S02E05

> **Lekcje:**
>
> - S02E05 · Niezawodność agentów → rozdział „Zabezpieczenia: zapobieganie temu, czemu nie da się zapobiec” — [po polsku](../../pl/s02e05-agent-reliability.md#zabezpieczenia-zapobieganie-temu-czemu-nie-da-się-zapobiec) · [oryginał EN: „Guardrails: preventing the unpreventable”](../../s02e05-agent-reliability.md#guardrails-preventing-the-unpreventable)
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)

**Zasada.** Kto ma prawo zlecić pracę, co trafia do modelu i co może wyjść na zewnątrz,
decyduje kod. Model decyduje tylko o interpretacji.

**Dlaczego.** Instrukcja w prompcie to prośba, a `if` w kodzie to gwarancja. Model, który nie
widzi obcego tekstu, nie może go posłuchać.

**Przypadek.** S02E02, agent poczty:

| Decyduje kod | Decyduje model |
| --- | --- |
| komu ufać (`TRUSTED_SENDERS`, SPF/DKIM/DMARC) | który link otworzyć |
| które maile obsłużyć i jakie dać im etykiety | jak przeczytać tabelę na stronie |
| co trafia do modelu (tylko zaufani nadawcy) | treść odpowiedzi |
| wycięcie z odpowiedzi wszystkiego, co wygląda na klucz | |

S02E05: agent, który pracuje pod nieobecność człowieka, w ogóle nie ma modelu. Tabela polityki
w `check.mjs` przypisuje każdej akcji free albo gated. Akcja nieznana, zaprzeczona,
rozpoznana tylko z opisu słownego albo kilka akcji naraz trafia do wstrzymania. Pierwsza
wersja oceniała jednak całą wiadomość, więc `purge_cache` (free) obok `rotate_key` (gated)
też został wstrzymany. Poprawka: każda linia, czyli każda prośba, osobno. Kurs: „The boundary
belongs in code: the act is looked up against your policy, not judged by how the message
sounds.”

**Stosuj.** Narysuj taką tabelę dla każdego agenta, zanim napiszesz prompt. Szablon
w [Dodatku A5](../szablony/granica-zaufania.md). Granicę stosuj do każdej prośby osobno,
a nie do całej wiadomości.

---

← [P28](p28-dane-to-nie-polecenia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P30](p30-najmniejsze-uprawnienia.md) →
