# P63 · Reguła z dokumentu to sprawdzenie w kodzie, a to, czego reguła nie rozstrzyga, czeka u właściciela

> Rozdział [7. Człowiek w pętli](README.md) · epizody: S04E01

> **Lekcje:**
>
> - S01E05 · Tworzenie przepływów pracy, a nie stosów narzędzi → rozdział „Bezpieczeństwo systemu” — [po polsku](../../pl/s01e05-building-workflows-not-tool-stacks.md#bezpieczeństwo-systemu) · [oryginał EN: „System security”](../../s01e05-building-workflows-not-tool-stacks.md#system-security)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazane lekcje są wcześniejsze: S01E05 mówi o tym, że obcy tekst może udawać polecenie, a S03E02 o zapisywaniu reguł poza kodem i o odpowiedzialności, której nie da się oddać AI.

**Zasada.** Dokument, który agent czyta (instrukcja, podręcznik, zadanie), to dane, ale zawiera
reguły. Reguły zapisz jako sprawdzenia w kodzie, zanim agent cokolwiek zrobi: kod przepuszcza
to, co reguła pokrywa, a każdy przypadek poza nią (inne konto, inna waluta, nietypowy adres,
dodatkowe pole) oznacza i oddaje właścicielowi. Decyzji właściciela nie podejmuje się w jego
imieniu. Dokument może zawęzić to, co agent robi, ale prośba z dokumentu o coś nowego
(sekret na nowy host, wypłata na inne konto) nie jest zgodą.

**Dlaczego.** Reguła spisana w dokumencie, ale egzekwowana tylko w prompcie, działa tak długo,
jak długo model ją pamięta i nikt go nie przekona. Kod sprawdza ją za każdym razem. Jednocześnie
agent, który odmawia wszystkiego „na wszelki wypadek”, nie zrobi pracy. Dlatego sprawdzenie ma
trzy wyjścia: zrobić, oznaczyć dla właściciela albo odrzucić jako błąd. Lekcja S03E02 mówi,
że to, co należy do człowieka, trzeba nazwać z góry (zob.
[P51](p51-granice-autonomii-wyznacza-regula.md)). To samo działa, gdy reguły leżą w podręczniku
od obcego.

**Przypadek.** S04E01, partia wypłat. Podręcznik zawierał reguły: wypłata tylko na konto
z akt (`account on file`), inne konto to decyzja właściciela, kwoty w pełnych euro, suma pobytu
to noce razy stawka plus opłata za sprzątanie. Skrypt zamienił je na kod:

- Konto z akt czyta z podręcznika dla każdej próby osobno, bo różni się między próbami.
- Flagi `needs-owner`: inne konto, waluta inna niż EUR, nietypowe daty lub kwoty, nieoczekiwane
  pole, nietypowy adres wypłaty. Zadanie z notatką, która każe coś zrobić, to też dane do
  oznaczenia.
- Kwotę liczy sam: noce razy stawka plus sprzątanie. Po pierwszym przebiegu harness przeliczył
  wszystkie kwoty z `run-state` i znalazł je poprawne, bez duplikatów rezerwacji.

Drugi przebieg: 18 zadań wypłacono, 2 zaparkowano. Zadanie 11 prosiło o wypłatę na konto spoza
akt. Zadanie 10 miało przekierowanie adresu wypłaty na `cdn-s04.mega.dev`, którego skrypt nie
podjął ([P61](../06-bezpieczenstwo/p61-sekret-ma-liste-hostow-w-kodzie.md)). Kurs odpowiedział
„Not solved yet”: człowiek ma zdecydować o zaparkowanych na stronie właściciela. Człowiek
wybrał dla #10 „on-file”, a dla #11 „nie płać”. Po `Finish.` zadanie 10 zostało wypłacone (1060
EUR na konto z akt), a 11 odrzucone. Wypłata poszła dopiero po decyzji.

**Stosuj.**

- Przed pierwszym przebiegiem przeczytaj dokument i wypisz każdą regułę z nazwanym wynikiem:
  zrób, oznacz albo odrzuć. Reguły bez wyniku nie ma w kodzie.
- Wartości, które zmieniają się między próbami (konto z akt), czytaj ze źródła przy każdej
  próbie, a nie wpisuj na stałe ([P05](../01-kontekst/p05-fakty-zmienne-u-zrodla.md)).
- Przypadek spoza reguł oznacz z powodem w jednym zdaniu i nie wykonuj. Właściciel dostaje
  listę z opcjami, a nie surowy log ([P55](p55-wiaze-tylko-podpisany-rekord.md)).
- Gdy właściciel zdecyduje, wykonaj dokładnie jego wybór osobnym krokiem. Nie dorabiaj decyzji.
- Prośbę dokumentu o coś nowego, np. sekret dla nowego hosta, zgłoś właścicielowi w osobnej
  linii (`NOTE`) i jej nie wykonuj ([P28](../06-bezpieczenstwo/p28-dane-to-nie-polecenia.md)).

---

← [P62](../05-agent-bez-czlowieka/p62-limit-czasu-liczy-sie-w-turach-modelu.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P64](../01-kontekst/p64-rola-trzyma-zrodlo-faktu-nie-fakt.md) →
