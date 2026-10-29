import { useState } from 'react';
import type { Ctx } from '../App';
import type { RoleOption, Roleplay } from '../data/types';
import { RegBadge, SpeakBtn } from './ui';

interface Turn { npc: string; npcDe: string; pick?: RoleOption }

export function Roleplays({ ctx }: { ctx: Ctx }) {
  const { pack, state } = ctx;
  const [active, setActive] = useState<Roleplay | null>(null);
  if (active) return <Player ctx={ctx} rp={active} onExit={() => setActive(null)} />;

  return (
    <div className="stack">
      <h1>Rollenspiele</h1>
      <p className="muted">Echte Situationen in {pack.city}. Jede Antwort zeigt ihr Sprachregister – und der Coach sagt dir, wie sie ankommt.</p>
      <ul className="list card">
        {pack.roleplays.map((r) => (
          <li key={r.id}>
            <button className="list-btn" onClick={() => setActive(r)}>
              <span className="num">🎭</span>
              <span className="grow"><b>{r.title}</b><br /><span className="muted small">{r.scene}</span></span>
              {state.roleplays[r.id] ? <span className="muted small">{state.roleplays[r.id]}×</span> : null}
            </button>
          </li>
        ))}
      </ul>
      <section className="card">
        <h2>Weitere Szenen</h2>
        <p className="small">Bewerbungsgespräch, Wohnungssuche, Dating, Telefonate oder Reisen kannst du frei mit dem <button className="link" onClick={() => ctx.go('coach')}>KI-Coach</button> spielen – schreib z. B. „Lass uns ein Bewerbungsgespräch spielen“. Vorbereitete Offline-Szenen dafür folgen in späteren Versionen.</p>
      </section>
    </div>
  );
}

function Player({ ctx, rp, onExit }: { ctx: Ctx; rp: Roleplay; onExit: () => void }) {
  const { pack, state, update, addActivity } = ctx;
  const showDe = state.settings.coachMode === 'lernen';
  const [nodeId, setNodeId] = useState<string | null>(rp.start);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [reveal, setReveal] = useState<Record<number, boolean>>({});
  const node = nodeId ? rp.nodes[nodeId] : null;

  const pick = (o: RoleOption) => {
    if (!node) return;
    setTurns([...turns, { npc: node.npc, npcDe: node.npcDe, pick: o }]);
    addActivity(1);
    if (!o.next) update((s) => ({ ...s, roleplays: { ...s.roleplays, [rp.id]: (s.roleplays[rp.id] ?? 0) + 1 } }));
    setNodeId(o.next);
  };

  return (
    <div className="stack">
      <button className="back" onClick={onExit}>‹ Alle Rollenspiele</button>
      <h1>{rp.title}</h1>
      <p className="muted small">{rp.scene}</p>
      <div className="chat">
        {turns.map((t, idx) => (
          <div key={idx}>
            <Npc text={t.npc} de={t.npcDe} show={showDe || reveal[idx]} onReveal={() => setReveal({ ...reveal, [idx]: true })} ctx={ctx} />
            {t.pick && (
              <>
                <div className="bubble user" lang={pack.code}>{t.pick.t}<div className="src"><RegBadge reg={t.pick.reg} /> {t.pick.de}</div></div>
                {t.pick.note && <div className="coach-note">🧑‍🏫 {t.pick.note}</div>}
              </>
            )}
          </div>
        ))}
        {node && <Npc text={node.npc} de={node.npcDe} show={showDe || reveal[-1]} onReveal={() => setReveal({ ...reveal, [-1]: true })} ctx={ctx} />}
      </div>
      {node ? (
        <div className="options">
          {node.options.map((o, k) => (
            <button key={k} className="opt left" onClick={() => { setReveal({}); pick(o); }}>
              <span lang={pack.code}>{o.t}</span>
              <span className="small muted"><RegBadge reg={o.reg} /> {o.de}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="card center">
          <div className="huge">🎬</div>
          <b>Szene geschafft!</b>
          <div className="row">
            <button className="btn" onClick={() => { setTurns([]); setNodeId(rp.start); setReveal({}); }}>Andere Antworten probieren</button>
            <button className="btn primary" onClick={onExit}>Fertig</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Npc({ text, de, show, onReveal, ctx }: { text: string; de: string; show: boolean; onReveal: () => void; ctx: Ctx }) {
  const isAction = text.startsWith('(');
  return (
    <div className={`bubble assistant ${isAction ? 'action' : ''}`}>
      <span lang={isAction ? 'de' : ctx.pack.code}>{text}</span> {!isAction && <SpeakBtn text={text} pack={ctx.pack} />}
      {de && (show ? <div className="src">{de}</div> : <button className="link small" onClick={onReveal}>Übersetzung zeigen</button>)}
    </div>
  );
}
