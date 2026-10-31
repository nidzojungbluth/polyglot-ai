import type { Cloze, LanguagePack, Lesson, OrderTask, SlangEntry, Word } from '../data/types';
import { shuffle } from './text';

export type Exercise = (
  | { kind: 'mc'; prompt: string; sub?: string; options: string[]; answer: string; wordId: string; speak?: string; explain?: string; dir: 'zu-de' | 'zu-ziel'; q?: string; big?: boolean }
  | { kind: 'listen'; speak: string; options: string[]; answer: string; wordId: string; q?: string; explain?: string }
  | { kind: 'build'; q: string; prompt: string; sub?: string; speak?: string; tiles: string[]; answer: string; joiner: string; explain?: string }
  | { kind: 'cloze'; prompt: string; de: string; answer: string }
  | { kind: 'order'; de: string; tiles: string[]; answer: string }
  | { kind: 'translate'; de: string; answer: string; wordId: string; hint?: string }
  | { kind: 'register'; prompt: string; options: string[]; answer: string; explain: string; wordId: string }
) & { unit?: string };

const pick = <T,>(arr: T[], n: number, rnd: () => number) => shuffle(arr, rnd).slice(0, n);

/** Drei eindeutige falsche Antworten aus dem ganzen Paket. */
function distractors(pool: { id: string; t: string; de: string }[], item: { id: string; t: string; de: string }, field: 't' | 'de', rnd: () => number): string[] {
  const out: string[] = [];
  for (const o of shuffle(pool, rnd)) {
    const v = o[field];
    if (o.id === item.id || v === item[field] || out.includes(v)) continue;
    out.push(v);
    if (out.length === 3) break;
  }
  return out;
}

/** Wort als Übungseinheit – Slang wird dafür wie ein Wort behandelt. */
export function slangAsWord(s: SlangEntry): Word {
  return { id: s.id, t: s.t, tr: s.tr, de: s.de, reg: s.reg, cat: 'slang', ex: s.ex, level: s.level, note: `${s.situation} · ${s.effect}` };
}

export function buildExercises(pack: LanguagePack, words: Word[], cloze: Cloze[], order: OrderTask[], slang: SlangEntry[] = [], rnd = Math.random): Exercise[] {
  const pool = [...pack.words, ...pack.slang];
  const out: Exercise[] = [];
  const n = words.length;
  const small = (k: number) => Math.min(k, n);

  for (const w of pick(words, small(Math.max(4, Math.ceil(n * 0.6))), rnd)) {
    out.push({ kind: 'mc', dir: 'zu-de', prompt: w.t, sub: w.tr, speak: w.t, options: shuffle([w.de, ...distractors(pool, w, 'de', rnd)], rnd), answer: w.de, wordId: w.id, explain: w.note });
  }
  for (const w of pick(words, small(Math.max(3, Math.ceil(n * 0.4))), rnd)) {
    out.push({ kind: 'mc', dir: 'zu-ziel', prompt: w.de, options: shuffle([w.t, ...distractors(pool, w, 't', rnd)], rnd), answer: w.t, wordId: w.id, explain: w.note });
  }
  for (const w of pick(words, small(2), rnd)) {
    out.push({ kind: 'listen', speak: w.t, options: shuffle([w.t, ...distractors(pool, w, 't', rnd)], rnd), answer: w.t, wordId: w.id });
  }
  for (const s of slang) {
    const others = pack.slang.filter((o) => o.id !== s.id && o.t !== s.t);
    const opts = Array.from(new Set([s.t, ...pick(others, 3, rnd).map((o) => o.t)]));
    out.push({ kind: 'register', prompt: `Unter Freunden: Wie sagt man locker „${s.de}“?`, options: shuffle(opts, rnd), answer: s.t, wordId: s.id,
      explain: `„${s.t}“ – ${s.situation}. Wirkung: ${s.effect}. Neutral: ${s.formal}` });
    if (s.formal && s.formal !== '–') {
      const formals = Array.from(new Set(others.map((o) => o.formal).filter((f) => f && f !== '–' && f !== s.formal)));
      const fopts = Array.from(new Set([s.formal, ...pick(formals, 2, rnd), s.t]));
      out.push({ kind: 'register', prompt: `Im Job oder zu Fremden: Was sagst du statt „${s.t}“?`, options: shuffle(fopts, rnd), answer: s.formal, wordId: s.id,
        explain: `„${s.t}“ ist ${s.politeness}. Neutral/höflich: ${s.formal}` });
    }
  }
  for (const c of cloze) out.push({ kind: 'cloze', prompt: c.t, de: c.de, answer: c.answer });
  for (const o of order) out.push({ kind: 'order', de: o.de, answer: o.answer, tiles: shuffle(o.answer.split(' '), rnd) });
  for (const w of pick(words.filter((x) => x.t.length < 30 && !x.t.includes('…')), small(2), rnd)) {
    out.push({ kind: 'translate', de: w.de, answer: w.t, wordId: w.id, hint: Array.from(w.t.normalize('NFC')).slice(0, 2).join('') + '…' });
  }
  return out;
}

/** Übungsreihe für eine handgeschriebene Einstiegslektion. */
export function buildLessonExercises(pack: LanguagePack, lesson: Lesson, rnd = Math.random): Exercise[] {
  const words = lesson.words.map((id) => pack.words.find((w) => w.id === id)).filter(Boolean) as Word[];
  return buildExercises(pack, words, lesson.cloze, lesson.order, [], rnd);
}

const PUNCT = /[.,!?;:¿¡«»“”"…()–—]/g;

/** Lückentext aus dem Beispielsatz: das Wort selbst wird zur Lücke. */
const EL_ARTICLE = /^(ο|η|το|οι|τα)\s+/i;
const fold = (c: string) => c.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const isLetter = (c?: string) => !!c && /[\p{L}\p{M}]/u.test(c);

/**
 * Lückentext aus dem Beispielsatz. Sucht das Wort (ohne griechischen Artikel, max. 3 Wörter)
 * unabhängig von Akzenten und Großschreibung und nur als ganzes Wort.
 */
export function clozeFromExample(w: Word): Cloze | null {
  if (!w.ex || w.t.includes('/')) return null;
  const target = w.t.replace(/\(.*?\)/g, '').replace(/…|\?|;|!|¿|¡/g, '').trim().replace(EL_ARTICLE, '');
  if (!target || target.split(/\s+/).length > 3) return null;
  const src = w.ex.t;
  let folded = '';
  const map: number[] = [];
  for (let i = 0; i < src.length; i++) for (const ch of fold(src[i])) { folded += ch; map.push(i); }
  const ft = Array.from(target).map(fold).join('');
  if (!ft) return null;
  for (let k = folded.indexOf(ft); k >= 0; k = folded.indexOf(ft, k + 1)) {
    const start = map[k];
    let end = map[k + ft.length - 1] + 1;
    while (end < src.length && /\p{M}/u.test(src[end])) end++;
    if (!isLetter(src[start - 1]) && !isLetter(src[end])) {
      return { t: src.slice(0, start) + '___' + src.slice(end), answer: src.slice(start, end), de: w.ex.de };
    }
  }
  return null;
}

/** Satzbau aus dem Beispielsatz (3–8 Wörter). */
export function orderFromExample(w: Word): OrderTask | null {
  if (!w.ex) return null;
  const parts = w.ex.t.replace(PUNCT, ' ').split(/\s+/).filter(Boolean);
  if (parts.length < 3 || parts.length > 8) return null;
  return { answer: parts.join(' '), de: w.ex.de };
}
