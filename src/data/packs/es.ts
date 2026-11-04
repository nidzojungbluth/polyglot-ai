// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> es trägt sie hier ein (Phase 6).
import { enrich } from '../core';
import { es } from '../es';
import esVocab from '../vocab/es';

export default enrich(es, [
  esVocab,
].join(''));
