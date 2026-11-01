# Polyglot AI – Roadmap

> Einzige verbindliche Roadmap (die alte `docs/ROADMAP.md` ist ab jetzt Chronik, siehe D-011).
> Aufwand in **Runden** (1 Runde ≈ eine autonome Arbeitseinheit von ~10 Minuten / ein mittelgroßer Arbeitsschritt mit Test, Commit, Veröffentlichung).
> Status: ⏳ offen · 🔄 läuft · ✅ erledigt · 🔒 wartet auf Freigabe

## Produktstrategie (Kurzfassung)

**Vision (unverändert):** Die beste kostenlose Offline-App, mit der Deutschsprachige Griechisch, Serbisch und Russisch so lernen, wie man sie im Alltag wirklich spricht.

| Kategorie | Inhalt |
|---|---|
| **Zwingend** | schneller Start auch bei 5.000+ Einträgen; vollständige, korrekte Inhalte (5.000 je Sprache, jeder Eintrag mit Beispielsatz); zuverlässiges Speichern + Sicherung; stabile Lernlogik |
| **Wettbewerbsvorteil** | Slang mit sozialem Kontext; Schriftkurs; Umschrift in jedem Satz; KI-Coach ohne Kosten; offline; ehrlicher Prüfstatus + Fehler melden; Fokus auf Balkan-/Osteuropasprachen, die große Apps vernachlässigen |
| **Später** | Englisch/Spanisch ausbauen, Aussprache per Mikrofon (nur Pages), weitere Sprachen, Statistik-Grafiken |
| **Bewusst nicht** | Konten, Server, Bezahlfunktionen, Gamification-Shop, Social Features, neue Frameworks |

## Reihenfolge auf einen Blick

| Phase | Ziel | Priorität | Aufwand | Status |
|---|---|---|---|---|
| 0 | Werkzeuge & Doku aufräumen | hoch | 1 Runde | ⏳ |
| 1 | Performance: Sprachen getrennt laden | **sehr hoch** | 3–4 Runden | 🔒 D-010 |
| 2 | Inhalte auf 5.000 + Beispielsatz für alle | hoch | ~30 Runden | 🔄 (laufend seit Etappe 19) |
| 3 | Qualität: Fehler melden & Prüfmodus | mittel-hoch | 2 Runden | ⏳ |
| 4 | Lernerlebnis Runde 2 (Startseite, Statistik, Lückentext gebeugt) | mittel | 3 Runden | ⏳ |
| 5 | Datensicherheit für iOS (Sicherungs-Erinnerung) | mittel | 1 Runde | ⏳ |
| 6 | Englisch & Spanisch ausbauen | niedrig | ~10 Runden | ⏳ |
| 7 | Aussprache-Training (nur Pages) | niedrig/optional | 2 Runden | ⏳ |
| 8 | Abschluss-QA & Release-Doku | hoch (am Ende) | 1–2 Runden | ⏳ |

Abhängigkeiten: 0 → 1 → (2 läuft parallel weiter, profitiert aber von 1) → 3 → 4/5 → 6/7 → 8. Phase 2 darf vor 1 weiterlaufen, macht das Ladeproblem aber größer – **empfohlen: Phase 1 zuerst.**

---

## Phase 0 – Werkzeuge & Doku aufräumen ⏳

1. **Ziel:** Folge-Sitzungen ohne Nacharbeit starten können.
2. **Aufgaben:**
   - a) `/tmp/missing.ts` als `scripts/missing.ts` ins Repo (Aufruf `npx vite-node scripts/missing.ts <Niveau> <Anzahl>`; überspringt reine Zahlen); npm-Skript `missing`.
   - b) `tests/e2e.cjs`: Port aus `process.env.PORT ?? 4300` statt fester Zahl; Hilfsskript `npm run e2e` (baut nicht, startet `python3 -m http.server` auf `dist`, führt Test aus, beendet Server).
   - c) `docs/ROADMAP.md` → `docs/CHANGELOG.md` (Fehlerchronik behalten), `scripts/report.ts` hängt `ROADMAP.md`-Kurzstatus statt der alten Datei an.
   - d) README: feste Zahlen durch Verweis auf `PROJECT_STATUS.md` ersetzen.
3. **Technik:** reine Skript-/Doku-Änderungen, kein App-Code.
4. **Dateien:** `scripts/missing.ts` (neu), `tests/e2e.cjs`, `package.json` (scripts), `scripts/report.ts`, `docs/*`, `README.md`.
5. **Abhängigkeiten:** keine.
6. **Priorität:** hoch (spart in jeder Folgerunde Zeit und Tokens).
7. **Aufwand:** 1 Runde.
8. **Abnahme:** `npm run missing B2 10`, `npm run e2e`, `npm run report` laufen; 107 + 31 Tests grün; App-Build byte-gleich zum Vorher (außer Doku).
9. **Ergebnis:** reproduzierbare Werkzeugkette.

## Phase 1 – Performance: Sprachen getrennt laden 🔒 (D-010)

1. **Ziel:** Start < 1 s (iPhone-13-Simulation, CPU ×4), erster Download < 500 KB, auch bei 5.000+ Einträgen je Sprache.
2. **Aufgaben:**
   - 1.1 Messung festschreiben: `tests/perf.cjs` (Playwright, CPU ×4, misst „bedienbar“ kalt/warm, Dateigrößen) – Basiswert heute: 1,79 MB, warm ~1,0–1,4 s, kalt ~3–4 s.
   - 1.2 `src/data/index.ts` umbauen: Pro Sprache ein Modul `src/data/packs/<code>.ts`, das Basis + Wortlisten + Nachträge zusammenführt; `index.ts` exportiert synchron nur Metadaten (`PACK_META`) und `loadPack(code): Promise<EnrichedPack>` mit Speicher-Cache. `add-stage.py` trägt neue Dateien in `packs/<code>.ts` statt in die Riesenzeile ein.
   - 1.3 Aufrufer anpassen (`App.tsx`, alle Views, die `packByCode`/`PACKS` nutzen): Ladezustand („Sprache wird geladen …“, < 300 ms), Fehlerfall; Tests auf `await loadPack` umstellen.
   - 1.4 Build-Modi: `vite.config.ts` mit `mode === 'artifact'` → singlefile; `pages` → Code-Splitting. Workflow `pages.yml` nutzt `--mode pages`.
   - 1.5 Service Worker v3: beim `install` Kern + `index.html` cachen; nach dem ersten Laden alle Sprach-Chunks im Hintergrund nachladen (Liste per `import.meta.glob`-Manifest beim Build erzeugt); Cache-Name an Build-Hash koppeln.
   - 1.6 Artefakt: prüfen, ob `publish_files` mit mehreren Dateien + dynamischem Import auf claude.ai funktioniert; wenn nein → Artefakt bleibt Einzeldatei (dort zählt Startzeit weniger, da online).
3. **Technik:** dynamisches `import()`, Vite-Code-Splitting, SW-Precache-Liste, React-`Suspense` oder einfacher Lade-State (kein neues Paket).
4. **Dateien:** `src/data/index.ts`, neu `src/data/packs/*.ts`, `src/App.tsx`, `src/views/*.tsx` (Datenzugriff), `vite.config.ts`, `public/sw.js`, `.github/workflows/pages.yml`, `scripts/add-stage.py`, `scripts/report.ts`, `tests/*`.
5. **Abhängigkeiten:** Phase 0 (e2e-Skript), Freigabe D-010.
6. **Priorität:** sehr hoch.
7. **Aufwand:** 3–4 Runden (1.1+1.2 / 1.3 / 1.4+1.5 / 1.6+Feinschliff).
8. **Abnahme:** Kennzahlen aus 1.1 erreicht; E2E inkl. „App startet OFFLINE neu“ und „Lektion offline“ für alle drei Sprachen grün; vorhandener Lernstand (Export vor Umbau) lädt unverändert (Test mit Sicherungsdatei); Sprachwechsel < 300 ms nach Cache.
9. **Ergebnis:** App bleibt schnell, egal wie groß die Wortschätze werden.

## Phase 2 – Inhalte vervollständigen 🔄

1. **Ziel:** je Sprache 5.000 Einträge; jeder Eintrag mit Beispielsatz (+ automatische Umschrift).
2. **Aufgaben (abwechselnd, wie bisher bewährt):**
   - **Runde A – neue Etappe:** Dateien `src/data/vocab/{el,sr,ru}<N>.ts` (nächstes N = 31), 5 Module × ~22 **spezifische** Wörter (Erfahrung: allgemeine Themen bringen nur ~40 % neue Wörter, spezifische ~70–80 %). Part-Nummern vorher prüfen: `grep -ho "topic=X level=Y\( part=[0-9]*\)\?" src/data/vocab/el*.ts | sort -u`. Danach `python3 scripts/add-stage.py <N>`.
   - **Runde B – Beispielsätze nachtragen:** `npm run missing <Niveau> 80`, Sätze an `src/data/vocab/{el,sr,ru}Ex.ts` anhängen (vor dem schließenden Backtick). Reihenfolge: B2-Rest → A1-Rest (ohne Artikel/Pronomen/Zahlen) → C1 → C2.
   - Themenvorrat für Runden A: Werkzeuge & Heimwerken B1, Körperpflege & Drogerie B1, Wetter & Klima B2, Theater & Film B2, Logistik & Spedition B2, Versicherungen B2, Immobilien & Kauf C1, Gesundheitssystem C1, Medien & Journalismus C1, Umweltpolitik C1, Redewendungen C2 (je Sprache eigene), Ironie & Humor C2, Amtsdeutsch-Äquivalente C2, Fachsprache Lager/Produktion C1.
3. **Technik:** bestehendes Format (D-004), Regeln D-006.
4. **Dateien:** `src/data/vocab/*`, automatisch `src/data/index.ts` bzw. nach Phase 1 `src/data/packs/*`.
5. **Abhängigkeiten:** keine harte; empfohlen nach Phase 1.
6. **Priorität:** hoch.
7. **Aufwand:** ~2.000 fehlende Einträge je Sprache ÷ ~75 neue pro Runde A ≈ 27 Runden A; ~580 fehlende Beispielsätze je Sprache ÷ ~65 pro Runde B ≈ 9 Runden B → **~36 Runden**.
8. **Abnahme je Runde:** `vitest` 107/107 (inkl. Betonung, Dubletten, Beispielsatz-Pflicht), E2E grün, `npm run report` zeigt Zuwachs; Stichprobe 5 Sätze je Sprache gelesen.
9. **Ergebnis:** 5.000 Einträge × 3 Sprachen, 100 % mit Beispielsatz.

## Phase 3 – Qualität: Fehler melden & Prüfmodus ⏳ (D-012)

1. **Ziel:** echte Qualitätsprüfung ohne Kosten ermöglichen.
2. **Aufgaben:** Knopf „Fehler melden“ (Wortkarte, Wörterbuch, Beispielsatz-Block) mit Auswahl (Übersetzung / Schreibweise / Betonung / Satz unnatürlich / Sonstiges) + Freitext; Speicherung in `AppState.reports` (Schema 2 mit Migration); Liste in Einstellungen mit „als Text kopieren/teilen“; gemeldete Einträge werden in Übungen nicht abgefragt, bis Meldung gelöscht; optionaler **Prüfmodus** (Muttersprachler blättert Einträge eines Moduls durch, tippt ✓/✗).
3. **Technik:** `lib/store.ts` (Schema-Migration 1→2), `views/ui.tsx` (Knopf-Komponente), `Settings.tsx`, `lib/srs.ts` (Filter).
4. **Abhängigkeiten:** Phase 1 (Datenzugriff stabil).
5. **Priorität:** mittel-hoch. **Aufwand:** 2 Runden.
6. **Abnahme:** Migration-Test (alte Sicherung lädt), Meldung überlebt Neustart, Export-Text enthält Eintrag + Meldung, gemeldete Karte erscheint nicht in `todayQueue`.
7. **Ergebnis:** Fehler können gesammelt und gezielt korrigiert werden.

## Phase 4 – Lernerlebnis Runde 2 ⏳

1. **Ziel:** tägliches Lernen motivierender und klarer.
2. **Aufgaben:** Startseite: „Heute“-Karte (fällig/neu/Serie, ein Knopf „Los“); Statistik: 30-Tage-Balken (reines SVG, keine Bibliothek), Fortschritt je Niveau; Lückentext für gebeugte Formen (Wortstamm-Abgleich mit Mindestlänge, nur wenn eindeutig); Wiederholungen auch im Wörterbuch startbar.
3. **Dateien:** `Home.tsx`, `Progress.tsx`, `lib/exercises.ts`, `styles.css`, Tests.
4. **Abhängigkeiten:** Phase 1. **Priorität:** mittel. **Aufwand:** 3 Runden.
5. **Abnahme:** Screenshot-Prüfung iPhone SE/13 hell/dunkel, keine Tippfläche < 44 pt (E2E-Messung), neue Lückentext-Fälle in `core.test.ts`, Lückentext-Quote im Report steigt.

## Phase 5 – Datensicherheit iOS ⏳

1. **Ziel:** kein Lernstand geht verloren.
2. **Aufgaben:** Erinnerung „Seit X Tagen nicht gesichert“ (nach 14 Tagen, abschaltbar); Sicherungsdatei mit Datum im Namen; `navigator.storage.persist()` anfragen (Pages).
3. **Dateien:** `Home.tsx`/`Settings.tsx`, `lib/store.ts`. **Aufwand:** 1 Runde. **Abnahme:** Unit-Test Erinnerungslogik, E2E Export/Import.

## Phase 6 – Englisch & Spanisch ausbauen ⏳

Erst nach Phase 2. Gleiche Werkzeugkette; Ziel zunächst A1–B1 je 1.000 Einträge mit Beispielsatz. ~10 Runden. Abnahme wie Phase 2.

## Phase 7 – Aussprache-Training (optional) ⏳

Nur GitHub-Pages-Version (auf claude.ai ist das Mikrofon gesperrt): Web Speech Recognition (iOS Safari), Wort nachsprechen → Übereinstimmung anzeigen; ohne Unterstützung Funktion ausblenden. 2 Runden. Abnahme: Funktion erscheint nur, wenn verfügbar; keine Aufnahme wird gespeichert.

## Phase 8 – Abschluss-QA & Release ⏳

Vollständiger Testlauf, Leistungsmessung, Barrierefreiheits-Durchgang, README/Status final, Release-Tag `v3.0`. 1–2 Runden.

---

## Protokoll „Setze die Roadmap fort“

1. `PROJECT_STATUS.md`, `ROADMAP.md`, `DECISIONS.md` lesen (nichts anderes vorab).
2. Kurzprüfung: `git log --oneline -3`, `gh run list -R nidzojungbluth/polyglot-ai -L 1`, `npx vitest run | tail -3`.
3. Erste offene Aufgabe mit höchster Priorität wählen, deren Abhängigkeiten erfüllt sind und die **nicht** 🔒 ist.
4. Umsetzen → Tests (vitest, Build, `npm run e2e`) → `npm run report` → Status-/Roadmap-Zeile aktualisieren → Commit (Trailer) → Push → Artefakt veröffentlichen (`publish_files`, slug `aafed084-5356-4a9e-9b7a-4101f6b3b948`, aktuelle `base_version` per `get_artifact`).
5. Kurzer deutscher Bericht (Fachbegriffe einfach erklären), dann nächste Aufgabe, solange der Nutzer nicht „stopp/Pause“ sagt.

## Effizienzregeln (Claude-Nutzungsvolumen)

- Nur die drei Steuerdateien lesen; Code-Dateien gezielt per `grep`/Zeilenbereich statt ganz.
- Große Inhalte direkt in Dateien schreiben, nicht im Chat ausgeben; keine Code-Blöcke im Bericht.
- Pro Runde **ein** Bash-Aufruf für die Prüfkette (Build + E2E + Report + Commit).
- Russische Fehlerquellen vorab vermeiden (Betonung bei Zahl-/Bindestrichwörtern, einsilbige Wörter ohne Akzent, kein lateinisches é/ý, keine weichen Trennstriche) – spart Testschleifen.
- Bericht kurz: Ergebnis, Tabelle, nächster Schritt.
- Nicht erneut analysieren, was hier dokumentiert ist; Abweichungen in `PROJECT_STATUS.md` nachtragen.
