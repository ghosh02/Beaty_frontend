// import React, {useRef, useState, useEffect} from 'react';
// import {View, Text, Image, TouchableOpacity} from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const Landing = () => {
//   const carouselRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [carouselItems] = useState([
//     {
//       image: require('../../assets/electrician.png'),
//       text: 'For top-notch electrical work, hire a skilled, reliable, and experienced electrician.',
//     },
//     {
//       image: require('../../assets/electrician.png'),
//       text: 'Schedule the appointment in the best salon.',
//     },
//     {
//       image: require('../../assets/electrician.png'),
//       text: 'Search for the best parlour near you to fulfil all your beauty needs.',
//     },
//   ]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Automatically scroll to next slide
//       const nextIndex =
//         activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
//       setActiveIndex(nextIndex);
//       carouselRef.current.snapToItem(nextIndex);
//     }, 1000); // 1 second interval

//     return () => clearInterval(interval); // Clear interval on component unmount
//   }, [activeIndex, carouselItems.length]);

//   const renderItem = ({item}) => (
//     <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
//       <Image
//         source={item.image}
//         style={{width: '100%', height: 300}}
//         resizeMode="cover"
//       />
//       <Text
//         style={{
//           position: 'absolute',
//           bottom: 100,
//           color: 'white',
//           fontSize: 18,
//           fontWeight: 'bold',
//           textAlign: 'center',
//         }}>
//         {item.text}
//       </Text>
//       <View
//         style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
//         <TouchableOpacity
//           style={{
//             marginRight: 10,
//             paddingHorizontal: 30,
//             paddingVertical: 10,
//             borderRadius: 5,
//             borderWidth: 1,
//             borderColor: 'white',
//           }}>
//           <Text style={{color: 'white'}}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             paddingHorizontal: 30,
//             paddingVertical: 10,
//             borderRadius: 5,
//             backgroundColor: '#6C63FF',
//           }}>
//           <Text style={{color: 'white'}}>Get started</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <Carousel
//       layout="default"
//       ref={carouselRef}
//       data={carouselItems}
//       sliderWidth={400}
//       itemWidth={400}
//       renderItem={renderItem}
//       onSnapToItem={index => setActiveIndex(index)}
//     />
//   );
// };

// export default Landing;

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
} from 'react-native';

const {width} = Dimensions.get('window'); // Get device width for responsive carousel

const images = [
  {
    image: require('../../assets/images/electrician.png'), // Replace with your images
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
    <View style={{flex: 1}}>
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
            <Text
              style={{
                position: 'absolute',
                bottom: 140,
                color: 'white',
                fontSize: 33,
                fontFamily: 'SpaceGrotesk-Bold',
                letterSpacing: 0.25,
                lineHeight: 45,
                paddingHorizontal: 24,
              }}>
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
            position: 'absolute',
            bottom: 100,
          }}>
          {images.map((_, index) => (
            <View
              key={index}
              style={{
                height: 7,
                width: 7,
                borderRadius: 7,
                backgroundColor: currentIndex === index ? '#fff' : '#ffffff20',
                marginHorizontal: 5.5,
              }}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 26,
            marginBottom: 20,
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginRegister', {isLogin: true})
            }
            style={{
              paddingHorizontal: 60,
              paddingVertical: 12,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'white',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LoginRegister', {isLogin: false})
            }
            style={{
              paddingHorizontal: 33,
              paddingVertical: 12,
              borderRadius: 5,
              backgroundColor: '#fff',
            }}>
            <Text style={{color: '#6440FE', fontSize: 16, fontWeight: 'bold'}}>
              Get started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tintLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
export default Landing;
