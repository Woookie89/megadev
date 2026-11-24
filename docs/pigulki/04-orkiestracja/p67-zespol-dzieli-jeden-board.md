# P67 · Zespół dzieli jeden board: wspólny stan zakłada się raz, a każda rola tylko go czyta

> Rozdział [4. Orkiestracja: wielu agentów, jeden wynik](README.md) · epizody: S04E03

> **Lekcje:**
>
> - S02E04 · Współpraca wielu agentów → rozdział „Współpraca wieloagentowa” — [po polsku](../../pl/s02e04-multi-agent-collaboration.md#współpraca-wieloagentowa) · [oryginał EN: „Multi-agentic collaboration”](../../s02e04-multi-agent-collaboration.md#multi-agentic-collaboration)
>
> Notatek lekcji S04 w repo jeszcze nie ma, więc wskazana lekcja jest wcześniejsza: S02E04 mówi, że w zespole agentów nawet najprostsze działania łatwo na siebie zachodzą, i radzi ujednolicić kontrakty komunikacji, raportów i dzienników aktywności, żeby wyszukiwanie było deterministyczne.

**Zasada.** Gdy kilka ról pracuje razem, wszystkie piszą i czytają jeden wspólny stan: plan, claimy,
wynik każdego joba. Krok, który ten stan zakłada (nowa próba, sesja, branch, kolejka), robi się
**raz**, na górze, a role dostają tylko jego id. Żadna rola nie zakłada stanu sama przy starcie.

**Dlaczego.** Każda rola startuje od zera i wykonuje to, co ma w `ROLE.md`. Jeśli pierwszy krok roli
to „pobierz podręcznik” albo „otwórz sesję”, każda rola otworzy własną i będzie pracować na pustym
stanie. Workery nie zobaczą planu, integrator nie zobaczy wyników, a w logach wszystko wygląda
poprawnie, bo każde wywołanie się udało. Wspólny stan poza czatem pozwala też dowolnemu agentowi
wziąć job bez rozmowy, która go zaczęła ([P12](../03-pamiec/p12-czat-nie-jest-pamiecia.md)).

**Przypadek.** S04E03: Host Desk dostał zespół (planner, critic, trzy workery, integrator, potem
payout-runner). README zespołu z zipa kursu: „Every role uses that one attempt, so the whole team
shares one board. A role that fetches the manual itself starts a new attempt with an empty board.”
Harness pobrał podręcznik **raz** (20:48Z), zapisał go w `manual.secrets.local.json`, a próbę w
`vars.json` jako `ATTEMPT`. Każda dana rola ma w Limits „Never fetch the manual: every role uses the
attempt already in vars”. Własny `batch.mjs` z S04E01 i S04E02 pobierał podręcznik przy każdym
przebiegu, więc harness zmienił go dla slugów od S04E03: czyta zapisany podręcznik i wymaga, żeby
jego próba była równa `ATTEMPT`. Na jednym boardzie wylądowały pytania critica (5/5/5), plan (zapisany
raz), claimy i wyniki czterech jobów. Batch wypłat kurs policzył dopiero wtedy, gdy każdy job planu
miał wynik. Kurs, w przekładzie:

> Board trzyma plan, claimy i wysłaną zmianę każdego joba w tej próbie, więc świeży worker czyta tam swój job i swoje pliki, a nie w starym czacie.
>
> Plan i wyniki żyją na boardzie, więc każdy agent może wziąć job bez czatu, który go zaczął.

Wyzwanie rozwiązano za pierwszym podejściem, w jednej próbie.

**Stosuj.**

- Zanim uruchomisz zespół, ustal, który krok zakłada wspólny stan, i zrób go raz, ręcznie albo
  skryptem startowym. Id zapisz w jednym miejscu (`vars.json`), które czyta każda rola.
- W Limits każdej roli wpisz, że tego kroku nie robi, a jeśli się da, nie dawaj jej do niego
  narzędzia ([P66](p66-rola-ma-piec-czesci.md)).
- Sprawdź też własne skrypty: kod, który przy każdym przebiegu „odświeża sesję”, po cichu zakłada
  nowy stan. Niech porówna id z tym zapisanym i odmówi, gdy się różnią.
- Plan, claimy i wyniki trzymaj w tym wspólnym stanie, a nie w czacie orkiestratora
  ([P23](../05-agent-bez-czlowieka/p23-stan-poza-procesem.md)).
- Wspólny stan zakładany raz to też jedna szansa: plan zapisuje się raz, więc sprawdź jego kształt,
  zanim go wyślesz ([P06](../02-kontrakty-i-gotowe/p06-najpierw-kontrakt.md)).

---

← [P66](p66-rola-ma-piec-czesci.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P68](../07-czlowiek-w-petli/p68-niejasne-zlecenie-najpierw-do-krytyka.md) →
