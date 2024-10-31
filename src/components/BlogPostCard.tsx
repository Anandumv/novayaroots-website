import React from 'react'
import { motion } from 'framer-motion'

interface BlogPostCardProps {
  post: {
    title: string
    excerpt: string
    image: string
  }
  index: number
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <a href="#" className="text-green-600 font-semibold hover:underline">Read more</a>
      </div>
    </motion.div>
  )
}