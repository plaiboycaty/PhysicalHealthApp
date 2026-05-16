import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';

// Import thư viện Font
import { useFonts } from 'expo-font';
import {
  Baloo2_400Regular,
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold
} from '@expo-google-fonts/baloo-2';
import * as SplashScreen from 'expo-splash-screen';

// Giữ màn hình Splash screen chờ cho đến khi font tải xong
SplashScreen.preventAutoHideAsync().catch(() => {
  // Bỏ qua lỗi
});

export default function App() {
  const [appReady, setAppReady] = useState(false);

  // Hook nạp font vào App
  const [fontsLoaded, fontError] = useFonts({
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
  });

  // Ẩn màn hình chờ khi font đã sẵn sàng
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
        .catch(() => { })
        .finally(() => setAppReady(true));
    }
  }, [fontsLoaded, fontError]);

  // Fallback: sau 3 giây nếu font vẫn chưa load (iOS bị treo) thì vẫn hiển thị app
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!appReady) {
        SplashScreen.hideAsync().catch(() => { });
        setAppReady(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [appReady]);

  // Không hiển thị giao diện khi chưa sẵn sàng
  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
