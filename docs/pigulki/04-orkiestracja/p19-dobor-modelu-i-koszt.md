# P19 · Model dobieraj do zadania, a koszt traktuj jak wymaganie

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S01E04, S01E05, S02E02

> **Lekcje:**
>
> - S01E04 · Praca z harnessami AI → rozdział „Ustawienia” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#ustawienia) · [oryginał EN: „Settings”](../../s01e04-working-with-ai-harnesses.md#settings)

**Zasada.** Logika, kontrakty i decyzje dostają najmocniejszy model. Mechaniczne, dobrze
opisane zadania dostają tańszy. Agent bez nadzoru dostaje limit wywołań i budżetu.

**Przypadek.**

- S01E04: każde issue miało pole „Suggested worker” (strongest albo cheaper).
- S01E05: przejście z darmowego klucza Gemini na OpenRouter, a potem, ze względu na rachunek,
  na modele DeepSeek. Dzienny limit 15 wywołań modelu.
- S02E02: jeden mail na Opus 5.5 kosztuje kilka centów, a limitu wydatków brak (sprawa
  otwarta).

---

← [P18](p18-worktree-i-pliki-wezly.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P20](p20-brief-jak-issue.md) →
