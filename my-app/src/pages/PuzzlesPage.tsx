import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PuzzleCase from '../components/PuzzleCase';
import PuzzleModal from '../components/PuzzleModal';
import Header from '../components/Header';
// import Background from '../components/Background';

const puzzles = [
  {
    title: "The Ancient Cipher",
    description: "Decode the ancient symbols to reveal a hidden message. Perfect for beginners!",
    imageUrl: "https://images.unsplash.com/photo-1577373820541-e33259e0c356?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Pattern Matrix",
    description: "Find the missing pattern in this complex matrix of symbols and numbers.",
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Quantum Riddle",
    description: "A mind-bending puzzle that combines logic and quantum mechanics principles.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000"
  }
];

const PuzzlesPage: React.FC = () => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<typeof puzzles[0] | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem('walletAddress');
    if (!address) {
      navigate('/');
      return;
    }
    setWalletAddress(address);
  }, [navigate]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen transition-all duration-1000">
      {/* <Background /> */}

      <div className="relative z-10">
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />



        <div className="max-w-7xl mx-auto px-6 py-12">
          <Header walletAddress={walletAddress} />

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {puzzles.map((puzzle, index) => (
              <PuzzleCase
                key={index}
                {...puzzle}
                onSelect={() => setSelectedPuzzle(puzzle)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {selectedPuzzle && (
        <PuzzleModal
          puzzle={selectedPuzzle}
          onClose={() => setSelectedPuzzle(null)}
        />
      )}
    </div>
  );
};

export default PuzzlesPage;