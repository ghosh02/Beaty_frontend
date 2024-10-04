import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorField = ({error}) => {
  if (!error) return null;
  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 4,
    paddingLeft: 12,
  },
});

export default ErrorField;
