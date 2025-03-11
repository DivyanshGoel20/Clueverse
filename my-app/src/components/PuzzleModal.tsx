import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../lib/clueverseContract';
import toast from 'react-hot-toast';

interface PuzzleModalProps {
  puzzle: {
    title: string;
    description: string;
    imageUrl: string;
    content: string;
  };
  onClose: () => void;
  puzzleId: number;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ puzzle, onClose, puzzleId }) => {
  const { address, isConnected } = useAccount();
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const { data: isSolved } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'checkSolved',
    args: [address!, puzzleId],
  });

  const { writeContractAsync, isPending } = useWriteContract();

  const handleSubmit = async () => {
    toast.promise(
      writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitAnswer',
        args: [puzzleId, userAnswer],
        value: parseEther('1'),
      }),
      {
        loading: 'Submitting answer...',
        success: '✅ Transaction successful!',
        error: '❌ Transaction failed',
      }
    );
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-purple-500/30"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 z-10 border border-white/10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 text-white/80" />
          </motion.button>

          <div className="h-72 relative">
            <motion.img
              src={puzzle.imageUrl}
              alt={puzzle.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>

          <motion.div
            className="relative p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-50" />
            <h2 className="text-4xl font-bold text-white mb-4 relative">{puzzle.title}</h2>
            <p className="text-gray-300 mb-8 text-lg relative">{puzzle.description}</p>

            {isSolved ? (
              <div className="text-green-400 font-semibold text-xl">🎉 Puzzle Solved!</div>
            ) : showPuzzle ? (
              <div className="space-y-4 relative">
                <p className="text-white text-md">
                  <strong>Puzzle:</strong>{' '}
                  {puzzle.content.includes('http') ? (
                    <>
                      {puzzle.content.split('http')[0]}
                      <a
                        href={`http${puzzle.content.split('http')[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline"
                      >
                        Open Puzzle
                      </a>
                    </>
                  ) : (
                    <span className="font-mono">{puzzle.content}</span>
                  )}
                </p>

                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-white/50"
                />
                <p className="text-sm text-yellow-400 mb-4">⚠️ The answer is case-sensitive.</p>

                <motion.button
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isPending || userAnswer.length === 0}
                >
                  {isPending ? 'Submitting...' : 'Submit Answer (1 CORE)'}
                </motion.button>

                {statusMessage && (
                  <p className="text-sm text-white text-center">{statusMessage}</p>
                )}
              </div>
            ) : (
              <div className="flex gap-4 relative">
                <motion.button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPuzzle(true)}
                >
                  Start Challenge
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PuzzleModal;
