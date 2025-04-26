import { useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const useWallet = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(connection);
    const signer = web3Provider.getSigner();
    setProvider(web3Provider);
    setSigner(signer);
    setAddress(await signer.getAddress());
  };

  return { provider, signer, address, connectWallet };
};
