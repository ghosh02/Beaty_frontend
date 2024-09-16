import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Btn from '../../components/Btn';
import {useNavigation} from '@react-navigation/native';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (password === confirmPassword) {
      navigation.navigate('LoginRegister', {isLogin: true});
      console.log('Password updated successfully');
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // Add your logo here
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <View style={{width: '100%', flex: 1}}>
        <Text style={styles.subTitle}>Set a new password</Text>
        <Text style={styles.instructions}>
          Create a new password. Ensure it differs from previous ones for
          security.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#545454"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.inputLabel}>Confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#545454"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Btn label={'Update Password'} press={handleUpdatePassword} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 20,
    color: '#130D0E',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1E1E1E',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#545454',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    color: '#545454',
    borderWidth: 1,
    borderColor: '#F3F4F9',
    borderRadius: 8,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#1E1E1E',
    marginBottom: 5,
  },
});

export default ChangePassword;
