// ProfileModal.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RightIcon} from '../../assets/Icon/IconName';

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
    navigateTo: 'Home',
  },
  {
    id: '6',
    title: 'Logout',
    subtitle: '',
    icon: 'logout',
    navigateTo: 'Home',
    color: '#E53535',
  },
];

// Main Profile Modal component
const Profile = ({navigation}) => {
  // Render individual menu items
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (item.title === 'Logout') {
          navigation.goBack();
        }
        navigation.navigate(item.navigateTo);
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
});

export default Profile;
