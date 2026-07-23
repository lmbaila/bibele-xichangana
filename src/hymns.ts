import type { Hymn, Hymnal } from './types';
import { MHALAMHALA_HYMNS } from './hymnals/mhalamhala';
import { YIMBELELELA_HYMNS } from './hymnals/yimbelelela';

// Registo dos hinários disponíveis na app. Acrescenta aqui uma linha por cada
// livro novo (ex: Harpa Cristã das Assembleias de Deus) antes de referenciar
// o seu 'id' no campo hymnalId de um cântico.
export const HYMNALS: Hymnal[] = [
  { id: 'mhalamhala', name: 'Mhalamhala ya Evangeli' },
  { id: 'yimbelelela', name: 'Yimbelelela Yehovha Hi Kutsaka' },
];

// Junta os cânticos de todos os hinários em src/hymnals/*. Para criar um hinário novo:
// 1. adiciona uma entrada a HYMNALS acima;
// 2. cria src/hymnals/<id>.ts com o mesmo formato de mhalamhala.ts (export const X_HYMNS: Hymn[] = [...]);
// 3. importa-o aqui e junta-o ao array abaixo.
export const HYMNS: Hymn[] = [
  ...MHALAMHALA_HYMNS,
  ...YIMBELELELA_HYMNS,
];

// Chave usada para marcar um cântico como favorito (único mesmo que dois
// hinários repitam o mesmo número de cântico).
export const hymnFavKey = (h: Hymn) => h.hymnalId + '-' + h.n;
