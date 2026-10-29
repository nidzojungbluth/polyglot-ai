// Text-Hilfen: Antworten tolerant vergleichen (Groß/klein, Akzente, Satzzeichen).

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')         // Akzente entfernen (á → a, ά → α)
    .replace(/ς/g, 'σ')
    .replace(/[’']/g, "'")
    .replace(/[.,!?;:¿¡“”"…()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Akzeptierte Varianten eines Eintrags wie "umoran / umorna" oder "a cup of tea / a cuppa". */
export function variants(t: string): string[] {
  const base = t.replace(/…/g, '').replace(/\(.*?\)/g, '');
  const parts = base.split('/').map((p) => normalize(p)).filter(Boolean);
  return Array.from(new Set([normalize(base), ...parts]));
}

export function matches(input: string, target: string): boolean {
  const n = normalize(input);
  if (!n) return false;
  return variants(target).some((v) => v === n);
}

export function shuffle<T>(arr: T[], rnd = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
