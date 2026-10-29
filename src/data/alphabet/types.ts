// Schriftkurs: Datenmodell

export interface AbcExample { t: string; tr: string; de: string }

export interface AbcLetter {
  up: string;          // Großbuchstabe
  low: string;         // Kleinbuchstabe (bei Griechisch Σ: "σ ς")
  name: string;        // Name des Buchstabens (mit Aussprache)
  sound: string;       // Laut / deutsche Aussprachehilfe (kurz, als Antwortoption)
  hint: string;        // ausführlichere Erklärung
  ex: AbcExample;      // Beispielwort
  trap?: string;       // typische Falle
  lat?: string;        // Serbisch: lateinische Entsprechung
}

export interface AbcCombo { t: string; sound: string; hint: string; ex: AbcExample }

export interface AbcWord { t: string; tr: string; de: string; syl?: string }

export type AbcUnitKind = 'letters' | 'combos' | 'syllables' | 'words' | 'sentences' | 'convert';

export interface AbcUnit {
  id: string;
  title: string;
  kind: AbcUnitKind;
  intro: string;
  letters?: AbcLetter[];
  combos?: AbcCombo[];
  words?: AbcWord[];
  explain?: { title: string; text: string }[];
}

export interface AbcCourse {
  code: string;
  title: string;
  intro: string;
  forBeginners: boolean;   // false = eher Einstufung (Serbisch)
  units: AbcUnit[];
}
