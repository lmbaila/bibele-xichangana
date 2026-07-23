import React from 'react';
import { View, Text, ScrollView, Platform } from 'react-native';
import { useTheme } from '../theme';
import type { Theme, ThemeName } from '../types';
import { Touchable, Slider } from '../ui';

function Stepper({ theme, scale, setScale }: { theme: Theme; scale: number; setScale: (n: number) => void }) {
  const dec = () => setScale(Math.max(0.85, Math.round((scale - 0.05) * 100) / 100));
  const inc = () => setScale(Math.min(1.4, Math.round((scale + 0.05) * 100) / 100));
  const fs = Math.round(19 * scale);
  return (
    <View className="rounded-3xl px-5 py-4" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
      <View className="flex-row items-center justify-between">
        <Touchable onPress={dec} borderless className="w-11 h-11 rounded-2xl items-center justify-center" style={{ backgroundColor: theme.page }}><Text style={{ fontSize: 16, color: theme.muted }}>A</Text></Touchable>
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.accent }}>{Math.round(scale * 100) + '%'}</Text>
        <Touchable onPress={inc} borderless className="w-11 h-11 rounded-2xl items-center justify-center" style={{ backgroundColor: theme.page }}><Text style={{ fontSize: 26, color: theme.muted }}>A</Text></Touchable>
      </View>
      <Slider
        style={{ marginTop: 10 }}
        minimumValue={0.85}
        maximumValue={1.4}
        step={0.05}
        value={scale}
        onValueChange={setScale}
        trackColor={theme.border}
        fillColor={theme.accent}
        thumbColor={theme.accent}
      />
      <View className="rounded-2xl mt-3.5 p-3.5" style={{ backgroundColor: theme.page }}>
        <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: fs, lineHeight: fs * 1.6, color: theme.ink }}>Hosi i murisi wa mina, a ndzi nga pfumali nchumu.</Text>
      </View>
    </View>
  );
}

function Toggle({ theme, on }: { theme: Theme; on: boolean }) {
  return (
    <View style={{ width: 46, height: 27, borderRadius: 14, backgroundColor: on ? theme.accent : theme.border, justifyContent: 'center' }}>
      <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff', marginHorizontal: 2.5, alignSelf: on ? 'flex-end' : 'flex-start' }} />
    </View>
  );
}

export default function Settings() {
  const { theme, themeName, setTheme, fontScale, setScale } = useTheme();
  const themes: [ThemeName, string][] = [['light', 'Ku vonakala'], ['sepia', 'Sepia'], ['night', 'Vusiku']];

  return (
    <ScrollView style={{ backgroundColor: theme.page }} contentContainerStyle={{ padding: 22, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 32, color: theme.ink }}>Mavekelo</Text>

      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 24, marginBottom: 10, marginLeft: 4 }}>KURINGANA KA MARITO</Text>
      <Stepper theme={theme} scale={fontScale} setScale={setScale} />

      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 24, marginBottom: 10, marginLeft: 4 }}>NKARHI WO HLAYA</Text>
      <View className="flex-row" style={{ gap: 8 }}>
        {themes.map(([k, label]) => (
          <Touchable key={k} onPress={() => setTheme(k)} className="flex-1 rounded-2xl items-center" style={{ paddingVertical: 14, backgroundColor: themeName === k ? theme.accent : theme.card, borderWidth: 1, borderColor: themeName === k ? theme.accent : theme.border }}>
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14, color: themeName === k ? theme.onAccent : theme.ink }}>{label}</Text>
          </Touchable>
        ))}
      </View>

      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1.5, color: theme.muted, marginTop: 24, marginBottom: 10, marginLeft: 4 }}>SWIN'WANA</Text>
      <View className="rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
        <View className="flex-row items-center justify-between" style={{ paddingHorizontal: 18, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: theme.border }}>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 15, color: theme.ink }}>Xitiviso xa vhesi ra siku</Text><Toggle theme={theme} on />
        </View>
        <View className="flex-row items-center justify-between" style={{ paddingHorizontal: 18, paddingVertical: 15 }}>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 15, color: theme.ink }}>Hlayisa laha ku heteleleke</Text><Toggle theme={theme} on={false} />
        </View>
      </View>

      <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 26, textAlign: 'center' }}>{'Bibele Xichangana \u00B7 ' + (Platform.OS === 'ios' ? 'iOS' : 'Android') + ' \u00B7 Vhesiyoni 1.0'}</Text>
    </ScrollView>
  );
}
