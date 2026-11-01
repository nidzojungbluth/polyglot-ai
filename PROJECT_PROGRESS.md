# Polyglot AI – PROJECT PROGRESS

Automatisch erzeugt am 2026-11-01 mit `npm run report`. Ziel: 5000 Einträge pro Sprache.

| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |
|---|---|---|---|---|---|---|
| 🇬🇧 Englisch (UK) | 41 | 1 % | 17 | 4 | 0 | 0 |
| 🇪🇸 Spanisch (Spanien) | 39 | 1 % | 13 | 3 | 0 | 0 |
| 🇬🇷 Griechisch | 2547 | 51 % | 1585 | 1249 | 211 | 678 |
| 🇷🇸 Serbisch | 2584 | 52 % | 1573 | 930 | 211 | 679 |
| 🇷🇺 Russisch | 2590 | 52 % | 1583 | 984 | 211 | 681 |

## Einträge pro Niveau

| Sprache | A1 | A2 | B1 | B2 | C1 | C2 | ohne Niveau |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 0 | 0 | 0 | 0 | 0 | 0 | 41 |
| Spanisch (Spanien) | 0 | 0 | 0 | 0 | 0 | 0 | 39 |
| Griechisch | 435 | 542 | 624 | 476 | 234 | 196 | 40 |
| Serbisch | 441 | 546 | 636 | 487 | 235 | 200 | 39 |
| Russisch | 451 | 549 | 629 | 478 | 238 | 203 | 42 |

## Zwischenauftrag: Beispielsatz für jede Vokabel

Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.

| Sprache | Wörter mit Beispiel | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|---|
| Englisch (UK) | 6 / 30 (20 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Spanisch (Spanien) | 3 / 29 (10 %) | 0 % | 0 % | 0 % | 0 % | 0 % | 0 % |
| Griechisch | 1472 / 2434 (60 %) | 74 % | 67 % | 100 % | 31 % | 19 % | 9 % |
| Serbisch | 1457 / 2468 (59 %) | 70 % | 60 % | 100 % | 33 % | 18 % | 12 % |
| Russisch | 1463 / 2470 (59 %) | 71 % | 61 % | 100 % | 32 % | 20 % | 11 % |

## Ladezeit

App-Datei (alles in einer Datei, inkl. aller Sprachdaten): 1343 KB.

## Prüfstatus

- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.
- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).

---

# Polyglot AI – Roadmap

Zentrale Planung. Die Zahlen oben in PROJECT_PROGRESS.md werden automatisch mit `npm run report` erzeugt; dieser Teil (Roadmap) wird von Hand gepflegt.
Diese Datei wird nach jedem Arbeitspaket aktualisiert.

## Arbeitsweise

- **Reihenfolge ab Zwischenauftrag:** Runden wechseln sich ab – eine Runde Beispielsätze nachtragen, eine Runde neue Wörter (immer mit Beispielsatz) für das 5.000-Ziel.

- Gearbeitet wird in **Etappen**. Jede Etappe wird getestet (Unit-Tests, Datenprüfung, iPhone-Test mit Playwright), dann committet und veröffentlicht.
- Vor jeder Änderung an bestehenden Daten gibt es ein Git-Commit als Sicherung. Die Sicherungs-Branch `sicherung-v1` enthält den Stand vor der großen Erweiterung.
- Keine kostenpflichtigen Dienste, keine Zugangsdaten, keine Veröffentlichung fremder Daten.
- **Ehrlicher Prüfstatus:** Alle Inhalte sind KI-erstellt. Automatisch geprüft wird alles; eine Prüfung durch Muttersprachler kann ich nicht leisten.

## Reihenfolge

| # | Paket | Status |
|---|---|---|
| 1 | Projekt analysiert, Datenformat für große Wortschätze (Textformat, stabile IDs, Duplikatprüfung, @-Übernahme, Beispielsatz-Liste) | ✅ erledigt |
| 2 | Automatische Datenprüfung (Duplikate, Übersetzung, russische Betonung, serbische Schrift, Beispielsatz-Zuordnung) | ✅ erledigt |
| 3 | Griechisch, Serbisch, Russisch: alle 6 Niveaus × 20 Themen gefüllt, Beispielsätze für A1/A2 | ✅ erledigt |
| 4 | **Griechisch, Serbisch, Russisch auf 5.000 Einträge** (aktuell ca. 2.580) – Etappen 19–27: Kernverben 1–3, Adjektive 1–2, kleine Wörter, Fragewörter, Präpositionen, Tiere, Maße, Werkzeug, Wetter, Körper 2, Berufe 2, Gewürze, Gebäude, Schule, Charakter, Putzen & Wäsche, Getränke & Süßes, Accessoires & Stoffe, Freizeit & Hobbys, Verkehrsmittel, Werte & abstrakte Begriffe, Verben 4, Lager 2, Möbel & Umzug, Apotheke, Natur & Landschaft, Bank & Behörden, Küche, Auto & Werkstatt, Kleidung kaufen, Charakter, Handwerk & Baustelle, Garten, Medien & Internet, Miete & Verträge, Wirtschaft & Geld, Krankenhaus, Sport & Fußball, Schule & Ausbildung, Wissenschaft & Umwelt, Tiere & Bauernhof (ab Etappe 22 jedes Wort mit Beispielsatz) | 🔄 läuft – ca. 150–200 neue Einträge pro Sprache und Etappe |
| 5 | **Zwischenauftrag: Beispielsatz für jede Vokabel** – Anzeige im Beispielsatz-Block (Wortlisten, Slang, Lernkarten, Wörterbuch), Regel-Test für neue Wörter, Betonungsprüfung für russische Sätze, Nachtragen für alle vorhandenen Wörter | 🔄 läuft – Runden 1–2 (B1, ca. 200 Sätze pro Sprache) erledigt; noch ca. 1.150 Sätze pro Sprache, ca. 9 Runden |
| 5b | **Zwischenauftrag: Umschrift jedes Beispielsatzes** – Griechisch und Russisch: lateinische Umschrift regelbasiert aus dem Satz erzeugt (passt immer zum Satz, keine doppelt gespeicherten Daten, Betonungszeichen im Russischen erhalten, Großschreibung bleibt); Serbisch: in kyrillischer Ansicht der lateinische Satz, in der Ansicht „beide“ die kyrillische Schreibweise; Englisch/Spanisch: keine Umschrift (kein Mehrwert). Anzeige zwischen Originalsatz und Übersetzung. | ✅ erledigt (gilt automatisch für alle vorhandenen und neuen Sätze) |
| 6 | Lernsystem prüfen und verbessern – **Befund:** Wiederholungslogik (SM-2) und Speicherung (IndexedDB mit Ausweichlösung, Datenmigration, Sicherung) korrekt; 3 Schwachstellen behoben: sofortiges Speichern beim Verlassen der App, verwaiste Karten nach Korrekturen ignoriert (beendeten Wiederholungen vorzeitig), Tageslimit für neue Karten (Standard 20, einstellbar) + Anzeige „morgen fällig“; Geschwindigkeit mit 3.000 Karten getestet | ✅ erledigt |
| 7 | UI/UX professionalisieren – **Runde 1 (Befund per Screenshots iPhone SE/13 + automatische Messung der Tippflächen):** Listen-Karten verloren ihren Innenabstand (Symbole abgeschnitten) → Ursache in der Stilreihenfolge behoben; Niveau-Knöpfe und Logo unter 44 pt → vergrößert (jetzt keine Tippfläche < 44 pt); dezenter Seitenübergang (abschaltbar über „Bewegung reduzieren“); sichtbare Fokus-Markierung; Beispielsatz-Block mit Umschrift; Übersetzung neben dem Wort. Weitere Feinarbeit (Startseite, Statistik-Grafiken) in späteren Runden | 🔄 Runde 1 erledigt |
| 8 | Ladezeit bei großen Wortschätzen: Sprachdaten getrennt laden (GitHub-Pages-Version) | ⏳ geplant ab ca. 3.000 Einträgen |
| 9 | Englisch und Spanisch ausbauen (bisher ca. 40 Einträge) | ⏳ nach den drei Schwerpunktsprachen |
| 10 | Abschlussprüfung und Dokumentation | ⏳ am Ende |

## Bisher behobene Fehler (Auswahl)

- Lückentext fand Wörter mit Artikel und Akzentvarianten nicht; fand Wörter auch mitten in anderen Wörtern (z. B. „sir“ in „sirup“).
- Kursübersicht zeigte bei zweiten Modulteilen falsche Themenzahlen.
- Deutsche Übersetzung fehlte in der Slang-Liste; steht jetzt in allen Wortlisten direkt neben dem Wort.
- Falsche russische Betonungen (трудово́й, работода́тель, вы́деленная, ваще́) korrigiert.
- Mehrdeutiges russisches „пост“ (Fasten / Beitrag) getrennt.
- Fehlende Betonungen in russischen Beispielsätzen (u. a. Че́рез, Споко́йной, О́тпуск, и́ли) korrigiert; wird jetzt automatisch geprüft.
- Build-Fehler durch einen Test ohne Vite-Typen behoben.
- Umschrift verlor die Großschreibung (Satzanfänge, Namen) – behoben.
- Letzte Antwort konnte verloren gehen, wenn die App sofort danach geschlossen wurde – jetzt wird beim Verlassen sofort gespeichert.
- Karten zu korrigierten Einträgen zählten als fällig und beendeten eine Wiederholungsrunde vorzeitig – werden jetzt ignoriert (nicht gelöscht).
- „Alle Slang-Karten zum Stapel“ machte über 100 Karten auf einmal fällig – jetzt Tageslimit für neue Karten.
- Listen-Karten (z. B. Kursliste) klebten am Rand, Symbole wurden abgeschnitten – Stilreihenfolge korrigiert.
- Niveau-Knöpfe und Logo waren kleiner als die empfohlenen 44 pt Tippfläche – vergrößert.

## Messwerte

- Ladezeit (iPhone-13-Simulation): App bedienbar nach ca. 0,5 s; Liste aller ~2.000 Wörter öffnet in ca. 0,2 s.

## Offene Punkte

- Inhalte durch Muttersprachler prüfen lassen (kann ich nicht selbst).
- Bei gebeugten Wörtern im Beispielsatz gibt es keinen Lückentext (nur Satzbau-Übung).
