# S01E02 "who said what" — gdzie stanęliśmy

Stan na: 2026-11-09 ok. 00:15 UTC (01:15 czasu PL).

## Co jest zrobione

1. `start-challenge` wywołany — mamy `challengeId` i `ticket` (ważny do **2026-11-09 23:50 UTC = 10.11 00:50 czasu PL**).
2. Pobrane oba nagrania do [media/](media/):
   - video `crank-review.mp4` (114 s) — terminal z `crank review`, odpowiedź jest tylko w mowie,
   - audio `status-line.mp3` (113 s).
3. Zainstalowany `faster-whisper` w `.venv` projektu (model `large-v3` w cache HF).
   Uwaga: PyAV w tym venv nie współpracuje z faster-whisper — audio trzeba dekodować ffmpeg-iem do surowego `f32le` 16 kHz
   i podawać jako numpy array. ffmpeg uruchamiany ze skryptu musi mieć `-nostdin` (inaczej wisi w tle).
4. **Oba raporty przyjęte (HTTP 200, receipt dostany):**

   | nagranie | pytanie | finding | offset (s) |
   |---|---|---|---|
   | video | How many invites moved? | `1870` | `65.95` |
   | audio | How many invites moved? | `2140` | `47.66` |

   Receipty ważne do 2026-11-22.

## Gdzie są dowody (NIE commitować — `*.log` jest w .gitignore)

- [proofs.log](proofs.log) — `challengeId`, `ticket`, `receipt_video`, `receipt_audio` (pełne, niemaskowane).
- [challenge.log](challenge.log) — log każdego requestu i odpowiedzi (ticket zamaskowany).
- `transcript_large.json`, `words_large.txt` — pierwsza transkrypcja całości z timestampami słów.
- `chunks.txt` / `chunks.json` — transkrypcja fraza po frazie (dokładniejsza), podstawa do rekordu.

## Co zostało

1. **Rekord nocy** (krok, na którym stoimy):
   jeden plain text ze **wszystkimi słowami wypowiedzianymi w obu nagraniach, w kolejności: najpierw video, potem audio**, nic więcej.
   Kurs sprawdza go słowo w słowo. POST JSON `{ "ticket": ..., "record": ... }` na
   `https://hq.mega.dev/challenges/who-said-what/api/record`. Odpowiedź zawiera `record` receipt i dalsze instrukcje.
   - Liczby zapisujemy tak, jak są wypowiedziane (słowami, np. "one thousand eight hundred and seventy").
     Jeśli kurs odrzuci — spróbować wersji z cyframi.
   - Uważać na błędy whispera z pierwszego przebiegu: "cue"/"Q" = "queue", końcowe "memory." to halucynacja (usunąć),
     godziny typu "140"/"2.38" to wypowiedziane "one forty"/"two thirty-eight" itd. — sprawdzać z `chunks.txt`.
   - Znane błędy w `chunks.txt`: "Knightly Batch" → "Nightly Batch" (w obu nagraniach); "Cue before batch" → "Queue before batch"; "Started at 150." / "Approved at 1.40." → godziny
     słowami ("one fifty", "one forty"); "Changes shipped before the batch 1." → "one".
     W razie wątpliwości przetranskrybuj pojedynczą frazę jeszcze raz (wycinek ffmpeg `-ss/-to`, jak w challenge.log).
2. Po record receipt: **zatrzymać się** i dać człowiekowi prompt do **nowej sesji** harnessu
   (zawiera `challengeId` + 3 receipty: `audio`, `video`, `record`).
3. W nowej sesji: `resume-challenge` (uuid + receipts) → odpowiedzieć na jedno dodatkowe pytanie o oba nagrania
   → `claim-challenge` (receipts pod kluczami `audio`, `video`, `record`). Potem `debrief` z logu.

## Stan transkrypcji fraza-po-frazie (w chwili zatrzymania)

- Skrypt: [tools/chunks.py](tools/chunks.py) (kopia ze scratchpada; [tools/transcribe.py](tools/transcribe.py) = pierwszy przebieg).
- Został zostawiony **uruchomiony w tle** — pisze na bieżąco do `chunks.txt`, na końcu zapisuje `chunks.json`.
- Stan o 01:17 (czas PL, 9.11):
  - **VIDEO — GOTOWE.** 56 fraz, 0–114 s, zapisane osobno w [chunks_video.txt](chunks_video.txt) (bezpieczna kopia).
  - **AUDIO — w trakcie**, doszło do ok. 55 s z 113 s ("Tests"); zostało ok. 20 fraz (~6–8 min).
- **Jak sprawdzić, czy skończył:** `chunks.txt` ma **dwie** linie `----` (po video i po audio) i istnieje `chunks.json`.
- **Jeśli audio nie skończyło** (np. VS Code zamknięty i proces zabity) — przetranskrybuj **tylko audio**
  (video już masz w `chunks_video.txt`), do osobnego pliku, żeby niczego nie nadpisać:

  ```bash
  cd /c/projects/megadev/s01e02
  /c/projects/megadev/.venv/Scripts/python -I tools/chunks.py media/status-line.mp3 > chunks_audio.txt 2> chunks_audio.err < /dev/null
  ```

  (ok. 12–15 min na CPU; `-nostdin` jest już w skrypcie). Uwaga: skrypt na końcu nadpisuje `chunks.json`.
  Postęp: `wc -l chunks_audio.txt`; koniec = linia `----` na końcu pliku.
- Pierwszy przebieg (`transcript_large.json`) **gubił słowa** (np. brak "Warnings / None logged", "None needed")
  — rekord budować z `chunks.txt`, nie z niego.

## Jak kontynuować jutro

1. Sprawdź, czy `chunks.txt` ma dwie linie `----` (patrz wyżej); jeśli nie — przetranskrybuj samo audio do `chunks_audio.txt`.
2. W nowej sesji Claude Code w `c:\projects\megadev` wklej:

```
Kontynuujemy challenge S01E02 "who said what" (MEGA.dev). Przeczytaj s01e02/HANDOFF.md,
s01e02/challenge.log i s01e02/proofs.log. Oba raporty (video, audio) są już przyjęte.
Następny krok: video jest w s01e02/chunks_video.txt; sprawdź, czy audio w s01e02/chunks.txt jest kompletne
(jeśli nie, przetranskrybuj samo audio wg HANDOFF.md do chunks_audio.txt), potem zbuduj rekord nocy
(najpierw video, potem audio, słowo w słowo, popraw oczywiste błędy whispera),
pokaż mi go i wyślij na /api/record z ticketem z proofs.log. Potem postępuj według odpowiedzi kursu
(po record receipt: zatrzymaj się i daj mi prompt do nowej sesji).
```

- Jeśli ticket wygasł (po 2026-11-09 23:50 UTC): wywołaj `start-challenge` z uuid
  `c0000000-0000-4000-8000-0000005e01e2` — powtórne wywołanie daje ten sam Challenge i nowy ticket;
  receipty video/audio są ważne do 2026-11-22. Gdyby kurs ich nie przyjął z nowym ticketem — wyślij raporty jeszcze raz
  (te same wartości i offsety z tabeli wyżej).
