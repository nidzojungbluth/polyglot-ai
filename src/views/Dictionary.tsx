import { useMemo, useState } from 'react';
import type { Ctx } from '../App';
import { PACKS, withScript } from '../data';
import type { LanguagePack, Register } from '../data/types';
import { LEVELS, REGISTER_INFO } from '../data/types';
import { normalize } from '../lib/text';
import { LevelBadge, RegBadge, SpeakBtn, WordHead } from './ui';

interface Entry { pack: LanguagePack; id: string; t: string; tr?: string; de: string; reg: Register; level?: string; ex?: string; extra?: string; local?: boolean; search: string }

export function Dictionary({ ctx }: { ctx: Ctx }) {
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  const [level, setLevel] = useState('');
  const [reg, setReg] = useState('');

  // Suchindex einmal pro Sprache aufbauen (schnell auch bei tausenden Einträgen)
  const index = useMemo(() => {
    const packs = all ? PACKS.map((p) => withScript(p, ctx.state.settings.srScript)) : [ctx.pack];
    const out: Entry[] = [];
    for (const p of packs) {
      for (const w of p.words) out.push({ pack: p, id: w.id, t: w.t, tr: w.tr, de: w.de, reg: w.reg, level: w.level, ex: w.ex ? `${w.ex.t} – ${w.ex.de}` : undefined, extra: w.note,
        search: normalize([w.t, w.tr, w.de].join(' ')) });
      for (const s of p.slang) out.push({ pack: p, id: s.id, t: s.t, tr: s.tr, de: s.de, reg: s.reg, level: s.level, local: s.local, ex: `${s.ex.t} – ${s.ex.de}`,
        extra: `${s.situation} · ${s.effect} · Neutral: ${s.formal}${s.status === 'älter' ? ' · eher veraltet' : ''}`, search: normalize([s.t, s.tr, s.de].join(' ')) });
    }
    return out;
  }, [all, ctx.pack, ctx.state.settings.srScript]);

  const results = useMemo(() => {
    const n = normalize(q);
    const filtered = index.filter((e) => (!level || e.level === level) && (!reg || e.reg === reg) && (!n || e.search.includes(n)));
    return { total: filtered.length, list: n.length >= 1 || level || reg ? filtered.slice(0, 80) : [] };
  }, [q, index, level, reg]);

  return (
    <div className="stack">
      <button className="back" onClick={() => ctx.go('more')}>‹ Mehr</button>
      <h1>Wörterbuch</h1>
      <p className="muted small">{index.length} Einträge {all ? 'in allen Sprachen' : `in ${ctx.pack.name}`}</p>
      <input className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Deutsch, Zielsprache oder Umschrift …" aria-label="Suche" autoCapitalize="off" />
      <div className="row wrap">
        <select className="select" value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Niveau">
          <option value="">Alle Niveaus</option>
          {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select className="select" value={reg} onChange={(e) => setReg(e.target.value)} aria-label="Register">
          <option value="">Alle Register</option>
          {Object.entries(REGISTER_INFO).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <label className="row small"><input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> In allen Sprachen suchen</label>
      {results.list.length > 0 && <p className="muted small">{results.total} Treffer{results.total > 80 ? ' (die ersten 80)' : ''}</p>}
      {(q || level || reg) && !results.total && <p className="muted">Nichts gefunden.</p>}
      <ul className="list card">
        {results.list.map((r) => (
          <li key={r.pack.code + r.id} className="word-row">
            <div className="grow">
              <span>{r.pack.flag}</span> <WordHead t={r.t} de={r.de} tr={r.tr} lang={r.pack.code} /> <RegBadge reg={r.reg} /> <LevelBadge level={r.level} />
              {r.local && <span className="badge local">📍 {r.pack.city}</span>}
              {r.ex && <div className="small muted">{r.ex}</div>}
              {r.extra && <div className="small note">💡 {r.extra}</div>}
            </div>
            <SpeakBtn text={r.t} pack={r.pack} />
          </li>
        ))}
      </ul>
    </div>
  );
}
