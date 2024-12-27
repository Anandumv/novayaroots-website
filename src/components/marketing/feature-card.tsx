import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/50 backdrop-blur-sm border-2">
      <CardContent className="p-8 text-center">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 shadow-lg">
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-emerald-800 group-hover:text-emerald-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-emerald-600/90 group-hover:text-emerald-600 transition-colors duration-300">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}