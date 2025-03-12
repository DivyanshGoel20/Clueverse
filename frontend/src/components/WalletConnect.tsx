import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAccount, useSwitchChain } from 'wagmi';
import { ethers } from 'ethers';

const WalletConnect: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  // const { chainId, isConnected } = useAccount();
  // const { chains, switchChain } = useSwitchChain();

  // const coreTestnetId = 1114;

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const { ethereum } = window as any;
      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      // Prompt wallet connection
      await ethereum.request({ method: 'eth_requestAccounts' });

      // Try switching to Core Testnet 2
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x45A' }], // 1114 in hex
        });
      } catch (switchError: any) {
        // If Core Testnet isn't added to MetaMask
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x45A', // 1114 in hex
                  chainName: 'Core Blockchain Testnet 2',
                  nativeCurrency: {
                    name: 'Core',
                    symbol: 'tCORE2',
                    decimals: 18,
                  },
                  rpcUrls: ['https://rpc.test2.btcs.network/'],
                  blockExplorerUrls: ['https://scan.test2.btcs.network'],
                },
              ],
            });
          } catch (addError) {
            console.error('Failed to add Core Testnet:', addError);
            alert('Please switch to Core Testnet manually in your wallet.');
            return;
          }
        } else {
          console.error('Failed to switch chain:', switchError);
          alert('Failed to switch to Core Testnet.');
          return;
        }
      }

      // Wallet connected & chain switched
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      localStorage.setItem('walletAddress', address);
      navigate('/puzzles');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-xl w-full">
        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src="/logo.png"
            alt="Clueverse Logo"
            className="w-16 h-16 rounded"
          />
          <h1 className="text-5xl font-bold text-gray-800">Clueverse</h1>
          <p className="text-lg text-gray-600">
            Connect your wallet to start solving puzzles
          </p>

          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-purple-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
