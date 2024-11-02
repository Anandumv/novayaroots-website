'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [herbOfTheDay, setHerbOfTheDay] = useState('')
  const router = useRouter()

  const sections = useMemo(() => ['home', 'about', 'products', 'lifestyle', 'blog', 'contact'], [])

  useEffect(() => {
    const herbs = ['Ashwagandha', 'Turmeric', 'Moringa', 'Holy Basil', 'Ginger', 'Brahmi']
    setHerbOfTheDay(herbs[Math.floor(Math.random() * herbs.length)])
  }, [])

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (
          scrollPosition >= offsetTop - windowHeight / 2 &&
          scrollPosition < offsetTop + offsetHeight - windowHeight / 2
        ) {
          setActiveSection(section)
        }
      }
    })
  }, [sections])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="min-h-screen bg-amber-50 text-green-900">
      <header className="fixed w-full bg-green-800 text-amber-50 p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Novayaroots
            </Link>
          </h1>
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              {sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`#${section}`}
                    className={`capitalize hover:text-amber-300 transition-colors ${
                      activeSection === section ? 'text-amber-300 font-semibold' : ''
                    }`}
                  >
                    {section}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => router.push('/order')}
              className="bg-amber-400 text-green-800 hover:bg-amber-300 transition-colors"
            >
              Place Order
            </Button>
          </nav>
          <div className="md:hidden flex items-center space-x-4">
            <Button
              onClick={() => router.push('/order')}
              className="bg-amber-400 text-green-800 hover:bg-amber-300 transition-colors"
            >
              Order
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-amber-50 hover:text-amber-300 transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 bg-green-700 text-amber-50 p-4 z-10 md:hidden"
          >
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`#${section}`}
                    className="block capitalize hover:text-amber-300 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-green-600 text-amber-50">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl font-bold mb-4"
            >
              Ready to Transform Your Health Naturally?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Discover the power of premium organic spices and herbal products for a balanced lifestyle
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl font-semibold mb-8"
            >
              Featured Herb of the Day: {herbOfTheDay}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                onClick={() => router.push('/order')}
                className="bg-amber-400 text-green-800 hover:bg-amber-300 transition-colors px-8 py-3 rounded-full text-lg font-semibold"
              >
                Order Now
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-green-50 to-amber-100">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-12 text-center text-green-800"
            >
              Rooted in Tradition, Growing with Purpose
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-lg leading-relaxed">
                  At Novayaroots, we believe in the profound connection between nature and well-being. Our philosophy is rooted in the ancient wisdom of herbal traditions, seamlessly blended with modern wellness practices. We&apos;re not just purveyors of spices and herbs; we&apos;re advocates for a holistic lifestyle that nourishes body, mind, and spirit.
                </p>
                <p className="text-lg leading-relaxed">
                  Each product in our collection is a testament to nature&apos;s bounty, carefully selected to enhance your daily rituals and elevate your well-being. From the invigorating aroma of our organic spices to the soothing properties of our herbal blends, every offering is designed to bring balance and vitality to your life.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-4 text-green-700">Our Guiding Principles:</h3>
                <ul className="space-y-4">
                  {[
                    "Honoring Nature's Wisdom",
                    "Sustainable Cultivation",
                    "Ethical Sourcing",
                    "Holistic Well-being",
                    "Community Empowerment",
                    "Preserving Herbal Heritage"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <svg className="w-6 h-6 mr-2 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-green-800 text-lg">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 p-6 bg-white rounded-lg shadow-lg border-l-4 border-green-600"
            >
              <blockquote className="text-xl italic text-green-700">
                "In every herb, there&apos;s a story of tradition, a promise of wellness, and an invitation to live in harmony with nature. At Novayaroots, we&apos;re not just sharing products; we&apos;re nurturing a way of life that celebrates the profound connection between the earth&apos;s bounty and human vitality."
              </blockquote>
              <p className="mt-4 text-right text-green-600 font-semibold">- The Novayaroots Family</p>
            </motion.div>
          </div>
        </section>

        <section id="products" className="min-h-screen flex items-center justify-center bg-green-100 p-8">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center">Our Herbal Lifestyle Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Organic Spices & Seasonings",
                  items: [
                    "Turmeric Powder", "Black Pepper", "Cinnamon Sticks", "Cardamom Pods",
                    "Cumin Seeds", "Fenugreek Seeds", "Ginger Powder", "Garlic Flakes"
                  ]
                },
                {
                  category: "Herbal Teas & Infusions",
                  items: [
                    "Chamomile Blend", "Peppermint Leaves", "Lemon Balm", "Hibiscus Flowers",
                    "Rooibos Tea", "Ginger & Lemon Tea", "Tulsi (Holy Basil) Tea", "Lavender Tea"
                  ]
                },
                {
                  category: "Ayurvedic Herbs & Powders",
                  items: [
                    "Ashwagandha Powder", "Triphala Powder", "Brahmi Powder", "Shatavari Powder",
                    "Amla Powder", "Moringa Leaf Powder", "Neem Leaf Powder", "Licorice Root Powder"
                  ]
                },
                {
                  category: "Natural Wellness Supplements",
                  items: [
                    "Turmeric & Black Pepper Capsules", "Organic Spirulina Tablets", "Herbal Multivitamin",
                    "Digestive Enzyme Blend", "Stress Relief Formula", "Immune Support Blend"
                  ]
                },
                {
                  category: "Herbal Body Care",
                  items: [
                    "Neem & Tulsi Face Wash", "Aloe Vera Gel", "Herbal Hair Oil", "Ayurvedic Tooth Powder",
                    "Lavender Body Lotion", "Herbal Soap Bars", "Rose Water Toner"
                  ]
                },
                {
                  category: "Lifestyle Accessories",
                  items: [
                    "Copper Tongue Scraper", "Neti Pot", "Meditation Cushion", "Herbal Eye Pillow",
                    "Spice Grinder", "Tea Infuser", "Aromatherapy Diffuser"
                  ]
                }
              ].map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">{category.category}</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="lifestyle" className="min-h-screen flex items-center justify-center bg-amber-100 p-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-green-800">Embrace the Herbal  Lifestyle</h2>
            <div className="grid md:grid-cols-2  gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Daily Herbal Rituals</h3>
                <p className="mb-4">Incorporate the power of herbs into your daily routine:</p>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Start your day with a cup of energizing herbal tea</li>
                  <li>Use herbal face mists for a refreshing midday boost</li>
                  <li>Unwind in the evening with calming herbal bath soaks</li>
                  <li>Support your sleep with soothing herbal nighttime blends</li>
                </ul>
                <h3 className="text-2xl font-semibold mb-4">Herbal Wisdom for Modern Living</h3>
                <p>Learn how to harness the ancient wisdom of herbs for contemporary challenges:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Natural stress management techniques</li>
                  <li>Boosting immunity with herbal supplements</li>
                  <li>Enhancing focus and productivity with herbal aids</li>
                  <li>Supporting physical wellness through herbal nutrition</li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-lg italic">
                  "Embracing a herbal lifestyle is not just about consuming herbs; it&apos;s about reconnecting with nature&apos;s rhythms and wisdom in our daily lives."
                </p>
                <p className="text-lg">
                  At Novayaroots, we believe that true wellness comes from aligning ourselves with the natural world. Our carefully curated collection of herbs and spices is designed to support you on this journey, offering remedies for common ailments, enhancing your culinary experiences, and providing tools for spiritual growth.
                </p>
                <p className="text-lg">
                  Whether you&apos;re a seasoned herbalist or just beginning to explore the world of natural wellness, we invite you to join us in rediscovering the timeless wisdom of herbs. Let&apos;s cultivate a lifestyle that honors our connection to the earth and nurtures our innate capacity for health and vitality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="min-h-screen flex items-center justify-center bg-amber-100 p-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-green-800">Herbal Wellness Blog</h2>
            <div className="text-center mb-8">
              <p className="text-lg mb-6">
                Explore our collection of articles about herbal wellness, lifestyle tips, and natural remedies.
                Join us on Medium for in-depth discussions about holistic living and herbal wisdom.
              </p>
              <motion.a
                href="https://medium.com/@novayaroots"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-green-600 text-amber-50 px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
              >
                Read Our Blog on Medium
              </motion.a>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-800">Latest Articles</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://medium.com/@novayaroots"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-600 transition-colors"
                    >
                      Discover the Power of Ayurvedic Herbs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://medium.com/@novayaroots"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-600 transition-colors"
                    >
                      Natural Ways to Boost Your Immunity
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://medium.com/@novayaroots"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-600 transition-colors"
                    >
                      Incorporating Herbs into Your Daily Routine
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-800">Why Follow Our Blog?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Expert insights on herbal wellness</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Practical tips for natural living</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Traditional wisdom for modern life</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Community stories and experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-600 to-green-800 text-amber-50 p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Connect with Novayaroots</h2>
            <p className="text-xl mb-8">Ready to embark on your herbal wellness journey? Get in touch with us!</p>
            <div className="space-y-4">
              <p>Email: <a href="mailto:info@novayaroots.com" className="hover:text-amber-300 transition-colors">info@novayaroots.com</a></p>
              <p>Phone: <a href="tel:+919074561129" className="hover:text-amber-300 transition-colors">+91 9074561129</a></p>
              <p>Address: Nechuli House, Thalakkulathur, Kozhikode, Kerala, India</p>
            </div>
            <motion.a
              href={`https://api.whatsapp.com/send?phone=919074561129&text=${encodeURIComponent(
                'Hi Novayaroots, I\'m interested in learning more about your herbal products and lifestyle tips.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 bg-amber-400 text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-300 transition-colors"
            >
              Chat with Our Herbal Experts
            </motion.a>
          </div>
        </section>
      </main>

      <footer className="bg-green-900 text-amber-50 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Novayaroots. Nurturing holistic wellness through nature&apos;s finest herbs and spices.</p>
        </div>
      </footer>
    </div>
  )
}