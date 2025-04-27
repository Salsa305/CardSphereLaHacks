import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { PopularGiftCards } from "@/components/popular-gift-cards"
import { HowItWorks } from "@/components/how-it-works"
import { VendorCTA } from "@/components/vendor-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-2xl font-bold">CardSphere</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Marketplace</Button>
            <Button variant="ghost">How It Works</Button>
            <Button variant="ghost">For Vendors</Button>
            <ConnectWalletButton />
          </div>
        </nav>

        <HeroSection />
        <FeatureCards />
        <PopularGiftCards />
        <HowItWorks />
        <VendorCTA />
      </div>
      <Footer />
    </main>
  )
}
