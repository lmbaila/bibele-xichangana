import type { AudioSource } from 'expo-audio';

/**
 * Mapa de narração real por versículo.
 * Chave: "<bi>-<ch>-<n>"  (bi = índice do livro em BOOKS, ch = capítulo, n = versículo)
 * Valor: require('...') do ficheiro .mp3/.m4a, OU { uri: 'https://...' } para streaming.
 *
 * Coloque os ficheiros em  src/assets/audio/  e registe-os aqui. Ex.:
 *   '0-1-1': require('./assets/audio/ge-1-1.mp3'),
 *   '0-1-2': require('./assets/audio/ge-1-2.mp3'),
 * Ou por streaming (CDN):
 *   '0-1-1': { uri: 'https://cdn.exemplo.org/xichangana/ge-1-1.mp3' },
 *
 * Versículos sem entrada aqui usam o relógio simulado (fallback), por isso a app
 * continua a funcionar mesmo sem todos os ficheiros.
 */
export const AUDIO: Record<string, AudioSource> = {
  // '0-1-1': require('./assets/audio/ge-1-1.mp3'),
};

export const audioKey = (bi: number, ch: number, n: number) => bi + '-' + ch + '-' + n;
export const hasAudio = (bi: number, ch: number, n: number) => audioKey(bi, ch, n) in AUDIO;
export const getAudio = (bi: number, ch: number, n: number): AudioSource | null =>
  AUDIO[audioKey(bi, ch, n)] ?? null;
