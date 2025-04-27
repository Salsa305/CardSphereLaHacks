"use client"

import { motion } from "framer-motion"
import { Wallet, ShoppingCart, Gift, Coins } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Connect Wallet",
      description: "Connect your Web3 wallet to access the CardSphere marketplace",
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Purchase Gift Cards",
      description: "Browse and purchase gift cards from your favorite vendors",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Send or Redeem",
      description: "Use your gift cards for purchases or send them to friends",
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Earn Rewards",
      description: "Accumulate loyalty points and earn yield on unredeemed balances",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          CardSphere makes buying, sending, and redeeming gift cards simple and rewarding
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative mb-8">
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-300">
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 hidden lg:block"
                  style={{ width: "calc(100% - 4rem)" }}
                ></div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
