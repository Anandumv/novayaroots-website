'use client'

import React, { useState } from 'react'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  activeSection: string
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">Novayaroots</h1>
        <nav className="hidden md:flex items-center space-x-6">
          {['home', 'about', 'products', 'testimonials', 'blog', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`hover:text-green-600 transition-colors ${
                activeSection === section ? 'text-green-600 font-semibold' : ''
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
          <button onClick={() => setShowSearch(!showSearch)} aria-label="Search">
            <Search size={24} />
          </button>
          <button className="relative" aria-label="Cart">
            <ShoppingCart size={24} />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems}
              </span>
            )}
          </button>
        </nav>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white shadow-md z-20 md:hidden"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {['home', 'about', 'products', 'testimonials', 'blog', 'contact'].map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className="block py-2 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-white shadow-md z-20"
          >
            <div className="container mx-auto px-4 py-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}