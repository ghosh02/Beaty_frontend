// ProfileModal.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RightIcon} from '../../assets/Icon/IconName';
import {BlurView} from '@react-native-community/blur';

// Define the list of menu items
const menuItems = [
  {
    id: '1',
    title: 'Your favorites',
    subtitle: 'Reorder your favorite service in a click',
    icon: 'heart-outline',
    navigateTo: 'Order',
  },
  {
    id: '2',
    title: 'Payments methods',
    subtitle: 'Payments methods',
    icon: 'credit-card-outline',
    navigateTo: 'PaymentMethod',
  },
  {
    id: '3',
    title: 'Manage Address',
    subtitle: 'Manage Address',
    icon: 'map-marker-outline',
    navigateTo: 'AddressList',
  },
  {
    id: '4',
    title: 'Notifications',
    subtitle: 'View your past notifications',
    icon: 'bell-outline',
    navigateTo: 'Home',
  },
  {
    id: '5',
    title: 'About',
    subtitle: 'Privacy Policy, Terms of Services, Licenses',
    icon: 'information-outline',
    navigateTo: 'About',
  },
  {
    id: '6',
    title: 'Logout',
    subtitle: '',
    icon: 'logout',
    color: '#E53535',
  },
];

// Main Profile Modal component
const Profile = ({navigation}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Logout') {
          setModalVisible(true);
        } else {
          navigation.navigate(item.navigateTo);
        }
      }}>
      <Icon name={item.icon} size={24} color={item.color || '#000'} />
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, item.color && {color: item.color}]}>
          {item.title}
        </Text>
        {item.subtitle ? (
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        ) : null}
      </View>
      <RightIcon color="#000" />
    </TouchableOpacity>
  );
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileInfo}>+91 4842989351</Text>
            <Text style={styles.profileInfo}>johndoe@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editContainer}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editText}>Edit</Text>
          <RightIcon />
        </TouchableOpacity>
      </View>

      {/* FlatList displaying the menu items */}
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
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
            <Text style={styles.modalTitle}>Delete Address?</Text>
            <Text style={styles.modalDescription}>
              Are you want to log out?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={confirmDelete}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  profile: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderColor: '#8F90A640',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 54,
    objectFit: 'contain',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C28',
  },
  profileInfo: {
    fontSize: 13,
    color: '#8F90A6',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#6440FE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    color: '#1C1C28',
    fontWeight: 'bold',
  },
  menuSubtitle: {
    fontSize: 10,
    color: '#8F90A6',
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C1C28',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#8F90A6',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
