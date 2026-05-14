import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import EmotionModal from '../../components/homescreen/EmotionModal';
import EmotionTracker from '../../components/homescreen/EmotionTracker';
import WeeklyCalendar from '../../components/homescreen/WeeklyCalendar';
import TestReminder from '../../components/homescreen/TestReminder';

const { width } = Dimensions.get('window');
const mintColor = '#4ABEB2';

export default function HomeScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  
  // State lưu trữ cảm xúc đã gửi trong ngày hôm nay để hiển thị lên Lịch
  const [todayEmotion, setTodayEmotion] = useState<any>(null);

  const handleSelectEmotion = (emotion: any) => {
    setSelectedEmotion(emotion);
    setModalVisible(true);
  };

  const handleSubmitDiary = (reason: string) => {
    // Lưu tạm vào state để hiển thị lên Lịch
    setTodayEmotion(selectedEmotion);
    
    alert(`Đã lưu nhật ký!\nCảm xúc: ${selectedEmotion?.name}\nLý do: ${reason}`);
    setModalVisible(false);
    setTimeout(() => {
      setSelectedEmotion(null);
    }, 500);
  };

  return (
    // Dùng ImageBackground bọc toàn bộ màn hình
    <ImageBackground
      source={require('../../../assets/images/background/background.png')}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>Xin chào,</Text>
            <Text style={styles.nameText}>Tran Minh Quan</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.bellIcon}>
              <Feather name="bell" size={26} color="#000" />
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://i.pinimg.com/736x/8f/c2/f7/8fc2f7db2c453e00b847847b2c589083.jpg' }}
              style={styles.avatar}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <EmotionTracker onSelectEmotion={handleSelectEmotion} />

          <WeeklyCalendar todayEmotion={todayEmotion} />

          <TestReminder />

          <View style={{ height: 110 }} />
        </ScrollView>

        <EmotionModal
          visible={isModalVisible}
          emotion={selectedEmotion}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitDiary}
        />
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
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 15,
  },
  greetingText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 2,
    fontFamily: 'Baloo2_500Medium',
  },
  nameText: {
    fontSize: 30,
    color: '#000',
    fontFamily: 'Baloo2_700Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});