'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import toast, { Toaster } from 'react-hot-toast'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
  }, [])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  return (
    <>
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <a href={`/products/${product.id}`} className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full object-contain p-6 bg-gray-50 group-hover:scale-105 transition-transform duration-300"
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
                onClick={() => handleAddToCart(product)}
                className="mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#446785] to-[#38536c] hover:from-[#31475b] hover:to-[#2d3d4d] text-white px-5 py-2 rounded-xl transition-all"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}
