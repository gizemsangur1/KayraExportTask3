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

const saveCart = (items: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items);
      toast.success(`${action.payload.title} added to cart!`);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCart(state.items);
      toast.error("Item removed from cart!");
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
        saveCart(state.items);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && (item.quantity || 1) > 1) {
        item.quantity! -= 1;
        saveCart(state.items);
      }
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      saveCart(state.items);
    }
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } = cartSlice.actions;
export default cartSlice.reducer;
