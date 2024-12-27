'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowRight, X, Sparkles } from 'lucide-react'

export function PromoBanner() {
  const [showBanner, setShowBanner] = useState(true)

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm transform hover:scale-105 transition-all duration-300 animate-fade-in">
      <button
        onClick={() => setShowBanner(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full blur-2xl opacity-50"></div>
        <Sparkles className="h-8 w-8 mb-4 text-yellow-200 animate-pulse relative" />
        <h3 className="font-bold text-xl mb-2 relative">New! Homemade Pickles</h3>
        <p className="mb-4 text-white/90 relative">
          Experience the tangy delight of our special Mushroom Pickle, handcrafted with love!
        </p>
        <Button
          asChild
          className="w-full bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 shadow-lg relative"
        >
          <Link href="/order">
            Order Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}