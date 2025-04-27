import { UserStats } from "@/components/user-stats"
import { GiftCardCollection } from "@/components/gift-card-collection"
import { TransactionHistory } from "@/components/transaction-history"
import { LoyaltyRewards } from "@/components/loyalty-rewards"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function Dashboard() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <ConnectWalletButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UserStats />
          <LoyaltyRewards />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Gift Cards</h2>
          <GiftCardCollection />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <TransactionHistory />
        </div>
      </div>
    </main>
  )
}
