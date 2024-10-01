import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Check, Eye, EyeOff} from '../../assets/Icon/IconName';

const LoginRegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {isLogin: initialIsLogin} = route.params;

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    stayLogged: false,
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleLoginInputChange = (field, value) => {
    setLoginData({...loginData, [field]: value});
  };

  const handleRegisterInputChange = (field, value) => {
    setRegisterData({...registerData, [field]: value});
  };
  const toggleLoginCheckbox = () => {
    setLoginData({...loginData, stayLogged: !loginData.stayLogged});
  };

  const toggleRegisterCheckbox = () => {
    setRegisterData({
      ...registerData,
      agreeToTerms: !registerData.agreeToTerms,
    });
  };
  const handleLoginSubmit = () => {
    console.log(loginData);
    setLoginData({
      email: '',
      password: '',
      stayLogged: false,
    });
    navigation.navigate('Home');
  };
  const handleRegisterSubmit = () => {
    console.log(registerData);
    setRegisterData({
      username: '',
      email: '',
      password: '',
      agreeToTerms: false,
    });
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, There</Text>
          <Text style={styles.welcomeText}>Welcome</Text>

          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.activeButton]}
              onPress={() => setIsLogin(true)}>
              <Text
                style={[
                  styles.toggleButtonText,
                  isLogin && styles.activeButtonText,
                ]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.activeButton]}
              onPress={() => setIsLogin(false)}>
              <Text
                style={[
                  styles.toggleButtonText,
                  !isLogin && styles.activeButtonText,
                ]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isLogin ? (
        <View style={styles.formContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Login to Your Account</Text>
            <Text style={styles.subtitle}>
              Make sure that you already have an account.
            </Text>
            <Text style={styles.title}>Email Address</Text>
            <TextInput
              placeholder="Enter your email or phone"
              placeholderTextColor="#9EA1AE"
              style={styles.input}
              onChangeText={text => handleLoginInputChange('email', text)}
              value={loginData.email}
            />
            <Text style={styles.title}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9EA1AE"
                style={{flex: 1, color: '#9EA1AE'}}
                secureTextEntry={!showPassword}
                onChangeText={text => handleLoginInputChange('password', text)}
                value={loginData.password}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeIcon}>
                {showPassword ? <Eye /> : <EyeOff />}
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    loginData.stayLogged && styles.checkedCheckbox,
                  ]}
                  onPress={toggleLoginCheckbox}>
                  {loginData.stayLogged && <Check />}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Stay Logged</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text
                  style={{
                    color: '#25388D',
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: 14,
                  }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Make sure your account keep secure.
            </Text>
            <Text style={styles.title}>Username</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#9EA1AE"
              style={styles.input}
              onChangeText={text => handleRegisterInputChange('username', text)}
              value={registerData.username}
            />
            <Text style={styles.title}>Email Address</Text>
            <TextInput
              placeholder="Enter your email or phone"
              placeholderTextColor="#9EA1AE"
              style={styles.input}
              onChangeText={text => handleRegisterInputChange('email', text)}
              value={registerData.email}
            />
            <Text style={styles.title}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9EA1AE"
                style={{flex: 1, color: '#9EA1AE'}}
                secureTextEntry={!showPassword}
                onChangeText={text =>
                  handleRegisterInputChange('password', text)
                }
                value={registerData.password}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={styles.eyeIcon}>
                {showPassword ? <Eye /> : <EyeOff />}
              </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  registerData.agreeToTerms && styles.checkedCheckbox,
                ]}
                onPress={toggleRegisterCheckbox}>
                {registerData.agreeToTerms && <Check />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                I agree with the terms and conditions by creating an account
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRegisterSubmit}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6E38F7',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#6E38F7',
  },
  header: {
    backgroundColor: '#9A83FE',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  headerText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#FFFFFF',
    marginVertical: 10,
  },
  toggleContainer: {
    backgroundColor: '#6E38F7',
    paddingVertical: 5,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 28,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FFFFFF',
  },
  toggleButtonText: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#FFFFFF',
  },
  activeButtonText: {
    color: '#6E38F7',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#090D20',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#9EA1AE',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#F3F4F9',
    color: '#9EA1AE',
    fontFamily: 'SpaceGrotesk-Regular',
    padding: 16,
    borderRadius: 28,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#F3F4F9',
    color: '#9EA1AE',
    fontFamily: 'SpaceGrotesk-Regular',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 28,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#6E38F7',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#9EA1AE',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    borderColor: 'transparent',
    backgroundColor: '#6440FE',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#090D20',
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default LoginRegisterScreen;
