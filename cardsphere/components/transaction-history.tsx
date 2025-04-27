"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react"

export function TransactionHistory() {
  const [transactions] = useState([
    {
      id: "0x1a2b3c",
      type: "purchase",
      vendor: "Starbucks",
      amount: 25,
      date: "2025-04-15",
      status: "completed",
    },
    {
      id: "0x4d5e6f",
      type: "redeem",
      vendor: "Amazon",
      amount: 50,
      date: "2025-04-10",
      status: "completed",
    },
    {
      id: "0x7g8h9i",
      type: "transfer",
      vendor: "Apple",
      amount: 100,
      date: "2025-04-05",
      status: "completed",
    },
    {
      id: "0xj0k1l2",
      type: "purchase",
      vendor: "Target",
      amount: 30,
      date: "2025-03-28",
      status: "completed",
    },
    {
      id: "0xm3n4o5",
      type: "redeem",
      vendor: "Spotify",
      amount: 15,
      date: "2025-03-20",
      status: "completed",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "redeem":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "transfer":
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div>
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(transaction.type)}
                    <span className="capitalize">{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.vendor}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-center">
        <Button variant="outline">View All Transactions</Button>
      </div>
    </div>
  )
}
