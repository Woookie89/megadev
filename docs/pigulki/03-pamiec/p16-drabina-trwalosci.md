# P16 · Drabina trwałości: im ważniejsza reguła, tym wyżej ją zapisz

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S01E04, MEGA Assessment

> **Lekcje:**
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Personalizacja harnessu” — [po polsku](../../pl/s01e02-steering-models-through-context.md#personalizacja-harnessu) · [oryginał EN: „Harness Personalization”](../../s01e02-steering-models-through-context.md#harness-personalization)
> - S02E03 · Możliwości agentów → rozdział „Personalizacja” — [po polsku](../../pl/s02e03-agentic-capabilities.md#personalizacja) · [oryginał EN: „Personalization”](../../s02e03-agentic-capabilities.md#personalization)

**Zasada.** Ta sama reguła może żyć na różnych szczeblach. Im wyżej, tym mniej zależy od
pamięci modelu:

| Szczebel | Przykład | Kto pilnuje |
| --- | --- | --- |
| czat | „pamiętaj, żeby…” | nikt, przepada przy kompakcji |
| log, debrief | `challenge-log.md`, `*-debrief.md` | człowiek, gdy przeczyta |
| KEEP / HANDOVER | `s01e04/KEEP.md` | następna sesja, jeśli przeczyta na starcie |
| skill / `AGENTS.md` / `CLAUDE.md` | `github-cli-routine`, kształt issue | harness ładuje automatycznie |
| ustawienia / hook | reguła `ask` w `settings.json`, hook `Stop` | harness wymusza, model nie może pominąć |

**Przypadek.** S01E04: zatwierdzony kształt issue i komendy Netlify zostały tylko w issues
i logu, więc przy kolejnym planie przepadłyby. S01E03: skill `github-cli-routine` przeszedł
do następnych wyzwań. MEGA Assessment (T24, mocna strona): procedurę zgody zamieniłeś na
reguły `ask` w ustawieniach, więc nie zależy już od pamięci.

**Stosuj.** Gdy coś robisz drugi raz albo gdy coś „musi się dziać zawsze”, przenieś to
o szczebel wyżej.

---

← [P15](p15-pytaj-przeszle-sesje.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P17](../04-orkiestracja/p17-kontrakt-przed-rownolegloscia.md) →
