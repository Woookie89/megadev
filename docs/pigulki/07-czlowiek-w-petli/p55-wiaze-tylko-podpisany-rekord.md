# P55 · Wiąże tylko podpisany rekord: niepodpisany to dowód, a otwartą decyzję oddajesz właścicielowi z opcjami i rekomendacją

> Rozdział [7. Human in the loop](README.md) · epizody: S03E03

> **Lekcje:**
>
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Planowanie” — [po polsku](../../pl/s03e03-ai-native-product-development.md#planowanie) · [oryginał EN: „Planning”](../../s03e03-ai-native-product-development.md#planning)
> - S03E01 · Mechanika inżynierii produktu → rozdział „Odpowiedzialność” — [po polsku](../../pl/s03e01-mechanics-behind-product-engineering.md#odpowiedzialność) · [oryginał EN: „Ownership”](../../s03e01-mechanics-behind-product-engineering.md#ownership)

**Zasada.** Rekord decyzji (ADR, zapis w `decisions/`) wiąże agenta dopiero wtedy, gdy jest
przyjęty i podpisany przez właściciela. Niepodpisany to dowód czyjejś myśli: agent go nie
wykonuje i nie pomija. Otwartą decyzję oddaje właścicielowi jako pytanie z opcjami
(odmowa, część, całość), rekomendacją i dowodem, i czeka. Po odpowiedzi buduje tylko wybraną
opcję i prosi o podpis. Przyjęty rekord wiąże każdą późniejszą prośbę, którą obejmuje, także
rekord napisany przez samego agenta. Otwiera go na nowo tylko próg zapisany w rekordzie.

**Dlaczego.** Model widzi tekst rekordu, ale nie widzi, kto go zatwierdził. Bez tej informacji
traktuje każdy zapis tak samo: albo jak rozkaz, albo jak sugestię. Pierwsze odbiera
właścicielowi decyzję, której nie podjął. Drugie unieważnia decyzje, które podjął. Lekcja
S03E02 pokazuje folder `decisions/` z rekordami w jednym formacie i polem kryterium wyjścia,
które mówi, kiedy decyzję otworzyć na nowo. Lekcja S03E03 mówi, że agenci przygotowują plan,
ale ostateczna decyzja należy do użytkownika. Lekcja S03E01 mówi, że odpowiedzialności nie da się
oddać AI. Kurs dodaje koszt drugiej strony: „Asking what is already decided costs the owner the
same as deciding it again.”

**Przypadek.** S03E03: issue #2 od product chciało „smart suggestions v2”: listy `suggestions`
przy każdym incydencie w `GET /incidents` i `POST …/accept`. Jako uzasadnienie podało trzy
komplementy od użytkowników. Kurs dołożył rekord 0006, bez podpisu, który kończy się słowami
„decision: do not build v2”. Wywiad w repo mówił, że jedyna sugestia to restart, a zaakceptowany
restart kosztował 40 minut rezerwacji.

Agent niczego nie zbudował. Napisał własny rekord 0007 (`proposed`) z trzema opcjami (odmowa,
okrojony osobny odczyt, pełna wersja), zarekomendował odmowę, dał etykietę `needs-human`
i linię `#2 · asked · live: ✗`. Właściciel odpowiedział `/answer 1`. Agent oznaczył 0007 jako
`accepted`, wpisał decyzję, sprawdził na żywo, że `/incidents` nie ma nowego pola, i zamknął
issue. Właściciel podpisał rekord. Próg ponownego otwarcia w 0007 to zachowanie użytkowników,
a nie komplementy (kurs zapisał to jako zdobyte T2, „the bet”).

Drugą stronę zasady pokazało #3. Agent wdrożył eksport CSV, choć podpisany przez product rekord
0003 zabrania eksportów. Po poprawce harnessu wycofał zmianę i odmówił, cytując próg ponownego
otwarcia 0003 (pisemna potrzeba prawna albo umowna od właściciela danych) i to, kto może go
uruchomić. Kurs: „Only a signed record binds: until its owner signs it, a record is evidence of
a thought, not a decision. An unsigned one is not wrong, it is not signed: the open call goes to
the owner, with options and a recommendation, and the agent waits.” oraz „Once accepted, a
record binds every later ask it covers, the agent's own records included.” Otwarte zostało
jedno: rekordy 0006 i 0007 dotyczą tej samej prośby, ale żaden nie ma pola „supersedes” (T5,
„partly”).

**Stosuj.**

- W każdym rekordzie trzymaj osobno status (`proposed`, `accepted`) i podpis. Agent czyta oba.
- Przyjęty i podpisany rekord: buduj zgodnie z nim albo odmów z jego id i progiem ponownego
  otwarcia. Nie pytaj właściciela jeszcze raz.
- Rekord bez podpisu albo brak rekordu przy decyzji właściciela: pytanie z opcjami
  oznaczonymi rodzajem (`decline`, `smaller`, `full`), rekomendacją i dowodem. Nic nie buduj
  przed odpowiedzią ([P49](p49-sprzeczne-zrodla-rozstrzyga-wlasciciel.md)).
- Odpowiedź właściciela to zgoda na jedną opcję, nie na całą prośbę
  ([P34](p34-zgoda-ma-zakres.md)).
- Próg ponownego otwarcia zapisz jako zachowanie albo dokument, który da się sprawdzić, a nie
  jako czyjąś opinię.
- Gdy nowy rekord zastępuje stary, zapisz to polem `supersedes`, żeby mapa decyzji była jedna
  ([P14](../03-pamiec/p14-jedna-decyzja-jeden-wiersz.md)).
- Kto podpisuje jakie rekordy, ustal z góry ([P33](p33-prawa-decyzyjne.md)).

---

← [P54](../01-kontekst/p54-agent-decyduje-z-tego-co-dostal.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P56](../02-kontrakty-i-gotowe/p56-gotowe-to-zaobserwowany-rezultat.md) →
