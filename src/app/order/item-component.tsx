import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

type PriceOptions = {
  "100g": number;
  "200g": number;
  "500g": number;
  "1kg": number;
}

type ProductItem = {
  name: string;
  prices: PriceOptions;
  description: string;
}

type Review = {
  name: string;
  rating: number;
  comment: string;
}

type WeightOption = "100g" | "200g" | "500g" | "1kg"

const weightOptions: WeightOption[] = ["100g", "200g", "500g", "1kg"]

type SelectedWeights = Record<string, { weight: WeightOption; quantity: number; price: number }>

type ItemComponentProps = {
  item: ProductItem;
  selectedItems: SelectedWeights;
  handleWeightChange: (item: string, weight: WeightOption, price: number) => void;
  handleQuantityChange: (item: string, change: number) => void;
  handleAddReview: (productName: string, review: Review) => void;
  productReviews: Record<string, Review[]>;
}

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  selectedItems,
  handleWeightChange,
  handleQuantityChange,
  handleAddReview,
  productReviews
}) => {
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null)
  const [newReview, setNewReview] = useState<Review>({ name: '', rating: 0, comment: '' })

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.name && newReview.rating && newReview.comment) {
      handleAddReview(item.name, newReview)
      setNewReview({ name: '', rating: 0, comment: '' })
    }
  }

  const formatPrice = (price: number | undefined) => {
    if (typeof price === 'undefined' || isNaN(price)) return 'N/A';
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(price);
  }

  if (!item) {
    return null;
  }

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-green-800">{item?.name || ''}</h3>
        <p className="text-sm text-gray-600 mb-4">{item?.description || ''}</p>
        <div className="text-sm text-gray-600 mt-2">
          {weightOptions.map((weight) => (
            <span key={weight} className="mr-4">
              {weight}: {formatPrice(item?.prices?.[weight])}
            </span>
          ))}
        </div>
        <Select
          value={selectedWeight || ''}
          onValueChange={(value) => {
            if (value) {
              const weight = value as WeightOption
              setSelectedWeight(weight)
              handleWeightChange(item?.name || '', weight, item?.prices?.[weight] ?? 0)
            }
          }}
        >
          <SelectTrigger className="w-full mt-4">
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            {weightOptions.map((weight) => (
              <SelectItem key={weight} value={weight}>
                {weight} - ₹{item?.prices?.[weight] || 0}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedItems[item?.name || ''] && (
          <div className="mt-4 text-sm font-semibold text-green-600">
            Selected: {selectedItems[item?.name || ''].weight} - {formatPrice(selectedItems[item?.name || ''].price)}
            <div className="flex items-center mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item?.name || '', -1)}
                disabled={selectedItems[item?.name || ''].quantity <= 1}
              >
                -
              </Button>
              <span className="mx-2">{selectedItems[item?.name || ''].quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(item?.name || '', 1)}
              >
                +
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Reviews
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{item?.name || ''} Reviews</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              {productReviews[item?.name || '']?.map((review, index) => (
                <div key={index} className="border-b pb-2">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={newReview.rating.toString()}
                    onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} {rating === 1 ? 'Star' : 'Stars'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default ItemComponent