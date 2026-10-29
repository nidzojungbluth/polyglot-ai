import type { CatalogEntry, LanguagePack } from './types';
import { en } from './en';
import { es } from './es';
import { el } from './el';
import { sr } from './sr';

/** Vollständige Sprachpakete. Neue Sprache: Datei anlegen und hier eintragen. */
export const PACKS: LanguagePack[] = [en, es, el, sr];

export const packByCode = (code: string): LanguagePack | undefined => PACKS.find((p) => p.code === code);

/** Geplante Sprachen – bewusst OHNE Inhalte, damit nichts Unfertiges als Kurs erscheint. */
export const PLANNED: CatalogEntry[] = [
  { code: 'de', name: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Französisch', native: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italienisch', native: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portugiesisch', native: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russisch', native: 'Русский', flag: '🇷🇺' },
  { code: 'hr', name: 'Kroatisch', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'mk', name: 'Mazedonisch', native: 'Македонски', flag: '🇲🇰' },
  { code: 'bg', name: 'Bulgarisch', native: 'Български', flag: '🇧🇬' },
  { code: 'tr', name: 'Türkisch', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'Arabisch', native: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'he', name: 'Hebräisch', native: 'עברית', flag: '🇮🇱', rtl: true },
  { code: 'fa', name: 'Persisch', native: 'فارسی', flag: '🇮🇷', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'zh', name: 'Chinesisch', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanisch', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Koreanisch', native: '한국어', flag: '🇰🇷' },
  { code: 'id', name: 'Indonesisch', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'la', name: 'Latein', native: 'Lingua Latina', flag: '🏛️' },
  { code: 'grc', name: 'Altgriechisch', native: 'Ἑλληνική', flag: '🏺' },
];
