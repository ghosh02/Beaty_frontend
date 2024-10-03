import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const {width} = Dimensions.get('window');

const images = [
  {
    image: require('../../assets/images/electrician.png'),
    text: 'For top-notch electrical work, hire a skilled, reliable, and experienced electrician.',
  },
  {
    image: require('../../assets/images/salon.png'),
    text: 'Schedule the appointment in the best salon.',
  },
  {
    image: require('../../assets/images/parlour.png'),
    text: 'Search for the best parlour near you to fulfill all your beauty needs.',
  },
];

const Landing = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({x: nextIndex * width, animated: true});
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        ref={scrollViewRef}
        scrollEventThrottle={16}>
        {images.map((item, index) => (
          <View
            key={index}
            style={{
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={item.image}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
            <View style={styles.tintLayer} />
            <Text style={styles.title}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.dotWhite]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginRegister', {isLogin: true})
            }
            style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginRegister', {isLogin: false})
            }
            style={styles.GetStartedContainer}>
            <Text style={styles.GetStartedText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    bottom: 140,
    color: 'white',
    fontSize: 33,
    fontFamily: 'SpaceGrotesk-Bold',
    letterSpacing: 0.25,
    lineHeight: 45,
    paddingHorizontal: 24,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'absolute',
    bottom: 100,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 7,
    backgroundColor: '#ffffff30',
    marginHorizontal: 5.5,
  },
  dotWhite: {
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 26,
    marginBottom: 20,
    position: 'absolute',
    bottom: 10,
  },
  loginContainer: {
    paddingHorizontal: 60,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  GetStartedContainer: {
    paddingHorizontal: 33,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  GetStartedText: {color: '#6440FE', fontSize: 16, fontWeight: 'bold'},
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default Landing;
