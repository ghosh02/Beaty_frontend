import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  defaultCardId: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      // If it's the only card, set it as the default card
      if (state.cards.length === 1) {
        state.defaultCardId = action.payload.id;
      }
    },
    setDefaultCard: (state, action) => {
      state.defaultCardId = action.payload;
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
      // Reset defaultCardId if default card is removed or no cards left
      if (state.defaultCardId === action.payload || state.cards.length === 0) {
        state.defaultCardId = state.cards.length > 0 ? state.cards[0].id : null;
      }
    },
  },
});

export const {addCard, setDefaultCard, removeCard} = cardSlice.actions;
export default cardSlice.reducer;
