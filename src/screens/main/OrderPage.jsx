import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectPastOrders,
  selectUpcomingOrders,
  selectFavoriteOrders,
  updateOrderStatus,
  reorder,
  toggleFavorite,
} from '../../store/ordersSlice';
import {Heart, Heartfill} from '../../assets/Icon/IconName';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';

const OrderPage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const dispatch = useDispatch();

  // Select orders from Redux store
  const pastOrders = useSelector(selectPastOrders);
  const upcomingOrders = useSelector(selectUpcomingOrders);
  const favoriteOrders = useSelector(selectFavoriteOrders);

  // Handle Cancel Order
  const handleCancelOrder = orderId => {
    dispatch(updateOrderStatus({orderId, newStatus: 'cancelled'}));
  };

  // Handle Reschedule Order
  const handleRescheduleOrder = orderId => {
    console.log('Order Item:', orderId);
    alert('Reschedule functionality not implemented.');
  };

  // Handle Reorder
  const handleReorder = orderId => {
    dispatch(reorder({orderId}));
    alert('Order has been reordered.');
  };
  const handleToggleFavorite = orderId => {
    console.log(orderId);
    dispatch(toggleFavorite({orderId}));
  };
  // Function to render each order item
  const renderOrderItem = ({item}) => (
    <View style={styles.orderItemContainer}>
      <View style={styles.orderItem}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetails', {
              orderId: item.id,
              coupon: item.couponCode,
              discount: item.discount,
            })
          }
          style={styles.orderInfo}>
          <Text style={styles.orderTitle}>{item.shopDetails.name}</Text>
          <View style={styles.orderLocation}>
            <Text style={styles.orderSubTitle}>
              {item.shopDetails.location}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.orderSubTitle}>
              {item.shopDetails.distance} kms
            </Text>
          </View>

          <Text style={styles.orderSubTitle}>
            {item.services
              .map(service => `${service.name} x${service.quantity}`)
              .join(' + ')}
          </Text>
          <View style={styles.orderLocation}>
            <Text style={styles.orderDetails}>{item.date}</Text>
            {/* <Text style={styles.orderDetails}>{item.couponCode}</Text> */}
            <View style={styles.dot} />
            <Text style={styles.orderDetails}>$ {item.totalPrice}</Text>
          </View>

          <Text
            style={[
              styles.orderStatus,
              item.status === 'pending'
                ? styles.pendingStatus
                : item.status === 'cancelled'
                ? styles.cancelledStatus
                : item.status === 'delivered'
                ? styles.deliveredStatus
                : {},
            ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleToggleFavorite(item.id)}>
          {item.isFavorite ? <Heart /> : <Heartfill />}
          <Text
            style={{
              color: item.isFavorite ? '#1C1C28' : '#6440FE',
              fontSize: 10,
            }}>
            {item.isFavorite ? 'Remove' : 'Favorite'}
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'upcoming' && (
        <View style={styles.orderActions}>
          <TouchableOpacity onPress={() => handleCancelOrder(item.id)}>
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => handleRescheduleOrder(item.id)}>
            <Text style={styles.actionButtonText}>Reschedule Booking</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab === 'past' && (
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={[styles.actionButton, styles.reorderButton]}
            onPress={() => handleReorder(item.id)}>
            <Text style={styles.actionButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab === 'favorites' && (
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={[styles.actionButton, styles.reorderButton]}
            onPress={() => handleReorder(item.id)}>
            <Text style={styles.actionButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // Get the data to be displayed based on the active tab
  const getTabData = () => {
    switch (activeTab) {
      case 'past':
        return pastOrders;
      case 'upcoming':
        return upcomingOrders;
      case 'favorites':
        return favoriteOrders;
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton color="#000" />
        <Text style={styles.header}>Your Bookings</Text>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}>
            Past
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('upcoming')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.activeTabText,
            ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'favorites' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('favorites')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'favorites' && styles.activeTabText,
            ]}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={getTabData()}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        style={styles.orderList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No orders found.</Text>
        }
      />
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#C7C9D9',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6440FE',
  },
  tabText: {
    fontSize: 16,
    color: '#1C1C28',
  },
  activeTabText: {
    color: '#6440FE',
    fontWeight: 'bold',
  },
  orderList: {
    flex: 1,
  },
  orderItemContainer: {
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C7C9D9',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1C1C28',
  },
  orderSubTitle: {
    fontSize: 13,
    color: '#8F90A6',
    paddingBottom: 4,
  },
  orderDetails: {
    fontSize: 15,
    color: '#8F90A6',
    marginBottom: 4,
  },

  orderActions: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#E53535',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6440FE',
  },

  rescheduleButton: {
    borderWidth: 1,
    borderColor: '#6440FE',
  },
  reorderButton: {
    borderWidth: 1,
    borderColor: '#6440FE',
  },
  emptyMessage: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#6e6e6e',
  },
  favoriteButton: {
    alignItems: 'center',
    gap: 5,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  pendingStatus: {
    color: '#FBBB03',
  },
  cancelledStatus: {
    color: '#E53535',
  },
  deliveredStatus: {
    color: '#4CAF50',
  },
});

export default OrderPage;
