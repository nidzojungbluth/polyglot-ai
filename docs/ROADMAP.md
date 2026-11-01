# Polyglot AI – Roadmap

Zentrale Planung. Die Zahlen stehen in [STATUS.md](STATUS.md) (automatisch erzeugt mit `npm run report`).
Diese Datei wird nach jedem Arbeitspaket aktualisiert.

## Arbeitsweise

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
| 4 | **Griechisch, Serbisch, Russisch auf 5.000 Einträge** (aktuell ca. 1.830) | 🔄 läuft – ca. 150–200 neue Einträge pro Sprache und Etappe |
| 5 | Beispielsätze für B1–C2 | ⏳ geplant, verzahnt mit Paket 4 |
| 6 | Lernsystem prüfen und verbessern (Wiederholung, schwierige Wörter, Statistik) | ⏳ geplant nach ca. 2.500 Einträgen |
| 7 | UI/UX professionalisieren (Startseite, Navigation, Vokabeltrainer, Statistik, Animationen) | ⏳ geplant nach ca. 2.500 Einträgen |
| 8 | Ladezeit bei großen Wortschätzen: Sprachdaten getrennt laden (GitHub-Pages-Version) | ⏳ geplant ab ca. 3.000 Einträgen |
| 9 | Englisch und Spanisch ausbauen (bisher ca. 40 Einträge) | ⏳ nach den drei Schwerpunktsprachen |
| 10 | Abschlussprüfung und Dokumentation | ⏳ am Ende |

## Bisher behobene Fehler (Auswahl)

- Lückentext fand Wörter mit Artikel und Akzentvarianten nicht; fand Wörter auch mitten in anderen Wörtern (z. B. „sir“ in „sirup“).
- Kursübersicht zeigte bei zweiten Modulteilen falsche Themenzahlen.
- Deutsche Übersetzung fehlte in der Slang-Liste; steht jetzt in allen Wortlisten direkt neben dem Wort.
- Falsche russische Betonungen (трудово́й, работода́тель, вы́деленная, ваще́) korrigiert.
- Mehrdeutiges russisches „пост“ (Fasten / Beitrag) getrennt.

## Offene Punkte

- Inhalte durch Muttersprachler prüfen lassen (kann ich nicht selbst).
- Bei gebeugten Wörtern im Beispielsatz gibt es keinen Lückentext (nur Satzbau-Übung).
