import { ShoppingCart } from 'lucide-react'

type CartProps = {
  itemCount: number
}

export default function Cart({ itemCount }: CartProps) {
  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  )
}