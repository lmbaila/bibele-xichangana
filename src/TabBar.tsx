import React, { ComponentType } from 'react';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from './theme';
import { Touchable, cardShadow } from './ui';
import { IconRead, IconSearch, IconSongs, IconNews, IconFav, IconSettings } from './icons';

const ICONS: Record<string, ComponentType<{ color: string; size?: number }>> = {
  ReadTab: IconRead, Search: IconSearch, Songs: IconSongs, News: IconNews, Favorites: IconFav, Settings: IconSettings,
};
const LABELS: Record<string, string> = {
  ReadTab: 'Hlaya', Search: 'Lava', Songs: 'Tinsimu', News: 'Mahungu', Favorites: 'Rhandza', Settings: 'Mavekelo',
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, Platform.OS === 'ios' ? 20 : 10);

  return (
    <View className="flex-row" style={[{ backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.border, paddingTop: 8, paddingBottom: bottomPad, paddingHorizontal: 4 }, cardShadow()]}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const color = focused ? theme.accent : theme.muted;
        const Icon = ICONS[route.name];
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Touchable key={route.key} onPress={onPress} borderless className="flex-1 items-center" style={{ gap: 4 }}>
            <Icon color={color} />
            <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 10, color }}>{LABELS[route.name]}</Text>
          </Touchable>
        );
      })}
    </View>
  );
}
