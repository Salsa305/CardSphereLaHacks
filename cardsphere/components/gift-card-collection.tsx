"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GiftCard } from "./gift-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GiftCardCollection() {
  const [activeTab, setActiveTab] = useState("active")

  const activeCards = [
    { vendor: "Starbucks", value: 25, image: "/placeholder.svg?height=80&width=80", id: "0x8f3e7a" },
    { vendor: "Amazon", value: 50, image: "/placeholder.svg?height=80&width=80", id: "0x9f4e2b" },
    { vendor: "Apple", value: 100, image: "/placeholder.svg?height=80&width=80", id: "0xa5f1c3" },
    { vendor: "Target", value: 30, image: "/placeholder.svg?height=80&width=80", id: "0xb2d4e6" },
  ]

  const redeemedCards = [
    { vendor: "Spotify", value: 15, image: "/placeholder.svg?height=80&width=80", id: "0xc3f5a7" },
    { vendor: "Netflix", value: 20, image: "/placeholder.svg?height=80&width=80", id: "0xd4e6b8" },
  ]

  const sentCards = [
    { vendor: "Best Buy", value: 75, image: "/placeholder.svg?height=80&width=80", id: "0xe5f7c9" },
    { vendor: "Uber", value: 40, image: "/placeholder.svg?height=80&width=80", id: "0xf6d8e0" },
  ]

  return (
    <div>
      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active">Active ({activeCards.length})</TabsTrigger>
            <TabsTrigger value="redeemed">Redeemed ({redeemedCards.length})</TabsTrigger>
            <TabsTrigger value="sent">Sent ({sentCards.length})</TabsTrigger>
          </TabsList>

          <Button>Browse Marketplace</Button>
        </div>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GiftCard {...card} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="redeemed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redeemedCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GiftCard {...card} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GiftCard {...card} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
