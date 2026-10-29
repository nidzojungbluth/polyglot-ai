import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { buildLessonExercises, type Exercise } from '../lib/exercises';
import { newCard } from '../lib/srs';
import { matches, normalize } from '../lib/text';
import { speak } from '../lib/platform';
import { ProgressBar, RegBadge, SpeakBtn } from './ui';

export function LessonPlayer({ ctx, lessonId }: { ctx: Ctx; lessonId: string }) {
  const { pack, update, addActivity, go } = ctx;
  const lesson = pack.lessons.find((l) => l.id === lessonId);
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'done'>('intro');
  const [seed, setSeed] = useState(0);
  const exercises = useMemo(() => (lesson ? buildLessonExercises(pack, lesson) : []), [lesson, pack, seed]);
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState<null | { ok: boolean; answer: string }>(null);

  if (!lesson) return <div className="card">Diese Lektion gibt es in {pack.name} nicht. <button className="btn" onClick={() => go('home')}>Zum Start</button></div>;
  const words = lesson.words.map((id) => pack.words.find((w) => w.id === id)!).filter(Boolean);

  const answer = (ok: boolean, right: string) => {
    if (feedback) return;
    setFeedback({ ok, answer: right });
    if (ok) setCorrect((c) => c + 1);
    addActivity(1);
  };
  const next = () => {
    setFeedback(null);
    if (i + 1 < exercises.length) { setI(i + 1); return; }
    const score = Math.round(((correct) / exercises.length) * 100);
    update((s) => {
      const cards = { ...s.cards };
      for (const w of words) if (!cards[w.id]) cards[w.id] = newCard(w.id);
      const prev = s.lessons[lesson.id]?.best ?? 0;
      return { ...s, cards, lessons: { ...s.lessons, [lesson.id]: { best: Math.max(prev, score), doneAt: Date.now() } } };
    });
    setPhase('done');
  };

  if (phase === 'intro') {
    return (
      <div className="stack">
        <button className="back" onClick={() => go('home')}>‹ Zurück</button>
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.goal}</p>
        <section className="card">
          <h2>{lesson.grammar.title}</h2>
          <p>{lesson.grammar.text}</p>
        </section>
        <section className="card">
          <h2>Neue Wörter ({words.length})</h2>
          <ul className="list">
            {words.map((w) => (
              <li key={w.id} className="word-row">
                <div className="grow">
                  <b lang={pack.code}>{w.t}</b>{w.tr && <span className="muted"> · {w.tr}</span>}
                  <div className="small">{w.de} <RegBadge reg={w.reg} /></div>
                  {w.ex && <div className="small muted"><i lang={pack.code}>{w.ex.t}</i> – {w.ex.de}</div>}
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
        <p className="muted">Die Wörter dieser Lektion sind jetzt in deinen Vokabelkarten und kommen zur richtigen Zeit wieder.</p>
        <button className="btn primary big-btn" onClick={() => go('home')}>Fertig</button>
        <button className="btn" onClick={() => { setSeed(seed + 1); setI(0); setCorrect(0); setPhase('quiz'); }}>Nochmal üben</button>
      </div>
    );
  }

  const ex = exercises[i];
  return (
    <div className="stack">
      <div className="row between">
        <button className="back" onClick={() => go('home')}>✕</button>
        <span className="muted small">{i + 1} / {exercises.length}</span>
      </div>
      <ProgressBar value={i} max={exercises.length} />
      <ExerciseView key={`${seed}-${i}`} ex={ex} ctx={ctx} onAnswer={answer} locked={!!feedback} />
      {feedback && (
        <div className={`feedback ${feedback.ok ? 'ok' : 'bad'}`} role="status">
          <b>{feedback.ok ? 'Richtig! ✅' : 'Nicht ganz.'}</b>
          {!feedback.ok && <div>Richtig wäre: <b lang={pack.code}>{feedback.answer}</b></div>}
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

  if (ex.kind === 'mc' || ex.kind === 'listen') {
    return (
      <section className="card">
        {ex.kind === 'mc' ? (
          <>
            <div className="muted small">Was bedeutet das?</div>
            <div className="prompt" lang={/[a-zA-Z]/.test(ex.prompt) || ex.sub ? pack.code : 'de'}>{ex.prompt} {ex.speak && <SpeakBtn text={ex.speak} pack={pack} />}</div>
            {ex.sub && <div className="muted">{ex.sub}</div>}
          </>
        ) : (
          <>
            <div className="muted small">Hör zu und wähle, was du hörst</div>
            <button className="btn big-btn" onClick={() => speak(ex.speak, pack.speechLang, pack.speechFallback)}>🔊 Abspielen</button>
            <button className="btn small-btn" onClick={() => speak(ex.speak, pack.speechLang, pack.speechFallback, 0.6)}>🐢 Langsam</button>
          </>
        )}
        <div className="options">
          {ex.options.map((o) => (
            <button key={o} className={`opt ${optClass(o, ex.answer)}`} disabled={locked && !chosen} onClick={() => choose(o, ex.answer)}>{o}</button>
          ))}
        </div>
      </section>
    );
  }

  if (ex.kind === 'cloze' || ex.kind === 'translate') {
    const right = ex.answer;
    const submit = (e: React.FormEvent) => {
      e.preventDefault();
      if (locked || !text.trim()) return;
      onAnswer(ex.kind === 'cloze' ? normalize(text) === normalize(right) : matches(text, right), right);
    };
    return (
      <form className="card" onSubmit={submit}>
        <div className="muted small">{ex.kind === 'cloze' ? 'Ergänze die Lücke' : 'Übersetze in die Zielsprache'}</div>
        <div className="prompt" lang={ex.kind === 'cloze' ? pack.code : 'de'}>{ex.kind === 'cloze' ? ex.prompt : ex.de}</div>
        {ex.kind === 'cloze' && <div className="muted">{ex.de}</div>}
        <input className="input" value={text} onChange={(e) => setText(e.target.value)} disabled={locked}
          autoCapitalize="off" autoCorrect="off" spellCheck={false} lang={pack.code} placeholder="Deine Antwort" aria-label="Antwort" />
        {ex.kind === 'translate' && ex.hint && !locked && <div className="muted small">Tipp: beginnt mit „{ex.hint}“</div>}
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
          <button key={idx} className="tile-word" disabled={locked || tiles.includes(idx)} onClick={() => setTiles([...tiles, idx])}>{w}</button>
        ))}
      </div>
      {!locked && (
        <div className="row">
          <button className="btn" onClick={() => setTiles(tiles.slice(0, -1))} disabled={!tiles.length}>↩︎ Zurück</button>
          <button className="btn primary grow" disabled={tiles.length !== words.length} onClick={() => onAnswer(normalize(built) === normalize(ex.answer), ex.answer)}>Prüfen</button>
        </div>
      )}
    </section>
  );
}
