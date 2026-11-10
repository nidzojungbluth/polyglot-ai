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
| Speicher | IndexedDB (Schema-Version 2 seit 04.11.2026, Migration 1→2, jedes Feld geprüft, Export/Import), Ausweichlösung localStorage/Speicher; sofortiges Speichern bei `visibilitychange`/`pagehide` |
| Offline | Service Worker `public/sw.js` (Netzwerk zuerst, sonst Cache) – nur auf GitHub Pages wirksam |
| Hosting | GitHub Pages über `.github/workflows/pages.yml` (Build + Deploy bei Push auf `main`) |
| Zweitauslieferung | claude.ai-Artefakt (gleiche `index.html`): echter KI-Coach, private Cloud-Sicherung (`src/lib/cloud.ts`), kein Service Worker |
| Backend | **keins** – keine Server, keine Konten, keine Kosten |
| Tests | Vitest (`tests/*.test.ts`, 107 Tests: Kernlogik, Datenqualität, Alphabet) + Playwright-E2E `tests/e2e.cjs` (31 Prüfungen, iPhone-SE/13-Simulation, offline, Dark Mode) |
| Werkzeuge | `scripts/add-stage.py` (neue Wortliste einbinden, Dubletten mit `@` markieren), `scripts/report.ts` (Kennzahlen), `scripts/missing.ts` (`npm run missing -- <Niveau> <Anzahl>`), `scripts/e2e.sh` (`npm run e2e`, Port per `PORT`) |

## 3. Implementierte Funktionen (geprüft im Code)

- **Sprachen:** Griechisch, Serbisch (Latein/Kyrillisch/beide, automatische Umwandlung), Russisch (Betonungszeichen), Englisch und Spanisch im Ausbau (Phase 6: je 10 A1- und 15 A2-Kursmodule + 1 Slang-Modul, 595 / 582 Einträge); 21 weitere Sprachen nur als „geplant“ im Katalog (`Languages.tsx`).
- **Schriftkurs** (`Alphabet.tsx`, `lib/abc.ts`, `data/alphabet/`): Griechisch, Russisch, Serbisch Latinica↔Ćirilica; Einstufungstest, viele Übungstypen.
- **Kurse** (`Courses.tsx`, `Lesson.tsx`, `lib/course.ts`, `data/curriculum.ts`): 20 Themen × 6 Niveaus + Vertiefungsteile = 241 Module pro Schwerpunktsprache, ~800 Lektionen; Grammatikhinweise je Modul.
- **Vokabeltrainer** (`Vocab.tsx`, `lib/srs.ts`): SM-2, Tageswarteschlange, Tageslimit neue Karten (Standard 20, einstellbar), „morgen fällig“, schwierige Wörter; Lernkarten mit Beispielsatz-Block (Satz → Umschrift → Übersetzung).
- **Übungen** (`lib/exercises.ts`): Karten, Multiple Choice, Hören, Lückentext aus Beispielsätzen (Artikel-/Akzent-tolerant), Satzbau, Übersetzen, Standard vs. Umgangssprache.
- **Wörterbuch** (`Dictionary.tsx`): Suche auch über Umschrift.
- **Slang** mit Register, Ton, Region, Situation, Wirkung, neutraler Alternative.
- **Rollenspiele** (`Roleplays.tsx`): verzweigte Dialoge.
- **Sprachcoach** (`Coach.tsx`, `lib/coach.ts`): auf claude.ai echte KI (Claude), sonst gekennzeichneter regelbasierter Offline-Coach; Modi Lernen/Alltag/Immersion, Slang-Menge im Einstellungs-Panel; Design Entwurf A „Apple Minimal“ (Korrekturen als „Besser so“ oben in der Antwort, Eingabe unten fixiert).
- **Fehler melden & Prüfmodus** (Phase 3, `ui.tsx` `ReportBtn`/`ReportSheet`, `Courses.tsx` `CheckMode`, `Settings.tsx` `ReportsSection`): Fähnchen an Einträgen, Blatt mit Fehlerart + Notiz, Liste/Kopieren/Teilen in den Einstellungen, gemeldete Einträge werden nicht abgefragt; Prüfmodus je Kursmodul (Stimmt/Fehler).
- **Fortschritt** (`Progress.tsx`): Statistik, Lernserie, Fortschritt je Niveau/Thema.
- **Einstellungen/Sicherung** (`Settings.tsx`): Export/Import, Cloud-Sicherung (nur claude.ai), Schriftwahl Serbisch.
- **Sprachausgabe** über Gerätestimmen (`lib/platform.ts`), Serbisch über kroatische/serbische Stimme in Latein.
- **Barrierefreiheit:** Tippflächen ≥ 44 pt, sichtbarer Fokus, „Bewegung reduzieren“ beachtet, Dark Mode.

## 4. Inhaltsstand (04.11.2026, nach Etappe 54 – Ziel 5.000 erreicht)

| | Griechisch | Serbisch | Russisch |
|---|---|---|---|
| Einträge (Wörter + Slang) | 5.002 | 5.055 | 5.069 |
| Ziel 5.000 erreicht | 100 % | 101 % | 101 % |
| Wörter mit Beispielsatz | 99 % | 99 % | 99 % |
| davon A1 / A2 / B1 / B2 / C1 / C2 | 95 / 100 / 100 / 100 / 100 / 100 % | 96 / 100 / 100 / 100 / 100 / 100 % | 96 / 100 / 100 / 100 / 100 / 100 % |
| Module / Lektionen | 348 / 1.227 | 348 / 1.228 | 348 / 1.230 |

- Wortlisten: `src/data/vocab/{el,sr,ru}{,2..51}.ts` (156 Dateien, ~1,6 MB Text) + Nachtragslisten `{el,sr,ru}Ex.ts` (Beispielsätze).
- Seit Etappe 22 hat **jedes neue Wort** einen Beispielsatz (per Test erzwungen ab Datei 19).
- **Kein Inhalt ist von Muttersprachlern geprüft.** Automatisch geprüft: Dubletten, fehlende Übersetzung, russische Betonung (Wort + Satz), serbische Schriftmischung, Beispielsatz-Zuordnung, Umschrift.

## 5. Technischer Zustand

| Messgröße | Wert | Bewertung |
|---|---|---|
| Erster Download (Pages) | 366 KB (Kern + gewählte Sprache) | ✅ (vorher ~1,8 MB) |
| Start iPhone-13-Simulation, CPU ×4 (`npm run perf`) | **0,43–0,50 s** (04.11.2026) | ✅ (vorher 1,5 s) – wächst nur noch mit der gewählten Sprache |
| Unit-Tests | 124/124 grün (05.11.2026) | ✅ |
| E2E | 43/43 grün (inkl. Sprachwechsel offline, Fehler melden, Prüfmodus, alle Seiten ohne Überlauf, alle Tippflächen ≥ 44 pt) | ✅ |
| GitHub Pages Deploy | grün | ✅ |

## 6. Offene Probleme und technische Schulden

1. ~~Ladezeit/Dateigröße~~ ✅ Phase 1 erledigt (0,47 s). Rest: Artefakt-Version lädt weiterhin alles beim Start.
2. ~~Hilfsskript nur in /tmp~~ ✅ jetzt `scripts/missing.ts`.
3. ~~E2E-Port per sed~~ ✅ `npm run e2e` mit `PORT`.
4. ~~Doppelte Doku~~ ✅ erledigt (Chronik `docs/CHANGELOG.md`). Früher: `docs/ROADMAP.md` (wird von `report.ts` in `PROJECT_PROGRESS.md` eingebunden) vs. neue `ROADMAP.md`; README-Zahlen veraltet („~2.180 Wörter“).
5. ~~Riesenzeile in index.ts~~ ✅ jetzt `src/data/packs/<code>.ts`, gepflegt von `add-stage.py`.
6. **Alte Basis-Einträge ohne Beispielsatz** (v. a. B2-Rest, C1, C2, einige A1) – ca. 550–600 Wörter je Sprache.
7. ~~Lückentext bei gebeugten Formen~~ ✅ Phase 4 (Wortstamm-Abgleich, nur wenn eindeutig).
8. **Englisch/Spanisch** nur Mini-Pakete.
9. **Inhaltsqualität** nicht durch Muttersprachler geprüft. ✅ Seit Phase 3 kann man Fehler melden und Module im Prüfmodus durchgehen – die Prüfung selbst braucht weiterhin Muttersprachler.
10. ~~Keine Sicherungs-Erinnerung~~ ✅ Phase 5 (Erinnerung nach 14 Tagen, Bitte um dauerhafte Speicherung). iOS kann trotzdem löschen, wenn der Browser die Bitte ablehnt.

## 7. Sicherheit und Datenschutz

- Keine Server, keine Konten, keine Tracker, keine externen Schriftarten/CDNs.
- Lerndaten nur lokal (IndexedDB); Export als Datei; Cloud-Sicherung nur im claude.ai-Artefakt, privat pro Person.
- KI-Coach sendet Chat-Text nur auf claude.ai über die Plattform-Schnittstelle an Claude.
- Keine Zugangsdaten im Repo. Keine kostenpflichtigen Dienste.

## 8. Letzter Fortschritt

- 01.11.2026: Etappen 24–33 (je ~70–90 neue Einträge pro Sprache, alle mit Beispielsatz), Beispielsatz-Runden 3–12 (B1 und A2 vollständig, B2 auf ~80 %), 3.000-Marke überschritten, Messung Ladezeit; danach **Planungsauftrag**: diese drei Steuerdateien angelegt. Keine Code-Änderungen in dieser Sitzung nach Runde 12.
- 01.11.2026 nachmittags: Nutzer gibt autonomes Weiterarbeiten frei (inkl. D-010). Phase 0 und Phase 1 erledigt (Start 1,5 s → 0,47 s). Weiter mit Phase 2 (Inhalte).
- 03.11.2026: Etappe 34 (Heimwerken, Drogerie, Wetter & Klima, Theater & Film, Logistik) – ~95 neue Einträge je Sprache (beste Quote bisher, spezifische Themen wirken).
- 04.11.2026: Etappe 48 – +96/+99/+100 Einträge (Kellerei & Weinherstellung, Feuerwehr & Rettungsdienst, Zirkus & Jahrmarkt, Bühnentechnik, Heilpflanzen & Kräuter).
- 04.11.2026: Etappe 49 – +94/+98/+92 Einträge (Astronomie & Weltraum, Wetterdienst & Meteorologie, Töpferei & Kunsthandwerk, Schneiderei & Nähen, Bergsteigen & Klettern).
- 04.11.2026: Etappe 50 – +97/+101/+97 Einträge (Instrumentenbau, Tierheim & Tierschutz, Reitstall & Pferdepflege, Schifffahrt & Navigation, Archäologie & Ausgrabung).
- 04.11.2026: Etappe 51 – +102/+101/+103 Einträge (Segelfliegen & Ballonfahren, Glaserei & Fenster, Kirchenmusik & Chor, Schmiede & Eisenkunst, Forstwirtschaft & Holzfällerei).
- 04.11.2026: Etappe 52 – +97/+95/+94 Einträge (Käserei & Molkerei, Dachdecker & Zimmerei, Sattlerei & Lederwaren, Uhrmacher, Blumenladen & Floristik).
- 04.11.2026: Etappe 53 – +99/+102/+102 Einträge (Steinmetz, Spinnerei & Textilfasern, Vermessung & Kartografie, Skigebiet & Seilbahn, Brauerei).
- 04.11.2026: Etappe 54 – +144/+141/+139 Einträge in 7 Modulen (Nagelstudio & Kosmetik, Tattoo & Piercing, Klavier & Klavierstimmer, Tischtennis & Badminton, Pilze sammeln, Wasserwerk & Kanalisation, Kaffeerösterei & Barista). **Phase 2 abgeschlossen: alle drei Sprachen ≥ 5.000 Einträge.** Ohne Beispielsatz bleiben nur A1-Grundwörter (Zahlen, Artikel, Pronomen, ~1 %).
- 04.11.2026 abends: **Audit + Redesign** (Master-Prompt des Nutzers). Wiederherstellungspunkt: Zweig `backup/vor-audit-2026-11-04` (Commit `1e89d7c`). Behoben: (1) `migrate()` prüft jetzt jedes Feld einer Sicherung einzeln – eine kaputte Datei konnte vorher die App lahmlegen (z. B. Coach-Verlauf mit falschem Aufbau); (2) IndexedDB-Verbindung wird wiederverwendet; (3) Cloud-Wiederherstellung prüft den aktuellen Stand; (4) Service Worker speichert keine Fehlerseiten mehr; (5) Dateiauswahl in den Einstellungen machte die Seite breiter als das iPhone; (6) Wörterbuch ohne leere Karte, flüssiges Tippen. Neues Designsystem im iOS-Stil (Farben, Typografie, Karten, SVG-Tab-Leiste, Aktivitätsring auf der Startseite, dezente Animationen, Hell/Dunkel). Tests: vitest 109/109, E2E 36/36, Start 0,43 s. **Coach-Design wartet auf Auswahl A/B/C** (Entwürfe: https://claude.ai/artifact/SnPnAfJgihgeNgohAcS4h4). Danach weiter mit Phase 3.
- 04.11.2026 spät: Nutzer wählt **Coach-Entwurf A** und gibt die vollständige Design-Transformation frei. Umgesetzt: Coach A; alle Seiten mit eigenen SVG-Symbolen statt Emojis in Bedienelementen, iOS-Zurück-Chevron, Schließen-Knöpfe, Auswahllisten, Ladeanzeige, Ergebnis-Abzeichen, Verläufe auf leichten Glanz reduziert, keine Randstreifen. Danach **Phase 3 abgeschlossen** (Fehler melden, Prüfmodus, Schema 2). E2E-Fehler im Test selbst behoben (Service-Worker-Prüfung hätte auch bei „nicht aktiv“ bestanden). Tests: vitest 114/114, E2E 40/40, Start 0,43–0,50 s. Nächste Phase: 4.
- 04.11.2026 nachts: **Phase 4 abgeschlossen** – „Los“-Knopf auf der Startseite, 30-Tage-Statistik (SVG), Fortschritt je Niveau, Lückentext für gebeugte Formen (+~400–700 Lückentexte je Sprache), „Treffer üben“ im Wörterbuch, Tippflächen ≥ 44 pt. Tests: vitest 118/118, E2E 41/41. Start-Messung schwankt auf dem Testrechner (0,52–0,79 s, auch ohne Änderung) – kein Rückschritt nachweisbar.
- 04.11.2026 nachts: **Phase 5 abgeschlossen** – Sicherungs-Erinnerung (14 Tage, abschaltbar), „Letzte Sicherung“, Bitte um dauerhafte Speicherung mit Statusanzeige. vitest 122/122, E2E 43/43. Nächste Phase: 6 (Englisch & Spanisch).
- 05.11.2026: **Phase 6, Runde 1** – Englisch und Spanisch bekommen den Kursbereich: je 5 A1-Module (Begrüßen, Zeit & Wetter, Café/Bar, Einkaufen, Stadt), jedes Wort mit Beispielsatz; `add-stage.py` kann jetzt beliebige Sprachen. Englisch 151, Spanisch 137 Einträge. vitest 124/124, E2E 43/43.
- 05.11.2026 früh: **Phase 6, Runde 2** – je 5 weitere A1-Module (Familie, Smalltalk, Wohnung, Fitness & Gesundheit, Telefon & Nachrichten) und je 9 echte Slang-Ausdrücke (UK: cheeky, gobsmacked, faff, sorted … / Spanien: estar hecho polvo, majo, cutre, mogollón …). Englisch 270, Spanisch 256 Einträge. vitest 124/124, E2E 43/43. **Nutzer hat nach dieser Runde „Stopp“ gesagt – keine weitere Runde geplant.** Nächster Schritt bei Fortsetzung: Phase 6 Runde 3 (N = 3, A2).
- 09.11.2026: Nutzer sagt „weiter“ → **Phase 6, Runde 3**: erste A2-Module (Reisen, Arbeit, Gefühle, Einkaufen & Reklamieren, Kochen & Essen gehen) für Englisch und Spanisch, je 110 neue Einträge → 380 / 366. vitest 124/124, E2E 43/43, Start 0,52 s.
- 09.11.2026: **Phase 6, Runde 4** – A2: Stadt & Behörden, Mieten & Reparaturen, Training, Telefon & online, Landestypisches (British Habits / Costumbres de España). Englisch 489, Spanisch 475. vitest 124/124, E2E 43/43, Start 0,55 s.
- 10.11.2026: **Neues Farbdesign** (D-014): Verlauf Blau → Lila → Pink, neue Startseite, Niveau-Umschalter. vitest 124/124, E2E 43/43, Start 0,46 s.
- 09.11.2026: **Phase 6, Runde 5** – A2: Dating & Beziehungen, Streiten & Versöhnen, Witze & Reaktionen, Nachrichten & Meinungen, Pläne & Termine. Englisch 595, Spanisch 582. vitest 124/124, E2E 43/43, Start 0,69 s (schwankt).
- 04.11.2026: Beispielsatz-Runde 25 – letzte Runde B: A2 bis C2 in allen drei Sprachen 100 %; offen nur A1-Grundwörter (Artikel, Pronomen, Zahlen).
- 04.11.2026: Etappe 47 – +97/+102/+102 Einträge (Fischerei & Fischmarkt, Zoo & Tierpflege, Bibliothek & Archiv, Schuhmacher & Sattler, Bestattung).
- 04.11.2026: Etappe 46 – +107/+108/+107 Einträge (Imkerei & Hofladen, Bergbau & Steinbruch, Schiff & Hafen, Fotostudio, Juwelier & Uhrmacher).
- 04.11.2026: Beispielsatz-Runde 24 – Griechisch A2–C2 komplett, Serbisch C2 komplett, Russisch C2 79 %.
- 04.11.2026: Etappe 45 – +95/+94/+88 Einträge (Straßenbau, Gärtnerei, Flughafen-Bodenpersonal, Fahrradwerkstatt, Textilreinigung); alle drei Sprachen über 4.000.
- 04.11.2026: Beispielsatz-Runde 23 – C2: Griechisch 99 %, Serbisch 81 %, Russisch 61 %.
- 04.11.2026: Etappe 44 – +104/+104/+107 Einträge (Umzugsfirma, Druckerei & Verpackung, Elektronikmontage, Tankstelle & Waschanlage, Recycling & Entsorgung); Serbisch und Russisch über 4.000.
- 04.11.2026: Beispielsatz-Runde 22 – C2 auf 42–80 % (Argumentieren, Literatur, Gefühle, Amts- und Briefsprache, Verbraucher).
- 04.11.2026: Etappe 43 – je +99 Einträge (Chemie im Werk, Kunststoff & Spritzguss, Lebensmittelproduktion, Callcenter, Hotel-Rezeption & Housekeeping).
- 03.11.2026: Beispielsatz-Runde 21 – Russisch C1 komplett; C2 Griechisch 61 %, Serbisch 43 %.
- 03.11.2026: Etappe 42 – +99/+103/+98 Einträge (Pflege & Altenheim, Metallbau & Schweißen, Kantine & Großküche, Paketzustellung, Sicherheitsdienst).
- 03.11.2026: Beispielsatz-Runde 20 – C1 Serbisch 95 %, Russisch 90 %; Griechisch C2 auf 43 %.
- 03.11.2026: Etappe 41 – +90/+80/+87 Einträge (Supermarkt-Arbeit, Gebäudereinigung, Maler & Lackierer, Schreinerei & Holz, Bus & ÖPNV-Personal).
- 03.11.2026: Beispielsatz-Runde 19 – C1 auf 79–98 % (Wirtschaft, Stadt, Geschichte, Werte, Technik, Feiern).
- 03.11.2026: Etappe 40 – +86/+87/+89 Einträge (Optiker & Hörgeräte, Babys, Haustiere & Tierarzt, Wassersport, Maße & Mengen – Letzteres fast nur Duplikate).
- 03.11.2026: Beispielsatz-Runde 18 – C1 auf 69–87 % (Politik, Arbeit, Gefühle, Wohnen, Umwelt, Konnektoren).
- 03.11.2026: Etappe 39 – +89/+91/+94 Einträge (Friseur & Kosmetik, Post & Paket, Zahnarzt, Bahn & Fernverkehr, Bäckerei & Konditorei).
- 03.11.2026: Beispielsatz-Runde 17 – A1 bis auf Grundwörter komplett (Präpositionen, Berufe), C1 auf 59–77 %.
- 03.11.2026: Etappe 38 – +83/+82/+83 Einträge (Profiküche, Wildtiere & Insekten, Spiele & Hobbys, Elektriker & Installateur, Notfälle).
- 03.11.2026: Beispielsatz-Runde 16 – A1 fast komplett (Fragewörter, Smalltalk, Berufe, Wochentage), Griechisch C1 auf 66 %.
- 03.11.2026: Etappe 37 – +56/+55/+58 Einträge (Recht, Finanzen, Technik, Kfz, Landwirtschaft); ~50 % waren schon vorhanden.
- 03.11.2026: Beispielsatz-Runde 15 – B2 komplett (100 %), dazu A1-Wochentage, Monate und Berufe.
- 03.11.2026: Etappe 36 – +78/+75/+77 Einträge (Umweltpolitik, Wissenschaft, Reisen & Behörden, Ironie & Humor, Amtssprache).
- 03.11.2026: Beispielsatz-Runde 14 – B2 auf 95–99 % (Soziale Medien, Schule, Diskussion, Film, Lagerverben, Gesundheit).
- 03.11.2026: Etappe 35 – +95/+102/+97 Einträge (Versicherungen, Immobilien, Gesundheitssystem, Medien, Lager & Produktion).
- 03.11.2026: Beispielsatz-Runde 13 – B2 auf ~90 % (Beschwerden, Wirtschaft, Ernährung, Verträge, Gesundheitssystem, Verkehr).
- (alt) Arbeit pausiert auf Wunsch des Nutzers. Nächster Schritt laut Roadmap: **Phase 0, dann Phase 1 (Performance) – braucht Freigabe der Architektur-Entscheidung D-010.**
