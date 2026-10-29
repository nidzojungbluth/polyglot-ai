import { describe, it, expect } from 'vitest';
import { ABC, abcFor } from '../src/data/alphabet';
import { allLetters, masteredUnits, placementTest, stressedSyllable, unitExercises, wrongCyr, wrongSplits } from '../src/lib/abc';
import { srLatToCyr } from '../src/lib/translit';

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

describe('Alphabete vollständig und korrekt', () => {
  it('Griechisch: alle 24 Buchstaben in richtiger Reihenfolge', () => {
    expect(allLetters(abcFor('el')!).map((l) => l.up).join('')).toBe('ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ');
  });
  it('Russisch: alle 33 Buchstaben vorhanden', () => {
    expect(allLetters(abcFor('ru')!).map((l) => l.up).sort().join('')).toBe([...'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'].sort().join(''));
  });
  it('Serbisch: alle 30 Buchstaben, Latein ↔ Kyrillisch stimmt', () => {
    const ls = allLetters(abcFor('sr')!);
    expect(ls.map((l) => l.up).sort().join('')).toBe([...'АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ'].sort().join(''));
    for (const l of ls) {
      const [, low] = l.lat!.split(' ');
      expect(srLatToCyr(low), l.lat).toBe(l.low);
      expect(srLatToCyr(l.ex.tr), l.ex.tr).toBe(l.ex.t);
    }
  });
  it('Groß- und Kleinbuchstaben passen zusammen (echte Unicode-Zeichen)', () => {
    for (const c of ABC) for (const l of allLetters(c)) {
      expect(l.up.toLowerCase(), l.up).toBe(l.low.split(' ')[0]);
      if (c.code === 'el') expect(l.up).toMatch(/^[Α-Ω]$/);
      else expect(l.up).toMatch(/^[Ѐ-ӿ]$/);
    }
  });
  it('jedes Beispielwort enthält seinen Buchstaben, jede Angabe ist ausgefüllt', () => {
    for (const c of ABC) for (const l of allLetters(c)) {
      const lows = l.low.split(' ');
      expect(lows.some((x) => plain(l.ex.t).includes(plain(x))), `${l.up} in ${l.ex.t}`).toBe(true);
      for (const f of [l.name, l.sound, l.hint, l.ex.tr, l.ex.de]) expect(f.length).toBeGreaterThan(0);
    }
  });
  it('Kombinationen kommen in ihren Beispielwörtern vor', () => {
    for (const u of abcFor('el')!.units) for (const k of u.combos ?? []) expect(plain(k.ex.t), k.t).toContain(k.t);
  });
  it('Silben ergeben das Wort, Betonung ist markiert, falsche Trennungen sind falsch', () => {
    for (const c of ABC) for (const u of c.units.filter((x) => x.kind === 'syllables')) for (const w of u.words!) {
      expect(w.syl!.replace(/-/g, '')).toBe(w.t);
      expect(stressedSyllable(w.syl!), w.t).toBeTruthy();
      const wrong = wrongSplits(w.syl!);
      expect(wrong.length).toBeGreaterThan(0);
      for (const x of wrong) { expect(x).not.toBe(w.syl); expect(x.replace(/-/g, '')).toBe(w.t); }
    }
  });
  it('Serbisch umschreiben: Lösung korrekt, Fehlvarianten falsch', () => {
    const u = abcFor('sr')!.units.find((x) => x.kind === 'convert')!;
    for (const w of u.words!) {
      expect(srLatToCyr(w.tr)).toBe(w.t);
      expect(wrongCyr(w.t, w.tr)).not.toContain(w.t);
    }
    expect(wrongCyr('љубав', 'ljubav')).toContain('лјубав');
  });
});

describe('Übungen des Schriftkurses', () => {
  for (const c of ABC) {
    it(`${c.title}: jede Einheit erzeugt lösbare Übungen`, () => {
      for (const u of c.units) {
        const ex = unitExercises(c, u, () => 0.41);
        expect(ex.length, u.id).toBeGreaterThanOrEqual(6);
        const kinds = new Set(ex.map((e) => e.kind));
        if (u.kind === 'letters') { expect(kinds.has('listen')).toBe(true); expect(kinds.has('build')).toBe(true); }
        for (const e of ex) {
          if ('options' in e) { expect(e.options, u.id).toContain(e.answer); expect(new Set(e.options).size).toBe(e.options.length); expect(e.options.length).toBeGreaterThan(1); }
          if (e.kind === 'build') {
            // Lösung lässt sich aus den Bausteinen legen
            let rest = e.answer;
            const used = [...e.tiles].sort((a, b) => b.length - a.length);
            let guard = 0;
            while (rest && guard++ < 50) { const t = used.find((x) => rest.startsWith(x)); expect(t, `${e.answer} aus ${e.tiles}`).toBeTruthy(); used.splice(used.indexOf(t!), 1); rest = rest.slice(t!.length); }
          }
          if (e.kind === 'order') expect(e.tiles.slice().sort()).toEqual(e.answer.split(' ').sort());
        }
      }
    });
    it(`${c.title}: Einstufungstest deckt alle Einheiten ab`, () => {
      const t = placementTest(c, () => 0.3);
      expect(new Set(t.map((e) => e.unit))).toEqual(new Set(c.units.map((u) => u.id)));
    });
  }
  it('nur fehlerfrei bestandene Einheiten gelten als beherrscht', () => {
    expect(masteredUnits([{ unit: 'a', ok: true }, { unit: 'a', ok: true }, { unit: 'b', ok: true }, { unit: 'b', ok: false }])).toEqual(['a']);
  });
});
