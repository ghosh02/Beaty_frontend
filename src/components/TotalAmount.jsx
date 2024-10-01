import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TotalAmount = ({length, totalPrice, title, press}) => {
  return (
    <View>
      <View style={styles.cart}>
        <View style={styles.cartPriceContainer}>
          <View style={styles.cartTextContainer}>
            <Text style={styles.cartText}>{length}</Text>
          </View>
          <View>
            <Text style={styles.cartText}>$ {totalPrice}</Text>
            <Text style={{fontSize: 14, color: '#fff'}}>plus taxes</Text>
          </View>
        </View>
        <TouchableOpacity onPress={press}>
          <Text style={styles.continueButtonText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#6440FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartTextContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  cartPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  cartText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  continueButtonText: {color: '#fff', fontWeight: 'bold'},
});

export default TotalAmount;
