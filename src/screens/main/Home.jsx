// import React, {useRef, useState} from 'react';
// import {
//   Animated,
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {
//   CloseIcon,
//   DownIcon,
//   RightIcon,
//   SearchIcon,
//   Star,
// } from '../../assets/Icon/IconName';

// import shopData from '../../constants/shopData';
// import {useNavigation} from '@react-navigation/native';
// import menBeauty from '../../assets/imageIcons/barbershop.png';
// import womenBeauty from '../../assets/imageIcons/beauty.png';
// import bike from '../../assets/imageIcons/motorcycle.png';
// import carmechanic from '../../assets/imageIcons/mechanic.png';
// import electrician from '../../assets/imageIcons/electrician.png';
// import ac from '../../assets/imageIcons/airconditioner.png';
// import plumber from '../../assets/imageIcons/wrenchtool.png';
// import carpenter from '../../assets/imageIcons/carpenter.png';
// import pin from '../../assets/images/pin.png';

// const Home = () => {
//   const navigation = useNavigation();
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [filteredShops, setFilteredShops] = useState([]);
//   const services = [
//     {
//       title: 'Women Beauty',
//       image: womenBeauty,
//     },
//     {
//       title: 'Men Beauty',
//       image: menBeauty,
//     },
//     {
//       title: 'Bike Mechanic',
//       image: bike,
//     },
//     {
//       title: 'Car Mechanic',
//       image: carmechanic,
//     },
//     {title: 'Electrician', image: electrician},
//     {title: 'AC & Refrigerator', image: ac},
//     {title: 'Carpenter', image: carpenter},
//     {title: 'Plumber', image: plumber},
//   ];

//   const handleServicePress = service => {
//     const filteredShops = shopData.filter(
//       shop =>
//         shop.serviceType.trim().toLowerCase() ===
//         service.title.trim().toLowerCase(),
//     );
//     navigation.navigate('ServiceDetail', {
//       title: service.title,
//       image: service.image,
//       shops: filteredShops,
//     });
//   };

//   const inputRef = useRef(null);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };
//   const handleClearInput = () => {
//     setInputValue('');
//     inputRef.current.blur();
//     handleBlur();
//   };
//   const sortedShopData = shopData
//     .sort((a, b) => {
//       const ratingDiff = b.rating - a.rating;
//       const distanceA = parseFloat(a.distance);
//       const distanceB = parseFloat(b.distance);
//       const distanceDiff = distanceA - distanceB;
//       return ratingDiff || distanceDiff;
//     })
//     .slice(0, 3);
//   const sortedShopDataByDiscount = shopData
//     .filter(shop => shop.discount)
//     .sort((a, b) => parseInt(b.discount) - parseInt(a.discount))
//     .slice(0, 3);
//   const handleShopDetails = item => {
//     navigation.navigate('ShopDetails', {
//       ...item,
//     });
//   };
//   const handleSearch = text => {
//     setInputValue(text);
//     if (text.trim().length > 0) {
//       const filtered = shopData.filter(
//         shop =>
//           shop.name.toLowerCase().includes(text.toLowerCase()) ||
//           shop.serviceType.toLowerCase().includes(text.toLowerCase()),
//       );
//       setFilteredShops(filtered);
//     } else {
//       setFilteredShops([]);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingVertical: 24}}>
//         <View style={styles.header}>
//           <View style={styles.headerItem}>
//             <Image
//               source={pin}
//               style={{
//                 width: 13,
//                 height: 28,
//                 objectFit: 'contain',
//                 marginRight: 10,
//               }}
//             />

//             <Text
//               style={{
//                 color: '#1C1C28',
//                 fontSize: 16,
//                 fontFamily: 'SpaceGrotesk-Bold',
//               }}>
//               John Doe
//             </Text>
//             <DownIcon />
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//             <Image
//               source={require('../../assets/images/profile.png')}
//               style={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: 32,
//                 objectFit: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchContainer}>
//           {!isFocused && (
//             <TouchableOpacity>
//               <SearchIcon Color="#6440FE" />
//             </TouchableOpacity>
//           )}

//           <TextInput
//             ref={inputRef}
//             style={styles.input}
//             placeholderTextColor="#8F90A6"
//             placeholder="Shop name or service"
//             value={inputValue}
//             onChangeText={handleSearch}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//           />
//           {isFocused && (
//             <TouchableOpacity
//               onPress={handleClearInput}
//               style={styles.closeIconContainer}>
//               <CloseIcon color="#8F90A6" />
//             </TouchableOpacity>
//           )}
//         </View>
//         <View>
//           <View style={[styles.titleContainer, {marginTop: 0}]}>
//             <Text style={styles.title}>Services</Text>
//             <TouchableOpacity style={{flexDirection: 'row'}}>
//               <Text style={styles.subtitle}>See all</Text>
//               <RightIcon />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.servicesContainer}>
//             {services.map((item, index) => (
//               <TouchableOpacity
//                 onPress={() => handleServicePress(item)}
//                 key={index}
//                 style={styles.service}>
//                 <Image source={item.image} style={styles.servicesImage} />
//                 <Text style={styles.servicesText}>{item.title}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>Popular near you</Text>
//             <TouchableOpacity style={{flexDirection: 'row'}}>
//               <Text style={styles.subtitle}>See all</Text>
//               <RightIcon />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             horizontal
//             data={sortedShopData}
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={item => item.shopId}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 onPress={() => handleShopDetails(item)}
//                 style={{margin: 10, width: 290}}>
//                 <Image source={item.image} style={styles.listImage} />
//                 <Text style={styles.category}>{item.serviceFor}</Text>
//                 <Text style={styles.listTitle}>{item.name}</Text>
//                 <Text style={styles.subtext}>{item.overview}</Text>
//                 <View style={styles.row}>
//                   <Text style={styles.subtext}>{item.location}</Text>
//                   <View style={styles.dot} />
//                   <Text style={styles.subtext}>{item.distance} kms</Text>
//                   <View style={styles.dot} />
//                   <Text style={styles.subtext}>{item.priceRange}</Text>
//                   <View style={styles.dot} />
//                   <View style={[styles.row, {gap: 5}]}>
//                     <Star />
//                     <Text style={styles.subtext}>{item.rating}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>Best Offers</Text>
//             <TouchableOpacity style={{flexDirection: 'row'}}>
//               <Text style={styles.subtitle}>See all</Text>
//               <RightIcon />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             horizontal
//             data={sortedShopDataByDiscount}
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={item => item.shopId}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 onPress={() => handleShopDetails(item)}
//                 style={{margin: 10}}>
//                 <Image source={item.image} style={styles.listImage} />
//                 <View style={styles.discount}>
//                   <Image
//                     source={require('../../assets/images/discount.png')}
//                     style={styles.discountImg}
//                   />
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       fontFamily: 'SpaceGrotesk-Regular',
//                       color: '#6440FE',
//                     }}>
//                     {item.discount} % off
//                   </Text>
//                 </View>
//                 <Text style={styles.category}>{item.serviceFor}</Text>
//                 <Text style={styles.listTitle}>{item.name}</Text>
//                 <Text style={styles.subtext}>{item.overview}</Text>
//                 <View style={styles.row}>
//                   <Text style={styles.subtext}>{item.location}</Text>
//                   <View style={styles.dot} />
//                   <Text style={styles.subtext}>{item.distance} kms</Text>
//                   <View style={styles.dot} />
//                   <Text style={styles.subtext}>{item.priceRange}</Text>
//                   <View style={styles.dot} />
//                   <View style={[styles.row, {gap: 5}]}>
//                     <Star />
//                     <Text style={styles.subtext}>{item.rating}</Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </ScrollView>

//       {filteredShops.length > 0 ? (
//         <FlatList
//           data={filteredShops}
//           keyExtractor={item => item.shopId}
//           renderItem={({item}) => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('ShopDetails', {...item})}>
//               <Image
//                 source={item.image}
//                 style={[
//                   styles.listImage,
//                   {height: '100%', backgroundColor: 'red'},
//                 ]}
//               />
//               <View style={styles.discount}>
//                 <Image
//                   source={require('../../assets/images/discount.png')}
//                   style={styles.discountImg}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontFamily: 'SpaceGrotesk-Regular',
//                     color: '#6440FE',
//                   }}>
//                   {item.discount} % off
//                 </Text>
//               </View>
//               <Text style={styles.category}>{item.serviceFor}</Text>
//               <Text style={styles.listTitle}>{item.name}</Text>
//               <Text style={styles.subtext}>{item.overview}</Text>
//               <View style={styles.row}>
//                 <Text style={styles.subtext}>{item.location}</Text>
//                 <View style={styles.dot} />
//                 <Text style={styles.subtext}>{item.distance} kms</Text>
//                 <View style={styles.dot} />
//                 <Text style={styles.subtext}>{item.priceRange}</Text>
//                 <View style={styles.dot} />
//                 <View style={[styles.row, {gap: 5}]}>
//                   <Star />
//                   <Text style={styles.subtext}>{item.rating}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           )}
//           contentContainerStyle={{paddingVertical: 10}}
//         />
//       ) : (
//         <View>
//           {inputValue.length > 0 && (
//             <Text style={styles.noResultText}>
//               No results found for "{inputValue}"
//             </Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingHorizontal: 24,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   headerItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   searchContainer: {
//     marginVertical: 16,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     backgroundColor: '#fff',
//     borderRadius: 40,
//     borderWidth: 1,
//     borderColor: '#8F90A640',
//   },
//   input: {
//     flex: 1,
//     color: '#8F90A6',
//     fontSize: 15,
//   },
//   closeIconContainer: {
//     padding: 3,
//     marginLeft: 10,
//     backgroundColor: '#8F90A620',
//     borderRadius: 20,
//   },

//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//     marginTop: 20,
//   },
//   title: {
//     color: '#1C1C28',
//     fontSize: 20,
//     fontFamily: 'SpaceGrotesk-Bold',
//   },
//   subtitle: {
//     color: '#6440FE',
//     fontSize: 14,
//     fontFamily: 'SpaceGrotesk-Bold',
//   },
//   servicesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     columnGap: 20,
//     rowGap: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   service: {
//     width: '42%',
//     height: 150,
//     borderRadius: 8,
//     overflow: 'hidden',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginHorizontal: '1%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   servicesImage: {
//     width: 70,
//     height: 70,
//     objectFit: 'contain',
//     // borderRadius: 100,
//   },
//   servicesText: {
//     fontSize: 13,
//     fontFamily: 'SpaceGrotesk-Bold',
//     color: '#1C1C28',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   listImage: {
//     width: 290,
//     height: 160,
//     borderRadius: 12,
//     objectFit: 'cover',
//     marginBottom: 5,
//   },
//   category: {
//     fontSize: 12,
//     fontFamily: 'SpaceGrotesk-Bold',
//     color: '#8F90A6',
//   },
//   listTitle: {
//     fontSize: 19,
//     fontFamily: 'SpaceGrotesk-Bold',
//     color: '#1C1C28',
//   },
//   subtext: {
//     fontSize: 13,
//     fontFamily: 'SpaceGrotesk-Regular',
//     color: '#8F90A6',
//     paddingVertical: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   dot: {width: 5, height: 5, borderRadius: 5, backgroundColor: '#8F90A6'},
//   discount: {
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     position: 'absolute',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     top: 125,
//     left: 8,
//   },
//   discountImg: {
//     width: 20,
//     height: 20,
//   },
// });

// export default Home;

import React, {useRef, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CloseIcon,
  DownIcon,
  RightIcon,
  SearchIcon,
  Star,
} from '../../assets/Icon/IconName';

import shopData from '../../constants/shopData';
import {useNavigation} from '@react-navigation/native';
import menBeauty from '../../assets/imageIcons/barbershop.png';
import womenBeauty from '../../assets/imageIcons/beauty.png';
import bike from '../../assets/imageIcons/motorcycle.png';
import carmechanic from '../../assets/imageIcons/mechanic.png';
import electrician from '../../assets/imageIcons/electrician.png';
import ac from '../../assets/imageIcons/airconditioner.png';
import plumber from '../../assets/imageIcons/wrenchtool.png';
import carpenter from '../../assets/imageIcons/carpenter.png';
import pin from '../../assets/images/pin.png';
import {useSelector} from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const {username, profileImage} = useSelector(state => state.profile);
  const services = [
    {
      title: 'Women Beauty',
      image: womenBeauty,
    },
    {
      title: 'Men Beauty',
      image: menBeauty,
    },
    {
      title: 'Bike Mechanic',
      image: bike,
    },
    {
      title: 'Car Mechanic',
      image: carmechanic,
    },
    {title: 'Electrician', image: electrician},
    {title: 'AC & Refrigerator', image: ac},
    {title: 'Carpenter', image: carpenter},
    {title: 'Plumber', image: plumber},
  ];

  const handleServicePress = service => {
    const filteredShops = shopData.filter(
      shop =>
        shop.serviceType.trim().toLowerCase() ===
        service.title.trim().toLowerCase(),
    );
    navigation.navigate('ServiceDetail', {
      title: service.title,
      image: service.image,
      shops: filteredShops,
    });
  };

  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleClearInput = () => {
    setInputValue('');
    inputRef.current.blur();
    handleBlur();
  };
  const sortedShopData = shopData
    .sort((a, b) => {
      const ratingDiff = b.rating - a.rating;
      const distanceA = parseFloat(a.distance);
      const distanceB = parseFloat(b.distance);
      const distanceDiff = distanceA - distanceB;
      return ratingDiff || distanceDiff;
    })
    .slice(0, 3);
  const sortedShopDataByDiscount = shopData
    .filter(shop => shop.discount)
    .sort((a, b) => parseInt(b.discount) - parseInt(a.discount))
    .slice(0, 3);
  const handleShopDetails = item => {
    navigation.navigate('ShopDetails', {
      ...item,
    });
  };
  const handleSearch = text => {
    setInputValue(text);
    if (text.trim().length > 0) {
      const filtered = shopData.filter(
        shop =>
          shop.name.toLowerCase().includes(text.toLowerCase()) ||
          shop.serviceType.toLowerCase().includes(text.toLowerCase()) ||
          shop.overview.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredShops(filtered);
    } else {
      setFilteredShops([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {!isFocused && (
        <View style={styles.header}>
          <View style={styles.headerItem}>
            <Image
              source={pin}
              style={{
                width: 13,
                height: 28,
                objectFit: 'contain',
                marginRight: 10,
              }}
            />

            <Text
              style={{
                color: '#1C1C28',
                fontSize: 16,
                fontFamily: 'SpaceGrotesk-Bold',
              }}>
              {username}
            </Text>
            <DownIcon />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{uri: profileImage}}
              // source={require('../../assets/images/profile.png')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                objectFit: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        {!isFocused && (
          <TouchableOpacity>
            <SearchIcon Color="#6440FE" />
          </TouchableOpacity>
        )}

        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor="#8F90A6"
          placeholder="Shop name or service"
          value={inputValue}
          onChangeText={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && (
          <TouchableOpacity
            onPress={handleClearInput}
            style={styles.closeIconContainer}>
            <CloseIcon color="#8F90A6" />
          </TouchableOpacity>
        )}
      </View>

      {/* Conditional Rendering */}
      {inputValue.length > 0 ? (
        <View>
          {filteredShops.length > 0 ? (
            <FlatList
              data={filteredShops}
              keyExtractor={item => item.shopId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ShopDetails', {...item})}
                  style={styles.filteredShopContainer}>
                  <Image source={item.image} style={styles.filteredListImage} />
                  {item.discount > 0 && (
                    <View style={styles.discount}>
                      <Image
                        source={require('../../assets/images/discount.png')}
                        style={styles.discountImg}
                      />
                      <Text style={styles.discountText}>
                        {item.discount} % off
                      </Text>
                    </View>
                  )}
                  <Text style={styles.category}>{item.serviceFor}</Text>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.subtext}>{item.overview}</Text>
                  <View style={styles.row}>
                    <Text style={styles.subtext}>{item.location}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.distance} kms</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.priceRange}</Text>
                    <View style={styles.dot} />
                    <View style={[styles.row, {gap: 5}]}>
                      <Star />
                      <Text style={styles.subtext}>{item.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={{paddingVertical: 10}}
            />
          ) : (
            <View>
              {inputValue.length > 0 && (
                <Text style={styles.noResultText}>
                  No results found for "{inputValue}"
                </Text>
              )}
            </View>
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 24}}>
          <View>
            {/* Other sections (Services, Popular, Offers) */}
            <View style={[styles.titleContainer, {marginTop: 0}]}>
              <Text style={styles.title}>Services</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle}>See all</Text>
                <RightIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.servicesContainer}>
              {services.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handleServicePress(item)}
                  key={index}
                  style={styles.service}>
                  <Image source={item.image} style={styles.servicesImage} />
                  <Text style={styles.servicesText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Popular near you</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle}>See all</Text>
                <RightIcon />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={sortedShopData}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.shopId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleShopDetails(item)}
                  style={{margin: 10, width: 290}}>
                  <Image source={item.image} style={styles.listImage} />
                  <Text style={styles.category}>{item.serviceFor}</Text>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.subtext}>{item.overview}</Text>
                  <View style={styles.row}>
                    <Text style={styles.subtext}>{item.location}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.distance} kms</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.priceRange}</Text>
                    <View style={styles.dot} />
                    <View style={[styles.row, {gap: 5}]}>
                      <Star />
                      <Text style={styles.subtext}>{item.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Best Offers</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text style={styles.subtitle}>See all</Text>
                <RightIcon />
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={sortedShopDataByDiscount}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.shopId}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleShopDetails(item)}
                  style={{margin: 10}}>
                  <Image source={item.image} style={styles.listImage} />
                  <View style={styles.discount}>
                    <Image
                      source={require('../../assets/images/discount.png')}
                      style={styles.discountImg}
                    />
                    <Text style={styles.discountText}>
                      {item.discount} % off
                    </Text>
                  </View>
                  <Text style={styles.category}>{item.serviceFor}</Text>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.subtext}>{item.overview}</Text>
                  <View style={styles.row}>
                    <Text style={styles.subtext}>{item.location}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.distance} kms</Text>
                    <View style={styles.dot} />
                    <Text style={styles.subtext}>{item.priceRange}</Text>
                    <View style={styles.dot} />
                    <View style={[styles.row, {gap: 5}]}>
                      <Star />
                      <Text style={styles.subtext}>{item.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#8F90A640',
  },
  input: {
    flex: 1,
    color: '#8F90A6',
    fontSize: 15,
  },
  closeIconContainer: {
    padding: 3,
    marginLeft: 10,
    backgroundColor: '#8F90A620',
    borderRadius: 20,
  },
  filteredShopContainer: {
    margin: 10,
    width: '100%',
    // backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  filteredListImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    objectFit: 'cover',
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    color: '#1C1C28',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  subtitle: {
    color: '#6440FE',
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Bold',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 20,
    rowGap: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  service: {
    width: '42%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: '1%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  servicesImage: {
    width: 70,
    height: 70,
    objectFit: 'contain',
    // borderRadius: 100,
  },
  servicesText: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1C1C28',
    marginTop: 5,
    textAlign: 'center',
  },
  listImage: {
    width: 290,
    height: 160,
    borderRadius: 12,
    objectFit: 'cover',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#8F90A6',
  },
  listTitle: {
    fontSize: 19,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1C1C28',
  },
  subtext: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#8F90A6',
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {width: 5, height: 5, borderRadius: 5, backgroundColor: '#8F90A6'},
  discount: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    top: 125,
    left: 8,
  },
  discountText: {
    fontSize: 13,
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#6440FE',
  },
  discountImg: {
    width: 20,
    height: 20,
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 16,
    color: '#8F90A6',
  },
});

export default Home;
