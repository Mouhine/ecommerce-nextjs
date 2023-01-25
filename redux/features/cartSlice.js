import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carteItems: [],
  qyt: 1,
  isOpen: false,
  totalPrice: 0,
  totalItems: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const isFound = state.carteItems.some((element) => {
        if (element.title === payload.title) {
          element.q++;
          state.totalItems++;
          return true;
        }

        return false;
      });
      if (isFound) return;
      state.carteItems = [...state.carteItems, payload];

      state.totalItems++;
    },
    removeFromCart: (state, { payload }) => {
      const foundItem = state.carteItems.find((item) => item._id === payload);

      state.carteItems = state.carteItems.filter(
        (item) => item._id !== payload
      );
      if (state.totalItems === 0) return;
      state.totalItems--;
    },
    clearCart: (state, { payload }) => {
      state.carteItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    setCartState: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    setTotalPrice: (state, action) => {
      let totalPrice = 0;
      state.carteItems.forEach((item) => {
        totalPrice += item.price * item.q;
      });
      state.totalPrice = totalPrice;
    },
    incqyt: (state, action) => {
      state.qyt++;
    },
    decqyt: (state, action) => {
      if (state.qyt === 1) return;
      state.qyt--;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearCart,
  addToCart,
  setCartState,
  removeFromCart,
  setTotalPrice,
  incqyt,
  decqyt,
} = counterSlice.actions;

export default counterSlice.reducer;
