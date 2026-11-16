# P39 · Serwer MCP to kontrakt dla obcego klienta

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S02E03

> **Lekcje:**
> - S02E03 · Możliwości agentów → rozdział „Model Context Protocol” — [po polsku](../../pl/s02e03-agentic-capabilities.md#model-context-protocol) · [oryginał EN: „Model Context Protocol”](../../s02e03-agentic-capabilities.md#model-context-protocol)
> - S02E03 · Możliwości agentów → rozdział „Projektowanie własnego MCP” — [po polsku](../../pl/s02e03-agentic-capabilities.md#projektowanie-własnego-mcp) · [oryginał EN: „Designing a custom MCP”](../../s02e03-agentic-capabilities.md#designing-a-custom-mcp)

**Zasada.** Serwer MCP projektujesz dla klienta, którego nie znasz i którego nie zapytasz
o nic. Wszystko, czego potrzebuje, musi być w tym, co serwer publikuje:

- metadane logowania,
- sposób rejestracji,
- strona z opisem,
- nazwy, opisy i schematy narzędzi.

**Dlaczego.** Obcy klient czyta tylko deklaracje. Nie ma kanału, którym zapyta, „co
autor miał na myśli”. Każda luka w metadanych kończy się zgadywaniem po stronie klienta
albo jego błędem. Do tego protokół się zmienia (rewizja 2026-07-28 usunęła `initialize`
i sesje), więc kontrakt trzeba pisać pod aktualną specyfikację, a nie pod pamięć modelu.

**Przypadek.** S02E03: kurs nigdy wcześniej nie widział serwera `mcp-home`. Po kolei:

1. Dostał `401` z `WWW-Authenticate`.
2. Przeczytał metadane chronionego zasobu (RFC 9728) i metadane serwera autoryzacji.
3. Zarejestrował się przez Client ID Metadata Document.
4. Zaczekał, aż człowiek wpuści go hasłem właściciela.
5. Wywołał `server/discover`, `tools/list` i narzędzia według ich schematów.

Żadne pytanie nie było potrzebne. Serwer obsługiwał obie wersje protokołu (sprzed rewizji 2026-07-28 i nową), a każdy wynik
sprawdzał względem `outputSchema` przed wysłaniem.

**Stosuj.**

- Zanim napiszesz kod, przeczytaj aktualną specyfikację i changelog
  ([P05](../01-kontekst/p05-fakty-zmienne-u-zrodla.md)).
- Opublikuj komplet metadanych, po których klient sam znajdzie drogę (discovery):
  - metadane zasobu z `authorization_servers` i `resource_documentation`,
  - metadane serwera autoryzacji z PKCE `S256`,
  - Client ID Metadata Document jako zalecaną rejestrację, a DCR jako awaryjną.
- Wpuszczenie obcego klienta to decyzja człowieka: strona zgody z jego własnym logowaniem.
- Przejdź całą ścieżkę z zewnątrz, jako obcy klient, zanim podasz adres
  ([P10](../02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)).
- Wynik i błąd każdego narzędzia projektuj dla modelu: [P40](p40-wynik-ma-budzet.md),
  [P41](p41-blad-mowi-co-poprawic.md), [P42](p42-duze-bajty-obok-modelu.md).

---

← [P38](p38-skill-to-rutyna.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P40](p40-wynik-ma-budzet.md) →
