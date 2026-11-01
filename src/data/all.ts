// Alle Sprachpakete sofort geladen – nur für Tests und Skripte (nicht in der App importieren).
import en from './packs/en';
import es from './packs/es';
import el from './packs/el';
import sr from './packs/sr';
import ru from './packs/ru';
import type { EnrichedPack } from './core';

export * from './core';
export { BASES } from './index';
export const PACKS: EnrichedPack[] = [en, es, el, sr, ru];
export const packByCode = (code: string): EnrichedPack | undefined => PACKS.find((p) => p.code === code);
