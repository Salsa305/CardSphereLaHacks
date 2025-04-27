"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Zap, RefreshCw, Award, DollarSign, Smile } from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Zero-Fee Issuance",
      description: "Vendors create and distribute gift cards without incurring distribution fees",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Settlement",
      description: "Vendors receive funds immediately upon gift card purchase",
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Seamless Trading",
      description: "Users can easily transfer gift cards to others, creating a social gifting experience",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Loyalty Rewards",
      description: "Incentivizes customer retention through points and rewards",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "DeFi Integration",
      description: "Unredeemed funds generate yield through DeFi protocols",
    },
    {
      icon: <Smile className="h-6 w-6" />,
      title: "Modern UI",
      description: "Clean, intuitive interface that feels familiar to Web2 users",
    },
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Key Features</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          CardSphere combines the best of Web3 technology with familiar user experiences to create a revolutionary gift
          card marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
