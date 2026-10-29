// Aus einem Modul werden echte Lektionen (je bis zu 8 Einträge) plus eine Wiederholung.
import type { LanguagePack, Lesson, Module, SlangEntry, Word } from '../data/types';
import { clozeFromExample, orderFromExample, slangAsWord } from './exercises';
import { topicTitle } from '../data/curriculum';

export const LESSON_SIZE = 8;

export interface CourseLesson extends Lesson { moduleId: string; slangIds: string[]; review: boolean }

export function itemsOf(pack: LanguagePack, mod: Module): { words: Word[]; slang: SlangEntry[] } {
  const wmap = new Map(pack.words.map((w) => [w.id, w]));
  const smap = new Map(pack.slang.map((s) => [s.id, s]));
  return {
    words: mod.words.map((id) => wmap.get(id)).filter(Boolean) as Word[],
    slang: mod.slang.map((id) => smap.get(id)).filter(Boolean) as SlangEntry[],
  };
}

export function moduleLessons(pack: LanguagePack, mod: Module): CourseLesson[] {
  const { words, slang } = itemsOf(pack, mod);
  const units: { w: Word; s?: SlangEntry }[] = [...words.map((w) => ({ w })), ...slang.map((s) => ({ w: slangAsWord(s), s }))];
  const lessons: CourseLesson[] = [];
  const count = Math.ceil(units.length / LESSON_SIZE);
  const size = Math.ceil(units.length / Math.max(1, count)); // gleichmäßig verteilen, keine Mini-Lektionen
  for (let i = 0; i < count; i++) {
    const chunk = units.slice(i * size, (i + 1) * size);
    const ws = chunk.map((u) => u.w);
    lessons.push({
      id: `${mod.id}-L${i + 1}`, moduleId: mod.id, review: false,
      title: `${mod.title} · Lektion ${i + 1}`,
      goal: `${topicTitle(mod.topic)} (${mod.level}) – ${chunk.length} neue Einträge`,
      words: ws.map((w) => w.id),
      slangIds: chunk.filter((u) => u.s).map((u) => u.s!.id),
      grammar: mod.grammar ?? { title: '', text: '' },
      cloze: ws.map(clozeFromExample).filter(Boolean).slice(0, 3) as Lesson['cloze'],
      order: ws.map(orderFromExample).filter(Boolean).slice(0, 2) as Lesson['order'],
    });
  }
  if (count > 1) {
    lessons.push({
      id: `${mod.id}-R`, moduleId: mod.id, review: true,
      title: `${mod.title} · Wiederholung`, goal: 'Alles aus diesem Modul gemischt',
      words: units.map((u) => u.w.id), slangIds: units.filter((u) => u.s).map((u) => u.s!.id),
      grammar: mod.grammar ?? { title: '', text: '' },
      cloze: units.map((u) => clozeFromExample(u.w)).filter(Boolean).slice(0, 4) as Lesson['cloze'],
      order: units.map((u) => orderFromExample(u.w)).filter(Boolean).slice(0, 2) as Lesson['order'],
    });
  }
  return lessons;
}

/** Findet eine Lektion – Einstiegslektion oder Modul-Lektion. */
export function findLesson(pack: LanguagePack, id: string): CourseLesson | null {
  const base = pack.lessons.find((l) => l.id === id);
  if (base) return { ...base, moduleId: '', slangIds: [], review: false };
  for (const m of pack.modules ?? []) {
    if (!id.startsWith(m.id)) continue;
    const l = moduleLessons(pack, m).find((x) => x.id === id);
    if (l) return l;
  }
  return null;
}

/** Alle Einträge (Wörter + Slang) einer Lektion als Wörter. */
export function lessonItems(pack: LanguagePack, l: CourseLesson): Word[] {
  const wmap = new Map(pack.words.map((w) => [w.id, w]));
  const smap = new Map(pack.slang.map((s) => [s.id, s]));
  return l.words.map((id) => wmap.get(id) ?? (smap.get(id) ? slangAsWord(smap.get(id)!) : undefined)).filter(Boolean) as Word[];
}
