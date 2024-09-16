import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DownIcon, Star} from '../../assets/Icon/IconName';
import BackBtn from '../../components/BackBtn';
import {useNavigation} from '@react-navigation/native';

const ServiceDetail = ({route}) => {
  const navigation = useNavigation();
  const {title, image, shops} = route.params;

  const handleShopDetails = item => {
    navigation.navigate('ShopDetails', {
      ...item,
    });
  };
  return (
    <View style={styles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        <View style={styles.overlay} />
      </View>
      <BackBtn />
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Gender</Text>
          <DownIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Price</Text>
          <DownIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Offers</Text>
          <DownIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Rating</Text>
          <DownIcon />
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shops}
        contentContainerStyle={{paddingHorizontal: 24}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{marginVertical: 20}}
            onPress={() => handleShopDetails(item)}>
            <Image source={item.image} style={styles.listImage} />
            <Text style={styles.category}>{item.serviceFor}</Text>
            <Text style={styles.listTitle}>{item.name}</Text>
            <View style={styles.row}>
              <Text style={styles.subtext}>{item.overview}</Text>
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
          </TouchableOpacity>
        )}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 236,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  title: {
    fontSize: 40,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 20,
    position: 'absolute',
    top: 80,
    color: '#fff',
    paddingHorizontal: 24,
  },
  filterContainer: {
    height: 60,
  },
  filterButton: {
    flexDirection: 'row',
    height: 40,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginVertical: 10,
    borderRadius: 60,
    marginRight: 17,
    backgroundColor: '#F2F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1C1C28',
  },
  shopContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
  },
  shopImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  serviceContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#6440FE',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shopDetails: {
    fontSize: 14,
    color: '#888',
    marginRight: 5,
  },
  listImage: {
    width: '100%',
    height: 183,
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
});

export default ServiceDetail;
