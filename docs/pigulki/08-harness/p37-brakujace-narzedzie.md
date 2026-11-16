# P37 · Brakujące narzędzie: zbuduj most, potem go utrwal

> Rozdział [8. Harness jako zestaw narzędzi](README.md) · epizody: S01E03

> **Lekcje:**
> - S01E02 · Sterowanie modelami za pomocą kontekstu → rozdział „Narzędzia od podszewki” — [po polsku](../../pl/s01e02-steering-models-through-context.md#narzędzia-od-podszewki) · [oryginał EN: „Tool use under the hood”](../../s01e02-steering-models-through-context.md#tool-use-under-the-hood)
> - S02E03 · Możliwości agentów → rozdział „Umiejętności i narzędzia” — [po polsku](../../pl/s02e03-agentic-capabilities.md#umiejętności-i-narzędzia) · [oryginał EN: „Skills & Tools”](../../s02e03-agentic-capabilities.md#skills--tools)

**Zasada.** Gdy harnessowi brakuje narzędzia, zbuduj obejście z tego, co jest na maszynie.
Potem zamień je na trwałe narzędzie, a pułapki środowiska zapisz.

**Przypadek.**
- S01E03: brak przeglądarki. Harness uruchomił zainstalowane Chromium z portem debugowania
  i sterował nim przez puppeteer-core, a człowiek zalogował się w tym oknie. Na stałe:
  Playwright MCP.
- S01E02: ffmpeg i faster-whisper. Pułapki: PyAV nie działał z biblioteką, a ffmpeg ze
  skryptu bez `-nostdin` się zawieszał.

**Stosuj.** Pułapki środowiska wpisuj do sekcji „Can run” w KEEP, żeby następna sesja ich
nie odkrywała od nowa.

---

← [P36](../07-czlowiek-w-petli/p36-pokaz-plan-przed-publikacja.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P38](p38-skill-to-rutyna.md) →
