import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Btn = ({label, press, bgColor = '#6440FE', color = '#fff'}) => {
  return (
    <TouchableOpacity
      onPress={press}
      style={[styles.button, {backgroundColor: bgColor}]}>
      <Text style={[styles.buttonText, {color: color}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default Btn;
