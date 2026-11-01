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

export function LevelBadge({ level }: { level?: string }) {
  return level ? <span className="badge level">{level}</span> : null;
}

export function AiNotice() {
  return <p className="fine">Inhalte von KI erstellt und sorgfältig zusammengestellt, aber noch nicht von Muttersprachlern geprüft.</p>;
}
