"use client"

import { useState } from "react"
import { GiftCard } from "./gift-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function GiftCardGrid() {
  const [searchQuery, setSearchQuery] = useState("")

  const giftCards = [
    { vendor: "Starbucks", value: 25, image: "/placeholder.svg?height=80&width=80", id: "0x8f3e7a" },
    { vendor: "Amazon", value: 50, image: "/placeholder.svg?height=80&width=80", id: "0x9f4e2b" },
    { vendor: "Apple", value: 100, image: "/placeholder.svg?height=80&width=80", id: "0xa5f1c3" },
    { vendor: "Target", value: 30, image: "/placeholder.svg?height=80&width=80", id: "0xb2d4e6" },
    { vendor: "Spotify", value: 15, image: "/placeholder.svg?height=80&width=80", id: "0xc3f5a7" },
    { vendor: "Netflix", value: 20, image: "/placeholder.svg?height=80&width=80", id: "0xd4e6b8" },
    { vendor: "Best Buy", value: 75, image: "/placeholder.svg?height=80&width=80", id: "0xe5f7c9" },
    { vendor: "Uber", value: 40, image: "/placeholder.svg?height=80&width=80", id: "0xf6d8e0" },
    { vendor: "Walmart", value: 50, image: "/placeholder.svg?height=80&width=80", id: "0xg7e9f1" },
    { vendor: "DoorDash", value: 35, image: "/placeholder.svg?height=80&width=80", id: "0xh8f0g2" },
    { vendor: "GameStop", value: 60, image: "/placeholder.svg?height=80&width=80", id: "0xi9g1h3" },
    { vendor: "Airbnb", value: 100, image: "/placeholder.svg?height=80&width=80", id: "0xj0h2i4" },
  ]

  const filteredCards = giftCards.filter((card) => card.vendor.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div>
      <div className="mb-6 relative">
        <Input
          placeholder="Search gift cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <div key={index}>
            <GiftCard {...card} />
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No gift cards found matching "{searchQuery}"</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
