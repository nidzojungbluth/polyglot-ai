import type { Ctx } from '../App';
import { PACKS, PLANNED } from '../data';

export function Languages({ ctx }: { ctx: Ctx }) {
  const { state, update, go } = ctx;
  const choose = (code: string) => { update((s) => ({ ...s, settings: { ...s.settings, lang: code } })); go('home'); };
  return (
    <div className="stack">
      <h1>Sprachen</h1>
      <section className="card">
        <h2>Verfügbare Kurse</h2>
        <ul className="list">
          {PACKS.map((p) => (
            <li key={p.code}>
              <button className={`list-btn ${state.settings.lang === p.code ? 'selected' : ''}`} onClick={() => choose(p.code)}>
                <span className="num">{p.flag}</span>
                <span className="grow"><b>{p.name}</b> <span className="muted">· {p.native}</span><br />
                  <span className="small muted">{p.words.length} Wörter · {p.slang.length} Slang · {(p.modules?.length ?? 0) ? `${p.modules!.length} Kursmodule · ` : `${p.lessons.length} Lektionen · `}{p.roleplays.length} Dialoge · {p.city}</span></span>
                {state.settings.lang === p.code && <span>✓</span>}
              </button>
            </li>
          ))}
        </ul>
        <p className="fine">{PACKS.find((p) => p.code === state.settings.lang)?.note}</p>
        <p className="fine">Griechisch, Serbisch und Russisch haben den großen Kursbereich (A1–C2). Englisch und Spanisch haben vorerst nur die Einstiegslektionen.</p>
      </section>
      <section className="card">
        <h2>Geplant – noch kein Kurs</h2>
        <p className="small muted">Diese Sprachen sind vorgesehen, haben aber noch keine geprüften Inhalte. Der KI-Coach kann sie trotzdem schon im freien Gespräch üben, wenn du ihn darum bittest.</p>
        <div className="planned">
          {PLANNED.map((p) => <span key={p.code} className="pill" dir={p.rtl ? 'rtl' : 'ltr'}>{p.flag} {p.native}</span>)}
        </div>
      </section>
    </div>
  );
}
