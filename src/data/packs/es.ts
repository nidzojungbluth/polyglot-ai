// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> es trägt sie hier ein (Phase 6).
import { enrich } from '../core';
import { es } from '../es';
import esVocab from '../vocab/es';
import esVocab2 from '../vocab/es2';
import esVocab3 from '../vocab/es3';
import esVocab4 from '../vocab/es4';

export default enrich(es, [
  esVocab, esVocab2, esVocab3, esVocab4,
].join(''));
