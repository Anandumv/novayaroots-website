'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArrowLeft } from 'lucide-react'

const products = [
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
  }
]

export default function OrderPage() {
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({})
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', address: '' })

  const handleWeightChange = (item: string, weight: string | undefined) => {
    setSelectedWeights(prev => {
      const newWeights = { ...prev }
      if (weight) {
        newWeights[item] = weight
      } else {
        delete newWeights[item]
      }
      return newWeights
    })
  }

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = () => {
    const orderDetails = Object.entries(selectedWeights)
      .filter(([_, weight]) => weight)
      .map(([item, weight]) => `${item}: ${weight}`)
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
  }

  return (
    <div className="min-h-screen bg-green-50 text-green-900">
      <header className="bg-green-800 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-amber-300 transition-colors">
            Novayaroots
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="text-green-800 border-green-800 hover:bg-green-100">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center text-green-800">Place Your Order</h1>
        {products.map((category, index) => (
          <Card key={category.category} className="mb-8 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-800">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div key={item} className="bg-green-100 p-4 rounded-lg shadow">
                    <Label htmlFor={item} className="text-lg font-medium mb-2 block text-green-800">{item}</Label>
                    <Select
                      value={selectedWeights[item]}
                      onValueChange={(value) => handleWeightChange(item, value)}
                    >
                      <SelectTrigger
                        id={item}
                        className="w-full bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <SelectValue placeholder="Choose quantity" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-green-300">
                        <SelectItem value="200g" className="text-green-800 hover:bg-green-100">200g - Small Pack</SelectItem>
                        <SelectItem value="300g" className="text-green-800 hover:bg-green-100">300g - Medium Pack</SelectItem>
                        <SelectItem value="500g" className="text-green-800 hover:bg-green-100">500g - Large Pack</SelectItem>
                        <SelectItem value="1kg" className="text-green-800 hover:bg-green-100">1kg - Family Pack</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedWeights[item] && (
                      <p className="mt-2 text-sm text-green-600 font-medium">
                        Selected: {selectedWeights[item]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="mt-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-800">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-green-800">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  className="mt-1 bg-white border-green-300 text-green-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmitOrder}
            className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg"
          >
            Submit Order via WhatsApp
          </Button>
        </div>
      </main>

      <footer className="bg-green-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Novayaroots. Nurturing holistic wellness through nature&apos;s finest herbs and spices.</p>
        </div>
      </footer>
    </div>
  )
}