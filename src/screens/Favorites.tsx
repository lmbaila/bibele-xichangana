import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme, HIGHLIGHTS } from '../theme';
import { useLibrary } from '../library';
import { BOOKS, versesFor } from '../data';
import { HYMNS, HYMNALS, hymnFavKey } from '../hymns';
import { Touchable } from '../ui';
import type { TabParamList, Theme } from '../types';

type Props = NativeStackScreenProps<TabParamList, 'Favorites'>;

function Chip({ label, active, onPress, theme }: { label: string; active: boolean; onPress: () => void; theme: Theme }) {
  return (
    <Touchable onPress={onPress} className="flex-1 rounded-xl py-2.5 items-center"
      style={{ backgroundColor: active ? theme.accent : theme.card, borderWidth: 1, borderColor: active ? theme.accent : theme.border }}>
      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: active ? theme.onAccent : theme.muted }}>{label}</Text>
    </Touchable>
  );
}

export default function Favorites({ navigation }: Props) {
  const { theme } = useTheme();
  const { favs, highlights, toggleFav, hymnFavs, toggleHymnFav } = useLibrary();
  const nav = navigation as any;
  const [tab, setTab] = useState<'verses' | 'hymns'>('verses');
  const verseKeys = Object.keys(favs).sort((a, b) => favs[b] - favs[a]);
  const hymnItems = HYMNS.map((h, i) => ({ h, i }))
    .filter((x) => hymnFavs[hymnFavKey(x.h)])
    .sort((a, b) => hymnFavs[hymnFavKey(b.h)] - hymnFavs[hymnFavKey(a.h)]);

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink }}>Leswi rhandzekaka</Text>

      <View className="flex-row mt-5" style={{ gap: 8 }}>
        <Chip label="Tivhesi" active={tab === 'verses'} onPress={() => setTab('verses')} theme={theme} />
        <Chip label="Tinsimu" active={tab === 'hymns'} onPress={() => setTab('hymns')} theme={theme} />
      </View>

      {tab === 'verses' && (verseKeys.length === 0 ? (
        <View className="items-center px-6" style={{ paddingVertical: 80 }}>
          <Text style={{ fontSize: 40, color: theme.border }}>{'\u2606'}</Text>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 19, color: theme.ink, marginTop: 14 }}>A wu si hlawula vhesi</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, lineHeight: 21, color: theme.muted, marginTop: 6, textAlign: 'center' }}>Tshinya vhesi loko u ri hlaya kutani u ri veka laha.</Text>
        </View>
      ) : (
        <View className="mt-4" style={{ gap: 10 }}>
          {verseKeys.map((key) => {
            const [bi, ch, n] = key.split('-').map(Number);
            const v = versesFor(bi, ch).find((x) => x.n === n);
            const hk = highlights[key];
            const hl = hk ? HIGHLIGHTS.find((h) => h.k === hk) : null;
            return (
              <View key={key} className="rounded-2xl px-4 py-4" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
                <View className="flex-row items-center justify-between">
                  <Text onPress={() => nav.navigate('ReadTab', { screen: 'Reader', params: { bi, ch } })} style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: theme.accent }}>{BOOKS[bi].n + ' ' + ch + ':' + n}</Text>
                  <Text onPress={() => toggleFav(key)} style={{ color: theme.accent, fontSize: 15 }}>{'\u2605'}</Text>
                </View>
                <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 17, lineHeight: 25, color: theme.ink, marginTop: 7, backgroundColor: hl ? hl.bg : 'transparent', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 4 }}>{v ? v.text : ''}</Text>
              </View>
            );
          })}
        </View>
      ))}

      {tab === 'hymns' && (hymnItems.length === 0 ? (
        <View className="items-center px-6" style={{ paddingVertical: 80 }}>
          <Text style={{ fontSize: 40, color: theme.border }}>{'\u2606'}</Text>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 19, color: theme.ink, marginTop: 14 }}>A wu si hlawula risimu</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, lineHeight: 21, color: theme.muted, marginTop: 6, textAlign: 'center' }}>Tshinya nyeleti loko u ri hlaya kutani u ri veka laha.</Text>
        </View>
      ) : (
        <View className="mt-4" style={{ gap: 10 }}>
          {hymnItems.map(({ h, i }) => {
            const hymnal = HYMNALS.find((b) => b.id === h.hymnalId);
            return (
              <View key={hymnFavKey(h)} className="rounded-2xl px-4 py-4" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
                <View className="flex-row items-center justify-between">
                  <Text onPress={() => nav.navigate('Songs', { screen: 'SongDetail', params: { song: i } })} style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: theme.accent }}>{'RISIMU ' + h.n}</Text>
                  <Text onPress={() => toggleHymnFav(hymnFavKey(h))} style={{ color: theme.accent, fontSize: 15 }}>{'\u2605'}</Text>
                </View>
                <Text onPress={() => nav.navigate('Songs', { screen: 'SongDetail', params: { song: i } })} style={{ fontFamily: 'Newsreader_500Medium', fontSize: 17, color: theme.ink, marginTop: 7 }}>{h.title}</Text>
                <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 2 }}>{(hymnal ? hymnal.name : '') + ' \u00b7 ' + h.category}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
