import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { useTheme } from '../theme';
import { accentShadow } from '../ui';

export default function Splash({ onDone }: { onDone: () => void }) {
  const { theme } = useTheme();
  const fade = useRef(new Animated.Value(0)).current;
  const grow = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(grow, { toValue: 1, friction: 6, useNativeDriver: true }),
      Animated.timing(bar, { toValue: 1, duration: 2100, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
    ]).start();
    const t = setTimeout(onDone, 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <View className="flex-1 items-center justify-center px-10" style={{ backgroundColor: theme.page }}>
      <Animated.View style={{ opacity: fade, transform: [{ scale: grow }] }}>
        <View className="w-24 h-24 rounded-3xl items-center justify-center" style={[{ backgroundColor: theme.accent }, accentShadow(theme.accent)]}>
          <Text style={{ fontFamily: 'Newsreader_500Medium', fontSize: 54, color: theme.onAccent }}>B</Text>
        </View>
      </Animated.View>
      <Animated.Text style={{ opacity: fade, fontFamily: 'Newsreader_500Medium', fontSize: 40, color: theme.ink, marginTop: 26 }}>Bibele</Animated.Text>
      <Animated.Text style={{ opacity: fade, fontFamily: 'Manrope_700Bold', fontSize: 13, letterSpacing: 3, color: theme.accent, marginTop: 8 }}>XICHANGANA</Animated.Text>

      <View style={{ width: 148, height: 3, borderRadius: 3, backgroundColor: theme.border, marginTop: 46, overflow: 'hidden' }}>
        <Animated.View style={{ height: '100%', backgroundColor: theme.accent, width: bar.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }} />
      </View>

      <View style={{ position: 'absolute', bottom: 90, left: 40, right: 40 }}>
        <Text style={{ fontFamily: 'Newsreader_400Regular_Italic', fontSize: 17, lineHeight: 27, color: theme.muted, textAlign: 'center' }}>
          "Rito ra wena i rivoni eka mikondzo ya mina."
        </Text>
        <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, letterSpacing: 1, color: theme.accent, marginTop: 10, textAlign: 'center' }}>TIPISALEMA 119:105</Text>
      </View>
    </View>
  );
}
