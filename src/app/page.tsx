'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Check, Star, Users, Leaf, ShoppingBag, Coffee, Droplet, Sun, Mail, Phone, Recycle, X, Sparkles, Zap, Gift, ArrowDown } from 'lucide-react'

export default function Home() {
  const [showBanner, setShowBanner] = useState(true)
  const [email, setEmail] = useState('')
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const banners = [
    {
      title: "🌿 Superfood Power!",
      description: "Boost your health with our Organic Moringa Powder",
      icon: Leaf,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "⚡ Energy Kick!",
      description: "Revitalize with our Mulberry Leaf Tea",
      icon: Zap,
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "🎁 Limited Time Offer!",
      description: "Get 20% off on all Kerala Pickles",
      icon: Gift,
      color: "from-red-500 to-rose-600"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 sm:p-6 rounded-xl shadow-2xl max-w-sm mx-auto"
          >
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-2 text-white hover:rotate-90 transition-transform duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 mb-3 sm:mb-4 animate-pulse text-yellow-200" />
            <h3 className="font-bold text-lg sm:text-xl mb-2">New! Homemade Pickles</h3>
            <p className="mb-4 text-sm sm:text-base text-white/90">Experience the tangy delight of our special Mushroom Pickle, handcrafted with love!</p>
            <Button
              asChild
              className="w-full bg-white text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-300"
            >
              <Link href="/order">
                Order Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-emerald-700 hover:text-emerald-600 transition-colors duration-300">
            Novayaroots
          </Link>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-xs sm:text-sm md:text-base w-full sm:w-auto mt-3 sm:mt-0 transition-transform hover:scale-105 duration-300 shadow-lg"
            asChild
          >
            <Link href="https://novayaroots.com/order/">
              <ShoppingBag className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Shop Kerala Herb Products
            </Link>
          </Button>
        </nav>
      </header>

      <main className="text-gray-900">
        <section className="overflow-hidden">
          <AnimatePresence mode="wait">
            {banners.map((banner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentBannerIndex ? 1 : 0,
                  x: index === currentBannerIndex ? 0 : 100,
                }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`bg-gradient-to-r ${banner.color} ${
                  index === currentBannerIndex ? 'block' : 'hidden'
                }`}
              >
                <div className="container mx-auto px-4 py-3 sm:py-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-2 sm:mb-0">
                      <banner.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-bounce" />
                      <div>
                        <h3 className="text-sm sm:text-lg font-bold text-white">{banner.title}</h3>
                        <p className="text-xs sm:text-sm text-white/90">{banner.description}</p>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="bg-white/90 hover:bg-white text-black hover:scale-105 transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm rounded-full"
                    >
                      <Link href="/order">Order Now</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        <section className="py-12 sm:py-20 md:py-32 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d')] bg-cover bg-center opacity-10"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-emerald-800 mb-6 sm:mb-8 leading-tight">
              Premium Natural Herb Products
              <span className="block text-emerald-600">from Kerala</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-700 mb-8 sm:mb-12 mx-auto max-w-3xl leading-relaxed">
              Discover Novayaroots' authentic collection of nutrient-rich Natural Moringa powder,
              antioxidant-packed Mulberry leaf tea, and traditional Kerala artisanal pickles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-full group hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://novayaroots.com/order/">
                  Explore Our Products
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                className="bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-600 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 md:py-6 rounded-full hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto"
                asChild
              >
                <Link href="#featured-products">
                  Learn More
                  <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="featured-products" className="py-12 sm:py-20 md:py-32 scroll-mt-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-8 sm:mb-16">
                Featured Organic Herb Products
                <span className="block text-lg sm:text-xl md:text-2xl text-emerald-600 mt-2 sm:mt-4 font-normal">
                  Handcrafted with care in Kerala
                </span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {[
                {
                  icon: Coffee,
                  title: "Organic Moringa Powder",
                  subtitle: "Kerala's Nutrient-Dense Superfood",
                  benefits: [
                    "100% pure organic Moringa leaves powder",
                    "Rich in vitamins, minerals, and antioxidants",
                    "Supports overall health and immunity"
                  ],
                  color: "emerald"
                },
                {
                  icon: Droplet,
                  title: "Mulberry Leaf Tea",
                  subtitle: "Antioxidant-Packed Herb Infusions",
                  benefits: [
                    "Premium organic Mulberry leaf tea",
                    "Supports blood sugar management",
                    "Delicious and caffeine-free wellness drink"
                  ],
                  color: "blue"
                },
                {
                  icon: Sun,
                  title: "Artisanal Kerala Pickles",
                  subtitle: "Including Organic Mushroom Pickles",
                  benefits: [
                    "Traditional Kerala pickle recipes",
                    "Unique organic Mushroom pickles",
                    "Preservative-free and naturally fermented"
                  ],
                  color: "amber"
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden rounded-2xl border-2 h-full flex flex-col"
                  >
                    <CardContent className="p-6 sm:p-8 flex-grow">
                      <div className="text-center mb-4 sm:mb-6">
                        <div className={`inline-flex p-3 sm:p-4 rounded-full bg-${product.color}-100 text-${product.color}-600 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <product.icon className="h-8 w-8 sm:h-12 sm:w-12" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-2">{product.title}</h3>
                        <p className={`text-${product.color}-600 text-sm sm:text-lg mb-4 sm:mb-6`}>{product.subtitle}</p>
                      </div>
                      <ul className="space-y-2 sm:space-y-4">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <Check className={`h-4 w-4 sm:h-5 sm:w-5 text-${product.color}-500 mr-2 sm:mr-3 mt-1 flex-shrink-0`} />
                            <span className="text-gray-600 text-sm sm:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="p-6 sm:p-8 pt-0">
                      <Button
                        className={`w-full rounded-full text-sm sm:text-base group-hover:scale-105 transition-all duration-300 ${
                          product.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                          product.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                          'bg-amber-600 hover:bg-amber-700'
                        }`}
                        asChild
                      >
                        <Link href="https://novayaroots.com/order/">Shop Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose-us" className="py-12 sm:py-20 md:py-32 bg-emerald-50/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-800 mb-8 sm:mb-16">
                Why Choose Our Products?
                <span className="block text-lg sm:text-xl md:text-2xl text-emerald-600 mt-2 sm:mt-4 font-normal">
                  Quality meets tradition in every product
                </span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
              {[
                {
                  icon: Leaf,
                  title: "Premium Quality",
                  description: "Carefully selected from Kerala's pristine farms"
                },
                {
                  icon: Users,
                  title: "Traditional Expertise",
                  description: "Crafted using time-tested Kerala methods"
                },
                {
                  icon: Star,
                  title: "Nature's Goodness",
                  description: "Pure benefits from Kerala's lush landscapes"
                },
                {
                  icon: Recycle,
                  title: "Sustainable Packaging",
                  description: "Eco-friendly packaging for a greener future"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white/50 backdrop-blur-sm h-full"
                  >
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        <div className="inline-flex p-3 sm:p-4 rounded-full bg-emerald-100 text-emerald-600">
                          <item.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-emerald-800">{item.title}</h3>
                      <p className="text-emerald-600 text-sm sm:text-base">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="py-12 sm:py-20 md:py-32 bg-gradient-to-b from-white to-emerald-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-emerald-800 rounded-3xl p-6 sm:p-12 text-white text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2')] bg-cover bg-center opacity-10"></div>
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Stay Connected</h2>
                <p className="text-base sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 mx-auto max-w-2xl">
                  Subscribe to receive updates about our organic products, special offers, and exclusive discounts!
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-white text-emerald-800 hover:bg-emerald-100 transition-colors duration-300"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-emerald-900 text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Novayaroots</h3>
                <p className="text-emerald-100 text-sm sm:text-base">Your trusted source for premium organic herb products from Kerala, India.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Our Products</h4>
                <ul className="space-y-2 sm:space-y-4">
                  {[
                    "Organic Moringa Powder",
                    "Moringa Tea",
                    "Mulberry Leaf Tea",
                    "Kerala Pickles"
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href="https://novayaroots.com/order/"
                        className="text-emerald-100 hover:text-white transition-colors duration-300 flex items-center group text-sm sm:text-base"
                      >
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Contact Us</h4>
                <div className="space-y-2 sm:space-y-4">
                  <a
                    href="mailto:info@novayaroots.com"
                    className="flex items-center group hover:text-emerald-200 transition-colors duration-300 text-sm sm:text-base"
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>info@novayaroots.com</span>
                  </a>
                  <a
                    href="tel:+919074561129"
                    className="flex items-center group hover:text-emerald-200 transition-colors duration-300 text-sm sm:text-base"
                  >
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                    <span>+91 90745 61129</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-emerald-800 text-center text-xs sm:text-sm">
              <p className="text-emerald-200">
                &copy; {new Date().getFullYear()} Novayaroots - Authentic Organic Herb Products from Kerala, India. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}