"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { ConnectWalletModal } from "./connect-wallet-modal"

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
    setIsModalOpen(false)
  }

  return (
    <>
      {isConnected ? (
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet size={16} />
          <span className="hidden md:inline">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <span className="md:hidden">{walletAddress.slice(0, 4)}...</span>
        </Button>
      ) : (
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
        >
          Connect Wallet
        </Button>
      )}

      <ConnectWalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConnect={handleConnect} />
    </>
  )
}
