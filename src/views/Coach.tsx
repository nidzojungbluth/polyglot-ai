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
  const [panel, setPanel] = useState(false);
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
    ? [`Rollenspiel im Café in ${pack.city}`, 'Bring mir 3 Slang-Ausdrücke bei', 'Stell mir eine Übungsfrage', 'Formell oder locker?']
    : ['hilfe', 'slang', 'was heißt danke'];
  const modeLabel = { lernen: 'Lernen', alltag: 'Alltag', immersion: 'Immersion' }[mode];
  const slangLabel = ['kein Slang', 'etwas Slang', 'viel Slang'][slang] ?? '';

  return (
    <div className="coach">
      <header className="coach-head">
        <div className="coach-title">
          <span className="coach-sub">{pack.name} · {pack.city}</span>
          <h1>Coach</h1>
        </div>
        <button type="button" className="coach-gear" aria-label="Coach-Einstellungen" aria-expanded={panel} onClick={() => setPanel(!panel)}>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
        </button>
      </header>

      <div className={`coach-status ${ai === 'bereit' ? 'ai' : 'rules'}`} role="status">
        <span className="dot" aria-hidden="true" />
        {ai === 'bereit' && <span><b>Echte KI</b> (Claude) · online · {modeLabel} · {slangLabel}</span>}
        {ai === 'prüfe' && <span>Prüfe, ob die KI verfügbar ist …</span>}
        {(ai === 'nicht verfügbar' || ai === 'aus') && <span><b>Regel-Coach</b> · offline · <u>keine KI</u>{ai === 'aus' ? ' (in den Einstellungen ausgeschaltet)' : ''} · erkennt nur bekannte Fehler, Wörter und Slang</span>}
      </div>

      <div className="seg" role="radiogroup" aria-label="Gesprächsmodus">
        {([['lernen', 'Lernen'], ['alltag', 'Alltag'], ['immersion', 'Immersion']] as [CoachMode, string][]).map(([m, l]) => (
          <button key={m} role="radio" aria-checked={mode === m} className={mode === m ? 'on' : ''} onClick={() => setSettings({ coachMode: m })}>{l}</button>
        ))}
      </div>

      {panel && (
        <section className="card coach-panel" aria-label="Coach-Einstellungen">
          <div className="field">Slang-Menge
            <div className="seg" role="radiogroup" aria-label="Slang-Menge">
              {['Keiner', 'Etwas', 'Viel'].map((l, i) => (
                <button key={l} role="radio" aria-checked={slang === i} className={slang === i ? 'on' : ''} onClick={() => setSettings({ slang: i })}>{l}</button>
              ))}
            </div>
          </div>
          <p className="fine">Lernen: einfache Sätze mit Erklärung auf Deutsch · Alltag: locker wie unter Freunden · Immersion: nur Zielsprache.</p>
          <div className="row wrap">
            <button className="btn" disabled={!history.length} onClick={() => { update((s) => ({ ...s, coach: { ...s.coach, [pack.code]: [] } })); setPanel(false); }}>Verlauf leeren</button>
            <button className="btn" onClick={() => ctx.go('settings')}>KI & Interessen …</button>
          </div>
        </section>
      )}

      <div className="chat" aria-live="polite">
        {!history.length && (
          <div className="msg assistant">
            <div className="bubble assistant">
              {ai === 'bereit'
                ? `Hey! Ich bin dein Coach für ${pack.native}. Schreib mir einfach – auf ${pack.native} oder Deutsch. Ich korrigiere dich locker und zeig dir, wie man in ${pack.city} wirklich redet.`
                : `Hallo! Ich bin der Offline-Regel-Coach für ${pack.native}. Schreib einen Satz, ein Slang-Wort oder „hilfe“.`}
            </div>
          </div>
        )}
        {history.map((m, idx) => (
          <div key={idx} className={`msg ${m.role}`}>
            {m.role === 'assistant' ? <AssistantBubble text={m.content} /> : <div className="bubble user">{m.content}</div>}
            {m.role === 'assistant' && <div className="src">{m.source === 'ki' ? 'KI-Antwort – kann Fehler enthalten' : 'Regel-Coach'}</div>}
          </div>
        ))}
        {streaming && <div className="msg assistant"><div className="bubble assistant">{streaming}</div></div>}
        <div ref={endRef} />
      </div>

      <div className="coach-bottom">
        <div className="quick">
          {quick.map((q) => <button key={q} className="chip" onClick={() => send(q)} disabled={busy}>{q}</button>)}
        </div>
        <form className="composer" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Nachricht auf ${pack.native} oder Deutsch`}
            lang={pack.code} autoCorrect="off" maxLength={1000} aria-label="Nachricht an den Coach" enterKeyHint="send" />
          {busy
            ? <button type="button" className="send stop" aria-label="Stopp" onClick={() => abortRef.current?.abort()}>
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2.5" /></svg>
              </button>
            : <button type="submit" className="send" aria-label="Senden" disabled={!input.trim()}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
              </button>}
        </form>
      </div>
    </div>
  );
}

/**
 * Antwort des Coachs. Absätze, die mit ✏️ beginnen (Korrekturen von KI und Regel-Coach),
 * werden als eigener Bereich „Besser so“ oben in der Blase gezeigt – wie im Entwurf A.
 */
function AssistantBubble({ text }: { text: string }) {
  const parts = text.split(/\n\s*\n/);
  const fixes = parts.filter((p) => p.trim().startsWith('✏️')).map((p) => p.trim().replace(/^✏️\s*(Besser:\s*)?/, ''));
  const rest = parts.filter((p) => !p.trim().startsWith('✏️')).join('\n\n').trim();
  if (!fixes.length) return <div className="bubble assistant">{text}</div>;
  return (
    <div className="bubble assistant has-fix">
      {fixes.map((f, i) => {
        const [first, ...more] = f.split('\n');
        return (
          <div key={i} className="fix">
            <span className="fix-label">Besser so</span>
            <b className="fix-main">{first}</b>
            {more.length > 0 && <span className="fix-why">{more.join('\n')}</span>}
          </div>
        );
      })}
      {rest && <div className="fix-rest">{rest}</div>}
    </div>
  );
}
