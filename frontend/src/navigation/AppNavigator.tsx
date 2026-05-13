import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '../types/navigation.types';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/auth.store';

const Tab = createBottomTabNavigator<AppTabParamList>();

// --- UI Tạm thời (Sẽ tách file thật ở Giai đoạn sau) ---
const TmpScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name} Screen</Text></View>
);

const HomeScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Trang chủ Screen</Text>
      {/* Nút bấm tạm thời để bạn thoát ra ngoài test màn hình Login */}
      <TouchableOpacity 
        onPress={logout} 
        style={{ backgroundColor: '#FF7675', padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng xuất (Test)</Text>
      </TouchableOpacity>
    </View>
  );
};

const DiariesScreen = () => <TmpScreen name="Nhật ký" />;
const Roadmap52HzScreen = () => <TmpScreen name="52Hz" />;
const TestsScreen = () => <TmpScreen name="Bài Test" />;
const ProfileScreen = () => <TmpScreen name="Cá nhân" />;
// ----------------------------------------------------

export default function AppNavigator() {
  return (
    // headerShown: false để ẩn tiêu đề mặc định của React Navigation (ta sẽ tự code Header cho đẹp)
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Diaries" component={DiariesScreen} />
      <Tab.Screen name="Roadmap52Hz" component={Roadmap52HzScreen} />
      {/* Khách (Guest) sau này cũng có thể ấn vào Tab này thông qua 1 mẹo ở Root */}
      <Tab.Screen name="Tests" component={TestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
