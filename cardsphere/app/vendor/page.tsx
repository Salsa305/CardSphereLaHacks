import { VendorStats } from "@/components/vendor-stats"
import { GiftCardManagement } from "@/components/gift-card-management"
import { VendorTransactions } from "@/components/vendor-transactions"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function VendorDashboard() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <ConnectWalletButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <VendorStats title="Total Sales" value="$12,450" change="+12.5%" />
          <VendorStats title="Active Gift Cards" value="245" change="+8.2%" />
          <VendorStats title="Redemption Rate" value="68%" change="+3.1%" />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Gift Card Management</h2>
          <GiftCardManagement />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <VendorTransactions />
        </div>
      </div>
    </main>
  )
}
