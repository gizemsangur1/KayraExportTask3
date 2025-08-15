import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartState = {
  items: Product[];
};

const initialState: CartState = {
  items: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
});

export const { setCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
