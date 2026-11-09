// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> en trägt sie hier ein (Phase 6).
import { enrich } from '../core';
import { en } from '../en';
import enVocab from '../vocab/en';
import enVocab2 from '../vocab/en2';
import enVocab3 from '../vocab/en3';

export default enrich(en, [
  enVocab, enVocab2, enVocab3,
].join(''));
