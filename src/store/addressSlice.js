import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  addresses: [],
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(
        address => address.id === action.payload.id,
      );
      if (index >= 0) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        address => address.id !== action.payload,
      );
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: state => {
      state.selectedAddress = null;
    },
  },
});

export const {
  addAddress,
  updateAddress,
  deleteAddress,
  setSelectedAddress,
  clearSelectedAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
