import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {CloseIcon, Down, RightIcon} from '../../assets/Icon/IconName';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';

const About = () => {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const [isPrivacyExpanded, setIsPrivacyExpanded] = useState(false);
  const [isLicensesExpanded, setIsLicensesExpanded] = useState(false);
  const navigation = useNavigation();
  const toggleDropdown = section => {
    switch (section) {
      case 'terms':
        setIsTermsExpanded(!isTermsExpanded);
        break;
      case 'privacy':
        setIsPrivacyExpanded(!isPrivacyExpanded);
        break;
      case 'licenses':
        setIsLicensesExpanded(!isLicensesExpanded);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>About</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleDropdown('terms')}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          {isTermsExpanded ? <Down /> : <RightIcon color="#000" />}
        </TouchableOpacity>
        {isTermsExpanded && (
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Suspendisse potenti.
          </Text>
        )}

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleDropdown('privacy')}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          {isPrivacyExpanded ? <Down /> : <RightIcon color="#000" />}
        </TouchableOpacity>
        {isPrivacyExpanded && (
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum vestibulum.
          </Text>
        )}

        <TouchableOpacity
          style={styles.section}
          onPress={() => toggleDropdown('licenses')}>
          <Text style={styles.sectionTitle}>Licenses</Text>
          {isLicensesExpanded ? <Down /> : <RightIcon color="#000" />}
        </TouchableOpacity>
        {isLicensesExpanded && (
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor
            viverra sapien sit amet.
          </Text>
        )}
      </ScrollView>
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
    alignItems: 'center',
    gap: 10,
    marginBottom: 32,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C28',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1C1C28',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    color: '#8F90A6',
    paddingVertical: 10,
  },
});

export default About;
