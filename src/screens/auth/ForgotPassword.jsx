import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Btn from '../../components/Btn';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    console.log('Reset password for: ', email);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ConfettiAnimation /> */}
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Please enter your email to reset the password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <Btn
        label={'Reset Password'}
        press={() => navigation.navigate('OtpVerify', {email})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 5,
    color: '#130D0E',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9A2A3',
    fontFamily: 'SpaceGrotesk-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#130D0E',
    borderWidth: 1,
    borderColor: '#A9A2A350',
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 50,
  },
});

export default ForgotPassword;
