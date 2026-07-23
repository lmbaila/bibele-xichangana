import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { HYMNALS, HYMNS } from '../hymns';
import type { SongStackParamList } from '../types';
import { Touchable } from '../ui';
import { IconChevron } from '../icons';

type Props = NativeStackScreenProps<SongStackParamList, 'Hymnals'>;

export default function Hymnals({ navigation }: Props) {
  const { theme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, color: theme.muted }}>Avuxeni</Text>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 34, color: theme.ink, marginTop: 2 }}>Tinsimu</Text>

      <View className="mt-5">
        {HYMNALS.map((hy) => {
          const count = HYMNS.filter((h) => h.hymnalId === hy.id).length;
          return (
            <Touchable key={hy.id} onPress={() => navigation.navigate('SongList', { hymnalId: hy.id })} className="flex-row items-center rounded-2xl px-3.5 py-3 mb-0.5" style={{ gap: 14 }}>
              <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: theme.tint }}>
                <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 16, color: theme.accent }}>{hy.name.charAt(0)}</Text>
              </View>
              <View className="flex-1">
                <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 16, color: theme.ink }}>{hy.name}</Text>
                <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 1 }}>{count} tinsimu</Text>
              </View>
              <IconChevron color={theme.muted} />
            </Touchable>
          );
        })}
      </View>
    </ScrollView>
  );
}
