// Sprachcoach: (1) echte KI über die Claude-Funktion der Seite, falls verfügbar,
// (2) sonst ein ehrlich gekennzeichneter, regelbasierter Offline-Coach.
import type { LanguagePack, SlangEntry, Word, CoachRule } from '../data/types';
import { REGISTER_INFO } from '../data/types';
import type { CoachMode, CoachMsg } from './store';
import { normalize } from './text';

export interface RuleHit { rule: CoachRule; key: string }

export function checkRules(pack: LanguagePack, input: string): RuleHit[] {
  const hits: RuleHit[] = [];
  for (const rule of pack.coachRules) {
    try {
      if (new RegExp(rule.pattern, 'iu').test(input)) hits.push({ rule, key: `${pack.code}:${rule.pattern}` });
    } catch { /* fehlerhafte Regel ignorieren */ }
  }
  return hits;
}

function containsTerm(input: string, term: string): boolean {
  const n = ` ${normalize(input)} `;
  return term.split('/').map((p) => normalize(p.replace(/…|\(.*?\)/g, ''))).filter((p) => p.length > 1)
    .some((p) => n.includes(` ${p} `) || (p.includes(' ') && n.includes(p)));
}

export function findSlang(pack: LanguagePack, input: string): SlangEntry[] {
  return pack.slang.filter((s) => containsTerm(input, s.t) || (s.tr ? containsTerm(input, s.tr) : false));
}

export function findWords(pack: LanguagePack, input: string): Word[] {
  return pack.words.filter((w) => containsTerm(input, w.t) || (w.tr ? containsTerm(input, w.tr) : false));
}

export function explainSlang(s: SlangEntry): string {
  return [
    `„${s.t}“${s.tr ? ` (${s.tr})` : ''} – ${s.de}`,
    `• Register: ${REGISTER_INFO[s.reg].label} · Wirkung: ${s.politeness}`,
    `• Region: ${s.region}`,
    `• Typisch: ${s.situation}`,
    `• Soziale Wirkung: ${s.effect}`,
    `• Neutral/formell stattdessen: ${s.formal}`,
    `• Beispiel: ${s.ex.t} → ${s.ex.de}`,
  ].join('\n');
}

/** Regelbasierte Antwort. Bewusst schlicht – kein freies Sprachmodell. */
export function ruleReply(pack: LanguagePack, input: string, mode: CoachMode, slang: number): { text: string; hits: RuleHit[] } {
  const lines: string[] = [];
  const hits = checkRules(pack, input);
  const n = normalize(input);

  if (/^(hilfe|help|\?)$/.test(n)) {
    return { hits, text: [
      'So kann ich dir offline helfen:',
      '• Schreib einen Satz in der Zielsprache – ich prüfe typische Fehler.',
      '• „slang“ – zeigt dir einen Slang-Ausdruck mit Erklärung.',
      '• „was heißt <Wort>“ – Übersetzung aus dem Wörterbuch.',
      '• Schreib ein Slang-Wort – ich erkläre Bedeutung und Wirkung.',
    ].join('\n') };
  }

  const what = n.match(/^(was hei(?:ss|ß)t|was bedeutet|ubersetze|what is) (.+)$/);
  if (what) {
    const q = what[2];
    const found = pack.words.filter((w) => normalize(w.de).includes(q) || normalize(w.t).includes(q))
      .concat(pack.slang.filter((s) => normalize(s.de).includes(q) || normalize(s.t).includes(q)) as unknown as Word[])
      .slice(0, 4);
    if (!found.length) return { hits, text: `Dazu habe ich im ${pack.name}-Paket nichts gefunden. Probier das Wörterbuch oder ein anderes Wort.` };
    return { hits, text: found.map((w) => `${w.t}${w.tr ? ` (${w.tr})` : ''} = ${w.de}  [${REGISTER_INFO[w.reg].label}]`).join('\n') };
  }

  if (n === 'slang') {
    const pool = pack.slang.filter((s) => slang >= 2 || s.reg !== 'vulgär');
    const s = pool[Math.floor(Math.random() * pool.length)];
    return { hits, text: explainSlang(s) };
  }

  for (const h of hits) lines.push(`✏️ Besser: ${h.rule.fix}\n${h.rule.why}`);

  const sl = findSlang(pack, input);
  for (const s of sl.slice(0, 2)) lines.push(`💬 Slang erkannt:\n${explainSlang(s)}`);

  const ws = findWords(pack, input).slice(0, 3);
  if (ws.length && mode !== 'immersion') {
    lines.push('📖 Erkannt: ' + ws.map((w) => `${w.t} = ${w.de}`).join(' · '));
    const casual = pack.words.filter((w) => ws.some((x) => x.cat === w.cat) && (w.reg === 'locker' || w.reg === 'slang') && !ws.includes(w));
    if (slang > 0 && casual.length) lines.push(`😎 Lockerer klingt z. B.: ${casual[0].t} (${casual[0].de})`);
  }

  if (!lines.length) {
    lines.push(mode === 'immersion'
      ? 'Ich bin der Offline-Regelcoach und verstehe nur Wörter aus dem Sprachpaket. Versuch einen Satz mit Wörtern aus den Lektionen.'
      : 'Keine typischen Fehler gefunden – aber Achtung: Offline erkenne ich nur bekannte Muster. Schreib „hilfe“ für Befehle oder übe mit einem Rollenspiel.');
  } else if (!hits.length && mode !== 'immersion') {
    lines.push('👍 Keine typischen Fehler gefunden.');
  }
  return { hits, text: lines.join('\n\n') };
}

/** Anweisungen für die echte KI. Sie hat kein Gedächtnis, deshalb steckt alles im Text. */
export function buildAiInstructions(opts: {
  pack: LanguagePack; mode: CoachMode; slang: number; interests: string; mistakes: string[];
}): string {
  const { pack, mode, slang, interests, mistakes } = opts;
  const modeText = {
    lernen: 'LERNMODUS: Antworte kurz in einfacher Zielsprache und erkläre auf Deutsch. Korrigiere jeden Fehler freundlich.',
    alltag: 'ALLTAGSMODUS: Rede wie ein Freund aus der Stadt, natürlich und locker in der Zielsprache. Korrekturen kurz auf Deutsch am Ende.',
    immersion: 'IMMERSIONSMODUS: Antworte nur in der Zielsprache, auch Korrekturen. Deutsch nur, wenn der Nutzer ausdrücklich darum bittet.',
  }[mode];
  const slangText = ['Benutze keinen Slang.', 'Benutze etwas gängige Umgangssprache und erkläre sie kurz.', 'Benutze viel echte Umgangssprache und Jugendsprache und erkläre sie. Derbe Ausdrücke nur mit Kennzeichnung (⚠️ derb).'][slang] ?? '';
  return [
    `Du bist der Sprachcoach in der App „Polyglot AI“. Zielsprache: ${pack.native} (${pack.name}), Stil wie in ${pack.city}. Der Nutzer spricht Deutsch.`,
    pack.focus ? `Regionaler Schwerpunkt: ${pack.focus} Unterscheide klar zwischen landesweitem Sprachgebrauch und echten regionalen Besonderheiten.` : '',
    pack.scripts === 'sr' ? 'Schreibe Serbisch in lateinischer Schrift und gib bei neuen Wörtern die kyrillische Form in Klammern an.' : '',
    pack.code === 'ru' ? 'Markiere bei neuen russischen Wörtern die Betonung mit einem Akzent (´).' : '',
    'Sei locker, humorvoll und nie herablassend. Halte Antworten kurz (höchstens etwa 6 Zeilen, Handy-Bildschirm).',
    modeText,
    slangText,
    'Wenn der Nutzer Fehler macht: zeige die bessere Form mit „✏️“ und erkläre in einem Satz warum.',
    'Erfinde keine Slang-Ausdrücke. Wenn du dir bei einem Ausdruck nicht sicher bist, ob Muttersprachler ihn wirklich so benutzen, schreib „(unsicher)“ dahinter.',
    'Stelle am Ende meist eine kurze Gegenfrage, damit das Gespräch weitergeht. Bei Rollenspiel-Wunsch spielst du die andere Person.',
    interests ? `Interessen des Nutzers: ${interests}. Nutze sie für Beispiele.` : '',
    mistakes.length ? `Frühere typische Fehler des Nutzers: ${mistakes.join(' | ')}. Achte besonders darauf.` : '',
  ].filter(Boolean).join('\n');
}

export function buildAiMessages(instructions: string, history: CoachMsg[], input: string): { role: 'user' | 'assistant'; content: string }[] {
  const recent = history.slice(-10).map((m) => ({ role: m.role, content: m.content }));
  // Verlauf muss mit "user" beginnen.
  while (recent.length && recent[0].role !== 'user') recent.shift();
  const msgs = [...recent, { role: 'user' as const, content: input }];
  msgs[0] = { role: 'user', content: `[Anweisungen für dich]\n${instructions}\n\n[Nachricht des Nutzers]\n${msgs[0].content}` };
  return msgs;
}
