import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setDefaultCard} from '../../store/cardSlice';
import BackButton from '../../components/BackButton';
import {AddCircle, Plus} from '../../assets/Icon/IconName';
import VisaLogo from '../../assets/images/visa.png';
import MasterCardLogo from '../../assets/images/mastercard.png';
import AmexLogo from '../../assets/images/amex.png';
import DiscoverLogo from '../../assets/images/discover.png';
import jcb from '../../assets/images/jcb.png';
import Btn from '../../components/Btn';

const PaymentMethodScreen = ({navigation}) => {
  const cards = useSelector(state => state.cards.cards);
  console.log(cards);
  const defaultCardId = useSelector(state => state.cards.defaultCardId);
  const dispatch = useDispatch();
  const handleSetDefault = id => {
    dispatch(setDefaultCard(id));
  };
  const getCardImage = type => {
    switch (type) {
      case 'Visa':
        return VisaLogo;
      case 'Master Card':
        return MasterCardLogo;
      case 'American Express':
        return AmexLogo;
      case 'Discover':
        return DiscoverLogo;
      case 'JCB':
        return jcb;
      default:
        return MasterCardLogo;
    }
  };
  const renderCard = ({item}) => (
    <View
      style={[
        styles.cardContainer,
        defaultCardId === item.id && styles.defaultCard,
        defaultCardId !== item.id && styles.makeDefaultCard,
      ]}>
      {defaultCardId === item.id && (
        <View style={styles.defaultContainer}>
          <Text style={styles.defaultText}>Default</Text>
        </View>
      )}

      <View style={styles.cardImageContainer}>
        {getCardImage(item.type) && (
          <Image source={getCardImage(item.type)} style={styles.cardImage} />
        )}
      </View>

      <View style={styles.cardDetailsContainer}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardNumber}>
          XXXX XXXX XXXX {item.cardNumber?.slice(-4)}
        </Text>
        <Text style={styles.cardDetails}>
          Expiry: {item.expiry?.slice(0, 2)}/{item.expiry?.slice(2, 4)}
        </Text>
      </View>
      {defaultCardId !== item.id && (
        <TouchableOpacity
          style={styles.makeDefaultContainer}
          onPress={() => handleSetDefault(item.id)}>
          <Text style={styles.makeDefaultText}>Make Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton color={'#000'} />
        <Text style={styles.title}>Payment Methods</Text>
      </View>

      {cards.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={styles.emptyMessageContainer}>
          <Text style={styles.emptyMessage}>No Card Added</Text>
        </View>
      )}
      <Btn
        label="Add Payment Method"
        press={() => navigation.navigate('AddCard')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C28',
  },

  cardImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F9',
  },
  cardImage: {
    width: 45,
    height: 30,
    objectFit: 'contain',
  },
  addCard: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  makeDefaultCard: {
    paddingBottom: 50,
  },
  defaultCard: {borderColor: 'green', borderWidth: 2, paddingTop: 50},
  defaultContainer: {
    position: 'absolute',
    top: 8,
    left: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EBFFD7',
  },
  defaultText: {
    fontSize: 14,
    color: '#28B446',
  },
  makeDefaultText: {
    fontSize: 14,
    color: '#1C1C28',
  },
  makeDefaultContainer: {
    position: 'absolute',
    bottom: 8,
    left: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C28',
    textTransform: 'uppercase',
  },
  cardNumber: {
    fontSize: 16,
    marginVertical: 5,
    color: '#868889',
  },
  cardDetails: {fontSize: 14, color: '#1C1C28'},

  addButton: {
    backgroundColor: '#6200EE',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
  },
  addButtonText: {fontSize: 30, color: 'white'},

  emptyMessageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#6e6e6e',
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addText: {
    fontSize: 16,
    color: '#6440FE',
  },
});

export default PaymentMethodScreen;
