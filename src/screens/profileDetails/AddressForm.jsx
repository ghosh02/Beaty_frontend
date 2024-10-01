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
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAddress,
  updateAddress,
  clearSelectedAddress,
} from '../../store/addressSlice';
import Btn from '../../components/Btn';

const AddressForm = ({navigation}) => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector(state => state.address.selectedAddress);

  const [address, setAddress] = useState({
    street: '',
    pinCode: '',
    state: '',
    label: 'Home',
  });

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
    if (selectedAddress) {
      dispatch(updateAddress(address));
    } else {
      dispatch(addAddress({...address, id: Date.now()}));
    }
    dispatch(clearSelectedAddress());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}></View>
      <ScrollView contentContainerStyle={styles.addressScroll}>
        <Text style={styles.title}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street"
          value={address.street}
          onChangeText={text => setAddress({...address, street: text})}
        />
        <Text style={styles.title}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={address.pinCode}
          onChangeText={text => setAddress({...address, pinCode: text})}
        />
        <Text style={styles.title}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={text => setAddress({...address, state: text})}
        />

        <View style={{flexDirection: 'row'}}>
          {['Home', 'Work', 'Other'].map(labelOption => (
            <TouchableOpacity
              key={labelOption}
              onPress={() => setAddress({...address, label: labelOption})}
              style={{
                backgroundColor:
                  address.label === labelOption ? 'blue' : '#F0F5FA',

                padding: 15,
                borderRadius: 5,
                margin: 5,
              }}>
              <Text
                style={{
                  color: address.label === labelOption ? '#fff' : '#32343E',
                }}>
                {labelOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* 
          <TouchableOpacity onPress={handleCurrentLocation}>
            <Text>Use current location</Text>
          </TouchableOpacity> */}

        <Btn label="Save Address" Press={handleSave} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },

  mapContainer: {
    backgroundColor: '#F0F5FA',
    height: 300,
  },
  addressScroll: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#090D20',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F3F4F9',
    color: '#9EA1AE',
    fontFamily: 'SpaceGrotesk-Regular',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#F0F5FA',
  },
});
export default AddressForm;
