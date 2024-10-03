import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addService, removeService} from '../../store/selectedServicesSlice';
import BackBtn from '../../components/BackBtn';
import {Call, Location, Plus, Share, Star} from '../../assets/Icon/IconName';
import {useNavigation} from '@react-navigation/native';
import TotalAmount from '../../components/TotalAmount';
import ShareModule from 'react-native-share';

const ShopDetails = ({route}) => {
  const {
    name,
    services,
    image,
    location,
    distance,
    priceRange,
    rating,
    serviceFor,
    shopId,
    phoneNumber,
    googleMapsUrl,
  } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedServices = useSelector(
    state => state.selectedServices.selectedServices,
  );

  // State for active tab
  const [activeFilter, setActiveFilter] = useState('recommended');

  // Filters array
  const serviceFilters = [
    {key: 'recommended', label: 'Recommended', data: services.recommended},
    {key: 'packages', label: 'Packages', data: services.packages},
    {key: 'offers', label: 'Offers', data: services.offers || []},
    {key: 'combos', label: 'Combos', data: services.combos || []},
  ];

  const isSelected = serviceId => {
    return selectedServices.some(service => service.id === serviceId);
  };

  const handleSelectService = service => {
    const serviceWithShopIdAndDetails = {
      ...service,
      shopId,
      shopDetails: {
        name,
        location,
        distance,
        priceRange,
        rating,
        serviceFor,
      }, // Include the entire shop details here
    };

    if (isSelected(service.id)) {
      dispatch(removeService(serviceWithShopIdAndDetails)); // Pass the updated service object
    } else {
      dispatch(addService(serviceWithShopIdAndDetails)); // Pass the updated service object
    }
  };

  const totalPrice = useSelector(state => state.selectedServices.totalPrice);
  // Function to open Google Maps
  const handleDirections = () => {
    if (googleMapsUrl) {
      Linking.openURL(googleMapsUrl).catch(err =>
        console.error('Error opening Google Maps:', err),
      );
    } else {
      alert('Google Maps URL is not available.');
    }
  };
  //handle call
  const handleCall = () => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`).catch(err =>
        console.error('Error making the call:', err),
      );
    } else {
      alert('Phone number is not available.');
    }
  };
  //handle share
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Check out this shop!',
        message: `Check out ${name} located at ${location}. Rated ${rating} stars!`,
        // url: image.https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg,
      };
      await ShareModule.open(shareOptions);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const renderServiceItem = ({item}) => (
    <View style={styles.serviceItem}>
      <View
        style={{
          flex: 1,

          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 15,
        }}>
        <Image source={item.img} style={styles.serviceImg} />
        <View style={{width: '60%'}}>
          <Text style={[styles.serviceName]}>{item.name}</Text>
          <Text style={styles.serviceDetails}>$ {item.price}</Text>
          <Text style={styles.serviceDetails}>{item.duration}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.selectButton,
          isSelected(item.id) ? styles.selectedButton : {},
        ]}
        onPress={() => handleSelectService(item)}>
        <Text
          style={[
            styles.selectButtonText,
            isSelected(item.id) ? styles.selectedButtonText : {},
          ]}>
          {isSelected(item.id) ? 'Selected' : 'Select'}
        </Text>
        {isSelected(item.id) ? '' : <Plus />}
      </TouchableOpacity>
    </View>
  );

  // Get services based on active filter
  const currentServices =
    serviceFilters.find(filter => filter.key === activeFilter)?.data || [];
  const handleContinue = () => {
    navigation.navigate('Checkout', {
      name,
      services,
      image,
      location,
      distance,
      priceRange,
      rating,
      serviceFor,
      shopId,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />

        <View style={styles.overlay} />
      </View>
      <BackBtn />
      <View style={styles.shopData}>
        <Text style={styles.serviceFor}>{serviceFor}</Text>
        <Text style={styles.shopName}>{name}</Text>
        <View style={styles.row}>
          <Text style={styles.subtext}>{location}</Text>
          <View style={styles.dot} />
          <Text style={styles.subtext}>{distance} kms</Text>
          <View style={styles.dot} />
          <Text style={styles.subtext}>{priceRange}</Text>
        </View>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.contact}>
          <TouchableOpacity
            style={styles.contactTextContainer}
            onPress={handleCall}>
            <Call />
            <Text style={styles.contactTitle}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactTextContainer}
            onPress={handleDirections}>
            <Location />
            <Text style={styles.contactTitle}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactTextContainer}
            onPress={handleShare}>
            <Share />
            <Text style={styles.contactTitle}>Share</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.rating}>
            <Star color="#6440FE" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <Text
            style={{
              color: '#6440FE',
              marginTop: 3,
              fontSize: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            5k+ rating
          </Text>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {serviceFilters.map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                activeFilter === filter.key && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter(filter.key)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.key && styles.activeFilterText,
                ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text style={styles.sectionTitle}>
          {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} (
          {currentServices.length})
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={currentServices}
          renderItem={renderServiceItem}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={{
            paddingBottom: selectedServices.length > 0 ? 60 : 0,
          }}
        />

        {/* Cart view */}
        <View>
          {selectedServices.length > 0 && (
            <TotalAmount
              title="Continue"
              length={selectedServices.length}
              totalPrice={totalPrice}
              press={handleContinue}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
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
  shopName: {fontSize: 24, fontWeight: 'bold', color: '#fff'},
  serviceFor: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
  },
  subtext: {color: '#fff', fontSize: 14},
  row: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5},
  dot: {width: 5, height: 5, borderRadius: 5, backgroundColor: '#fff'},
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1C1C28',
  },
  shopData: {
    position: 'absolute',
    top: 150,
    left: 24,
  },
  serviceItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  serviceName: {
    fontSize: 16,
    color: '#1C1C28',
    fontWeight: 'bold',
    // fontFamily: 'SpaceGrotesk-Bold',
  },
  serviceDetails: {fontSize: 14, color: '#8F90A6'},
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 24,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  contactTitle: {
    fontSize: 12,
    color: '#1C1C28',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  contactTextContainer: {
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#6440FE',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: '#6440FE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  ratingText: {
    color: '#6440FE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6440FE',
  },
  serviceImg: {
    width: 75,
    height: 75,
    borderRadius: 8,
    objectFit: 'cover',
  },
  selectedButton: {backgroundColor: '#6440FE'},
  selectButtonText: {color: '#6440FE', fontFamily: 'SpaceGrotesk-Regular'},
  selectedButtonText: {color: '#fff', fontFamily: 'SpaceGrotesk-Regular'},
  cart: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#6440FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartTextContainer: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  cartText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  continueButtonText: {color: '#fff', fontWeight: 'bold'},
  filters: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    height: 50,
  },
  filterTab: {
    marginRight: 15,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#8F90A6',
    borderWidth: 1,
  },
  filterText: {fontSize: 14, color: '#8F90A6'},
  activeFilterTab: {backgroundColor: '#7B61FF10', borderColor: '#6440FE'},
  activeFilterText: {color: '#6440FE'},
  cartPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default ShopDetails;
