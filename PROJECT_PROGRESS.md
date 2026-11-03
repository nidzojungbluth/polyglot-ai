# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-03 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 41 | 1 % | 17 | 4 | 0 | 0 |
| 🇪🇸 Spanisch (Spanien) | 39 | 1 % | 13 | 3 | 0 | 0 |
| 🇬🇷 Griechisch | 3095 | 62 % | 2572 | 2022 | 246 | 818 |
| 🇷🇸 Serbisch | 3136 | 63 % | 2562 | 1537 | 246 | 819 |
| 🇷🇺 Russisch | 3156 | 63 % | 2568 | 1620 | 246 | 821 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 0 | 0 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 0 | 0 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 889 | 726 | 267 | 196 | 40 |
| Serbisch | 441 | 546 | 904 | 734 | 272 | 200 | 39 |
| Russisch | 451 | 549 | 909 | 724 | 278 | 203 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 6 / 30 (20 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 3 / 29 (10 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 2459 / 2982 (82 %) | 90 % | 99 % | 100 % | 84 % | 30 % | 9 % |
| Serbisch | 2446 / 3020 (81 %) | 81 % | 100 % | 100 % | 82 % | 30 % | 12 % |
| Russisch | 2448 / 3036 (81 %) | 81 % | 100 % | 100 % | 80 % | 33 % | 11 % |

## Ladezeit

App-Dateien (GitHub Pages): Kern 352 KB, Sprachpakete el 546 KB, sr 383 KB, ru 524 KB (jede Sprache wird erst bei Bedarf geladen).

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

Planung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`
