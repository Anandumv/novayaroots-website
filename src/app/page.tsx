'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Menu, X, ArrowUp, MessageCircle, Sun, Moon, ChevronRight, Check, Mail, Phone, ExternalLink } from 'lucide-react'

export default function NovayarootsHomePage() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const sections = ['home', 'about', 'blog', 'lifestyle', 'contact']

  useEffect(() => {
    const handleScroll = () => {
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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert('Thank you for subscribing!')
      setEmail('')
    } else {
      alert('Please enter a valid email address.')
    }
  }

  const navigateToOrder = () => {
    router.push('/order')
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && message) {
      window.location.href = `mailto:info@novayaroots.com?subject=Message from ${name}&body=${message}`
      setName('')
      setEmail('')
      setMessage('')
    } else {
      alert('Please fill in all fields before sending the email.')
    }
  }

  const handleSendWhatsApp = () => {
    if (name && email && message) {
      const whatsappMessage = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)
      window.open(`https://wa.me/919074561129?text=${whatsappMessage}`, '_blank')
      setName('')
      setEmail('')
      setMessage('')
    } else {
      alert('Please fill in all fields before sending the WhatsApp message.')
    }
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Head>
        <title>Novayaroots - Kerala's Finest Herbal Treasures</title>
        <meta name="description" content="Discover the essence of wellness with Novayaroots. We offer premium herbs and herbal teas sourced directly from Kerala, India. Experience the power of ancient Ayurvedic wisdom in modern wellness solutions." />
        <meta name="keywords" content="Novayaroots, Kerala herbs, Ayurvedic wellness, organic spices, natural remedies" />
        <link rel="canonical" href="https://www.novayaroots.com" />
        <meta property="og:title" content="Novayaroots - Kerala's Finest Herbal Treasures" />
        <meta property="og:description" content="Discover premium herbs and herbal teas from Kerala, India. Experience the power of ancient Ayurvedic wisdom in modern wellness solutions." />
        <meta property="og:image" content="https://www.novayaroots.com/og-image.jpg" />
        <meta property="og:url" content="https://www.novayaroots.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-emerald-800 text-emerald-900 dark:text-white transition-colors duration-300">
        <header className="fixed w-full z-30 bg-white dark:bg-emerald-900 shadow-md py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2 text-emerald-800 dark:text-white">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight">Novayaroots</h1>
              </Link>
              <nav className="hidden md:flex items-center space-x-8">
                <ul className="flex space-x-8">
                  {sections.map((section) => (
                    <li key={section}>
                      <Link
                        href={`#${section}`}
                        className={`capitalize hover:text-emerald-600 transition-colors text-sm font-medium ${
                          activeSection === section ? 'text-emerald-600' : 'text-emerald-800 dark:text-emerald-200'
                        }`}
                      >
                        {section}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={navigateToOrder}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-sm font-medium rounded-full px-6 py-2 flex items-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <button onClick={toggleDarkMode} className="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-emerald-600 dark:bg-emerald-400">
                    <span className="sr-only">Toggle dark mode</span>
                    <span
                      aria-hidden="true"
                      className={`${isDarkMode ? 'translate-x-5' : 'translate-x-0'}
                        pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
              </nav>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  className="text-emerald-800 dark:text-white hover:text-emerald-600 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-x-0 top-16 bg-white dark:bg-emerald-900 shadow-lg z-20 md:hidden">
            <ul className="py-4">
              {sections.map((section) => (
                <li key={section}>
                  <Link
                    href={`#${section}`}
                    className="block capitalize hover:bg-emerald-50 dark:hover:bg-emerald-800 hover:text-emerald-600 transition-colors text-emerald-800 dark:text-white text-lg py-2 px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section}
                  </Link>
                </li>
              ))}
              <li className="px-4 pt-4">
                <Button
                  onClick={() => {
                    navigateToOrder()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-base rounded-full py-3 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                </Button>
              </li>
            </ul>
          </div>
        )}

        <main>
          <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/70 to-emerald-50/50 dark:from-emerald-900/70 dark:to-emerald-800/50"></div>
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-emerald-800 dark:text-white leading-tight">
                  Discover Kerala's
                  <span className="block text-emerald-600 dark:text-emerald-400">Herbal Treasures</span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-emerald-700 dark:text-emerald-200 font-light mb-8">
                  Experience the essence of wellness with our premium herbs and herbal teas, sourced directly from the lush landscapes of Kerala
                </p>
                <Button
                  onClick={navigateToOrder}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Explore Our Collection
                </Button>
              </motion.div>
            </div>
          </section>

          <section id="about" className="py-20 md:py-32 bg-white dark:bg-emerald-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-emerald-800 dark:text-white">The Novayaroots Legacy</h2>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Our Story</h3>
                  <p className="text-emerald-700 dark:text-emerald-200 mb-6">
                    Novayaroots was born in the heart of Kerala, where the wisdom of Ayurveda has been nurtured for millennia. Our founders, deeply rooted in local farming communities, recognized the need to bridge the gap between Kerala's treasure trove of herbs and the modern world's wellness needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Our Mission</h3>
                  <p className="text-emerald-700 dark:text-emerald-200 mb-6">
                    To curate and deliver Kerala's finest organic herbs and spices, connecting conscious consumers directly with local farmers. We strive to educate, inspire, and empower our community to embrace natural wellness solutions rooted in Kerala's rich herbal traditions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="blog" className="py-20 md:py-32 bg-emerald-50 dark:bg-emerald-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-emerald-800 dark:text-white">Kerala's Herbal Chronicles</h2>
              <p className="text-center text-emerald-700 dark:text-emerald-200 mb-8 max-w-3xl mx-auto">
                Dive into our treasure trove of Kerala's herbal wisdom, where ancient Ayurvedic knowledge meets modern wellness practices. Explore articles, recipes, and insights that will transform your approach to health and well-being.
              </p>
              <div className="text-center mb-12">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  onClick={() => window.open('https://medium.com/@novayaroots', '_blank')}
                >
                  Explore Kerala's Herbal Chronicles
                  <ExternalLink className="w-4 h-4 ml-2 inline-block" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white dark:bg-emerald-800 p-6">
                  <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Latest Herbal Insights</h3>
                  <ul className="space-y-3">
                    <li className="text-emerald-600 dark:text-emerald-400">The Magic of Malabar: Exploring Kerala's Unique Herbs</li>
                    <li className="text-emerald-600 dark:text-emerald-400">From Farm to Home: The Journey of Kerala's  Organic Spices</li>
                    <li className="text-emerald-600 dark:text-emerald-400">Monsoon Wellness: Ayurvedic Practices for Kerala's Rainy Season</li>
                  </ul>
                </Card>
                <Card className="bg-white dark:bg-emerald-800 p-6">
                  <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Why Explore Our Chronicles?</h3>
                  <ul className="space-y-3">
                    {[
                      "Uncover the secrets of Kerala's herbal traditions",
                      "Learn practical tips for incorporating local herbs into daily life",
                      "Discover the science behind Kerala's traditional remedies",
                      "Connect with a community of Kerala herbal enthusiasts"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-5 w-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          <section id="lifestyle" className="py-20 md:py-32 bg-white dark:bg-emerald-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center  text-emerald-800 dark:text-white">
                Embrace Kerala's Herbal Wellness Lifestyle
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Daily Herbal Rituals</h3>
                  <ul className="space-y-3">
                    <li className="text-emerald-600 dark:text-emerald-400">• Start your morning with a revitalizing cup of Kerala green tea</li>
                    <li className="text-emerald-600 dark:text-emerald-400">• Boost your immunity with a midday Amla and Turmeric shot</li>
                    <li className="text-emerald-600 dark:text-emerald-400">• Unwind in the evening with a calming Holy Basil (Tulsi) infusion</li>
                    <li className="text-emerald-600 dark:text-emerald-400">• Nourish your skin with our Kasturi Turmeric face mask before bed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Join Our Kerala Herbal Journey</h3>
                  <ul className="space-y-3">
                    {[
                      "Monthly Kerala Herbal Wisdom Newsletter",
                      "Seasonal Ayurvedic Wellness Guides",
                      "Access to Our Kerala Herbal Learning Library",
                      "Exclusive Community Forums with Local Experts"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-5 w-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 md:py-32 bg-emerald-50 dark:bg-emerald-800">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-emerald-800 dark:text-white">Get in Touch</h2>
              <div className="max-w-2xl mx-auto">
                <form className="space-y-4" onSubmit={handleSendEmail}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Name</label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      required
                      className="bg-white dark:bg-emerald-800 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Email</label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      required
                      className="bg-white dark:bg-emerald-800 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Message</label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Your message here..."
                      required
                      className="bg-white dark:bg-emerald-800 border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-emerald-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors rounded-full py-3 text-lg font-medium">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>
                    <Button type="button" onClick={handleSendWhatsApp} className="flex-1 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-full py-3 text-lg font-medium">
                      <Phone className="w-5 h-5 mr-2" />
                      Send WhatsApp
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-emerald-900 dark:bg-emerald-950 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 text-white mb-4">
                  <span className="text-2xl font-bold">Novayaroots</span>
                </Link>
                <p className="text-emerald-200 mb-4">Cultivating wellness through Kerala's finest herbs and herbal teas, from our farms to your home.</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/novayaroots/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://medium.com/@novayaroots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-300 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Medium</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section}>
                      <Link href={`#${section}`} className="text-emerald-200 hover:text-white transition-colors">
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-emerald-200 mb-4">Stay updated with our latest offers and herbal wisdom.</p>
                <form className="flex" onSubmit={handleSubscribe}>
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="rounded-l-full w-full bg-emerald-800 border-emerald-700 text-white placeholder-emerald-400"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-emerald-800 text-center">
              <p className="text-sm text-emerald-300">&copy; {new Date().getFullYear()} Novayaroots. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>

        <div className="fixed bottom-8 left-8">
          <Button
            className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors rounded-full p-4"
            aria-label="Chat with us"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}