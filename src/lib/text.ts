import { srCyrToLat } from './translit';

// Text-Hilfen: Antworten tolerant vergleichen (Groß/klein, Akzente, Satzzeichen).

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')         // Akzente entfernen (á → a, ά → α)
    .replace(/ς/g, 'σ')
    .replace(/[’']/g, "'")
    .replace(/[.,!?;:¿¡“”"«»…()–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Akzeptierte Varianten eines Eintrags wie "umoran / umorna" oder "a cup of tea / a cuppa". */
export function variants(t: string): string[] {
  const base = t.replace(/…/g, '').replace(/\(.*?\)/g, '');
  const parts = base.split('/').map((p) => normalize(p)).filter(Boolean);
  return Array.from(new Set([normalize(base), ...parts]));
}

/** Serbisch: Kyrillisch und Latein gelten als gleich. */
function forLang(s: string, lang?: string): string {
  return lang === 'sr' ? srCyrToLat(s) : s;
}

export function matches(input: string, target: string, lang?: string): boolean {
  const n = normalize(forLang(input, lang));
  if (!n) return false;
  return variants(forLang(target, lang)).some((v) => v === n);
}

export function sameAnswer(a: string, b: string, lang?: string): boolean {
  const x = normalize(forLang(a, lang));
  return !!x && x === normalize(forLang(b, lang));
}

export function shuffle<T>(arr: T[], rnd = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
