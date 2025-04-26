import { useWallet } from '../contexts/WalletContext';

export default function WalletButton() {
  const { address, connect } = useWallet();

  return (
    <div>
      {address ? (
        <p className="text-green-600">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
