import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

// Utility functions to calculate state properties
const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

const setTotalPrice = (state) =>
  state.products.reduce((total, product) => total + product.quantity * product.price, 0);

const setTax = (state) => state.totalPrice * state.taxRate;

const setGrandTotal = (state) => state.totalPrice + state.tax;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!existingProduct) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        existingProduct.quantity += 1; // Increase quantity if already exists
      }

      // Recalculate totals
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
