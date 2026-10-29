import type { CatalogEntry, LanguagePack, Module, SlangEntry, Word } from './types';
import { en } from './en';
import { es } from './es';
import { el } from './el';
import { sr } from './sr';
import { ru } from './ru';
import elVocab from './vocab/el';
import srVocab from './vocab/sr';
import ruVocab from './vocab/ru';
import elVocab2 from './vocab/el2';
import srVocab2 from './vocab/sr2';
import ruVocab2 from './vocab/ru2';
import elVocab3 from './vocab/el3';
import srVocab3 from './vocab/sr3';
import ruVocab3 from './vocab/ru3';
import elVocab4 from './vocab/el4';
import srVocab4 from './vocab/sr4';
import ruVocab4 from './vocab/ru4';
import elVocab5 from './vocab/el5';
import srVocab5 from './vocab/sr5';
import ruVocab5 from './vocab/ru5';
import elVocab6 from './vocab/el6';
import srVocab6 from './vocab/sr6';
import ruVocab6 from './vocab/ru6';
import { parseVocab } from './vocab';
import { normalize } from '../lib/text';
import { autoTranslit, srCyrToLat, srLatToCyr } from '../lib/translit';

export interface EnrichedPack extends LanguagePack { duplicates: string[]; parseErrors: string[] }

/** Verbindet ein handgeschriebenes Grundpaket mit einem großen Wortschatz – ohne Duplikate. */
export function enrich(base: LanguagePack, vocabSrc?: string): EnrichedPack {
  const words: Word[] = base.words.map((w) => (w.tr ? w : { ...w, tr: autoTranslit(base.code, w.t) }));
  const slang: SlangEntry[] = base.slang.map((s) => (s.tr ? s : { ...s, tr: autoTranslit(base.code, s.t) }));
  if (!vocabSrc) return { ...base, words, slang, modules: [], duplicates: [], parseErrors: [] };
  const parsed = parseVocab(base.code, vocabSrc);
  const duplicates: string[] = [];
  const idMap = new Map<string, string>();
  const wordByNorm = new Map(words.map((w) => [normalize(w.t), w.id]));
  const vocabSeen = new Set<string>();
  for (const w of parsed.words) {
    const n = normalize(w.t);
    if (vocabSeen.has(n)) duplicates.push(w.t);
    vocabSeen.add(n);
    const existing = wordByNorm.get(n);
    if (existing) { idMap.set(w.id, existing); continue; }
    wordByNorm.set(n, w.id);
    words.push(w);
  }
  const slangByNorm = new Map(slang.map((s) => [normalize(s.t), s.id]));
  for (const s of parsed.slang) {
    const n = normalize(s.t);
    const existing = slangByNorm.get(n);
    if (existing) { duplicates.push(s.t); idMap.set(s.id, existing); continue; }
    slangByNorm.set(n, s.id);
    slang.push(s);
  }
  const uniq = (ids: string[]) => Array.from(new Set(ids.map((id) => idMap.get(id) ?? id)));
  const modules: Module[] = parsed.modules.map((m) => ({ ...m, words: uniq(m.words), slang: uniq(m.slang) }));
  return { ...base, words, slang, modules, duplicates, parseErrors: parsed.errors };
}

/** Vollständige Sprachpakete. Neue Sprache: Datei anlegen und hier eintragen. */
export const PACKS: EnrichedPack[] = [enrich(en), enrich(es), enrich(el, elVocab + elVocab2 + elVocab3 + elVocab4 + elVocab5 + elVocab6), enrich(sr, srVocab + srVocab2 + srVocab3 + srVocab4 + srVocab5 + srVocab6), enrich(ru, ruVocab + ruVocab2 + ruVocab3 + ruVocab4 + ruVocab5 + ruVocab6)];

export const packByCode = (code: string): EnrichedPack | undefined => PACKS.find((p) => p.code === code);

export type SrScript = 'beide' | 'latein' | 'kyrillisch';

/** Serbisch in der gewünschten Schrift. „beide“: Latein + Kyrillisch als zweite Zeile. */
export function withScript(pack: EnrichedPack, mode: SrScript): EnrichedPack {
  if (pack.scripts !== 'sr' || mode === 'latein') return pack;
  const cyr = mode === 'kyrillisch';
  const main = (s: string) => (cyr ? srLatToCyr(s) : s);
  const second = (s: string) => (cyr ? srCyrToLat(s) : srLatToCyr(s));
  const ex = (e?: { t: string; de: string }) => (e ? { ...e, t: main(e.t) } : e);
  return {
    ...pack,
    words: pack.words.map((w) => ({ ...w, t: main(w.t), tr: second(w.t), ex: ex(w.ex) })),
    slang: pack.slang.map((s) => ({ ...s, t: main(s.t), tr: second(s.t), ex: ex(s.ex)!, formal: main(s.formal) })),
    lessons: pack.lessons.map((l) => ({ ...l, cloze: l.cloze.map((c) => ({ ...c, t: main(c.t), answer: main(c.answer) })), order: l.order.map((o) => ({ ...o, answer: main(o.answer) })) })),
    roleplays: pack.roleplays.map((r) => ({
      ...r,
      nodes: Object.fromEntries(Object.entries(r.nodes).map(([k, n]) => [k, { ...n, npc: n.npc.startsWith('(') ? n.npc : main(n.npc), options: n.options.map((o) => ({ ...o, t: main(o.t) })) }])),
    })),
  };
}

/** Geplante Sprachen – bewusst OHNE Inhalte, damit nichts Unfertiges als Kurs erscheint. */
export const PLANNED: CatalogEntry[] = [
  { code: 'de', name: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Französisch', native: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italienisch', native: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugiesisch', native: 'Português', flag: '🇵🇹' },
  { code: 'hr', name: 'Kroatisch', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'mk', name: 'Mazedonisch', native: 'Македонски', flag: '🇲🇰' },
  { code: 'bg', name: 'Bulgarisch', native: 'Български', flag: '🇧🇬' },
  { code: 'tr', name: 'Türkisch', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'Arabisch', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'he', name: 'Hebräisch', native: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'fa', name: 'Persisch', native: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'zh', name: 'Chinesisch', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanisch', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Koreanisch', native: '한국어', flag: '🇰🇷' },
  { code: 'id', name: 'Indonesisch', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'la', name: 'Latein', native: 'Lingua Latina', flag: '🏛️' },
  { code: 'grc', name: 'Altgriechisch', native: 'Ἑλληνική', flag: '🏺' },
];
