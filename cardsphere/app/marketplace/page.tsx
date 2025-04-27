import { GiftCardGrid } from "@/components/gift-card-grid"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function Marketplace() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Gift Card Marketplace</h1>
          <ConnectWalletButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MarketplaceFilters />
          </div>
          <div className="lg:col-span-3">
            <GiftCardGrid />
          </div>
        </div>
      </div>
    </main>
  )
}
