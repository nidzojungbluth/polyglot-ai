import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { buildExercises, type Exercise } from '../lib/exercises';
import { findLesson, lessonItems } from '../lib/course';
import { newCard, review } from '../lib/srs';
import { matches, sameAnswer } from '../lib/text';
import { sayFor } from '../lib/platform';
import { LevelBadge, ProgressBar, RegBadge, SpeakBtn } from './ui';

export function LessonPlayer({ ctx, lessonId }: { ctx: Ctx; lessonId: string }) {
  const { pack, update, addActivity, go } = ctx;
  const lesson = useMemo(() => findLesson(pack, lessonId), [pack, lessonId]);
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'done'>('intro');
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => (lesson ? lessonItems(pack, lesson) : []), [lesson, pack]);
  const exercises = useMemo(() => {
    if (!lesson) return [];
    const slang = lesson.slangIds.map((id) => pack.slang.find((s) => s.id === id)!).filter(Boolean);
    const ex = buildExercises(pack, items, lesson.cloze, lesson.order, slang);
    return lesson.review ? ex.sort(() => Math.random() - 0.5).slice(0, 25) : ex;
  }, [lesson, pack, items, seed]);
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<null | { ok: boolean; answer: string; explain?: string }>(null);
  const back = () => go(lesson?.moduleId ? 'courses' : 'home', lesson?.moduleId || undefined);

  if (!lesson) return <div className="card">Diese Lektion gibt es in {pack.name} nicht. <button className="btn" onClick={() => go('home')}>Zum Start</button></div>;

  const answer = (ok: boolean, right: string, ex: Exercise) => {
    if (feedback) return;
    const explain = 'explain' in ex ? ex.explain : undefined;
    setFeedback({ ok, answer: right, explain });
    if (ok) setCorrect((c) => c + 1);
    else if ('wordId' in ex) setWrongIds((w) => [...w, ex.wordId]);
    addActivity(1);
  };
  const next = () => {
    setFeedback(null);
    if (i + 1 < exercises.length) { setI(i + 1); return; }
    const score = Math.round((correct / exercises.length) * 100);
    update((s) => {
      const cards = { ...s.cards };
      for (const w of items) if (!cards[w.id]) cards[w.id] = newCard(w.id);
      // Fehler fließen ins Wiederholungssystem: falsch beantwortete Wörter kommen bald wieder
      for (const id of wrongIds) cards[id] = review(cards[id] ?? newCard(id), 0);
      const prev = s.lessons[lesson.id]?.best ?? 0;
      return { ...s, cards, lessons: { ...s.lessons, [lesson.id]: { best: Math.max(prev, score), doneAt: Date.now() } } };
    });
    setPhase('done');
  };

  if (phase === 'intro') {
    return (
      <div className="stack">
        <button className="back" onClick={back}>‹ Zurück</button>
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.goal}</p>
        {lesson.grammar.text && (
          <section className="card">
            <h2>{lesson.grammar.title}</h2>
            <p>{lesson.grammar.text}</p>
          </section>
        )}
        <section className="card">
          <h2>{lesson.review ? 'Alle Einträge' : 'Neue Einträge'} ({items.length})</h2>
          <ul className="list">
            {items.map((w) => (
              <li key={w.id} className="word-row">
                <div className="grow">
                  <b lang={pack.code}>{w.t}</b>{w.tr && <span className="muted"> · {w.tr}</span>}
                  <div className="small">{w.de} <RegBadge reg={w.reg} /> <LevelBadge level={w.level} /></div>
                  {w.ex && <div className="small muted"><i lang={pack.code}>{w.ex.t}</i> – {w.ex.de}</div>}
                  {w.note && <div className="small note">💡 {w.note}</div>}
                </div>
                <SpeakBtn text={w.t} pack={pack} />
              </li>
            ))}
          </ul>
        </section>
        <button className="btn primary big-btn" onClick={() => setPhase('quiz')}>Übungen starten ({exercises.length})</button>
      </div>
    );
  }

  if (phase === 'done') {
    const score = Math.round((correct / exercises.length) * 100);
    return (
      <div className="stack center">
        <div className="huge">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
        <h1>{correct} von {exercises.length} richtig</h1>
        <p className="muted">Die Einträge sind jetzt in deinen Vokabelkarten. {wrongIds.length > 0 && `${new Set(wrongIds).size} schwierige Einträge kommen schon bald wieder.`}</p>
        <button className="btn primary big-btn" onClick={back}>Fertig</button>
        <button className="btn" onClick={() => { setSeed(seed + 1); setI(0); setCorrect(0); setWrongIds([]); setPhase('quiz'); }}>Nochmal üben</button>
      </div>
    );
  }

  const ex = exercises[i];
  return (
    <div className="stack">
      <div className="row between">
        <button className="back" onClick={back}>✕</button>
        <span className="muted small">{i + 1} / {exercises.length}</span>
      </div>
      <ProgressBar value={i} max={exercises.length} />
      <ExerciseView key={`${seed}-${i}`} ex={ex} ctx={ctx} onAnswer={(ok, right) => answer(ok, right, ex)} locked={!!feedback} />
      {feedback && (
        <div className={`feedback ${feedback.ok ? 'ok' : 'bad'}`} role="status">
          <b>{feedback.ok ? 'Richtig! ✅' : 'Nicht ganz.'}</b>
          {!feedback.ok && <div>Richtig wäre: <b lang={pack.code}>{feedback.answer}</b></div>}
          {feedback.explain && <div className="small">💡 {feedback.explain}</div>}
          <button className="btn primary big-btn" onClick={next}>Weiter</button>
        </div>
      )}
    </div>
  );
}

function ExerciseView({ ex, ctx, onAnswer, locked }: { ex: Exercise; ctx: Ctx; onAnswer: (ok: boolean, right: string) => void; locked: boolean }) {
  const { pack } = ctx;
  const [chosen, setChosen] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [tiles, setTiles] = useState<number[]>([]);

  const choose = (o: string, right: string) => { if (locked) return; setChosen(o); onAnswer(o === right, right); };
  const optClass = (o: string, right: string) => (!chosen ? '' : o === right ? 'opt-right' : o === chosen ? 'opt-wrong' : '');
  const options = (opts: string[], right: string, isTarget: boolean) => (
    <div className="options">
      {opts.map((o) => (
        <button key={o} lang={isTarget ? pack.code : 'de'} className={`opt ${optClass(o, right)}`} disabled={locked && !chosen} onClick={() => choose(o, right)}>{o}</button>
      ))}
    </div>
  );

  if (ex.kind === 'mc') {
    return (
      <section className="card">
        <div className="muted small">{ex.dir === 'zu-de' ? 'Was bedeutet das?' : 'Wie sagt man das?'}</div>
        <div className="prompt" lang={ex.dir === 'zu-de' ? pack.code : 'de'}>{ex.prompt} {ex.speak && <SpeakBtn text={ex.speak} pack={pack} />}</div>
        {ex.sub && <div className="muted">{ex.sub}</div>}
        {options(ex.options, ex.answer, ex.dir === 'zu-ziel')}
      </section>
    );
  }
  if (ex.kind === 'listen') {
    return (
      <section className="card">
        <div className="muted small">Hör zu und wähle, was du hörst</div>
        <button className="btn big-btn" onClick={() => sayFor(pack, ex.speak)}>🔊 Abspielen</button>
        <button className="btn small-btn" onClick={() => sayFor(pack, ex.speak, 0.6)}>🐢 Langsam</button>
        {options(ex.options, ex.answer, true)}
      </section>
    );
  }
  if (ex.kind === 'register') {
    return (
      <section className="card">
        <div className="muted small">Standard oder Umgangssprache?</div>
        <div className="prompt small-prompt">{ex.prompt}</div>
        {options(ex.options, ex.answer, true)}
      </section>
    );
  }

  if (ex.kind === 'cloze' || ex.kind === 'translate') {
    const right = ex.answer;
    const submit = (e: React.FormEvent) => {
      e.preventDefault();
      if (locked || !text.trim()) return;
      onAnswer(ex.kind === 'cloze' ? sameAnswer(text, right, pack.code) : matches(text, right, pack.code), right);
    };
    return (
      <form className="card" onSubmit={submit}>
        <div className="muted small">{ex.kind === 'cloze' ? 'Ergänze die Lücke' : 'Übersetze in die Zielsprache'}</div>
        <div className="prompt" lang={ex.kind === 'cloze' ? pack.code : 'de'}>{ex.kind === 'cloze' ? ex.prompt : ex.de}</div>
        {ex.kind === 'cloze' && <div className="muted">{ex.de}</div>}
        <input className="input" value={text} onChange={(e) => setText(e.target.value)} disabled={locked}
          autoCapitalize="off" autoCorrect="off" spellCheck={false} lang={pack.code} placeholder="Deine Antwort" aria-label="Antwort" />
        {ex.kind === 'translate' && ex.hint && !locked && <div className="muted small">Tipp: beginnt mit „{ex.hint}“{pack.scripts === 'sr' ? ' (Latein oder Kyrillisch)' : ''}</div>}
        {!locked && <button className="btn primary big-btn" type="submit">Prüfen</button>}
      </form>
    );
  }

  // Satzbau
  const words = ex.tiles;
  const built = tiles.map((t) => words[t]).join(' ');
  return (
    <section className="card">
      <div className="muted small">Bilde den Satz</div>
      <div className="prompt">{ex.de}</div>
      <div className="built" lang={pack.code}>{built || <span className="muted">Tippe die Wörter in der richtigen Reihenfolge</span>}</div>
      <div className="tiles">
        {words.map((w, idx) => (
          <button key={idx} lang={pack.code} className="tile-word" disabled={locked || tiles.includes(idx)} onClick={() => setTiles([...tiles, idx])}>{w}</button>
        ))}
      </div>
      {!locked && (
        <div className="row">
          <button className="btn" onClick={() => setTiles(tiles.slice(0, -1))} disabled={!tiles.length}>↩︎ Zurück</button>
          <button className="btn primary grow" disabled={tiles.length !== words.length} onClick={() => onAnswer(sameAnswer(built, ex.answer, pack.code), ex.answer)}>Prüfen</button>
        </div>
      )}
    </section>
  );
}
