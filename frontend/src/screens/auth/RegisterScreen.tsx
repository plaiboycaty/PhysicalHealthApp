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
  StatusBar,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation.types';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '../../store/auth.store';
import { validateRegisterForm } from '../../utils/validators'; // <--- Import từ file riêng

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
  const [errors, setErrors] = useState<any>({});

  const loginAction = useAuthStore((state) => state.login);

  const handleRegister = () => {
    Keyboard.dismiss();
    
    // Gọi hàm kiểm tra dùng chung
    const newErrors = validateRegisterForm(fullName, email, password, confirmPassword, gender, dob);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    // Chuyển thành YYYY-MM-DD để MySQL chấp nhận
    const dobParts = dob.split('/');
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

          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.flexContainer}
              keyboardVerticalOffset={0}
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
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.fullName ? styles.inputErrorBorder : null]}>
                    <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Họ và tên"
                      placeholderTextColor="#BDBDBD"
                      value={fullName}
                      onChangeText={(text) => { setFullName(text); setErrors({...errors, fullName: undefined}); }}
                    />
                  </View>
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
  
                  {/* 2. E-mail */}
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
  
                  {/* 3. Mật khẩu */}
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
  
                  {/* 4. Xác nhận mật khẩu */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.confirmPassword ? styles.inputErrorBorder : null]}>
                    <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Xác nhận mật khẩu"
                      placeholderTextColor="#BDBDBD"
                      secureTextEntry={!confirmPasswordVisible}
                      value={confirmPassword}
                      onChangeText={(text) => { setConfirmPassword(text); setErrors({...errors, confirmPassword: undefined}); }}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIconWrapper}>
                      <Feather name={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#999" />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
  
                  {/* 5. Giới tính */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.gender ? styles.inputErrorBorder : null]}>
                    <Feather name="users" size={20} color="#999" style={styles.inputIcon} />
                    <Text style={{ flex: 1, fontSize: 16, color: '#BDBDBD' }}>Giới tính</Text>
  
                    {/* Hai nút chọn giới tính */}
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => { setGender('Male'); setErrors({...errors, gender: undefined}); }}
                        style={[styles.genderOption, gender === 'Male' && styles.genderOptionActive]}
                      >
                        <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>Nam</Text>
                      </TouchableOpacity>
  
                      <TouchableOpacity
                        onPress={() => { setGender('Female'); setErrors({...errors, gender: undefined}); }}
                        style={[styles.genderOption, gender === 'Female' && styles.genderOptionActive]}
                      >
                        <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>Nữ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
  
                  {/* 6. Sinh nhật */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.dob ? styles.inputErrorBorder : null]}>
                    <Feather name="calendar" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Sinh nhật (DD/MM/YYYY)"
                      placeholderTextColor="#BDBDBD"
                      value={dob}
                      onChangeText={(text) => { setDob(text); setErrors({...errors, dob: undefined}); }}
                    />
                  </View>
                  {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
  
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
          ) : (
            <View style={styles.flexContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.contentContainer}>
                  <Text style={styles.title}>Đăng ký</Text>
                  <Text style={styles.subtitle}>Hãy tìm hiểu bạn nhiều hơn</Text>
  
                  {/* 1. Họ và tên */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.fullName ? styles.inputErrorBorder : null]}>
                    <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Họ và tên"
                      placeholderTextColor="#BDBDBD"
                      value={fullName}
                      onChangeText={(text) => { setFullName(text); setErrors({...errors, fullName: undefined}); }}
                    />
                  </View>
                  {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
  
                  {/* 2. E-mail */}
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
  
                  {/* 3. Mật khẩu */}
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
  
                  {/* 4. Xác nhận mật khẩu */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.confirmPassword ? styles.inputErrorBorder : null]}>
                    <Feather name="lock" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Xác nhận mật khẩu"
                      placeholderTextColor="#BDBDBD"
                      secureTextEntry={!confirmPasswordVisible}
                      value={confirmPassword}
                      onChangeText={(text) => { setConfirmPassword(text); setErrors({...errors, confirmPassword: undefined}); }}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIconWrapper}>
                      <Feather name={confirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#999" />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
  
                  {/* 5. Giới tính */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.gender ? styles.inputErrorBorder : null]}>
                    <Feather name="users" size={20} color="#999" style={styles.inputIcon} />
                    <Text style={{ flex: 1, fontSize: 16, color: '#BDBDBD' }}>Giới tính</Text>
  
                    {/* Hai nút chọn giới tính */}
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => { setGender('Male'); setErrors({...errors, gender: undefined}); }}
                        style={[styles.genderOption, gender === 'Male' && styles.genderOptionActive]}
                      >
                        <Text style={[styles.genderText, gender === 'Male' && styles.genderTextActive]}>Nam</Text>
                      </TouchableOpacity>
  
                      <TouchableOpacity
                        onPress={() => { setGender('Female'); setErrors({...errors, gender: undefined}); }}
                        style={[styles.genderOption, gender === 'Female' && styles.genderOptionActive]}
                      >
                        <Text style={[styles.genderText, gender === 'Female' && styles.genderTextActive]}>Nữ</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
  
                  {/* 6. Sinh nhật */}
                  <View style={[styles.inputWrapper, styles.shadowInput, errors.dob ? styles.inputErrorBorder : null]}>
                    <Feather name="calendar" size={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Sinh nhật (DD/MM/YYYY)"
                      placeholderTextColor="#BDBDBD"
                      value={dob}
                      onChangeText={(text) => { setDob(text); setErrors({...errors, dob: undefined}); }}
                    />
                  </View>
                  {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
  
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
    marginBottom: 20,
  },
  inputErrorBorder: {
    borderWidth: 1,
    borderColor: '#FF7675',
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
