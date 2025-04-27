"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function LoyaltyRewards() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Loyalty Rewards</h3>
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Current Points</p>
              <p className="text-sm font-medium">750 / 1000</p>
            </div>
            <Progress value={75} className="h-2" />
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Silver Member</p>
                <p className="text-xs text-gray-500">250 more points to Gold</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Available Rewards:</p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
              <p className="text-sm">$5 off next purchase</p>
              <p className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full">
                200 pts
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
              <p className="text-sm">Free gift card transfer</p>
              <p className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full">
                150 pts
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
