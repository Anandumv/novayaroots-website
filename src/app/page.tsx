"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Check, Star, Users, Leaf, ShoppingBag, Coffee, Droplet, Sun, Mail, Phone, Recycle } from 'lucide-react'

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-emerald-700">Novayaroots</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/products" className="text-emerald-600 hover:text-emerald-800 text-base md:text-lg">Products</Link>
            <Link href="/about" className="text-emerald-600 hover:text-emerald-800 text-base md:text-lg">About Us</Link>
            <Link href="/blog" className="text-emerald-600 hover:text-emerald-800 text-base md:text-lg">Blog</Link>
            <Link href="/#contact" className="text-emerald-600 hover:text-emerald-800 text-base md:text-lg">Contact</Link>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm md:text-base" asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" /> Shop Now
            </Link>
          </Button>
        </nav>
      </header>

      <main className="text-gray-900">
        <section className="py-12 md:py-20 text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-emerald-800 mb-6">
            Nature's Purity, From Kerala to You
          </h1>
          <p className="text-lg md:text-xl text-emerald-600 mb-8 max-w-2xl mx-auto">
            Experience the essence of wellness with our premium herbs, spices, and herbal products,
            sourced directly from the lush landscapes of Kerala.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-full" asChild>
            <Link href="/products">
              Explore Our Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="why-choose-us" className="py-12 md:py-16 bg-emerald-50 scroll-mt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8 md:mb-12">Why Choose Novayaroots?</h2>
            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Leaf, title: "Premium Quality Products", description: "Our herbs and spices are carefully selected to ensure the highest quality and purity." },
                { icon: Users, title: "Sourced from Kerala", description: "We source directly from trusted farmers in Kerala, ensuring authenticity and quality." },
                { icon: Star, title: "Ayurvedic Expertise", description: "Our products are backed by centuries of Ayurvedic wisdom and modern research." },
                { icon: Recycle, title: "Eco-friendly Packaging", description: "We use sustainable packaging to minimize our environmental impact." }
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8 md:mb-12">Featured Products</h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Coffee,
                  title: "Moringa Powder",
                  subtitle: "Nutrient-rich superfood",
                  benefits: [
                    "Rich in vitamins and minerals",
                    "Supports immune function",
                    "Promotes overall wellness"
                  ]
                },
                {
                  icon: Droplet,
                  title: "Black Pepper",
                  subtitle: "King of Spices",
                  benefits: [
                    "Enhances nutrient absorption",
                    "Supports digestive health",
                    "Rich in antioxidants"
                  ]
                },
                {
                  icon: Sun,
                  title: "Turmeric Powder",
                  subtitle: "Golden Spice of Life",
                  benefits: [
                    "Powerful anti-inflammatory",
                    "Boosts immune system",
                    "Supports joint health"
                  ]
                }
              ].map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <product.icon className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold mb-2">{product.title}</h3>
                      <p className="text-emerald-600 text-sm md:text-base mb-4">{product.subtitle}</p>
                    </div>
                    <ul className="space-y-2 mb-4 text-sm md:text-base">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm md:text-base" asChild>
                      <Link href="/order">Order Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-emerald-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8">Customer Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                {
                  name: "Priya S.",
                  comment: "Novayaroots' Moringa powder has become a staple in my daily smoothies. I feel more energetic and healthier!"
                },
                {
                  name: "Rahul M.",
                  comment: "The quality of their Black Pepper is unmatched. It's aromatic and adds the perfect kick to my dishes."
                }
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="mb-4 italic text-sm md:text-base">"{testimonial.comment}"</p>
                    <p className="font-semibold text-emerald-600 text-sm md:text-base">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8">Stay Connected</h2>
            <p className="text-center text-emerald-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on our products, wellness tips, and exclusive offers.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-emerald-800 text-white py-8 md:py-12 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">Novayaroots</h3>
              <p className="text-sm md:text-base">Bringing Kerala's finest herbs and spices to your doorstep.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-lg">Quick Links</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link href="/products" className="hover:text-emerald-300">Products</Link></li>
                <li><Link href="/about" className="hover:text-emerald-300">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-emerald-300">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-emerald-300">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-lg">Connect With Us</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><a href="https://www.instagram.com/novayaroots/" className="hover:text-emerald-300">Instagram</a></li>
                <li><a href="https://medium.com/@novayaroots" className="hover:text-emerald-300">Medium</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-base md:text-lg">Contact Us</h4>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  <p>info@novayaroots.com</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <p>+91 90745 61129</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                    asChild
                  >
                    <a href="https://wa.me/919074561129" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                    asChild
                  >
                    <a href="mailto:info@novayaroots.com">
                      Email Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-sm md:text-base">
            <p>&copy; {new Date().getFullYear()} Novayaroots. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}