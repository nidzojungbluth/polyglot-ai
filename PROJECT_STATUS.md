# Polyglot AI – Projektstatus

> Zentrale Statusdatei. Bei jeder Sitzung **zuerst lesen** (zusammen mit `ROADMAP.md` und `DECISIONS.md`).
> Stand: 01.11.2026 · letzter Commit vor dieser Datei: `6327883` · Live: https://nidzojungbluth.github.io/polyglot-ai/ · KI-Coach-Version: https://claude.ai/artifact/N7gfA846BBaeuy5LuT8UoR
> Automatisch erzeugte Kennzahlen (Einträge, Beispielsätze je Niveau, Dateigröße): `PROJECT_PROGRESS.md` via `npm run report`.

## 1. Produkt in einem Satz

Kostenlose (0 €), offline-fähige Sprachlern-PWA fürs iPhone für deutschsprachige Lernende – Schwerpunkt **Griechisch, Serbisch, Russisch** – mit Schriftkurs, Kursen A1–C2, Vokabeltrainer (Spaced Repetition), Alltagsslang mit sozialem Kontext, Rollenspielen und KI-Sprachcoach (auf claude.ai).

## 2. Tech-Stack und Auslieferung

| Bereich | Stand |
|---|---|
| Frontend | React 18, TypeScript 5, Vite 5, kein Router (eigener View-State in `App.tsx`), eigenes CSS (`styles.css`), keine UI-Bibliothek |
| Build | `npm run build` → `dist/` mit Code-Splitting (Kern + ein Chunk je Sprache, für GitHub Pages); `npm run build:artifact` → `dist-artifact/index.html` (eine Datei, für claude.ai) |
| Speicher | IndexedDB (Schema-Version 1, Migration, Export/Import), Ausweichlösung localStorage/Speicher; sofortiges Speichern bei `visibilitychange`/`pagehide` |
| Offline | Service Worker `public/sw.js` (Netzwerk zuerst, sonst Cache) – nur auf GitHub Pages wirksam |
| Hosting | GitHub Pages über `.github/workflows/pages.yml` (Build + Deploy bei Push auf `main`) |
| Zweitauslieferung | claude.ai-Artefakt (gleiche `index.html`): echter KI-Coach, private Cloud-Sicherung (`src/lib/cloud.ts`), kein Service Worker |
| Backend | **keins** – keine Server, keine Konten, keine Kosten |
| Tests | Vitest (`tests/*.test.ts`, 107 Tests: Kernlogik, Datenqualität, Alphabet) + Playwright-E2E `tests/e2e.cjs` (31 Prüfungen, iPhone-SE/13-Simulation, offline, Dark Mode) |
| Werkzeuge | `scripts/add-stage.py` (neue Wortliste einbinden, Dubletten mit `@` markieren), `scripts/report.ts` (Kennzahlen), `scripts/missing.ts` (`npm run missing -- <Niveau> <Anzahl>`), `scripts/e2e.sh` (`npm run e2e`, Port per `PORT`) |

## 3. Implementierte Funktionen (geprüft im Code)

- **Sprachen:** Griechisch, Serbisch (Latein/Kyrillisch/beide, automatische Umwandlung), Russisch (Betonungszeichen), Englisch und Spanisch als kleine Pakete (je ~30–40 Einträge); 21 weitere Sprachen nur als „geplant“ im Katalog (`Languages.tsx`).
- **Schriftkurs** (`Alphabet.tsx`, `lib/abc.ts`, `data/alphabet/`): Griechisch, Russisch, Serbisch Latinica↔Ćirilica; Einstufungstest, viele Übungstypen.
- **Kurse** (`Courses.tsx`, `Lesson.tsx`, `lib/course.ts`, `data/curriculum.ts`): 20 Themen × 6 Niveaus + Vertiefungsteile = 241 Module pro Schwerpunktsprache, ~800 Lektionen; Grammatikhinweise je Modul.
- **Vokabeltrainer** (`Vocab.tsx`, `lib/srs.ts`): SM-2, Tageswarteschlange, Tageslimit neue Karten (Standard 20, einstellbar), „morgen fällig“, schwierige Wörter; Lernkarten mit Beispielsatz-Block (Satz → Umschrift → Übersetzung).
- **Übungen** (`lib/exercises.ts`): Karten, Multiple Choice, Hören, Lückentext aus Beispielsätzen (Artikel-/Akzent-tolerant), Satzbau, Übersetzen, Standard vs. Umgangssprache.
- **Wörterbuch** (`Dictionary.tsx`): Suche auch über Umschrift.
- **Slang** mit Register, Ton, Region, Situation, Wirkung, neutraler Alternative.
- **Rollenspiele** (`Roleplays.tsx`): verzweigte Dialoge.
- **Sprachcoach** (`Coach.tsx`, `lib/coach.ts`): auf claude.ai echte KI (Claude), sonst gekennzeichneter regelbasierter Offline-Coach; Modi Lernen/Alltag/Immersion, Slang-Regler.
- **Fortschritt** (`Progress.tsx`): Statistik, Lernserie, Fortschritt je Niveau/Thema.
- **Einstellungen/Sicherung** (`Settings.tsx`): Export/Import, Cloud-Sicherung (nur claude.ai), Schriftwahl Serbisch.
- **Sprachausgabe** über Gerätestimmen (`lib/platform.ts`), Serbisch über kroatische/serbische Stimme in Latein.
- **Barrierefreiheit:** Tippflächen ≥ 44 pt, sichtbarer Fokus, „Bewegung reduzieren“ beachtet, Dark Mode.

## 4. Inhaltsstand (01.11.2026)

| | Griechisch | Serbisch | Russisch |
|---|---|---|---|
| Einträge (Wörter + Slang) | 3.001 | 3.041 | 3.060 |
| Ziel 5.000 erreicht | 60 % | 61 % | 61 % |
| Wörter mit Beispielsatz | 82 % | 80 % | 80 % |
| davon A1 / A2 / B1 / B2 / C1 / C2 | 90 / 99 / 100 / 82 / 30 / 9 % | 81 / 100 / 100 / 80 / 30 / 12 % | 81 / 100 / 100 / 79 / 33 / 11 % |
| Module / Lektionen | 241 / ~800 | 241 / ~800 | 241 / ~800 |

- Wortlisten: `src/data/vocab/{el,sr,ru}{,2..30}.ts` (93 Dateien, ~1,6 MB Text) + Nachtragslisten `{el,sr,ru}Ex.ts` (Beispielsätze).
- Seit Etappe 22 hat **jedes neue Wort** einen Beispielsatz (per Test erzwungen ab Datei 19).
- **Kein Inhalt ist von Muttersprachlern geprüft.** Automatisch geprüft: Dubletten, fehlende Übersetzung, russische Betonung (Wort + Satz), serbische Schriftmischung, Beispielsatz-Zuordnung, Umschrift.

## 5. Technischer Zustand

| Messgröße | Wert | Bewertung |
|---|---|---|
| Erster Download (Pages) | 366 KB (Kern + gewählte Sprache) | ✅ (vorher ~1,8 MB) |
| Start iPhone-13-Simulation, CPU ×4 (`npm run perf`) | **0,47 s** | ✅ (vorher 1,5 s) – wächst nur noch mit der gewählten Sprache |
| Unit-Tests | 107/107 grün | ✅ |
| E2E | 34/34 grün (inkl. Sprachwechsel offline) | ✅ |
| GitHub Pages Deploy | grün | ✅ |

## 6. Offene Probleme und technische Schulden

1. ~~Ladezeit/Dateigröße~~ ✅ Phase 1 erledigt (0,47 s). Rest: Artefakt-Version lädt weiterhin alles beim Start.
2. ~~Hilfsskript nur in /tmp~~ ✅ jetzt `scripts/missing.ts`.
3. ~~E2E-Port per sed~~ ✅ `npm run e2e` mit `PORT`.
4. ~~Doppelte Doku~~ ✅ erledigt (Chronik `docs/CHANGELOG.md`). Früher: `docs/ROADMAP.md` (wird von `report.ts` in `PROJECT_PROGRESS.md` eingebunden) vs. neue `ROADMAP.md`; README-Zahlen veraltet („~2.180 Wörter“).
5. ~~Riesenzeile in index.ts~~ ✅ jetzt `src/data/packs/<code>.ts`, gepflegt von `add-stage.py`.
6. **Alte Basis-Einträge ohne Beispielsatz** (v. a. B2-Rest, C1, C2, einige A1) – ca. 550–600 Wörter je Sprache.
7. **Lückentext** funktioniert nicht bei gebeugten Formen (dann nur Satzbau-Übung).
8. **Englisch/Spanisch** nur Mini-Pakete.
9. **Inhaltsqualität** nicht durch Muttersprachler geprüft; es gibt keine Möglichkeit, in der App Fehler zu melden.
10. iOS kann Browserdaten löschen → Nutzer muss sichern (Hinweis vorhanden, keine Erinnerung).

## 7. Sicherheit und Datenschutz

- Keine Server, keine Konten, keine Tracker, keine externen Schriftarten/CDNs.
- Lerndaten nur lokal (IndexedDB); Export als Datei; Cloud-Sicherung nur im claude.ai-Artefakt, privat pro Person.
- KI-Coach sendet Chat-Text nur auf claude.ai über die Plattform-Schnittstelle an Claude.
- Keine Zugangsdaten im Repo. Keine kostenpflichtigen Dienste.

## 8. Letzter Fortschritt

- 01.11.2026: Etappen 24–33 (je ~70–90 neue Einträge pro Sprache, alle mit Beispielsatz), Beispielsatz-Runden 3–12 (B1 und A2 vollständig, B2 auf ~80 %), 3.000-Marke überschritten, Messung Ladezeit; danach **Planungsauftrag**: diese drei Steuerdateien angelegt. Keine Code-Änderungen in dieser Sitzung nach Runde 12.
- 01.11.2026 nachmittags: Nutzer gibt autonomes Weiterarbeiten frei (inkl. D-010). Phase 0 und Phase 1 erledigt (Start 1,5 s → 0,47 s). Weiter mit Phase 2 (Inhalte).
- (alt) Arbeit pausiert auf Wunsch des Nutzers. Nächster Schritt laut Roadmap: **Phase 0, dann Phase 1 (Performance) – braucht Freigabe der Architektur-Entscheidung D-010.**
