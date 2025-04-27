"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface GiftCardProps {
  vendor: string
  value: number
  image: string
  id: string
}

export function GiftCard({ vendor, value, image, id }: GiftCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="perspective-1000 w-full h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full backface-hidden p-4 flex flex-col justify-between bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="z-10">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mb-2">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h3 className="text-lg font-bold">{vendor}</h3>
            </div>
            <div className="text-right z-10">
              <p className="text-xs text-gray-500">Value</p>
              <p className="text-xl font-bold">${value.toFixed(2)}</p>
            </div>
          </div>

          <img
            src={image || "/placeholder.svg?height=80&width=80"}
            alt={vendor}
            className="absolute right-0 bottom-0 h-32 w-32 opacity-10"
          />

          <div className="mt-auto z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Card ID</p>
                <p className="text-xs font-mono">
                  {id.slice(0, 6)}...{id.slice(-4)}
                </p>
              </div>
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute w-full h-full backface-hidden p-4 flex flex-col justify-between bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">{vendor} Gift Card</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                This gift card can be redeemed at any {vendor} location or online.
              </p>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Issued On</p>
                <p className="text-sm">April 15, 2025</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Valid Until</p>
                <p className="text-sm">No Expiration</p>
              </div>

              <div className="pt-2">
                <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="font-mono text-sm">QR Code Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
