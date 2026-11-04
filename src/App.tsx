import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { withScript } from './data';
import { usePack } from './lib/usePacks';
import type { LanguagePack } from './data/types';
import type { AppState, StorageKind } from './lib/store';
import { loadState, saveState, today } from './lib/store';
import { cloudLoad, cloudSave } from './lib/cloud';
import { registerServiceWorker, requestPersistentStorage, waitForClaude } from './lib/platform';
import { Home, MorePage } from './views/Home';
import { LessonPlayer } from './views/Lesson';
import { Coach } from './views/Coach';
import { Roleplays } from './views/Roleplays';
import { Vocab } from './views/Vocab';
import { Dictionary } from './views/Dictionary';
import { Progress } from './views/Progress';
import { Settings } from './views/Settings';
import { Languages } from './views/Languages';
import { Courses } from './views/Courses';
import { Alphabet } from './views/Alphabet';

export type View = 'home' | 'courses' | 'abc' | 'lesson' | 'coach' | 'roleplay' | 'vocab' | 'dict' | 'progress' | 'settings' | 'langs' | 'more';
const VIEWS: View[] = ['home', 'courses', 'abc', 'coach', 'roleplay', 'vocab', 'dict', 'progress', 'settings', 'langs', 'more'];

export interface Ctx {
  state: AppState;
  pack: LanguagePack;
  update: (fn: (s: AppState) => AppState) => void;
  addActivity: (n?: number) => void;
  go: (v: View, arg?: string) => void;
  storage: StorageKind;
  cloud: 'prüfe' | 'aktiv' | 'nicht verfügbar';
  sw: 'aktiv' | 'nicht verfügbar';
  persist: 'prüfe' | 'ja' | 'nein' | 'nicht verfügbar';
  claudeReady: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [storage, setStorage] = useState<StorageKind>('memory');
  const [view, setView] = useState<View>(() => {
    const h = (location.hash || '').slice(1) as View;
    return VIEWS.includes(h) ? h : 'home';
  });
  const [arg, setArg] = useState<string | undefined>();
  const [cloud, setCloud] = useState<Ctx['cloud']>('prüfe');
  const [sw, setSw] = useState<Ctx['sw']>('nicht verfügbar');
  const [persist, setPersist] = useState<Ctx['persist']>('prüfe');
  const [claudeReady, setClaudeReady] = useState(false);
  const [toast, setToast] = useState('');
  const saveTimer = useRef<number>();
  const cloudTimer = useRef<number>();
  const stateRef = useRef<AppState | null>(null);
  stateRef.current = state;

  // Laden + optional aus der Cloud wiederherstellen, falls der Browser die Daten gelöscht hat
  useEffect(() => {
    (async () => {
      const { state: s, kind } = await loadState();
      setStorage(kind);
      setState(s);
      registerServiceWorker().then(setSw);
      requestPersistentStorage().then(setPersist);
      const ready = await waitForClaude(4000);
      setClaudeReady(ready);
      if (!ready) { setCloud('nicht verfügbar'); return; }
      const remote = await cloudLoad().catch(() => null);
      const isEmpty = (x: AppState | null) => !!x && !Object.keys(x.cards).length && !Object.keys(x.lessons).length;
      // Aktuellen Stand prüfen (nicht den beim Start): Wer in den ersten Sekunden schon gelernt hat, verliert nichts.
      if (remote && isEmpty(stateRef.current) && !isEmpty(remote.state)) {
        setState(remote.state);
        setToast('Lernfortschritt aus der Cloud-Sicherung wiederhergestellt.');
      }
      const cloudOk = remote !== null ? true : await cloudSave(s);
      setCloud(cloudOk ? 'aktiv' : 'nicht verfügbar');
    })();
  }, []);

  // Speichern (verzögert, damit nicht bei jedem Tastendruck geschrieben wird)
  useEffect(() => {
    if (!state) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      saveState(state, storage).catch(() => setToast('Speichern im Browser fehlgeschlagen – bitte Sicherung exportieren.'));
    }, 300);
    if (cloud === 'aktiv') {
      window.clearTimeout(cloudTimer.current);
      cloudTimer.current = window.setTimeout(() => { cloudSave(state); }, 4000);
    }
  }, [state, storage, cloud]);

  // Beim Verlassen/Wegwischen der App sofort speichern (iOS beendet Web-Apps im Hintergrund ohne Vorwarnung)
  const latest = useRef<{ state: AppState | null; storage: typeof storage }>({ state: null, storage });
  latest.current = { state, storage };
  useEffect(() => {
    const flush = () => {
      const { state: s, storage: k } = latest.current;
      if (!s) return;
      window.clearTimeout(saveTimer.current);
      saveState(s, k).catch(() => undefined);
    };
    const onVis = () => { if (document.visibilityState === 'hidden') flush(); };
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pagehide', flush);
    return () => { document.removeEventListener('visibilitychange', onVis); window.removeEventListener('pagehide', flush); };
  }, []);

  useEffect(() => {
    const t = state?.settings.theme ?? 'auto';
    document.documentElement.dataset.theme = t;
  }, [state?.settings.theme]);

  useEffect(() => {
    const onHash = () => {
      const h = location.hash.slice(1) as View;
      if (VIEWS.includes(h)) setView(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 4000); return () => clearTimeout(t); } }, [toast]);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    setState((s) => (s ? { ...fn(s), updatedAt: Date.now() } : s));
  }, []);
  const addActivity = useCallback((n = 1) => {
    update((s) => ({ ...s, daily: { ...s.daily, [today()]: (s.daily[today()] ?? 0) + n } }));
  }, [update]);
  const go = useCallback((v: View, a?: string) => {
    setView(v); setArg(a);
    try { if (v !== 'lesson') history.replaceState(null, '', `#${v}`); } catch { /* ignorieren */ }
    window.scrollTo(0, 0);
  }, []);

  const rawPack = usePack(state?.settings.lang ?? 'en');
  const pack = useMemo(() => (rawPack ? withScript(rawPack, state?.settings.srScript ?? 'beide') : undefined), [rawPack, state?.settings.srScript]);

  if (!state || !pack) return <div className="loading">{state ? 'Sprache wird geladen …' : 'Polyglot AI lädt …'}</div>;
  const ctx: Ctx = { state, pack, update, addActivity, go, storage, cloud, sw, persist, claudeReady };

  const tabs: { v: View; icon: keyof typeof TAB_ICONS; label: string }[] = [
    { v: 'home', icon: 'home', label: 'Start' },
    { v: 'courses', icon: 'courses', label: 'Kurse' },
    { v: 'coach', icon: 'coach', label: 'Coach' },
    { v: 'vocab', icon: 'vocab', label: 'Vokabeln' },
    { v: 'more', icon: 'more', label: 'Mehr' },
  ];
  const moreViews: View[] = ['more', 'dict', 'progress', 'settings', 'langs', 'roleplay'];

  return (
    <div className="app" dir={pack.rtl ? 'rtl' : 'ltr'}>
      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="Zum Start">Polyglot <span>AI</span></button>
        <button className="langchip" onClick={() => go('langs')} aria-label="Sprache wechseln">
          {pack.flag} {pack.native} <span aria-hidden="true" style={{ opacity: 0.5, fontSize: '0.8em' }}>⌄</span>
        </button>
      </header>
      <main className="content">
        <div className="view" key={`${view}:${arg ?? ''}`}>
        {view === 'home' && <Home ctx={ctx} />}
        {view === 'lesson' && arg && <LessonPlayer ctx={ctx} lessonId={arg} />}
        {view === 'courses' && <Courses key={arg ?? 'all'} ctx={ctx} moduleId={arg} />}
        {view === 'abc' && <Alphabet key={arg ?? 'abc'} ctx={ctx} arg={arg} />}
        {view === 'coach' && <Coach ctx={ctx} />}
        {view === 'roleplay' && <Roleplays ctx={ctx} />}
        {view === 'vocab' && <Vocab key={arg ?? 'v'} ctx={ctx} mode={arg} />}
        {view === 'dict' && <Dictionary ctx={ctx} />}
        {view === 'progress' && <Progress ctx={ctx} />}
        {view === 'settings' && <Settings ctx={ctx} />}
        {view === 'langs' && <Languages ctx={ctx} />}
        {view === 'more' && <MorePage ctx={ctx} />}
        </div>
      </main>
      {toast && <div className="toast" role="status">{toast}</div>}
      <nav className="tabbar" aria-label="Hauptnavigation">
        {tabs.map((t) => {
          const active = t.v === view || (t.v === 'more' && moreViews.includes(view)) || (t.v === 'courses' && (view === 'lesson' || view === 'abc'));
          return (
            <button key={t.v} className={`tab ${active ? 'active' : ''} ${t.v === 'coach' ? 'tab-coach' : ''}`} onClick={() => go(t.v)} aria-current={active ? 'page' : undefined}>
              <span className="tab-icon" aria-hidden="true">{TAB_ICONS[t.icon](active)}</span>
              <span className="tab-label">{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* Linien-Symbole für die Tab-Leiste (eigene SVGs, keine Bibliothek). Aktiv = gefüllt wie bei iOS. */
const sv = (active: boolean, d: ReactNode) => (
  <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const TAB_ICONS = {
  home: (a: boolean) => sv(a, <path d="M3.5 10.6 12 3.8l8.5 6.8V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.6H9.2v5.6H5A1.5 1.5 0 0 1 3.5 19z" />),
  courses: (a: boolean) => sv(a, <><path d="M4 5.2c2.6-1 5.3-.9 8 .6v14c-2.7-1.5-5.4-1.6-8-.6z" /><path d="M20 5.2c-2.6-1-5.3-.9-8 .6v14c2.7-1.5 5.4-1.6 8-.6z" /></>),
  coach: (a: boolean) => sv(a, <path d="M12 3.8c4.8 0 8.5 3.1 8.5 7.1S16.8 18 12 18c-.9 0-1.8-.1-2.6-.3L5 20l.9-3.6C4.4 15 3.5 13.1 3.5 10.9c0-4 3.7-7.1 8.5-7.1z" />),
  vocab: (a: boolean) => sv(a, <><rect x="6.5" y="3.5" width="13" height="16" rx="2.5" /><path d="M4 7.2v11.3A2.5 2.5 0 0 0 6.5 21h9" fill="none" /></>),
  more: (a: boolean) => sv(false, <><circle cx="5.5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="18.5" cy="12" r="1.6" fill="currentColor" />{a && <circle cx="12" cy="12" r="9" fill="none" />}</>),
};
