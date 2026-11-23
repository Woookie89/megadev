# P50 · Wymaganie ma adres i test: cytuj miejsce w źródle, a każde przyjęte wymaganie sprawdź z zewnątrz

> Rozdział [2. Kontrakty i „gotowe”](README.md) · epizody: S03E01, S03E05

> **Lekcje:**
>
> - S03E01 · Mechanika inżynierii produktu → rozdział „Zmiana” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#zmiana) · [oryginał EN: „The Shift”](../../s03e01-mechanics-behind-product-engineering.md#the-shift)
> - S03E01 · Mechanika inżynierii produktu → rozdział „Dźwignia” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#dźwignia) · [oryginał EN: „Leverage”](../../s03e01-mechanics-behind-product-engineering.md#leverage)
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Synteza” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#synteza) · [oryginał EN: „Synthesis”](../../s03e05-products-that-learn-after-release.md#synthesis)

**Zasada.** Lista wymagań to kontrakt. Każde wymaganie ma tag, plik i miejsce w pliku:
sekundę nagrania, obszar obrazu, stronę i obszar PDF-a. Każde przyjęte wymaganie dostaje
jedno sprawdzenie, a „gotowe” znaczy, że wszystkie przechodzą na wdrożonym adresie, nie tylko
lokalnie. Liczba znalezionych tagów równa się liczbie przyjętych plus spornych.

**Dlaczego.** Wymagania bez adresu nie da się sprawdzić ani obronić: nie wiadomo, kto je
napisał i czy agent czegoś nie dopowiedział. Bez testu na każde wymaganie „gotowe” znaczy
„wygląda dobrze”, a brak jednego z dziesięciu łatwo przeoczyć. Najczęściej ginie to
najtrudniejsze do znalezienia: wypowiedziane tylko w nagraniu albo pokazane tylko na ekranie.
Lokalny test nie widzi nagłówków, cache'u ani TLS hosta. Lekcja zmienia pytanie z „czy
zgłoszenie jest zrobione?” na „czy użytkownik może teraz zrobić to, czego potrzebuje?”,
a za podstawę wszystkiego uznaje środowisko, w którym agent sam sprawdza swoją pracę.

**Przypadek.** S03E01: lista miała 15 tagów, 10 przyjętych i 5 spornych. Każdy tag miał
`source = { file, at?, region? }`, np. R-H4L: nagranie, 16 s, obszar `{x .675, y .265, w .292,
h .072}`. Cztery tagi były tylko w notatce głosowej, więc harness sprawdził każdy wycinek
drugim, większym modelem. `test.mjs` miał 15 sprawdzeń: po jednym na przyjęty tag, R-L3K po
odpowiedzi produktu i 4 ogólne. Ten sam plik działał lokalnie (feed udawany, ale
o prawdziwym kształcie) i na wdrożonym adresie z prawdziwym feedem. Pierwsze żądania HTTPS
na nowej subdomenie `workers.dev` kończyły się błędem TLS, więc harness poczekał ok. 2,5
minuty na certyfikat i dopiero wtedy uruchomił sprawdzenia: 15/15. Claim poszedł po tym
wyniku i kurs przyjął stronę przy pierwszej próbie. Pytanie kursu „Accepted is a contract”:
dobrze od razu.

Ten sam mechanizm w S03E05, tym razem dla werdyktów, a nie wymagań. Kurs odrzucił claim 1 na
grupie „suggestions”: „suggestions: not accepted. Check this group against the signals and cite
what you saw: the signal id, where in it, and what it shows. check-lane has a need for this:
screen-reading.” `check-lane` dla `screen-reading`: „Done = you can say what the screen showed,
word for word (ids and numbers as written), and where: the file, the second, the region.”
Harness wrócił do pełnych klatek i zapisał na przykład: `replay-02`, 00:22, tablica,
`site-083`, `inc-24201` „Accepted”, głębokość kolejki 1 333. Druga wersja miała w polu
`signals` opisy z miejscem i wartością i kurs odpowiedział: „not in the shape asked for. Fix
groups.0.signals.0”. W poprawce `signals` ma same id (`replay-02`, `ev-019258`, `err-7741`),
a miejsce, sekunda i wartość idą do `note`. Trzecia wersja została przyjęta. W zestawie
drugim miniatura z arkusza kontaktowego dała id zgłoszenia `tk-4e41b2`, a pełna klatka
`tk-6e41b2`.

**Stosuj.**

- Każde sprawdzenie nazwij tagiem wymagania (`R-K4M status.json ACAO *`). Wtedy brak
  sprawdzenia dla tagu widać od razu.
- Jeden plik testów, dwa tryby: lokalny i `node test.mjs <adres>` na wdrożonej stronie
  ([P10](p10-sprawdz-z-zewnatrz.md)).
- Przed wysłaniem listy policz: znalezione = przyjęte + sporne, każdy tag ma plik, każdy
  tag z nagrania ma `at`, każdy obszar mieści się w 0–1.
- Błąd TLS zaraz po pierwszym wdrożeniu na nowej subdomenie to zwykle certyfikat w drodze.
  Poczekaj na 200, zanim uznasz stronę za zepsutą albo gotową.
- To samo dotyczy sygnałów i dowodów (S03E05): id, miejsce (plik, sekunda, obszar) i to, co
  pokazuje, każde w polu, które odbiorca czyta. Id i liczby czytaj z pełnej klatki albo
  z surowego pliku, nie z miniatury.

---

← [P49](../07-czlowiek-w-petli/p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P51](../07-czlowiek-w-petli/p51-granice-autonomii-wyznacza-regula.md) →
