# P39 · Serwer MCP to kontrakt dla obcego klienta (S02E03, w toku)

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S02E03

> **Lekcje:**
> - S02E03 · Możliwości agentów → rozdział „Model Context Protocol” — [po polsku](../../pl/s02e03-agentic-capabilities.md#model-context-protocol) · [oryginał EN: „Model Context Protocol”](../../s02e03-agentic-capabilities.md#model-context-protocol)
> - S02E03 · Możliwości agentów → rozdział „Projektowanie własnego MCP” — [po polsku](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) · [oryginał EN: „Designing a custom MCP”](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp)

**Zasada.** Serwer MCP projektujesz dla klienta, którego nie znasz. Wszystko, czego
potrzebuje, musi być w deklaracjach: schematy wejścia i wyjścia, opis logowania,
dokumentacja zasobu.

**Z researchu S02E03 (do potwierdzenia po rozwiązaniu):**
- Rewizja spec 2026-07-28 jest bezstanowa: bez `initialize`. Każde żądanie niesie
  `protocolVersion` w `_meta`, a nagłówki muszą zgadzać się z treścią.
- Wyniki narzędzi mają `structuredContent` zgodny z zadeklarowanym `outputSchema`.
- Autoryzacja: Protected Resource Metadata (RFC 9728), PKCE, sprawdzenie odbiorcy tokenu.
- Darmowy Render nie ma dysku, więc dane trzeba trzymać w zewnętrznej bazie ([P23](../05-agent-bez-czlowieka/p23-stan-poza-procesem.md)).

---

← [P38](p38-skill-to-rutyna.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md)
