import type { CatalogEntry, Example, LanguagePack, Module, SlangEntry, Word } from './types';
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
import elVocab7 from './vocab/el7';
import srVocab7 from './vocab/sr7';
import ruVocab7 from './vocab/ru7';
import elVocab8 from './vocab/el8';
import elVocab9 from './vocab/el9';
import elVocab10 from './vocab/el10';
import elVocab11 from './vocab/el11';
import elVocab12 from './vocab/el12';
import elVocab13 from './vocab/el13';
import elVocab14 from './vocab/el14';
import elVocab15 from './vocab/el15';
import elVocab16 from './vocab/el16';
import elVocab17 from './vocab/el17';
import elVocab18 from './vocab/el18';
import elVocab19 from './vocab/el19';
import elVocab20 from './vocab/el20';
import elVocab21 from './vocab/el21';
import elVocab22 from './vocab/el22';
import elVocab23 from './vocab/el23';
import elEx from './vocab/elEx';
import srVocab8 from './vocab/sr8';
import srVocab9 from './vocab/sr9';
import srVocab10 from './vocab/sr10';
import srVocab11 from './vocab/sr11';
import srVocab12 from './vocab/sr12';
import srVocab13 from './vocab/sr13';
import srVocab14 from './vocab/sr14';
import srVocab15 from './vocab/sr15';
import srVocab16 from './vocab/sr16';
import srVocab17 from './vocab/sr17';
import srVocab18 from './vocab/sr18';
import srVocab19 from './vocab/sr19';
import srVocab20 from './vocab/sr20';
import srVocab21 from './vocab/sr21';
import srVocab22 from './vocab/sr22';
import srVocab23 from './vocab/sr23';
import srEx from './vocab/srEx';
import ruVocab8 from './vocab/ru8';
import ruVocab9 from './vocab/ru9';
import ruVocab10 from './vocab/ru10';
import ruVocab11 from './vocab/ru11';
import ruVocab12 from './vocab/ru12';
import ruVocab13 from './vocab/ru13';
import ruVocab14 from './vocab/ru14';
import ruVocab15 from './vocab/ru15';
import ruVocab16 from './vocab/ru16';
import ruVocab17 from './vocab/ru17';
import ruVocab18 from './vocab/ru18';
import ruVocab19 from './vocab/ru19';
import ruVocab20 from './vocab/ru20';
import ruVocab21 from './vocab/ru21';
import ruVocab22 from './vocab/ru22';
import ruVocab23 from './vocab/ru23';
import ruEx from './vocab/ruEx';
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

/** Vollständige Sprachpakete. Neue Sprache: Datei anlegen und hier eintragen. */
export const PACKS: EnrichedPack[] = [enrich(en), enrich(es), enrich(el, elVocab + elVocab2 + elVocab3 + elVocab4 + elVocab5 + elVocab6 + elVocab7 + elVocab8 + elVocab9 + elVocab10 + elVocab11 + elVocab12 + elVocab13 + elVocab14 + elVocab15 + elVocab16 + elVocab17 + elVocab18 + elVocab19 + elVocab20 + elVocab21 + elVocab22 + elVocab23, elEx), enrich(sr, srVocab + srVocab2 + srVocab3 + srVocab4 + srVocab5 + srVocab6 + srVocab7 + srVocab8 + srVocab9 + srVocab10 + srVocab11 + srVocab12 + srVocab13 + srVocab14 + srVocab15 + srVocab16 + srVocab17 + srVocab18 + srVocab19 + srVocab20 + srVocab21 + srVocab22 + srVocab23, srEx), enrich(ru, ruVocab + ruVocab2 + ruVocab3 + ruVocab4 + ruVocab5 + ruVocab6 + ruVocab7 + ruVocab8 + ruVocab9 + ruVocab10 + ruVocab11 + ruVocab12 + ruVocab13 + ruVocab14 + ruVocab15 + ruVocab16 + ruVocab17 + ruVocab18 + ruVocab19 + ruVocab20 + ruVocab21 + ruVocab22 + ruVocab23, ruEx)];

export const packByCode = (code: string): EnrichedPack | undefined => PACKS.find((p) => p.code === code);

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
