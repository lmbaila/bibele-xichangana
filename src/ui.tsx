import React, { ReactNode, useRef, useState } from 'react';
import { Pressable, Platform, View, StyleProp, ViewStyle, PanResponder, LayoutChangeEvent, Insets } from 'react-native';

interface TouchableProps {
  children?: ReactNode;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  rippleColor?: string;
  borderless?: boolean;
  hitSlop?: Insets | number;
}

export function Touchable({ children, onPress, className, style, rippleColor = 'rgba(138,90,60,0.14)', borderless = false, hitSlop }: TouchableProps) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      android_ripple={{ color: rippleColor, borderless }}
      style={[style, Platform.OS === 'ios' && pressed ? { opacity: 0.55 } : null]}
      className={className}
      hitSlop={hitSlop}
    >
      {children}
    </Pressable>
  );
}

export function cardShadow(color = '#000'): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: { shadowColor: color, shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 3 },
    default: {},
  })!;
}

export function accentShadow(accent: string): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: { shadowColor: accent, shadowOpacity: 0.35, shadowRadius: 22, shadowOffset: { width: 0, height: 14 } },
    android: { elevation: 6 },
    default: {},
  })!;
}

interface SliderProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (v: number) => void;
  trackColor: string;
  fillColor: string;
  thumbColor: string;
  style?: StyleProp<ViewStyle>;
}

const THUMB = 20;

// Slider puro em JS (sem módulo nativo) para funcionar no Expo Go sem dev build.
export function Slider({ value, minimumValue, maximumValue, step = 0, onValueChange, trackColor, fillColor, thumbColor, style }: SliderProps) {
  const width = useRef(0);
  const [, forceLayout] = useState(0);

  const clamp = (v: number) => Math.min(maximumValue, Math.max(minimumValue, v));
  const quantize = (v: number) => {
    if (!step) return clamp(v);
    const steps = Math.round((v - minimumValue) / step);
    return clamp(minimumValue + steps * step);
  };
  const updateFromX = (x: number) => {
    if (width.current <= 0) return;
    const ratio = Math.min(1, Math.max(0, x / width.current));
    onValueChange(quantize(minimumValue + ratio * (maximumValue - minimumValue)));
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateFromX(e.nativeEvent.locationX),
      onPanResponderMove: (e) => updateFromX(e.nativeEvent.locationX),
    })
  ).current;

  const pct = maximumValue > minimumValue ? (clamp(value) - minimumValue) / (maximumValue - minimumValue) : 0;

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => { width.current = e.nativeEvent.layout.width; forceLayout((n) => n + 1); }}
      {...pan.panHandlers}
      style={[{ height: THUMB + 8, justifyContent: 'center' }, style]}
    >
      <View style={{ height: 4, borderRadius: 4, backgroundColor: trackColor, overflow: 'hidden' }}>
        <View style={{ height: '100%', borderRadius: 4, backgroundColor: fillColor, width: `${pct * 100}%` as `${number}%` }} />
      </View>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: Math.max(0, pct * width.current - THUMB / 2),
          width: THUMB, height: THUMB, borderRadius: THUMB / 2,
          backgroundColor: thumbColor,
          ...Platform.select<ViewStyle>({
            ios: { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 3, shadowOffset: { width: 0, height: 1 } },
            android: { elevation: 2 },
            default: {},
          }),
        }}
      />
    </View>
  );
}
