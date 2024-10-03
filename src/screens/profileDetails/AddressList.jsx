import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedAddress, deleteAddress} from '../../store/addressSlice';
import {
  AddCircle,
  CloseIcon,
  Delete,
  Edit,
  Home,
  LeftIcon,
  Work,
} from '../../assets/Icon/IconName';
import Btn from '../../components/Btn';
import {BlurView} from '@react-native-community/blur';
import BackButton from '../../components/BackButton';

const AddressList = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [DeleteAddressId, setDeleteAddressId] = useState(null);
  const addresses = useSelector(state => state.address.addresses);
  const dispatch = useDispatch();

  const handleEdit = address => {
    dispatch(setSelectedAddress(address));
    navigation.navigate('AddressForm');
  };
  const handleDelete = id => {
    setDeleteAddressId(id);
    setModalVisible(true);
  };
  const confirmDelete = () => {
    dispatch(deleteAddress(DeleteAddressId));
    setModalVisible(false);
  };
  const getIcon = type => {
    switch (type) {
      case 'Work':
        return <Work />;
      case 'Home':
        return <Home />;
      case 'Other':
        return <Home />;
      default:
        return [];
    }
  };
  const renderAddressItem = ({item}) => (
    <View style={styles.addressContainer}>
      <View style={styles.iconContainer}>{getIcon(item.type)}</View>
      <View style={styles.addressDataContainer}>
        <View style={styles.addressTypeContainer}>
          <Text style={styles.addressType}>{item.type}</Text>
          <View style={styles.editAddressContainer}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Edit />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Delete />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.addressTExt}>{item.street}</Text>
        <Text style={styles.addressTExt}>
          {item.state},{item.pinCode}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color="#000" />
        <Text style={styles.title}>My Address</Text>
      </View>

      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddressItem}
          keyExtractor={item => item.id}
          style={styles.orderList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>No Address Added</Text>
        </View>
      )}
      <Btn
        label="Add New Address"
        press={() => navigation.navigate('AddressForm')}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <BlurView
          style={styles.blurConatiner}
          blurType="Light"
          blurAmount={1}
        />

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalCloseButton}>
              <Text style={styles.modalTitle}>Delete Address?</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              Are you want to delete this address?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C28',
  },
  addressContainer: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginVertical: 5,
    backgroundColor: '#F0F5FA',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  addressDataContainer: {
    flex: 1,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressType: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#1C1C28',
  },
  addressTExt: {
    fontSize: 14,
    color: '#32343E60',
    marginTop: 5,
  },
  editAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emptyMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#6e6e6e',
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // paddingVertical: 10,
  },
  addText: {
    fontSize: 16,
    color: '#6440FE',
  },
  blurConatiner: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 24,
    paddingBottom: 30,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C28',
  },
  modalCloseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#8F90A6',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6440FE',
    width: '40%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6440FE',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default AddressList;
