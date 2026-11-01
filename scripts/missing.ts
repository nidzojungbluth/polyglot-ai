// Listet Wörter ohne Beispielsatz: npm run missing -- <Niveau> [Anzahl]
import { PACKS } from '../src/data/index';
const lvl = process.argv[2] ?? 'B2'; const n = +(process.argv[3] ?? 80);
for (const code of ['el', 'sr', 'ru']) {
  const p = PACKS.find((x) => x.code === code)!;
  const out = p.words.filter((w) => w.level === lvl && !w.ex && !/^(numbers|zahlen)/.test(w.cat)).map((w) => `${w.t} = ${w.de} [${w.cat}]`);
  console.log(`### ${code} ${lvl} fehlend: ${out.length}`);
  console.log(out.slice(0, n).join('\n'));
}
