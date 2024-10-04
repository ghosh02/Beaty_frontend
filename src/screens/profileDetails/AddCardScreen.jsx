import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addCard} from '../../store/cardSlice';
import BackButton from '../../components/BackButton';
import Btn from '../../components/Btn';
import ErrorField from '../../components/ErrorField';

const AddCardScreen = ({navigation}) => {
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardType: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setCardData(prevState => ({
      ...prevState,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prevErrors => ({...prevErrors, [field]: ''}));
    }
  };

  // const handleCardNumberChange = text => {
  //   setCardData(prevState => ({
  //     ...prevState,
  //     cardNumber: text,
  //     cardType: getCard(text),
  //   }));

  // };

  const handleCardNumberChange = text => {
    setCardData(prevState => ({
      ...prevState,
      cardNumber: text,
      cardType: getCard(text),
    }));

    if (text.length === 16) {
      setErrors(prevErrors => ({
        ...prevErrors,
        cardNumber: '',
      }));
    } else if (text.length < 16) {
      setErrors(prevErrors => ({
        ...prevErrors,
        cardNumber: 'Card number must be 16 digits',
      }));
    }
  };

  const handleSaveCard = () => {
    if (validateCardData()) {
      const card = {
        id: Date.now(),
        name: cardData.cardName,
        cardNumber: cardData.cardNumber,
        type: cardData.cardType,
        expiry: cardData.expiry,
        cvv: cardData.cvv,
      };
      dispatch(addCard(card));
      navigation.goBack();
    }
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
  const validateCardData = () => {
    let newErrors = {};

    if (!cardData.cardName) {
      newErrors.cardName = 'Name on the card is required';
    }

    if (!cardData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardData.cardNumber.length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (cardData.expiry.length !== 4) {
      newErrors.expiry = 'Expiry date must be MMYY';
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cardData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const isCardFormValid =
    !errors.cardName &&
    cardData.cardName !== '' &&
    !errors.cardNumber &&
    cardData.cardNumber !== '' &&
    !errors.expiry &&
    cardData.expiry !== '' &&
    !errors.cvv &&
    cardData.cvv !== '';

  return (
    <SafeAreaView style={styles.container}>
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
          value={cardData.cardName}
          onChangeText={text => handleInputChange('cardName', text)}
        />
        <ErrorField error={errors.cardName} />

        <Text style={styles.label}>Card number</Text>
        <TextInput
          placeholder="Enter card number"
          placeholderTextColor="#8F90A6"
          style={styles.input}
          value={cardData.cardNumber}
          onChangeText={handleCardNumberChange}
          maxLength={16}
          keyboardType="numeric"
        />
        <ErrorField error={errors.cardNumber} />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Expiry</Text>
            <TextInput
              placeholder="MMYY"
              placeholderTextColor="#8F90A6"
              style={styles.input}
              value={cardData.expiry}
              maxLength={4}
              onChangeText={text => handleInputChange('expiry', text)}
              keyboardType="numeric"
            />
            <ErrorField error={errors.expiry} />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              placeholder="CVV"
              placeholderTextColor="#8F90A6"
              style={styles.input}
              value={cardData.cvv}
              onChangeText={text => handleInputChange('cvv', text)}
              maxLength={3}
              secureTextEntry={true}
              keyboardType="numeric"
            />
            <ErrorField error={errors.cvv} />
          </View>
        </View>
      </View>
      <Btn
        label="Add Card"
        bgColor={isCardFormValid ? '#6440FE' : '#6440FE50'}
        disabled={!isCardFormValid}
        press={handleSaveCard}
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
  label: {fontSize: 16, marginVertical: 10, color: '#1C1C28'},
  input: {
    borderWidth: 1,
    borderColor: '#8F90A6',
    color: '#1C1C28',
    padding: 10,
    borderRadius: 8,
    marginBottom: 0,
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
