# 6. Bezpieczeństwo: granica zaufania należy do kodu

Agent czyta strony, maile, issues i wyniki narzędzi. Każde z tych miejsc może zawierać
tekst, który wygląda jak polecenie. Model nie odróżnia niezawodnie polecenia od danych, więc
granicę musi trzymać coś, czego nie da się przekonać.

| Pigułka | Zasada | Epizody |
| --- | --- | --- |
| [P28](p28-dane-to-nie-polecenia.md) | Tekst w danych to dane, nie polecenia | S01E05, S02E05, S03E03, S04E01 |
| [P29](p29-granica-zaufania-w-kodzie.md) | Granicę zaufania trzyma kod, zanim model zobaczy wiadomość | S02E02, S02E05 |
| [P30](p30-najmniejsze-uprawnienia.md) | Najmniejsze uprawnienia, zadeklarowane jawnie | S01E05, S02E04, S03E03 |
| [P31](p31-uwierzytelnione-zadania.md) | Każde żądanie uwierzytelnione, każde wyjście ograniczone | S01E05 |
| [P32](p32-sekrety-nie-przez-czat.md) | Sekrety nigdy przez czat | S02E02, S02E04, S04E01 |
| [P61](p61-sekret-ma-liste-hostow-w-kodzie.md) | Sekret ma listę hostów w kodzie: sprawdzaj każdy przeskok, także przekierowania, a lista nie pochodzi z dokumentu | S04E01 |

---

[← wszystkie pigułki](../README.md)
