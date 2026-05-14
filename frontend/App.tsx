import React, { useEffect } from 'react';
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
SplashScreen.preventAutoHideAsync();

export default function App() {
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
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Không hiển thị giao diện khi font chưa tải xong để tránh bị giật UI
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // SafeAreaProvider giúp app không bị chìm vào "tai thỏ" (notch) trên iPhone hay thanh trạng thái của Android
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
