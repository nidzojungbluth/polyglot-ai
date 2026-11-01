// Erzeugt PROJECT_PROGRESS.md (zentrale Fortschrittsdoku) mit echten Zahlen aus den Sprachdaten (npm run report).
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
const kb = (re: RegExp) => { const f = readdirSync('dist/assets').find((x) => re.test(x)); return f ? (statSync('dist/assets/' + f).size / 1024).toFixed(0) : '?'; };
import { PACKS } from '../src/data/all';
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
  const exPerLevel = LEVELS.map((l) => {
    const ws = p.words.filter((w) => w.level === l);
    return ws.length ? Math.round((ws.filter((w) => w.ex).length / ws.length) * 100) : 0;
  });
  const wordsEx = p.words.filter((w) => w.ex).length;
  return { p, total, ex, perLevel, exPerLevel, wordsEx, mods: mods.length, lessons, cloze: p.words.filter((w) => clozeFromExample(w)).length };
});

const date = new Date().toISOString().slice(0, 10);
const md = [
  '# Polyglot AI – PROJECT PROGRESS',
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
  '## Zwischenauftrag: Beispielsatz für jede Vokabel',
  '',
  'Anteil der Wörter mit Beispielsatz und deutscher Übersetzung (Slang hat immer einen Beispielsatz). Neue Wortlisten ab Nr. 19 müssen zu jedem Wort einen Beispielsatz enthalten – das prüft ein Test.',
  '',
  `| Sprache | Wörter mit Beispiel | ${LEVELS.join(' | ')} |`,
  `|---|---|${LEVELS.map(() => '---').join('|')}|`,
  ...rows.map((r) => `| ${r.p.name} | ${r.wordsEx} / ${r.p.words.length} (${Math.round((r.wordsEx / r.p.words.length) * 100)} %) | ${r.exPerLevel.map((x) => x + ' %').join(' | ')} |`),
  '',
  '## Ladezeit',
  '',
  existsSync('dist/assets') ? `App-Dateien (GitHub Pages): Kern ${kb(/^index-.*\.js$/)} KB, Sprachpakete ${['el', 'sr', 'ru'].map((c) => `${c} ${kb(new RegExp(`^${c}-.*\\.js$`))} KB`).join(', ')} (jede Sprache wird erst bei Bedarf geladen).` : 'App-Dateien: noch nicht gebaut.',
  '',
  '## Prüfstatus',
  '',
  '- **Von Muttersprachlern geprüft: 0 Einträge.** Alle Inhalte sind KI-erstellt.',
  '- **Automatisch geprüft: alle Einträge** – keine Duplikate, jede Übersetzung vorhanden, Russisch mit Betonung, Serbisch ohne Schriftmischung, Beispielsätze korrekt zugeordnet (siehe `tests/content.test.ts`).',
  '',
].join('\n');
const note = '\n---\n\nPlanung: `ROADMAP.md` · Status: `PROJECT_STATUS.md` · Entscheidungen: `DECISIONS.md` · Verlauf: `docs/CHANGELOG.md`\n';
writeFileSync('PROJECT_PROGRESS.md', md + note);
console.log(md);
