# Polyglot AI – Architektur- und Produktentscheidungen

> Format: ID · Entscheidung · Begründung · verworfene Alternativen · Status. Neue Entscheidungen unten anhängen, alte nie löschen (nur Status ändern).

## Getroffene Entscheidungen

**D-001 · 0-€-Betrieb ohne Backend.**
Alles läuft im Browser; Hosting über GitHub Pages; KI nur über claude.ai.
*Warum:* Nutzervorgabe Budget 0 €, keine Zugangsdaten, keine Wartung.
*Verworfen:* eigener Server/Datenbank, Firebase/Supabase (Kosten, Konten, Datenschutz).
*Status:* gilt.

**D-002 · React + TypeScript + Vite, kein Router, keine UI-Bibliothek.**
*Warum:* klein, schnell, wenig Abhängigkeiten; View-State in `App.tsx` reicht für ~12 Ansichten.
*Verworfen:* Next.js (Server nötig), React Router (unnötig), Tailwind/MUI (Größe).
*Status:* gilt. Router erst einführen, wenn tiefe Links/Zurück-Taste zum Problem werden.

**D-003 · Zwei Auslieferungen aus einem Code: GitHub Pages (PWA, offline) und claude.ai-Artefakt (KI-Coach, Cloud-Sicherung).**
*Warum:* Pages bietet Service Worker/Installation, claude.ai bietet kostenlose echte KI. Funktionen werden zur Laufzeit erkannt (`lib/platform.ts`, `lib/cloud.ts`).
*Status:* gilt.

**D-004 · Inhalte als kompakter Text in TypeScript-Dateien (`src/data/vocab/*.ts`), geparst zur Laufzeit.**
Format: `## topic=… level=… [part=N] title=…`, Wortzeile `t | de | pos | reg | ex_t | ex_de | note`, Slangzeile mit 12 Feldern, `@` = vorhandenen Eintrag wiederverwenden, Nachtragslisten `*Ex.ts` (`t | Satz | Deutsch`).
*Warum:* für KI-Erstellung und Git-Diffs ideal, stabile IDs (`<code>-m-<topic>-<level>[-part]`), Dubletten automatisch erkannt.
*Verworfen:* JSON (unhandlich, fehleranfällig beim Schreiben), Datenbank (Backend), externe Wortlisten (Lizenz/Qualität).
*Status:* gilt. Konsequenz: Parsen kostet Startzeit → siehe D-010.

**D-005 · Umschrift wird regelbasiert aus dem Text erzeugt, nicht gespeichert** (`lib/translit.ts`).
*Warum:* passt immer zum Satz, keine doppelten Daten; Russisch behält Betonung, Großschreibung bleibt.
*Status:* gilt.

**D-006 · Russisch immer mit Betonungszeichen; per Test erzwungen** (Wort und Satz, Ausnahmeliste: нибудь, либо, Lachlaute).
*Status:* gilt. Schreibregel: keine Betonung auf einsilbigen Wörtern, auch Bindestrich-/Zahlwörter betonen, keine lateinischen Buchstaben in kyrillischen Wörtern, keine weichen Trennstriche (U+00AD).

**D-007 · Spaced Repetition nach SM-2, Tageslimit für neue Karten (Standard 20), verwaiste Karten ignorieren statt löschen.**
*Status:* gilt.

**D-008 · Ehrlicher Prüfstatus.** Alle Inhalte KI-erstellt; „von Muttersprachlern geprüft: 0“ wird überall offen ausgewiesen. Keine erfundenen Inhalte für „geplante“ Sprachen.
*Status:* gilt.

**D-009 · Arbeitsweise in Etappen mit Pflicht-Prüfkette:** Daten schreiben → `add-stage.py` → `vitest` → Build → E2E → `npm run report` → Commit (Trailer) → Push → Artefakt veröffentlichen.
*Status:* gilt. Vor Änderungen an bestehenden Daten immer Commit als Sicherung; Branch `sicherung-v1` = Stand vor der großen Erweiterung (liegt auf GitHub).

## Zur Freigabe vorbereitet (Nutzer muss zustimmen)

**D-010 · Sprachdaten getrennt laden (Performance) – VORSCHLAG.**
*Problem:* `dist/index.html` 1,79 MB; alle Sprachen werden beim Start geladen und geparst; Start bei gedrosselter CPU ~1–4 s; bei 5.000 Einträgen je Sprache ~2,8 MB.
*Vorschlag:*
1. `src/data/index.ts` liefert Sprachpakete **asynchron** (`loadPack(code)` per `import()`), Kernsprachen-Metadaten (Name, Flagge, Anzahl) bleiben synchron.
2. **Zwei Build-Modi:** `vite build --mode pages` ohne singlefile (Code-Splitting: ein Chunk pro Sprache), Service Worker legt beim ersten Besuch App-Kern + gewählte Sprache sofort und die übrigen im Hintergrund in den Cache; `--mode artifact` wie bisher eine Datei **oder** mehrere Dateien über `publish_files` (unterstützt mehrere Dateien – vorher kurz testen).
3. Geparstes Ergebnis pro Sprache im Speicher halten (kein erneutes Parsen beim Ansichtswechsel).
*Ziel/Abnahme:* erster Start nur Kern + eine Sprache (< 500 KB), Start < 1 s bei CPU ×4, offline weiterhin vollständig, alle Tests grün, Lernfortschritt unverändert (IDs gleich).
*Verworfen:* Daten als JSON-Dateien zur Laufzeit per `fetch` (gleicher Effekt, aber zweites Datenformat); Daten in IndexedDB vorab speichern (komplex); nur Minifizieren (zu wenig Wirkung).
*Status:* **freigegeben am 01.11.2026** (Nutzer: „mach weiter … ohne erneute Erlaubnis“).

**D-011 · Ein Dokumentationssystem – VORSCHLAG.**
`ROADMAP.md` (Wurzel) wird die einzige Roadmap; `docs/ROADMAP.md` wird zur Fehler- und Änderungschronik umbenannt (`docs/CHANGELOG.md`), `scripts/report.ts` hängt künftig `PROJECT_STATUS.md`-Kennzahlen an statt die Roadmap zu kopieren.
*Status:* umgesetzt 01.11.2026.

**D-012 · Fehler-melden-Funktion statt (unbezahlbarer) Muttersprachler-Prüfung – VORSCHLAG.**
Knopf „Fehler melden“ an jedem Eintrag; Meldungen lokal gespeichert, als Text exportierbar (z. B. an Bekannte mit Muttersprache schicken); markierte Einträge werden in Übungen zurückgestellt.
*Warum:* einziger kostenloser Weg zu echter Qualitätsprüfung; Wettbewerbsvorteil (Transparenz).
*Status:* zur Planung, Phase 3.

## Grundsätze für künftige Entscheidungen

- Keine neue Abhängigkeit ohne klaren Gewinn (Größe zählt auf dem iPhone).
- Jede Funktion muss offline und ohne Konto nutzbar sein; Online-Extras nur zusätzlich.
- Lernfortschritt darf durch Datenänderungen nie verloren gehen (stabile IDs, Migrationen mit Test).
- Lieber weniger Funktionen, die zuverlässig sind, als viele halbe.
