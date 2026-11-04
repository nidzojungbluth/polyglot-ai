import type React from 'react';
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
        {pack && <SpeakBtn text={ex.t} pack={pack} label="🔊" />}
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

export function SpeakBtn({ text, pack, label = '🔊' }: { text: string; pack: LanguagePack; label?: string }) {
  return (
    <button className="icon-btn" aria-label={`Vorlesen: ${text}`} onClick={(e) => { e.stopPropagation(); sayFor(pack, text); }}>
      {label}
    </button>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${pct}%` }} /></div>;
}

/** Aktivitätsring wie bei Apple Fitness: zeigt den Anteil am Tagesziel. */
export function Ring({ value, max, size = 76, children }: { value: number; max: number; size?: number; children?: React.ReactNode }) {
  const r = 32; const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }} role="img" aria-label={`${Math.round(pct * 100)} Prozent des Tagesziels`}>
      <svg className="ring" viewBox="0 0 80 80" style={{ width: size, height: size, transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5e5ce6" /><stop offset="1" stopColor="#bf5af2" /></linearGradient>
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
