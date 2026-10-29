import type { Lesson, LanguagePack, Word } from '../data/types';
import { shuffle } from './text';

export type Exercise =
  | { kind: 'mc'; prompt: string; sub?: string; options: string[]; answer: string; wordId: string; speak?: string }
  | { kind: 'listen'; speak: string; options: string[]; answer: string; wordId: string }
  | { kind: 'cloze'; prompt: string; de: string; answer: string }
  | { kind: 'order'; de: string; tiles: string[]; answer: string }
  | { kind: 'translate'; de: string; answer: string; wordId: string; hint?: string };

const pick = <T,>(arr: T[], n: number, rnd: () => number) => shuffle(arr, rnd).slice(0, n);

function distractors(pool: Word[], w: Word, field: 't' | 'de', rnd: () => number): string[] {
  const others = pool.filter((o) => o.id !== w.id && o[field] !== w[field]);
  return pick(others, 3, rnd).map((o) => o[field]);
}

/** Erzeugt eine abwechslungsreiche Übungsreihe für eine Lektion. */
export function buildLessonExercises(pack: LanguagePack, lesson: Lesson, rnd = Math.random): Exercise[] {
  const words = lesson.words.map((id) => pack.words.find((w) => w.id === id)).filter(Boolean) as Word[];
  const pool = pack.words;
  const out: Exercise[] = [];

  for (const w of pick(words, Math.min(5, words.length), rnd)) {
    out.push({ kind: 'mc', prompt: w.t, sub: w.tr, speak: w.t, options: shuffle([w.de, ...distractors(pool, w, 'de', rnd)], rnd), answer: w.de, wordId: w.id });
  }
  for (const w of pick(words, Math.min(3, words.length), rnd)) {
    out.push({ kind: 'mc', prompt: w.de, options: shuffle([w.t, ...distractors(pool, w, 't', rnd)], rnd), answer: w.t, wordId: w.id });
  }
  for (const w of pick(words, Math.min(2, words.length), rnd)) {
    out.push({ kind: 'listen', speak: w.t, options: shuffle([w.t, ...distractors(pool, w, 't', rnd)], rnd), answer: w.t, wordId: w.id });
  }
  for (const c of lesson.cloze) out.push({ kind: 'cloze', prompt: c.t, de: c.de, answer: c.answer });
  for (const o of lesson.order) out.push({ kind: 'order', de: o.de, answer: o.answer, tiles: shuffle(o.answer.split(' '), rnd) });
  for (const w of pick(words.filter((x) => x.t.length < 30), 2, rnd)) {
    out.push({ kind: 'translate', de: w.de, answer: w.t, wordId: w.id, hint: w.t.slice(0, 2) + '…' });
  }
  return out;
}
