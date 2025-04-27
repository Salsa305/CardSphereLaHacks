"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ["Food & Drink", "Shopping", "Entertainment", "Travel", "Services", "Gaming"]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleReset = () => {
    setPriceRange([0, 100])
    setSelectedCategories([])
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Filters</h3>

      <div className="mb-8">
        <h4 className="font-medium mb-4">Price Range</h4>
        <Slider
          defaultValue={[0, 100]}
          max={200}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-medium mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-medium mb-4">Availability</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new-arrivals" />
            <Label htmlFor="new-arrivals">New Arrivals</Label>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  )
}
