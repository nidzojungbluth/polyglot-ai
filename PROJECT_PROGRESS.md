# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-09 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 595 | 12 % | 571 | 341 | 26 | 103 |
| 🇪🇸 Spanisch (Spanien) | 582 | 12 % | 556 | 317 | 26 | 103 |
| 🇬🇷 Griechisch | 5002 | 100 % | 4954 | 4457 | 348 | 1227 |
| 🇷🇸 Serbisch | 5055 | 101 % | 5011 | 3833 | 348 | 1228 |
| 🇷🇺 Russisch | 5069 | 101 % | 5026 | 3971 | 348 | 1230 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 220 | 334 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 208 | 335 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 1388 | 1583 | 783 | 231 | 40 |
| Serbisch | 441 | 546 | 1411 | 1586 | 801 | 231 | 39 |
| Russisch | 451 | 549 | 1412 | 1584 | 795 | 236 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 551 / 575 (96 %) | 100 % | 100 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 537 / 563 (95 %) | 100 % | 100 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 4841 / 4889 (99 %) | 95 % | 100 % | 100 % | 100 % | 100 % | 100 % |
| Serbisch | 4895 / 4939 (99 %) | 96 % | 100 % | 100 % | 100 % | 100 % | 100 % |
| Russisch | 4906 / 4949 (99 %) | 96 % | 100 % | 100 % | 100 % | 100 % | 100 % |

## Ladezeit

App-Dateien (GitHub Pages): Kern 379 KB, Sprachpakete el 990 KB, sr 693 KB, ru 963 KB (jede Sprache wird erst bei Bedarf geladen).

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

Planung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`
