import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
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
import {useDispatch, useSelector} from 'react-redux';
import {setProfileData, updateProfileImage} from '../../store/profileSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BackButton from '../../components/BackButton';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch profile data from Redux store
  const profileData = useSelector(state => state.profile);

  // Local state to manage the entire profile data
  const [updatedProfile, setUpdatedProfile] = useState({
    username: profileData.username,
    email: profileData.email,
    phoneNumber: profileData.phoneNumber,
    profileImage: profileData.profileImage,
  });
  const handleInputChange = (field, value) => {
    setUpdatedProfile({
      ...updatedProfile,
      [field]: value,
    });
  };

  const handleSave = () => {
    dispatch(setProfileData(updatedProfile));
    navigation.goBack();
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      cameraType: 'front',
      maxHeight: 200,
      maxWidth: 300,
      quality: 1,
    };
    launchCamera(options, handleResponse);
  };
  const handleGalleryLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 300,
      quality: 1,
    };
    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      const imageUri = response.assets?.[0]?.uri || response.uri;
      setUpdatedProfile({
        ...updatedProfile,
        profileImage: imageUri,
      });
      dispatch(updateProfileImage(imageUri));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image
            source={{uri: updatedProfile.profileImage}}
            style={styles.image}
          />
          <TouchableOpacity onPress={handleCameraLaunch} style={styles.camera}>
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
            value={updatedProfile.username}
            onChangeText={text => handleInputChange('username', text)}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value={updatedProfile.email}
            onChangeText={text => handleInputChange('email', text)}
          />
          <Text style={styles.inputTitle}>Phone Number</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8F90A6"
            style={styles.input}
            value={updatedProfile.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
          />
        </View>
      </ScrollView>

      <View style={styles.btnContainer}>
        <Btn label="Save" bgColor="#6440FE" color="#fff" press={handleSave} />
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
