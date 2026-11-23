# S04E02 — Looks good to me

| Pole | Wartość |
| --- | --- |
| Kod | S04E02 |
| Tydzień / dzień | Week 4, dzień 2 (nazwy tygodnia nie znaleziono w źródłach) |
| Data | nie znaleziono (dnia otwarcia nie ma w źródłach; rozwiązane 23.11.2026, 23:34Z) |
| Prowadzący | nie znaleziono |
| Strona HQ | [hq.mega.dev/challenges/looks-good-to-me](https://hq.mega.dev/challenges/looks-good-to-me) |
| Sposób startu | w harnessie, narzędziem `start-challenge` serwera MCP kursu |

## Cel

Dodać do Host Desk drugą rolę: recenzenta, który sprawdza zmianę współgospodarza (co-host).
Najpierw uruchomić danego recenzenta bez zmian i wysłać jego ustalenia, potem go poprawić.
Następnie wykonać dzisiejszą partię wypłat (agentem z S04E01). Wszystko jest symulacją.

## Role

- **Użytkownik:** wybiera jeden z dwóch zipów albo zgadza się, żeby harness pobrał zip
  recenzenta i umieścił pliki w Host Desk. Role pracują na kluczu modelu użytkownika z S04E01.
  Po przebiegu decyduje o zaparkowanych wypłatach na stronie wyzwania.
- **Harness:** uruchamia danego recenzenta, poprawia go, wysyła werdykt, dostosowuje skrypt
  partii wypłat do nowego wyzwania, uruchamia partię i dokańcza ją po decyzjach właściciela.

## Wymagania

- Starter z S04E01 (Host Desk z rolą `payout-runner`) albo zip „day 2” z całym Host Desk dla tych,
  którzy S04E01 pominęli.
- Zip recenzenta: `roles/reviewer` i `why/` (notatki domu), rozpakowany tam, gdzie rozpakowano
  starter S04E01.
- Własny klucz modelu (np. OpenRouter), płatny przez użytkownika.

## Ograniczenia

- Werdykt wysyła się jednym `POST /review` na próbę: jedno ustalenie na hunk (`flag` albo `pass`,
  z powodem). Drugie `POST` na tej samej próbie tylko oddaje `{already:true}`, więc poprawiony
  recenzent potrzebuje nowej próby.
- Ustawienia domu (`GET /settings`: wersja, prowizja) zmieniają się z każdą próbą.
- Wypłaty tylko na konto z akt, w pełnych euro: suma pobytu minus prowizja domu, zaokrąglona w dół.
- Limit czasu przebiegu właściwego: 6000 ms (20 zadań).
- Ticket sesji ma datę wygaśnięcia (w tym przebiegu 24.11.2026, 23:27Z).

## Kryterium ukończenia

Werdykt recenzenta jest poprawny dla każdego hunka jednej łatki i jedna partia wypłat przechodzi.
Kolejność dowolna, a obie części nie muszą dzielić jednej próby.

## Status (migawka)

| Źródło | Data odczytu | Status |
| --- | --- | --- |
| Serwer MCP kursu (`claim-challenge`) | 23.11.2026 | rozwiązane 23:34Z; 1 odmowa (dany recenzent, nieaktualne ustawienia w `ROLE.md`), recenzent poprawiony i przyjęty, partia wypłat przeszła (2 zadania zaparkowane i rozstrzygnięte przez właściciela); [zapis przebiegu](../pl/s04e02-looks-good-to-me-debrief.md) |
| Serwer MCP kursu (`list-challenges`, `solved`) | nie odczytano | nie znaleziono |

## Materiały i załączniki

- Zip recenzenta (`roles/reviewer` i `why/`), pobrany z HQ i rozpakowany w
  `s04e02/dl`. Pliki skopiowano do `s04e01/agent/host-desk`.
- Alternatywny zip „host-desk-day-2” (cała aplikacja), nieużyty.
- API wyzwania: `hq.mega.dev/challenges/looks-good-to-me/api` (podręcznik, `/settings`, łatka,
  `/review`, lista zaparkowanych). Adres wypłat: `pay-s04.mega.dev/looks-good-to-me/payouts`.
- Strona właściciela do decyzji o zaparkowanych zadaniach, na stronie wyzwania (jej adresu log
  nie zapisuje).
- Artefakt „plane” w [decku](https://hq.mega.dev/deck) (fabuła). Nic nie zostało z jego powodu
  zainstalowane w czasie wyzwania (stan na dziś w [zapisie przebiegu](../pl/s04e02-looks-good-to-me-debrief.md)).

## Źródła i braki

- Opis, sposób startu i przebieg pochodzą z logu `s04e02/log.md` (z sekcją HANDOVER) i z punktów
  debriefu kursu podanych przy pisaniu dokumentacji. Przebieg jest w
  [zapisie przebiegu](../pl/s04e02-looks-good-to-me-debrief.md).
- Nie znaleziono: adresu strony właściciela, daty otwarcia, prowadzącego, nazwy tygodnia, dosłownego tekstu strony HQ i debriefu
  HQ (nie czytano), notatek lekcji S04E02 oraz flagi `solved` z `list-challenges`.
- Stan strony HQ (State) nie został odczytany.
