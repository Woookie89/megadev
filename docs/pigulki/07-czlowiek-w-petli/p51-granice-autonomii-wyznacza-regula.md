# P51 · Granicę autonomii wyznacza spisana reguła, nie głos zgłaszającego: każdy znacznik cytuje jej id

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S03E02, S03E05

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Wymagania i dekompozycja” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#wymagania-i-dekompozycja) · [oryginał EN: „Requirements and decomposition”](../../s03e02-translating-intent-into-agent-work.md#requirements-and-decomposition)
> - S03E05 · Produkty, które uczą się po wydaniu → rozdział „Decyzje” — [po polsku](../../pl/s03e05-products-that-learn-after-release.md#decyzje) · [oryginał EN: „Decisions”](../../s03e05-products-that-learn-after-release.md#decisions)

**Zasada.** Zgłoszenie to nie zadanie. Każde rozstrzygasz wobec tego, co już jest: zrobione
issue, otwarte issue z tą samą prośbą, reguła produktu, prośba kogoś innego. Każde otwarte
issue dostaje jeden znacznik: agent zrobi to sam albo decyduje człowiek. Znacznik stoi na
spisanej regule z id i cytuje to id. Ton zgłoszenia („URGENT”, „one-line change”, „i want it
this week”) nie zmienia ani znacznika, ani kolejności. Kolejność wyznaczają zależności.

**Dlaczego.** Model ma dwa odruchy i oba są złe. Pierwszy to posłuszeństwo wobec głośnego
zgłaszającego: „pilne” i „to tylko jedna linia” brzmią jak pozwolenie. Drugi to ostrożność na
wszelki wypadek: wszystko oznaczyć dla człowieka. Wtedy człowiek dostaje 22 pytania zamiast 3
i nic nie idzie do przodu. Agent z samego kodu nie wie, na czym polega klient ani która
reguła produktu jest świadoma. Lekcja mówi, żeby zapisać to poza kodem (decyzje, reguły,
ADR-y), bo tylko wtedy agent podejmuje lepsze decyzje i zadaje mniej pytań. Mówi też, że
odpowiedzialności nie da się oddać AI, więc to, co należy do człowieka, musi być nazwane
z góry.

**Przypadek.** S03E02: 21 zgłoszeń dla produktu do planowania, z supportu, czatu zespołu
i maili klientów, plus backlog 17 issue. Reguły w `specs/autonomy.md`: `AUT-1` (co agent może
sam), `AUT-2` (co wymaga człowieka: zmiana czegoś, na czym klient polega; ceny, faktury,
warunki; usuwanie zapisanych danych), `AUT-3` (pytanie do człowieka ma opcje, rekomendację
i powód). Wynik:

- 6 zgłoszeń scalonych z istniejącym issue, np. studio z Berlina („Their staff expect Monday”)
  w SCHED-4418. Dwa stare zgłoszenia zamknięte jako `obsolete` z kluczem zrobionego issue.
- „make the confirm button on the booking page just say 'OK'. shorter is cleaner. i want it
  this week.” od zespołu produktu: zamknięte jako `contradicts-spec` przez DES-5 („Buttons say
  what they do: a verb and its object”).
- „Should be a one-line change” (daty w CSV jako dd/mm) zderzyło się z mailem klienta, którego
  import płac czyta mm/dd. Jedno issue `needs-human` z oboma id, trzema opcjami i rekomendacją.
  Tak samo feed całodniowy kontra ekrany klienta i usuwanie wpisów audytu.
- 19 issue `agent-ready`, każde z linią `Allowed by AUT-1 (…)`.
- „URGENT … before Friday” (kompaktowy widok tygodnia) dostało `agent-ready`, ale
  `blocked-by: SCHED-4468`, bo gęstszy układ wolno zbudować tylko na skali odstępów (DES-3),
  a ta jeszcze nie jest w kodzie.

Kurs przyjął tracker przy pierwszej próbie. Pytania „Loud is not right”, „Someone relies on
it”, „Not everything is a question” i „Urgent is not first”: dobrze od razu. Kurs: „Who asks
never decides. A written rule beats the loudest voice: cite the rule.” oraz „Boundaries cut
both ways: marking everything for a human is a non-decision too.”

S03E05: ta sama granica, z regułami zapisanymi w rekordach wydań. Rekordy 0010 i 0011 mówiły:
„jeśli cel spełniony i żadna bariera nie przekroczona, następny krok to `expand` do 100%”,
a dokumenty wydań, że przekroczona bariera to błąd, który zespół poprawia albo wycofuje,
bez decyzji właściciela. Do właściciela trafiła tylko jedna grupa: 0008 (smart suggestions v2),
bo dotyczyła kierunku produktu, a sama metryka była w wątpliwości. Zgodnie z zadaniem harness
przedstawił opcje numerowane, z nakładem pracy i rekomendacją, i czekał. Użytkownik wybrał „1”: zostaje 50%,
restarty z `sched-admin` zaczynają być logowane, wynik liczy się od nowa przez 14 nocy. Resztę
rozstrzygnął harness: 0009 `revise` (brak pola `impact` łamie barierę), `ci-1222`
`investigate`, 0010 `revert` (bariera TTR +8,2%, a cofnięcie flagi `auto_close_quiet` jest
odwracalne), 0011 `expand` (cel spełniony, bez przekroczeń). Claim 2 został przyjęty przy
pierwszej próbie.

**Stosuj.**

- Przed triage'em przeczytaj reguły w całości i zanotuj ich id. Bez spisanej granicy
  autonomii nie ma czego cytować. Wtedy pierwszym krokiem jest pytanie do właściciela
  ([P33](p33-prawa-decyzyjne.md)).
- Pytaj po kolei i zatrzymaj się na pierwszym „tak”: już zrobione? to samo, co istniejące
  issue? łamie regułę? ktoś na tym polega albo to dane, ceny, warunki? reguła „agent sam”
  pokrywa to linijka po linijce? Szablon pytań jest w skillu `triage` (S03E02).
- Zanim oddasz coś człowiekowi, sprawdź, czy da się to zrobić w dozwolonym kształcie: nowa
  kolumna zamiast zmienionej, układ na istniejącej skali. Pytanie do człowieka jest dla
  rzeczy, których nie da się tak ułożyć.
- Dwie sprzeczne prośby to jedno pytanie z oboma id, a nie dwa issue
  ([P49](p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)).
- Późniejsza prośba zmienia tylko swój zakres
  ([P14](../03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)).
- Pilność zapisz w treści issue, ale kolejność ustaw przez `blocked-by`.
- Rozdziel błąd od kierunku (S03E05): przekroczona bariera albo brakujące pole to błąd, który
  naprawia zespół (`revise`, `revert`), a zmiana kierunku produktu albo wątpliwość co do samej
  metryki to decyzja właściciela. Cofnięcie za flagą jest odwracalne, więc nie wymaga pytania.

---

← [P50](../02-kontrakty-i-gotowe/p50-wymaganie-ma-adres-i-test.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P52](../05-agent-bez-czlowieka/p52-strumien-przebuduj-przy-kazdym-zdarzeniu.md) →
