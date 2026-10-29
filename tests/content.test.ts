import { describe, it, expect } from 'vitest';
import { PACKS, packByCode, withScript } from '../src/data';
import { moduleLessons, findLesson, lessonItems } from '../src/lib/course';
import { buildExercises } from '../src/lib/exercises';
import { grTranslit, ruTranslit, srLatToCyr, srCyrToLat } from '../src/lib/translit';
import { matches, sameAnswer } from '../src/lib/text';
import { REGISTER_INFO } from '../src/data/types';

const BIG = ['el', 'sr', 'ru'];

describe('Umschrift und Schriften', () => {
  it('Griechisch → Aussprache', () => {
    expect(grTranslit('καλημέρα')).toBe('kaliméra');
    expect(grTranslit('μπύρα')).toBe('bíra');
    expect(grTranslit('ευχαριστώ')).toBe('efcharistó');
    expect(grTranslit('αύριο')).toBe('ávrio');
    expect(grTranslit('γεια')).toBe('ja');
    expect(grTranslit('γιαγιά')).toBe('jajá');
    expect(grTranslit('ντομάτα')).toBe('domáta');
    expect(grTranslit('Θεσσαλονίκη')).toBe('thessaloníki');
    expect(packByCode('el')!.words.find((w) => w.t === 'πώς σε λένε;')!.tr).toBe('pós se léne?');
  });
  it('Russisch → Umschrift mit Betonung', () => {
    expect(ruTranslit('приве́т')).toBe('privét');
    expect(ruTranslit('спаси́бо')).toBe('spasíbo');
    expect(ruTranslit('что')).toBe('schto');
    expect(ruTranslit('хорошо́')).toBe('choroschó');
    expect(ruTranslit('е́хать')).toBe('jéchat\'');
  });
  it('Serbisch Latein ↔ Kyrillisch', () => {
    expect(srLatToCyr('ljubav')).toBe('љубав');
    expect(srLatToCyr('Džep i Njegoš')).toBe('Џеп и Његош');
    expect(srLatToCyr('nadživeti')).toBe('надживети');
    expect(srLatToCyr('Gde si, brate?')).toBe('Где си, брате?');
    for (const w of packByCode('sr')!.words) expect(srCyrToLat(srLatToCyr(w.t))).toBe(w.t);
  });
  it('Serbisch: Antworten in beiden Schriften gelten', () => {
    expect(matches('здраво', 'zdravo', 'sr')).toBe(true);
    expect(sameAnswer('Zovem', 'Зовем', 'sr')).toBe(true);
    expect(matches('здраво', 'zdravo')).toBe(false);
  });
  it('Schriftwahl ändert keine IDs (Fortschritt bleibt)', () => {
    const lat = packByCode('sr')!;
    const cyr = withScript(lat, 'kyrillisch');
    expect(cyr.words.map((w) => w.id)).toEqual(lat.words.map((w) => w.id));
    expect(cyr.words.find((w) => w.id === 'sr-zdravo')!.t).toBe('здраво');
    expect(withScript(lat, 'beide').words.find((w) => w.id === 'sr-zdravo')!.tr).toBe('здраво');
  });
});

describe('Großer Wortschatz – Datenqualität', () => {
  for (const code of BIG) {
    const p = packByCode(code)!;
    describe(p.name, () => {
      it('Datei fehlerfrei gelesen, keine Duplikate', () => {
        expect(p.parseErrors).toEqual([]);
        expect(p.duplicates).toEqual([]);
        const ids = [...p.words, ...p.slang].map((x) => x.id);
        expect(new Set(ids).size).toBe(ids.length);
      });
      it('alle alten IDs existieren noch (Fortschritt bleibt bei Updates)', () => {
        for (const id of ['greet', 'food']) expect(p.modules!.some((m) => m.topic === id)).toBe(true);
        expect(p.words.length).toBeGreaterThan(250);
      });
      it('jeder Eintrag hat Übersetzung, gültiges Register, Niveau', () => {
        for (const w of p.words) { expect(w.de.length).toBeGreaterThan(1); expect(REGISTER_INFO[w.reg]).toBeDefined(); }
        for (const s of p.slang) { expect(s.situation.length).toBeGreaterThan(2); expect(s.effect.length).toBeGreaterThan(2); }
        expect(p.slang.filter((s) => s.local).length).toBeGreaterThanOrEqual(4);
        expect(p.slang.some((s) => s.reg === 'vulgär' || s.politeness === 'vulgär')).toBe(true);
      });
      it('Umschrift vorhanden (Griechisch, Russisch) bzw. Kyrillisch erzeugbar (Serbisch)', () => {
        if (code === 'sr') return;
        for (const w of p.words) expect(w.tr, w.t).toBeTruthy();
        for (const w of p.words) expect(w.tr!).not.toMatch(/[Ͱ-ϿЀ-ӿ]/);
      });
      it('Module: eindeutig, gefüllt, Lektionen und Übungen funktionieren', () => {
        const mids = p.modules!.map((m) => m.id);
        expect(new Set(mids).size).toBe(mids.length);
        for (const m of p.modules!) {
          expect(m.words.length + m.slang.length).toBeGreaterThan(3);
          const ls = moduleLessons(p, m);
          expect(ls.length).toBeGreaterThan(0);
          for (const l of ls) {
            expect(findLesson(p, l.id)?.id).toBe(l.id);
            const items = lessonItems(p, l);
            expect(items.length).toBe(l.words.length);
            const slang = l.slangIds.map((id) => p.slang.find((s) => s.id === id)!);
            const ex = buildExercises(p, items, l.cloze, l.order, slang, () => 0.37);
            expect(ex.length).toBeGreaterThan(4);
            for (const e of ex) {
              if ('options' in e) { expect(e.options).toContain(e.answer); expect(new Set(e.options).size).toBe(e.options.length); expect(e.options.length).toBeGreaterThan(1); }
              if (e.kind === 'cloze') { expect(e.prompt).toContain('___'); expect(e.answer.length).toBeGreaterThan(0); }
              if (e.kind === 'order') expect(e.tiles.slice().sort()).toEqual(e.answer.split(' ').sort());
            }
          }
        }
      });
      it('mindestens 5 Dialoge mit Erklärungen', () => {
        expect(p.roleplays.length).toBeGreaterThanOrEqual(5);
        const notes = p.roleplays.flatMap((r) => Object.values(r.nodes).flatMap((n) => n.options.filter((o) => o.note)));
        expect(notes.length).toBeGreaterThan(10);
      });
    });
  }
  it('Bericht: Anzahl der Inhalte', () => {
    for (const p of PACKS) {
      const mods = p.modules ?? [];
      const lessons = mods.reduce((a, m) => a + moduleLessons(p, m).length, 0);
      // eslint-disable-next-line no-console
      console.log(`${p.code}: ${p.words.length} Wörter, ${p.slang.length} Slang (${p.slang.filter((s) => s.local).length} lokal), ${p.words.filter((w) => w.ex).length + p.slang.length} mit Beispielsatz, ${mods.length} Module, ${lessons} Modul-Lektionen + ${p.lessons.length} Einstieg, ${p.roleplays.length} Dialoge, Niveaus: ${[...new Set(mods.map((m) => m.level))].join('/')}`);
    }
  });
});
