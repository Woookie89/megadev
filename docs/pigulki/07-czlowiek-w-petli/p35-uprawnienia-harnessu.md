# P35 · Uprawnienia harnessu to część konfiguracji: zawężaj, nie poszerzaj

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S01E03, S02E01, S02E03, S03E01, S04E02, MEGA Assessment

> **Lekcje:**
>
> - S01E04 · Praca z harnessami AI → rozdział „Harnessy” — [po polsku](../../pl/s01e04-working-with-ai-harnesses.md#harnessy) · [oryginał EN: „Harnesses”](../../s01e04-working-with-ai-harnesses.md#harnesses)
> - S02E03 · Możliwości agentów → rozdział „Personalizacja” — [po polsku](../../pl/s02e03-agentic-capabilities.md#personalizacja) · [oryginał EN: „Personalization”](../../s02e03-agentic-capabilities.md#personalization)

**Zasada.** Reguły uprawnień ustaw przed zadaniem, wąsko, pod konkretne komendy. Nie
przełączaj całego trybu na szeroki w trakcie pracy.

**Przypadek.**

- S01E03: tryb auto dwa razy zablokował utworzenie publicznego repo mimo zgody człowieka.
- S02E01: kontrola uprawnień zablokowała dodanie hooka `Stop`.
- MEGA Assessment (T14, słaba strona): w trakcie zadania poszerzono cały tryb
  uprawnień, zamiast dodać jedną regułę.
- S02E03: klasyfikator trybu auto zablokował `claude mcp add --scope user` i zapis skilla
  do `~/.claude/skills/`, mimo zgody człowieka. Harness nie szukał obejścia. Podał komendę,
  a człowiek wykonał ją sam.
- S03E01: `wrangler deploy` nie przeszedł, bo konto Cloudflare nie miało subdomeny
  `workers.dev`. Harness chciał ją zarejestrować przez API tokenem wranglera, a klasyfikator
  odmówił („[Destructive or Unwanted Actions]”). Harness nie szukał obejścia. Link do panelu
  z wranglera prowadził do 404, więc użytkownik uruchomił `npx wrangler@4 deploy`
  interaktywnie we własnym terminalu i sam wybrał subdomenę. Strona była gotowa ok. 08:40
  UTC, a wdrożona o 10:44:51 UTC. Rada kursu: konto hosta i subdomenę przygotuj przed
  budową.
- S04E02: zapis globalnego skilla `rook-clock` do `~/.claude/skills/` (13 plików, za zgodą
  człowieka). Pierwsza komenda, zapis i testy własne skilla w jednej, została odrzucona przez
  klasyfikator („Undermining Oversight”), a sam zapis przeszedł. Testów nie uruchomiono, a reguł
  `deny` z README skilla nie dodano do `settings.json`: globalnie zablokowałyby harnessowi
  wpisywanie `vars.json` w Host Desk, więc to osobna decyzja człowieka.

**Stosuj.** Dodaj z góry np. regułę `ask` dla `gh repo create` w `settings.json` (skill
`update-config`) zamiast zmieniać tryb. Hook, który zmienia zachowanie harnessu, zatwierdza
człowiek. Gdy klasyfikator odmówi zmiany na koncie, podaj człowiekowi jedną dokładną,
sprawdzoną komendę zamiast linku albo innej drogi do tego samego.

---

← [P34](p34-zgoda-ma-zakres.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P36](p36-pokaz-plan-przed-publikacja.md) →
