'use client'

import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-24 md:py-36 text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d')] bg-cover bg-center opacity-10 animate-fade-in"></div>
      <div
        className="relative max-w-6xl mx-auto"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
        }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-emerald-800 mb-8 leading-tight animate-fade-in-up">
          Premium Natural
          <span className="block bg-gradient-to-r from-emerald-600 to-emerald-500 text-transparent bg-clip-text">
            Herb Products
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl mt-4 text-emerald-600">
            from Kerala, India
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-emerald-700/90 mb-12 mx-auto max-w-3xl leading-relaxed">
          Discover nature's finest selection of organic Moringa powder,
          antioxidant-rich Mulberry tea, and artisanal pickles.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-7 rounded-full group hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-500/25"
            asChild
          >
            <Link href="https://novayaroots.com/order/">
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button
            className="bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-600 text-lg px-8 py-7 rounded-full group hover:scale-105 transition-all duration-300 shadow-xl"
            asChild
          >
            <Link href="#featured-products">
              Learn More
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}