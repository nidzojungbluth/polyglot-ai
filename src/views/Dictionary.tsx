import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { PACKS } from '../data';
import { normalize } from '../lib/text';
import { RegBadge, SpeakBtn } from './ui';

export function Dictionary({ ctx }: { ctx: Ctx }) {
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  const packs = all ? PACKS : [ctx.pack];

  const results = useMemo(() => {
    const n = normalize(q);
    if (n.length < 2) return [];
    const out: { pack: typeof PACKS[number]; id: string; t: string; tr?: string; de: string; reg: any; ex?: string; slang: boolean }[] = [];
    for (const p of packs) {
      for (const w of p.words) if ([w.t, w.de, w.tr ?? ''].some((x) => normalize(x).includes(n))) out.push({ pack: p, id: w.id, t: w.t, tr: w.tr, de: w.de, reg: w.reg, ex: w.ex ? `${w.ex.t} – ${w.ex.de}` : undefined, slang: false });
      for (const s of p.slang) if ([s.t, s.de, s.tr ?? ''].some((x) => normalize(x).includes(n))) out.push({ pack: p, id: s.id, t: s.t, tr: s.tr, de: s.de, reg: s.reg, ex: `${s.ex.t} – ${s.ex.de} · Neutral: ${s.formal}`, slang: true });
    }
    return out.slice(0, 60);
  }, [q, packs]);

  return (
    <div className="stack">
      <button className="back" onClick={() => ctx.go('more')}>‹ Mehr</button>
      <h1>Wörterbuch</h1>
      <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Deutsch oder Zielsprache eingeben …" aria-label="Suche" autoCapitalize="off" />
      <label className="row small"><input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> In allen Sprachen suchen</label>
      {q.length >= 2 && !results.length && <p className="muted">Nichts gefunden. Das Wörterbuch enthält bisher nur die Wörter der Sprachpakete.</p>}
      <ul className="list card">
        {results.map((r) => (
          <li key={r.id} className="word-row">
            <div className="grow">
              <span>{r.pack.flag}</span> <b lang={r.pack.code}>{r.t}</b>{r.tr && <span className="muted"> · {r.tr}</span>} <RegBadge reg={r.reg} />
              <div className="small">{r.de}</div>
              {r.ex && <div className="small muted">{r.ex}</div>}
            </div>
            <SpeakBtn text={r.t} pack={r.pack} />
          </li>
        ))}
      </ul>
    </div>
  );
}
