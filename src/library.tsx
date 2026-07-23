import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Dict<T> = Record<string, T>;

interface LibraryContextValue {
  highlights: Dict<string>;
  favs: Dict<number>;
  hymnFavs: Dict<number>;
  lastCh: Dict<number>;
  setHighlight: (key: string, color: string) => void;
  clearHighlight: (key: string) => void;
  toggleFav: (key: string) => boolean;
  toggleHymnFav: (key: string) => boolean;
  setLastChapter: (bi: number, ch: number) => void;
}

const LibCtx = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [highlights, setHighlights] = useState<Dict<string>>({});
  const [favs, setFavs] = useState<Dict<number>>({});
  const [hymnFavs, setHymnFavs] = useState<Dict<number>>({});
  const [lastCh, setLastCh] = useState<Dict<number>>({});

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('bibele_library');
        if (raw) {
          const s = JSON.parse(raw) as { highlights?: Dict<string>; favs?: Dict<number>; hymnFavs?: Dict<number>; lastCh?: Dict<number> };
          setHighlights(s.highlights || {});
          setFavs(s.favs || {});
          setHymnFavs(s.hymnFavs || {});
          setLastCh(s.lastCh || {});
        }
      } catch (e) {}
    })();
  }, []);

  const persist = (h: Dict<string>, fv: Dict<number>, hf: Dict<number>, lc: Dict<number>) =>
    AsyncStorage.setItem('bibele_library', JSON.stringify({ highlights: h, favs: fv, hymnFavs: hf, lastCh: lc })).catch(() => {});

  const setHighlight = (key: string, color: string) => {
    setHighlights((prev) => {
      const next = { ...prev };
      if (next[key] === color) delete next[key]; else next[key] = color;
      persist(next, favs, hymnFavs, lastCh);
      return next;
    });
  };
  const clearHighlight = (key: string) => {
    setHighlights((prev) => { const next = { ...prev }; delete next[key]; persist(next, favs, hymnFavs, lastCh); return next; });
  };
  const toggleFav = (key: string): boolean => {
    let added = false;
    setFavs((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key]; else { next[key] = Date.now(); added = true; }
      persist(highlights, next, hymnFavs, lastCh);
      return next;
    });
    return added;
  };
  const toggleHymnFav = (key: string): boolean => {
    let added = false;
    setHymnFavs((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key]; else { next[key] = Date.now(); added = true; }
      persist(highlights, favs, next, lastCh);
      return next;
    });
    return added;
  };
  const setLastChapter = (bi: number, ch: number) => {
    setLastCh((prev) => {
      if (prev[bi] === ch) return prev;
      const next = { ...prev, [bi]: ch };
      persist(highlights, favs, hymnFavs, next);
      return next;
    });
  };

  return (
    <LibCtx.Provider value={{ highlights, favs, hymnFavs, lastCh, setHighlight, clearHighlight, toggleFav, toggleHymnFav, setLastChapter }}>
      {children}
    </LibCtx.Provider>
  );
}

export const useLibrary = (): LibraryContextValue => {
  const ctx = useContext(LibCtx);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
