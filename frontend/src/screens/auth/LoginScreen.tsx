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
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth.store';
import { validateLoginForm } from '../../utils/validators';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const mintColor = '#66C5BA';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  const loginAction = useAuthStore((state) => state.login); // Đã mở lại store

  // Logic đăng nhập
  const handleLogin = () => {
    Keyboard.dismiss(); // Ẩn bàn phím khi bấm submit
    
    // Gọi hàm kiểm tra dùng chung
    const newErrors = validateLoginForm(email, password);

    // Nếu có lỗi thì dừng lại và hiển thị
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Nếu không có lỗi thì xóa lỗi cũ đi
    setErrors({});

    // Giả lập đăng nhập thành công
    loginAction('mock-token-123', {
      id: 1,
      email: email,
      full_name: 'Nguyễn Văn A',
      gender: 'Male',
      dob: '2000-01-01',
      avatar_url: undefined,
      treatment_status: 'none'
    });
  };

  const handleGuestLogin = () => {
    // Đăng nhập quyền khách
    loginAction('guest-token', {
      id: 0,
      email: 'guest@app.com',
      full_name: 'Khách Ẩn Danh',
      gender: 'Other',
      dob: '1900-01-01',
      avatar_url: undefined,
      treatment_status: 'none'
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../../assets/images/background/background.png')}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <SafeAreaView style={styles.container}>
          {/* Thanh trạng thái để giờ và pin hiện trên nền sóng trên cùng */}
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.flexContainer}
              keyboardVerticalOffset={0}
            >
              {/* Container chứa nội dung, đẩy xuống dưới phần sóng trên và căn giữa */}
              <View style={styles.contentContainer}>


            </View>

            </KeyboardAvoidingView>
          ) : (
            <View style={styles.flexContainer}>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>Đăng nhập</Text>
                <Text style={styles.subtitle}>Tiếp tục hành trình chữa lành của bạn</Text>
  
                {/* Ô nhập Email với Icon và Bóng đổ đậm */}
                <View style={[styles.inputWrapper, styles.shadowInput, errors.email ? styles.inputErrorBorder : null]}>
                  <Feather name="mail" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="E-mail"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => { setEmail(text); setErrors({...errors, email: undefined}); }}
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
  
                {/* Ô nhập Mật khẩu với Icon, Ẩn/hiện và Bóng đổ đậm */}
                <View style={[styles.inputWrapper, styles.shadowInput, errors.password ? styles.inputErrorBorder : null]}>
                  <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={(text) => { setPassword(text); setErrors({...errors, password: undefined}); }}
                  />
                  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIconWrapper}>
                    <Feather name={passwordVisible ? "eye" : "eye-off"} size={20} color="#999" />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
  
                {/* Quên mật khẩu */}
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
  
                <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
                  <Text style={styles.guestButtonText}>Tiếp tục dưới quyền Khách</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Không có tài khoản ? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerLink}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 160,
    justifyContent: 'center',

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10, // Giảm từ 60 xuống 10 để chừa chỗ cho subtitle
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30, // Góc rất tròn
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 20, // Khoảng cách chuẩn
  },
  inputErrorBorder: {
    borderWidth: 1,
    borderColor: '#FF7675', // Viền đỏ khi lỗi
  },
  errorText: {
    color: '#FF7675',
    fontSize: 13,
    marginLeft: 20,
    marginTop: -15,
    marginBottom: 15,
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
    // Bóng đổ đậm để tạo hiệu ứng neumorphic nổi lên
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 15, // Dành cho Android
  },
  forgotPassword: {
    alignSelf: 'flex-end', // Căn phải
    marginBottom: 35,
  },
  forgotPasswordText: {
    color: '#BDBDBD', // Màu xám nhạt
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: mintColor,
    borderRadius: 30,
    paddingVertical: 18,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 40,
    shadowColor: mintColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guestButton: {
    alignItems: 'center',
    marginBottom: 35,
  },
  guestButtonText: {
    color: mintColor,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#000',
    fontSize: 16,
  },
  registerLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Gạch chân
  },
});