"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      <a
        href={`/products/${product.id}`}
        className="relative group block h-56 bg-gray-50"
      >
        <Image
          fill
          src={product.image}
          alt={product.title}
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
        />
      </a>

      <div className="flex flex-col flex-1 p-5">
        <h2 className="font-semibold text-lg line-clamp-2 mb-2 text-[#2d3d4d]">
          {product.title}
        </h2>
        <p className="text-[#38536c] font-bold text-xl mb-4">
          ${product.price}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#2d3d4d] to-[#799cb7] hover:from-[#31475b] hover:to-[#2d3d4d] text-white px-5 py-2 rounded-xl transition-all"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
