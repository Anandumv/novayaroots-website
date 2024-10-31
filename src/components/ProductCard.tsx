import React from 'react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: {
    name: string
    description: string
    price: number
    image: string
  }
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-2xl font-semibold mb-2 text-green-800">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => {/* Add to cart functionality */}}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}