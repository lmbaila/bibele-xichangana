import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import Svg, { Path, Rect } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import { BOOKS, versesFor } from '../data';
import { getAudio } from '../audioManifest';
import type { ReadStackParamList } from '../types';
import { Touchable, accentShadow } from '../ui';

type Props = NativeStackScreenProps<ReadStackParamList, 'Audio'>;

const SPEEDS = [0.75, 1, 1.25, 1.5];
const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return m + ':' + (ss < 10 ? '0' + ss : ss);
};

export default function Audio({ route, navigation }: Props) {
  const { theme, fontScale } = useTheme();
  const { bi, ch, verse } = route.params;
  const b = BOOKS[bi];
  const verses = versesFor(bi, ch);

  const startIdx = verse != null ? Math.max(0, verses.findIndex((v) => v.n === verse)) : 0;
  const [idx, setIdx] = useState<number>(startIdx < 0 ? 0 : startIdx);
  const [playing, setPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);   // 0..1
  const [durationSec, setDurationSec] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);

  const player = useAudioPlayer(null, { updateInterval: 100 });
  const status = useAudioPlayerStatus(player);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const av = verses[idx];
  const real = av ? getAudio(bi, ch, av.n) : null;
  // Duração estimada para a voz sintetizada (não há duração exacta antes de falar).
  const simDur = av ? 2 + av.text.length / 11 : 4;
  const shownDur = durationSec || simDur;
  const live = !!real;

  const goNext = useCallback(() => {
    setProgress(0);
    setIdx((i) => {
      if (i < verses.length - 1) return i + 1;
      setPlaying(false);
      return i;
    });
  }, [verses.length]);

  // Modo de áudio: toca mesmo com o telefone em silêncio (iOS).
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    }).catch(() => {});
    return () => { Speech.stop(); };
  }, []);

  // Ficheiro de áudio real: carrega sempre que o versículo muda.
  useEffect(() => {
    if (!real) return;
    player.replace(real);
    player.setPlaybackRate(speedRef.current, 'high');
    if (playing) player.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, real]);

  // Ficheiro de áudio real: liga/desliga sem recarregar a fonte.
  useEffect(() => {
    if (!real) return;
    if (playing) player.play(); else player.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, real]);

  // Ficheiro de áudio real: aplica a velocidade sem recarregar a fonte.
  useEffect(() => {
    if (!real) return;
    player.setPlaybackRate(speed, 'high');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, real]);

  // Ficheiro de áudio real: reflecte o estado do leitor nativo em progress/duração.
  useEffect(() => {
    if (!real) return;
    if (status.duration) setDurationSec(status.duration);
    setProgress(status.duration ? status.currentTime / status.duration : 0);
    if (status.didJustFinish) goNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.currentTime, status.duration, status.didJustFinish, real]);

  // Sem ficheiro real: lê o versículo em voz alta (text-to-speech).
  useEffect(() => {
    if (real) return;
    Speech.stop();
    player.pause();
    setDurationSec(0);
    setProgress(0);
    if (playing && av) {
      Speech.speak(av.text, {
        language: 'pt-PT',
        rate: speed,
        onDone: () => goNext(),
        onStopped: () => {},
        onError: () => goNext(),
        onBoundary: (ev: { charIndex: number; charLength: number }) => {
          if (av.text.length > 0) setProgress(Math.min(1, (ev.charIndex + ev.charLength) / av.text.length));
        },
      });
    }
    return () => { Speech.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, playing, real, speed, av?.text]);

  const toggle = () => {
    Haptics.selectionAsync();
    setPlaying((p) => !p);
  };
  const step = (d: number) => {
    Haptics.selectionAsync();
    setProgress(0);
    setIdx((i) => Math.min(verses.length - 1, Math.max(0, i + d)));
  };
  const cycleSpeed = () => {
    setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]);
  };

  const fs = Math.round(23 * fontScale);

  return (
    <View className="flex-1" style={{ paddingHorizontal: 28, paddingTop: 8, paddingBottom: 34, backgroundColor: theme.page }}>
      <View className="flex-row items-center justify-between">
        <Touchable onPress={() => navigation.goBack()} borderless className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
          <Svg width={15} height={9} viewBox="0 0 15 9"><Path d="M1 1l6.5 6.5L14 1" stroke={theme.ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></Svg>
        </Touchable>
        <View className="items-center">
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 11, letterSpacing: 2, color: theme.accent }}>KU YINGISELA</Text>
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.muted, marginTop: 2 }}>{b.n + ' \u00B7 Ndzima ' + ch}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="rounded-3xl items-center justify-center" style={[{ width: 200, height: 200, backgroundColor: theme.tint }, accentShadow(theme.accent)]}>
          <View className="rounded-3xl items-center justify-center" style={{ width: 96, height: 96, backgroundColor: theme.accent }}>
            <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 54, color: theme.onAccent }}>B</Text>
          </View>
        </View>
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.accent, marginTop: 32 }}>{av ? b.n + ' ' + ch + ':' + av.n : ''}</Text>
        <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: fs, lineHeight: fs * 1.5, color: theme.ink, textAlign: 'center', marginTop: 12, minHeight: 96 }}>{av ? av.text : ''}</Text>
        {!live && (
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 11, color: theme.muted, marginTop: 10 }}>{'\u266A Mpfumawulo wa xikhombisi (a hi rito ra munhu)'}</Text>
        )}
      </View>

      <View>
        <View style={{ height: 5, borderRadius: 5, backgroundColor: theme.border, overflow: 'hidden' }}>
          <View style={{ height: '100%', borderRadius: 5, backgroundColor: theme.accent, width: `${progress * 100}%` as `${number}%` }} />
        </View>
        <View className="flex-row justify-between" style={{ marginTop: 8 }}>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted }}>{fmt(progress * shownDur)}</Text>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted }}>{fmt(shownDur)}</Text>
        </View>

        <View className="flex-row items-center justify-center" style={{ gap: 34, marginTop: 20 }}>
          <Touchable onPress={() => step(-1)} borderless>
            <Svg width={26} height={20} viewBox="0 0 26 20"><Path d="M24 2v16L11 10z" fill={theme.ink} /><Rect x="2" y="2" width="4" height="16" rx="1" fill={theme.ink} /></Svg>
          </Touchable>
          <Touchable onPress={toggle} borderless className="items-center justify-center rounded-full" style={[{ width: 74, height: 74, backgroundColor: theme.accent }, accentShadow(theme.accent)]}>
            {playing ? (
              <Svg width={24} height={26} viewBox="0 0 24 26"><Rect x="4" y="2" width="6" height="22" rx="2" fill={theme.onAccent} /><Rect x="14" y="2" width="6" height="22" rx="2" fill={theme.onAccent} /></Svg>
            ) : (
              <Svg width={26} height={28} viewBox="0 0 26 28"><Path d="M5 3l17 11L5 25z" fill={theme.onAccent} /></Svg>
            )}
          </Touchable>
          <Touchable onPress={() => step(1)} borderless>
            <Svg width={26} height={20} viewBox="0 0 26 20"><Path d="M2 2v16l13-8z" fill={theme.ink} /><Rect x="20" y="2" width="4" height="16" rx="1" fill={theme.ink} /></Svg>
          </Touchable>
        </View>

        <View className="flex-row items-center justify-between" style={{ marginTop: 22 }}>
          <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 12, color: theme.muted }}>{'Vhesi ' + (idx + 1) + ' ya ' + verses.length}</Text>
          <Touchable onPress={cycleSpeed} className="rounded-xl" style={{ paddingHorizontal: 16, paddingVertical: 7, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 13, color: theme.ink }}>{speed + 'x'}</Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
}
