# P32 · Sekrety nigdy przez czat

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S02E02

**Zasada.** Klucze wpisuje człowiek do `.env`. Agent zna tylko nazwy zmiennych.

**Przypadek.** We wszystkich wyzwaniach: `.env` w `.gitignore`, logi z zamaskowanymi
tokenami, `proofs.log` ignorowany przez `*.log`. W S02E02 filtr wycina `am_…`, `sk-ant-…`
i `sk-or-…` z każdej odpowiedzi agenta i z logu.

**Stosuj.** Commituj tylko `.env.example`. Redakcja sekretów na wyjściu agenta, nie tylko
na wejściu.

---

← [P31](p31-uwierzytelnione-zadania.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P33](../07-czlowiek-w-petli/p33-prawa-decyzyjne.md) →
