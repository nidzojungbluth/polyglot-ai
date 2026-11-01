// Sprachdaten: Grunddaten (Name, Flagge, Lektionen) sofort, große Wortschätze erst bei Bedarf (eigene Chunks).
import type { LanguagePack } from './types';
import type { EnrichedPack } from './core';
import { en } from './en';
import { es } from './es';
import { el } from './el';
import { sr } from './sr';
import { ru } from './ru';

export * from './core';

/** Grundpakete ohne großen Wortschatz – für Sprachliste, Flaggen, Statistik. */
export const BASES: LanguagePack[] = [en, es, el, sr, ru];

const loaders: Record<string, () => Promise<{ default: EnrichedPack }>> = {
  en: () => import('./packs/en'),
  es: () => import('./packs/es'),
  el: () => import('./packs/el'),
  sr: () => import('./packs/sr'),
  ru: () => import('./packs/ru'),
};
const cache = new Map<string, EnrichedPack>();
const pending = new Map<string, Promise<EnrichedPack>>();

/** Bereits geladenes Sprachpaket (oder undefined). */
export const getPack = (code: string): EnrichedPack | undefined => cache.get(code);

/** Lädt ein Sprachpaket einmalig und hält es im Speicher. Unbekannter Code → Englisch. */
export function loadPack(code: string): Promise<EnrichedPack> {
  const c = loaders[code] ? code : 'en';
  const hit = cache.get(c);
  if (hit) return Promise.resolve(hit);
  let p = pending.get(c);
  if (!p) {
    p = loaders[c]().then((m) => { cache.set(c, m.default); pending.delete(c); return m.default; });
    pending.set(c, p);
  }
  return p;
}

export const loadAllPacks = (): Promise<EnrichedPack[]> => Promise.all(BASES.map((b) => loadPack(b.code)));
