import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addService,
  decreaseServiceQuantity,
  applyCoupon,
  removeCoupon,
  increaseServiceQuantity,
} from '../../store/selectedServicesSlice';

import BackButton from '../../components/BackButton';
import {
  Calendar,
  Minus,
  Plus,
  RightIcon,
  Shop,
} from '../../assets/Icon/IconName';
import coupon from '../../assets/images/coupon.png';
import TotalAmount from '../../components/TotalAmount';
import {useNavigation} from '@react-navigation/native';

const CheckoutScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selectedServices, totalPrice, couponCode, discount} = useSelector(
    state => state.selectedServices,
  );

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const totalItemPrice = selectedServices.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const renderService = ({item}) => (
    <View style={styles.serviceItem}>
      <View>
        <Text style={{fontSize: 15, color: '#1C1C28', fontWeight: 'bold'}}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={{alignItems: 'flex-end', gap: 5}}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                decreaseServiceQuantity({id: item.id, price: item.price}),
              )
            }>
            <Minus />
          </TouchableOpacity>
          <Text style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                increaseServiceQuantity({id: item.id, price: item.price}),
              )
            }>
            <Plus />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>${item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{padding: 24}}>
          <View style={styles.headerContainer}>
            <BackButton color="#1C1C28" />
            <Text style={styles.header}>Checkout</Text>
          </View>
          <View
            style={[styles.headerContainer, {marginBottom: 24, marginTop: 32}]}>
            <Shop />
            <Text style={styles.shop}>Shop Service</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DateTime')}
            style={styles.dateContainer}>
            <View style={styles.headerContainer}>
              <Calendar />
              <Text style={styles.shop}>Select Date & Time</Text>
            </View>
            <RightIcon color="#1C1C28" />
          </TouchableOpacity>
          {selectedServices.map((item, index) => (
            <View key={index} style={styles.serviceItem}>
              <View>
                <Text
                  style={{fontSize: 15, color: '#1C1C28', fontWeight: 'bold'}}>
                  {item.name}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <View style={{alignItems: 'flex-end', gap: 5}}>
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(
                        decreaseServiceQuantity({
                          id: item.id,
                          price: item.price,
                        }),
                      )
                    }>
                    <Minus />
                  </TouchableOpacity>
                  <Text
                    style={{color: '#000', fontSize: 15, fontWeight: 'bold'}}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(
                        increaseServiceQuantity({
                          id: item.id,

                          price: item.price,
                        }),
                      )
                    }>
                    <Plus />
                  </TouchableOpacity>
                </View>
                <Text style={styles.price}>${item.price * item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.emptyView} />

        {/* Coupon Code Section */}
        {discount > 0 ? (
          <View style={styles.couponApplied}>
            <View style={styles.couponContainer}>
              <Image source={coupon} style={styles.couponImage} />
              <View>
                <Text style={styles.couponText}>
                  Code {couponCode} Applied!
                </Text>
                <Text style={styles.couponTitle}>
                  Coupon Applied Successfully
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleRemoveCoupon}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.couponApplied}>
            <Text style={{color: '#1C1C28', fontSize: 16}}>
              No coupon code added
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddCoupon')}>
              <Text style={styles.addCoupon}>Add now</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.emptyView} />
        <View style={styles.priceContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.priceText}>Item Total</Text>
            <Text style={styles.priceText}>$ {totalItemPrice}</Text>
          </View>
          {discount > 0 ? (
            <View style={styles.totalContainer}>
              <Text style={styles.priceText}>Coupon Discount</Text>
              <Text style={[styles.priceText, {color: '#05A660'}]}>
                - $ {discount}
              </Text>
            </View>
          ) : (
            ''
          )}

          <View style={styles.border} />
          <View style={styles.totalContainer}>
            <Text style={styles.amountPayble}>Amount Payble</Text>
            <Text style={styles.amountPayble}>$ {totalPrice}</Text>
          </View>
        </View>
      </ScrollView>
      {selectedServices.length > 0 && (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <TotalAmount
            title="Select Date & Time"
            length={selectedServices.length}
            totalPrice={totalPrice}
            press={() => navigation.navigate('DateTime')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    // marginBottom: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8F90A6',
  },
  header: {
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#1C1C28',
  },
  shop: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C1C28',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#6440FE',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  price: {fontSize: 15, color: '#1C1C28'},

  couponSection: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  couponApplied: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  removeText: {
    color: 'red',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  couponImage: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },
  couponText: {
    color: '#1C1C28',
    fontSize: 18,
    fontWeight: 'bold',
  },
  couponTitle: {
    color: '#8F90A6',
    fontSize: 10,
    marginTop: 5,
  },
  emptyView: {
    height: 10,
    backgroundColor: '#C4C4C425',
  },
  addCoupon: {
    color: '#6440FE',
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceContainer: {
    padding: 24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  priceText: {
    color: '#1C1C28',
    fontSize: 15,
  },
  amountPayble: {
    color: '#1C1C28',
    fontSize: 19,
    fontWeight: 'bold',
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#C7C9D9',
    marginTop: 16,
  },
});

export default CheckoutScreen;
