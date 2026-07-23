import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { cardShadow } from '../ui';

export default function News() {
  const { theme } = useTheme();
  const cards: [string, string, string][] = [
    ['MAHUNGU', 'Tikelekiswano ta swikhongelo eGaza', '2 ti-awara ta ku sungula'],
    ['SWITIVISO', 'Vhesiyoni leyintshwa ya Xichangana yi kumeka', 'Nakuloni'],
  ];
  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink }}>Mahungu</Text>
      <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 13, color: theme.muted, marginTop: 2 }}>Timhaka ni switiviso</Text>

      <View className="rounded-3xl overflow-hidden mt-5" style={[{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }, cardShadow()]}>
        <View style={{ height: 132, backgroundColor: theme.tint, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted }}>[ xifaniso xa mhaka ]</Text>
        </View>
        <View style={{ padding: 18 }}>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1, color: theme.accent }}>VUNDLELA</Text>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 20, lineHeight: 26, color: theme.ink, marginTop: 6 }}>Pulanu yo hlaya Bibele hinkwayo hi lembe rin'we</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 14, lineHeight: 21, color: theme.muted, marginTop: 8 }}>Joina ntlawa lowu hlayaka tindzima tinharhu siku rin'wana ni rin'wana.</Text>
        </View>
      </View>

      <View className="flex-row mt-3.5" style={{ gap: 12 }}>
        {cards.map((c, i) => (
          <View key={i} className="flex-1 rounded-3xl p-4" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 1, color: theme.accent }}>{c[0]}</Text>
            <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 17, lineHeight: 22, color: theme.ink, marginTop: 8 }}>{c[1]}</Text>
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 8 }}>{c[2]}</Text>
          </View>
        ))}
      </View>

      <View className="rounded-3xl mt-3.5 flex-row items-center p-4" style={{ gap: 14, backgroundColor: theme.tint, borderWidth: 1, borderColor: theme.border, borderStyle: 'dashed' }}>
        <View style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: theme.border }} />
        <View className="flex-1">
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 10, letterSpacing: 1, color: theme.muted }}>{'NSEKETELO \u00B7 TALIGO'}</Text>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.ink, marginTop: 3 }}>Radio Evangeliyu FM</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 2 }}>{'Yingisela rito siku ni siku \u00B7 101.5 FM'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
