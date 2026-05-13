import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth.store';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const mintColor = '#66C5BA';

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Mở lại store nếu cần, tuy nhiên với luồng đăng ký, thường gọi API xong mới login
  const loginAction = useAuthStore((state) => state.login);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Tiền xử lý dữ liệu trước khi gửi API (để tránh lỗi CSDL)
    // 1. Kiểm tra ngày sinh định dạng DD/MM/YYYY
    const dobParts = dob.split('/');
    if (dobParts.length !== 3) {
      alert('Vui lòng nhập Sinh nhật theo định dạng: Ngày/Tháng/Năm');
      return;
    }
    // Chuyển thành YYYY-MM-DD để MySQL chấp nhận
    const apiDob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;

    // Ở đây bạn chưa truyền API nên mình chỉ alert ra để bạn thấy dữ liệu sẽ được gửi
    alert(`Dữ liệu sạch gửi đi API:\nEmail: ${email}\nGender: ${gender || 'Chưa chọn'}\nDOB: ${apiDob}`);

    // Tạm thời giả lập đăng ký xong thì đăng nhập luôn
    // loginAction('mock-token-456', {
    //   id: 2,
    //   email: email,
    //   full_name: fullName,
    //   gender: gender || 'Other',
    //   dob: apiDob,
    // });

    // Hoặc quay về màn Login
    // navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../../assets/images/background/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flexContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            {/* Sử dụng ScrollView vì form Đăng ký dài hơn form Đăng nhập */}
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.subtitle}>Hãy tìm hiểu bạn nhiều hơn</Text>

                {/* 1. Họ và tên */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Họ và tên"
                    placeholderTextColor="#BDBDBD"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                {/* 2. E-mail */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="mail" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="E-mail"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* 3. Mật khẩu */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIconWrapper}>
                    <Feather name={passwordVisible ? "eye" : "eye-off"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* 4. Xác nhận mật khẩu */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIconWrapper}>
                    <Feather name={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>

                {/* 5. Giới tính */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="users" size={20} color="#999" style={styles.inputIcon} />
                  <Text style={{ flex: 1, fontSize: 16, color: '#BDBDBD' }}>Giới tính</Text>

                  {/* Hai nút chọn giới tính */}
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => setGender('Male')}
                      style={[styles.genderOption, gender === 'Male' && styles.genderOptionActive]}
                    >
                      <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>Nam</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setGender('Female')}
                      style={[styles.genderOption, gender === 'Female' && styles.genderOptionActive]}
                    >
                      <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>Nữ</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 6. Sinh nhật */}
                <View style={[styles.inputWrapper, styles.shadowInput]}>
                  <Feather name="calendar" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Sinh nhật (DD/MM/YYYY)"
                    placeholderTextColor="#BDBDBD"
                    value={dob}
                    onChangeText={setDob}
                  />
                </View>

                {/* Nút Đăng ký */}
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                  <Text style={styles.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>

                {/* Quay lại Đăng nhập */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Đã có tài khoản? </Text>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.loginLink}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 120, // Giảm một chút so với màn Login vì form dài hơn
    paddingBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20, // Thu hẹp khoảng cách một chút so với Login
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIconWrapper: {
    padding: 5,
  },
  shadowInput: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15,
  },
  genderOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
    backgroundColor: '#F5F7FA', // Màu nền nhạt khi chưa chọn
  },
  genderOptionActive: {
    backgroundColor: mintColor, // Màu mint khi được chọn
  },
  genderText: {
    color: '#999',
    fontSize: 14,
    fontWeight: 'bold',
  },
  genderTextActive: {
    color: 'white',
  },
  registerButton: {
    backgroundColor: mintColor,
    borderRadius: 30,
    paddingVertical: 18,
    width: '60%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: mintColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    fontSize: 16,
  },
  loginLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
