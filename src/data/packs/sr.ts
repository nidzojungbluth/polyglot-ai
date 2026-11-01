// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> trägt sie hier ein.
import { enrich } from '../core';
import { sr } from '../sr';
import srVocab from '../vocab/sr';
import srVocab2 from '../vocab/sr2';
import srVocab3 from '../vocab/sr3';
import srVocab4 from '../vocab/sr4';
import srVocab5 from '../vocab/sr5';
import srVocab6 from '../vocab/sr6';
import srVocab7 from '../vocab/sr7';
import srVocab8 from '../vocab/sr8';
import srVocab9 from '../vocab/sr9';
import srVocab10 from '../vocab/sr10';
import srVocab11 from '../vocab/sr11';
import srVocab12 from '../vocab/sr12';
import srVocab13 from '../vocab/sr13';
import srVocab14 from '../vocab/sr14';
import srVocab15 from '../vocab/sr15';
import srVocab16 from '../vocab/sr16';
import srVocab17 from '../vocab/sr17';
import srVocab18 from '../vocab/sr18';
import srVocab19 from '../vocab/sr19';
import srVocab20 from '../vocab/sr20';
import srVocab21 from '../vocab/sr21';
import srVocab22 from '../vocab/sr22';
import srVocab23 from '../vocab/sr23';
import srVocab24 from '../vocab/sr24';
import srVocab25 from '../vocab/sr25';
import srVocab26 from '../vocab/sr26';
import srVocab27 from '../vocab/sr27';
import srVocab28 from '../vocab/sr28';
import srVocab29 from '../vocab/sr29';
import srVocab30 from '../vocab/sr30';
import srEx from '../vocab/srEx';

export default enrich(sr, [
  srVocab, srVocab2, srVocab3, srVocab4, srVocab5, srVocab6, srVocab7, srVocab8, srVocab9, srVocab10, srVocab11, srVocab12, srVocab13, srVocab14, srVocab15, srVocab16, srVocab17, srVocab18, srVocab19, srVocab20, srVocab21, srVocab22, srVocab23, srVocab24, srVocab25, srVocab26, srVocab27, srVocab28, srVocab29, srVocab30,
].join(''), srEx);
