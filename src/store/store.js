import {configureStore} from '@reduxjs/toolkit';
import selectedServicesReducer from './selectedServicesSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    selectedServices: selectedServicesReducer, // Register the reducer
  },
});
