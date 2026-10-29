// Zugriff auf Browser- und Plattformfunktionen – alles optional und fehlertolerant.

// ---------- Sprachausgabe (im Gerät eingebaut, kostenlos, offline je nach Stimme) ----------
export function speechAvailable(): boolean {
  try { return typeof window !== 'undefined' && 'speechSynthesis' in window; } catch { return false; }
}

export function speak(text: string, lang: string, fallback?: string, rate = 0.9): boolean {
  if (!speechAvailable()) return false;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/…/g, ''));
    const voices = synth.getVoices();
    const pickVoice = (l: string) => voices.find((v) => v.lang.replace('_', '-').toLowerCase() === l.toLowerCase())
      ?? voices.find((v) => v.lang.toLowerCase().startsWith(l.slice(0, 2).toLowerCase()));
    const v = pickVoice(lang) ?? (fallback ? pickVoice(fallback) : undefined);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = lang;
    u.rate = rate;
    synth.speak(u);
    return true;
  } catch { return false; }
}

// ---------- Claude-Funktionen der Artifact-Seite (nur wenn auf claude.ai geöffnet) ----------
type ClaudeUse = { use: (name: string) => Promise<any> };
const claudeApi = (): ClaudeUse | null => {
  try { const c = (window as unknown as { claude?: ClaudeUse }).claude; return c && typeof c.use === 'function' ? c : null; } catch { return null; }
};

export async function useCapability<T = any>(name: string): Promise<T | null> {
  const c = claudeApi();
  if (!c) return null;
  try { return await c.use(name); } catch { return null; }
}

/** Wartet kurz, bis window.claude bereitsteht (die Plattform lädt es nach). */
export async function waitForClaude(ms = 4000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < ms) {
    if (claudeApi()) return true;
    await new Promise((r) => setTimeout(r, 200));
  }
  return !!claudeApi();
}

// ---------- Service Worker (Offline-Modus, nur bei eigenem Hosting wie GitHub Pages) ----------
export async function registerServiceWorker(): Promise<'aktiv' | 'nicht verfügbar'> {
  try {
    if (!('serviceWorker' in navigator) || (location.protocol !== 'https:' && location.hostname !== 'localhost')) return 'nicht verfügbar';
    const res = await fetch('./sw.js', { method: 'HEAD' });
    if (!res.ok) return 'nicht verfügbar';
    await navigator.serviceWorker.register('./sw.js');
    return 'aktiv';
  } catch { return 'nicht verfügbar'; }
}

export function isStandalone(): boolean {
  try { return window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true; } catch { return false; }
}
