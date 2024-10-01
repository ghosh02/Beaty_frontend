import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Btn = ({
  label,
  press,
  bgColor = '#6440FE',
  color = '#fff',
  width = '100%',
}) => {
  return (
    <TouchableOpacity
      onPress={press}
      style={[styles.button, {backgroundColor: bgColor, width: width}]}>
      <Text style={[styles.buttonText, {color: color}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 10,

    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Btn;
