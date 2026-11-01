// Spaced Repetition („verteilte Wiederholung“) nach dem bewährten SM-2-Prinzip:
// Was man gut kann, kommt seltener; was man vergisst, kommt bald wieder.

export interface Card {
  id: string;        // Word- oder Slang-ID
  ease: number;      // Leichtigkeit (ab 1.3)
  interval: number;  // Abstand in Tagen
  reps: number;      // erfolgreiche Wiederholungen in Folge
  lapses: number;    // wie oft vergessen
  due: number;       // Zeitstempel (ms), ab wann fällig
}

export type Grade = 0 | 1 | 2 | 3; // 0 = nochmal, 1 = schwer, 2 = gut, 3 = leicht

const DAY = 24 * 60 * 60 * 1000;

export function newCard(id: string, now = Date.now()): Card {
  return { id, ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now };
}

export function review(card: Card, grade: Grade, now = Date.now()): Card {
  let { ease, interval, reps, lapses } = card;
  if (grade === 0) {
    reps = 0;
    lapses += 1;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    return { ...card, ease, interval, reps, lapses, due: now + 10 * 60 * 1000 }; // in 10 Minuten nochmal
  }
  reps += 1;
  if (reps === 1) interval = grade === 3 ? 3 : 1;
  else if (reps === 2) interval = grade === 1 ? 3 : 6;
  else interval = Math.round(interval * (grade === 1 ? 1.2 : grade === 3 ? ease * 1.3 : ease));
  ease = Math.max(1.3, ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
  return { ...card, ease, interval, reps, lapses, due: now + interval * DAY };
}

export const isDue = (c: Card, now = Date.now()) => c.due <= now;

export function dueCards(cards: Record<string, Card>, prefix: string, now = Date.now()): Card[] {
  return Object.values(cards)
    .filter((c) => c.id.startsWith(prefix) && isDue(c, now))
    .sort((a, b) => a.due - b.due);
}

export const isLearned = (c: Card) => c.interval >= 21;

/** Neue Karte = noch nie wiederholt (z. B. frisch aus einer Lektion oder per „zum Stapel“). */
export const isNew = (c: Card) => c.reps === 0 && c.lapses === 0 && c.interval === 0;

/**
 * Was heute dran ist: alle fälligen Wiederholungen plus neue Karten bis zum Tageslimit.
 * Karten zu Einträgen, die es nicht mehr gibt (z. B. nach einer Korrektur), werden ignoriert, aber nicht gelöscht.
 */
export function todayQueue(cards: Record<string, Card>, known: (id: string) => boolean, opts: { newLimit: number; newDoneToday: number; now?: number }): Card[] {
  const now = opts.now ?? Date.now();
  const due = Object.values(cards).filter((c) => known(c.id) && isDue(c, now)).sort((a, b) => a.due - b.due);
  const fresh = due.filter(isNew).slice(0, Math.max(0, opts.newLimit - opts.newDoneToday));
  return [...due.filter((c) => !isNew(c)), ...fresh];
}

/** Wiederholungen, die bis morgen Abend zusätzlich fällig werden (ohne neue Karten). */
export function dueTomorrowCount(cards: Record<string, Card>, known: (id: string) => boolean, now = Date.now()): number {
  const end = new Date(now); end.setDate(end.getDate() + 1); end.setHours(23, 59, 59, 999);
  return Object.values(cards).filter((c) => known(c.id) && !isNew(c) && c.due > now && c.due <= end.getTime()).length;
}

/** Prüffunktion „gibt es diesen Eintrag in der Sprache?“ – für todayQueue/dueTomorrowCount. */
export function knownIn(pack: { words: { id: string }[]; slang: { id: string }[] }): (id: string) => boolean {
  const ids = new Set<string>([...pack.words.map((w) => w.id), ...pack.slang.map((s) => s.id)]);
  return (id) => ids.has(id);
}
