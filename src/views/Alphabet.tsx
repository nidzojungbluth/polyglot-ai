import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { abcFor } from '../data/alphabet';
import type { AbcCourse, AbcUnit } from '../data/alphabet/types';
import { masteredUnits, placementTest, unitExercises } from '../lib/abc';
import type { Exercise } from '../lib/exercises';
import { sayFor } from '../lib/platform';
import { ExerciseView } from './Lesson';
import { ProgressBar, SpeakBtn } from './ui';

export const abcDone = (ctx: Ctx, u: AbcUnit) => !!ctx.state.lessons[u.id];

export function abcNext(ctx: Ctx): AbcUnit | undefined {
  const c = abcFor(ctx.pack.code);
  return c?.units.find((u) => !abcDone(ctx, u));
}

export function Alphabet({ ctx, arg }: { ctx: Ctx; arg?: string }) {
  const course = abcFor(ctx.pack.code);
  if (!course) {
    return (
      <div className="stack">
        <h1>Schrift</h1>
        <p className="card">{ctx.pack.name} wird mit lateinischen Buchstaben geschrieben – hier gibt es keinen eigenen Schriftkurs.</p>
      </div>
    );
  }
  if (arg === 'test') return <Placement ctx={ctx} course={course} />;
  const unit = course.units.find((u) => u.id === arg);
  if (unit) return <UnitView key={unit.id} ctx={ctx} course={course} unit={unit} />;
  return <Overview ctx={ctx} course={course} />;
}

function Overview({ ctx, course }: { ctx: Ctx; course: AbcCourse }) {
  const { state, update, go } = ctx;
  const done = course.units.filter((u) => abcDone(ctx, u)).length;
  const mark = (ids: string[], via: 'skip') => update((s) => {
    const l = { ...s.lessons };
    for (const id of ids) if (!l[id]) l[id] = { best: 0, doneAt: Date.now(), via };
    return { ...s, lessons: l };
  });
  return (
    <div className="stack">
      <button className="back" onClick={() => go('courses')}>‹ Kurse</button>
      <h1>🔤 {course.title}</h1>
      <p className="small">{course.intro}</p>
      <ProgressBar value={done} max={course.units.length} />
      <p className="muted small">{done} von {course.units.length} Schritten erledigt</p>
      <button className={`btn big-btn ${course.forBeginners ? '' : 'primary'}`} onClick={() => go('abc', 'test')}>📝 Einstufungstest – Bekanntes abhaken</button>
      <ul className="list card">
        {course.units.map((u, i) => {
          const r = state.lessons[u.id];
          return (
            <li key={u.id}>
              <button className="list-btn" onClick={() => go('abc', u.id)}>
                <span className="num">{r ? (r.via === 'skip' ? '⏭' : '✓') : i + 1}</span>
                <span className="grow"><b>{u.title}</b><br />
                  <span className="muted small">{r ? (r.via === 'skip' ? 'übersprungen' : r.via === 'test' ? 'im Test beherrscht' : `${r.best}% richtig`) : unitInfo(u)}</span></span>
                <span className="muted">›</span>
              </button>
            </li>
          );
        })}
      </ul>
      {done < course.units.length && (
        <button className="btn" onClick={() => mark(course.units.map((u) => u.id), 'skip')}>Ich kann die Schrift schon – alles überspringen</button>
      )}
      <p className="fine">Übersprungene oder im Test bestandene Schritte kannst du jederzeit trotzdem öffnen und üben.</p>
    </div>
  );
}

function unitInfo(u: AbcUnit): string {
  if (u.letters) return `Buchstaben: ${u.letters.map((l) => l.up).join(' ')}`;
  if (u.combos) return u.combos.map((c) => c.t).join(' · ');
  return `${u.words?.length ?? 0} ${u.kind === 'sentences' ? 'Sätze' : 'Wörter'}`;
}

function UnitView({ ctx, course, unit }: { ctx: Ctx; course: AbcCourse; unit: AbcUnit }) {
  const { pack, go, update, addActivity, state } = ctx;
  const [phase, setPhase] = useState<'learn' | 'quiz'>('learn');
  const [seed, setSeed] = useState(0);
  const exercises = useMemo(() => unitExercises(course, unit), [course, unit, seed]);
  const idx = course.units.findIndex((u) => u.id === unit.id);
  const next = course.units[idx + 1];
  const sr = course.code === 'sr';

  if (phase === 'quiz') {
    return (
      <Player ctx={ctx} title={unit.title} exercises={exercises} onExit={() => setPhase('learn')}
        onFinish={(res) => {
          const score = Math.round((res.filter((r) => r.ok).length / res.length) * 100);
          update((s) => ({ ...s, lessons: { ...s.lessons, [unit.id]: { best: Math.max(score, s.lessons[unit.id]?.via ? 0 : s.lessons[unit.id]?.best ?? 0), doneAt: Date.now() } } }));
          addActivity(0);
        }}
        doneActions={(score) => (
          <>
            {score < 80 && <p className="muted">Tipp: Lies dir die Karten noch einmal durch und übe dann erneut.</p>}
            {next && <button className="btn primary big-btn" onClick={() => go('abc', next.id)}>Weiter: {next.title}</button>}
            {!next && <button className="btn primary big-btn" onClick={() => go('courses')}>Schriftkurs geschafft – zu den Kursen</button>}
            <button className="btn" onClick={() => { setSeed(seed + 1); setPhase('quiz'); }}>Nochmal üben</button>
            <button className="btn" onClick={() => go('abc')}>Zur Übersicht</button>
          </>
        )} />
    );
  }

  return (
    <div className="stack">
      <button className="back" onClick={() => go('abc')}>‹ {course.title}</button>
      <h1>{unit.title}</h1>
      <p>{unit.intro}</p>
      {unit.explain?.map((e) => (
        <section key={e.title} className="card"><h2>{e.title}</h2><p className="small">{e.text}</p></section>
      ))}
      {unit.letters && (
        <div className="letter-grid">
          {unit.letters.map((l) => (
            <section key={l.up} className="card letter-card">
              <div className="row between">
                <div className="glyph-big" lang={pack.code}>{l.up} {l.low}</div>
                <button className="icon-btn" aria-label={`Beispiel vorlesen: ${l.ex.t}`} onClick={() => sayFor(pack, l.ex.t)}>🔊</button>
              </div>
              <div className="small"><b>{sr ? `Latein: ${l.lat}` : l.name}</b> · Laut: <b>{l.sound}</b></div>
              <div className="small">{l.hint}</div>
              <div className="small example"><b lang={pack.code}>{l.ex.t}</b> <span className="muted">({l.ex.tr})</span> = {l.ex.de}</div>
              {l.trap && <div className="small trap">⚠️ {l.trap}</div>}
            </section>
          ))}
        </div>
      )}
      {unit.combos && (
        <div className="letter-grid">
          {unit.combos.map((c) => (
            <section key={c.t} className="card letter-card">
              <div className="row between"><div className="glyph-big" lang={pack.code}>{c.t}</div><SpeakBtn text={c.ex.t} pack={pack} /></div>
              <div className="small">Laut: <b>{c.sound}</b> – {c.hint}</div>
              <div className="small example"><b lang={pack.code}>{c.ex.t}</b> <span className="muted">({c.ex.tr})</span> = {c.ex.de}</div>
            </section>
          ))}
        </div>
      )}
      {unit.words && (
        <ul className="list card">
          {unit.words.map((w) => (
            <li key={w.t} className="word-row">
              <div className="grow"><b lang={pack.code} className="read-word">{w.t}</b>
                <div className="small">{w.syl && <span className="syl">{w.syl} · </span>}<span className="muted">{w.tr}</span> = {w.de}</div></div>
              <SpeakBtn text={w.t} pack={pack} />
            </li>
          ))}
        </ul>
      )}
      <button className="btn primary big-btn" onClick={() => setPhase('quiz')}>Üben ({exercises.length} Aufgaben)</button>
      {!state.lessons[unit.id] && (
        <button className="btn" onClick={() => { update((s) => ({ ...s, lessons: { ...s.lessons, [unit.id]: { best: 0, doneAt: Date.now(), via: 'skip' } } })); if (next) go('abc', next.id); else go('abc'); }}>Kann ich schon – überspringen</button>
      )}
    </div>
  );
}

function Placement({ ctx, course }: { ctx: Ctx; course: AbcCourse }) {
  const { update, go } = ctx;
  const exercises = useMemo(() => placementTest(course), [course]);
  const [mastered, setMastered] = useState<string[] | null>(null);
  return (
    <Player ctx={ctx} title="Einstufungstest" exercises={exercises} onExit={() => go('abc')}
      onFinish={(res) => {
        const m = masteredUnits(res);
        setMastered(m);
        update((s) => {
          const l = { ...s.lessons };
          for (const id of m) if (!l[id] || l[id].via === 'skip') l[id] = { best: 100, doneAt: Date.now(), via: 'test' };
          return { ...s, lessons: l };
        });
      }}
      doneActions={() => (
        <>
          <section className="card">
            <h2>Ergebnis</h2>
            <ul className="list">
              {course.units.map((u) => (
                <li key={u.id} className="small topic-row">{mastered?.includes(u.id) ? '✅' : '📘'} {u.title} – {mastered?.includes(u.id) ? 'beherrscht, abgehakt' : 'noch üben'}</li>
              ))}
            </ul>
          </section>
          <button className="btn primary big-btn" onClick={() => go('abc')}>Zur Übersicht</button>
        </>
      )} />
  );
}

/** Spielt eine Reihe von Übungen ab und meldet pro Aufgabe richtig/falsch. */
function Player({ ctx, title, exercises, onFinish, onExit, doneActions }: {
  ctx: Ctx; title: string; exercises: Exercise[]; onExit: () => void;
  onFinish: (res: { unit?: string; ok: boolean }[]) => void; doneActions: (score: number) => React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const [res, setRes] = useState<{ unit?: string; ok: boolean }[]>([]);
  const [fb, setFb] = useState<null | { ok: boolean; answer: string; explain?: string }>(null);
  const [done, setDone] = useState(false);

  if (done) {
    const score = Math.round((res.filter((r) => r.ok).length / Math.max(1, res.length)) * 100);
    return (
      <div className="stack center">
        <div className="huge">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
        <h1>{res.filter((r) => r.ok).length} von {res.length} richtig</h1>
        {doneActions(score)}
      </div>
    );
  }
  const ex = exercises[i];
  const answer = (ok: boolean, right: string) => {
    if (fb) return;
    setFb({ ok, answer: right, explain: 'explain' in ex ? ex.explain : undefined });
    setRes((r) => [...r, { unit: ex.unit, ok }]);
    ctx.addActivity(1);
  };
  const next = () => {
    setFb(null);
    if (i + 1 < exercises.length) setI(i + 1);
    else { onFinish(res); setDone(true); }
  };
  return (
    <div className="stack">
      <div className="row between"><button className="back" onClick={onExit}>✕</button><span className="muted small">{title} · {i + 1} / {exercises.length}</span></div>
      <ProgressBar value={i} max={exercises.length} />
      <ExerciseView key={i} ex={ex} ctx={ctx} onAnswer={answer} locked={!!fb} />
      {fb && (
        <div className={`feedback ${fb.ok ? 'ok' : 'bad'}`} role="status">
          <b>{fb.ok ? 'Richtig! ✅' : 'Nicht ganz.'}</b>
          {!fb.ok && <div>Richtig wäre: <b lang={ctx.pack.code}>{fb.answer}</b></div>}
          {fb.explain && <div className="small">💡 {fb.explain}</div>}
          <button className="btn primary big-btn" onClick={next}>Weiter</button>
        </div>
      )}
    </div>
  );
}
