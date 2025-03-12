import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PuzzleCase from '../components/PuzzleCase';
import PuzzleModal from '../components/PuzzleModal';
import Header from '../components/Header';
// import Background from '../components/Background';

const puzzles = [
  {
    title: "Piece by Piece",
    description: "What you’re looking for is scattered — bring it together.",
    imageUrl: "https://imgs.search.brave.com/-erWI0Ooq0n96w1plSY7Ap5gK7QrML2vokLa2hHvZQ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTY1/MDIyMjEvcGhvdG8v/amlnc2F3LXB1enps/ZS1waWVjZXMuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTY1/M0l5TEY0S0ZlOXdw/ZnBSWEkwWlBCNkxo/VGhIclhvMi1MRWVB/YURvTW89",
    content: "Solve the jigsaw and find the answer: https://www.jigidi.com/s/29n1zi/",
    id: 1
  },
  {
    title: "Repo Secrets",
    description: "A mysterious GitHub repo holds something hidden.",
    imageUrl: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1000",
    content: "Explore the mystery within this GitHub repo: https://github.com/Zombie-Wombie",
    id: 2
  },
  {
    title: "Number Trail",
    description: "Decode the strange numbers to uncover the truth.",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
    content: "What message hides in these numbers? 104 116 116 112 115 58 47 47 116 97 108 108 121 46 115 111 47 114 47 119 52 122 56 55 53",
    id: 3
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
          <Header />

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {puzzles.map((puzzle, index) => (
              <PuzzleCase
              key={index}
              puzzle={puzzle}
              onClick={() => setSelectedPuzzle(puzzle)}
            />                      
            ))}
          </motion.div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-2xl font-bold text-white animate-pulse">
            More Puzzles Coming Soon!
          </p>
        </div>

      </div>

      {selectedPuzzle && (
        <PuzzleModal
          puzzle={selectedPuzzle}
          puzzleId={selectedPuzzle.id}
          onClose={() => setSelectedPuzzle(null)}
        />
      )}
    </div>

  );
};

export default PuzzlesPage;