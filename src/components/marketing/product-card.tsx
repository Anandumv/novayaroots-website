import { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  benefits: string[]
  color: string
}

const colorVariants = {
  emerald: {
    icon: "bg-emerald-100/80 text-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
    check: "bg-emerald-100 text-emerald-600 group-hover/item:bg-emerald-200",
    subtitle: "text-emerald-600"
  },
  blue: {
    icon: "bg-blue-100/80 text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
    check: "bg-blue-100 text-blue-600 group-hover/item:bg-blue-200",
    subtitle: "text-blue-600"
  },
  amber: {
    icon: "bg-amber-100/80 text-amber-600",
    button: "bg-amber-600 hover:bg-amber-700",
    check: "bg-amber-100 text-amber-600 group-hover/item:bg-amber-200",
    subtitle: "text-amber-600"
  }
}

export function ProductCard({ icon: Icon, title, subtitle, benefits, color }: ProductCardProps) {
  const colors = colorVariants[color as keyof typeof colorVariants]

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-2xl border-2">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className={cn(
            "inline-flex p-5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg",
            colors.icon
          )}>
            <Icon className="h-14 w-14" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
          <p className={cn("text-lg", colors.subtitle)}>{subtitle}</p>
        </div>
        <ul className="space-y-4">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start group/item">
              <span className={cn(
                "flex-shrink-0 p-1 rounded-full transition-colors duration-300",
                colors.check
              )}>
                <Check className="h-4 w-4" />
              </span>
              <span className="ml-3 text-gray-600 group-hover/item:text-gray-800 transition-colors duration-300">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-8 pt-0">
        <Button
          className={cn(
            "w-full rounded-full text-base group-hover:scale-105 transition-all duration-300 shadow-lg",
            colors.button
          )}
          asChild
        >
          <Link href="https://novayaroots.com/order/">
            Shop Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}