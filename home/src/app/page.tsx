'use client'

import { useEffect, useState } from 'react'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
  }, [])

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded shadow p-4 flex flex-col">
          <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </main>
  )
}
