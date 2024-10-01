import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  pastOrders: [],
  upcomingOrders: [],
  favoriteOrders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const {order} = action.payload;
      if (order.status === 'pending') {
        state.upcomingOrders.push(order);
      } else if (order.status === 'cancelled' || order.status === 'delivered') {
        state.pastOrders.push(order);
      }
    },
    updateOrderStatus: (state, action) => {
      const {orderId, newStatus} = action.payload;
      const orderIndex = state.upcomingOrders.findIndex(
        order => order.id === orderId,
      );
      if (orderIndex !== -1) {
        const order = state.upcomingOrders[orderIndex];
        order.status = newStatus;
        if (newStatus === 'cancelled' || newStatus === 'delivered') {
          state.upcomingOrders.splice(orderIndex, 1);
          state.pastOrders.push(order);
        }
      }
    },
    reorder: (state, action) => {
      const {orderId} = action.payload;
      const order = state.pastOrders.find(order => order.id === orderId);
      if (order) {
        const newOrder = {
          ...order,
          id: Date.now().toString(),
          status: 'pending',
          date: new Date().toISOString().split('T')[0],
        };
        state.upcomingOrders.push(newOrder);
      }
    },
    toggleFavorite: (state, action) => {
      const {orderId} = action.payload;
      let order = state.upcomingOrders.find(order => order.id === orderId);
      if (!order) {
        order = state.pastOrders.find(order => order.id === orderId);
      }
      if (order) {
        order.isFavorite = !order.isFavorite;
        if (order.isFavorite) {
          state.favoriteOrders.push(order);
        } else {
          state.favoriteOrders = state.favoriteOrders.filter(
            order => order.id !== orderId,
          );
        }
      }
    },
  },
});

// Selector Definitions
export const selectOrdersState = state => state.orders;

export const selectPastOrders = createSelector(
  [selectOrdersState],
  ordersState => ordersState.pastOrders,
);

export const selectUpcomingOrders = createSelector(
  [selectOrdersState],
  ordersState => ordersState.upcomingOrders,
);

export const selectFavoriteOrders = createSelector(
  [selectOrdersState],
  ordersState => ordersState.favoriteOrders,
);

export const selectOrderById = createSelector(
  [
    state => state.orders.pastOrders,
    state => state.orders.upcomingOrders,
    state => state.orders.favoriteOrders,
    (state, orderId) => orderId,
  ],
  (pastOrders, upcomingOrders, favoriteOrders, orderId) => {
    return (
      pastOrders.find(order => order.id === orderId) ||
      upcomingOrders.find(order => order.id === orderId) ||
      favoriteOrders.find(order => order.id === orderId) ||
      null
    );
  },
);
export const selectAllOrders = state => [
  ...state.orders.pastOrders,
  ...state.orders.upcomingOrders,
];
export const {addOrder, updateOrderStatus, reorder, toggleFavorite} =
  ordersSlice.actions;
export default ordersSlice.reducer;
