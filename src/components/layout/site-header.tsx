'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/80 backdrop-blur-md shadow-md'
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text hover:from-emerald-600 hover:to-emerald-400 transition-all duration-300"
        >
          Novayaroots
        </Link>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm md:text-base w-full sm:w-auto transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
          asChild
        >
          <Link href="https://novayaroots.com/order/">
            <ShoppingBag className="mr-2 h-4 w-4" /> Shop Kerala Herbs
          </Link>
        </Button>
      </nav>
    </header>
  )
}