// Umschrift (Aussprachehilfe) und Schriftwechsel – automatisch, damit große Wortschätze
// nicht von Hand umgeschrieben werden müssen.

// ---------- Serbisch: Latein ↔ Kyrillisch (eindeutig, Vuk-Karadžić-Alphabet) ----------
const SR_DI: [string, string][] = [['lj', 'љ'], ['nj', 'њ'], ['dž', 'џ'], ['Lj', 'Љ'], ['LJ', 'Љ'], ['Nj', 'Њ'], ['NJ', 'Њ'], ['Dž', 'Џ'], ['DŽ', 'Џ']];
const SR_ONE: Record<string, string> = {
  a: 'а', b: 'б', c: 'ц', č: 'ч', ć: 'ћ', d: 'д', đ: 'ђ', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', j: 'ј', k: 'к', l: 'л',
  m: 'м', n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', š: 'ш', t: 'т', u: 'у', v: 'в', z: 'з', ž: 'ж',
};
// Wörter, in denen "nj"/"dž" KEIN Einzelbuchstabe ist (Präfix + Wurzel)
const SR_EXCEPT: Record<string, string> = { nadživeti: 'надживети', injekcija: 'инјекција', konjunkcija: 'конјункција' };

export function srLatToCyr(text: string): string {
  return text.replace(/[A-Za-zČĆĐŠŽčćđšž]+/g, (word) => {
    const ex = SR_EXCEPT[word.toLowerCase()];
    if (ex) return word[0] === word[0].toUpperCase() ? ex[0].toUpperCase() + ex.slice(1) : ex;
    let out = '';
    for (let i = 0; i < word.length; i++) {
      const two = word.slice(i, i + 2);
      const di = SR_DI.find(([l]) => l === two);
      if (di) { out += di[1]; i++; continue; }
      const ch = word[i];
      const low = ch.toLowerCase();
      const c = SR_ONE[low];
      out += c ? (ch === low ? c : c.toUpperCase()) : ch;
    }
    return out;
  });
}

const SR_BACK: Record<string, string> = Object.fromEntries([
  ...Object.entries(SR_ONE).map(([l, c]) => [c, l]), ['љ', 'lj'], ['њ', 'nj'], ['џ', 'dž'],
]);
export function srCyrToLat(text: string): string {
  return text.replace(/[Ѐ-ӿ]/g, (ch) => {
    const low = ch.toLowerCase();
    const l = SR_BACK[low];
    if (!l) return ch;
    return ch === low ? l : l[0].toUpperCase() + l.slice(1);
  });
}

// ---------- Russisch → Latein (lernfreundlich; Betonung aus dem Akzentzeichen übernommen) ----------
const RU: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'jo', ж: 'zh', з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm',
  н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'ch', ц: 'ts', ч: 'tsch', ш: 'sch', щ: 'schtsch',
  ъ: '', ы: 'y', ь: "'", э: 'e', ю: 'ju', я: 'ja',
};
const RU_SPECIAL: Record<string, string> = { что: 'schto', чтобы: 'schtoby', конечно: 'koneschno', скучно: 'skuschno', сегодня: 'sevodnja', его: 'jevo', ничего: 'nitschevo', чего: 'tschevo', кого: 'kovo', того: 'tovo', всего: 'vsevo' };
const ACUTE = '́';
const accent = (v: string) => ({ a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', y: 'ý' } as Record<string, string>)[v] ?? v;

export function ruTranslit(text: string): string {
  return text.replace(/[Ѐ-ӿ́]+/g, (word) => {
    const plain = word.replace(new RegExp(ACUTE, 'g'), '').toLowerCase();
    if (RU_SPECIAL[plain]) return RU_SPECIAL[plain];
    let out = '';
    const chars = Array.from(word.toLowerCase());
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (ch === ACUTE) continue;
      let t = RU[ch] ?? ch;
      // е/я/ю am Wortanfang oder nach Vokal/Zeichen → mit j
      if (ch === 'е' && (i === 0 || /[аеёиоуыэюяъь]/.test(chars[i - 1] ?? ''))) t = 'je';
      if (chars[i + 1] === ACUTE) {
        // Akzent auf den letzten Vokal der Umschrift setzen
        const m = t.match(/^(.*?)([aeiouy])([^aeiouy]*)$/);
        if (m) t = m[1] + accent(m[2]) + m[3];
      }
      out += t;
    }
    return out;
  });
}
export const stripStress = (s: string) => s.replace(/́/g, '');

// ---------- Griechisch → Latein (Aussprache, nicht Buchstabe für Buchstabe) ----------
const GR_VOICELESS = 'θκξπστφχψ';
const ACC: Record<string, [string, boolean]> = {
  α: ['a', false], ά: ['a', true], ε: ['e', false], έ: ['e', true], η: ['i', false], ή: ['i', true], ι: ['i', false], ί: ['i', true],
  ϊ: ['i', false], ΐ: ['i', true], ο: ['o', false], ό: ['o', true], υ: ['i', false], ύ: ['i', true], ϋ: ['i', false], ΰ: ['i', true],
  ω: ['o', false], ώ: ['o', true],
};
const CONS: Record<string, string> = { β: 'v', δ: 'dh', ζ: 'z', θ: 'th', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', π: 'p', ρ: 'r', σ: 's', ς: 's', τ: 't', φ: 'f', χ: 'ch', ψ: 'ps' };
const FRONT = /^(ε|έ|η|ή|ι|ί|υ|ύ|αι|αί|ει|εί|οι|οί)/;

export function grTranslit(text: string): string {
  return text.replace(/[Ͱ-Ͽἀ-῿]+/g, (word) => {
    const w = word.toLowerCase();
    let out = '';
    let i = 0;
    const at = (k: number) => w[k] ?? '';
    while (i < w.length) {
      const two = w.slice(i, i + 2);
      const rest = w.slice(i);
      const start = i === 0;
      // Doppelvokale
      const dv: Record<string, string> = { ου: 'u', ού: 'ú', αι: 'e', αί: 'é', ει: 'i', εί: 'í', οι: 'i', οί: 'í', υι: 'i' };
      if (dv[two]) { out += dv[two]; i += 2; continue; }
      if (/^(α|ε)(υ|ύ)/.test(rest)) {
        const base = w[i] === 'α' ? 'a' : 'e';
        const acc = w[i + 1] === 'ύ';
        const next = at(i + 2);
        const f = !next || GR_VOICELESS.includes(next);
        out += (acc ? accent(base) : base) + (f ? 'f' : 'v'); i += 2; continue;
      }
      if (/^(ά|έ)υ/.test(rest)) { out += accent(w[i] === 'ά' ? 'a' : 'e') + (GR_VOICELESS.includes(at(i + 2)) || !at(i + 2) ? 'f' : 'v'); i += 2; continue; }
      if (two === 'μπ') { out += start ? 'b' : 'mb'; i += 2; continue; }
      if (two === 'ντ') { out += start ? 'd' : 'nd'; i += 2; continue; }
      if (two === 'γκ') { out += start ? 'g' : 'ng'; i += 2; continue; }
      if (two === 'γγ') { out += 'ng'; i += 2; continue; }
      if (two === 'τσ') { out += 'ts'; i += 2; continue; }
      if (two === 'τζ') { out += 'dz'; i += 2; continue; }
      const ch = w[i];
      if (ch === 'γ') {
        // γεια, γιαγιά: „j“ + Vokal – das unbetonte ι/ει dazwischen wird nicht gesprochen
        const m = w.slice(i + 1).match(/^(ει|ι)(?=[αάεέοόωώουού])/);
        if (m) { out += 'j'; i += 1 + m[1].length; continue; }
        out += FRONT.test(w.slice(i + 1)) ? 'j' : 'g'; i++; continue;
      }
      if (ACC[ch]) { const [v, a] = ACC[ch]; out += a ? accent(v) : v; i++; continue; }
      out += CONS[ch] ?? ch;
      i++;
    }
    return out;
  });
}

/**
 * Lateinische Umschrift für Griechisch und Russisch – für einzelne Wörter und ganze Sätze.
 * Wird Wort für Wort umgeschrieben; Großschreibung am Wortanfang (Satzanfang, Namen) bleibt erhalten.
 */
export function autoTranslit(code: string, text: string): string | undefined {
  const f = code === 'el' ? (t: string) => grTranslit(t).replace(/[;;]/g, '?') : code === 'ru' ? ruTranslit : null;
  if (!f) return undefined;
  return text
    .split(/(\s+)/)
    .map((tok) => {
      if (!tok || /^\s+$/.test(tok)) return tok;
      const out = f(tok);
      const first = tok.match(/\p{L}/u)?.[0];
      if (first && first !== first.toLowerCase()) {
        const i = out.search(/\p{L}/u);
        if (i >= 0) return out.slice(0, i) + out[i].toUpperCase() + out.slice(i + 1);
      }
      return out;
    })
    .join('');
}
