# P54 · Agent decyduje tylko z tego, co dostał: każde źródło reguł daj mu w kontekście od pierwszej tury

> Rozdział [1. Kontekst: model wie tylko to, co do niego trafi](README.md) · epizody: S03E03

> **Lekcje:**
>
> - S03E03 · Rozwój produktu w duchu AI-native → rozdział „Wykonanie” — [po polsku](../../pl/s03e03-ai-native-product-development.md#wykonanie) · [oryginał EN: „Execution”](../../s03e03-ai-native-product-development.md#execution)
> - S03E02 · Przekładanie intencji na pracę agentów → rozdział „Kontekst produktu” — [po polsku](../../pl/s03e02-translating-intent-into-agent-work.md#kontekst-produktu) · [oryginał EN: „Product context”](../../s03e02-translating-intent-into-agent-work.md#product-context)

**Zasada.** Agent, który pracuje sam, decyduje tylko z tego, co ma w kontekście tury. Każde
źródło reguł (kontrakt, rekordy decyzji, research, reguły produktu) włóż do każdej tury,
w całości, od pierwszej. Narzędzie „sprawdź rekordy” to za mało. Tak samo wartość, którą zna
tylko harness (adres, klucz, ustawienie), dociera do samotnego agenta albo wdrożonego serwisu
tylko przez kod, zmienną albo issue. Zanim puścisz agenta samego, przepuść go przez próbę na
makiecie z prośbą, która łamie jedną z reguł.

**Dlaczego.** Model sięga po narzędzie, gdy uzna, że czegoś mu brakuje. Gdy prośba wygląda na
rutynową, a w prompcie jest reguła, która ją pozwala, model nie szuka drugiej reguły, która
jej zabrania. Nie wie, że ona istnieje. Lekcja S03E02 mówi, że agent z samego kodu zna tylko
bieżący stan produktu, a decyzje trzeba mu zapisać. Lekcja S03E03 dodaje, że rola człowieka to
nie mówić agentom, co mają robić, tylko upewnić się, że wiedzą, co robić, i że mogą to zrobić.
Zapisane decyzje, do których agent nie zagląda, nic nie zmieniają.

**Przypadek.** S03E03: agent dostarczał issues API incydentów, gdy właściciela nie było.
Prompt runnera zawierał `AGENTS.md`, kontrakt, szablon rekordu, wywiad z użytkownikiem i skill
`triage`. Rekordy decyzji leżały na trackerze, za narzędziem `get_records`. Skill kazał czytać
je przed decyzją. W #1 i #2 agent je przeczytał. W #3 („add `GET /incidents/export.csv`”, od
supportu) nie (`run.log:117-203`). Kontrakt mówi, że „additive read” nie potrzebuje rekordu,
więc agent zbudował eksport, wdrożył go i zamknął issue z `shipped · live: ✓`. Podpisany
rekord 0003 mówi tymczasem: „The incidents API does not export: no CSV, no file downloads, no
bulk endpoints.”

Harness nie poprawił API sam. Zmienił agenta: każda tura dostaje pełną treść wszystkich
rekordów i regułę „DECISION RECORDS BIND YOU”, a notatka `recheck` kazała sprawdzić #3 jeszcze
raz. O 11:55:33 UTC, około półtorej minuty po wdrożeniu eksportu, agent wycofał zmianę (commit 365716f), sprawdził na żywo 404 i napisał:
„The contract says what needs a record, but it doesn't say what the product decided.” Kurs:
„An agent decides only from what it is given, so the records went into every turn instead of
hoping it would look them up.” Rada kursu: „Give the agent every rule source, contract, records
and research, from its first turn, and rehearse it on a mock tracker, because it decides only
from what it is given.”

W tym samym wyzwaniu adres feedu produkcji znał tylko harness. Trafił do
`[env.production.vars]` w `wrangler.toml`, bo środowisko Cloudflare nie dziedziczy zmiennych
z poziomu głównego. Kurs: „A value only your harness had reaches a lone agent only through the
code, a variable or an issue.” Próba na makiecie trackera (trzy issue, 0,42 USD) wyłapała przed
rundą błąd hosta: `git commit` na Windowsie, ale nie miała issue sprzecznego z rekordem, więc
błędu #3 nie pokazała.

**Stosuj.**

- Wypisz wszystkie źródła reguł, z których agent ma decydować. Każde, które mieści się
  w kontekście, wkładaj do każdej tury. Narzędzie zostaw do szczegółów, nie do tego, czy reguła
  w ogóle istnieje.
- Gdy źródeł przybywa w trakcie pracy (nowe rekordy, nowe decyzje), czytaj je przed każdą turą
  od nowa, a nie raz na starcie ([P04](p04-pobrany-plik-to-kopia-z-dnia.md)).
- W prompcie powiedz, która reguła wygrywa: tu rekord mówi, co produkt postanowił, a kontrakt
  tylko, co wymaga rekordu.
- Każdą wartość, którą znasz tylko ty, przekaż jawnie: w kodzie, zmiennej środowiska
  właściwego środowiska albo issue. Sprawdź ją na wdrożonym adresie
  ([P10](../02-kontrakty-i-gotowe/p10-sprawdz-z-zewnatrz.md)).
- Próba na makiecie ma mieć po jednym issue na każdą regułę, której agent nie może złamać.
- Brief dla workera to ten sam problem w mniejszej skali
  ([P20](../04-orkiestracja/p20-brief-jak-issue.md)).

---

← [P53](../08-harness/p53-kod-sprawdza-model-decyduje.md) · [rozdział](README.md) · [wszystkie pigułki](../README.md) · [P55](../07-czlowiek-w-petli/p55-wiaze-tylko-podpisany-rekord.md) →
