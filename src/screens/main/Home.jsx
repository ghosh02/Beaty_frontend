import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
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

const Home = () => {
  const navigation = useNavigation();
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

  const salonsData = [
    {
      id: 1,
      category: 'For Men & Women',
      title: 'Woodlands Hills Salon',
      services: 'Haircut, Spa, Massage',
      rating: 4.1,
      location: 'Keira throughway',
      distance: '5.0 Kms',
      priceRange: '$$',
      image: womenBeauty,
    },
    {
      id: 2,
      category: 'For Men & Women',
      title: 'Another Salon Name',
      services: 'Haircut, Spa',
      rating: 4.3,
      location: 'Another location',
      distance: '6.5 Kms',
      priceRange: '$$',
      image: womenBeauty,
    },
    {
      id: 3,
      category: 'For Men & Women',
      title: 'Another Salon Name',
      services: 'Haircut, Spa',
      rating: 4.3,
      location: 'Another location',
      distance: '6.5 Kms',
      priceRange: '$$',
      image: womenBeauty,
    },
  ];

  const bestOffersData = [
    {
      id: 1,
      discount: '50% Off',
      title: 'Mournrich Spa Services',
      category: 'For Women',
      services: 'Spa Salon',
      rating: 4.1,
      location: 'Woodland Hills',
      distance: '5.0 Kms',
      priceRange: '$$',
      image: womenBeauty,
    },
    {
      id: 2,
      discount: '30% Off',
      title: 'Luxury Spa',
      category: 'For Women',
      services: 'Massage, Facial',
      rating: 4.5,
      location: 'Downtown Area',
      distance: '3.8 Kms',
      priceRange: '$$$',
      image: plumber,
    },
    {
      id: 3,
      discount: '30% Off',
      title: 'Luxury Spa',
      category: 'For Women',
      services: 'Massage, Facial',
      rating: 4.5,
      location: 'Downtown Area',
      distance: '3.8 Kms',
      priceRange: '$$$',
      image: plumber,
    },
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
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 24}}>
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
              Sudip Ghosh
            </Text>
            <DownIcon />
          </View>
          <Image
            source={require('../../assets/images/profile.png')}
            style={{
              width: 32,
              height: 32,
              borderRadius: 32,
              objectFit: 'contain',
            }}
          />
        </View>

        <TouchableOpacity
          //   onPress={() => {
          //     navigation.navigate('Search');
          //   }}
          style={styles.searchContainer}>
          <SearchIcon Color="#6440FE" />
          <Text
            style={{
              color: '#8F90A6',
              fontSize: 15,
              fontFamily: 'SpaceGrotesk-Regular',
            }}>
            Shop name or service
          </Text>
        </TouchableOpacity>
        <View>
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
            data={salonsData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{margin: 10}}>
                <Image source={item.image} style={styles.listImage} />
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.listTitle}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.subtext}>{item.services}</Text>
                  <View style={styles.dot} />
                  <View style={[styles.row, {gap: 5}]}>
                    <Star />
                    <Text style={styles.subtext}>{item.rating}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.subtext}>{item.location}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.subtext}>{item.distance}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.subtext}>{item.priceRange}</Text>
                </View>
              </View>
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
            data={bestOffersData}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{margin: 10}}>
                <Image source={item.image} style={styles.listImage} />
                <View style={styles.discount}>
                  <Image
                    source={require('../../assets/images/discount.png')}
                    style={styles.discountImg}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'SpaceGrotesk-Regular',
                      color: '#6440FE',
                    }}>
                    {item.discount}
                  </Text>
                </View>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.listTitle}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.subtext}>{item.services}</Text>
                  <View style={styles.dot} />
                  <View style={[styles.row, {gap: 5}]}>
                    <Star />
                    <Text style={styles.subtext}>{item.rating}</Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.subtext}>{item.location}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.subtext}>{item.distance}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.subtext}>{item.priceRange}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
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
    // backgroundColor: 'skyblue',
  },
  service: {
    width: '45%',
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
  discountImg: {
    width: 20,
    height: 20,
  },
});

export default Home;
