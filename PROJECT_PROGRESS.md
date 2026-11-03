# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-03 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 41 | 1 % | 17 | 4 | 0 | 0 |
| 🇪🇸 Spanisch (Spanien) | 39 | 1 % | 13 | 3 | 0 | 0 |
| 🇬🇷 Griechisch | 3974 | 79 % | 3869 | 3108 | 296 | 1018 |
| 🇷🇸 Serbisch | 4014 | 80 % | 3870 | 2372 | 296 | 1019 |
| 🇷🇺 Russisch | 4045 | 81 % | 3873 | 2465 | 296 | 1021 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 0 | 0 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 0 | 0 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 1141 | 1076 | 509 | 231 | 40 |
| Serbisch | 441 | 546 | 1156 | 1081 | 520 | 231 | 39 |
| Russisch | 451 | 549 | 1163 | 1080 | 524 | 236 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 6 / 30 (20 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 3 / 29 (10 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 3756 / 3861 (97 %) | 95 % | 99 % | 100 % | 100 % | 98 % | 80 % |
| Serbisch | 3754 / 3898 (96 %) | 96 % | 100 % | 100 % | 100 % | 96 % | 62 % |
| Russisch | 3753 / 3925 (96 %) | 96 % | 100 % | 100 % | 100 % | 100 % | 42 % |

## Ladezeit

App-Dateien (GitHub Pages): Kern 352 KB, Sprachpakete el 792 KB, sr 554 KB, ru 763 KB (jede Sprache wird erst bei Bedarf geladen).

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

Planung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`
