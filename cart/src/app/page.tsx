"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, increaseQuantity, decreaseQuantity, setCart } from "../store/cartSlice";
import { useEffect } from "react";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    dispatch(setCart(storedCart));
  }, [dispatch]);

  if (items.length === 0) {
    return <div className="p-8 text-center text-gray-500 text-lg">Your cart is empty 🛒</div>;
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">🛍 Your Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-md border" />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4">{item.quantity || 1}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-4 py-2 bg-gradient-to-r from-[#2d3d4d] to-[#799cb7] text-white rounded-lg hover:opacity-90 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
        <span className="text-xl font-semibold">Total:</span>
        <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
      </div>
    </main>
  );
}
