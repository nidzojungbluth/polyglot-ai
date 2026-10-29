// Übungen für den Schriftkurs – erzeugt aus den Alphabet-Daten.
import type { AbcCourse, AbcLetter, AbcUnit } from '../data/alphabet/types';
import type { Exercise } from './exercises';
import { shuffle } from './text';

type Ex = Exercise;
type Rnd = () => number;

/** Zerlegt Text in sichtbare Zeichen (Buchstabe + Akzent/Betonungszeichen bleiben zusammen). */
export const graphemes = (s: string): string[] => Array.from(s.normalize('NFC').match(/\P{M}\p{M}*/gu) ?? []);

const uniq = (xs: string[]) => Array.from(new Set(xs));

/** Antwortoptionen: richtige + bis zu 3 eindeutige falsche (nichts doppelt, nichts gleich der Lösung). */
function opts(answer: string, candidates: string[], rnd: Rnd, n = 3): string[] {
  const wrong = uniq(shuffle(candidates, rnd).filter((c) => c && c !== answer)).slice(0, n);
  return shuffle([answer, ...wrong], rnd);
}

const firstLow = (l: AbcLetter) => l.low.split(' ')[0];
const isSr = (c: AbcCourse) => c.code === 'sr';

export function allLetters(course: AbcCourse): AbcLetter[] {
  return course.units.flatMap((u) => u.letters ?? []);
}

/** Falsche Silbentrennungen: eine Grenze um ein Zeichen verschieben. */
export function wrongSplits(syl: string): string[] {
  const parts = syl.split('-');
  const out = new Set<string>();
  for (let b = 0; b < parts.length - 1; b++) {
    const left = graphemes(parts[b]);
    const right = graphemes(parts[b + 1]);
    if (right.length > 1) { // ein Zeichen nach links holen
      const p = [...parts]; p[b] = left.join('') + right[0]; p[b + 1] = right.slice(1).join(''); out.add(p.join('-'));
    }
    if (left.length > 1) { // ein Zeichen nach rechts schieben
      const p = [...parts]; p[b] = left.slice(0, -1).join(''); p[b + 1] = left[left.length - 1] + right.join(''); out.add(p.join('-'));
    }
  }
  out.delete(syl);
  return Array.from(out);
}

const STRESS = /[́άέήίόύώΐΰ]/;
export const stressedSyllable = (syl: string) => syl.split('-').find((p) => STRESS.test(p.normalize('NFC')));

/** Typische Verwechslungen beim Umschreiben ins Kyrillische (für falsche Antworten). */
export function wrongCyr(word: string, latin: string): string[] {
  const out = new Set<string>();
  // Doppelbuchstaben einzeln umgeschrieben: lj → лј statt љ
  const naive = latin.replace(/lj/g, 'лј').replace(/nj/g, 'нј').replace(/dž/g, 'дж');
  if (naive !== latin) {
    const m: Record<string, string> = { a: 'а', b: 'б', c: 'ц', č: 'ч', ć: 'ћ', d: 'д', đ: 'ђ', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', j: 'ј', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', š: 'ш', t: 'т', u: 'у', v: 'в', z: 'з', ž: 'ж' };
    out.add(Array.from(naive).map((ch) => m[ch.toLowerCase()] ? (ch === ch.toLowerCase() ? m[ch] : m[ch.toLowerCase()].toUpperCase()) : ch).join(''));
  }
  const swaps: [string, string][] = [['ц', 'с'], ['ч', 'ћ'], ['ћ', 'ч'], ['џ', 'ђ'], ['ђ', 'џ'], ['в', 'б'], ['р', 'п'], ['н', 'и'], ['ш', 'щ'], ['ж', 'з']];
  for (const [a, b] of swaps) if (word.includes(a)) out.add(word.replace(a, b));
  out.delete(word);
  return Array.from(out);
}

function letterExercises(course: AbcCourse, unit: AbcUnit, rnd: Rnd): Ex[] {
  const pool = allLetters(course);
  const letters = unit.letters ?? [];
  const out: Ex[] = [];
  const sr = isSr(course);
  for (const l of letters) {
    const explain = [l.hint, l.trap].filter(Boolean).join(' ');
    if (sr) {
      out.push({ kind: 'mc', dir: 'zu-de', big: true, q: 'Welcher lateinische Buchstabe ist das?', prompt: `${l.up} ${l.low}`, options: opts(l.lat!, pool.map((x) => x.lat!), rnd), answer: l.lat!, wordId: unit.id, explain, unit: unit.id });
    } else {
      out.push({ kind: 'mc', dir: 'zu-de', big: true, q: 'Wie klingt dieser Buchstabe?', prompt: `${l.up} ${l.low}`, options: opts(l.sound, pool.filter((x) => x.sound !== l.sound).map((x) => x.sound), rnd), answer: l.sound, wordId: unit.id, explain, unit: unit.id });
    }
  }
  for (const l of shuffle(letters, rnd).slice(0, Math.ceil(letters.length / 2))) {
    out.push({ kind: 'mc', dir: 'zu-ziel', big: true, q: 'Welcher Kleinbuchstabe gehört dazu?', prompt: l.up, options: opts(firstLow(l), pool.map(firstLow), rnd), answer: firstLow(l), wordId: unit.id, unit: unit.id });
  }
  for (const l of shuffle(letters, rnd).slice(0, Math.ceil(letters.length / 2))) {
    if (sr) {
      out.push({ kind: 'mc', dir: 'zu-ziel', big: true, q: `Wie schreibt man „${l.lat}“ kyrillisch?`, prompt: l.lat!, options: opts(l.low, pool.map((x) => x.low), rnd), answer: l.low, wordId: unit.id, unit: unit.id });
    } else {
      out.push({ kind: 'mc', dir: 'zu-ziel', big: true, q: 'Welcher Buchstabe macht diesen Laut?', prompt: l.sound, options: opts(l.low, pool.filter((x) => x.sound !== l.sound).map((x) => x.low), rnd), answer: l.low, wordId: unit.id, explain: l.hint, unit: unit.id });
    }
  }
  const words = letters.map((l) => l.ex);
  for (const w of shuffle(words, rnd).slice(0, 2)) {
    out.push({ kind: 'listen', q: 'Hör zu: Welches Wort war das?', speak: w.t, options: opts(w.t, words.map((x) => x.t), rnd), answer: w.t, wordId: unit.id, explain: `${w.t} = ${w.tr} (${w.de})`, unit: unit.id });
  }
  for (const w of shuffle(words, rnd).slice(0, 3)) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Lies das Wort. Was bedeutet es?', prompt: w.t, options: opts(w.de, pool.map((x) => x.ex.de), rnd), answer: w.de, wordId: unit.id, explain: `Gelesen: ${w.tr}`, speak: w.t, unit: unit.id });
  }
  for (const w of shuffle(words.filter((x) => graphemes(x.t).length <= 7), rnd).slice(0, 2)) {
    const gs = graphemes(w.t);
    const extra = shuffle(letters.map(firstLow).filter((g) => !gs.includes(g)), rnd).slice(0, 2);
    out.push({ kind: 'build', q: 'Setz das Wort aus Buchstaben zusammen', prompt: w.de, sub: sr ? w.tr : `Aussprache: ${w.tr}`, speak: w.t, tiles: shuffle([...gs, ...extra], rnd), answer: w.t, joiner: '', unit: unit.id });
  }
  return out;
}

function comboExercises(unit: AbcUnit, rnd: Rnd): Ex[] {
  const cs = unit.combos ?? [];
  const out: Ex[] = [];
  for (const c of cs) {
    out.push({ kind: 'mc', dir: 'zu-de', big: true, q: 'Wie klingt diese Kombination?', prompt: c.t, options: opts(c.sound, cs.filter((x) => x.sound !== c.sound).map((x) => x.sound), rnd), answer: c.sound, wordId: unit.id, explain: c.hint, unit: unit.id });
  }
  for (const c of shuffle(cs, rnd).slice(0, 4)) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Wie liest man dieses Wort?', prompt: c.ex.t, options: opts(c.ex.tr, cs.map((x) => x.ex.tr), rnd), answer: c.ex.tr, wordId: unit.id, explain: `${c.t} = ${c.sound} · ${c.ex.de}`, speak: c.ex.t, unit: unit.id });
  }
  for (const c of shuffle(cs, rnd).slice(0, 2)) {
    out.push({ kind: 'listen', q: 'Hör zu: Welches Wort war das?', speak: c.ex.t, options: opts(c.ex.t, cs.map((x) => x.ex.t), rnd), answer: c.ex.t, wordId: unit.id, unit: unit.id });
  }
  for (const c of shuffle(cs, rnd).slice(0, 3)) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Lies das Wort. Was bedeutet es?', prompt: c.ex.t, options: opts(c.ex.de, cs.map((x) => x.ex.de), rnd), answer: c.ex.de, wordId: unit.id, unit: unit.id });
  }
  return out;
}

function syllableExercises(unit: AbcUnit, rnd: Rnd): Ex[] {
  const ws = (unit.words ?? []).filter((w) => w.syl);
  const out: Ex[] = [];
  for (const w of ws) {
    const wrong = wrongSplits(w.syl!);
    if (wrong.length) out.push({ kind: 'mc', dir: 'zu-ziel', q: 'Wie teilt man das Wort in Silben?', prompt: w.t, options: opts(w.syl!, wrong, rnd, 2), answer: w.syl!, wordId: unit.id, speak: w.t, explain: `${w.syl} – gesprochen: ${w.tr}`, unit: unit.id });
  }
  for (const w of shuffle(ws, rnd).slice(0, 4)) {
    const st = stressedSyllable(w.syl!);
    if (st) out.push({ kind: 'mc', dir: 'zu-ziel', q: `Welche Silbe ist betont? (${w.de})`, prompt: w.t, options: shuffle(uniq(w.syl!.split('-')), rnd), answer: st, wordId: unit.id, speak: w.t, explain: `Betont: ${st} → ${w.tr}`, unit: unit.id });
  }
  for (const w of shuffle(ws, rnd).slice(0, 3)) {
    out.push({ kind: 'build', q: 'Setz das Wort aus Silben zusammen', prompt: w.de, speak: w.t, tiles: shuffle(w.syl!.split('-'), rnd), answer: w.t, joiner: '', unit: unit.id });
  }
  for (const w of shuffle(ws, rnd).slice(0, 3)) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Lies das Wort. Was bedeutet es?', prompt: w.t, options: opts(w.de, ws.map((x) => x.de), rnd), answer: w.de, wordId: unit.id, explain: `Gelesen: ${w.tr}`, unit: unit.id });
  }
  return out;
}

function wordExercises(course: AbcCourse, unit: AbcUnit, rnd: Rnd): Ex[] {
  const ws = unit.words ?? [];
  const out: Ex[] = [];
  const sr = isSr(course);
  for (const w of ws) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Lies das Wort. Was bedeutet es?', prompt: w.t, options: opts(w.de, ws.map((x) => x.de), rnd), answer: w.de, wordId: unit.id, explain: `Gelesen: ${w.tr}`, speak: w.t, unit: unit.id });
  }
  for (const w of shuffle(ws, rnd).slice(0, 4)) {
    out.push({ kind: 'mc', dir: 'zu-de', q: sr ? 'Wie schreibt man das in Latinica?' : 'Wie spricht man das aus?', prompt: w.t, options: opts(w.tr, ws.map((x) => x.tr), rnd), answer: w.tr, wordId: unit.id, unit: unit.id });
  }
  for (const w of shuffle(ws, rnd).slice(0, 3)) {
    out.push({ kind: 'listen', q: 'Hör zu: Welches Wort war das?', speak: w.t, options: opts(w.t, ws.map((x) => x.t), rnd), answer: w.t, wordId: unit.id, unit: unit.id });
  }
  for (const w of shuffle(ws.filter((x) => graphemes(x.t).length <= 9 && !x.t.includes(' ')), rnd).slice(0, 3)) {
    const gs = graphemes(w.t.toLowerCase() === w.t ? w.t : w.t);
    out.push({ kind: 'build', q: 'Aus dem Gedächtnis: Schreib das Wort', prompt: w.de, speak: w.t, tiles: shuffle(gs, rnd), answer: w.t, joiner: '', unit: unit.id });
  }
  return out;
}

function sentenceExercises(unit: AbcUnit, rnd: Rnd): Ex[] {
  const ss = unit.words ?? [];
  const out: Ex[] = [];
  for (const s of ss) {
    out.push({ kind: 'mc', dir: 'zu-de', q: 'Lies den Satz. Was bedeutet er?', prompt: s.t, options: opts(s.de, ss.map((x) => x.de), rnd), answer: s.de, wordId: unit.id, explain: `Gelesen: ${s.tr}`, speak: s.t, unit: unit.id });
  }
  for (const s of shuffle(ss, rnd).slice(0, 3)) {
    const words = s.t.replace(/[.,!?;:]/g, '').split(/\s+/).filter(Boolean);
    out.push({ kind: 'order', de: s.de, tiles: shuffle(words, rnd), answer: words.join(' '), unit: unit.id });
  }
  for (const s of shuffle(ss, rnd).slice(0, 2)) {
    out.push({ kind: 'listen', q: 'Hör zu: Welcher Satz war das?', speak: s.t, options: opts(s.t, ss.map((x) => x.t), rnd), answer: s.t, wordId: unit.id, unit: unit.id });
  }
  return out;
}

function convertExercises(unit: AbcUnit, rnd: Rnd): Ex[] {
  const ws = unit.words ?? [];
  const out: Ex[] = [];
  for (const w of ws) {
    const wrong = wrongCyr(w.t, w.tr);
    if (wrong.length) out.push({ kind: 'mc', dir: 'zu-ziel', q: 'Welche kyrillische Schreibweise ist richtig?', prompt: w.tr, options: opts(w.t, wrong, rnd, 2), answer: w.t, wordId: unit.id, explain: `${w.tr} → ${w.t} (${w.de})`, unit: unit.id });
  }
  const cyrPool = ['а', 'б', 'в', 'г', 'д', 'ђ', 'е', 'ж', 'з', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ', 'о', 'п', 'р', 'с', 'т', 'ћ', 'у', 'ф', 'х', 'ц', 'ч', 'џ', 'ш'];
  for (const w of shuffle(ws, rnd).slice(0, 5)) {
    const gs = graphemes(w.t);
    const extra = shuffle(cyrPool.filter((g) => !gs.includes(g)), rnd).slice(0, 3);
    out.push({ kind: 'build', q: 'Schreib das Wort auf Kyrillisch', prompt: w.tr, sub: w.de, speak: w.t, tiles: shuffle([...gs, ...extra], rnd), answer: w.t, joiner: '', unit: unit.id });
  }
  return out;
}

export function unitExercises(course: AbcCourse, unit: AbcUnit, rnd: Rnd = Math.random): Ex[] {
  const ex = unit.kind === 'letters' ? letterExercises(course, unit, rnd)
    : unit.kind === 'combos' ? comboExercises(unit, rnd)
    : unit.kind === 'syllables' ? syllableExercises(unit, rnd)
    : unit.kind === 'words' ? wordExercises(course, unit, rnd)
    : unit.kind === 'sentences' ? sentenceExercises(unit, rnd)
    : convertExercises(unit, rnd);
  // Erst leichte Erkennungsaufgaben, dann gemischt
  const [first, rest] = [ex.slice(0, Math.min(4, ex.length)), ex.slice(Math.min(4, ex.length))];
  return [...first, ...shuffle(rest, rnd)];
}

/** Einstufungstest: je 3 Fragen pro Einheit (bevorzugt Erkennungsaufgaben). */
export function placementTest(course: AbcCourse, rnd: Rnd = Math.random): Ex[] {
  const out: Ex[] = [];
  for (const u of course.units) {
    const ex = unitExercises(course, u, rnd).filter((e) => e.kind === 'mc');
    out.push(...shuffle(ex, rnd).slice(0, 3));
  }
  return out;
}

/** Einheiten, die im Test vollständig richtig waren, gelten als beherrscht. */
export function masteredUnits(results: { unit?: string; ok: boolean }[]): string[] {
  const by = new Map<string, { ok: number; n: number }>();
  for (const r of results) {
    if (!r.unit) continue;
    const v = by.get(r.unit) ?? { ok: 0, n: 0 };
    v.n++; if (r.ok) v.ok++;
    by.set(r.unit, v);
  }
  return Array.from(by.entries()).filter(([, v]) => v.n >= 2 && v.ok === v.n).map(([k]) => k);
}
