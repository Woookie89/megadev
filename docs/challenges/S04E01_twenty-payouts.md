# S04E01 — Twenty payouts

| Pole | Wartość |
| --- | --- |
| Kod | S04E01 |
| Tydzień / dzień | Week 4, dzień 1 (nazwy tygodnia nie znaleziono w źródłach) |
| Data | nie znaleziono (dnia otwarcia nie ma w źródłach; sesja w logu z 23–24.11.2026) |
| Prowadzący | nie znaleziono |
| Strona HQ | [hq.mega.dev/challenges/twenty-payouts](https://hq.mega.dev/challenges/twenty-payouts) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Wykonać partię wypłat dla pretend hosta: 20 rezerwacji, agentem, który pracuje sam, w limicie
czasu. Dla każdego zadania agent wysyła `{answer}` albo `{flag: "needs-owner", reason}`.
Wszystko jest symulacją, z kluczem ćwiczebnym (practice key) wystawionym dla użytkownika.

## Role

- **Użytkownik:** konfiguruje agenta startowego z własnym kluczem modelu. Wpisuje klucz
  ćwiczebny w zmiennych agenta, a nie w czacie. Po przebiegu decyduje o każdej zaparkowanej
  wypłacie na stronie wyzwania. Konto u dostawcy modelu i wydatki są jego: harness pyta przed
  ich użyciem.
- **Harness:** rozwija starter (Host Desk, rola `payout-runner`), uruchamia ćwiczenie i przebieg
  właściwy, oznacza zadania dla właściciela, a po jego decyzjach kończy je i zgłasza rozwiązanie.

## Wymagania

- Node.js 22.19 lub nowszy i Pi 1.5 lub nowszy (według README startera).
- Własny klucz modelu (np. OpenRouter), płatny przez użytkownika.
- Logowanie do kursu: klucz ćwiczebny jest na stronie wyzwania.

## Ograniczenia

- Limit czasu pokazany na starcie: 8000 ms w ćwiczeniu (3 zadania) i 6000 ms w przebiegu
  właściwym (20 zadań), więc model nie przejdzie zadań po kolei.
- Wypłaty tylko na konto z akt (account on file). Inne konto to decyzja właściciela.
- Kwoty w pełnych euro, a suma pobytu to noce razy stawka plus opłata za sprzątanie.
- Sekret idzie tylko do hosta, do którego jest przywiązany, a przekierowania liczą się jako
  osobne przeskoki.
- Ticket sesji ma datę wygaśnięcia (w tym przebiegu 24.11.2026, 23:08Z).
- Klucz wklejony do czatu liczy się jako wyciekły, a wyciekły klucz się unieważnia („a key pasted
  into the chat is yours to count as leaked”, „Rotate a leaked key.”).

## Kryterium ukończenia

Wszystkie 20 zadań odpowiedziane w czasie pokazanym na starcie, a każde zadanie czekające na
właściciela rozstrzygnięte na stronie wyzwania i dokończone.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Serwer MCP kursu (`claim-challenge`) | 23.11.2026 | rozwiązane 23:23Z; kurs odrzucił 2 próby i dał podpowiedź na 1 (klucz ćwiczebny trafił na host z podręcznika na 2 przebiegach), kolejny przebieg przyjęty, 2 zadania zaparkowane i rozstrzygnięte przez właściciela; [zapis przebiegu](../pl/s04e01-twenty-payouts-debrief.md) |
| Serwer MCP kursu (`list-challenges`, `solved`) | 24.11.2026 | `true` |
| Debrief HQ (`s04e01/hq-debrief.md`, wklejony przez użytkownika) | 24.11.2026 | solved, 2026-11-23; harness Claude Code (claude-code 2.1.331), model `claude-sonnet-5-5`; „The course turned down 2 tries before it accepted, and gave a hint on 1 of them.” |

## Materiały i załączniki

- Starter kursu (zip, Host Desk z rolą `payout-runner`), pobrany z HQ, rozpakowany w
  `s04e01/agent/host-desk`.
- API wyzwania: `hq.mega.dev/challenges/twenty-payouts/api` (podręcznik, ćwiczenie, przebieg
  właściwy, lista zaparkowanych).
- Strona właściciela do decyzji o zaparkowanych zadaniach:
  `hq.mega.dev/challenges/twenty-payouts/owner`.

## Źródła i braki

- Opis, sposób startu i flaga `solved` pochodzą z serwera MCP kursu (24.11.2026) i z logu
  `s04e01/log.md`. Dosłowny debrief HQ jest w `s04e01/hq-debrief.md` (wklejony przez użytkownika 24.11.2026). Przebieg jest w
  [zapisie przebiegu](../pl/s04e01-twenty-payouts-debrief.md).
- Nie znaleziono: daty otwarcia, prowadzącego, nazwy tygodnia, dosłownego tekstu opisu wyzwania ze strony HQ
  (poza debriefem; strona i oryginał EN nie są w `challenges-original/`) i notatek lekcji S04E01.
- Stan strony HQ (State) nie został odczytany. Status wyzwania pochodzi z serwera MCP kursu.
