import React, { useEffect, useState } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/clueverseContract';
import type { Abi } from 'viem';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const nftData = [
    {
        id: 1,
        name: 'Piece By Piece',
        image: 'https://ipfs.io/ipfs/bafkreibhprme32h6okfqnjt7mdidzxqg667ovc2u6pgm2tbzf347shx4om',
    },
    {
        id: 2,
        name: 'Repo Secrets',
        image: 'https://ipfs.io/ipfs/bafkreicnrf3l4i6krongni34jt3y2ehaqvikzali3m43squirppczovnra',
    },
    {
        id: 3,
        name: 'Number Trail',
        image: 'https://ipfs.io/ipfs/bafkreifqwhxf6ejjnhgswodfihufvifz544bsdpfqoho74kikz46uee34y',
    },
];

const NFTCollection: React.FC = () => {
    const { address } = useAccount();
    const [walletAddress, setWalletAddress] = useState("");

    const { data, isLoading, error } = useReadContracts({
        contracts: address
            ? nftData.map(nft => ({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: CONTRACT_ABI as Abi,
                functionName: 'checkSolved',
                args: [address, nft.id],
            }))
            : [],
    });

    return (
        <div className="min-h-screen transition-all duration-1000">
            <div className="relative z-10">
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />

                <div className="max-w-7xl mx-auto px-6 py-12">
                    <Header />

                    <h1 className="text-4xl font-bold text-white mb-10 text-center">🎉 Your Puzzle NFTs</h1>

                    {isLoading ? (
                        <p className="text-center text-white">Loading your NFT collection...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error loading NFTs: {error.message}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {nftData.map((nft, i) => {
                                // Changed to handle boolean returned by checkSolved
                                const ownsNFT = data?.[i]?.result === true;

                                console.log(`NFT #${nft.id} (${nft.name}) - Solved: ${ownsNFT}, Result:`, data?.[i]?.result);

                                return (
                                    <div
                                        key={nft.id}
                                        className={`bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 ${!ownsNFT ? 'opacity-30 grayscale' : ''
                                            }`}
                                    >
                                        <img src={nft.image} alt={nft.name} className="w-full h-60 object-cover" />
                                        <div className="p-4 text-center">
                                            <h2 className="text-xl font-semibold text-gray-800">{nft.name}</h2>
                                            <p className="text-purple-600 font-medium">
                                                {ownsNFT ? '✅ Collected' : '🔒 Locked'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            to="/puzzles"
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition"
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                            Back to Puzzles
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NFTCollection;