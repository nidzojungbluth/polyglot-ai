import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { withScript } from './data';
import { usePack } from './lib/usePacks';
import type { LanguagePack } from './data/types';
import type { AppState, StorageKind } from './lib/store';
import { loadState, saveState, today } from './lib/store';
import { cloudLoad, cloudSave } from './lib/cloud';
import { registerServiceWorker, waitForClaude } from './lib/platform';
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
  const [claudeReady, setClaudeReady] = useState(false);
  const [toast, setToast] = useState('');
  const saveTimer = useRef<number>();
  const cloudTimer = useRef<number>();

  // Laden + optional aus der Cloud wiederherstellen, falls der Browser die Daten gelöscht hat
  useEffect(() => {
    (async () => {
      const { state: s, kind } = await loadState();
      setStorage(kind);
      setState(s);
      registerServiceWorker().then(setSw);
      const ready = await waitForClaude(4000);
      setClaudeReady(ready);
      if (!ready) { setCloud('nicht verfügbar'); return; }
      const remote = await cloudLoad().catch(() => null);
      const isEmpty = !Object.keys(s.cards).length && !Object.keys(s.lessons).length;
      if (remote && isEmpty && (Object.keys(remote.state.cards).length || Object.keys(remote.state.lessons).length)) {
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
  const ctx: Ctx = { state, pack, update, addActivity, go, storage, cloud, sw, claudeReady };

  const tabs: { v: View; icon: string; label: string }[] = [
    { v: 'home', icon: '🏠', label: 'Start' },
    { v: 'courses', icon: '📚', label: 'Kurse' },
    { v: 'coach', icon: '💬', label: 'Coach' },
    { v: 'vocab', icon: '🃏', label: 'Vokabeln' },
    { v: 'more', icon: '☰', label: 'Mehr' },
  ];
  const moreViews: View[] = ['more', 'dict', 'progress', 'settings', 'langs', 'roleplay'];

  return (
    <div className="app" dir={pack.rtl ? 'rtl' : 'ltr'}>
      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="Zum Start">Polyglot <span>AI</span></button>
        <button className="langchip" onClick={() => go('langs')} aria-label="Sprache wechseln">
          {pack.flag} {pack.native} ▾
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
            <button key={t.v} className={`tab ${active ? 'active' : ''} ${t.v === 'coach' ? 'tab-coach' : ''}`} onClick={() => go(t.v)}>
              <span className="tab-icon">{t.icon}</span>
              <span className="tab-label">{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
