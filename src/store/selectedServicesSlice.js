import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedServices: [],
  totalPrice: 0,
  couponCode: null,
  discount: 0,
  currentShopId: null,
  shopDetails: null,
};

const selectedServicesSlice = createSlice({
  name: 'selectedServices',
  initialState,
  reducers: {
    // addService: (state, action) => {
    //   const {id, name, price, shopId, shopDetails} = action.payload;

    //   // Check if the selected service is from a different shop
    //   if (state.currentShopId && state.currentShopId !== shopId) {
    //     // Clear previous selections and shop details when switching to a new shop
    //     state.selectedServices = [];
    //     state.totalPrice = 0;
    //     state.shopDetails = null; // Clear previous shop details
    //   }

    //   // Set the current shop ID and shop details to the shop of the added service
    //   state.currentShopId = shopId;
    //   state.shopDetails = shopDetails;

    //   const existingService = state.selectedServices.find(
    //     service => service.id === id,
    //   );

    //   if (existingService) {
    //     // If the service already exists, increase the quantity
    //     existingService.quantity += 1;
    //     state.totalPrice += price;
    //   } else {
    //     // Add new service with quantity 1
    //     state.selectedServices.push({...action.payload, quantity: 1});
    //     state.totalPrice += price;
    //   }
    // },
    addService: (state, action) => {
      const {id, name, price, shopId, shopDetails} = action.payload;

      // Check if the selected service is from a different shop
      if (state.currentShopId && state.currentShopId !== shopId) {
        // Clear previous selections and shop details when switching to a new shop
        state.selectedServices = [];
        state.totalPrice = 0;
        state.shopDetails = null; // Clear previous shop details
      }

      // Set the current shop ID and shop details to the shop of the added service
      state.currentShopId = shopId;
      state.shopDetails = shopDetails;

      const existingService = state.selectedServices.find(
        service => service.id === id,
      );

      if (existingService) {
        // If the service already exists, update the quantity and price
        existingService.quantity += 1;
        state.totalPrice += price;
      } else {
        // Add new service with quantity 1
        state.selectedServices.push({...action.payload, quantity: 1});
        state.totalPrice += price;
      }
    },

    removeService: (state, action) => {
      const {id, price} = action.payload;
      state.selectedServices = state.selectedServices.filter(
        service => service.id !== id,
      );
      state.totalPrice -= price;

      // Clear the current shop ID and shop details if no services are selected
      if (state.selectedServices.length === 0) {
        state.currentShopId = null;
        state.shopDetails = null;
      }
    },
    increaseServiceQuantity: (state, action) => {
      const {id, price} = action.payload;
      const service = state.selectedServices.find(service => service.id === id);

      if (service) {
        // If the service exists, increase the quantity
        service.quantity += 1;
        state.totalPrice += price;
      }
    },

    decreaseServiceQuantity: (state, action) => {
      const {id, price} = action.payload;
      const service = state.selectedServices.find(service => service.id === id);
      console.log(service);
      if (service && service.quantity > 1) {
        // If quantity is greater than 1, decrease it
        service.quantity -= 1;
        state.totalPrice -= price;
      } else if (service && service.quantity === 1) {
        // If quantity is 1, remove the service
        state.selectedServices = state.selectedServices.filter(
          service => service.id !== id,
        );
        state.totalPrice -= price;

        // Clear the current shop ID and shop details if no services are selected
        if (state.selectedServices.length === 0) {
          state.currentShopId = null;
          state.shopDetails = null;
        }
      }
    },
    applyCoupon: (state, action) => {
      const {code, discountValue} = action.payload;
      state.couponCode = code;
      state.discount = discountValue;
      state.totalPrice -= discountValue;
    },
    removeCoupon: state => {
      state.totalPrice += state.discount;
      state.couponCode = null;
      state.discount = 0;
    },
    clearSelectedServices: state => {
      state.selectedServices = [];
      state.totalPrice = 0;
      state.couponCode = null;
      state.discount = 0;
      state.currentShopId = null;
    },
  },
});

export const {
  addService,
  removeService,
  increaseServiceQuantity,
  decreaseServiceQuantity,
  applyCoupon,
  removeCoupon,
  clearSelectedServices,
} = selectedServicesSlice.actions;

export default selectedServicesSlice.reducer;
