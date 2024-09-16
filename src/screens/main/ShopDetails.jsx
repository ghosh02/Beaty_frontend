// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {addService, removeService} from '../../store/selectedServicesSlice'; // Import Redux actions
// import BackBtn from '../../components/BackBtn';
// import {Plus} from '../../assets/Icon/IconName';

// const ShopDetails = ({route}) => {
//   const {
//     name,
//     services,
//     image,
//     location,
//     distance,
//     overview,
//     priceRange,
//     rating,
//     serviceFor,
//   } = route.params;
//   const dispatch = useDispatch();
//   const selectedServices = useSelector(
//     state => state.selectedServices.selectedServices,
//   );

//   const isSelected = serviceName => {
//     return selectedServices.some(service => service.name === serviceName);
//   };

//   const handleSelectService = service => {
//     if (isSelected(service.name)) {
//       dispatch(removeService(service)); // Deselect the service
//     } else {
//       dispatch(addService(service)); // Select the service
//     }
//   };

//   const renderServiceItem = ({item}) => (
//     <View style={styles.serviceItem}>
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           alignItems: 'flex-start',
//           gap: 15,
//         }}>
//         <Image source={item.img} style={styles.serviceImg} />
//         <View>
//           <Text style={styles.serviceName}>{item.name}</Text>
//           <Text style={styles.serviceDetails}>{item.price}</Text>
//           <Text style={styles.serviceDetails}>{item.duration}</Text>
//         </View>
//       </View>
//       <TouchableOpacity
//         style={[
//           styles.selectButton,
//           isSelected(item.name) ? styles.selectedButton : {},
//         ]}
//         onPress={() => handleSelectService(item)}>
//         <Text
//           style={[
//             styles.selectButtonText,
//             isSelected(item.name) ? styles.selectedButtonText : {},
//           ]}>
//           {isSelected(item.name) ? 'Selected' : 'Select'}
//         </Text>
//         {isSelected(item.name) ? '' : <Plus />}
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* <ScrollView> */}
//       <Image source={image} style={styles.image} />
//       <BackBtn />
//       <View style={styles.shopData}>
//         <Text style={styles.serviceFor}>{serviceFor}</Text>
//         <Text style={styles.shopName}>{name}</Text>
//         <View style={styles.row}>
//           <Text style={styles.subtext}>{location}</Text>
//           <View style={styles.dot} />
//           <Text style={styles.subtext}>{distance}</Text>
//           <View style={styles.dot} />
//           <Text style={styles.subtext}>{priceRange}</Text>
//         </View>
//       </View>
//       <View style={{paddingHorizontal: 24}}>
//         <Text style={styles.sectionTitle}>
//           Recommended ({services.recommended.length})
//         </Text>
//         <FlatList
//           data={services.recommended}
//           renderItem={renderServiceItem}
//           keyExtractor={(item, index) => index.toString()}
//           style={{marginBottom: 20}}
//         />

//         {/* Packages */}
//         {/* <Text style={styles.sectionTitle}>Packages</Text>
//       <FlatList
//         data={services.packages}
//         renderItem={renderServiceItem}
//         keyExtractor={(item, index) => index.toString()}
//       /> */}

//         {/* Cart view */}
//         {selectedServices.length > 0 && (
//           <View style={styles.cart}>
//             <Text style={styles.cartText}>
//               {selectedServices.length} services selected
//             </Text>
//             <TouchableOpacity style={styles.continueButton}>
//               <Text style={styles.continueButtonText}>Continue</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         {/* </ScrollView> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   image: {width: '100%', height: 200, marginBottom: 20},
//   shopName: {fontSize: 24, fontWeight: 'bold', color: '#fff'},
//   serviceFor: {
//     fontSize: 10,
//     textTransform: 'uppercase',
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtext: {color: '#fff', fontSize: 14},
//   row: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10},
//   dot: {width: 5, height: 5, borderRadius: 5, backgroundColor: '#fff'},
//   sectionTitle: {fontSize: 20, fontWeight: 'bold', marginTop: 20},
//   shopData: {
//     position: 'absolute',
//     top: 115,
//     left: 24,
//   },
//   serviceItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//     padding: 10,
//   },
//   serviceName: {
//     fontSize: 16,
//     color: '#1C1C28',
//     fontFamily: 'SpaceGrotesk-Bold',
//   },
//   serviceDetails: {fontSize: 14, color: '#666'},
//   selectButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#6440FE',
//   },
//   serviceImg: {
//     width: 75,
//     height: 75,
//     borderRadius: 8,
//     objectFit: 'cover',
//   },
//   selectedButton: {backgroundColor: '#6440FE'}, // Change color when selected
//   selectButtonText: {color: '#6440FE', fontFamily: 'SpaceGrotesk-Regular'},
//   selectedButtonText: {color: '#fff', fontFamily: 'SpaceGrotesk-Regular'},
//   cart: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 20,
//     backgroundColor: '#6440FE',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cartText: {color: '#fff', fontSize: 16},
//   continueButton: {backgroundColor: 'red', padding: 10, borderRadius: 5},
//   continueButtonText: {color: '#6440FE', fontWeight: 'bold'},
// });

// export default ShopDetails;

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addService, removeService} from '../../store/selectedServicesSlice'; // Import Redux actions
import BackBtn from '../../components/BackBtn';
import {Call, Location, Plus, Share, Star} from '../../assets/Icon/IconName';

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
  } = route.params;

  const dispatch = useDispatch();
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
  console.log(services.recommended);
  // Check if a service is selected by its id
  const isSelected = serviceId => {
    return selectedServices.some(service => service.id === serviceId);
  };

  // Handle selecting or deselecting a service by its id
  const handleSelectService = service => {
    if (isSelected(service.id)) {
      dispatch(removeService(service));
    } else {
      dispatch(addService(service));
    }
  };
  const totalPrice = useSelector(state => state.selectedServices.totalPrice);
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

  return (
    <View style={styles.container}>
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
          <Text style={styles.subtext}>{distance}</Text>
          <View style={styles.dot} />
          <Text style={styles.subtext}>{priceRange}</Text>
        </View>
      </View>
      <View style={styles.contactContainer}>
        <View style={styles.contact}>
          <View style={styles.contactTextContainer}>
            <Call />
            <Text style={styles.contactTitle}>Call</Text>
          </View>
          <View style={styles.contactTextContainer}>
            <Location />
            <Text style={styles.contactTitle}>Directions</Text>
          </View>
          <View style={styles.contactTextContainer}>
            <Share />
            <Text style={styles.contactTitle}>Share</Text>
          </View>
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
          keyExtractor={(item, index) => item.id.toString()} // Use item.id as key
          style={{marginBottom: 20}}
        />

        {/* Cart view */}
        <View>
          {selectedServices.length > 0 && (
            <View style={styles.cart}>
              <View style={styles.cartPriceContainer}>
                <View style={styles.cartTextContainer}>
                  <Text style={styles.cartText}>{selectedServices.length}</Text>
                </View>
                <View>
                  <Text style={styles.cartText}>$ {totalPrice}</Text>
                  <Text style={{fontSize: 14, color: '#fff'}}>plus taxes</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
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
