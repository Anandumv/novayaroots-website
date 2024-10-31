'use client'

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
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

const products = [
  {
    category: "Honey & Spices",
    items: [
      "Wild Honey", "Farm Honey", "Black Pepper", "Cardamom (7 grade)",
      "Cardamom (8 grade)", "Cardamom (6 grade)", "Cardamom (5 grade)",
      "Cinnamon", "Bay Leaf (Patta)", "Jeera (Cumin)", "Chilly Powder",
      "Turmeric Powder", "Curcumin Extract"
    ]
  },
  {
    category: "Ayurvedic Herbs & Powders",
    items: [
      "Ashwagandha Powder", "Neem Leaf Powder", "Guava Leaf Powder",
      "Raktachandanam (Red Sandalwood)", "Kasturi Manjal (Wild Turmeric)"
    ]
  },
  {
    category: "Superfoods & Herbal Teas",
    items: [
      "Moringa Powder", "Moringa Tea", "Mulberry Leaf Tea",
      "Shankupushpam (Blue Pea Flower)", "Mushroom Powder",
      "Malabar Tamarind (Kudampuli)", "Monkey Tamarind (Pithecellobium dulce)"
    ]
  },
  {
    category: "Personal Care & Beauty Ingredients",
    items: [
      "Hibiscus Powder", "Henna Powder", "Marigold Powder"
    ]
  },
  {
    category: "Specialty Teas, Coffee & Grains",
    items: [
      "Herbal Tea Mix", "Spiced Tea Mix", "Detox Tea Mix", "Coffee Powder", "Bran Rice"
    ]
  },
  {
    category: "Flours & Specialty Powders",
    items: [
      "Arrowroot Powder"
    ]
  }
]

const weightOptions = ["100g", "200g", "500g", "1kg"]

type SelectedWeights = Record<string, { weight: string; quantity: number }>

export default function Component() {
  const [selectedItems, setSelectedItems] = useState<SelectedWeights>({})
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', address: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const toastRef = useRef<{ item: string; message: string } | null>(null)

  const handleWeightChange = useCallback((item: string, weight: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev }
      if (weight) {
        newItems[item] = { weight, quantity: newItems[item]?.quantity || 1 }
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
      .map(([item, { weight, quantity }]) => `${item}: ${weight} x ${quantity}`)
      .join('\n')

    const message = `
New order from Novayaroots:

${orderDetails}

Customer Details:
Name: ${contactInfo.name}
Phone: ${contactInfo.phone}
Address: ${contactInfo.address}
    `

    const whatsappUrl = `https://wa.me/919633181513?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success('Order submitted successfully!')
  }, [selectedItems, contactInfo])

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products

    return products.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0)
  }, [searchTerm])

  const totalItems = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, item) => sum + item.quantity, 0)
  }, [selectedItems])

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

  console.log('Cart open:', cartOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-green-900">
      <Toaster position="top-right" />
      <header className="bg-gradient-to-r from-green-800 to-green-700 text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold hover:text-amber-300 transition-colors flex items-center">
            <Leaf className="mr-2" />
            Novayaroots
          </Link>
          <Button
            variant="secondary"
            className="bg-amber-500 text-green-900 hover:bg-amber-400 transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({totalItems})</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="outline" className="text-green-800 border-green-800 hover:bg-green-200 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl font-bold mb-12 text-center text-green-800"
        >
          Your Journey to Health Starts Here!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              className="pl-10 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-full shadow-md"
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
                <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-green-800 hover:bg-green-100 transition-all duration-300">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((item) => (
                      <motion.div
                        key={item}
                        className="bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                      >
                        <Label htmlFor={item} className="text-lg font-medium mb-3 block text-green-800">{item}</Label>
                        <div className="flex flex-col space-y-3">
                          <Select
                            onValueChange={(weight) => handleWeightChange(item, weight)}
                            value={selectedItems[item]?.weight || ""}
                          >
                            <SelectTrigger id={item} className="w-full bg-white text-green-800 border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md">
                              <SelectValue placeholder="Select weight" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-green-300">
                              {weightOptions.map((weight) => (
                                <SelectItem key={weight} value={weight} className="text-green-800 hover:bg-green-100">
                                  {weight}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedItems[item] && (
                            <div className="flex items-center justify-between bg-white rounded-md p-2 border border-green-300">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item, -1)}
                                className="h-8 w-8 rounded-full"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-green-800 font-medium">{selectedItems[item].quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item, 1)}
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
          <Card className="mt-12 bg-white shadow-xl">
            <CardHeader className="bg-green-700 text-white">
              <CardTitle className="text-2xl font-semibold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-green-800">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={contactInfo.name}
                    onChange={handleContactInfoChange}
                    className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
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
                    className="mt-1 bg-white  border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
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
                    className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            onClick={handleSubmitOrder}
            className="bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Your Cart</h2>
                <Button variant="ghost" onClick={() => setCartOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              {Object.entries(selectedItems).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(selectedItems).map(([item, { weight, quantity }]) => (
                    <div key={item} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item}</p>
                        <p className="text-sm text-gray-600">{weight} x {quantity}</p>
                      </div>
                      <Button variant="ghost" onClick={() => handleQuantityChange(item, -quantity)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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

      <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white p-8 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Novayaroots. Nurturing holistic wellness through nature&apos;s finest herbs and spices.</p>
        </div>
      </footer>
    </div>
  )
}