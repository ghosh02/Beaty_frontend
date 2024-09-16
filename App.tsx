import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './src/screens/auth/Landing';
import LoginRegisterScreen from './src/screens/auth/LoginRegisterScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import OtpVerify from './src/screens/auth/OtpVerify';
import ChangePassword from './src/screens/auth/ChangePassword';
import Home from './src/screens/main/Home';
import ServiceDetail from './src/screens/main/ServiceDetail';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import ShopDetails from './src/screens/main/ShopDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OtpVerify" component={OtpVerify} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
          <Stack.Screen name="ShopDetails" component={ShopDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

// ./gradlew assembleRelease
// ./gradlew clean
