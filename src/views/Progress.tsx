import type { Ctx } from '../App';
import { PACKS } from '../data';
import { dueCards, isLearned } from '../lib/srs';
import { streak, today } from '../lib/store';

export function Progress({ ctx }: { ctx: Ctx }) {
  const { state } = ctx;
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d; });
  const max = Math.max(state.settings.dailyGoal, ...days.map((d) => state.daily[today(d)] ?? 0));
  const total = Object.values(state.daily).reduce((a, b) => a + b, 0);
  const mistakes = Object.values(state.mistakes).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="stack">
      <button className="back" onClick={() => ctx.go('more')}>‹ Mehr</button>
      <h1>Fortschritt</h1>
      <div className="grid2">
        <div className="card center"><div className="big">🔥 {streak(state.daily)}</div><div className="muted small">Tage in Folge</div></div>
        <div className="card center"><div className="big">{total}</div><div className="muted small">Übungen gesamt</div></div>
      </div>
      <section className="card">
        <h2>Letzte 7 Tage</h2>
        <div className="chart" role="img" aria-label="Übungen pro Tag der letzten 7 Tage">
          {days.map((d) => {
            const v = state.daily[today(d)] ?? 0;
            return (
              <div key={today(d)} className="col">
                <span className="small">{v || ''}</span>
                <div className={`colbar ${v >= state.settings.dailyGoal ? 'goal' : ''}`} style={{ height: `${Math.max(2, (v / max) * 100)}%` }} />
                <span className="small muted">{d.toLocaleDateString('de-DE', { weekday: 'short' }).slice(0, 2)}</span>
              </div>
            );
          })}
        </div>
      </section>
      <section className="card">
        <h2>Sprachen</h2>
        <ul className="list">
          {PACKS.map((p) => {
            const cards = Object.values(state.cards).filter((c) => c.id.startsWith(`${p.code}-`));
            const lessons = p.lessons.filter((l) => state.lessons[l.id]).length;
            return (
              <li key={p.code} className="word-row">
                <span className="num">{p.flag}</span>
                <div className="grow"><b>{p.name}</b>
                  <div className="small muted">{lessons}/{p.lessons.length} Lektionen · {cards.length} Karten · {cards.filter(isLearned).length} gelernt · {dueCards(state.cards, `${p.code}-`).length} fällig</div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="card">
        <h2>Deine häufigsten Fehler</h2>
        {!mistakes.length ? <p className="muted small">Noch keine erfasst. Der Coach merkt sich typische Fehler, die er in deinen Nachrichten erkennt.</p> : (
          <ul className="list">{mistakes.map((m, i) => <li key={i} className="small">{PACKS.find((p) => p.code === m.lang)?.flag} {m.why} <span className="muted">({m.count}×)</span></li>)}</ul>
        )}
      </section>
    </div>
  );
}
