'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../store/cartSlice'

type Product = {
  id: number
  title: string
  price: number
  image: string
  description: string
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => setProduct(data))
  }, [id])

  if (!product) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-square bg-gray-50 rounded-xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
            priority
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-6">${product.price}</p>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="px-4 py-2 bg-gradient-to-r from-[#2d3d4d] to-[#799cb7] text-white rounded hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
