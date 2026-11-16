# P32 · Sekrety nigdy przez czat

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S02E02, S02E04

> **Lekcje:**
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Bezpieczeństwo systemu” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu) · [oryginał EN: „System security”](../../s01e05-building-workflows-not-tool-stacks.md#system-security)
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Dostęp zdalny” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#dostęp-zdalny) · [oryginał EN: „Getting remote”](../../s01e05-building-workflows-not-tool-stacks.md#getting-remote)

**Zasada.** Klucze wpisuje człowiek do `.env`. Agent zna tylko nazwy zmiennych.

**Przypadek.** We wszystkich wyzwaniach: `.env` w `.gitignore`, logi z zamaskowanymi
tokenami, `proofs.log` ignorowany przez `*.log`. W S02E02 filtr wycina `am_…`, `sk-ant-…`
i `sk-or-…` z każdej odpowiedzi agenta i z logu.

S02E04: link MCP zadania to klucz. Lokalnie `run.sh` generuje z `secrets.local.json`
konfigurację MCP do pliku `mcp.secrets.local.json`, ignorowanego przez git. W chmurze link
jest tylko w prompcie routine, widocznym dla właściciela, i w zmiennej `JOB_URL`, nigdy
w repo. Prompt i log przebiegu routine przechowują go jednak do wygaśnięcia (około 24 h).

**Stosuj.** Commituj tylko `.env.example`. Maskowanie sekretów na wyjściu agenta, nie tylko
na wejściu.

---

← [P31](p31-uwierzytelnione-zadania.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P33](../07-czlowiek-w-petli/p33-prawa-decyzyjne.md) →
