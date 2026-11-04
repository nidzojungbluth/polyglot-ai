// Lokale Speicherung des Lernfortschritts in IndexedDB (Datenbank im Browser).
// Fallback: localStorage, zuletzt nur Arbeitsspeicher. Mit Schema-Version und Migration.
import type { Card } from './srs';

/** 2 = mit Fehlermeldungen (reports) und Prüfhäkchen (checks), Phase 3, 04.11.2026. */
export const SCHEMA_VERSION = 2;

export type CoachMode = 'lernen' | 'alltag' | 'immersion';
export type Theme = 'auto' | 'hell' | 'dunkel';

export type ReportKind = 'übersetzung' | 'schreibweise' | 'betonung' | 'satz' | 'sonstiges';
export const REPORT_KINDS: { k: ReportKind; label: string }[] = [
  { k: 'übersetzung', label: 'Übersetzung falsch' },
  { k: 'schreibweise', label: 'Schreibweise falsch' },
  { k: 'betonung', label: 'Betonung/Aussprache falsch' },
  { k: 'satz', label: 'Beispielsatz unnatürlich' },
  { k: 'sonstiges', label: 'Sonstiges' },
];
/** Eine Fehlermeldung zu einem Eintrag. Der Eintrag wird mitgespeichert, damit die Meldung auch nach einer Korrektur verständlich bleibt. */
export interface Report { id: string; lang: string; kind: ReportKind; note: string; at: number; t: string; de: string; ex?: string }

export interface CoachMsg { role: 'user' | 'assistant'; content: string; source?: 'ki' | 'regel' }

export interface AppState {
  schema: number;
  settings: {
    lang: string;
    theme: Theme;
    dailyGoal: number;          // Übungen pro Tag
    coachMode: CoachMode;
    slang: number;              // 0 = keiner, 1 = etwas, 2 = viel
    interests: string;          // für personalisierte Übungen
    aiEnabled: boolean;
    srScript: 'beide' | 'latein' | 'kyrillisch';  // Serbisch: Schriftwahl
    cardDir: 'gemischt' | 'zu-de' | 'zu-ziel';    // Richtung der Karteikarten
    newPerDay: number;          // Tageslimit für neue Karten (0 = kein Limit)
  };
  cards: Record<string, Card>;
  /** Wie viele neue Karten heute schon gelernt wurden (für das Tageslimit). */
  newDone?: { day: string; n: number };
  lessons: Record<string, { best: number; doneAt: number; via?: 'test' | 'skip' }>;
  roleplays: Record<string, number>;           // Anzahl Durchläufe
  daily: Record<string, number>;               // "YYYY-MM-DD" → Übungen
  mistakes: Record<string, { why: string; count: number; lang: string }>;
  coach: Record<string, CoachMsg[]>;           // Verlauf pro Sprache
  reports: Record<string, Report>;             // Fehlermeldungen, Schlüssel = Eintrags-ID
  checks: Record<string, number>;              // Prüfmodus: als korrekt bestätigt (Zeitpunkt)
  updatedAt: number;
}

export function defaultState(): AppState {
  return {
    schema: SCHEMA_VERSION,
    settings: { lang: 'en', theme: 'auto', dailyGoal: 20, coachMode: 'alltag', slang: 1, interests: '', aiEnabled: true, srScript: 'beide', cardDir: 'gemischt', newPerDay: 20 },
    cards: {}, lessons: {}, roleplays: {}, daily: {}, mistakes: {}, coach: {}, reports: {}, checks: {}, updatedAt: Date.now(),
  };
}

/** Prüft und repariert fremde/alte Daten (Import, ältere Versionen). Wirft bei unbrauchbaren Daten. */
export function migrate(raw: unknown): AppState {
  if (!raw || typeof raw !== 'object') throw new Error('Keine gültigen Polyglot-Daten.');
  const r = raw as Partial<AppState>;
  if (typeof r.schema !== 'number') throw new Error('Die Datei enthält keine Polyglot-Sicherung (Versionsnummer fehlt).');
  if (r.schema > SCHEMA_VERSION) throw new Error('Diese Sicherung stammt aus einer neueren App-Version.');
  const d = defaultState();
  const obj = (v: unknown) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {}) as Record<string, any>;
  const num = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
  const cards: Record<string, Card> = {};
  for (const [k, c] of Object.entries(obj(r.cards))) {
    if (c && num(c.due) && num(c.ease) && num(c.interval)) {
      cards[k] = { id: k, ease: c.ease, interval: c.interval, reps: c.reps | 0, lapses: c.lapses | 0, due: c.due };
    }
  }
  // Nur Einträge mit dem richtigen Aufbau übernehmen – eine beschädigte oder fremde Sicherung darf die App nicht lahmlegen.
  const pick = <T,>(src: unknown, ok: (v: any) => T | undefined): Record<string, T> => {
    const out: Record<string, T> = {};
    for (const [k, v] of Object.entries(obj(src))) { const x = ok(v); if (x !== undefined) out[k] = x; }
    return out;
  };
  const coach = pick(r.coach, (list) => Array.isArray(list)
    ? list.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-40).map((m): CoachMsg => ({ role: m.role, content: m.content.slice(0, 8000), ...(m.source === 'ki' || m.source === 'regel' ? { source: m.source } : {}) }))
    : undefined);
  return {
    schema: SCHEMA_VERSION,
    settings: cleanSettings(obj(r.settings), d.settings),
    cards,
    newDone: r.newDone && typeof r.newDone.day === 'string' && num(r.newDone.n) ? { day: r.newDone.day, n: r.newDone.n } : undefined,
    lessons: pick(r.lessons, (v) => (v && num(v.best) && num(v.doneAt) ? { best: v.best, doneAt: v.doneAt, ...(v.via === 'test' || v.via === 'skip' ? { via: v.via } : {}) } : undefined)),
    roleplays: pick(r.roleplays, (v) => (num(v) ? v : undefined)),
    daily: pick(r.daily, (v) => (num(v) ? v : undefined)),
    mistakes: pick(r.mistakes, (v) => (v && typeof v.why === 'string' && num(v.count) && typeof v.lang === 'string' ? { why: v.why.slice(0, 500), count: v.count, lang: v.lang } : undefined)),
    coach,
    // Schema 1 kannte beides noch nicht → leer übernehmen (Migration 1 → 2)
    reports: pick((r as any).reports, (v): Report | undefined => (v && typeof v.id === 'string' && typeof v.t === 'string' && typeof v.de === 'string'
      && REPORT_KINDS.some((x) => x.k === v.kind) ? {
        id: v.id, lang: typeof v.lang === 'string' ? v.lang : '', kind: v.kind, note: typeof v.note === 'string' ? v.note.slice(0, 1000) : '',
        at: num(v.at) ? v.at : Date.now(), t: v.t.slice(0, 300), de: v.de.slice(0, 300), ...(typeof v.ex === 'string' ? { ex: v.ex.slice(0, 600) } : {}),
      } : undefined)),
    checks: pick((r as any).checks, (v) => (num(v) ? v : undefined)),
    updatedAt: num(r.updatedAt) ? r.updatedAt : Date.now(),
  };
}

/** Einstellungen einzeln prüfen; Unbekanntes oder Ungültiges fällt auf den Standardwert zurück. */
function cleanSettings(s: Record<string, any>, d: AppState['settings']): AppState['settings'] {
  const oneOf = <T,>(v: unknown, list: readonly T[], def: T): T => (list.includes(v as T) ? (v as T) : def);
  const int = (v: unknown, min: number, max: number, def: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : def);
  return {
    lang: typeof s.lang === 'string' && /^[a-z]{2,3}$/.test(s.lang) ? s.lang : d.lang,
    theme: oneOf(s.theme, ['auto', 'hell', 'dunkel'] as const, d.theme),
    dailyGoal: int(s.dailyGoal, 5, 100, d.dailyGoal),
    coachMode: oneOf(s.coachMode, ['lernen', 'alltag', 'immersion'] as const, d.coachMode),
    slang: int(s.slang, 0, 2, d.slang),
    interests: typeof s.interests === 'string' ? s.interests.slice(0, 200) : d.interests,
    aiEnabled: typeof s.aiEnabled === 'boolean' ? s.aiEnabled : d.aiEnabled,
    srScript: oneOf(s.srScript, ['beide', 'latein', 'kyrillisch'] as const, d.srScript),
    cardDir: oneOf(s.cardDir, ['gemischt', 'zu-de', 'zu-ziel'] as const, d.cardDir),
    newPerDay: int(s.newPerDay, 0, 500, d.newPerDay),
  };
}

const DB_NAME = 'polyglot-ai';
const STORE = 'kv';
const KEY = 'state';

// Eine geöffnete Verbindung wiederverwenden (vorher wurde bei jedem Speichern neu geöffnet).
let dbPromise: Promise<IDBDatabase> | null = null;
function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
      req.onsuccess = () => {
        const db = req.result;
        // Wird die Verbindung geschlossen (anderer Tab, iOS im Hintergrund), beim nächsten Mal neu öffnen.
        db.onversionchange = () => { db.close(); dbPromise = null; };
        (db as any).onclose = () => { dbPromise = null; };
        resolve(db);
      };
      req.onerror = () => reject(req.error);
    } catch (e) { reject(e); }
  }).catch((e) => { dbPromise = null; throw e; });
  return dbPromise;
}

/** Einmal neu verbinden, falls die gespeicherte Verbindung inzwischen ungültig ist. */
async function withDb<T>(fn: (db: IDBDatabase) => Promise<T>): Promise<T> {
  try { return await fn(await openDb()); }
  catch (e) { dbPromise = null; return fn(await openDb()); }
}

export type StorageKind = 'indexeddb' | 'localstorage' | 'memory';
let memory: AppState | null = null;

export async function loadState(): Promise<{ state: AppState; kind: StorageKind }> {
  try {
    const raw = await withDb((db) => new Promise<unknown>((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).get(KEY);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
    return { state: raw ? migrate(raw) : defaultState(), kind: 'indexeddb' };
  } catch { /* weiter mit Fallback */ }
  try {
    const raw = localStorage.getItem(DB_NAME);
    return { state: raw ? migrate(JSON.parse(raw)) : defaultState(), kind: 'localstorage' };
  } catch { /* weiter */ }
  return { state: memory ?? defaultState(), kind: 'memory' };
}

export async function saveState(state: AppState, kind: StorageKind): Promise<void> {
  if (kind === 'indexeddb') {
    await withDb((db) => new Promise<void>((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(state, KEY);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
      tx.onabort = () => rej(tx.error);
    }));
    return;
  }
  if (kind === 'localstorage') { localStorage.setItem(DB_NAME, JSON.stringify(state)); return; }
  memory = state;
}

// ---------- Sicherung (Backup) ----------
export function exportBackup(state: AppState): string {
  return JSON.stringify({ app: 'polyglot-ai', exportedAt: new Date().toISOString(), ...state });
}

export function importBackup(text: string): AppState {
  let parsed: unknown;
  try { parsed = JSON.parse(text.trim()); } catch { throw new Error('Das ist kein gültiger Sicherungstext (JSON konnte nicht gelesen werden).'); }
  if ((parsed as { app?: string })?.app !== 'polyglot-ai') throw new Error('Diese Datei stammt nicht von Polyglot AI.');
  return migrate(parsed);
}

export const today = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function streak(daily: Record<string, number>, now = new Date()): number {
  let n = 0;
  const d = new Date(now);
  if (!daily[today(d)]) d.setDate(d.getDate() - 1); // heute noch nicht gelernt → Serie zählt bis gestern
  while (daily[today(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/** Neue Karten, die heute schon dran waren (zählt nur für den heutigen Tag). */
export const newDoneToday = (s: AppState, now = new Date()) => (s.newDone?.day === today(now) ? s.newDone.n : 0);
/** Tageslimit für neue Karten; 0 heißt „kein Limit“. */
export const newLimit = (s: AppState) => (s.settings.newPerDay > 0 ? s.settings.newPerDay : Number.MAX_SAFE_INTEGER);

// ---------- Fehlermeldungen (Phase 3) ----------
/** IDs gemeldeter Einträge – sie werden in Übungen nicht abgefragt, bis die Meldung gelöscht ist. */
export const reportedIds = (s: AppState) => new Set(Object.keys(s.reports));

/** Meldungen als lesbarer Text zum Kopieren/Teilen (z. B. an einen Muttersprachler oder zur Korrektur). */
export function reportsText(s: AppState, langName: (code: string) => string = (c) => c): string {
  const list = Object.values(s.reports).sort((a, b) => a.lang.localeCompare(b.lang) || a.at - b.at);
  const checked = Object.keys(s.checks).length;
  const head = `Polyglot AI – Fehlermeldungen (${list.length})${checked ? ` · als korrekt bestätigt: ${checked}` : ''} · ${new Date().toLocaleDateString('de-DE')}`;
  const kinds = Object.fromEntries(REPORT_KINDS.map((x) => [x.k, x.label]));
  const rows = list.map((r, i) => [
    `${i + 1}. [${langName(r.lang)}] ${r.t} – ${r.de}  (ID ${r.id})`,
    `   Problem: ${kinds[r.kind]}${r.note ? ` – ${r.note}` : ''}`,
    r.ex ? `   Beispielsatz: ${r.ex}` : '',
  ].filter(Boolean).join('\n'));
  return [head, '', ...rows].join('\n');
}
