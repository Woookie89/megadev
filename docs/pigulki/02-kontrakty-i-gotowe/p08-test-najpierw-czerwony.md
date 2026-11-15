# P08 · Test, który nigdy nie był czerwony, niczego nie dowodzi

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S01E05

**Zasada.** Test poprawki ma najpierw nie przejść na kodzie bez poprawki, a potem przejść
z poprawką.

**Dlaczego.** Test napisany po poprawce często sprawdza to, co kod już robi, a nie błąd. Bez
czerwonego wyniku nie wiadomo, czy test w ogóle dotyka błędu.

**Przypadek.** S01E05: test writer uruchamiał szkic na kodzie bez poprawki (czerwony),
potem z poprawką (zielony). Błąd #12: wiersz z właścicielem „—” znikał z digestu.

**Stosuj.** W briefie dla agenta piszącego testy wymagaj obu wyników w raporcie.

---

← [P07](p07-gotowe-to-sprawdzenie.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P09](p09-wyslane-to-nie-potwierdzone.md) →
