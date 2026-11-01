// Sprachpaket – wird erst geladen, wenn die Sprache gebraucht wird (eigener Chunk).
// Neue Wortliste: python3 scripts/add-stage.py <N> trägt sie hier ein.
import { enrich } from '../core';
import { ru } from '../ru';
import ruVocab from '../vocab/ru';
import ruVocab2 from '../vocab/ru2';
import ruVocab3 from '../vocab/ru3';
import ruVocab4 from '../vocab/ru4';
import ruVocab5 from '../vocab/ru5';
import ruVocab6 from '../vocab/ru6';
import ruVocab7 from '../vocab/ru7';
import ruVocab8 from '../vocab/ru8';
import ruVocab9 from '../vocab/ru9';
import ruVocab10 from '../vocab/ru10';
import ruVocab11 from '../vocab/ru11';
import ruVocab12 from '../vocab/ru12';
import ruVocab13 from '../vocab/ru13';
import ruVocab14 from '../vocab/ru14';
import ruVocab15 from '../vocab/ru15';
import ruVocab16 from '../vocab/ru16';
import ruVocab17 from '../vocab/ru17';
import ruVocab18 from '../vocab/ru18';
import ruVocab19 from '../vocab/ru19';
import ruVocab20 from '../vocab/ru20';
import ruVocab21 from '../vocab/ru21';
import ruVocab22 from '../vocab/ru22';
import ruVocab23 from '../vocab/ru23';
import ruVocab24 from '../vocab/ru24';
import ruVocab25 from '../vocab/ru25';
import ruVocab26 from '../vocab/ru26';
import ruVocab27 from '../vocab/ru27';
import ruVocab28 from '../vocab/ru28';
import ruVocab29 from '../vocab/ru29';
import ruVocab30 from '../vocab/ru30';
import ruEx from '../vocab/ruEx';

export default enrich(ru, [
  ruVocab, ruVocab2, ruVocab3, ruVocab4, ruVocab5, ruVocab6, ruVocab7, ruVocab8, ruVocab9, ruVocab10, ruVocab11, ruVocab12, ruVocab13, ruVocab14, ruVocab15, ruVocab16, ruVocab17, ruVocab18, ruVocab19, ruVocab20, ruVocab21, ruVocab22, ruVocab23, ruVocab24, ruVocab25, ruVocab26, ruVocab27, ruVocab28, ruVocab29, ruVocab30,
].join(''), ruEx);
