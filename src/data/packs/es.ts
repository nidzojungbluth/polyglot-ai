// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> es trägt sie hier ein (Phase 6).
import { enrich } from '../core';
import { es } from '../es';
import esVocab from '../vocab/es';
import esVocab2 from '../vocab/es2';

export default enrich(es, [
  esVocab, esVocab2,
].join(''));
