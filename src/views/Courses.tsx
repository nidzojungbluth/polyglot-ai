import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import type { Level, Module } from '../data/types';
import { LEVELS } from '../data/types';
import { LEVEL_INFO, TOPICS, topicIcon } from '../data/curriculum';
import { itemsOf, moduleLessons } from '../lib/course';
import { ExampleBlock, ProgressBar, RegBadge, SpeakBtn, WordHead } from './ui';
import { abcFor } from '../data/alphabet';

export function moduleProgress(ctx: Ctx, m: Module): { done: number; total: number } {
  const ls = moduleLessons(ctx.pack, m);
  return { done: ls.filter((l) => ctx.state.lessons[l.id]).length, total: ls.length };
}

export function Courses({ ctx, moduleId }: { ctx: Ctx; moduleId?: string }) {
  const { pack, go } = ctx;
  const modules = pack.modules ?? [];
  const firstOpen = LEVELS.find((lv) => modules.some((m) => m.level === lv && moduleProgress(ctx, m).done < moduleProgress(ctx, m).total)) ?? 'A1';
  const [level, setLevel] = useState<Level>(firstOpen);
  const mod = moduleId ? modules.find((m) => m.id === moduleId) : undefined;

  if (mod) return <ModuleView ctx={ctx} mod={mod} />;

  if (!modules.length) {
    return (
      <div className="stack">
        <h1>Kurse</h1>
        <section className="card">
          <p>Für {pack.name} gibt es bisher nur die Einstiegslektionen auf der Startseite. Der große Kursbereich (A1–C2) ist zuerst für Griechisch, Serbisch und Russisch aufgebaut.</p>
          <button className="btn" onClick={() => go('langs')}>Sprache wechseln</button>
        </section>
      </div>
    );
  }

  const byTopic = (lv: Level) => TOPICS.map((t) => ({ topic: t, mods: modules.filter((m) => m.level === lv && m.topic === t.key) }));
  const countFor = (lv: Level) => new Set(modules.filter((m) => m.level === lv).map((m) => m.topic)).size;
  const moduleCount = (lv: Level) => modules.filter((m) => m.level === lv).length;

  return (
    <div className="stack">
      <h1>Kurse · {pack.flag} {pack.name}</h1>
      <AbcCard ctx={ctx} />
      <div className="levels" role="tablist" aria-label="Niveaustufe">
        {LEVELS.map((lv) => (
          <button key={lv} role="tab" aria-selected={lv === level} className={`lv ${lv === level ? 'on' : ''} ${countFor(lv) ? '' : 'empty'}`} onClick={() => setLevel(lv)}>
            <b>{lv}</b><span>{countFor(lv)}</span>
          </button>
        ))}
      </div>
      <p className="muted small">{level} – {LEVEL_INFO[level]}. {countFor(level)} von {TOPICS.length} Themen mit Inhalten · {moduleCount(level)} Module.</p>
      <ul className="list card">
        {byTopic(level).map(({ topic, mods }) => mods.length ? mods.map((m) => {
          const p = moduleProgress(ctx, m);
          const n = m.words.length + m.slang.length;
          return (
            <li key={m.id}>
              <button className="list-btn" onClick={() => go('courses', m.id)}>
                <span className="num">{p.done === p.total ? '✓' : topic.icon}</span>
                <span className="grow"><b>{m.title}</b><br />
                  <span className="muted small">{topic.title} · {n} Einträge · {p.done}/{p.total} Lektionen{m.slang.length ? ' · Slang' : ''}</span>
                  <ProgressBar value={p.done} max={p.total} />
                </span>
              </button>
            </li>
          );
        }) : (
          <li key={topic.key} className="planned-row">
            <span className="num dim">{topic.icon}</span>
            <span className="grow muted small">{topic.title} – <i>geplant, noch keine Inhalte</i></span>
          </li>
        ))}
      </ul>
      <p className="fine">Lehrplan: 20 Themen × 6 Stufen. Häufige Alltagsthemen haben zusätzlich einen zweiten Teil zum Vertiefen. Nur Module mit echten Inhalten sind anklickbar.</p>
    </div>
  );
}

function ModuleView({ ctx, mod }: { ctx: Ctx; mod: Module }) {
  const { pack, state, go } = ctx;
  const lessons = useMemo(() => moduleLessons(pack, mod), [pack, mod]);
  const { words, slang } = useMemo(() => itemsOf(pack, mod), [pack, mod]);
  const [show, setShow] = useState(false);
  const next = lessons.find((l) => !state.lessons[l.id]) ?? lessons[0];
  return (
    <div className="stack">
      <button className="back" onClick={() => go('courses')}>‹ Alle Kurse</button>
      <h1>{topicIcon(mod.topic)} {mod.title}</h1>
      <p className="muted">{mod.level} · {LEVEL_INFO[mod.level]} · {words.length + slang.length} Einträge</p>
      {mod.grammar && <section className="card"><h2>{mod.grammar.title}</h2><p>{mod.grammar.text}</p></section>}
      <button className="btn primary big-btn" onClick={() => go('lesson', next.id)}>{state.lessons[next.id] ? 'Wiederholen' : 'Weiter'}: {next.title.split(' · ')[1]}</button>
      <ul className="list card">
        {lessons.map((l, i) => {
          const r = state.lessons[l.id];
          return (
            <li key={l.id}>
              <button className="list-btn" onClick={() => go('lesson', l.id)}>
                <span className="num">{r ? '✓' : l.review ? '🔁' : i + 1}</span>
                <span className="grow"><b>{l.title.split(' · ')[1]}</b><br /><span className="muted small">{l.words.length} Einträge</span></span>
                {r && <span className="muted small">{r.best}%</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <button className="btn" onClick={() => setShow(!show)}>{show ? 'Wortliste ausblenden' : 'Wortliste anzeigen'}</button>
      {show && (
        <ul className="list card">
          {words.map((w) => (
            <li key={w.id} className="word-row">
              <div className="grow"><WordHead t={w.t} de={w.de} tr={w.tr} lang={pack.code} /><div className="small"><RegBadge reg={w.reg} /></div><ExampleBlock ex={w.ex} lang={pack.code} pack={pack} /></div>
              <SpeakBtn text={w.t} pack={pack} />
            </li>
          ))}
          {slang.map((s) => (
            <li key={s.id} className="word-row">
              <div className="grow"><WordHead t={s.t} de={s.de} tr={s.tr} lang={pack.code} /> <RegBadge reg={s.reg} /> {s.local && <span className="badge local">📍 {pack.city}</span>}<div className="small muted">{s.situation} · {s.effect}</div><ExampleBlock ex={s.ex} lang={pack.code} pack={pack} /></div>
              <SpeakBtn text={s.t} pack={pack} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AbcCard({ ctx }: { ctx: Ctx }) {
  const c = abcFor(ctx.pack.code);
  if (!c) return null;
  const done = c.units.filter((u) => ctx.state.lessons[u.id]).length;
  return (
    <button className="card abc-card" onClick={() => ctx.go('abc')}>
      <div className="row between"><b>🔤 Schritt 1: {c.title}</b><span className="muted small">{done}/{c.units.length}</span></div>
      <span className="small muted">{done === c.units.length ? 'Erledigt – jederzeit wiederholbar' : c.forBeginners ? 'Buchstaben → Laute → Silben → Wörter → erste Sätze' : 'Einstufungstest und Wiederholung beider Schriften'}</span>
      <ProgressBar value={done} max={c.units.length} />
    </button>
  );
}
