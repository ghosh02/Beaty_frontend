// AddressForm.js
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  updateAddress,
  clearSelectedAddress,
} from '../../store/addressSlice';
import Btn from '../../components/Btn';
import BackButton from '../../components/BackButton';
import ErrorField from '../../components/ErrorField';

const AddressForm = ({navigation}) => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector(state => state.address.selectedAddress);

  const [address, setAddress] = useState({
    street: '',
    pinCode: '',
    state: '',
    type: 'Home',
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress);
    }
  }, [selectedAddress]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Current position:', position);
        // For now, mock data - integrate reverse geocoding to get address
        setAddress({
          street: 'Mock Street',
          pinCode: '123456',
          state: 'Mock State',
          label: address.label,
        });
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Unable to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleSave = () => {
    if (validateAddressData()) {
      if (selectedAddress) {
        dispatch(updateAddress(address));
      } else {
        dispatch(addAddress({...address, id: Date.now()}));
      }
      dispatch(clearSelectedAddress());
      navigation.goBack();
    }
  };
  const validateAddressData = () => {
    let newErrors = {};

    if (!address.street) {
      newErrors.street = 'Street is required';
    }

    if (!address.pinCode) {
      newErrors.pinCode = 'Pin code is required';
    }
    if (!address.state) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const isAddressFormValid =
    !errors.street &&
    address.street !== '' &&
    !errors.pinCode &&
    address.pinCode !== '' &&
    !errors.state &&
    address.state !== '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color={'#000'} />
        <Text style={styles.maintitle}>Add Address</Text>
      </View>
      {/* <View style={styles.mapContainer}></View> */}
      <ScrollView
        contentContainerStyle={styles.addressScroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Address</Text>
        <TextInput
          placeholderTextColor="#6B6E82"
          style={styles.input}
          placeholder="Street"
          value={address.street}
          onChangeText={text => setAddress({...address, street: text})}
        />
        <ErrorField error={errors.street} />
        <Text style={styles.title}>Pin code</Text>
        <TextInput
          placeholderTextColor="#6B6E82"
          style={styles.input}
          placeholder="Pin Code"
          value={address.pinCode}
          onChangeText={text => setAddress({...address, pinCode: text})}
          keyboardType="numeric"
        />
        <ErrorField error={errors.pinCode} />
        <Text style={styles.title}>State</Text>
        <TextInput
          placeholderTextColor="#6B6E82"
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={text => setAddress({...address, state: text})}
        />
        <ErrorField error={errors.state} />
        <View style={{flexDirection: 'row', marginTop: 15}}>
          {['Home', 'Work', 'Other'].map(labelOption => (
            <TouchableOpacity
              key={labelOption}
              onPress={() => setAddress({...address, type: labelOption})}
              style={[
                styles.addressType,
                address.type === labelOption && styles.selectedAddressType,
              ]}>
              <Text
                style={[
                  styles.addressText,
                  address.type === labelOption && styles.selectedAddressText,
                ]}>
                {labelOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* 
          <TouchableOpacity onPress={handleCurrentLocation}>
            <Text>Use current location</Text>
          </TouchableOpacity> */}
      </ScrollView>
      <Btn
        label="Save Address"
        press={handleSave}
        bgColor={isAddressFormValid ? '#6440FE' : '#6440FE50'}
        disabled={!isAddressFormValid}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  maintitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C28',
  },

  mapContainer: {
    backgroundColor: '#F0F5FA',
    height: 300,
  },
  addressScroll: {
    // padding: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#090D20',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    color: '#1C1C28',
    fontFamily: 'SpaceGrotesk-Regular',
    padding: 14,
    borderRadius: 8,
    // marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#F0F5FA',
  },
  addressType: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 30,
    backgroundColor: '#F0F5FA',
  },
  selectedAddressType: {
    backgroundColor: '#6440FE',
  },
  addressText: {
    color: '#32343E',
    fontSize: 14,
  },
  selectedAddressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default AddressForm;
