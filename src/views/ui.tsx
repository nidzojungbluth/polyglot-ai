import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Ctx } from '../App';
import { REPORT_KINDS, type ReportKind } from '../lib/store';
import type { Register } from '../data/types';
import { REGISTER_INFO } from '../data/types';
import { sayFor } from '../lib/platform';
import type { LanguagePack } from '../data/types';

/** Wort mit deutscher Übersetzung direkt daneben, danach die Umschrift. */
export function WordHead({ t, de, tr, lang }: { t: string; de: string; tr?: string; lang: string }) {
  return (
    <>
      <b lang={lang}>{t}</b> <span className="de-inline">– {de}</span>
      {tr && <span className="muted"> · {tr}</span>}
    </>
  );
}

/** Beispielsatz mit deutscher Übersetzung – klar von der Wortübersetzung abgesetzt. */
export function ExampleBlock({ ex, lang, pack }: { ex?: { t: string; de: string; tr?: string }; lang: string; pack?: LanguagePack }) {
  if (!ex) return null;
  return (
    <div className="ex-block">
      <div className="ex-head">
        <span className="ex-label">Beispielsatz</span>
        {pack && <SpeakBtn text={ex.t} pack={pack} />}
      </div>
      <div className="ex-t" lang={lang}>{ex.t}</div>
      {ex.tr && ex.tr !== ex.t && (
        <>
          <div className="ex-label">{/[\u0400-\u04FF]/.test(ex.tr) ? 'Kyrillische Schreibweise' : 'Umschrift'}</div>
          <div className="ex-tr">{ex.tr}</div>
        </>
      )}
      <div className="ex-label">Deutsche Übersetzung</div>
      <div className="ex-de" lang="de">{ex.de}</div>
    </div>
  );
}

export function RegBadge({ reg }: { reg: Register }) {
  const r = REGISTER_INFO[reg];
  return <span className="badge" style={{ borderColor: r.color, color: r.color }}>{r.label}</span>;
}

export function SpeakBtn({ text, pack, label }: { text: string; pack: LanguagePack; label?: string }) {
  return (
    <button className={`icon-btn ${label ? 'with-label' : ''}`} aria-label={`Vorlesen: ${text}`} onClick={(e) => { e.stopPropagation(); sayFor(pack, text); }}>
      <Icon name="speaker" size={18} />{label && <span>{label}</span>}
    </button>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${pct}%` }} /></div>;
}

/**
 * Einheitliche Linien-Symbole (eigene SVGs im Stil von SF Symbols, keine Bibliothek).
 * Sie übernehmen die Textfarbe; Größe über `size`. Rein dekorativ, außer `label` ist gesetzt.
 */
const ICONS: Record<string, React.ReactNode> = {
  speaker: <><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" /><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" /></>,
  slow: <><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" /><path d="M15.5 9.8a3 3 0 0 1 0 4.4" /></>,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  xmark: <path d="M6 6l12 12M18 6L6 18" />,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" /></>,
  flame: <path d="M12 3c.5 3-2 4.6-2 7.2 0 1.2.7 2 1.6 2.3-.3-1.6.6-2.7 1.8-3.6.3 2.6 2.6 3.4 2.6 6.1A5 5 0 0 1 12 20a5.6 5.6 0 0 1-5.6-5.6C6.4 9.6 11 7.6 12 3z" />,
  book: <><path d="M4 5.2c2.6-1 5.3-.9 8 .6v14c-2.7-1.5-5.4-1.6-8-.6z" /><path d="M20 5.2c-2.6-1-5.3-.9-8 .6v14c2.7-1.5 5.4-1.6 8-.6z" /></>,
  cards: <><rect x="6.5" y="3.5" width="13" height="16" rx="2.5" /><path d="M4 7.2v11.3A2.5 2.5 0 0 0 6.5 21h9" /></>,
  chat: <path d="M12 3.8c4.8 0 8.5 3.1 8.5 7.1S16.8 18 12 18c-.9 0-1.8-.1-2.6-.3L5 20l.9-3.6C4.4 15 3.5 13.1 3.5 10.9c0-4 3.7-7.1 8.5-7.1z" />,
  dialog: <><path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h8a2.5 2.5 0 0 1 2.5 2.5v4A2.5 2.5 0 0 1 14 13H9l-3.5 3v-3H6a2.5 2.5 0 0 1-2.5-2.5z" /><path d="M19 9.5a2 2 0 0 1 1.5 2v4a2 2 0 0 1-2 2h-.5v2.5L15 17.5h-3.5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.4 3.4 5.2 3.4 8.5s-1 6.1-3.4 8.5c-2.4-2.4-3.4-5.2-3.4-8.5s1-6.1 3.4-8.5z" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></>,
  chart: <path d="M5 19V11M10 19V5M15 19v-6M20 19V9" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></>,
  pin: <><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.4 6.5 11 6.5 11z" /><circle cx="12" cy="10" r="2.3" /></>,
  download: <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" /></>,
  cloud: <path d="M7.5 18.5h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.6 9.3 4.6 4.6 0 0 0 7.5 18.5z" />,
  letters: <><path d="M3.5 18 8 6l4.5 12M5.2 13.5h5.6" /><path d="M14.5 12.2c.6-1.1 1.6-1.7 2.9-1.7 1.8 0 2.8 1 2.8 2.8V18M20.2 14.6h-2.5c-1.6 0-2.7.7-2.7 1.8s.8 1.8 2 1.8c1.6 0 3.2-1 3.2-2.8" /></>,
  pencil: <path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" />,
  repeat: <><path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19l-3-3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5l3 3" /></>,
  sparkle: <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />,
  warning: <><path d="M12 4 21 19.5H3z" /><path d="M12 10v4.5M12 17.3v.2" /></>,
  flag: <path d="M5.5 21V4M5.5 4.5h11l-2 4 2 4h-11" />,
  chevron: <path d="M9.5 6l6 6-6 6" />,
  clipboard: <><rect x="5.5" y="4.5" width="13" height="16" rx="2.5" /><path d="M9 4.5h6v2.5H9zM8.5 11h7M8.5 14.5h7" /></>,
};
export type IconName = keyof typeof ICONS;
export function Icon({ name, size = 20, label, className }: { name: IconName; size?: number; label?: string; className?: string }) {
  return (
    <svg className={`icon ${className ?? ''}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {ICONS[name]}
    </svg>
  );
}

/** Großes Ergebnis-Symbol am Ende einer Lektion/Wiederholung (statt Emoji). */
export function ResultBadge({ score }: { score: number }) {
  const tone = score >= 80 ? 'good' : score >= 50 ? 'mid' : 'low';
  return (
    <div className={`result-badge ${tone}`} aria-hidden="true">
      <Icon name={score >= 50 ? 'check' : 'repeat'} size={40} />
    </div>
  );
}

/** Aktivitätsring wie bei Apple Fitness: zeigt den Anteil am Tagesziel. */
export function Ring({ value, max, size = 76, children }: { value: number; max: number; size?: number; children?: React.ReactNode }) {
  const r = 32; const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }} role="img" aria-label={`${Math.round(pct * 100)} Prozent des Tagesziels`}>
      <svg className="ring" viewBox="0 0 80 80" style={{ width: size, height: size, transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7a78f0" /><stop offset="1" stopColor="#5856d6" /></linearGradient>
        </defs>
        <circle className="track" cx="40" cy="40" r={r} />
        {pct > 0 && <circle className="value" cx="40" cy="40" r={r} strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />}
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: '1.25rem' }}>{children}</div>}
    </div>
  );
}

export function LevelBadge({ level }: { level?: string }) {
  return level ? <span className="badge level">{level}</span> : null;
}

export function AiNotice() {
  return <p className="fine">Inhalte von KI erstellt und sorgfältig zusammengestellt, aber noch nicht von Muttersprachlern geprüft.</p>;
}

// ---------- Fehler melden (Phase 3) ----------
export interface ReportTarget { id: string; lang: string; t: string; de: string; ex?: string }

/** Kleiner Knopf mit Fähnchen. Gemeldete Einträge zeigen ein gefülltes, orangefarbenes Fähnchen. */
export function ReportBtn({ ctx, target }: { ctx: Ctx; target: ReportTarget }) {
  const [open, setOpen] = useState(false);
  const done = !!ctx.state.reports[target.id];
  return (
    <>
      <button type="button" className={`icon-btn report-btn ${done ? 'on' : ''}`} aria-label={done ? `Gemeldet: ${target.t}` : `Fehler melden: ${target.t}`}
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}>
        <Icon name="flag" size={17} />
      </button>
      {open && <ReportSheet ctx={ctx} target={target} onClose={() => setOpen(false)} />}
    </>
  );
}

/** Blatt von unten (wie iOS) zum Melden eines Fehlers. Speichert nur auf diesem Gerät. */
export function ReportSheet({ ctx, target, onClose, onSaved }: { ctx: Ctx; target: ReportTarget; onClose: () => void; onSaved?: () => void }) {
  const existing = ctx.state.reports[target.id];
  const [kind, setKind] = useState<ReportKind>(existing?.kind ?? 'übersetzung');
  const [note, setNote] = useState(existing?.note ?? '');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const save = () => {
    ctx.update((s) => {
      const checks = { ...s.checks }; delete checks[target.id]; // gemeldet ersetzt „bestätigt“
      return { ...s, checks, reports: { ...s.reports, [target.id]: { ...target, kind, note: note.trim(), at: Date.now() } } };
    });
    onClose();
    onSaved?.();
  };
  const remove = () => {
    ctx.update((s) => { const r = { ...s.reports }; delete r[target.id]; return { ...s, reports: r }; });
    onClose();
  };
  // Über ein Portal direkt in <body>: Die Seiten-Animation (transform) würde „position: fixed“ sonst an die Seite binden.
  return createPortal(
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="report-title" tabIndex={-1} ref={ref}
        onClick={(e) => e.stopPropagation()} onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}>
        <div className="sheet-grabber" aria-hidden="true" />
        <h2 id="report-title">{existing ? 'Meldung bearbeiten' : 'Fehler melden'}</h2>
        <div className="sheet-entry">
          <b lang={target.lang}>{target.t}</b> <span className="muted">– {target.de}</span>
          {target.ex && <div className="small muted" lang={target.lang}>{target.ex}</div>}
        </div>
        <div className="choice-list" role="radiogroup" aria-label="Was stimmt nicht?">
          {REPORT_KINDS.map((k) => (
            <button key={k.k} type="button" role="radio" aria-checked={kind === k.k} className={`choice ${kind === k.k ? 'on' : ''}`} onClick={() => setKind(k.k)}>
              <span>{k.label}</span>{kind === k.k && <Icon name="check" size={18} />}
            </button>
          ))}
        </div>
        <label className="field">Was wäre richtig? (freiwillig)
          <textarea className="input" rows={2} maxLength={1000} value={note} onChange={(e) => setNote(e.target.value)} placeholder="z. B. richtige Übersetzung oder Betonung" />
        </label>
        <p className="fine">Die Meldung bleibt nur auf diesem Gerät. Der Eintrag wird nicht mehr abgefragt, bis du die Meldung löschst. In den Einstellungen kannst du alle Meldungen als Text kopieren.</p>
        <div className="row">
          {existing ? <button type="button" className="btn danger" onClick={remove}>Meldung löschen</button> : <button type="button" className="btn" onClick={onClose}>Abbrechen</button>}
          <button type="button" className="btn primary grow" onClick={save}>{existing ? 'Speichern' : 'Melden'}</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
