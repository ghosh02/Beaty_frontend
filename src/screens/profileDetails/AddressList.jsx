import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedAddress, deleteAddress} from '../../store/addressSlice';

const AddressList = ({navigation}) => {
  const addresses = useSelector(state => state.address.addresses);
  const dispatch = useDispatch();

  const handleEdit = address => {
    dispatch(setSelectedAddress(address));
    navigation.navigate('AddressForm');
  };

  const handleDelete = id => {
    dispatch(deleteAddress(id));
  };

  return (
    <View>
      {addresses.map(address => (
        <View
          key={address.id}
          style={{
            padding: 10,
            borderColor: 'gray',
            borderWidth: 1,
            marginVertical: 5,
          }}>
          <Text>{address.label}</Text>
          <Text>{address.street}</Text>
          <Text>
            {address.postCode}, {address.state}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => handleEdit(address)}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(address.id)}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Button
        title="Add New Address"
        onPress={() => navigation.navigate('AddressForm')}
      />
    </View>
  );
};

export default AddressList;
