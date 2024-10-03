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
import CustomOTPFleld from '../../components/CustomOTPFleld';
import {useNavigation} from '@react-navigation/native';

const OtpVerify = ({route}) => {
  const navigation = useNavigation();
  const {email} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          We sent a reset link to{' '}
          <Text style={{fontFamily: 'SpaceGrotesk-Bold', color: '#000'}}>
            {email}
          </Text>{' '}
          enter 4 digit code that mentioned in the email
        </Text>

        <CustomOTPFleld />
      </View>
      <Btn
        label={'Verify code'}
        press={() => navigation.navigate('ChangePassword')}
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
    marginBottom: 10,
    color: '#130D0E',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9A2A3',
    lineHeight: 25,
    fontFamily: 'SpaceGrotesk-Regular',
    textAlign: 'center',
  },
});

export default OtpVerify;
