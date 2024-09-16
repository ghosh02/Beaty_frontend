// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   selectedServices: [],
// };

// const selectedServicesSlice = createSlice({
//   name: 'selectedServices',
//   initialState,
//   reducers: {
//     addService: (state, action) => {
//       state.selectedServices.push(action.payload);
//     },
//     removeService: (state, action) => {
//       state.selectedServices = state.selectedServices.filter(
//         service => service.id !== action.payload.id,
//       );
//     },
//   },
// });

// export const {addService, removeService} = selectedServicesSlice.actions;
// export default selectedServicesSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedServices: [],
  totalPrice: 0, // Added to track the total price
};

const selectedServicesSlice = createSlice({
  name: 'selectedServices',
  initialState,
  reducers: {
    addService: (state, action) => {
      const {id, price} = action.payload;
      // Add the service and update the total price
      state.selectedServices.push(action.payload);
      state.totalPrice += price; // Update total price
    },
    removeService: (state, action) => {
      const {id, price} = action.payload;
      // Filter out the service and update the total price
      state.selectedServices = state.selectedServices.filter(
        service => service.id !== id,
      );
      state.totalPrice -= price; // Decrease the total price
    },
  },
});

export const {addService, removeService} = selectedServicesSlice.actions;
export default selectedServicesSlice.reducer;
