# P35 · Uprawnienia harnessu są częścią setupu: zawężaj, nie poszerzaj

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S01E03, S02E01, MEGA Assessment

**Zasada.** Reguły uprawnień ustaw przed zadaniem, wąsko, pod konkretne komendy. Nie
przełączaj całego trybu na szeroki w trakcie pracy.

**Przypadek.**
- S01E03: tryb auto dwa razy zablokował utworzenie publicznego repo mimo zgody człowieka.
- S02E01: kontrola uprawnień zablokowała dodanie hooka `Stop`.
- MEGA Assessment (T14, słaba strona): w trakcie zadania poszerzony został cały tryb
  uprawnień, zamiast dodać jedną regułę.

**Stosuj.** Dodaj z góry np. regułę `ask` dla `gh repo create` w `settings.json` (skill
`update-config`) zamiast zmieniać tryb. Hook, który zmienia zachowanie harnessu, zatwierdza
człowiek.

---

← [P34](p34-zgoda-ma-zakres.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P36](p36-pokaz-plan-przed-publikacja.md) →
