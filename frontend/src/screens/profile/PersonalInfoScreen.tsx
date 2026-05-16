import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const mintColor = '#66C5BA';

export default function PersonalInfoScreen() {
  const navigation = useNavigation();

  // State lưu trữ dữ liệu form
  const [name, setName] = useState('Trần Minh Quân');
  const [email, setEmail] = useState('mquan8912@gmail.com');
  const [gender, setGender] = useState('Nam');
  const [birthday, setBirthday] = useState('14/07/2004');

  const handleSave = () => {
    // Logic lưu thông tin (sẽ gọi API sau)
    console.log('Saved:', { name, email, gender, birthday });
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/background.png')}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 2. Phần Avatar */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                  style={styles.avatar}
                />
              </View>
            </View>

            {/* 3. Form Thông Tin */}
            <View style={styles.formContainer}>
              {/* Tên */}
              <View style={styles.inputCard}>
                <Text style={styles.label}>Tên</Text>
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View style={styles.inputCard}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Giới tính */}
              <View style={styles.inputCard}>
                <Text style={styles.label}>Giới tính</Text>
                <TextInput
                  style={styles.textInput}
                  value={gender}
                  onChangeText={setGender}
                />
              </View>

              {/* Sinh nhật */}
              <View style={styles.inputCard}>
                <Text style={styles.label}>Sinh nhật</Text>
                <TextInput
                  style={styles.textInput}
                  value={birthday}
                  onChangeText={setBirthday}
                />
              </View>
            </View>

            {/* Nút Lưu */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#D7E5E2',
  },
  waveHeader: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 180, // Chiều cao dải sóng
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#FFF',
    borderRadius: 65,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputCard: {
    width: width * 0.88,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Baloo2_700Bold',
  },
  textInput: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Baloo2_400Regular',
    marginTop: 5,
    padding: 0,
  },
  saveButton: {
    backgroundColor: mintColor,
    width: width * 0.6,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    shadowColor: mintColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Baloo2_700Bold',
  },
});
