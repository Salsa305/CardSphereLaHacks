"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GiftCard } from "./gift-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PopularGiftCards() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const giftCards = [
    { vendor: "Starbucks", value: 25, image: "/placeholder.svg?height=80&width=80", id: "0x8f3e7a" },
    { vendor: "Amazon", value: 50, image: "/placeholder.svg?height=80&width=80", id: "0x9f4e2b" },
    { vendor: "Apple", value: 100, image: "/placeholder.svg?height=80&width=80", id: "0xa5f1c3" },
    { vendor: "Target", value: 30, image: "/placeholder.svg?height=80&width=80", id: "0xb2d4e6" },
    { vendor: "Spotify", value: 15, image: "/placeholder.svg?height=80&width=80", id: "0xc3f5a7" },
    { vendor: "Netflix", value: 20, image: "/placeholder.svg?height=80&width=80", id: "0xd4e6b8" },
    { vendor: "Best Buy", value: 75, image: "/placeholder.svg?height=80&width=80", id: "0xe5f7c9" },
    { vendor: "Uber", value: 40, image: "/placeholder.svg?height=80&width=80", id: "0xf6d8e0" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= giftCards.length - 2 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? giftCards.length - 3 : prevIndex - 1))
  }

  return (
    <section className="py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Popular Gift Cards</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div className="flex gap-6" animate={{ x: `-${currentIndex * 33.33}%` }} transition={{ duration: 0.5 }}>
          {giftCards.map((card, index) => (
            <div key={index} className="min-w-[calc(33.33%-1rem)] md:min-w-[calc(33.33%-1.5rem)]">
              <GiftCard {...card} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 text-center">
        <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">View All Gift Cards</Button>
      </div>
    </section>
  )
}
