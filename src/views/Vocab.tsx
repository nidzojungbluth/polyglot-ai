import { useEffect, useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { dueTomorrowCount, isLearned, isNew, newCard, review, todayQueue, type Card, type Grade } from '../lib/srs';
import { newDoneToday, newLimit, today } from '../lib/store';
import { explainSlang } from '../lib/coach';
import { LEVELS } from '../data/types';
import { TOPICS } from '../data/curriculum';
import { ExampleBlock, LevelBadge, RegBadge, SpeakBtn, WordHead } from './ui';

interface Item { t: string; tr?: string; de: string; reg: any; level?: string; cat?: string; ex?: { t: string; de: string }; extra?: string }

export const isHard = (c: Card) => c.lapses >= 2 || (c.reps > 0 && c.ease < 2.1);

export function Vocab({ ctx, mode }: { ctx: Ctx; mode?: string }) {
  const { state, pack, update, addActivity } = ctx;
  const prefix = `${pack.code}-`;
  const [session, setSession] = useState<{ ids: string[]; dirs: ('zu-de' | 'zu-ziel')[]; title: string } | null>(null);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tab, setTab] = useState<'karten' | 'slang' | 'alle'>('karten');
  const [lv, setLv] = useState('');
  const [topic, setTopic] = useState('');

  const lookup = useMemo(() => {
    const m = new Map<string, Item>();
    for (const w of pack.words) m.set(w.id, { t: w.t, tr: w.tr, de: w.de, reg: w.reg, level: w.level, cat: w.cat, ex: w.ex, extra: w.note });
    for (const s of pack.slang) m.set(s.id, { t: s.t, tr: s.tr, de: s.de, reg: s.reg, level: s.level, cat: 'slang', ex: s.ex, extra: `Wirkung: ${s.effect}` });
    return m;
  }, [pack]);
  // Nur Karten zu Einträgen, die es (noch) gibt – alte Karten nach Korrekturen bleiben gespeichert, stören aber nicht.
  const known = (id: string) => lookup.has(id);
  const due = todayQueue(state.cards, known, { newLimit: newLimit(state), newDoneToday: newDoneToday(state) });
  const deck = Object.values(state.cards).filter((c) => c.id.startsWith(prefix) && known(c.id));
  const hard = deck.filter(isHard).sort((a, b) => b.lapses - a.lapses);
  const tomorrow = dueTomorrowCount(state.cards, known);
  const newWaiting = deck.filter((c) => isNew(c)).length;

  const slangAllowed = pack.slang.filter((s) => state.settings.slang >= 2 || s.reg !== 'vulgär');
  const slangMissing = slangAllowed.filter((s) => !state.cards[s.id]);

  const start = (all: string[], title: string) => {
    const ids = all.filter((id) => lookup.has(id));
    if (!ids.length) return;
    const pref = state.settings.cardDir;
    const dirs = ids.map((_, i) => (pref === 'gemischt' ? (i % 2 ? 'zu-ziel' : 'zu-de') : pref) as 'zu-de' | 'zu-ziel');
    setSession({ ids, dirs, title }); setPos(0); setFlipped(false);
  };

  // Direkt aus „Schwierige Wörter“ auf der Startseite
  useEffect(() => {
    if (mode === 'hard' && hard.length) start(hard.slice(0, 20).map((c) => c.id), 'Schwierige Wörter');
    // nur beim Öffnen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (session) {
    const id = session.ids[pos];
    const item = id ? lookup.get(id) : undefined;
    if (!item) {
      return (
        <div className="stack center">
          <div className="huge">✅</div>
          <h1>{session.title}: fertig!</h1>
          <p className="muted">{session.ids.length} Karten wiederholt.</p>
          <button className="btn primary big-btn" onClick={() => { setSession(null); setPos(0); }}>Zurück</button>
        </div>
      );
    }
    const dir = session.dirs[pos];
    const front = dir === 'zu-de' ? item.t : item.de;
    const grade = (g: Grade) => {
      update((s) => {
        const before = s.cards[id] ?? newCard(id);
        const day = today();
        const newDone = isNew(before) ? { day, n: (s.newDone?.day === day ? s.newDone.n : 0) + 1 } : s.newDone;
        return { ...s, newDone, cards: { ...s.cards, [id]: review(before, g) } };
      });
      addActivity(1);
      setFlipped(false);
      setPos(pos + 1);
    };
    return (
      <div className="stack">
        <div className="row between"><button className="back" onClick={() => setSession(null)}>✕</button><span className="muted small">{session.title} · {pos + 1} / {session.ids.length}</span></div>
        <button className="flashcard" onClick={() => setFlipped(true)} aria-label="Karte umdrehen">
          <div className="muted small">{dir === 'zu-de' ? 'Was bedeutet das?' : 'Wie heißt das in der Zielsprache?'}</div>
          <div className="prompt" lang={dir === 'zu-de' ? pack.code : 'de'}>{front}</div>
          {dir === 'zu-de' && item.tr && <div className="muted">{item.tr}</div>}
          {flipped ? (
            <div className="back-side">
              <div className="big" lang={dir === 'zu-de' ? 'de' : pack.code}>{dir === 'zu-de' ? item.de : item.t}</div>
              {dir === 'zu-ziel' && item.tr && <div className="muted">{item.tr}</div>}
              <div><RegBadge reg={item.reg} /> <LevelBadge level={item.level} /></div>
              <ExampleBlock ex={item.ex} lang={pack.code} />
              {item.extra && <div className="small muted pre">💡 {item.extra}</div>}
            </div>
          ) : <div className="muted small">Tippen zum Umdrehen</div>}
        </button>
        {(flipped || dir === 'zu-de') && <SpeakBtn text={item.t} pack={pack} label="🔊 Anhören" />}
        {flipped && (
          <div className="grades">
            <button className="btn g0" onClick={() => grade(0)}>Nochmal</button>
            <button className="btn g1" onClick={() => grade(1)}>Schwer</button>
            <button className="btn g2" onClick={() => grade(2)}>Gut</button>
            <button className="btn g3" onClick={() => grade(3)}>Leicht</button>
          </div>
        )}
      </div>
    );
  }

  const allIds = [...pack.words.map((w) => w.id)].filter((id) => {
    const it = lookup.get(id)!;
    return (!lv || it.level === lv) && (!topic || it.cat === topic);
  });

  return (
    <div className="stack">
      <h1>Vokabeln</h1>
      <section className="card">
        <div className="row between">
          <div><div className="big">{due.length}</div><div className="muted small">fällig</div></div>
          <div><div className="big">{deck.length}</div><div className="muted small">im Stapel</div></div>
          <div><div className="big">{deck.filter(isLearned).length}</div><div className="muted small">gelernt</div></div>
          <div><div className="big">{hard.length}</div><div className="muted small">schwierig</div></div>
        </div>
        <button className="btn primary big-btn" disabled={!due.length} onClick={() => start(due.slice(0, 30).map((c) => c.id), 'Wiederholung')}>
          {due.length ? `Jetzt wiederholen (${Math.min(30, due.length)})` : 'Nichts fällig – super!'}
        </button>
        <p className="muted small">Morgen fällig: {tomorrow} · Neue Karten heute: {newDoneToday(state)}{state.settings.newPerDay > 0 ? ` / ${state.settings.newPerDay}` : ''}{newWaiting > 0 ? ` · ${newWaiting} neue warten` : ''}</p>
        {hard.length > 0 && <button className="btn big-btn" onClick={() => start(hard.slice(0, 20).map((c) => c.id), 'Schwierige Wörter')}>🎯 Schwierige Wörter üben ({Math.min(20, hard.length)})</button>}
        <label className="field small">Abfragerichtung
          <div className="seg">
            {([['gemischt', 'Gemischt'], ['zu-de', 'Ziel → DE'], ['zu-ziel', 'DE → Ziel']] as const).map(([k, l]) => (
              <button key={k} className={state.settings.cardDir === k ? 'on' : ''} onClick={() => update((s) => ({ ...s, settings: { ...s.settings, cardDir: k } }))}>{l}</button>
            ))}
          </div>
        </label>
        <label className="field small">Neue Karten pro Tag
          <div className="seg">
            {([[10, '10'], [20, '20'], [30, '30'], [50, '50'], [0, 'alle']] as const).map(([k, l]) => (
              <button key={k} className={state.settings.newPerDay === k ? 'on' : ''} onClick={() => update((s) => ({ ...s, settings: { ...s.settings, newPerDay: k } }))}>{l}</button>
            ))}
          </div>
        </label>
        {!deck.length && <p className="muted small">Starte eine Lektion – ihre Wörter landen automatisch hier.</p>}
        <p className="fine">Spaced Repetition: Gut gekonnte Karten kommen in immer größeren Abständen wieder. Fehler aus Lektionen und „Nochmal“ holen Karten sofort zurück; oft vergessene Wörter landen bei „Schwierig“. Neue Karten kommen höchstens bis zum Tageslimit dazu, damit es nicht zu viel auf einmal wird.</p>
      </section>

      <div className="seg">
        {(['karten', 'slang', 'alle'] as const).map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{{ karten: 'Mein Stapel', slang: 'Slang', alle: 'Alle Wörter' }[t]}</button>)}
      </div>

      {tab === 'slang' && (
        <section className="card">
          <p className="small">Slang mit Erklärung zu Wirkung und Region. {state.settings.slang < 2 && 'Derbe Ausdrücke sind ausgeblendet (Slang-Regler im Coach auf „viel“ stellen).'}</p>
          {slangMissing.length > 0 && <button className="btn" onClick={() => update((s) => { const c = { ...s.cards }; for (const x of slangMissing) c[x.id] = newCard(x.id); return { ...s, cards: c }; })}>+ {slangMissing.length} Slang-Karten zum Stapel</button>}
          <ul className="list">
            {slangAllowed.map((s) => (
              <li key={s.id} className="word-row">
                <div className="grow">
                  <WordHead t={s.t} de={s.de} tr={s.tr} lang={pack.code} /> <RegBadge reg={s.reg} /> {s.local && <span className="badge local">📍 {pack.city}</span>} {s.status === 'älter' && <span className="badge">älter</span>}
                  <div className="small pre">{explainSlang(s).split('\n').slice(1).filter((l) => !l.startsWith('• Beispiel')).join('\n')}</div>
                  <ExampleBlock ex={s.ex} lang={pack.code} pack={pack} />
                </div>
                <SpeakBtn text={s.t} pack={pack} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {tab !== 'slang' && (
        <section className="card">
          {tab === 'alle' && (
            <div className="row wrap">
              <select className="select" value={lv} onChange={(e) => setLv(e.target.value)} aria-label="Niveau"><option value="">Alle Niveaus</option>{LEVELS.map((l) => <option key={l}>{l}</option>)}</select>
              <select className="select" value={topic} onChange={(e) => setTopic(e.target.value)} aria-label="Thema"><option value="">Alle Themen</option>{TOPICS.map((t) => <option key={t.key} value={t.key}>{t.title}</option>)}</select>
              <span className="muted small">{allIds.length} Wörter</span>
            </div>
          )}
          <ul className="list">
            {(tab === 'alle' ? allIds.slice(0, 200) : deck.map((c) => c.id)).map((id) => {
              const it = lookup.get(id); if (!it) return null;
              const c = state.cards[id];
              return (
                <li key={id} className="word-row">
                  <div className="grow"><WordHead t={it.t} de={it.de} tr={it.tr} lang={pack.code} /><div className="small"><RegBadge reg={it.reg} /> <LevelBadge level={it.level} /></div><ExampleBlock ex={it.ex} lang={pack.code} pack={pack} /></div>
                  {c && <span className="muted small">{isLearned(c) ? '✓' : isHard(c) ? '🎯' : `${c.interval} T.`}</span>}
                  <SpeakBtn text={it.t} pack={pack} />
                </li>
              );
            })}
          </ul>
          {tab === 'alle' && allIds.length > 200 && <p className="muted small">… die ersten 200 – nutze die Filter oder das Wörterbuch.</p>}
          {tab === 'karten' && !deck.length && <p className="muted">Noch leer.</p>}
        </section>
      )}
    </div>
  );
}
