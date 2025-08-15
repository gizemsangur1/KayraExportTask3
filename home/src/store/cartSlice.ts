import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
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
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
      toast.success(`${action.payload.title} sepete eklendi!`);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
      toast.error(`Ürün sepetten çıkarıldı!`);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity && item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;
