"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function VendorCTA() {
  const benefits = [
    "Zero distribution fees",
    "Instant settlement",
    "Reduced fraud risk",
    "Enhanced customer loyalty",
    "Detailed analytics dashboard",
    "Customizable gift card designs",
  ]

  return (
    <section className="py-16">
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">For Vendors</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join the future of gift card distribution. CardSphere helps vendors eliminate fees, reduce fraud, and
              create deeper connections with customers.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-6 text-lg h-auto">
              Become a Vendor
            </Button>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border-2 border-purple-300 dark:border-purple-700"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Vendor Dashboard</h3>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"></div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
                    <p className="text-2xl font-bold">$12,450</p>
                    <p className="text-sm text-green-500">+12.5% from last month</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active Cards</p>
                      <p className="text-xl font-bold">245</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Redemption</p>
                      <p className="text-xl font-bold">68%</p>
                    </div>
                  </div>
                </div>

                <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
