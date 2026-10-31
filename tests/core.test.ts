import { describe, it, expect } from 'vitest';
import 'fake-indexeddb/auto';
import { PACKS } from '../src/data';
import { REGISTER_INFO } from '../src/data/types';
import { newCard, review, dueCards, isLearned } from '../src/lib/srs';
import { matches, normalize } from '../src/lib/text';
import { defaultState, exportBackup, importBackup, migrate, loadState, saveState, streak, today } from '../src/lib/store';
import { checkRules, ruleReply, findSlang, buildAiMessages, buildAiInstructions } from '../src/lib/coach';
import { buildLessonExercises } from '../src/lib/exercises';

describe('Spaced Repetition', () => {
  const t0 = Date.UTC(2026, 0, 1);
  it('neue Karte ist sofort fällig', () => expect(newCard('x', t0).due).toBe(t0));
  it('„Gut“ verlängert den Abstand schrittweise', () => {
    let c = newCard('x', t0);
    c = review(c, 2, t0); expect(c.interval).toBe(1);
    c = review(c, 2, t0); expect(c.interval).toBe(6);
    c = review(c, 2, t0); expect(c.interval).toBe(15);
    c = review(c, 2, t0); expect(c.interval).toBeGreaterThanOrEqual(21);
    expect(isLearned(c)).toBe(true);
  });
  it('„Nochmal“ setzt zurück und senkt die Leichtigkeit', () => {
    let c = review(review(newCard('x', t0), 2, t0), 2, t0);
    c = review(c, 0, t0);
    expect(c.reps).toBe(0); expect(c.lapses).toBe(1); expect(c.ease).toBeCloseTo(2.3);
    expect(c.due - t0).toBe(10 * 60 * 1000);
  });
  it('Leichtigkeit fällt nie unter 1.3', () => {
    let c = newCard('x', t0);
    for (let i = 0; i < 20; i++) c = review(c, 0, t0);
    expect(c.ease).toBe(1.3);
  });
  it('fällige Karten werden nach Sprache gefiltert', () => {
    const cards = { 'en-a': newCard('en-a', t0), 'es-b': newCard('es-b', t0) };
    expect(dueCards(cards, 'en-', t0 + 1).map((c) => c.id)).toEqual(['en-a']);
  });
});

describe('Antworten vergleichen', () => {
  it('ignoriert Groß/klein, Akzente und Satzzeichen', () => {
    expect(matches('Gracias!', 'gracias')).toBe(true);
    expect(matches('ευχαριστω', 'ευχαριστώ')).toBe(true);
    expect(matches('umorna', 'umoran / umorna')).toBe(true);
    expect(matches('could I have', 'could I have …?')).toBe(true);
    expect(matches('falsch', 'gracias')).toBe(false);
    expect(matches('', 'x')).toBe(false);
  });
  it('normalisiert griechisches Schluss-Sigma', () => expect(normalize('φίλος')).toBe(normalize('φίλοσ')));
});

describe('Speicher, Sicherung, Migration', () => {
  it('Export → Import ergibt denselben Stand', () => {
    const s = defaultState();
    s.cards['en-hello'] = newCard('en-hello', 5);
    s.lessons['en-l1'] = { best: 80, doneAt: 1 };
    s.settings.lang = 'el';
    const back = importBackup(exportBackup(s));
    expect(back.cards['en-hello'].due).toBe(5);
    expect(back.lessons['en-l1'].best).toBe(80);
    expect(back.settings.lang).toBe('el');
  });
  it('lehnt fremde und kaputte Daten verständlich ab', () => {
    expect(() => importBackup('kein json')).toThrow(/gültiger/);
    expect(() => importBackup('{"foo":1}')).toThrow(/nicht von Polyglot/);
    expect(() => migrate({ schema: 99 })).toThrow(/neueren/);
  });
  it('repariert fehlerhafte Felder', () => {
    const m = migrate({ schema: 1, cards: { a: { due: 'x' }, b: { due: 1, ease: 2.5, interval: 1 } }, lessons: [] });
    expect(Object.keys(m.cards)).toEqual(['b']);
    expect(m.lessons).toEqual({});
  });
  it('speichert und lädt über IndexedDB', async () => {
    const { state, kind } = await loadState();
    expect(kind).toBe('indexeddb');
    state.settings.dailyGoal = 42;
    await saveState(state, kind);
    const again = await loadState();
    expect(again.state.settings.dailyGoal).toBe(42);
  });
  it('zählt die Lernserie', () => {
    const d = new Date(2026, 9, 29);
    const y = new Date(2026, 9, 28); const yy = new Date(2026, 9, 27);
    expect(streak({ [today(d)]: 3, [today(y)]: 1, [today(yy)]: 5 }, d)).toBe(3);
    expect(streak({ [today(y)]: 1 }, d)).toBe(1);
    expect(streak({}, d)).toBe(0);
  });
});

describe('Sprachpakete – Datenqualität', () => {
  for (const p of PACKS) {
    describe(p.name, () => {
      const ids = [...p.words.map((w) => w.id), ...p.slang.map((s) => s.id)];
      it('IDs sind eindeutig und tragen das Sprachkürzel', () => {
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) expect(id.startsWith(`${p.code}-`)).toBe(true);
      });
      it('hat genug Inhalt für einen echten Kurs', () => {
        expect(p.words.length).toBeGreaterThanOrEqual(25);
        expect(p.slang.length).toBeGreaterThanOrEqual(8);
        expect(p.lessons.length).toBeGreaterThanOrEqual(3);
        expect(p.roleplays.length).toBeGreaterThanOrEqual(3);
      });
      it('alle Register sind gültig, Slang vollständig erklärt', () => {
        for (const w of [...p.words, ...p.slang]) expect(REGISTER_INFO[w.reg]).toBeDefined();
        for (const s of p.slang) { for (const f of [s.de, s.region, s.situation, s.effect, s.ex.t, s.ex.de]) expect(f.length).toBeGreaterThan(1); expect(s.formal.length).toBeGreaterThan(0); }
        expect(p.slang.some((s) => s.reg === 'vulgär')).toBe(true);
      });
      it('Lektionen verweisen nur auf vorhandene Wörter, Lücken sind korrekt', () => {
        for (const l of p.lessons) {
          for (const id of l.words) expect(p.words.find((w) => w.id === id), `${l.id}: ${id}`).toBeDefined();
          for (const c of l.cloze) { expect(c.t).toContain('___'); expect(c.answer.trim()).not.toBe(''); }
          for (const o of l.order) expect(o.answer.split(' ').length).toBeGreaterThan(2);
        }
      });
      it('Übungen werden für jede Lektion erzeugt und sind lösbar', () => {
        for (const l of p.lessons) {
          const ex = buildLessonExercises(p, l, () => 0.42);
          expect(ex.length).toBeGreaterThanOrEqual(12);
          for (const e of ex) {
            if (e.kind === 'mc' || e.kind === 'listen') { expect(e.options).toContain(e.answer); expect(new Set(e.options).size).toBe(e.options.length); }
            if (e.kind === 'translate') expect(matches(e.answer, e.answer)).toBe(true);
            if (e.kind === 'order') expect(e.tiles.slice().sort()).toEqual(e.answer.split(' ').sort());
          }
        }
      });
      it('Rollenspiele: alle Wege führen zu existierenden Szenen und enden', () => {
        for (const r of p.roleplays) {
          expect(r.nodes[r.start]).toBeDefined();
          let hasEnd = false;
          for (const n of Object.values(r.nodes)) {
            expect(n.options.length).toBeGreaterThan(0);
            for (const o of n.options) { if (o.next === null) hasEnd = true; else expect(r.nodes[o.next], `${r.id} → ${o.next}`).toBeDefined(); }
          }
          expect(hasEnd).toBe(true);
        }
      });
      it('Coach-Regeln sind gültige Muster', () => {
        for (const r of p.coachRules) expect(() => new RegExp(r.pattern, 'iu')).not.toThrow();
      });
    });
  }
});

describe('Sprachcoach', () => {
  const en = PACKS.find((p) => p.code === 'en')!;
  const es = PACKS.find((p) => p.code === 'es')!;
  const sr = PACKS.find((p) => p.code === 'sr')!;
  it('erkennt typische Fehler', () => {
    expect(checkRules(en, 'I want a coffee').length).toBe(1);
    expect(checkRules(en, 'I live here since 3 years').length).toBe(1);
    expect(checkRules(es, 'Estoy de Alemania').length).toBe(1);
    expect(checkRules(es, 'Estoy embarazado').length).toBe(1);
    expect(checkRules(sr, 'Ja sam iz Nemačka').length).toBe(1);
    expect(checkRules(en, 'Could I have a coffee, please?').length).toBe(0);
  });
  it('erklärt Slang im Kontext', () => {
    expect(findSlang(en, "I'm knackered").map((s) => s.t)).toContain('knackered');
    const r = ruleReply(es, 'qué guay', 'alltag', 1);
    expect(r.text).toMatch(/Slang erkannt/);
    expect(r.text).toMatch(/Wirkung/);
  });
  it('Befehle funktionieren', () => {
    expect(ruleReply(en, 'hilfe', 'lernen', 1).text).toMatch(/offline/);
    expect(ruleReply(es, 'was heißt danke', 'lernen', 1).text).toMatch(/gracias/);
    expect(ruleReply(en, 'slang', 'lernen', 0).text).toMatch(/Beispiel/);
  });
  it('blendet derben Slang bei niedriger Einstellung aus', () => {
    for (let i = 0; i < 30; i++) expect(ruleReply(en, 'slang', 'alltag', 1).text).not.toMatch(/Vulgär/);
  });
  it('gibt sich nie als KI aus', () => {
    expect(ruleReply(en, 'xyz qqq', 'alltag', 1).text).toMatch(/nur bekannte Muster|Offline/);
  });
  it('KI-Nachrichten beginnen mit Anweisungen und enden mit der Nutzernachricht', () => {
    const ins = buildAiInstructions({ pack: en, mode: 'immersion', slang: 2, interests: 'Fitness', mistakes: ['x'] });
    expect(ins).toMatch(/IMMERSION/); expect(ins).toMatch(/Fitness/); expect(ins).toMatch(/unsicher/);
    const msgs = buildAiMessages(ins, [{ role: 'assistant', content: 'hi' }, { role: 'user', content: 'a' }, { role: 'assistant', content: 'b' }], 'neu');
    expect(msgs[0].role).toBe('user'); expect(msgs[0].content).toMatch(/Anweisungen/);
    expect(msgs[msgs.length - 1]).toEqual({ role: 'user', content: 'neu' });
  });
});

describe('Verweise mit „@“ in Wortlisten', () => {
  it('übernimmt vorhandene Wörter ins Modul, ohne sie doppelt zu zählen', async () => {
    const { enrich } = await import('../src/data');
    const base = PACKS.find((p) => p.code === 'en')!;
    const src = '## topic=home level=A1 title=Test\nnew word | neues Wort | n | n\n@ new word | x\n## topic=food level=A1 title=Test2\n@ new word\n@ gibt es nicht';
    const p = enrich({ ...base, words: [], slang: [] }, src);
    expect(p.words.filter((w) => w.t === 'new word').length).toBe(1);
    expect(p.modules![0].words.length).toBe(1);
    expect(p.modules![1].words).toEqual(p.modules![0].words);
    expect(p.parseErrors.some((e) => e.includes('gibt es nicht'))).toBe(true);
    expect(p.duplicates).toEqual([]);
  });
});

describe('Zusätzliche Beispielsätze', () => {
  it('ordnet Sätze zu und meldet unbekannte oder doppelte Einträge', async () => {
    const { enrich } = await import('../src/data');
    const base = PACKS.find((p) => p.code === 'en')!;
    const src = '## topic=home level=A1 title=T\nhouse | Haus | n | n\nroom | Zimmer | n | n | The room is big. | Das Zimmer ist groß. |';
    const ex = 'house | The house is old. | Das Haus ist alt.\nnope | x | y\nroom | Another one. | Noch einer.';
    const p = enrich({ ...base, words: [], slang: [] }, src, ex);
    expect(p.words.find((w) => w.t === 'house')?.ex?.t).toBe('The house is old.');
    expect(p.words.find((w) => w.t === 'room')?.ex?.t).toBe('The room is big.');
    expect(p.parseErrors.some((e) => e.includes('nope'))).toBe(true);
    expect(p.parseErrors.some((e) => e.includes('schon'))).toBe(true);
  });
});

describe('Lückentext aus Beispielsatz', () => {
  it('erkennt griechische Nomen mit Artikel, Akzentvarianten, russische Betonung und nur ganze Wörter', async () => {
    const { clozeFromExample } = await import('../src/lib/exercises');
    const w = (t: string, ex: string) => ({ id: 'x', t, de: '', reg: 'neutral', cat: 'food', ex: { t: ex, de: 'd' } }) as any;
    expect(clozeFromExample(w('ο καφές', 'Ο καφές εδώ είναι καλός.'))?.t).toBe('Ο ___ εδώ είναι καλός.');
    expect(clozeFromExample(w('η οικογένεια', 'Η οικογένειά μου μένει εδώ.'))?.answer).toBe('οικογένειά');
    expect(clozeFromExample(w('сообще́ние', 'Твоё сообще́ние пришло́.'))?.answer).toBe('сообще́ние');
    expect(clozeFromExample(w('sir', 'Volim sirup.'))).toBeNull();
    expect(clozeFromExample(w('το σούπερ μάρκετ', 'Πάω στο σούπερ μάρκετ.'))?.answer).toBe('σούπερ μάρκετ');
  });
});
