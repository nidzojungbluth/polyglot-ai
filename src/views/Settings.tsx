import { useState } from 'react';
import type { Ctx } from '../App';
import { defaultState, exportBackup, importBackup, reportsText, REPORT_KINDS, type Theme } from '../lib/store';
import { BASES } from '../data';
import { cloudSave } from '../lib/cloud';
import { isStandalone, speechAvailable, useCapability } from '../lib/platform';
import { Icon } from './ui';

export function Settings({ ctx }: { ctx: Ctx }) {
  const { state, update } = ctx;
  const s = state.settings;
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [importText, setImportText] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const set = (patch: Partial<typeof s>) => update((st) => ({ ...st, settings: { ...st.settings, ...patch } }));

  const filename = `polyglot-sicherung-${new Date().toISOString().slice(0, 10)}.json`;

  const download = async () => {
    const data = exportBackup(state);
    const dl = await useCapability('downloads');
    if (dl) {
      try { await dl.save({ filename, data }); setMsg({ ok: true, text: 'Sicherungsdatei gespeichert.' }); return; }
      catch { setMsg({ ok: false, text: 'Download abgebrochen oder nicht erlaubt. Nutze „Kopieren“.' }); return; }
    }
    try {
      const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
      const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setMsg({ ok: true, text: 'Download gestartet.' });
    } catch { setMsg({ ok: false, text: 'Download nicht möglich. Nutze „Kopieren“.' }); }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(exportBackup(state)); setMsg({ ok: true, text: 'Sicherung kopiert. Füge sie z. B. in eine Notiz ein.' }); }
    catch { setImportText(exportBackup(state)); setMsg({ ok: false, text: 'Kopieren nicht erlaubt – der Text steht unten im Feld, du kannst ihn markieren und kopieren.' }); }
  };

  const doImport = (text: string) => {
    try {
      const next = importBackup(text);
      update(() => next);
      setImportText('');
      setMsg({ ok: true, text: 'Sicherung erfolgreich wiederhergestellt.' });
    } catch (e) { setMsg({ ok: false, text: (e as Error).message }); }
  };

  const onFile = async (f?: File) => {
    if (!f) return;
    if (f.size > 5_000_000) { setMsg({ ok: false, text: 'Datei zu groß.' }); return; }
    doImport(await f.text());
  };

  return (
    <div className="stack">
      <button className="back" onClick={() => ctx.go('more')}>Mehr</button>
      <h1>Einstellungen</h1>

      <section className="card">
        <h2>Darstellung & Ziele</h2>
        <label className="field">Design
          <div className="seg">
            {(['auto', 'hell', 'dunkel'] as Theme[]).map((t) => <button key={t} className={s.theme === t ? 'on' : ''} onClick={() => set({ theme: t })}>{{ auto: 'Automatisch', hell: 'Hell', dunkel: 'Dunkel' }[t]}</button>)}
          </div>
        </label>
        <label className="field">Tagesziel: <b>{s.dailyGoal} Übungen</b>
          <input type="range" min={5} max={100} step={5} value={s.dailyGoal} onChange={(e) => set({ dailyGoal: Number(e.target.value) })} />
        </label>
      </section>

      <section className="card">
        <h2>Serbisch: Schrift</h2>
        <div className="seg">
          {([['beide', 'Beide'], ['latein', 'Latein'], ['kyrillisch', 'Кирилица']] as const).map(([k, l]) => (
            <button key={k} className={s.srScript === k ? 'on' : ''} onClick={() => set({ srScript: k })}>{l}</button>
          ))}
        </div>
        <p className="fine">„Beide“: lateinische Schrift mit kyrillischer Zeile darunter. Antworten darfst du in beiden Schriften eintippen. Dein Fortschritt gilt für beide Schriften.</p>
      </section>

      <section className="card">
        <h2>Sprachcoach</h2>
        <label className="row between field">
          <span>Echte KI benutzen (wenn verfügbar)</span>
          <input type="checkbox" checked={s.aiEnabled} onChange={(e) => set({ aiEnabled: e.target.checked })} />
        </label>
        <label className="field">Deine Interessen (für passende Beispiele)
          <input className="input" value={s.interests} maxLength={200} onChange={(e) => set({ interests: e.target.value })} placeholder="z. B. Fitness, Fußball, Kochen, Reisen" />
        </label>
        <p className="fine">Modus und Slang-Menge stellst du direkt im Coach ein.</p>
      </section>

      <ReportsSection ctx={ctx} />

      <section className="card">
        <h2>Sicherung & Wiederherstellung</h2>
        <p className="small">Browserdaten können auf dem iPhone gelöscht werden (z. B. bei wenig Speicher oder wenn eine Seite lange nicht geöffnet wurde). Sichere deinen Fortschritt regelmäßig.</p>
        <div className="row wrap">
          <button className="btn" onClick={download}><Icon name="download" size={18} /> Als Datei sichern</button>
          <button className="btn" onClick={copy}><Icon name="copy" size={18} /> Kopieren</button>
          {ctx.cloud === 'aktiv' && <button className="btn" onClick={async () => setMsg(await cloudSave(state) ? { ok: true, text: 'In der Cloud gesichert.' } : { ok: false, text: 'Cloud-Sicherung fehlgeschlagen.' })}><Icon name="cloud" size={18} /> Jetzt in Cloud sichern</button>}
        </div>
        <label className="field">Sicherung wiederherstellen (Datei)
          <input type="file" accept="application/json,.json,text/plain" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        <label className="field">… oder Sicherungstext einfügen
          <textarea className="input" rows={3} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder='{"app":"polyglot-ai", …}' />
        </label>
        <button className="btn" disabled={!importText.trim()} onClick={() => doImport(importText)}>Wiederherstellen</button>
        {msg && <p className={msg.ok ? 'ok-text' : 'err-text'} role="status">{msg.text}</p>}
      </section>

      <section className="card">
        <h2>Was funktioniert offline?</h2>
        <table className="status">
          <tbody>
            <tr><td>Lektionen, Übungen, Rollenspiele</td><td><span className="st ok"><Icon name="check" size={15} /> offline</span></td></tr>
            <tr><td>Vokabelkarten & Wiederholung</td><td><span className="st ok"><Icon name="check" size={15} /> offline</span></td></tr>
            <tr><td>Wörterbuch, Slang-Erklärungen</td><td><span className="st ok"><Icon name="check" size={15} /> offline</span></td></tr>
            <tr><td>Regel-Coach</td><td><span className="st ok"><Icon name="check" size={15} /> offline</span></td></tr>
            <tr><td>Echter KI-Coach</td><td><span className="st web"><Icon name="globe" size={15} /> nur online, nur auf claude.ai</span></td></tr>
            <tr><td>Cloud-Sicherung</td><td><span className="st web"><Icon name="globe" size={15} /> nur online, nur auf claude.ai</span></td></tr>
            <tr><td>Sprachausgabe</td><td>{speechAvailable() ? <><span className="st ok"><Icon name="check" size={15} /> Stimmen des iPhones</span></> : <><span className="st no"><Icon name="xmark" size={15} /> nicht verfügbar</span></>}</td></tr>
            <tr><td>Kurse, Wörterbuch, Dialoge (alle Sprachen)</td><td><span className="st ok"><Icon name="check" size={15} /> offline</span></td></tr>
            <tr><td>Aussprache prüfen (Mikrofon)</td><td><span className="st no"><Icon name="xmark" size={15} /> nicht möglich – nachsprechen und mit „Langsamer“ vergleichen</span></td></tr>
          </tbody>
        </table>
        <h2>Status dieses Geräts</h2>
        <table className="status">
          <tbody>
            <tr><td>Speicherort</td><td>{{ indexeddb: 'IndexedDB (Browser)', localstorage: 'localStorage (Browser)', memory: 'Achtung: nur Arbeitsspeicher – geht beim Schließen verloren!' }[ctx.storage]}</td></tr>
            <tr><td>Cloud-Sicherung</td><td>{ctx.cloud === 'aktiv' ? 'aktiv (automatisch)' : ctx.cloud === 'prüfe' ? 'prüfe …' : 'nicht verfügbar'}</td></tr>
            <tr><td>Offline-Modus (Service Worker)</td><td>{ctx.sw === 'aktiv' ? 'aktiv' : 'nicht aktiv auf dieser Adresse'}</td></tr>
            <tr><td>Als App installiert</td><td>{isStandalone() ? 'ja' : 'nein'}</td></tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Über die Inhalte</h2>
        <p className="small">Alle Sprachinhalte (Wörter, Slang, Dialoge, Erklärungen) wurden von KI (Claude) erstellt und nach bestem Wissen geprüft, aber noch <b>nicht von Muttersprachlern bestätigt</b>. Slang verändert sich schnell und ist regional verschieden. Lizenz der App und Inhalte: MIT. Keine Daten werden an Dritte gesendet; KI-Nachrichten gehen nur an Claude.</p>
      </section>

      <section className="card">
        <h2>Zurücksetzen</h2>
        {!confirmReset ? <button className="btn danger" onClick={() => setConfirmReset(true)}>Alle Lerndaten löschen …</button> : (
          <div className="stack">
            <p className="err-text">Wirklich alles löschen? Ohne Sicherung ist der Fortschritt weg.</p>
            <div className="row">
              <button className="btn" onClick={() => setConfirmReset(false)}>Abbrechen</button>
              <button className="btn danger" onClick={() => { update(() => defaultState()); setConfirmReset(false); setMsg({ ok: true, text: 'Alles zurückgesetzt.' }); }}>Ja, löschen</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/** Fehlermeldungen (Phase 3): ansehen, als Text kopieren oder teilen, einzeln oder alle löschen. */
function ReportsSection({ ctx }: { ctx: Ctx }) {
  const { state, update } = ctx;
  const list = Object.values(state.reports).sort((a, b) => b.at - a.at);
  const checked = Object.keys(state.checks).length;
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState(false);
  const name = (c: string) => BASES.find((b) => b.code === c)?.name ?? c;
  const text = () => reportsText(state, name);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text()); setMsg('Meldungen kopiert.'); }
    catch { setMsg('Kopieren nicht erlaubt – nutze „Teilen“ oder markiere den Text unten.'); setShowText(true); }
  };
  const [showText, setShowText] = useState(false);
  const share = async () => {
    try { await (navigator as any).share({ title: 'Polyglot AI – Fehlermeldungen', text: text() }); }
    catch { /* abgebrochen */ }
  };
  const kind = (k: string) => REPORT_KINDS.find((x) => x.k === k)?.label ?? k;
  return (
    <section className="card">
      <h2>Fehlermeldungen</h2>
      <p className="small muted">{list.length ? `${list.length} gemeldet` : 'Noch nichts gemeldet.'}{checked ? ` · ${checked} Einträge im Prüfmodus bestätigt` : ''}. Melden kannst du über das Fähnchen bei jedem Wort oder im Prüfmodus eines Kursmoduls.</p>
      {list.length > 0 && (
        <>
          <ul className="list">
            {list.slice(0, 50).map((r) => (
              <li key={r.id} className="word-row">
                <div className="grow small">
                  <b lang={r.lang}>{r.t}</b> <span className="muted">– {r.de}</span>
                  <div className="muted">{name(r.lang)} · {kind(r.kind)}{r.note ? ` · „${r.note}“` : ''}</div>
                </div>
                <button className="icon-btn" aria-label={`Meldung löschen: ${r.t}`} onClick={() => update((s) => { const x = { ...s.reports }; delete x[r.id]; return { ...s, reports: x }; })}>
                  <Icon name="xmark" size={16} />
                </button>
              </li>
            ))}
          </ul>
          {list.length > 50 && <p className="fine">… und {list.length - 50} weitere (alle im kopierten Text).</p>}
          <div className="row wrap">
            <button className="btn" onClick={copy}><Icon name="copy" size={18} /> Als Text kopieren</button>
            {'share' in navigator && <button className="btn" onClick={share}><Icon name="clipboard" size={18} /> Teilen</button>}
            {!confirm ? <button className="btn danger" onClick={() => setConfirm(true)}>Alle löschen …</button>
              : <button className="btn danger" onClick={() => { update((s) => ({ ...s, reports: {} })); setConfirm(false); setMsg('Alle Meldungen gelöscht.'); }}>Wirklich alle löschen</button>}
          </div>
          {showText && <textarea className="input" rows={6} readOnly value={text()} aria-label="Meldungen als Text" />}
        </>
      )}
      {msg && <p className="ok-text small" role="status">{msg}</p>}
    </section>
  );
}
