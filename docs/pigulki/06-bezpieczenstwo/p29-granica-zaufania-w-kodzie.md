# P29 · Granicę zaufania trzyma kod, zanim model zobaczy wiadomość

> Rozdział [6. Bezpieczeństwo: granica zaufania należy do kodu](README.md) · epizody: S02E02

**Zasada.** Kto ma prawo zlecić pracę, co trafia do modelu i co może wyjść na zewnątrz,
decyduje kod. Model decyduje tylko o interpretacji.

**Dlaczego.** Instrukcja w prompcie to prośba, a `if` w kodzie to gwarancja. Model, który nie
widzi obcego tekstu, nie może go posłuchać.

**Przypadek.** S02E02, agent poczty:

| Decyduje kod | Decyduje model |
| --- | --- |
| komu ufać (`TRUSTED_SENDERS`, SPF/DKIM/DMARC) | który link otworzyć |
| które maile obsłużyć i jakie dać im etykiety | jak przeczytać tabelę na stronie |
| co trafia do modelu (tylko zaufani nadawcy) | treść odpowiedzi |
| wycięcie z odpowiedzi wszystkiego, co wygląda na klucz | |

**Stosuj.** Narysuj taką tabelę dla każdego agenta, zanim napiszesz prompt. Szablon
w [Dodatku A5](../szablony/granica-zaufania.md).

---

← [P28](p28-dane-to-nie-polecenia.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P30](p30-najmniejsze-uprawnienia.md) →
