import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  reorder,
  toggleFavorite,
  selectAllOrders,
} from '../../store/ordersSlice';
import {
  Heart,
  Heartfill,
  CloseIcon,
  Calendar,
  Shop,
} from '../../assets/Icon/IconName';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {orderId, coupon} = route.params;
  const allOrders = useSelector(selectAllOrders);
  console.log('couponcode:', coupon);
  const order = allOrders.find(order => order.id === orderId);

  // Handle Reorder
  const handleReorder = () => {
    dispatch(reorder({orderId: order.id}));
    alert('Order has been reordered.');
  };

  // Toggle Favorite
  const handleToggleFavorite = orderId => {
    console.log(orderId);
    dispatch(toggleFavorite({orderId}));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>Order Details</Text>
      </View>

      {/* Shop Details */}
      <View style={styles.shopContainer}>
        <Text style={styles.shopName}>{order.shopDetails.name}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(order.id)}>
          {order.isFavorite ? <Heart /> : <Heartfill />}
          <Text
            style={{
              color: order.isFavorite ? '#1C1C28' : '#6440FE',
              fontSize: 10,
              textAlign: 'center',
            }}>
            {order.isFavorite ? 'Remove' : 'Favorite'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order Information */}
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Shop />
          <Text style={styles.sectionText}>Shop Service</Text>
        </View>
        <View style={styles.row}>
          <Calendar />
          <Text style={styles.sectionText}>
            {order.date} at {order.time}
          </Text>
        </View>
      </View>

      {/* Services List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={order.services}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.serviceItem}>
            <View style={{flex: 1}}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.row}>
                <View style={styles.quantity}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                </View>
                <Text style={styles.serviceDetails}> x ${item.price}</Text>
              </View>
            </View>
            <Text style={styles.servicePrice}>
              ${item.quantity * item.price}
            </Text>
          </View>
        )}
      />

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <View style={styles.orderContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Total</Text>
            <Text style={styles.summaryValue}>
              $ {order.totalPrice + (order.discount || 0)}
            </Text>
          </View>
          {order.couponCode && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Coupon Discount ({order.couponCode})
              </Text>
              <Text style={[styles.summaryValue, styles.discount]}>
                -$ {order.discount}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.grandTotal}>Grand Total</Text>
          <Text style={[styles.grandTotal]}>$ {order.totalPrice}</Text>
        </View>
      </View>

      {/* Reorder Button */}
      <TouchableOpacity style={styles.reorderButton} onPress={handleReorder}>
        <Text style={styles.reorderButtonText}>Reorder Booking</Text>
      </TouchableOpacity>
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
  shopContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shopName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1C1C28',
  },

  favoriteButton: {
    alignItems: 'center',
    gap: 5,
  },

  sectionContainer: {
    marginBottom: 20,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C28',
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C28',
    marginBottom: 5,
  },
  serviceDetails: {
    fontSize: 15,
    color: '#1C1C28',
  },
  servicePrice: {
    fontSize: 16,
    color: '#1C1C28',
  },
  quantity: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#05A660',
    backgroundColor: '#E3FFF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 12,
    color: '#05A660',
    fontWeight: 'bold',
  },
  orderSummary: {
    paddingVertical: 15,

    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#1C1C28',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1C1C28',
    paddingBottom: 5,
  },
  discount: {
    color: '#05A660',
  },
  orderContainer: {
    borderBottomWidth: 1,
    borderColor: '#C7C9D9',
    borderStyle: 'dashed',
  },
  grandTotal: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1C1C28',
    paddingTop: 10,
  },
  reorderButton: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#6440FE',
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderDetails;
