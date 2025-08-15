"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, setCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { useEffect } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(setCart(storedCart));
  }, [dispatch]);

  if (items.length === 0) {
    return <div className="p-6">Cart is empty.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>${item.price}</span>
              <div className="flex items-center border rounded px-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 py-1 text-lg"
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-2 py-1 text-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
