// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> trägt sie hier ein.
import { enrich } from '../core';
import { el } from '../el';
import elVocab from '../vocab/el';
import elVocab2 from '../vocab/el2';
import elVocab3 from '../vocab/el3';
import elVocab4 from '../vocab/el4';
import elVocab5 from '../vocab/el5';
import elVocab6 from '../vocab/el6';
import elVocab7 from '../vocab/el7';
import elVocab8 from '../vocab/el8';
import elVocab9 from '../vocab/el9';
import elVocab10 from '../vocab/el10';
import elVocab11 from '../vocab/el11';
import elVocab12 from '../vocab/el12';
import elVocab13 from '../vocab/el13';
import elVocab14 from '../vocab/el14';
import elVocab15 from '../vocab/el15';
import elVocab16 from '../vocab/el16';
import elVocab17 from '../vocab/el17';
import elVocab18 from '../vocab/el18';
import elVocab19 from '../vocab/el19';
import elVocab20 from '../vocab/el20';
import elVocab21 from '../vocab/el21';
import elVocab22 from '../vocab/el22';
import elVocab23 from '../vocab/el23';
import elVocab24 from '../vocab/el24';
import elVocab25 from '../vocab/el25';
import elVocab26 from '../vocab/el26';
import elVocab27 from '../vocab/el27';
import elVocab28 from '../vocab/el28';
import elVocab29 from '../vocab/el29';
import elVocab30 from '../vocab/el30';
import elEx from '../vocab/elEx';

export default enrich(el, [
  elVocab, elVocab2, elVocab3, elVocab4, elVocab5, elVocab6, elVocab7, elVocab8, elVocab9, elVocab10, elVocab11, elVocab12, elVocab13, elVocab14, elVocab15, elVocab16, elVocab17, elVocab18, elVocab19, elVocab20, elVocab21, elVocab22, elVocab23, elVocab24, elVocab25, elVocab26, elVocab27, elVocab28, elVocab29, elVocab30,
].join(''), elEx);
