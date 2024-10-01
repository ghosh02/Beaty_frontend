import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Camera, LeftIcon} from '../../assets/Icon/IconName';
import profile from '../../assets/images/mainprofile.png';
import Btn from '../../components/Btn';
import {useNavigation} from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftIcon />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image source={profile} style={styles.image} />
          <TouchableOpacity style={styles.camera}>
            <Camera />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value="Sudip Ghosh"
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value="sudip@gmail.com"
          />
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value="1234567890"
          />
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            placeholder="Name"
            secureTextEntry
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value="1234567890"
          />
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <Btn label="Save" bgColor="#6440FE" color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  image: {
    position: 'relative',
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: 100,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8F90A660',
    padding: 10,
    marginBottom: 10,
    color: '#1C1C28',
    fontSize: 16,
    borderRadius: 8,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C28',
    marginBottom: 10,
  },
  btnContainer: {
    alignItems: 'center',
  },
});

export default EditProfile;
