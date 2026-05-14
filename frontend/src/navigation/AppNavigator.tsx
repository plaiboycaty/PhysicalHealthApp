import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabParamList } from '../types/navigation.types';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { useAuthStore } from '../store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

// Import HomeScreen thật
import HomeScreen from '../screens/home/HomeScreen';
// Import TestsScreen thật
import TestsScreen from '../screens/tests/TestsScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();
const mintColor = '#66C5BA';

// --- HOC: Thêm hiệu ứng slide-up + fade khi chuyển tab ---
function withTabTransition<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return function AnimatedScreen(props: T) {
    const isFocused = useIsFocused();
    const slideAnim = useRef(new Animated.Value(40)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isFocused) {
        // Reset về vị trí ban đầu rồi chạy animation
        slideAnim.setValue(40);
        fadeAnim.setValue(0);
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 70,
            friction: 12,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [isFocused]);

    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <WrappedComponent {...props} />
      </Animated.View>
    );
  };
}
// --------------------------------------------------

// --- UI Tạm thời (Sẽ tách file thật ở Giai đoạn sau) ---
const TmpScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name} Screen</Text></View>
);

const DiariesScreen = () => <TmpScreen name="Nhật ký" />;
const Roadmap52HzScreen = () => <TmpScreen name="52Hz" />;
const ProfileScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Profile Screen</Text>
      <TouchableOpacity
        onPress={logout}
        style={{ backgroundColor: '#FF7675', padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Đăng xuất (Test)</Text>
      </TouchableOpacity>
    </View>
  );
};
// ----------------------------------------------------

// Wrap tất cả các màn hình với hiệu ứng slide
const AnimatedHome = withTabTransition(HomeScreen);
const AnimatedTests = withTabTransition(TestsScreen);
const AnimatedRoadmap = withTabTransition(Roadmap52HzScreen);
const AnimatedDiaries = withTabTransition(DiariesScreen);
const AnimatedProfile = withTabTransition(ProfileScreen);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true, // Hiện chữ theo đúng design
        tabBarActiveTintColor: mintColor,
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Tests') iconName = 'clipboard';
          else if (route.name === 'Roadmap52Hz') iconName = 'musical-notes';
          else if (route.name === 'Diaries') iconName = 'heart';
          else if (route.name === 'Profile') iconName = 'person';

          return (
            <Ionicons name={iconName} size={24} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={AnimatedHome} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Tests" component={AnimatedTests} options={{ tabBarLabel: 'Test' }} />
      <Tab.Screen name="Roadmap52Hz" component={AnimatedRoadmap} options={{ tabBarLabel: '52Hz' }} />
      <Tab.Screen name="Diaries" component={AnimatedDiaries} options={{ tabBarLabel: 'Diary' }} />
      <Tab.Screen name="Profile" component={AnimatedProfile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 35 : 35,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    height: 70,
    marginHorizontal: 15,
    borderTopWidth: 0,
    paddingTop: Platform.OS === 'ios' ? 12 : 8,
    paddingBottom: Platform.OS === 'ios' ? 22 : 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});