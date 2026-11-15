# P31 · Każde żądanie uwierzytelnione, każde wyjście ograniczone

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S01E05

> **Lekcje:**
> - S02E03 · Możliwości agentów → rozdział „Model Context Protocol” — [po polsku](../../pl/s02e03-agentic-capabilities.md#model-context-protocol) · [oryginał EN: „Model Context Protocol”](../../s02e03-agentic-capabilities.md#model-context-protocol)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Bezpieczeństwo systemu” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu) · [oryginał EN: „System security”](../../s01e05-building-workflows-not-tool-stacks.md#system-security)

**Przypadek.**
- S01E05: podpis, znacznik czasu i id sprawdzane przy każdym żądaniu (Standard Webhooks).
  Niepodpisany POST dostaje 401.
- S02E02: `fetch_url` blokuje adresy lokalne i prywatne (ochrona przed SSRF).
- S02E03 (w toku): serwer MCP z OAuth i Protected Resource Metadata.

---

← [P30](p30-najmniejsze-uprawnienia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P32](p32-sekrety-nie-przez-czat.md) →
