import React from 'react';
import { motion } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/clueverseContract';

interface PuzzleCaseProps {
  puzzle: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
  onClick: () => void;
}

const PuzzleCase: React.FC<PuzzleCaseProps> = ({ puzzle, onClick }) => {
  const { address } = useAccount();

  const { data: isSolved } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'checkSolved',
    args: [address!, puzzle.id],
    query: {
      enabled: !!address,
    },
  });

  return (
    <motion.div 
      className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition-all duration-500"
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={puzzle.imageUrl} 
          alt={puzzle.title}
          className="w-full h-full object-cover transform transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
          initial={false}
        >
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{puzzle.title}</h3>
          <p className="text-gray-200 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{puzzle.description}</p>
        </motion.div>
      </div>

      <div className="p-6 pt-4">
        <div className="flex items-center justify-between">
          {isSolved ? (
            <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm">
              ✅ Puzzle Solved
            </span>
          ) : (
            <>
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Challenge
              </motion.button>
              <motion.div
                className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-4 h-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PuzzleCase;
