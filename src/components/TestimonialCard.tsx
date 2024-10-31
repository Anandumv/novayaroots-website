import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: {
    name: string
    rating: number
    comment: string
    avatar: string
  }
  index: number
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{testimonial.comment}</p>
    </motion.div>
  )
}