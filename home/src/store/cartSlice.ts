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
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
});

export const { addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
