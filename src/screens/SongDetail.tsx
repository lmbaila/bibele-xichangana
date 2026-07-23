import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { useLibrary } from '../library';
import { HYMNS, hymnFavKey } from '../hymns';
import type { SongStackParamList } from '../types';
import { Touchable } from '../ui';
import { IconBack, IconCopy } from '../icons';

type Props = NativeStackScreenProps<SongStackParamList, 'SongDetail'>;

export default function SongDetail({ route, navigation }: Props) {
  const { theme, fontScale } = useTheme();
  const { hymnFavs, toggleHymnFav } = useLibrary();
  const h = HYMNS[route.params.song];
  const fs = Math.round(19 * fontScale);
  const [toast, setToast] = useState('');
  const favKey = hymnFavKey(h);
  const isFav = !!hymnFavs[favKey];

  const copy = async () => {
    const body = h.parts.map((p) => (p.chorus ? '[' + p.t + ']\n' : '') + p.lines).join('\n\n');
    const attribution = h.attribution ? '\n\n(' + h.attribution + ')' : '';
    await Clipboard.setStringAsync(h.n + '. ' + h.title + '\n\n' + body + attribution + '\n\n\u2014 Malamala (Tinsimu ta Xichangana)');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setToast('Risimu ri kopiwile'); setTimeout(() => setToast(''), 1600);
  };
  const onToggleFav = () => {
    const added = toggleHymnFav(favKey);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setToast(added ? 'Ri engeteriwile ka leswi rhandzekaka' : 'Ri susiwile ka leswi rhandzekaka'); setTimeout(() => setToast(''), 1600);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.page }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <Touchable onPress={() => navigation.goBack()} className="flex-row items-center py-1.5" style={{ gap: 5 }} borderless>
            <IconBack color={theme.accent} />
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: theme.accent }}>Tinsimu</Text>
          </Touchable>
          <View className="flex-row items-center" style={{ gap: 8 }}>
            <Touchable onPress={onToggleFav} borderless className="items-center justify-center" style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: theme.tint }}>
              <Text style={{ fontSize: 16, color: theme.accent }}>{isFav ? '\u2605' : '\u2606'}</Text>
            </Touchable>
            <Touchable onPress={copy} className="flex-row items-center px-3.5" style={{ height: 34, borderRadius: 11, backgroundColor: theme.tint, gap: 7 }}>
              <IconCopy color={theme.accent} size={14} />
              <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.accent }}>Kopa</Text>
            </Touchable>
          </View>
        </View>

        <View className="items-center" style={{ marginTop: 16, marginBottom: 22 }}>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, letterSpacing: 2, color: theme.accent }}>RISIMU {h.n}</Text>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 28, color: theme.ink, marginTop: 8, textAlign: 'center' }}>{h.title}</Text>
          {h.scripture && (
            <Text style={{ fontFamily: 'Newsreader_400Regular_Italic', fontSize: 13, color: theme.muted, marginTop: 6, textAlign: 'center' }}>{h.scripture}</Text>
          )}
          {h.tune && (
            <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, marginTop: 6, textAlign: 'center' }}>{'Toada: ' + h.tune}</Text>
          )}
          {h.refs && h.refs.length > 0 && (
            <View style={{ marginTop: 8, gap: 2 }}>
              {h.refs.map((r, i) => (
                <Text key={i} style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted, textAlign: 'center' }}>{'Nº ' + r.n + ' no livro ' + r.book}</Text>
              ))}
            </View>
          )}
        </View>

        <View style={{ gap: 16 }}>
          {h.parts.map((p, i) => (
            <View key={i} className="flex-row rounded-2xl px-3.5 py-3" style={{ gap: 14, backgroundColor: p.chorus ? theme.tint : 'transparent' }}>
              <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase', color: p.chorus ? theme.accent : theme.muted, paddingTop: 4, minWidth: 26 }}>{p.t}</Text>
              <Text style={{ flex: 1, fontFamily: 'Newsreader_500Medium', fontSize: fs, lineHeight: fs * 1.7, color: theme.ink }}>{p.lines}</Text>
            </View>
          ))}
        </View>

        {h.attribution && (
          <Text style={{ fontFamily: 'Newsreader_400Regular_Italic', fontSize: 13, color: theme.muted, textAlign: 'right', marginTop: 14, marginRight: 4 }}>{'(' + h.attribution + ')'}</Text>
        )}
      </ScrollView>

      {toast ? (
        <View style={{ position: 'absolute', bottom: 30, alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 11, borderRadius: 14, backgroundColor: '#3B342C' }}>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 14, color: '#FBF5EC' }}>{toast}</Text>
        </View>
      ) : null}
    </View>
  );
}
