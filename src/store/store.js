import {configureStore} from '@reduxjs/toolkit';
import selectedServicesReducer from './selectedServicesSlice';
import ordersReducer from './ordersSlice';
import cardReducer from './cardSlice';
import addressReducer from './addressSlice';

export const store = configureStore({
  reducer: {
    selectedServices: selectedServicesReducer,
    orders: ordersReducer,
    cards: cardReducer,
    address: addressReducer,
  },
});
