"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    const existingCart: Product[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data: Product) => setProduct(data));
  }, [params.id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-auto object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-6">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
