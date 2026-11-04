import type { Ctx } from '../App';
import { knownIn, todayQueue } from '../lib/srs';
import { newDoneToday, newLimit } from '../lib/store';
import { streak, today } from '../lib/store';
import { AiNotice, Icon, Ring, type IconName } from './ui';
import { moduleLessons } from '../lib/course';
import { LEVELS } from '../data/types';
import { abcFor } from '../data/alphabet';
import { abcNext } from './Alphabet';

export function Home({ ctx }: { ctx: Ctx }) {
  const { state, pack, go } = ctx;
  const done = state.daily[today()] ?? 0;
  const goal = state.settings.dailyGoal;
  const due = todayQueue(state.cards, knownIn(pack), { newLimit: newLimit(state), newDoneToday: newDoneToday(state) }).length;
  const st = streak(state.daily);
  const baseNext = pack.lessons.find((l) => !state.lessons[l.id]);
  const courseNext = (() => {
    for (const lv of LEVELS) for (const m of (pack.modules ?? []).filter((x) => x.level === lv)) {
      const l = moduleLessons(pack, m).find((x) => !state.lessons[x.id]);
      if (l) return l;
    }
    return undefined;
  })();
  const nextLesson = baseNext ?? courseNext ?? pack.lessons[0];
  const abc = abcFor(pack.code);
  const abcUnit = abcNext(ctx);
  // Lernpfad: bei neuer Schrift zuerst der Alphabetkurs
  const startAbc = !!abc && abc.forBeginners && !!abcUnit;
  const hard = Object.values(state.cards).filter((c) => c.id.startsWith(`${pack.code}-`) && (c.lapses >= 2 || (c.reps > 0 && c.ease < 2.1))).length;
  const modCount = pack.modules?.length ?? 0;

  return (
    <div className="stack">
      <section className="card hero">
        <div className="row between">
          <div className="grow">
            <div className="hero-label">Heute</div>
            <div className="big">{done} / {goal} Übungen</div>
            <p className="muted small">{done >= goal ? 'Tagesziel geschafft.' : `Noch ${goal - done} bis zum Tagesziel.`}</p>
          </div>
          <Ring value={done} max={goal}>{done >= goal ? <Icon name="check" size={26} /> : null}</Ring>
        </div>
        <div className="hero-meta">
          <div title="Tage in Folge gelernt"><b className="streak"><Icon name="flame" size={17} className="flame" /> {st}</b><span>Tage in Folge</span></div>
          <div><b>{due}</b><span>Karten fällig</span></div>
          <div><b>{Object.keys(state.lessons).filter((k) => k.startsWith(`${pack.code}-`)).length}</b><span>Lektionen fertig</span></div>
        </div>
      </section>

      <div className="grid2">
        <button className="tile" onClick={() => (startAbc ? go('abc', abcUnit!.id) : go('lesson', nextLesson.id))}>
          <span className="tile-icon"><Icon name={startAbc ? 'letters' : 'book'} /></span><b>Weiterlernen</b><span className="muted small">{startAbc ? `Schrift: ${abcUnit!.title}` : nextLesson.title}</span>
        </button>
        <button className="tile" onClick={() => go('vocab')}>
          <span className="tile-icon"><Icon name="cards" /></span><b>Wiederholen</b><span className="muted small">{due} Karten fällig</span>
        </button>
        <button className="tile accent" onClick={() => go('coach')}>
          <span className="tile-icon"><Icon name="chat" /></span><b>Mit dem Coach reden</b><span className="small">Fehler, Slang, Gespräche</span>
        </button>
        <button className="tile" onClick={() => go('roleplay')}>
          <span className="tile-icon"><Icon name="dialog" /></span><b>Dialoge</b><span className="muted small">{pack.roleplays.length} Szenen in {pack.city}</span>
        </button>
        {abc && abcUnit && !abc.forBeginners && (
          <button className="tile" onClick={() => go('abc')}>
            <span className="tile-icon"><Icon name="letters" /></span><b>Schrift-Check</b><span className="muted small">Latinica & Ćirilica – Einstufungstest</span>
          </button>
        )}
        {modCount > 0 && (
          <button className="tile" onClick={() => go('courses')}>
            <span className="tile-icon"><Icon name="book" /></span><b>Kurse A1–C2</b><span className="muted small">{modCount} Module · {pack.words.length + pack.slang.length} Einträge</span>
          </button>
        )}
        {hard > 0 && (
          <button className="tile" onClick={() => go('vocab', 'hard')}>
            <span className="tile-icon"><Icon name="target" /></span><b>Schwierige Wörter</b><span className="muted small">{hard} gezielt üben</span>
          </button>
        )}
      </div>

      {pack.focus && (
        <section className="card focus">
          <h2 className="row" style={{ gap: 8 }}><Icon name="pin" className="accent-ink" /> Schwerpunkt {pack.city}</h2>
          <p className="small">{pack.focus}</p>
        </section>
      )}

      <section className="card">
        <h2>Einstieg · {pack.flag} {pack.name}</h2>
        <ul className="list">
          {pack.lessons.map((l, i) => {
            const res = state.lessons[l.id];
            return (
              <li key={l.id}>
                <button className="list-btn" onClick={() => go('lesson', l.id)}>
                  <span className="num">{res ? '✓' : i + 1}</span>
                  <span className="grow"><b>{l.title}</b><br /><span className="muted small">{l.goal}</span></span>
                  {res && <span className="muted small">{res.best}%</span>}
                </button>
              </li>
            );
          })}
        </ul>
        {modCount > 0 && <button className="btn big-btn" onClick={() => go('courses')}>Alle Kurse ansehen</button>}
        <AiNotice />
      </section>
    </div>
  );
}

export function MorePage({ ctx }: { ctx: Ctx }) {
  const items: { v: Parameters<Ctx['go']>[0]; icon: IconName; label: string; sub: string }[] = [
    { v: 'roleplay', icon: 'dialog', label: 'Dialoge & Rollenspiele', sub: 'Echte Gesprächssituationen' },
    { v: 'langs', icon: 'globe', label: 'Sprachen', sub: 'Sprache wechseln, Katalog' },
    { v: 'dict', icon: 'search', label: 'Wörterbuch', sub: 'Alle Wörter und Slang durchsuchen' },
    { v: 'progress', icon: 'chart', label: 'Fortschritt', sub: 'Statistiken, Serie, häufige Fehler' },
    { v: 'settings', icon: 'gear', label: 'Einstellungen', sub: 'Darstellung, Coach, Sicherung' },
  ];
  return (
    <div className="stack">
      <h1>Mehr</h1>
      <ul className="list card">
        {items.map((i) => (
          <li key={i.v}>
            <button className="list-btn" onClick={() => ctx.go(i.v)}>
              <span className="num"><Icon name={i.icon} size={19} /></span>
              <span className="grow"><b>{i.label}</b><br /><span className="muted small">{i.sub}</span></span>
              <span className="chev"><Icon name="chevron" size={16} /></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
