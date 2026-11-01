// Erzeugt docs/STATUS.md mit echten Zahlen aus den Sprachdaten (npm run report).
import { writeFileSync } from 'fs';
import { PACKS } from '../src/data';
import { LEVELS } from '../src/data/types';
import { clozeFromExample } from '../src/lib/exercises';
import { moduleLessons } from '../src/lib/course';

const GOAL = 5000;
const rows = PACKS.map((p) => {
  const total = p.words.length + p.slang.length;
  const ex = p.words.filter((w) => w.ex).length + p.slang.length;
  const perLevel = LEVELS.map((l) => p.words.filter((w) => w.level === l).length + p.slang.filter((s) => s.level === l).length);
  const mods = p.modules ?? [];
  const lessons = mods.reduce((n, m) => n + moduleLessons(p, m).length, 0);
  return { p, total, ex, perLevel, mods: mods.length, lessons, cloze: p.words.filter((w) => clozeFromExample(w)).length };
});

const date = new Date().toISOString().slice(0, 10);
const md = [
  '# Polyglot AI – Stand der Inhalte',
  '',
  `Automatisch erzeugt am ${date} mit \`npm run report\`. Ziel: ${GOAL} Einträge pro Sprache.`,
  '',
  '| Sprache | Einträge (Wörter + Slang) | Ziel erreicht | mit Beispielsatz | Lückentext möglich | Module | Lektionen |',
  '|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.p.flag} ${r.p.name} | ${r.total} | ${Math.round((r.total / GOAL) * 100)} % | ${r.ex} | ${r.cloze} | ${r.mods} | ${r.lessons} |`),
  '',
  '## Einträge pro Niveau',
  '',
  `| Sprache | ${LEVELS.join(' | ')} | ohne Niveau |`,
  `|---|${LEVELS.map(() => '---').join('|')}|---|`,
  ...rows.map((r) => `| ${r.p.name} | ${r.perLevel.join(' | ')} | ${r.total - r.perLevel.reduce((a, b) => a + b, 0)} |`),
  '',
  '## Prüfstatus',
  '',
  '- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.',
  '- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).',
  '',
].join('\n');
writeFileSync('docs/STATUS.md', md);
console.log(md);
