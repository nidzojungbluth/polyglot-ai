// Kompaktes Textformat für große Wortschätze + Parser.
//
// Abschnitt:   ## topic=food level=A1 title=Im Café
// Grammatik:   > Titel :: Erklärung
// Wort:        Zielsprache | Deutsch | Wortart | Register | Beispiel | Beispiel (de) | Hinweis
// Slang (in Abschnitten mit kind=slang):
//              Ausdruck | Bedeutung | Register | Ton | lokal(1/0) | Region | Wann/wo/wem | Wirkung | Neutral | Beispiel | Beispiel (de) | Status
//
// Register-Kürzel: f formell · n neutral · l locker · s Slang · j Jugend · r regional · c Chat · fl Flirt · v vulgär
import type { Level, Module, Politeness, Register, SlangEntry, Word } from './types';
import { autoTranslit } from '../lib/translit';
import { normalize } from '../lib/text';

const REG: Record<string, Register> = { f: 'formell', n: 'neutral', l: 'locker', s: 'slang', j: 'jugend', r: 'regional', c: 'chat', fl: 'flirt', v: 'vulgär' };
const TON: Politeness[] = ['höflich', 'neutral', 'freundlich', 'vertraut', 'locker', 'ironisch', 'unhöflich', 'vulgär', 'beleidigend', 'veraltet'];

/** Stabile ID aus dem Wort selbst – so bleibt der Lernfortschritt bei Updates erhalten. */
export function stableId(code: string, kind: 'v' | 's', t: string): string {
  const n = normalize(t);
  let h = 2166136261;
  for (const ch of n) { h ^= ch.codePointAt(0)!; h = Math.imul(h, 16777619); }
  return `${code}-${kind}-${(h >>> 0).toString(36)}`;
}

/** Präfix für Verweise auf vorhandene Einträge (wird in enrich() aufgelöst). */
export const REF = 'ref:';

export interface ParsedVocab { words: Word[]; slang: SlangEntry[]; modules: Module[]; errors: string[] }

export function parseVocab(code: string, src: string): ParsedVocab {
  const words: Word[] = [];
  const slang: SlangEntry[] = [];
  const modules: Module[] = [];
  const errors: string[] = [];
  let mod: Module | null = null;
  let kind: 'word' | 'slang' = 'word';

  src.split('\n').forEach((raw, lineNo) => {
    const line = raw.trim();
    if (!line || line.startsWith('//')) return;
    if (line.startsWith('##')) {
      const attrs = Object.fromEntries(Array.from(line.matchAll(/(\w+)=([^=]+?)(?=\s+\w+=|$)/g)).map((m) => [m[1], m[2].trim()]));
      const level = attrs.level as Level;
      kind = attrs.kind === 'slang' ? 'slang' : 'word';
      mod = { id: `${code}-m-${attrs.topic}-${level}${attrs.part ? '-' + attrs.part : ''}`, topic: attrs.topic, level, title: attrs.title ?? attrs.topic, words: [], slang: [] };
      modules.push(mod);
      return;
    }
    if (!mod) { errors.push(`Zeile ${lineNo + 1}: Eintrag vor dem ersten Abschnitt`); return; }
    if (line.startsWith('>')) {
      const [title, text] = line.slice(1).split('::').map((s) => s.trim());
      mod.grammar = { title, text: text ?? '' };
      return;
    }
    // "@ Wort | …" = bereits vorhandenen Eintrag in dieses Modul übernehmen (zählt nicht doppelt)
    if (line.startsWith('@')) {
      const t = line.slice(1).split('|')[0].trim();
      if (!t) { errors.push(`Zeile ${lineNo + 1}: leerer Verweis`); return; }
      (kind === 'word' ? mod.words : mod.slang).push(REF + t);
      return;
    }
    const f = line.split('|').map((s) => s.trim());
    if (kind === 'word') {
      const [t, de, pos, reg, ext, exde, note] = f;
      if (!t || !de) { errors.push(`Zeile ${lineNo + 1}: Wort oder Übersetzung fehlt`); return; }
      const r = REG[reg || 'n'];
      if (!r) { errors.push(`Zeile ${lineNo + 1}: unbekanntes Register „${reg}“`); return; }
      const w: Word = { id: stableId(code, 'v', t), t, de, reg: r, cat: mod.topic, level: mod.level, pos: pos || undefined, tr: autoTranslit(code, t), note: note || undefined };
      if (ext && exde) w.ex = { t: ext, de: exde };
      words.push(w);
      mod.words.push(w.id);
    } else {
      const [t, de, reg, ton, local, region, situation, effect, formal, ext, exde, status] = f;
      const r = REG[reg || 's'];
      const p = TON.find((x) => x === ton) ?? 'locker';
      if (!t || !de || !r || !ext || !exde || !formal) { errors.push(`Zeile ${lineNo + 1}: Slang-Eintrag unvollständig`); return; }
      const s: SlangEntry = {
        id: stableId(code, 's', t), t, tr: autoTranslit(code, t), de, reg: r, politeness: p, local: local === '1',
        region, situation, effect, formal, ex: { t: ext, de: exde }, status: status === 'älter' ? 'älter' : 'aktuell', level: mod.level,
      };
      slang.push(s);
      mod.slang.push(s.id);
    }
  });
  return { words, slang, modules, errors };
}
