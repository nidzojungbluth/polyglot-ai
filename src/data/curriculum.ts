// Lehrplan: 20 Themen × 6 Niveaustufen = 120 Modul-Plätze pro Sprache.
// Ein Platz ist erst „verfügbar“, wenn echte Inhalte dafür existieren.
import type { Level } from './types';

export const TOPICS: { key: string; title: string; icon: string }[] = [
  { key: 'greet', title: 'Begrüßen & Vorstellen', icon: '👋' },
  { key: 'time', title: 'Zahlen, Zeit & Wetter', icon: '🕒' },
  { key: 'smalltalk', title: 'Alltag & Smalltalk', icon: '☕' },
  { key: 'family', title: 'Familie & Freundschaft', icon: '👨‍👩‍👧' },
  { key: 'food', title: 'Restaurant, Café & Essen', icon: '🍽️' },
  { key: 'shop', title: 'Einkaufen & Preise', icon: '🛒' },
  { key: 'city', title: 'Stadt & Orientierung', icon: '🗺️' },
  { key: 'travel', title: 'Verkehr & Reisen', icon: '🚌' },
  { key: 'home', title: 'Wohnung & Behörden', icon: '🏠' },
  { key: 'work', title: 'Arbeit & Bewerbung', icon: '💼' },
  { key: 'fitness', title: 'Fitness, Training & Ernährung', icon: '🏋️' },
  { key: 'phone', title: 'Telefon & Chatnachrichten', icon: '📱' },
  { key: 'feelings', title: 'Gefühle & persönliche Gespräche', icon: '💭' },
  { key: 'love', title: 'Liebe, Dating & Flirten', icon: '❤️' },
  { key: 'conflict', title: 'Streit, Versöhnung & Grenzen', icon: '🤝' },
  { key: 'humor', title: 'Humor, Ironie & Reaktionen', icon: '😂' },
  { key: 'youth', title: 'Jugendsprache & Social Media', icon: '🔥' },
  { key: 'culture', title: 'Kultur & Umgangsformen', icon: '🎭' },
  { key: 'news', title: 'Nachrichten & Meinung', icon: '📰' },
  { key: 'grammar', title: 'Grammatik & Satzbau', icon: '🧩' },
];

export const LEVEL_INFO: Record<Level, string> = {
  A1: 'Anfänger',
  A2: 'Grundkenntnisse',
  B1: 'Selbstständige Kommunikation',
  B2: 'Fortgeschrittene Kommunikation',
  C1: 'Sehr fortgeschritten',
  C2: 'Nahezu muttersprachlich',
};

export const topicTitle = (key: string) => TOPICS.find((t) => t.key === key)?.title ?? key;
export const topicIcon = (key: string) => TOPICS.find((t) => t.key === key)?.icon ?? '📘';
