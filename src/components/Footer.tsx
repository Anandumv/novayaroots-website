'use client'

import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Novayaroots</h3>
            <p>Bringing nature&apos;s goodness to your doorstep</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#blog" className="hover:text-green-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>Nechuli House , Thalakkulathur , Kozhikode , Kerala</p>
            <p>Phone: +91 9074561129</p>
            <p>Email: info@novayaroots.com</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/novayaroots"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/novayaroots"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com/novayaroots"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Novayaroots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}