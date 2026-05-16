import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth.store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../types/navigation.types';

const { width } = Dimensions.get('window');

const MOCK_DATA = [
  { id: '1', title: 'Thông tin cá nhân', iconName: 'person', iconType: 'Ionicons' },
  { id: '2', title: 'Lời khuyên', iconName: 'bandage', iconType: 'MaterialCommunityIcons' },
  { id: '3', title: 'Biểu đồ cảm xúc', iconName: 'happy-outline', iconType: 'Ionicons' },
  { id: '4', title: 'Đổi mật khẩu', iconName: 'lock-closed', iconType: 'Ionicons' },
  { id: '5', title: 'Lịch sử', iconName: 'time', iconType: 'Ionicons' },
  { id: '6', title: 'Chính sách bảo mật', iconName: 'shield-alert', iconType: 'MaterialCommunityIcons' },
  { id: '7', title: 'Giới thiệu về chúng tôi', iconName: 'information-circle', iconType: 'Ionicons' },
];

const mintColor = '#66C5BA';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { logout, user } = useAuthStore();

  const renderIcon = (name: string, type: string) => {
    switch (type) {
      case 'Feather':
        return <Feather name={name as any} size={24} color={mintColor} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={name as any} size={24} color={mintColor} />;
      default:
        return <Ionicons name={name as any} size={24} color={mintColor} />;
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/background.png')}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* PHẦN PROFILE HEADER */}
          <View style={styles.headerContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.nameText}>{user?.full_name || 'Trần Minh Quân'}</Text>
            <Text style={styles.emailText}>{user?.email || 'mquan8912@gmail.com'}</Text>
          </View>

          {/* PHẦN DANH SÁCH MENU */}
          <View style={styles.menuContainer}>
            {MOCK_DATA.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    if (item.id === '1') {
                      navigation.navigate('PersonalInfo');
                    }
                  }}
                >
                  <Text style={styles.menuText}>{item.title}</Text>
                  {renderIcon(item.iconName, item.iconType)}
                </TouchableOpacity>
                {index < MOCK_DATA.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

          {/* NÚT ĐĂNG XUẤT */}
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>

          {/* Khoảng trống paddingBottom */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  nameText: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'Baloo2_700Bold',
    marginTop: 10,
  },
  emailText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Baloo2_700Bold',
    marginTop: 0,
  },
  menuContainer: {
    paddingHorizontal: 30,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Baloo2_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    width: '100%',
  },
  logoutButton: {
    backgroundColor: mintColor,
    borderRadius: 30,
    paddingVertical: 14,
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: mintColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Baloo2_700Bold',
    textAlign: 'center',
  },
});
