import 'react-native-gesture-handler';
import './global.css';
import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Newsreader_400Regular_Italic, Newsreader_500Medium, Newsreader_600SemiBold } from '@expo-google-fonts/newsreader';
import { Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';

import { ThemeProvider, useTheme } from './src/theme';
import { LibraryProvider } from './src/library';
import type { ReadStackParamList, SongStackParamList, TabParamList } from './src/types';
import TabBar from './src/TabBar';
import Splash from './src/screens/Splash';
import Books from './src/screens/Books';
import Chapters from './src/screens/Chapters';
import Reader from './src/screens/Reader';
import Audio from './src/screens/Audio';
import Search from './src/screens/Search';
import Hymnals from './src/screens/Hymnals';
import Songs from './src/screens/Songs';
import SongDetail from './src/screens/SongDetail';
import News from './src/screens/News';
import Favorites from './src/screens/Favorites';
import Settings from './src/screens/Settings';

SplashScreen.preventAutoHideAsync().catch(() => {});

const ReadStack = createNativeStackNavigator<ReadStackParamList>();
const SongStack = createNativeStackNavigator<SongStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function ReadTab() {
  return (
    <ReadStack.Navigator screenOptions={{ headerShown: false, animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right' }}>
      <ReadStack.Screen name="Books" component={Books} />
      <ReadStack.Screen name="Chapters" component={Chapters} />
      <ReadStack.Screen name="Reader" component={Reader} />
      <ReadStack.Screen name="Audio" component={Audio} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
    </ReadStack.Navigator>
  );
}
function SongTab() {
  return (
    <SongStack.Navigator screenOptions={{ headerShown: false, animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right' }}>
      <SongStack.Screen name="Hymnals" component={Hymnals} />
      <SongStack.Screen name="SongList" component={Songs} />
      <SongStack.Screen name="SongDetail" component={SongDetail} />
    </SongStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="ReadTab" component={ReadTab} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Songs" component={SongTab} />
      <Tabs.Screen name="News" component={News} />
      <Tabs.Screen name="Favorites" component={Favorites} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
}

function Shell() {
  const { theme, ready } = useTheme();
  const [splashDone, setSplashDone] = useState(false);
  const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.page } };
  const onLayout = useCallback(async () => { if (ready) await SplashScreen.hideAsync().catch(() => {}); }, [ready]);
  if (!ready) return null;

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: theme.page }} onLayout={onLayout}>
      <StatusBar style={theme.bar} />
      {!splashDone ? (
        <Splash onDone={() => setSplashDone(true)} />
      ) : (
        <NavigationContainer theme={navTheme}>
          <MainTabs />
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  const [loaded] = useFonts({
    Newsreader_400Regular_Italic, Newsreader_500Medium, Newsreader_600SemiBold,
    Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold,
  });
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LibraryProvider>
          <Shell />
        </LibraryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
