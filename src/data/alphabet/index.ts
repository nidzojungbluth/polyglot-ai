import type { AbcCourse } from './types';
import { abcEl } from './el';
import { abcRu } from './ru';
import { abcSr } from './sr';

export const ABC: AbcCourse[] = [abcEl, abcSr, abcRu];
export const abcFor = (code: string) => ABC.find((c) => c.code === code);
export type { AbcCourse, AbcUnit, AbcLetter } from './types';
