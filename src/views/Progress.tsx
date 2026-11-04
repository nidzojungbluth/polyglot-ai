import type { Ctx } from '../App';
import { BASES } from '../data';
import { useAllPacks } from '../lib/usePacks';
import { isLearned, knownIn, todayQueue } from '../lib/srs';
import { newDoneToday, newLimit, reportedIds } from '../lib/store';
import { streak, today } from '../lib/store';
import { LEVELS } from '../data/types';
import { TOPICS } from '../data/curriculum';
import { moduleLessons } from '../lib/course';
import { ProgressBar, Icon } from './ui';

export function Progress({ ctx }: { ctx: Ctx }) {
  const { state } = ctx;
  const loaded = useAllPacks();
  const days30 = Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); return d; });
  const total = Object.values(state.daily).reduce((a, b) => a + b, 0);
  const mistakes = Object.values(state.mistakes).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="stack">
      <button className="back" onClick={() => ctx.go('more')}>Mehr</button>
      <h1>Fortschritt</h1>
      <div className="grid2">
        <div className="card center"><div className="big streak"><Icon name="flame" size={22} className="flame" /> {streak(state.daily)}</div><div className="muted small">Tage in Folge</div></div>
        <div className="card center"><div className="big">{total}</div><div className="muted small">Übungen gesamt</div></div>
      </div>
      <section className="card">
        <div className="row between"><h2 style={{ margin: 0 }}>Letzte 30 Tage</h2><span className="muted small">{days30.filter((d) => (state.daily[today(d)] ?? 0) > 0).length} Lerntage</span></div>
        <MonthChart days={days30} values={days30.map((d) => state.daily[today(d)] ?? 0)} goal={state.settings.dailyGoal} />
        <p className="fine">Volle Balken: Tagesziel ({state.settings.dailyGoal} Übungen) erreicht. Gestrichelte Linie: Tagesziel.</p>
      </section>
      <section className="card">
        <h2>Sprachen</h2>
        <ul className="list">
          {BASES.map((p, i) => {
            const full = loaded[i];
            const cards = Object.values(state.cards).filter((c) => c.id.startsWith(`${p.code}-`));
            const lessons = p.lessons.filter((l) => state.lessons[l.id]).length;
            return (
              <li key={p.code} className="word-row">
                <span className="num">{p.flag}</span>
                <div className="grow"><b>{p.name}</b>
                  <div className="small muted">{lessons}/{p.lessons.length} Lektionen · {cards.length} Karten · {cards.filter(isLearned).length} gelernt · {full ? todayQueue(Object.fromEntries(cards.map((c) => [c.id, c])), knownIn(full, reportedIds(state)), { newLimit: newLimit(state), newDoneToday: newDoneToday(state) }).length : '…'} fällig</div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      {(ctx.pack.modules?.length ?? 0) > 0 && (
        <section className="card">
          <h2>{ctx.pack.flag} Kurse nach Niveau</h2>
          <ul className="list">
            {LEVELS.map((lv) => {
              const mods = (ctx.pack.modules ?? []).filter((m) => m.level === lv);
              const done = mods.filter((m) => moduleLessons(ctx.pack, m).every((l) => state.lessons[l.id])).length;
              const lessonsAll = mods.flatMap((m) => moduleLessons(ctx.pack, m));
              const lessonsDone = lessonsAll.filter((l) => state.lessons[l.id]).length;
              return (
                <li key={lv} className="topic-row">
                  <div className="row between small"><b>{lv}</b><span className="muted">{mods.length ? `${done}/${mods.length} Module · ${lessonsDone}/${lessonsAll.length} Lektionen` : 'noch keine Inhalte'}</span></div>
                  <ProgressBar value={lessonsDone} max={lessonsAll.length} />
                </li>
              );
            })}
          </ul>
          <h2>{ctx.pack.flag} Wortschatz nach Thema</h2>
          <ul className="list">
            {TOPICS.map((t) => {
              const ids = [...ctx.pack.words.filter((w) => w.cat === t.key).map((w) => w.id),
                ...(ctx.pack.modules ?? []).filter((m) => m.topic === t.key).flatMap((m) => m.slang)];
              if (!ids.length) return null;
              const learned = ids.filter((id) => state.cards[id] && state.cards[id].reps > 0).length;
              return (
                <li key={t.key} className="topic-row">
                  <div className="row between small"><span>{t.icon} {t.title}</span><span className="muted">{learned} / {ids.length}</span></div>
                  <ProgressBar value={learned} max={ids.length} />
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <section className="card">
        <h2>Deine häufigsten Fehler</h2>
        {!mistakes.length ? <p className="muted small">Noch keine erfasst. Der Coach merkt sich typische Fehler, die er in deinen Nachrichten erkennt.</p> : (
          <ul className="list">{mistakes.map((m, i) => <li key={i} className="small">{BASES.find((p) => p.code === m.lang)?.flag} {m.why} <span className="muted">({m.count}×)</span></li>)}</ul>
        )}
      </section>
    </div>
  );
}

/** 30-Tage-Balken als reines SVG (keine Bibliothek). Ziel erreicht = voller Akzent, sonst gedämpft. */
function MonthChart({ days, values, goal }: { days: Date[]; values: number[]; goal: number }) {
  const W = 320, H = 120, gap = 3, bw = (W - gap * (days.length - 1)) / days.length;
  const max = Math.max(goal, ...values, 1);
  const y = (v: number) => H - (v / max) * H;
  const label = `Übungen pro Tag der letzten 30 Tage: ${values.reduce((a, b) => a + b, 0)} insgesamt, Ziel an ${values.filter((v) => v >= goal).length} Tagen erreicht`;
  return (
    <svg className="month-chart" viewBox={`0 0 ${W} ${H + 18}`} role="img" aria-label={label}>
      <line x1="0" x2={W} y1={y(goal)} y2={y(goal)} className="goal-line" />
      {values.map((v, i) => {
        const h = v ? Math.max(3, H - y(v)) : 2;
        return <rect key={i} x={i * (bw + gap)} y={H - h} width={bw} height={h} rx={Math.min(3, bw / 2)} className={v >= goal ? 'bar-goal' : v ? 'bar-some' : 'bar-none'}><title>{`${days[i].toLocaleDateString('de-DE')}: ${v}`}</title></rect>;
      })}
      {[0, 14, 29].map((i) => (
        <text key={i} x={i * (bw + gap) + (i === 29 ? bw : 0)} y={H + 14} textAnchor={i === 29 ? 'end' : 'start'} className="axis">{i === 29 ? 'heute' : days[i].toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' })}</text>
      ))}
    </svg>
  );
}
