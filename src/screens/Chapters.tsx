import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { BOOKS } from '../data';
import { useLibrary } from '../library';
import type { ReadStackParamList } from '../types';
import { Touchable } from '../ui';
import { IconBack } from '../icons';

type Props = NativeStackScreenProps<ReadStackParamList, 'Chapters'>;

export default function Chapters({ route, navigation }: Props) {
  const { theme } = useTheme();
  const { lastCh } = useLibrary();
  const { bi } = route.params;
  const b = BOOKS[bi];
  const chapters = Array.from({ length: b.c }, (_, k) => k + 1);
  const curCh = lastCh[bi] ?? 1;

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Touchable onPress={() => navigation.goBack()} className="flex-row items-center py-1.5 self-start" style={{ gap: 5 }} borderless>
        <IconBack color={theme.accent} />
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.accent }}>Tibuku</Text>
      </Touchable>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink, marginTop: 8 }}>{b.n}</Text>
      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.muted, marginTop: 2 }}>Hlawula ndzima</Text>

      <View className="flex-row flex-wrap mt-5" style={{ marginHorizontal: -5 }}>
        {chapters.map((n) => {
          const cur = n === curCh;
          return (
            <View key={n} style={{ width: '20%', padding: 5 }}>
              <Touchable onPress={() => navigation.navigate('Reader', { bi, ch: n })}
                className="rounded-2xl items-center justify-center"
                style={{ aspectRatio: 1, backgroundColor: cur ? theme.accent : theme.card, borderWidth: 1, borderColor: cur ? theme.accent : theme.border }}>
                <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 17, color: cur ? theme.onAccent : theme.ink }}>{n}</Text>
              </Touchable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
