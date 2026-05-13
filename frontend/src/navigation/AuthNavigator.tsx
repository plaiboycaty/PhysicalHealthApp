import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation.types';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

// --- UI Tạm thời (Sẽ tách file thật ở Giai đoạn 3) ---
const TmpScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name} Screen</Text></View>
);
const OnboardingScreen = () => <TmpScreen name="Onboarding" />;
const LoginScreen = () => <TmpScreen name="Login" />;
const RegisterScreen = () => <TmpScreen name="Register" />;
// ----------------------------------------------------

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Màn hình hiển thị đầu tiên của người chưa đăng nhập */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
