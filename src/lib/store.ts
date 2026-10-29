// Lokale Speicherung des Lernfortschritts in IndexedDB (Datenbank im Browser).
// Fallback: localStorage, zuletzt nur Arbeitsspeicher. Mit Schema-Version und Migration.
import type { Card } from './srs';

export const SCHEMA_VERSION = 1;

export type CoachMode = 'lernen' | 'alltag' | 'immersion';
export type Theme = 'auto' | 'hell' | 'dunkel';

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
  };
  cards: Record<string, Card>;
  lessons: Record<string, { best: number; doneAt: number }>;
  roleplays: Record<string, number>;           // Anzahl Durchläufe
  daily: Record<string, number>;               // "YYYY-MM-DD" → Übungen
  mistakes: Record<string, { why: string; count: number; lang: string }>;
  coach: Record<string, CoachMsg[]>;           // Verlauf pro Sprache
  updatedAt: number;
}

export function defaultState(): AppState {
  return {
    schema: SCHEMA_VERSION,
    settings: { lang: 'en', theme: 'auto', dailyGoal: 20, coachMode: 'alltag', slang: 1, interests: '', aiEnabled: true, srScript: 'beide', cardDir: 'gemischt' },
    cards: {}, lessons: {}, roleplays: {}, daily: {}, mistakes: {}, coach: {}, updatedAt: Date.now(),
  };
}

/** Prüft und repariert fremde/alte Daten (Import, ältere Versionen). Wirft bei unbrauchbaren Daten. */
export function migrate(raw: unknown): AppState {
  if (!raw || typeof raw !== 'object') throw new Error('Keine gültigen Polyglot-Daten.');
  const r = raw as Partial<AppState>;
  if (typeof r.schema !== 'number') throw new Error('Die Datei enthält keine Polyglot-Sicherung (Versionsnummer fehlt).');
  if (r.schema > SCHEMA_VERSION) throw new Error('Diese Sicherung stammt aus einer neueren App-Version.');
  const d = defaultState();
  const obj = (v: unknown) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
  const cards: Record<string, Card> = {};
  for (const [k, c] of Object.entries(obj(r.cards) as Record<string, Card>)) {
    if (c && typeof c.due === 'number' && typeof c.ease === 'number' && typeof c.interval === 'number') {
      cards[k] = { id: k, ease: c.ease, interval: c.interval, reps: c.reps | 0, lapses: c.lapses | 0, due: c.due };
    }
  }
  return {
    schema: SCHEMA_VERSION,
    settings: { ...d.settings, ...(obj(r.settings) as AppState['settings']) },
    cards,
    lessons: obj(r.lessons) as AppState['lessons'],
    roleplays: obj(r.roleplays) as AppState['roleplays'],
    daily: obj(r.daily) as AppState['daily'],
    mistakes: obj(r.mistakes) as AppState['mistakes'],
    coach: obj(r.coach) as AppState['coach'],
    updatedAt: typeof r.updatedAt === 'number' ? r.updatedAt : Date.now(),
  };
}

const DB_NAME = 'polyglot-ai';
const STORE = 'kv';
const KEY = 'state';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (e) { reject(e); }
  });
}

export type StorageKind = 'indexeddb' | 'localstorage' | 'memory';
let memory: AppState | null = null;

export async function loadState(): Promise<{ state: AppState; kind: StorageKind }> {
  try {
    const db = await openDb();
    const raw = await new Promise<unknown>((res, rej) => {
      const tx = db.transaction(STORE, 'readonly');
      const r = tx.objectStore(STORE).get(KEY);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
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
    const db = await openDb();
    await new Promise<void>((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(state, KEY);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
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
