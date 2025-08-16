'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { setCart } from '../store/cartSlice'

export default function Navbar() {
  const cartCount = useSelector((state: RootState) => state.cart.items.length)
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false)

  const isCartApp = typeof window !== 'undefined' && window.location.pathname.startsWith('/cart')
  const homeLink = isCartApp ? 'http://localhost:3000' : '/'

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      dispatch(setCart(updatedCart))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [dispatch])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#799cb7]/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
  
        <a href={homeLink} className="text-2xl font-extrabold text-white tracking-wide">
          GİZEM ŞANGÜR
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href={homeLink} className="text-white hover:text-[#1e2833] transition-colors duration-300 text-lg font-medium">
            Home
          </a>
          <a href="/cart" className="relative flex items-center text-white hover:text-[#1e2833] transition-colors duration-300 text-lg font-medium">
            <ShoppingCartIcon className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#1e2833] shadow-md text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#799cb7]/80 backdrop-blur-lg border-t border-white/20 px-6 py-4 space-y-4">
          <a href={homeLink} className="block text-white hover:text-[#1e2833] transition-colors text-lg font-medium" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="/cart" className="relative flex items-center text-white hover:text-[#1e2833] transition-colors text-lg font-medium" onClick={() => setMenuOpen(false)}>
            <ShoppingCartIcon className="w-6 h-6 mr-2 text-white" />
            Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-[#1e2833] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      )}
    </nav>
  )
}
