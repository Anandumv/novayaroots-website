'use client'

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, ShoppingCart, Plus, Minus, Leaf, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'

type PriceOptions = {
  "100g": number;
  "200g": number;
  "500g": number;
  "1kg": number;
}

type ProductItem = {
  name: string;
  prices: PriceOptions;
}

type ProductCategory = {
  category: string;
  items: ProductItem[];
}

const products: ProductCategory[] = [
  {
    category: "Grains & Flours",
    items: [
      { name: "Bran Rice", prices: { "100g": 12, "200g": 24, "500g": 60, "1kg": 120 } },
      { name: "Raw Bran Rice", prices: { "100g": 11, "200g": 22, "500g": 55, "1kg": 110 } },
      { name: "Arrowroot Powder", prices: { "100g": 160, "200g": 320, "500g": 800, "1kg": 1600 } },
    ]
  },
  {
    category: "Spices",
    items: [
      { name: "Star Anise", prices: { "100g": 130, "200g": 260, "500g": 650, "1kg": 1300 } },
      { name: "Mace", prices: { "100g": 240, "200g": 480, "500g": 1200, "1kg": 2400 } },
      { name: "Black Pepper", prices: { "100g": 110, "200g": 220, "500g": 550, "1kg": 1100 } },
      { name: "Cloves", prices: { "100g": 160, "200g": 320, "500g": 800, "1kg": 1600 } },
      { name: "Cardamom (7mm)", prices: { "100g": 420, "200g": 840, "500g": 2100, "1kg": 4200 } },
      { name: "Cardamom (5mm)", prices: { "100g": 310, "200g": 620, "500g": 1550, "1kg": 3100 } },
      { name: "Cinnamon", prices: { "100g": 260, "200g": 520, "500g": 1300, "1kg": 2600 } },
      { name: "Bay Leaf (Patta)", prices: { "100g": 150, "200g": 300, "500g": 750, "1kg": 1500 } },
      { name: "Jeera (Cumin)", prices: { "100g": 66, "200g": 132, "500g": 330, "1kg": 660 } },
      { name: "Chilly Powder", prices: { "100g": 72, "200g": 144, "500g": 360, "1kg": 720 } },
      { name: "Turmeric Powder", prices: { "100g": 40, "200g": 80, "500g": 200, "1kg": 400 } },
    ]
  },
  {
    category: "Herbal Powders",
    items: [
      { name: "Moringa Powder", prices: { "100g": 150, "200g": 300, "500g": 750, "1kg": 1500 } },
      { name: "Mushroom Powder", prices: { "100g": 260, "200g": 520, "500g": 1300, "1kg": 2600 } },
      { name: "Jackfruit Powder", prices: { "100g": 80, "200g": 160, "500g": 400, "1kg": 800 } },
      { name: "Ashwagandha Powder", prices: { "100g": 110, "200g": 220, "500g": 550, "1kg": 1100 } },
      { name: "Raktachandanam (Red Sandalwood)", prices: { "100g": 150, "200g": 300, "500g": 750, "1kg": 1500 } },
      { name: "Guava Leaf Powder", prices: { "100g": 100, "200g": 200, "500g": 500, "1kg": 1000 } },
      { name: "Neem Leaf Powder", prices: { "100g": 80, "200g": 160, "500g": 400, "1kg": 800 } },
      { name: "Curcumin Extract", prices: { "100g": 1150, "200g": 2300, "500g": 5750, "1kg": 11500 } },
    ]
  },
  {
    category: "Specialty Teas",
    items: [
      { name: "Mulberry Leaf Tea", prices: { "100g": 240, "200g": 480, "500g": 1200, "1kg": 2400 } },
      { name: "Moringa Tea", prices: { "100g": 150, "200g": 300, "500g": 750, "1kg": 1500 } },
    ]
  },
  {
    category: "Other Products",
    items: [
      { name: "Malabar Tamarind (Kudampuli)", prices: { "100g": 40, "200g": 80, "500g": 200, "1kg": 400 } },
      { name: "Wild Honey", prices: { "100g": 90, "200g": 180, "500g": 450, "1kg": 900 } },
      { name: "Farm Honey", prices: { "100g": 70, "200g": 140, "500g": 350, "1kg": 700 } },
      { name: "Kasturi Manjal (Wild Turmeric)", prices: { "100g": 12, "200g": 22, "500g": 50, "1kg": 90 } },
      { name: "Shankupushpam (Blue Pea Flower)", prices: { "100g": 600, "200g": 1200, "500g": 3000, "1kg": 6000 } },
      { name: "Monkey Tamarind (Pithecellobium dulce)", prices: { "100g": 5, "200g": 9, "500g": 20, "1kg": 35 } },
    ]
  },
  {
    category: "Personal Care & Beauty Ingredients",
    items: [
      { name: "Hibiscus Powder", prices: { "100g": 170, "200g": 340, "500g": 850, "1kg": 1700 } },
      { name: "Henna Powder", prices: { "100g": 63, "200g": 126, "500g": 315, "1kg": 630 } },
      { name: "Marigold Powder", prices: { "100g": 120, "200g": 240, "500g": 600, "1kg": 1200 } },
    ]
  },
]

const weightOptions = ["100g", "200g", "500g", "1kg"] as const
type WeightOption = typeof weightOptions[number]

type SelectedWeights = Record<string, { weight: WeightOption; quantity: number; price: number }>

export default function OrderPage() {
  const router = useRouter()
  const [selectedItems, setSelectedItems] = useState<SelectedWeights>({})
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', address: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const toastRef = useRef<{ item: string; message: string } | null>(null)

  useEffect(() => {
    if (window.location.hash === '#void') {
      router.replace('/order')
    }
  }, [router])

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products

    return products.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0)
  }, [searchTerm])

  const totalItems = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, item) => sum + item.quantity, 0)
  }, [selectedItems])

  const subtotal = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [selectedItems])

  const handleWeightChange = useCallback((item: string, weight: WeightOption, price: number) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (weight) {
        newItems[item] = { weight, quantity: newItems[item]?.quantity || 1, price }
        toastRef.current = { item, message: `${item} added to cart` }
      } else {
        delete newItems[item]
      }
      return newItems
    })
  }, [])

  const handleQuantityChange = useCallback((item: string, change: number) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (newItems[item]) {
        const newQuantity = Math.max(0, newItems[item].quantity + change)
        if (newQuantity === 0) {
          delete newItems[item]
          toastRef.current = { item, message: `${item} removed from cart` }
        } else {
          newItems[item] = { ...newItems[item], quantity: newQuantity }
          toastRef.current = { item, message: `${item} quantity updated to ${newQuantity}` }
        }
      }
      return newItems
    })
  }, [])

  useEffect(() => {
    if (toastRef.current) {
      toast.success(toastRef.current.message)
      toastRef.current = null
    }
  }, [selectedItems])

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = useCallback(() => {
    if (Object.keys(selectedItems).length === 0) {
      toast.error('Please add items to your cart before submitting')
      return
    }
    if (!contactInfo.name || !contactInfo.phone || !contactInfo.address) {
      toast.error('Please fill in all contact information')
      return
    }

    const orderDetails = Object.entries(selectedItems)
      .map(([item, { weight, quantity, price }]) => `${item}: ${weight} x ${quantity} = ₹${(price * quantity).toFixed(2)}`)
      .join('\n')

    const message = `
New order from Novayaroots:

${orderDetails}

Subtotal: ₹${subtotal.toFixed(2)}

Customer Details:
Name: ${contactInfo.name}
Phone: ${contactInfo.phone}
Address: ${contactInfo.address}
    `

    const whatsappUrl = `https://wa.me/919074561129?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Order submitted successfully!')
  }, [selectedItems, contactInfo, subtotal])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
      <Toaster position="top-right" />
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white p-4 sm:p-6 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Link href="/" className="text-2xl sm:text-3xl font-bold hover:text-amber-300 transition-colors flex items-center">
            <Leaf className="mr-2" />
            Novayaroots
          </Link>
          <Button
            variant="secondary"
            className="bg-amber-500 text-green-900 hover:bg-amber-400 transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md w-full sm:w-auto"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({totalItems})</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="outline" className="text-green-800 border-green-800 hover:bg-green-200 transition-all duration-300 w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-12 text-center text-green-800"
        >
          Your Journey to Health Starts Here!
        </motion.h1>

        <motion.div
          initial={{   opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Label htmlFor="search" className="sr-only">Search products</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Input
              type="search"
              id="search"
              placeholder="Search products..."
              className="pl-10 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-full shadow-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredProducts.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <AccordionItem value={`item-${index}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <AccordionTrigger className="px-4 sm:px-6 py-4 text-lg sm:text-xl font-semibold text-green-800 hover:bg-green-100 transition-all duration-300">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {category.items.map((item) => (
                      <motion.div
                        key={item.name}
                        className="bg-green-50 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                      >
                        <Label htmlFor={item.name} className="text-base sm:text-lg font-medium mb-2 sm:mb-3 block text-green-800">{item.name}</Label>
                        <div className="flex flex-col space-y-3">
                          <Select
                            onValueChange={(weight: WeightOption) => handleWeightChange(item.name, weight, item.prices[weight])}
                            value={selectedItems[item.name]?.weight || ""}
                          >
                            <SelectTrigger id={item.name} className="w-full bg-white text-green-800 border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md">
                              <SelectValue placeholder="Select weight" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-green-300">
                              {weightOptions.map((weight) => (
                                <SelectItem key={weight} value={weight} className="text-green-800 hover:bg-green-100">
                                  <div className="flex justify-between items-center w-full">
                                    <span className="font-medium">{weight}</span>
                                    <span className="text-right ml-4 px-2 py-1 bg-green-100 rounded-full text-green-800 text-sm font-semibold">₹{item.prices[weight]}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedItems[item.name] && (
                            <div className="flex items-center justify-between bg-white rounded-md p-2 border border-green-300">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.name, -1)}
                                className="h-8 w-8 rounded-full"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-green-800 font-medium">{selectedItems[item.name].quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.name, 1)}
                                className="h-8 w-8 rounded-full"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="mt-8 sm:mt-12 bg-white shadow-xl">
            <CardHeader className="bg-green-700 text-white">
              <CardTitle className="text-xl sm:text-2xl font-semibold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-green-800">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactInfoChange}
                    className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-green-800">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactInfo.phone}
                    onChange={handleContactInfoChange}
                    className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-green-800">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={contactInfo.address}
                    onChange={handleContactInfoChange}
                    className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md w-full"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Order Summary</h2>
            {Object.entries(selectedItems).map(([item, { weight, quantity, price }]) => (
              <div key={item} className="flex justify-between items-center mb-2 text-sm sm:text-base">
                <span className="text-left">{item}</span>
                <span className="text-right">
                  <span className="mr-2 sm:mr-4">{weight}</span>
                  <span>x {quantity}</span>
                  <span className="ml-2 sm:ml-4">₹{(price * quantity).toFixed(2)}</span>
                </span>
              </div>
            ))}
            <div className="border-t border-green-300 mt-4 pt-4">
              <div className="flex justify-between items-center font-bold text-lg sm:text-xl text-green-800">
                <span className="text-left">Subtotal:</span>
                <span className="text-right">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmitOrder}
            className="bg-green-600 text-white hover:bg-green-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Submit Order via WhatsApp
          </Button>
        </motion.div>
      </main>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-green-800">Your Cart</h2>
                <Button variant="ghost" onClick={() => setCartOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {Object.entries(selectedItems).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(selectedItems).map(([item, { weight, quantity, price }]) => (
                    <div key={item} className="flex justify-between items-center">
                      <div className="text-left">
                        <p className="font-medium">{item}</p>
                        <p className="text-sm text-gray-600">
                          <span className="mr-2 sm:mr-4">{weight}</span>
                          <span>x {quantity}</span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-green-600 mr-2">₹{(price * quantity).toFixed(2)}</p>
                        <Button variant="ghost" onClick={() => handleQuantityChange(item, -quantity)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <p className="font-bold text-lg text-green-800 flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-600">Your cart is empty</p>
              )}
              <Button
                onClick={handleSubmitOrder}
                className="w-full mt-6 bg-green-600 text-white hover:bg-green-700"
              >
                Proceed to Checkout
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white p-6 sm:p-8 mt-12 sm:mt-16">
        <div className="container mx-auto text-center">
          <p className="text-base sm:text-lg">&copy; {new Date().getFullYear()} Novayaroots. Nurturing holistic wellness through nature&apos;s finest herbs and spices.</p>
        </div>
      </footer>
    </div>
  )
}