"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded shadow p-4 flex flex-col"
        >
          <a href={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4"
            />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>{" "}
          </a>
        </div>
      ))}
    </main>
  );
}
