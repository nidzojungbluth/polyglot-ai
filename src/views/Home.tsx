import type { Ctx } from '../App';
import { dueCards } from '../lib/srs';
import { streak, today } from '../lib/store';
import { AiNotice, ProgressBar } from './ui';

export function Home({ ctx }: { ctx: Ctx }) {
  const { state, pack, go } = ctx;
  const done = state.daily[today()] ?? 0;
  const goal = state.settings.dailyGoal;
  const due = dueCards(state.cards, `${pack.code}-`).length;
  const st = streak(state.daily);
  const nextLesson = pack.lessons.find((l) => !state.lessons[l.id]) ?? pack.lessons[0];

  return (
    <div className="stack">
      <section className="card hero">
        <div className="row between">
          <div>
            <div className="muted small">Heute</div>
            <div className="big">{done} / {goal} Übungen</div>
          </div>
          <div className="streak" title="Tage in Folge gelernt">🔥 {st}</div>
        </div>
        <ProgressBar value={done} max={goal} />
        <p className="muted small">{done >= goal ? 'Tagesziel geschafft! 🎉' : `Noch ${goal - done} bis zum Tagesziel.`}</p>
      </section>

      <div className="grid2">
        <button className="tile" onClick={() => go('lesson', nextLesson.id)}>
          <span className="tile-icon">📘</span><b>Weiterlernen</b><span className="muted small">{nextLesson.title}</span>
        </button>
        <button className="tile" onClick={() => go('vocab')}>
          <span className="tile-icon">🃏</span><b>Wiederholen</b><span className="muted small">{due} Karten fällig</span>
        </button>
        <button className="tile accent" onClick={() => go('coach')}>
          <span className="tile-icon">💬</span><b>Mit dem Coach reden</b><span className="small">Fehler, Slang, Gespräche</span>
        </button>
        <button className="tile" onClick={() => go('roleplay')}>
          <span className="tile-icon">🎭</span><b>Rollenspiel</b><span className="muted small">{pack.roleplays.length} Szenen in {pack.city}</span>
        </button>
      </div>

      <section className="card">
        <h2>Lektionen · {pack.flag} {pack.name}</h2>
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
        <AiNotice />
      </section>
    </div>
  );
}

export function MorePage({ ctx }: { ctx: Ctx }) {
  const items: { v: Parameters<Ctx['go']>[0]; icon: string; label: string; sub: string }[] = [
    { v: 'langs', icon: '🌍', label: 'Sprachen', sub: 'Sprache wechseln, Katalog' },
    { v: 'dict', icon: '📖', label: 'Wörterbuch', sub: 'Alle Wörter und Slang durchsuchen' },
    { v: 'progress', icon: '📈', label: 'Fortschritt', sub: 'Statistiken, Serie, häufige Fehler' },
    { v: 'settings', icon: '⚙️', label: 'Einstellungen', sub: 'Darstellung, Coach, Sicherung' },
  ];
  return (
    <div className="stack">
      <h1>Mehr</h1>
      <ul className="list card">
        {items.map((i) => (
          <li key={i.v}>
            <button className="list-btn" onClick={() => ctx.go(i.v)}>
              <span className="num">{i.icon}</span>
              <span className="grow"><b>{i.label}</b><br /><span className="muted small">{i.sub}</span></span>
              <span className="muted">›</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
