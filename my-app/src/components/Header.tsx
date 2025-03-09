import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Puzzle, Music, Music2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface HeaderProps {
  walletAddress: string;
}

const Header: React.FC<HeaderProps> = ({ walletAddress }) => {
  const navigate = useNavigate();
  const { isPlaying, toggleAudio } = useAudio();

  const handleDisconnect = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Puzzle className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
        <h1 className="text-3xl font-bold text-white">Puzzle Collection</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleAudio}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title={isPlaying ? 'Mute background music' : 'Play background music'}
          aria-label={isPlaying ? 'Mute' : 'Unmute'}
        >
          {isPlaying ? (
            <Music className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Music2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Header;