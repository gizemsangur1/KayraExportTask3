'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(storedCart)
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 border-b pb-2">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <h2 className="font-medium">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 font-bold">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </main>
  )
}
