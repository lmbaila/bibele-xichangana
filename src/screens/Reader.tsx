import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme, HIGHLIGHTS } from '../theme';
import { useLibrary } from '../library';
import { BOOKS, versesFor } from '../data';
import type { ReadStackParamList } from '../types';
import { Touchable, cardShadow } from '../ui';
import { IconBack, IconCopy, IconPlay } from '../icons';

type Props = NativeStackScreenProps<ReadStackParamList, 'Reader'>;

const HEADER_HEIGHT = 56;

export default function Reader({ route, navigation }: Props) {
  const { theme, fontScale } = useTheme();
  const { highlights, favs, setHighlight, clearHighlight, toggleFav, setLastChapter } = useLibrary();
  const bi = route.params.bi;
  const [ch, setCh] = useState<number>(route.params.ch);
  const b = BOOKS[bi];
  const [sel, setSel] = useState<number | null>(null);
  const [toast, setToast] = useState<string>('');

  useEffect(() => { setLastChapter(bi, ch); }, [bi, ch]);

  const verses = versesFor(bi, ch);
  const key = (n: number) => bi + '-' + ch + '-' + n;
  const fs = Math.round(19 * fontScale);

  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 1600); };
  const tapVerse = (n: number) => { Haptics.selectionAsync(); setSel((s) => (s === n ? null : n)); };
  const changeCh = (d: number) => { setCh((c) => Math.min(b.c, Math.max(1, c + d))); setSel(null); };
  const doCopy = async () => {
    const v = verses.find((x) => x.n === sel); if (!v) return;
    await Clipboard.setStringAsync('"' + v.text + '"\n\u2014 ' + b.n + ' ' + ch + ':' + v.n + ' (Bibele Xichangana)');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    flash('Vhesi ri kopiwile');
  };

  const selKey = sel != null ? key(sel) : null;

  // Cabe\u00e7alho flutuante: esconde ao descer, reaparece ao subir o scroll.
  const headerShift = useRef(new Animated.Value(0)).current;
  const headerHidden = useRef(false);
  const lastScrollY = useRef(0);
  const selRef = useRef(sel);
  selRef.current = sel;

  const setHeaderHidden = (hidden: boolean) => {
    if (headerHidden.current === hidden) return;
    headerHidden.current = hidden;
    Animated.timing(headerShift, { toValue: hidden ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - lastScrollY.current;
    lastScrollY.current = y;

    if (y <= 8) setHeaderHidden(false);
    else if (dy > 4) setHeaderHidden(true);
    else if (dy < -4) setHeaderHidden(false);

    if (selRef.current != null && Math.abs(dy) > 2) setSel(null);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.page }}>
      <Animated.View
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          height: HEADER_HEIGHT, paddingHorizontal: 16, backgroundColor: theme.page,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          transform: [{ translateY: headerShift.interpolate({ inputRange: [0, 1], outputRange: [0, -HEADER_HEIGHT] }) }],
        }}
      >
        <Touchable onPress={() => navigation.goBack()} className="flex-row items-center py-1.5" style={{ gap: 5 }} borderless>
          <IconBack color={theme.accent} />
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.accent }}>Tindzima</Text>
        </Touchable>
        <View className="flex-row" style={{ gap: 8 }}>
          <Touchable onPress={() => navigation.navigate('Audio', { bi, ch, verse: sel ?? undefined })} className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: theme.accent }} borderless>
            <IconPlay color={theme.onAccent} />
          </Touchable>
          <Touchable onPress={() => changeCh(-1)} className="w-9 h-9 rounded-xl items-center justify-center" style={{ borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card }} borderless>
            <Text style={{ color: ch > 1 ? theme.ink : theme.border, fontSize: 16 }}>{'\u2039'}</Text>
          </Touchable>
          <Touchable onPress={() => changeCh(1)} className="w-9 h-9 rounded-xl items-center justify-center" style={{ borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card }} borderless>
            <Text style={{ color: ch < b.c ? theme.ink : theme.border, fontSize: 16 }}>{'\u203A'}</Text>
          </Touchable>
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: HEADER_HEIGHT + 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View className="items-center" style={{ marginTop: 14, marginBottom: 22 }}>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 30, color: theme.ink }}>{b.n}</Text>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, letterSpacing: 2, color: theme.accent, marginTop: 6 }}>NDZIMA {ch}</Text>
        </View>

        {verses.map((v) => {
          const hk = highlights[key(v.n)];
          const hl = hk ? HIGHLIGHTS.find((h) => h.k === hk) : null;
          const isSel = sel === v.n;
          return (
            <Touchable key={v.n} onPress={() => tapVerse(v.n)} className="flex-row rounded-xl px-1.5 py-1 mb-0" style={{ gap: 10, backgroundColor: hl ? hl.bg : 'transparent', borderWidth: 2, borderColor: isSel ? theme.accent : 'transparent' }}>
              <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: theme.accent, paddingTop: 5, minWidth: 15, textAlign: 'right' }}>{v.n}</Text>
              <Text style={{ flex: 1, fontFamily: 'Newsreader_500Medium', fontSize: fs, lineHeight: fs * 1.62, color: hl ? '#3B342C' : theme.ink }}>
                {v.text}{favs[key(v.n)] ? '  \u2605' : ''}
              </Text>
            </Touchable>
          );
        })}
      </ScrollView>

      {selKey && (
        <View className="px-4 pt-3.5 pb-4" style={[{ backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.border }, cardShadow()]}>
          <View className="flex-row items-center justify-between mb-3">
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.accent }}>{b.n + ' ' + ch + ':' + sel}</Text>
            <Touchable onPress={() => setSel(null)} borderless hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="items-center justify-center" style={{ width: 32, height: 32, marginRight: -6 }}>
              <Text style={{ color: theme.muted, fontSize: 22 }}>{'\u00D7'}</Text>
            </Touchable>
          </View>
          <View className="flex-row items-center justify-between" style={{ rowGap: 10, flexWrap: 'wrap' }}>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              {HIGHLIGHTS.map((h) => (
                <Touchable key={h.k} onPress={() => { Haptics.selectionAsync(); setHighlight(selKey, h.k); }} borderless
                  style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: h.dot, borderWidth: 2, borderColor: highlights[selKey] === h.k ? theme.ink : 'transparent' }} />
              ))}
              <Touchable onPress={() => clearHighlight(selKey)} borderless className="items-center justify-center" style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: theme.border }}>
                <Text style={{ color: theme.muted, fontSize: 13 }}>{'\u00D7'}</Text>
              </Touchable>
            </View>
            <View className="flex-row items-center" style={{ gap: 8 }}>
              <Touchable onPress={() => { const added = toggleFav(selKey); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); flash(added ? 'Ri engeteriwile' : 'Ri susiwile'); }} borderless className="items-center justify-center" style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: theme.page }}>
                <Text style={{ fontSize: 17, color: theme.accent }}>{favs[selKey] ? '\u2605' : '\u2606'}</Text>
              </Touchable>
              <Touchable onPress={doCopy} className="flex-row items-center px-4" style={{ height: 36, borderRadius: 12, backgroundColor: theme.accent, gap: 6 }}>
                <IconCopy color={theme.onAccent} />
                <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14, color: theme.onAccent }}>Kopa</Text>
              </Touchable>
            </View>
          </View>
        </View>
      )}

      {toast ? (
        <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 11, borderRadius: 14, backgroundColor: '#3B342C' }}>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#FBF5EC' }}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}
