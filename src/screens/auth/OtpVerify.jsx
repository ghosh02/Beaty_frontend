import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Btn from '../../components/Btn';
import CustomOTPFleld from '../../components/CustomOTPFleld';
import {useNavigation} from '@react-navigation/native';

const OtpVerify = ({route}) => {
  const navigation = useNavigation();
  const {email} = route.params;

  return (
    <View style={styles.container}>
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
      <Btn
        label={'Verify code'}
        press={() => navigation.navigate('ChangePassword')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
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
    marginBottom: 50,
    color: '#130D0E',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9A2A3',
    lineHeight: 25,
    fontFamily: 'SpaceGrotesk-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OtpVerify;
