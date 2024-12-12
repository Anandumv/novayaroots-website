'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowRight, Check, Star, Users, Leaf, ShoppingBag, Coffee, Droplet, Sun, Mail, Phone, Recycle } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-emerald-700 mb-4 sm:mb-0">Novayaroots</Link>
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm md:text-base w-full sm:w-auto" asChild={true}>
              <Link href="https://novayaroots.com/order/">
                <ShoppingBag className="mr-2 h-4 w-4" /> Shop Kerala Herb Products
              </Link>
            </Button>
          </nav>
        </header>

        <main className="text-gray-900">
          <section className="py-8 md:py-20 text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-4 sm:mb-6">
              Premium Organic Herb Products from Kerala
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-emerald-600 mb-6 sm:mb-8 mx-auto max-w-2xl">
              Discover Novayaroots' authentic collection of nutrient-rich organic Moringa powder, antioxidant-packed Mulberry leaf tea, and traditional Kerala artisanal pickles.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full w-full sm:w-auto" asChild={true}>
              <Link href="https://novayaroots.com/order/">
                Explore Our Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </section>

          <section id="featured-products" className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8 md:mb-12">Featured Organic Herb Products from Kerala</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    icon: Coffee,
                    title: "Organic Moringa Powder",
                    subtitle: "Kerala's Nutrient-Dense Superfood",
                    benefits: [
                      "100% pure organic Moringa leaves powder from Kerala",
                      "Rich in vitamins, minerals, and antioxidants",
                      "Supports overall health and boosts immunity naturally"
                    ]
                  },
                  {
                    icon: Droplet,
                    title: "Mulberry Leaf Tea",
                    subtitle: "Kerala's Antioxidant-Packed Herb Infusions",
                    benefits: [
                      "Premium organic Mulberry leaf tea from Kerala",
                      "Supports blood sugar management and heart health",
                      "Delicious and caffeine-free wellness drink from Kerala"
                    ]
                  },
                  {
                    icon: Sun,
                    title: "Artisanal Kerala Pickles",
                    subtitle: "Including Organic Mushroom Pickles",
                    benefits: [
                      "Traditional Kerala pickle recipes with a modern twist",
                      "Unique organic Mushroom pickles for gut health",
                      "Preservative-free and naturally fermented in Kerala"
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
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full text-sm md:text-base" asChild={true}>
                        <Link href="https://novayaroots.com/order/">Shop Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="why-choose-us" className="py-12 md:py-16 bg-emerald-50 scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8 md:mb-12">Why Choose Our Organic Herb Products from Kerala?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { icon: Leaf, title: "Premium Organic Quality", description: "Our Moringa leaves and herb products are carefully selected to ensure the highest organic quality from Kerala's pristine farms." },
                  { icon: Users, title: "Traditional Kerala Expertise", description: "Crafted using time-tested methods for authentic Moringa tea, Mulberry leaf tea, and other herb products from Kerala." },
                  { icon: Star, title: "Nature's Goodness of Kerala", description: "From organic Moringa powder to Mulberry leaf tea, experience nature's pure benefits from the lush landscapes of Kerala." },
                  { icon: Recycle, title: "Sustainable Kerala Packaging", description: "Our pickles and herb products come in eco-friendly packaging, preserving Kerala's natural beauty and reducing environmental impact." }
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

          <section id="newsletter" className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8">Stay Updated on Our Kerala Herb Products</h2>
              <p className="text-center text-emerald-600 mb-8 mx-auto">
                Subscribe to receive updates about our organic Moringa products, herb teas, and special offers on traditional Kerala pickles. Be the first to know about new arrivals and exclusive discounts!
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); /* Add form submission logic here */ }}>
                <Input type="email" placeholder="Enter your email" className="flex-grow" aria-label="Email for newsletter" required />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">Subscribe</Button>
              </form>
            </div>
          </section>

          <section id="faq" className="py-12 md:py-16 bg-emerald-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-800 mb-8">Frequently Asked Questions About Our Kerala Herb Products</h2>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    question: "What makes Novayaroots' herb products from Kerala unique?",
                    answer: "Our products are sourced directly from organic farms in Kerala, ensuring the highest quality and authenticity. We focus on traditional superfoods like Moringa and Mulberry, known for their exceptional health benefits and rich cultural heritage."
                  },
                  {
                    question: "Are your Kerala herb products certified organic?",
                    answer: "Yes, all our herb products from Kerala are certified organic. We maintain strict quality control throughout our supply chain to ensure the purity and potency of our products, preserving the natural goodness of Kerala's herbs."
                  },
                  {
                    question: "How do I use Moringa powder from Kerala in my diet?",
                    answer: "Kerala Moringa powder can be easily incorporated into smoothies, juices, or sprinkled on salads and soups. Start with 1-2 teaspoons daily to experience its nutritional benefits. It's a versatile superfood that can enhance the nutritional value of many dishes."
                  },
                  {
                    question: "What are the health benefits of Mulberry leaf tea from Kerala?",
                    answer: "Mulberry leaf tea from Kerala is rich in antioxidants and may help support healthy blood sugar levels, promote heart health, and aid in weight management. It's also a delicious, caffeine-free alternative to traditional teas, offering a taste of Kerala's herb traditions."
                  }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <footer id="contact" className="bg-emerald-800 text-white py-8 md:py-12 scroll-mt-20">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-8">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-4">Novayaroots</h3>
                  <p className="text-sm md:text-base">Your trusted source for premium organic herb products from Kerala, India.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-base md:text-lg">Our Kerala Herb Products</h4>
                  <ul className="space-y-2 text-sm md:text-base">
                    <li><Link href="https://novayaroots.com/order/" className="hover:text-emerald-300">Organic Moringa Powder</Link></li>
                    <li><Link href="https://novayaroots.com/order/" className="hover:text-emerald-300">Moringa Tea</Link></li>
                    <li><Link href="https://novayaroots.com/order/" className="hover:text-emerald-300">Mulberry Leaf Tea</Link></li>
                    <li><Link href="https://novayaroots.com/order/" className="hover:text-emerald-300">Kerala Pickles</Link></li>
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
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                        asChild={true}
                      >
                        <Link href="https://medium.com/@novayaroots" target="_blank" rel="noopener noreferrer">
                          Blog
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                        asChild={true}
                      >
                        <Link href="https://www.instagram.com/novayaroots/" target="_blank" rel="noopener noreferrer">
                          Instagram
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                        asChild={true}
                      >
                        <Link href="https://wa.me/919074561129" target="_blank" rel="noopener noreferrer">
                          WhatsApp
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-emerald-700 text-white hover:bg-emerald-600 rounded-full text-xs md:text-sm"
                        asChild={true}
                      >
                        <Link href="mailto:info@novayaroots.com">
                          Email Us
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-xs sm:text-sm">
                <p>&copy; {new Date().getFullYear()} Novayaroots - Authentic Organic Herb Products from Kerala, India. All rights reserved.</p>
                <p className="mt-2 space-y-2 sm:space-y-0">
                  <Link href="/privacy-policy" className="hover:text-emerald-300 mr-4 block sm:inline">Privacy Policy</Link>
                  <Link href="/terms-of-service" className="hover:text-emerald-300 mr-4 block sm:inline">Terms of Service</Link>
                  <Link href="/sitemap.xml" className="hover:text-emerald-300 block sm:inline">Sitemap</Link>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ErrorBoundary>
  )
}