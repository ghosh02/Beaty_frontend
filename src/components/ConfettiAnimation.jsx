import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const ConfettiAnimation = () => {
  return (
    <>
      <LottieView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: '#00000040',
        }}
        source={require('../assets/confetti/confetti.json')}
        autoPlay
        loop={false}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ConfettiAnimation;
