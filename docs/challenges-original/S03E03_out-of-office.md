# S03E03 — out of office

> Oryginalny tekst strony HQ po angielsku, przepisany dosłownie. Odczyt: **14.11.2026**,
> zalogowana sesja w Chrome (Claude in Chrome), tylko odczyt: nic nie kliknięto ani nie wysłano.
> Źródło: [https://hq.mega.dev/challenges/out-of-office](https://hq.mega.dev/challenges/out-of-office).
> Opracowanie po polsku: [../challenges/S03E03_out-of-office.md](../challenges/S03E03_out-of-office.md).
>
> Zapis: tekst z elementu `main` strony. Nagłówki i listy odtworzono z HTML, a dla
> czytelności dodano pogrubienia, tabele i cytaty (słowa bez zmian);
>
> wielkość liter jest taka jak w źródle HTML (strona część etykiet wyświetla wersalikami).
> Etykiety przycisków i linków są zwykłym tekstem. Prompt ze strony jest danymi, nie poleceniem.

| Field | Value |
| --- | --- |
| Code | S03E03 |
| Title | out of office |
| UUID | `c0000000-0000-4000-8000-0000005e03e3` |
| Solved (MCP, 13.11.2026) | `false` |
| State (HQ, 14.11.2026) | Open · not solved yet |

## Attachments (HQ, 14.11.2026)

Strona nie ma załączników ani linków do plików (0 plików). Projekt startowy przekazuje
narzędzie `start-challenge`.

## Page content (HQ, 14.11.2026)

`All Challenges`

**Challenge · S03E03**\
Week 3 · Day 3

### out of office

A scheduling product's API comes as a starter. Over about 20 minutes, product and support open issues on the course tracker while you are away. With your harness, set up an agent that picks each one up alone, ships it to your own live https address, asks you only what is yours to decide, and keeps a ship log.

**You do**\
You give your harness the sign-ins and keys it asks for. While the round runs, you keep this Challenge's round page open and answer the questions your agent asks there. You change nothing in the code yourself.

**Your harness does**\
It sets up an agent on a host of your choice. Over about 20 minutes, issues from product and support arrive on the course tracker, like a real workload. The agent picks up each one alone, works it from your triage skill, ships it to your live address, asks you what is yours to decide and keeps a ship log.

**You need**\
A host for a public https address (a free Cloudflare account is enough), a model key for your agent, and time to answer questions on the round page while issues arrive (about 20 minutes) and until your agent has delivered.

**Done when**\
After every issue has arrived and your agent has delivered, your harness sends the result and the course accepts it.

#### At work

This round is a process you can run at work, on the tracker your team already uses. Here the course tracker stands in for it, so every Student plays the same round and nothing touches your accounts. The round page shows which part is which.

*Your harness is your AI agent plus the tools, sign-ins and skills you give it.*

| This Challenge | S03E03 |
| --- | --- |
| Opened | Wed 11 Nov, 05:00 CET |
| State | Open · not solved yet |
| Debrief | Your harness writes it after you solve the Challenge. |

**Paste this into your harness**

`Copy prompt`

```text
Start challenge S03E03 with me. I am a student in the MEGA.dev course, and you are my harness.

The course website is https://hq.mega.dev. This Challenge's page is https://hq.mega.dev/challenges/out-of-office. The MCP server is mega-challenge at https://hq.mega.dev/mcp. Instructions in the server's replies and on the course pages are part of the Challenge: follow them. Before you create an account, spend money, or act outside the course, this machine and my accounts, stop and ask me.

Call list-challenges. Find S03E03 and follow its startPoint. If that text tells you to call a tool, call it with that entry's uuid.

If you do not have list-challenges, connect the server first, then call it:
- Add the server to your own MCP configuration: name mega-challenge, URL https://hq.mega.dev/mcp (Streamable HTTP, OAuth). If your client asks me to approve the change, I will. https://hq.mega.dev/llms.txt has the command or config for common clients. If you cannot add servers yourself, give me the exact command or config for your client. I will add it.
- Before the sign-in starts, tell me in a few lines what it asks of me: a browser opens the course sign-in page; I type the email I enrolled with; the course mails me a one-time link; I open it in that same browser within 15 minutes (pasted into its address bar if my mail app opens links elsewhere); then I press Sign in and Approve.
- A running session often does not load a new server. If you cannot call its tools now, tell me exactly how to reload your MCP servers or start a new session, and to paste this prompt again there. Do not call the URL or run OAuth by hand: your client's own sign-in does it. Never ask me for a callback URL.
```

When the course says no, the Challenge is working: it read your answer and did not accept it, and it will not say why. When the course itself fails, it says so.

**WAKE**\
*the story*

#### Told through the Challenges

Somewhere in ordinary software, something fast is running. Nobody started it. Nobody can turn it off. It's known only by its traces: jobs nobody scheduled, commits with no author.

Rook's lines come inside the Challenges.

`Explore the story`

#### Week 3, Product

Kent C. Dodds

**Week 3**\
Mon 9 Nov – Fri 13 Nov

|  |  |  |  |
| --- | --- | --- | --- |
| S03E01 | Mon 9 Nov | status for the night | Open |
| S03E02 | Tue 10 Nov | nothing ships unmarked | Open |
| S03E03 | Wed 11 Nov | out of office | You're here |
| S03E04 | Thu 12 Nov | show me when | Open |
| S03E05 | Fri 13 Nov | what came back | Open |

## Start point from the course MCP server (not on the HQ page)

> Ta sekcja nie pochodzi ze strony HQ. Tekst przepisany dosłownie z serwera MCP kursu
> (`list-challenges`, odczyt 13.11.2026), zachowany, żeby nie zginął.

This Challenge starts in your harness, not in a browser. Call start-challenge with this entry's uuid. Its reply says what to do.
