import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Back} from '../assets/Icon/IconName';

const BackButton = ({color}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex: 10}}>
      <Back color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default BackButton;
