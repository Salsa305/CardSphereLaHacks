"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function VendorTransactions() {
  const transactions = [
    {
      id: "0x1a2b3c",
      type: "sale",
      card: "Coffee Lovers",
      amount: 25,
      date: "2025-04-15",
      customer: "0x8f3e7a...4d2c",
    },
    {
      id: "0x4d5e6f",
      type: "redemption",
      card: "Premium Coffee",
      amount: 50,
      date: "2025-04-10",
      customer: "0x9f4e2b...5e3d",
    },
    {
      id: "0x7g8h9i",
      type: "sale",
      card: "Coffee Bundle",
      amount: 100,
      date: "2025-04-05",
      customer: "0xa5f1c3...6f4e",
    },
    {
      id: "0xj0k1l2",
      type: "sale",
      card: "Quick Coffee",
      amount: 10,
      date: "2025-03-28",
      customer: "0xb2d4e6...7g5f",
    },
    {
      id: "0xm3n4o5",
      type: "redemption",
      card: "Coffee Lovers",
      amount: 25,
      date: "2025-03-20",
      customer: "0xc3f5a7...8h6g",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "redemption":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />
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
              <TableHead>Gift Card</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
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
                <TableCell>{transaction.card}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-mono text-xs">{transaction.customer}</TableCell>
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
        <Button variant="outline">Export Transactions</Button>
      </div>
    </div>
  )
}
