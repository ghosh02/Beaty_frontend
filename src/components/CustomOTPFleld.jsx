import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const CustomOTPField = ({page}) => {
  const navigation = useNavigation();
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const pin1ref = useRef();
  const pin2ref = useRef();
  const pin3ref = useRef();
  const pin4ref = useRef();
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const handleOTPChange = (value, index) => {
    const refs = [pin1ref, pin2ref, pin3ref, pin4ref];
    const setters = [setPin1, setPin2, setPin3, setPin4];
    setters[index](value);
    if (value.length === 1 && index < 3) {
      refs[index + 1].current.focus();
    }
  };

  const handleBackspace = (value, index) => {
    const refs = [pin1ref, pin2ref, pin3ref, pin4ref];
    const setters = [setPin1, setPin2, setPin3, setPin4];

    if (value.length === 0 && index > 0) {
      setters[index]('');
      refs[index - 1].current.focus();
      setters[index - 1]('');
    }
  };

  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 26,
        width: '100%',
        paddingVertical: 50,
      }}>
      <View
        style={[
          styles.TextInputView,
          {borderColor: isFocused1 ? '#6440FE' : '#EEEEEE'},
        ]}>
        <TextInput
          ref={pin1ref}
          style={styles.TextInputText}
          keyboardType="number-pad"
          maxLength={1}
          value={pin1}
          selectionColor="transparent"
          onFocus={() => setIsFocused1(true)}
          onBlur={() => setIsFocused1(false)}
          onChangeText={e => handleOTPChange(e, 0)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(pin1, 0);
            }
          }}
        />
      </View>
      <View
        style={[
          styles.TextInputView,
          {borderColor: isFocused2 ? '#6440FE' : '#EEEEEE'},
        ]}>
        <TextInput
          ref={pin2ref}
          style={styles.TextInputText}
          keyboardType="number-pad"
          maxLength={1}
          value={pin2}
          selectionColor="transparent"
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
          onChangeText={e => handleOTPChange(e, 1)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(pin2, 1);
            }
          }}
        />
      </View>
      <View
        style={[
          styles.TextInputView,
          {borderColor: isFocused3 ? '#6440FE' : '#EEEEEE'},
        ]}>
        <TextInput
          ref={pin3ref}
          style={[styles.TextInputText]}
          keyboardType="number-pad"
          maxLength={1}
          value={pin3}
          selectionColor="transparent"
          onFocus={() => setIsFocused3(true)}
          onBlur={() => setIsFocused3(false)}
          onChangeText={e => handleOTPChange(e, 2)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(pin3, 2);
            }
          }}
        />
      </View>
      <View
        style={[
          styles.TextInputView,
          {borderColor: isFocused4 ? '#6440FE' : '#EEEEEE'},
        ]}>
        <TextInput
          ref={pin4ref}
          style={styles.TextInputText}
          keyboardType="number-pad"
          maxLength={1}
          value={pin4}
          selectionColor="transparent"
          onFocus={() => setIsFocused4(true)}
          onBlur={() => setIsFocused4(false)}
          onChangeText={e => handleOTPChange(e, 3)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(pin4, 3);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputView: {
    backgroundColor: '#fff',
    color: '#6440FE',
    borderWidth: 2,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TextInputText: {
    fontSize: 20,
    padding: 10,
    color: '#6440FE',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default CustomOTPField;
