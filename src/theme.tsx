import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Theme, ThemeName, Highlight } from './types';

export const THEMES: Record<ThemeName, Theme> = {
  light: { page: '#F8F2EB', card: '#FFFDF9', ink: '#362B24', muted: '#7B6F66', border: '#E0DAD2', accent: '#9F634C', tint: '#F2E2D0', onAccent: '#FBF7EF', bar: 'dark' },
  sepia: { page: '#F1E4D4', card: '#F8EFE2', ink: '#423127', muted: '#715F53', border: '#DDCEBE', accent: '#975A3E', tint: '#EDD6BF', onAccent: '#FBF7EF', bar: 'dark' },
  night: { page: '#1A1511', card: '#29231D', ink: '#E5DDD0', muted: '#9A9085', border: '#3E3630', accent: '#E5A880', tint: '#443428', onAccent: '#1A1511', bar: 'light' },
};

export const HIGHLIGHTS: Highlight[] = [
  { k: 'sand', dot: '#EBCF7A', bg: 'rgba(248,220,134,0.55)' },
  { k: 'sage', dot: '#9FD3A9', bg: 'rgba(178,231,188,0.55)' },
  { k: 'rose', dot: '#FEAAA9', bg: 'rgba(255,189,188,0.5)' },
  { k: 'sky', dot: '#98CAF5', bg: 'rgba(184,228,255,0.5)' },
  { k: 'clay', dot: '#DE8E69', bg: 'rgba(251,176,142,0.5)' },
];

interface ThemeContextValue {
  themeName: ThemeName;
  theme: Theme;
  fontScale: number;
  setTheme: (t: ThemeName) => void;
  setScale: (f: number) => void;
  ready: boolean;
}

const ThemeCtx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('sepia');
  const [fontScale, setFontScale] = useState<number>(1);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('bibele_settings');
        if (raw) {
          const s = JSON.parse(raw) as { theme?: ThemeName; fontScale?: number };
          if (s.theme) setThemeName(s.theme);
          if (s.fontScale) setFontScale(s.fontScale);
        }
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  const persist = (theme: ThemeName, fs: number) => {
    AsyncStorage.setItem('bibele_settings', JSON.stringify({ theme, fontScale: fs })).catch(() => {});
  };
  const setTheme = (t: ThemeName) => { setThemeName(t); persist(t, fontScale); };
  const setScale = (n: number) => { setFontScale(n); persist(themeName, n); };

  const value: ThemeContextValue = { themeName, theme: THEMES[themeName], fontScale, setTheme, setScale, ready };
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
