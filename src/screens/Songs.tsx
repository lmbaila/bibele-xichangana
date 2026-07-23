import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { useLibrary } from '../library';
import { HYMNS, HYMNALS, hymnFavKey } from '../hymns';
import type { SongStackParamList, Hymn, Theme } from '../types';
import { Touchable } from '../ui';
import { IconChevron, IconSearch, IconBack } from '../icons';

type Props = NativeStackScreenProps<SongStackParamList, 'SongList'>;

function SongRow({ h, theme, fav, onPress, onToggleFav }: { h: Hymn; theme: Theme; fav: boolean; onPress: () => void; onToggleFav: () => void }) {
  return (
    <Touchable onPress={onPress} className="flex-row items-center rounded-2xl p-3.5 mb-0.5" style={{ gap: 14 }}>
      <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: theme.tint }}><Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 17, color: theme.accent }}>{h.n}</Text></View>
      <View className="flex-1"><Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 16, color: theme.ink }}>{h.title}</Text><Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 1 }}>{h.parts.length} tiphara</Text></View>
      <Touchable onPress={onToggleFav} borderless hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={{ paddingHorizontal: 2 }}>
        <Text style={{ fontSize: 17, color: theme.accent }}>{fav ? '★' : '☆'}</Text>
      </Touchable>
      <IconChevron color={theme.muted} />
    </Touchable>
  );
}

export default function Songs({ route, navigation }: Props) {
  const { theme } = useTheme();
  const { hymnFavs, toggleHymnFav } = useLibrary();
  const { hymnalId } = route.params;
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const hymnal = HYMNALS.find((b) => b.id === hymnalId);

  const pinned = useMemo(() => {
    return HYMNS.map((h, i) => ({ h, i }))
      .filter((x) => x.h.hymnalId === hymnalId && hymnFavs[hymnFavKey(x.h)])
      .sort((a, b) => hymnFavs[hymnFavKey(b.h)] - hymnFavs[hymnFavKey(a.h)]);
  }, [hymnalId, hymnFavs]);

  const groups = useMemo(() => {
    const inHymnal = HYMNS.map((h, i) => ({ h, i })).filter((x) => x.h.hymnalId === hymnalId);
    const filtered = query
      ? inHymnal.filter((x) => x.h.title.toLowerCase().includes(query) || x.h.category.toLowerCase().includes(query) || String(x.h.n) === query)
      : inHymnal;
    const order: string[] = [];
    const byCategory: Record<string, { h: typeof HYMNS[number]; i: number }[]> = {};
    for (const item of filtered) {
      if (!byCategory[item.h.category]) { byCategory[item.h.category] = []; order.push(item.h.category); }
      byCategory[item.h.category].push(item);
    }
    return order.map((category) => ({ category, items: byCategory[category] }));
  }, [hymnalId, query]);

  const none = query && groups.length === 0;

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Touchable onPress={() => navigation.goBack()} className="flex-row items-center py-1.5 self-start" style={{ gap: 5 }} borderless>
        <IconBack color={theme.accent} />
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.accent }}>Tinsimu</Text>
      </Touchable>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink, marginTop: 8 }}>{hymnal ? hymnal.name : 'Tinsimu'}</Text>

      <View className="flex-row items-center rounded-2xl px-4 py-3 mt-4" style={{ gap: 10, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
        <IconSearch color={theme.muted} size={17} />
        <TextInput value={q} onChangeText={setQ} placeholder="Lava risimu kumbe ntlawa…" placeholderTextColor={theme.muted}
          style={{ flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 15, color: theme.ink, padding: 0 }} />
        {q ? <Text onPress={() => setQ('')} style={{ color: theme.muted, fontSize: 18 }}>{'×'}</Text> : null}
      </View>

      {!query && pinned.length > 0 && (
        <View className="mt-5">
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginBottom: 8, marginLeft: 4 }}>{'★ RHANDZIWA'}</Text>
          {pinned.map(({ h, i }) => (
            <SongRow key={hymnFavKey(h)} h={h} theme={theme} fav
              onPress={() => navigation.navigate('SongDetail', { song: i })}
              onToggleFav={() => toggleHymnFav(hymnFavKey(h))} />
          ))}
        </View>
      )}

      {groups.map((g) => (
        <View key={g.category} className="mt-5">
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginBottom: 8, marginLeft: 4 }}>{g.category}</Text>
          {g.items.map(({ h, i }) => (
            <SongRow key={hymnFavKey(h)} h={h} theme={theme} fav={!!hymnFavs[hymnFavKey(h)]}
              onPress={() => navigation.navigate('SongDetail', { song: i })}
              onToggleFav={() => toggleHymnFav(hymnFavKey(h))} />
          ))}
        </View>
      ))}

      {none && (
        <View className="items-center" style={{ paddingVertical: 54 }}>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 19, color: theme.ink }}>A ku kumeki nchumu</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, color: theme.muted, marginTop: 6 }}>Ringeta rito rin'wana.</Text>
        </View>
      )}
    </ScrollView>
  );
}
