import ProductCard from "@/components/ProductCard"


type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default async function HomePage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 } // ISR cache 60 saniye
  })
  const products: Product[] = await res.json()

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  )
}
