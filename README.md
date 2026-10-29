# Polyglot AI

Kostenlose Sprachlern-Web-App (React + TypeScript + Vite) mit Sprachcoach, Slang im sozialen Kontext, Rollenspielen, Vokabeltrainer mit Spaced Repetition, Offline-Modus und Sicherung. Budget: 0 €.

## Version 2 – Griechisch, Serbisch, Russisch
- **Großer Kursbereich** für Griechisch (Thessaloniki), Serbisch (Belgrad) und Russisch (Moskau): je ~450 Wörter + 36–40 Slang-Ausdrücke, 34 Module (A1–B1) mit je mehreren Lektionen und Wiederholung, 5–6 Dialoge.
- **Lehrplan:** 20 Themen × 6 Niveaus (A1–C2) = 120 Plätze pro Sprache; nur gefüllte Module sind anklickbar, der Rest ist sichtbar als „geplant“.
- **Kompaktes Vokabelformat** (`src/data/vocab/*.ts`, siehe `src/data/vocab.ts`) mit automatischer Umschrift (Griechisch, Russisch mit Betonung), stabilen IDs (Fortschritt bleibt bei Updates) und Duplikat-Erkennung.
- **Serbisch** in Latein, Kyrillisch oder beiden Schriften (automatisch umgewandelt).
- **Neue Übungen:** beidseitige Karten, Standard-vs.-Umgangssprache, Lückentexte/Satzbau aus Beispielsätzen, Fehlererklärungen, „Schwierige Wörter“, Fortschritt pro Niveau und Thema.

## Was drin ist (Version 1)
- **4 vollständige Sprachpakete:** Englisch (London), Spanisch (Madrid), Griechisch (Athen), Serbisch (Belgrad) – je ca. 30 Wörter, 10 Slang-Ausdrücke mit Region, Situation, sozialer Wirkung und neutraler Alternative, 3 Lektionen mit Grammatik, 3 verzweigte Rollenspiele, Fehlerregeln.
- **Übungen:** Karteikarten, Multiple Choice, Hörverständnis, Lückentext, Satzbau, Übersetzen.
- **Spaced Repetition** (SM-2-Prinzip), Tagesziel, Lernserie, Statistik, häufige Fehler.
- **Sprachcoach:** echte KI (Claude) wenn die App auf claude.ai läuft – sonst klar gekennzeichneter regelbasierter Offline-Coach. Drei Modi (Lernen/Alltag/Immersion) und Slang-Regler.
- **Speicher:** IndexedDB mit Schema-Version und Migration; Export/Import als Datei oder Text; auf claude.ai zusätzlich private Cloud-Sicherung.
- **PWA:** Manifest + Service Worker (nur bei eigenem Hosting, z. B. GitHub Pages).
- 21 weitere Sprachen im Katalog als „geplant“ – bewusst ohne erfundene Inhalte.

## Befehle
`npm install` · `npm test` (Unit-Tests) · `npm run build` (erzeugt `dist/index.html` als eine Datei) · `npm run dev`

Neue Sprache: Datei `src/data/<code>.ts` nach Vorlage anlegen und in `src/data/index.ts` eintragen. Die Tests prüfen automatisch IDs, Verweise, Rollenspiel-Pfade und Regeln.

## Bekannte Einschränkungen
- Alle Inhalte sind KI-erstellt und **nicht von Muttersprachlern geprüft**. Slang ist regional und ändert sich schnell.
- Auf claude.ai läuft kein Service Worker → dort kein echter Offline-Modus und keine Installation. Offline/Installation nur über eigenes Hosting (GitHub Pages).
- Echte KI nur online auf claude.ai, mit den Nutzungsgrenzen des Claude-Kontos.
- Sprachausgabe nutzt die Stimmen des Geräts; für Serbisch meist die kroatische Stimme.
- Aussprache-Bewertung per Mikrofon fehlt (Mikrofon ist im claude.ai-Rahmen gesperrt).
- iOS kann Browserdaten löschen → regelmäßig sichern.

## Lizenz
MIT (Code und Inhalte). Keine externen Datenquellen, keine kostenpflichtigen Dienste.
