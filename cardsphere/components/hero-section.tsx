"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-16 gap-8">
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          The Future of{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Gift Cards</span>{" "}
          is Here
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          CardSphere revolutionizes gift cards with blockchain technology, eliminating fees and creating a seamless
          marketplace for vendors and consumers.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-6 text-lg h-auto">
            Explore Marketplace
          </Button>
          <Button variant="outline" className="px-8 py-6 text-lg h-auto">
            For Vendors
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GiftCardAnimation />
      </motion.div>
    </div>
  )
}

function GiftCardAnimation() {
  return (
    <div className="relative w-80 h-96">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          rotateY: [0, 10, 0, -10, 0],
          rotateX: [0, 5, 0, -5, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 p-1">
          <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h3 className="text-xl font-bold">CardSphere</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Balance</p>
                <p className="text-2xl font-bold">$50.00</p>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Vendor</p>
                <p className="text-lg font-semibold">Starbucks</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Card ID</p>
                  <p className="text-sm font-mono">0x8f...3e7a</p>
                </div>
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
