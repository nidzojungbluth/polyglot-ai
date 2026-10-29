import { useEffect, useRef, useState } from 'react';
import type { Ctx } from '../App';
import { buildAiInstructions, buildAiMessages, checkRules, ruleReply } from '../lib/coach';
import type { CoachMode, CoachMsg } from '../lib/store';
import { useCapability } from '../lib/platform';

type AiStatus = 'prüfe' | 'bereit' | 'aus' | 'nicht verfügbar';

export function Coach({ ctx }: { ctx: Ctx }) {
  const { state, pack, update, addActivity } = ctx;
  const { coachMode: mode, slang, aiEnabled, interests } = state.settings;
  const history = state.coach[pack.code] ?? [];
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState('');
  const [ai, setAi] = useState<AiStatus>('prüfe');
  const sampleRef = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    if (!aiEnabled) { setAi('aus'); return; }
    if (!ctx.claudeReady) { setAi('nicht verfügbar'); return; }
    useCapability('sample').then((s) => { if (!alive) return; sampleRef.current = s; setAi(s ? 'bereit' : 'nicht verfügbar'); });
    return () => { alive = false; };
  }, [aiEnabled, ctx.claudeReady]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [history.length, streaming]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const setSettings = (patch: Partial<typeof state.settings>) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  const push = (msgs: CoachMsg[]) => update((s) => {
    const list = [...(s.coach[pack.code] ?? []), ...msgs].slice(-40);
    return { ...s, coach: { ...s.coach, [pack.code]: list } };
  });

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    if (text.length > 1000) { push([{ role: 'assistant', content: 'Die Nachricht ist zu lang (max. 1000 Zeichen).', source: 'regel' }]); return; }
    setInput('');
    const userMsg: CoachMsg = { role: 'user', content: text };
    push([userMsg]);
    addActivity(1);

    // Typische Fehler immer lokal erfassen – so „merkt“ sich der Coach Schwächen.
    const hits = checkRules(pack, text);
    if (hits.length) update((s) => {
      const m = { ...s.mistakes };
      for (const h of hits) m[h.key] = { why: h.rule.why, lang: pack.code, count: (m[h.key]?.count ?? 0) + 1 };
      return { ...s, mistakes: m };
    });

    const sample = sampleRef.current;
    if (ai === 'bereit' && sample) {
      setBusy(true);
      setStreaming('…');
      const ac = new AbortController();
      abortRef.current = ac;
      try {
        const mistakes = Object.values(state.mistakes).filter((m) => m.lang === pack.code).sort((a, b) => b.count - a.count).slice(0, 4).map((m) => m.why);
        const instructions = buildAiInstructions({ pack, mode, slang, interests, mistakes });
        const res = await sample(buildAiMessages(instructions, history, text), {
          signal: ac.signal, cache: false, modelTier: 'quick',
          onText: ({ text: t }: { text: string }) => setStreaming(t),
        });
        push([{ role: 'assistant', content: res.text || '…', source: 'ki' }]);
      } catch (e: any) {
        if (e?.code === 'not_granted') setAi('nicht verfügbar');
        const why = e?.code === 'rate_limited' ? 'Die KI ist gerade ausgelastet (Nutzungslimit).' : 'Die KI ist gerade nicht erreichbar.';
        const r = ruleReply(pack, text, mode, slang);
        push([{ role: 'assistant', content: `${why} Antwort vom Regel-Coach:\n\n${r.text}`, source: 'regel' }]);
      } finally {
        setBusy(false); setStreaming(''); abortRef.current = null;
      }
      return;
    }
    const r = ruleReply(pack, text, mode, slang);
    push([{ role: 'assistant', content: r.text, source: 'regel' }]);
  };

  const quick = ai === 'bereit'
    ? [`Lass uns ein Rollenspiel im Café in ${pack.city} machen!`, 'Bring mir 3 Slang-Ausdrücke bei', 'Stell mir eine Frage zum Üben', 'Erklär mir den Unterschied zwischen formell und locker']
    : ['hilfe', 'slang', `was heißt danke`];

  return (
    <div className="coach">
      <div className={`coach-status ${ai === 'bereit' ? 'ai' : 'rules'}`}>
        {ai === 'bereit' && <>🤖 <b>Echte KI</b> (Claude) · online · nutzt dein bestehendes Claude-Konto, keine Zusatzkosten</>}
        {ai === 'prüfe' && <>⏳ Prüfe, ob die KI verfügbar ist …</>}
        {(ai === 'nicht verfügbar' || ai === 'aus') && <>📏 <b>Regel-Coach</b> · offline · <u>keine KI</u>: erkennt nur bekannte Fehler, Wörter und Slang aus dem Sprachpaket{ai === 'aus' ? ' (KI in den Einstellungen ausgeschaltet)' : ''}</>}
      </div>

      <div className="coach-controls">
        <div className="seg" role="radiogroup" aria-label="Gesprächsmodus">
          {([['lernen', 'Lernen'], ['alltag', 'Alltag'], ['immersion', 'Immersion']] as [CoachMode, string][]).map(([m, l]) => (
            <button key={m} role="radio" aria-checked={mode === m} className={mode === m ? 'on' : ''} onClick={() => setSettings({ coachMode: m })}>{l}</button>
          ))}
        </div>
        <label className="slider">
          <span className="small">Slang: <b>{['keiner', 'etwas', 'viel'][slang]}</b></span>
          <input type="range" min={0} max={2} step={1} value={slang} onChange={(e) => setSettings({ slang: Number(e.target.value) })} aria-label="Slang-Menge" />
        </label>
      </div>

      <div className="chat" aria-live="polite">
        {!history.length && (
          <div className="bubble assistant">
            {ai === 'bereit'
              ? `Hey! Ich bin dein Coach für ${pack.native}. Schreib mir einfach – auf ${pack.native} oder Deutsch. Ich korrigiere dich locker und zeig dir, wie man in ${pack.city} wirklich redet.`
              : `Hallo! Ich bin der Offline-Regel-Coach für ${pack.native}. Schreib einen Satz, ein Slang-Wort oder „hilfe“.`}
          </div>
        )}
        {history.map((m, idx) => (
          <div key={idx} className={`bubble ${m.role}`}>
            {m.content}
            {m.role === 'assistant' && <div className="src">{m.source === 'ki' ? 'KI-Antwort – kann Fehler enthalten' : 'Regel-Coach'}</div>}
          </div>
        ))}
        {streaming && <div className="bubble assistant">{streaming}</div>}
        <div ref={endRef} />
      </div>

      <div className="quick">
        {quick.map((q) => <button key={q} className="chip" onClick={() => send(q)} disabled={busy}>{q}</button>)}
        {history.length > 0 && <button className="chip" onClick={() => update((s) => ({ ...s, coach: { ...s.coach, [pack.code]: [] } }))}>🗑 Verlauf leeren</button>}
      </div>

      <form className="composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Schreib auf ${pack.native} oder Deutsch …`}
          lang={pack.code} autoCorrect="off" maxLength={1000} aria-label="Nachricht an den Coach" />
        {busy
          ? <button type="button" className="btn" onClick={() => abortRef.current?.abort()}>Stopp</button>
          : <button type="submit" className="btn primary" disabled={!input.trim()}>Senden</button>}
      </form>
    </div>
  );
}
