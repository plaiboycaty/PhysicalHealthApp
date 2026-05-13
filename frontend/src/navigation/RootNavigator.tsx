import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/auth.store';
import { Colors } from '../constants/colors';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isLoading, restoreToken } = useAuthStore();

  // Khi vừa bật App: Chạy hàm check token trong SecureStore
  useEffect(() => {
    restoreToken();
  }, []);

  // Nếu đang bận lục ổ cứng tìm token -> Quay mòng mòng (Splash Screen)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* 
        LOGIC "CỬA TỪ":
        - Nếu isAuthenticated = true -> Cho vào AppNavigator (Các Tab chính)
        - Nếu isAuthenticated = false -> Đẩy ra AuthNavigator (Login, Onboarding)
        
        *Lưu ý: Để Guest cũng làm được Test, ta sẽ điều chỉnh logic 
        cho phép AuthNavigator nhảy sang màn Tests ở Giai đoạn 4.
      */}
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
