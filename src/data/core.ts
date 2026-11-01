import type { CatalogEntry, Example, LanguagePack, Module, SlangEntry, Word } from './types';
import { REF, parseVocab } from './vocab';
import { normalize } from '../lib/text';
import { autoTranslit, srCyrToLat, srLatToCyr } from '../lib/translit';

export interface EnrichedPack extends LanguagePack { duplicates: string[]; parseErrors: string[] }

/** Verbindet ein handgeschriebenes Grundpaket mit einem großen Wortschatz – ohne Duplikate. */
/** Hängt an jeden Beispielsatz die lateinische Umschrift (Griechisch, Russisch). Regelbasiert aus dem Satz abgeleitet – passt daher immer zum Satz. */
function addExampleTranslit(code: string, words: Word[], slang: SlangEntry[]) {
  const tr = (e?: Example) => (e ? { ...e, tr: autoTranslit(code, e.t) } : e);
  if (code !== 'el' && code !== 'ru') return;
  for (let i = 0; i < words.length; i++) if (words[i].ex) words[i] = { ...words[i], ex: tr(words[i].ex) };
  for (let i = 0; i < slang.length; i++) slang[i] = { ...slang[i], ex: tr(slang[i].ex)! };
}

/** Ergänzt Beispielsätze aus einer eigenen Liste: „Wort | Beispiel | Übersetzung“. */
function applyExamples(words: Word[], src: string, errors: string[]) {
  const byNorm = new Map(words.map((w, i) => [normalize(w.t), i]));
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('//')) continue;
    const [t, ext, exde] = line.split('|').map((x) => x.trim());
    if (!t || !ext || !exde) { errors.push(`Beispiel unvollständig: „${t}“`); continue; }
    const i = byNorm.get(normalize(t));
    if (i === undefined) { errors.push(`Beispiel: Wort „${t}“ nicht gefunden`); continue; }
    if (words[i].ex) { errors.push(`Beispiel: „${t}“ hat schon einen Beispielsatz`); continue; }
    words[i] = { ...words[i], ex: { t: ext, de: exde } };
  }
}

export function enrich(base: LanguagePack, vocabSrc?: string, exampleSrc?: string): EnrichedPack {
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
  const errors = [...parsed.errors];
  if (exampleSrc) applyExamples(words, exampleSrc, errors);
  const resolve = (id: string, by: Map<string, string>, m: Module) => {
    if (!id.startsWith(REF)) return idMap.get(id) ?? id;
    const t = id.slice(REF.length);
    const hit = by.get(normalize(t));
    if (!hit) errors.push(`Verweis „${t}“ in Modul ${m.id} nicht gefunden`);
    return hit;
  };
  const uniq = (ids: string[], by: Map<string, string>, m: Module) =>
    Array.from(new Set(ids.map((id) => resolve(id, by, m)).filter((x): x is string => !!x)));
  const modules: Module[] = parsed.modules.map((m) => ({ ...m, words: uniq(m.words, wordByNorm, m), slang: uniq(m.slang, slangByNorm, m) }));
  addExampleTranslit(base.code, words, slang);
  return { ...base, words, slang, modules, duplicates, parseErrors: errors };
}


export type SrScript = 'beide' | 'latein' | 'kyrillisch';

/** Serbisch in der gewünschten Schrift. „beide“: Latein + Kyrillisch als zweite Zeile. */
export function withScript(pack: EnrichedPack, mode: SrScript): EnrichedPack {
  if (pack.scripts !== 'sr' || mode === 'latein') return pack;
  const cyr = mode === 'kyrillisch';
  const main = (s: string) => (cyr ? srLatToCyr(s) : s);
  const second = (s: string) => (cyr ? srCyrToLat(s) : srLatToCyr(s));
  // Kyrillisch: Satz in Kyrillisch, Umschrift = lateinischer Originalsatz. „Beide“: Satz lateinisch, darunter die kyrillische Schreibweise.
  const ex = (e?: Example) => (e ? { ...e, t: main(e.t), tr: second(e.t) } : e);
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
