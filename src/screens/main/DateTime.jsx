import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import TotalAmount from '../../components/TotalAmount';
import BackButton from '../../components/BackButton';
import cash from '../../assets/images/cash.png';
import visa from '../../assets/images/visa.png';
import applepay from '../../assets/images/applepay.png';
import {CloseIcon, RightIcon} from '../../assets/Icon/IconName';
import {useSelector, useDispatch} from 'react-redux';
import {addOrder} from '../../store/ordersSlice';
import {clearSelectedServices} from '../../store/selectedServicesSlice';
import {CommonActions, useNavigation} from '@react-navigation/native';
import ConfettiAnimation from '../../components/ConfettiAnimation';

const DateTime = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    'VISA **** **** **** 0981',
  );
  const {selectedServices, totalPrice, shopDetails, couponCode, discount} =
    useSelector(state => state.selectedServices);

  // Generate the next 7 days with separate day and date fields
  // const generateDates = () => {
  //   const dates = [];
  //   const today = new Date();

  //   for (let i = 0; i < 7; i++) {
  //     const nextDate = new Date();
  //     nextDate.setDate(today.getDate() + i);

  //     const day = nextDate.toLocaleDateString('en-US', {weekday: 'short'}); // e.g., "Tue"
  //     const date = nextDate.getDate();

  //     // Push each date object with day and date separately
  //     dates.push({day, date});
  //   }
  //   return dates;
  // };
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      const day = nextDate.toLocaleDateString('en-US', {weekday: 'short'}); // e.g., "Tue"
      const fullDate = nextDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }); // e.g., "10 March 2021"

      // Push each date object with day and the full date
      dates.push({day, fullDate, dateObject: nextDate});
    }
    return dates;
  };

  const timeSlots = [
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 AM',
    '01:00 PM',
    '01:30 PM',
  ];
  const paymentMethods = [
    {id: '1', method: 'Apple Pay', img: applepay},
    {id: '2', method: 'Cash On Delivery', img: cash},
    {id: '3', method: 'VISA 4153 xxxx xxxx 0981', img: visa},
    // {id: '4', method: 'Add payment method', icon: '➕'},
  ];

  const handlePaymentMethodSelect = method => {
    setSelectedPaymentMethod(method);
    setModalVisible(false);
  };
  const handleBookNow = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    const order = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      paymentMethod: selectedPaymentMethod,
      services: selectedServices,
      totalPrice: totalPrice,
      status: 'pending',
      shopDetails: shopDetails,
      couponCode: couponCode,
      discount: discount,
    };

    // Dispatch the action to add the order
    dispatch(addOrder({order}));
    dispatch(clearSelectedServices());
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}, {name: 'Order'}],
        }),
      );
    }, 1000);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiAnimation />}
      <View style={styles.headerContainer}>
        <BackButton color="#1C1C28" />
        <Text style={styles.header}>Select Date & Time</Text>
      </View>
      {/* <Text style={styles.title}>Checkout</Text> */}
      <Text style={styles.subtitle}>
        Select Date & Time for the appointment
      </Text>

      {/* Date Section */}
      <Text style={styles.sectionTitle}>When would you like your service?</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={generateDates()}
          keyExtractor={item => item.day + item.fullDate}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.dateItem,
                selectedDate === item.fullDate && styles.selectedItem,
              ]}
              onPress={() => setSelectedDate(item.fullDate)}>
              {/* Show day and date separately */}
              <Text
                style={[
                  styles.dayText,
                  selectedDate === item.fullDate && styles.selectedDate,
                ]}>
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.fullDate && styles.selectedDate,
                ]}>
                {item.fullDate?.slice(0, 2)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Time Section */}
      <Text style={styles.sectionTitle}>When would you like your service?</Text>
      <FlatList
        numColumns={2}
        data={timeSlots}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.timeItem,
              selectedTime === item && styles.selectedItem,
            ]}
            onPress={() => setSelectedTime(item)}>
            <Text
              style={[
                styles.timeText,
                selectedTime === item && styles.selectedDate,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedServices.length > 0 && (
        <View>
          <TouchableOpacity
            style={styles.paymentMethodContainer}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{selectedPaymentMethod}</Text>
            <RightIcon color="#1C1C28" />
          </TouchableOpacity>

          <TotalAmount
            title="Book Now"
            length={selectedServices.length}
            totalPrice={totalPrice}
            press={handleBookNow}
          />
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.paymentMethodItem}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}>
                <CloseIcon />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
            </View>
            {paymentMethods.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethodSelect(item.method)}>
                <View style={styles.paymentMethodItem}>
                  <Image source={item.img} style={styles.paymentImg} />
                  <Text style={styles.paymentText}>{item.method}</Text>
                </View>
                <RightIcon color="#1C1C28" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    color: '#1C1C28',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 19,
    color: '#1C1C28',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 5,
    color: '#1C1C28',
  },
  dateItem: {
    width: 60,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center', // Center the text inside the item
  },
  timeItem: {
    flex: 1,
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedItem: {
    borderColor: '#6440FE',
  },
  selectedDate: {
    color: '#6440FE',
  },
  dayText: {
    fontSize: 13,
    color: '#1C1C28',
    // fontWeight: 'bold',
  },
  dateText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1C1C28',
  },
  timeText: {
    fontSize: 15,
    color: '#1C1C28',

    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  footerText: {
    fontSize: 16,
  },
  footerPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerPriceText: {
    fontSize: 16,
    marginRight: 10,
  },
  paymentMethodContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 80,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#1C1C28',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
  },
  modalCloseButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    color: '#1C1C28',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentImg: {
    width: 32,
    height: 24,
    objectFit: 'contain',
  },
  paymentText: {
    fontSize: 16,
    color: '#1C1C28',
  },
});

export default DateTime;
