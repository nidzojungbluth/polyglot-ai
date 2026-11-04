# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-04 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 41 | 1 % | 17 | 4 | 0 | 0 |
| 🇪🇸 Spanisch (Spanien) | 39 | 1 % | 13 | 3 | 0 | 0 |
| 🇬🇷 Griechisch | 4069 | 81 % | 4021 | 3245 | 301 | 1038 |
| 🇷🇸 Serbisch | 4108 | 82 % | 4044 | 2491 | 301 | 1039 |
| 🇷🇺 Russisch | 4133 | 83 % | 4041 | 2584 | 301 | 1041 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 0 | 0 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 0 | 0 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 1193 | 1119 | 509 | 231 | 40 |
| Serbisch | 441 | 546 | 1211 | 1120 | 520 | 231 | 39 |
| Russisch | 451 | 549 | 1216 | 1115 | 524 | 236 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 6 / 30 (20 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 3 / 29 (10 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 3908 / 3956 (99 %) | 95 % | 100 % | 100 % | 100 % | 100 % | 100 % |
| Serbisch | 3928 / 3992 (98 %) | 96 % | 100 % | 100 % | 100 % | 96 % | 100 % |
| Russisch | 3921 / 4013 (98 %) | 96 % | 100 % | 100 % | 100 % | 100 % | 79 % |

## Ladezeit

App-Dateien (GitHub Pages): Kern 352 KB, Sprachpakete el 819 KB, sr 574 KB, ru 792 KB (jede Sprache wird erst bei Bedarf geladen).

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

Planung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`
