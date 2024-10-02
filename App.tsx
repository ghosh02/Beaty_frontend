import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Landing from './src/screens/auth/Landing';
import LoginRegisterScreen from './src/screens/auth/LoginRegisterScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import OtpVerify from './src/screens/auth/OtpVerify';
import ChangePassword from './src/screens/auth/ChangePassword';
import Home from './src/screens/main/Home';
import ServiceDetail from './src/screens/main/ServiceDetail';
import ShopDetails from './src/screens/main/ShopDetails';
import CheckoutScreen from './src/screens/main/CheckoutScreen';
import AddCoupon from './src/screens/main/AddCoupon';
import DateTime from './src/screens/main/DateTime';
import Profile from './src/screens/profileDetails/Profile';
import OrderPage from './src/screens/main/OrderPage';
import OrderDetails from './src/screens/main/OrderDetails';
import EditProfile from './src/screens/profileDetails/EditProfile';
import AddCardScreen from './src/screens/profileDetails/AddCardScreen';
import PaymentMethodScreen from './src/screens/profileDetails/PaymentMethodScreen';
import ConfettiAnimation from './src/components/ConfettiAnimation';
import AddressList from './src/screens/profileDetails/AddressList';
import AddressForm from './src/screens/profileDetails/AddressForm';
import About from './src/screens/profileDetails/About';
import Notification from './src/screens/profileDetails/Notification';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="Confetti" component={ConfettiAnimation} /> */}
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
          <Stack.Screen name="ShopDetails" component={ShopDetails} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="AddCoupon" component={AddCoupon} />
          <Stack.Screen name="DateTime" component={DateTime} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              presentation: 'modal',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen name="Order" component={OrderPage} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Stack.Screen name="AddressList" component={AddressList} />
          <Stack.Screen name="AddressForm" component={AddressForm} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

// ./gradlew assembleRelease
// ./gradlew clean
