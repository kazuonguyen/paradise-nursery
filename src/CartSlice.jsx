import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload: plant }) {
      if (!state.items.some(item => item.id === plant.id)) {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      if (!Number.isInteger(quantity) || quantity < 1) return;
      const item = state.items.find(item => item.id === id);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export const selectItems = state => state.cart.items;
export const selectCartCount = state =>
  selectItems(state).reduce((sum, item) => sum + item.quantity, 0);
export const formatPrice = cents =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
export default cartSlice.reducer;
