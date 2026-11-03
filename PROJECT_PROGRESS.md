# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-03 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 41 | 1 % | 17 | 4 | 0 | 0 |
| 🇪🇸 Spanisch (Spanien) | 39 | 1 % | 13 | 3 | 0 | 0 |
| 🇬🇷 Griechisch | 3771 | 75 % | 3626 | 2911 | 286 | 978 |
| 🇷🇸 Serbisch | 3811 | 76 % | 3627 | 2212 | 286 | 979 |
| 🇷🇺 Russisch | 3839 | 77 % | 3627 | 2315 | 286 | 981 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 0 | 0 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 0 | 0 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 1085 | 993 | 445 | 231 | 40 |
| Serbisch | 441 | 546 | 1098 | 1000 | 456 | 231 | 39 |
| Russisch | 451 | 549 | 1104 | 997 | 460 | 236 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 6 / 30 (20 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 3 / 29 (10 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 3513 / 3658 (96 %) | 95 % | 99 % | 100 % | 100 % | 98 % | 61 % |
| Serbisch | 3511 / 3695 (95 %) | 96 % | 100 % | 100 % | 100 % | 96 % | 43 % |
| Russisch | 3507 / 3719 (94 %) | 96 % | 100 % | 100 % | 100 % | 100 % | 24 % |

## Ladezeit

App-Dateien (GitHub Pages): Kern 352 KB, Sprachpakete el 746 KB, sr 522 KB, ru 718 KB (jede Sprache wird erst bei Bedarf geladen).

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

Planung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`
