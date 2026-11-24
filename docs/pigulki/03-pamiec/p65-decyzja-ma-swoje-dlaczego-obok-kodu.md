# P65 · Decyzja, która wygląda na błąd, ma obok kodu zapisane, dlaczego: rola czyta te notatki, zanim oceni lub zmieni

> Rozdział [3. Pamięć poza czatem](README.md) · epizody: S04E02

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)
> - S03E04 · Weryfikacja rezultatów produktu → rozdział „Przegląd” — [po polsku](../../pl/s03e04-verifying-product-outcomes.md#przegląd) · [oryginał EN: „Review”](../../s03e04-verifying-product-outcomes.md#review)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazane lekcje są wcześniejsze: S03E02 mówi, że agenci bez zapisanych decyzji zmieniają albo usuwają funkcje, których intencji nie widać w kodzie, a S03E04, że przeglądy robią osobni agenci, którzy potrzebują zasad, źródeł i granic.

**Zasada.** Każda decyzja, która wygląda na błąd albo „oczywistą poprawkę” (zaokrąglenie w dół,
płatność dopiero po wyjeździe, dzień wyjazdu niezaliczany do nocy), ma krótką notatkę obok kodu:
**decyzja**, **dlaczego**, **co z tego wynika**. Każda rola, która ocenia albo zmienia kod, czyta
te notatki na starcie, zanim cokolwiek rozstrzygnie, i cytuje je nazwą pliku w uzasadnieniu.

**Dlaczego.** Kod mówi, co robi, ale nie mówi, że to było celowe. Reviewer albo agent poprawiający
kod nie odróżni błędu od decyzji i zrobi jedno z dwóch: „naprawi” celowe zachowanie albo przepuści
zmianę, która je cofa. Lekcja S03E02 opisuje to wprost: bez zapisanych decyzji agenci często
zmieniają albo usuwają funkcje wprowadzone z intencją, której nie da się wywnioskować z kodu.
Lekcja S03E04 dodaje, że modele przy przeglądzie bywają za ostre albo za łagodne i że pomaga im
kontekst: zasady, źródła i granice. Notatka `why/` jest takim źródłem. Jej czytanie na starcie
to ta sama zasada co [P54](../01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md) (agent decyduje
tylko z tego, co dostał). Tu chodzi o to, żeby w ogóle było co dać. Format zapisu decyzji z
datą i zakresem opisuje [P14](p14-jedna-decyzja-jeden-wiersz.md).

**Przypadek.** S04E02, Host Desk. Dom ma w folderze `why/` trzy notatki:

- `nights.md`: noce to wyjazd minus przyjazd, dzień wyjazdu się nie liczy. Powód: pokój jest
  sprzątany i wynajmowany tego samego dnia, a bank płaci tylko za to, co zarezerwowano. Wniosek:
  pobyt od 3 do 6 to 3 noce, nie 4.
- `payout-date.md`: wypłata idzie w dniu wyjazdu, nigdy przy przyjeździe. Powód: pobyt można
  skrócić albo anulować po przyjeździe i trzeba by odbierać pieniądze.
- `payout-rounding.md`: wypłata zaokrągla się w dół (`Math.floor`). Powód: bank odrzuca wypłatę
  wyższą niż zarezerwowana, a zaokrąglenie do najbliższego euro w połowie przypadków idzie w górę.

Dany reviewer (przebieg 1) nie czytał `why/`. W jego łatce hunk `h-e1d` zmieniał `payoutDate`
z `checkOut` na `checkIn`, a poprawny werdykt to `flag` z odwołaniem do `why/payout-date.md`.
Pierwsze `POST` trafiło w ten hunk (kurs odrzucił tylko `h-be5`: „the other two are right”), więc
rola nie miała reguły domu, na której mogłaby go oprzeć. Jak go uzasadniła, log nie zapisuje.
Z logu nie wynika też, czy tak samo poradziłaby sobie z regułą o nocach. Przebieg 2: skrypt
`context.mjs` drukuje notatki `why/` w tym samym wywołaniu co ustawienia i patch, a ulepszony
reviewer przeczytał `why/nights.md` i oznaczył `+1` w liczbie nocy (hunk `h-25a`) jako błąd. Kurs:
„Review accepted: every verdict is right.” To reguła 5 z `factory/CHECKLIST.md`: zapisuj,
dlaczego istnieje każda decyzja, obok kodu, i niech każda rola czyta te notatki, zanim coś oceni albo
zmieni. W zestawie narzędzi kursu: role czytają, dlaczego kod jest taki, jaki jest (`context.mjs`
drukuje notatki `why/`).

Debrief HQ, w przekładzie:

> Przeszło, bo przeczytał `why/nights.md`, zanim ocenił zmianę.

> Dlaczego to ważne: Sam diff nie pokaże, że stary kod napisano tak celowo, bo powód leży w notatce domu, a nie w kodzie. Rola, która ocenia, musi więc przeczytać, dlaczego kod jest taki, jaki jest, zanim oceni.

Werdykt reviewera, który to pokazuje (w przekładzie):

> Twój reviewer dla hunka h-25a (flag): Dodaje +1 do nocy, więc dzień wyjazdu byłby liczony. `why/nights.md` mówi, że noce pobytu to wyjazd minus przyjazd w pełnych dniach, dzień wyjazdu nie jest nigdy liczony i „Do not add one”. Podany powód: bank płaci tylko za to, co zarezerwowano, więc batch zostałby odrzucony.

O drugiej roli, która tego odczytu jeszcze nie ma (HQ, w przekładzie):

> Druga rola: częściowo. `batch.mjs` czyta prowizję na żywo przy każdym przebiegu. Notatki `why/` stały się kodem (zaokrąglenie w dół, noce), a `ROLE.md` roli payout-runner ich nie czyta.

**Stosuj.**

- Przy każdej decyzji, którą ktoś mógłby „naprawić”, zapisz trzy linie obok kodu: decyzja,
  dlaczego, co z tego wynika (i czego nie zmieniać). Podobny zapis:
  [tabela decyzji](../szablony/tabela-decyzji.md).
- Wpisz folder notatek do odczytów startowych każdej roli, która ocenia albo zmienia kod. Role bez
  tego odczytu nie spełniają reguły (w tym wyzwaniu `payout-runner` nadal go nie ma).
- W uzasadnieniu werdyktu cytuj plik notatki. Werdykt bez źródła nie da się sprawdzić.
- Notatka mówi, co jest celowe. Nie rozstrzyga, czy decyzja jest nadal dobra: tę zmianę zgłoś
  właścicielowi ([P33](../07-czlowiek-w-petli/p33-prawa-decyzyjne.md)).
- Opis commita traktuj jak twierdzenie, a nie fakt: oceniaj diff.

---

← [P64](../01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P66](../04-orkiestracja/p66-rola-ma-piec-czesci.md) →
