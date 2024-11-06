export type WeightOption = '50g' | '100g' | '250g' | '500g' | '1kg'

export const weightOptions: WeightOption[] = ['50g', '100g', '250g', '500g', '1kg']

export interface ProductItem {
name: string
description: string
prices: Record<WeightOption, number>
}

export interface ProductCategory {
category: string
items: ProductItem[]
}

export interface Review {
name: string
email: string
rating: number
comment: string
}

export interface SelectedWeights {
[item: string]: {
weight: WeightOption
quantity: number
price: number
}
}