// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> en trägt sie hier ein (Phase 6).
import { enrich } from '../core';
import { en } from '../en';
import enVocab from '../vocab/en';

export default enrich(en, [
  enVocab,
].join(''));
