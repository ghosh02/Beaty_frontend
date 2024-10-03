import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import {
  addService,
  decreaseServiceQuantity,
  applyCoupon,
  removeCoupon,
} from '../../store/selectedServicesSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const AddCoupon = () => {
  const [couponInput, setCouponInput] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleApplyCoupon = () => {
    if (couponInput === 'FREE10') {
      dispatch(applyCoupon({code: 'FREE10', discountValue: 40}));
      setShowCoupon(true);
      navigation.navigate('Checkout');
    } else {
      alert('Invalid Coupon Code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton color="#1C1C28" />
        <Text style={styles.header}>Offers & Promo Codes</Text>
      </View>

      <View style={styles.couponContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.couponText}>Coupon Code</Text>
          <TextInput
            placeholder="Enter Coupon Code"
            placeholderTextColor="#8F90A6"
            value={couponInput}
            onChangeText={setCouponInput}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleApplyCoupon}>
          <Text style={styles.text}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    color: '#1C1C28',
    fontWeight: 'bold',
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#C7C9D9',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 10,
    color: '#1C1C28',
  },
  text: {
    fontSize: 12,
    color: '#6440FE',
    fontWeight: 'bold',
  },
  couponText: {
    fontSize: 10,
    color: '#1C1C28',
    marginBottom: 5,
  },
});

export default AddCoupon;
