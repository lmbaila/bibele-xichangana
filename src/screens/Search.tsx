import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { BOOKS, searchIndex } from '../data';
import type { TabParamList } from '../types';
import { Touchable } from '../ui';
import { IconSearch } from '../icons';

type Props = NativeStackScreenProps<TabParamList, 'Search'>;

export default function Search({ navigation }: Props) {
  const { theme } = useTheme();
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const nav = navigation as any;

  const bookMatches = query ? BOOKS.map((b, i) => ({ b, i })).filter((x) => x.b.n.toLowerCase().includes(query)) : [];
  const verseHits = query ? searchIndex().filter((r) => r.text.toLowerCase().includes(query)).slice(0, 20) : [];
  const none = query && !bookMatches.length && !verseHits.length;

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink }}>Lava</Text>

      <View className="flex-row items-center rounded-2xl px-4 py-3 mt-4" style={{ gap: 10, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
        <IconSearch color={theme.muted} size={17} />
        <TextInput value={q} onChangeText={setQ} placeholder={'Lava vhesi kumbe buku\u2026'} placeholderTextColor={theme.muted}
          style={{ flex: 1, fontFamily: 'Manrope_500Medium', fontSize: 15, color: theme.ink, padding: 0 }} />
        {q ? <Text onPress={() => setQ('')} style={{ color: theme.muted, fontSize: 18 }}>{'\u00D7'}</Text> : null}
      </View>

      {bookMatches.length > 0 && (
        <>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 24, marginBottom: 8, marginLeft: 4 }}>TIBUKU</Text>
          {bookMatches.map((x) => (
            <Touchable key={x.i} onPress={() => nav.navigate('ReadTab', { screen: 'Chapters', params: { bi: x.i } })} className="flex-row items-center rounded-2xl px-3.5 py-3 mb-0.5" style={{ gap: 12, backgroundColor: theme.card }}>
              <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: theme.tint }}><Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 15, color: theme.accent }}>{x.b.a}</Text></View>
              <View className="flex-1"><Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.ink }}>{x.b.n}</Text><Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted }}>{x.b.c} tindzima</Text></View>
            </Touchable>
          ))}
        </>
      )}

      {verseHits.length > 0 && (
        <>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 24, marginBottom: 8, marginLeft: 4 }}>TIVHESI</Text>
          {verseHits.map((r, k) => (
            <Touchable key={k} onPress={() => nav.navigate('ReadTab', { screen: 'Reader', params: { bi: r.bi, ch: r.ch } })} className="rounded-2xl px-4 py-3.5 mb-2" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
              <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: theme.accent }}>{BOOKS[r.bi].n + ' ' + r.ch + ':' + r.n}</Text>
              <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 16, lineHeight: 24, color: theme.ink, marginTop: 5 }}>{r.text}</Text>
            </Touchable>
          ))}
        </>
      )}

      {none && (
        <View className="items-center" style={{ paddingVertical: 60 }}>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 19, color: theme.ink }}>A ku kumeki nchumu</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, color: theme.muted, marginTop: 6 }}>Ringeta rito rin'wana.</Text>
        </View>
      )}

      {!query && (
        <View className="items-center px-6" style={{ paddingVertical: 54 }}>
          <Text style={{ fontFamily: 'Newsreader_400Regular_Italic', fontSize: 18, lineHeight: 28, color: theme.muted, textAlign: 'center' }}>"Kombela, mi ta nyikiwa; lavani, mi ta kuma."</Text>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: theme.accent, marginTop: 8 }}>MATEWU 7:7</Text>
        </View>
      )}
    </ScrollView>
  );
}
