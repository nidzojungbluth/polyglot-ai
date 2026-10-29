import type { Register } from '../data/types';
import { REGISTER_INFO } from '../data/types';
import { speak } from '../lib/platform';
import type { LanguagePack } from '../data/types';

export function RegBadge({ reg }: { reg: Register }) {
  const r = REGISTER_INFO[reg];
  return <span className="badge" style={{ borderColor: r.color, color: r.color }}>{r.label}</span>;
}

export function SpeakBtn({ text, pack, label = '🔊' }: { text: string; pack: LanguagePack; label?: string }) {
  return (
    <button className="icon-btn" aria-label={`Vorlesen: ${text}`} onClick={(e) => { e.stopPropagation(); speak(text, pack.speechLang, pack.speechFallback); }}>
      {label}
    </button>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${pct}%` }} /></div>;
}

export function AiNotice() {
  return <p className="fine">Inhalte von KI erstellt und sorgfältig zusammengestellt, aber noch nicht von Muttersprachlern geprüft.</p>;
}
