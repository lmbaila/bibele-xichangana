import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { BOOKS } from '../data';
import type { Book, ReadStackParamList, Theme, Testament } from '../types';
import { Touchable, accentShadow } from '../ui';
import { IconChevron } from '../icons';

type Props = NativeStackScreenProps<ReadStackParamList, 'Books'>;

function Chip({ label, active, onPress, theme }: { label: string; active: boolean; onPress: () => void; theme: Theme }) {
  return (
    <Touchable onPress={onPress} className="flex-1 rounded-xl py-2.5 items-center"
      style={{ backgroundColor: active ? theme.accent : theme.card, borderWidth: 1, borderColor: active ? theme.accent : theme.border }}>
      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: active ? theme.onAccent : theme.muted }}>{label}</Text>
    </Touchable>
  );
}

function BookRow({ b, theme, onPress }: { b: Book; theme: Theme; onPress: () => void }) {
  return (
    <Touchable onPress={onPress} className="flex-row items-center rounded-2xl px-3.5 py-3" style={{ gap: 14 }}>
      <View className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: theme.tint }}>
        <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 16, color: theme.accent }}>{b.a}</Text>
      </View>
      <View className="flex-1">
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 16, color: theme.ink }}>{b.n}</Text>
        <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 1 }}>{b.c} tindzima</Text>
      </View>
      <IconChevron color={theme.muted} />
    </Touchable>
  );
}

export default function Books({ navigation }: Props) {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<'all' | Testament>('all');
  const inF = (t: Testament) => filter === 'all' || filter === t;
  const open = (i: number) => navigation.navigate('Chapters', { bi: i });

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, color: theme.muted }}>Avuxeni</Text>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 34, color: theme.ink, marginTop: 2 }}>Bibele</Text>

      <View className="rounded-3xl px-5 py-5 mt-5" style={[{ backgroundColor: theme.accent }, accentShadow(theme.accent)]}>
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 2, color: theme.onAccent, opacity: 0.85 }}>VHESI RA SIKU</Text>
        <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 21, lineHeight: 30, color: theme.onAccent, marginTop: 10 }}>"Hosi i murisi wa mina, a ndzi nga pfumali nchumu."</Text>
        <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.onAccent, opacity: 0.85, marginTop: 12 }}>Tipisalema 23:1</Text>
      </View>

      <View className="flex-row mt-6" style={{ gap: 8 }}>
        <Chip label="Hinkwaswo" active={filter === 'all'} onPress={() => setFilter('all')} theme={theme} />
        <Chip label="Ya Khale" active={filter === 'ot'} onPress={() => setFilter('ot')} theme={theme} />
        <Chip label="Leyintshwa" active={filter === 'nt'} onPress={() => setFilter('nt')} theme={theme} />
      </View>

      {inF('ot') && (
        <>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 26, marginBottom: 8, marginLeft: 4 }}>TESTAMENTE YA KHALE</Text>
          {BOOKS.map((b, i) => (b.t === 'ot' ? <BookRow key={i} b={b} theme={theme} onPress={() => open(i)} /> : null))}
        </>
      )}
      {inF('nt') && (
        <>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 26, marginBottom: 8, marginLeft: 4 }}>TESTAMENTE LEYINTSHWA</Text>
          {BOOKS.map((b, i) => (b.t === 'nt' ? <BookRow key={i} b={b} theme={theme} onPress={() => open(i)} /> : null))}
        </>
      )}
    </ScrollView>
  );
}
