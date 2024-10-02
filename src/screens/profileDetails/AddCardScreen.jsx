import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addCard} from '../../store/cardSlice';
import BackButton from '../../components/BackButton';
import Btn from '../../components/Btn';

const AddCardScreen = ({navigation}) => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState(null);
  const dispatch = useDispatch();
  const handleCardNumberChange = text => {
    setCardNumber(text);

    const detectedCardType = getCard(text);
    // console.log('detectedCardType', detectedCardType);
    setCardType(detectedCardType);
  };
  // console.log(cardType);
  const handleSaveCard = () => {
    const card = {
      id: Date.now(),
      name: cardName,
      cardNumber: cardNumber,
      type: cardType,
      expiry,
      cvv,
    };
    dispatch(addCard(card));
    navigation.goBack();
  };

  const getCard = cardNumber => {
    const visaPrefixes = ['4'];
    const masterCardPrefixes = ['51', '55', '2720', '2221'];
    const amexCardPrefixes = ['34', '37'];
    const discoverCardPrefixes = ['6011', '65', '644', '649'];
    const jcbCardPrefixes = ['3528', '3589'];
    const dinersCardPrefixes = ['300', '305', '309', '36', '38'];
    if (visaPrefixes.some(prefix => cardNumber.startsWith(prefix))) {
      return 'Visa';
    } else if (
      masterCardPrefixes.some(prefix => cardNumber.startsWith(prefix))
    ) {
      return 'Master Card';
    } else if (amexCardPrefixes.some(prefix => cardNumber.startsWith(prefix))) {
      return 'American Express';
    } else if (
      discoverCardPrefixes.some(prefix => cardNumber.startsWith(prefix))
    ) {
      return 'Discover';
    } else if (jcbCardPrefixes.some(prefix => cardNumber.startsWith(prefix))) {
      return 'JCB';
    } else if (
      dinersCardPrefixes.some(prefix => cardNumber.startsWith(prefix))
    ) {
      return 'Diners';
    } else {
      return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton color={'#000'} />
        <Text style={styles.title}>Add Card</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.label}>Name on the card</Text>
        <TextInput
          placeholder="Name on the card"
          placeholderTextColor="#8F90A6"
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
        />

        <Text style={styles.label}>Card number</Text>
        <TextInput
          placeholder="Enter card number"
          placeholderTextColor="#8F90A6"
          style={styles.input}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={16}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput
              placeholder="MM/YY"
              placeholderTextColor="#8F90A6"
              style={styles.input}
              value={expiry}
              maxLength={4}
              onChangeText={setExpiry}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#8F90A6"
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>
      <Btn label="Add Card" press={handleSaveCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
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
  label: {fontSize: 16, marginVertical: 5, color: '#1C1C28'},
  input: {
    borderWidth: 1,
    borderColor: '#8F90A6',
    color: '#1C1C28',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  column: {flex: 1, marginRight: 10},
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {color: 'white', textAlign: 'center', fontSize: 18},
});

export default AddCardScreen;
