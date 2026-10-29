import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { dueCards, isLearned, newCard, review, type Grade } from '../lib/srs';
import { explainSlang } from '../lib/coach';
import { RegBadge, SpeakBtn } from './ui';

export function Vocab({ ctx }: { ctx: Ctx }) {
  const { state, pack, update, addActivity } = ctx;
  const prefix = `${pack.code}-`;
  const [session, setSession] = useState<string[] | null>(null);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tab, setTab] = useState<'karten' | 'slang' | 'alle'>('karten');

  const due = dueCards(state.cards, prefix);
  const deck = Object.values(state.cards).filter((c) => c.id.startsWith(prefix));
  const lookup = useMemo(() => {
    const m = new Map<string, { t: string; tr?: string; de: string; reg: any; extra?: string }>();
    for (const w of pack.words) m.set(w.id, { t: w.t, tr: w.tr, de: w.de, reg: w.reg, extra: w.ex ? `${w.ex.t} – ${w.ex.de}` : undefined });
    for (const s of pack.slang) m.set(s.id, { t: s.t, tr: s.tr, de: s.de, reg: s.reg, extra: `${s.ex.t} – ${s.ex.de}\nWirkung: ${s.effect}` });
    return m;
  }, [pack]);

  const slangAllowed = pack.slang.filter((s) => state.settings.slang >= 2 || s.reg !== 'vulgär');
  const slangMissing = slangAllowed.filter((s) => !state.cards[s.id]);

  if (session) {
    const id = session[pos];
    const item = id ? lookup.get(id) : undefined;
    if (!item) {
      return (
        <div className="stack center">
          <div className="huge">✅</div>
          <h1>Wiederholung fertig!</h1>
          <p className="muted">{session.length} Karten wiederholt.</p>
          <button className="btn primary big-btn" onClick={() => { setSession(null); setPos(0); }}>Zurück</button>
        </div>
      );
    }
    const grade = (g: Grade) => {
      update((s) => ({ ...s, cards: { ...s.cards, [id]: review(s.cards[id] ?? newCard(id), g) } }));
      addActivity(1);
      setFlipped(false);
      setPos(pos + 1);
    };
    return (
      <div className="stack">
        <div className="row between"><button className="back" onClick={() => setSession(null)}>✕</button><span className="muted small">{pos + 1} / {session.length}</span></div>
        <button className="flashcard" onClick={() => setFlipped(true)} aria-label="Karte umdrehen">
          <div className="prompt" lang={pack.code}>{item.t}</div>
          {item.tr && <div className="muted">{item.tr}</div>}
          {flipped ? (
            <div className="back-side">
              <div className="big">{item.de}</div>
              <RegBadge reg={item.reg} />
              {item.extra && <div className="small muted pre">{item.extra}</div>}
            </div>
          ) : <div className="muted small">Tippen zum Umdrehen</div>}
        </button>
        <SpeakBtn text={item.t} pack={pack} label="🔊 Anhören" />
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

  return (
    <div className="stack">
      <h1>Vokabeln</h1>
      <section className="card">
        <div className="row between">
          <div><div className="big">{due.length}</div><div className="muted small">fällig</div></div>
          <div><div className="big">{deck.length}</div><div className="muted small">im Stapel</div></div>
          <div><div className="big">{deck.filter(isLearned).length}</div><div className="muted small">gelernt</div></div>
        </div>
        <button className="btn primary big-btn" disabled={!due.length} onClick={() => { setSession(due.slice(0, 30).map((c) => c.id)); setPos(0); setFlipped(false); }}>
          {due.length ? `Jetzt wiederholen (${Math.min(30, due.length)})` : 'Nichts fällig – super!'}
        </button>
        {!deck.length && <p className="muted small">Starte eine Lektion – ihre Wörter landen automatisch hier.</p>}
        <p className="fine">Spaced Repetition: Karten, die du gut kannst, kommen in immer größeren Abständen wieder. Schwierige kommen schnell zurück.</p>
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
                  <b lang={pack.code}>{s.t}</b> <RegBadge reg={s.reg} />
                  <div className="small pre">{explainSlang(s).split('\n').slice(1).join('\n')}</div>
                </div>
                <SpeakBtn text={s.t} pack={pack} />
              </li>
            ))}
          </ul>
        </section>
      )}
      {tab !== 'slang' && (
        <section className="card">
          <ul className="list">
            {(tab === 'alle' ? pack.words.map((w) => w.id) : deck.map((c) => c.id)).map((id) => {
              const it = lookup.get(id); if (!it) return null;
              const c = state.cards[id];
              return (
                <li key={id} className="word-row">
                  <div className="grow"><b lang={pack.code}>{it.t}</b>{it.tr && <span className="muted"> · {it.tr}</span>}<div className="small">{it.de} <RegBadge reg={it.reg} /></div></div>
                  {c && <span className="muted small">{isLearned(c) ? '✓' : `${c.interval} T.`}</span>}
                  <SpeakBtn text={it.t} pack={pack} />
                </li>
              );
            })}
          </ul>
          {tab === 'karten' && !deck.length && <p className="muted">Noch leer.</p>}
        </section>
      )}
    </div>
  );
}
