"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
}

export function ConnectWalletModal({ isOpen, onClose, onConnect }: ConnectWalletModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = (walletType: string) => {
    setIsConnecting(true)

    // Simulate connection delay
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12)
      onConnect(mockAddress)
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleConnect("metamask")}
            disabled={isConnecting}
            className="flex items-center justify-center gap-2 h-16"
          >
            {isConnecting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
                <span>MetaMask</span>
              </>
            )}
          </Button>

          <Button
            onClick={() => handleConnect("walletconnect")}
            disabled={isConnecting}
            variant="outline"
            className="flex items-center justify-center gap-2 h-16"
          >
            <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect" className="h-6 w-6" />
            <span>WalletConnect</span>
          </Button>

          <Button
            onClick={() => handleConnect("coinbase")}
            disabled={isConnecting}
            variant="outline"
            className="flex items-center justify-center gap-2 h-16"
          >
            <img src="/placeholder.svg?height=24&width=24" alt="Coinbase Wallet" className="h-6 w-6" />
            <span>Coinbase Wallet</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
