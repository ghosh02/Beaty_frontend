import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Back} from '../assets/Icon/IconName';

const BackBtn = ({color}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{zIndex: 10, position: 'absolute', top: 20, left: 24}}>
      <Back color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default BackBtn;
