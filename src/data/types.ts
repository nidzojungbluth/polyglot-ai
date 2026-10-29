// Datenmodell der Sprachpakete. Neue Sprachen = neue Datei mit einem LanguagePack.

export type Register =
  | 'formell' | 'neutral' | 'locker' | 'slang' | 'jugend'
  | 'regional' | 'chat' | 'flirt' | 'vulgär';

export const REGISTER_INFO: Record<Register, { label: string; color: string }> = {
  formell: { label: 'Formell', color: '#4b6bfb' },
  neutral: { label: 'Neutral', color: '#6b7280' },
  locker: { label: 'Locker', color: '#0ea5a4' },
  slang: { label: 'Slang', color: '#d97706' },
  jugend: { label: 'Jugendsprache', color: '#c026d3' },
  regional: { label: 'Regional', color: '#65a30d' },
  chat: { label: 'Chat', color: '#0891b2' },
  flirt: { label: 'Flirt', color: '#e11d48' },
  'vulgär': { label: 'Vulgär', color: '#b91c1c' },
};

export interface Example { t: string; de: string }

export interface Word {
  id: string;
  t: string;          // Zielsprache
  tr?: string;        // Umschrift (z. B. Griechisch → Latein)
  de: string;         // Deutsch
  reg: Register;
  cat: string;        // Themengruppe
  ex?: Example;
}

export type Politeness = 'höflich' | 'neutral' | 'locker' | 'unhöflich' | 'beleidigend';

export interface SlangEntry {
  id: string;
  t: string;
  tr?: string;
  de: string;           // Bedeutung
  reg: Register;
  region: string;
  situation: string;    // typische Situation
  effect: string;       // soziale Wirkung
  politeness: Politeness;
  formal: string;       // neutrale/formelle Alternative
  ex: Example;
}

export interface Cloze { t: string; answer: string; de: string }   // t enthält "___"
export interface OrderTask { answer: string; de: string }          // Wörter werden gemischt

export interface Lesson {
  id: string;
  title: string;
  goal: string;
  words: string[];               // Word-IDs
  grammar: { title: string; text: string };
  cloze: Cloze[];
  order: OrderTask[];
}

export interface RoleOption {
  t: string;
  de: string;
  reg: Register;
  next: string | null;
  note?: string;   // Feedback vom Coach
}

export interface RoleNode { npc: string; npcDe: string; options: RoleOption[] }

export interface Roleplay {
  id: string;
  title: string;
  scene: string;
  start: string;
  nodes: Record<string, RoleNode>;
}

export interface CoachRule {
  pattern: string;    // Regex (case-insensitive) – erkennt einen typischen Fehler
  fix: string;        // korrigierte Form
  why: string;        // Erklärung auf Deutsch
}

export interface LanguagePack {
  code: string;
  name: string;           // deutscher Name
  native: string;
  flag: string;
  city: string;
  speechLang: string;     // BCP-47 für Sprachausgabe
  speechFallback?: string;
  rtl?: boolean;
  version: number;
  note: string;           // Hinweise (Schrift, Aussprache …)
  words: Word[];
  slang: SlangEntry[];
  lessons: Lesson[];
  roleplays: Roleplay[];
  coachRules: CoachRule[];
}

export interface CatalogEntry { code: string; name: string; native: string; flag: string; rtl?: boolean }
