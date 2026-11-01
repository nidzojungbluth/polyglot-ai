import { useEffect, useState } from 'react';
import { BASES, getPack, loadAllPacks, loadPack } from '../data';
import type { EnrichedPack } from '../data';

/** Ein Sprachpaket bei Bedarf laden (undefined, solange es lädt). */
export function usePack(code: string): EnrichedPack | undefined {
  const [pack, setPack] = useState(() => getPack(code));
  useEffect(() => {
    let on = true;
    const hit = getPack(code);
    if (hit) { setPack(hit); return; }
    setPack(undefined);
    loadPack(code).then((p) => { if (on) setPack(p); });
    return () => { on = false; };
  }, [code]);
  return pack;
}

/** Alle Sprachpakete (lädt fehlende im Hintergrund nach). Reihenfolge wie BASES. */
export function useAllPacks(enabled = true): (EnrichedPack | undefined)[] {
  const [packs, setPacks] = useState(() => BASES.map((b) => getPack(b.code)));
  useEffect(() => {
    if (!enabled) return;
    let on = true;
    loadAllPacks().then((ps) => { if (on) setPacks(ps); });
    return () => { on = false; };
  }, [enabled]);
  return packs;
}
