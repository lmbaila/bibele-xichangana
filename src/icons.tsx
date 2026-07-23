import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps { color: string; size?: number; }

export const IconRead = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="16" height="16" rx="2.5" stroke={color} strokeWidth="1.8" />
    <Path d="M12 4v16" stroke={color} strokeWidth="1.8" />
  </Svg>
);
export const IconSearch = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.8" />
    <Path d="M15.5 15.5L21 21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
export const IconSongs = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="7" cy="17.5" r="2.6" stroke={color} strokeWidth="1.8" />
    <Circle cx="16.5" cy="15.5" r="2.6" stroke={color} strokeWidth="1.8" />
    <Path d="M9.5 17.5V6.5l9.5-2v13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
export const IconNews = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3.5" y="5" width="17" height="14" rx="2.5" stroke={color} strokeWidth="1.8" />
    <Path d="M7 9.5h6M7 13h10M7 16h7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);
export const IconFav = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 4h12v16l-6-4.2L6 20z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
  </Svg>
);
export const IconSettings = ({ color, size = 24 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 8h9M17 8h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="15" cy="8" r="2.4" stroke={color} strokeWidth="1.8" />
    <Path d="M4 16h3M11 16h9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="9" cy="16" r="2.4" stroke={color} strokeWidth="1.8" />
  </Svg>
);
export const IconChevron = ({ color, size = 12 }: IconProps) => (
  <Svg width={size * 0.6} height={size} viewBox="0 0 7 12" fill="none">
    <Path d="M1 1l5 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
export const IconBack = ({ color, size = 14 }: IconProps) => (
  <Svg width={size * 0.57} height={size} viewBox="0 0 8 14" fill="none">
    <Path d="M7 1L1 7l6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
export const IconCopy = ({ color, size = 15 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <Rect x="4" y="4" width="9" height="10" rx="2" stroke={color} strokeWidth="1.5" />
    <Path d="M10 4V2.5A1.5 1.5 0 008.5 1H3a2 2 0 00-2 2v7" stroke={color} strokeWidth="1.5" />
  </Svg>
);
export const IconPlay = ({ color, size = 13 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Path d="M3 2l9 5-9 5z" fill={color} />
  </Svg>
);
