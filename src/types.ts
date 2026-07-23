export type Testament = 'ot' | 'nt';
export interface Book { n: string; a: string; c: number; t: Testament; }
export interface Verse { n: number; text: string; }
export interface HymnPart { t: string; lines: string; chorus?: boolean; }
export interface HymnRef { book: string; n: number; }
export interface Hymnal { id: string; name: string; }
export interface Hymn {
  n: number;
  title: string;
  hymnalId: string;
  category: string;
  scripture?: string;
  refs?: HymnRef[];
  tune?: string;
  attribution?: string;
  parts: HymnPart[];
}
export interface IndexEntry { bi: number; ch: number; n: number; text: string; }

export type ThemeName = 'light' | 'sepia' | 'night';
export interface Theme {
  page: string; card: string; ink: string; muted: string; border: string;
  accent: string; tint: string; onAccent: string; bar: 'light' | 'dark';
}
export interface Highlight { k: string; dot: string; bg: string; }

// Navigation param lists
export type ReadStackParamList = {
  Books: undefined;
  Chapters: { bi: number };
  Reader: { bi: number; ch: number };
  Audio: { bi: number; ch: number; verse?: number };
};
export type SongStackParamList = {
  Hymnals: undefined;
  SongList: { hymnalId: string };
  SongDetail: { song: number };
};
export type TabParamList = {
  ReadTab: undefined;
  Search: undefined;
  Songs: undefined;
  News: undefined;
  Favorites: undefined;
  Settings: undefined;
};
