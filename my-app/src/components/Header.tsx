import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Music, Music2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAccount } from 'wagmi';

const Header: React.FC = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const { isPlaying, toggleAudio } = useAudio();

  const handleDisconnect = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-white mr-6">Clueverse</h1>

        {/* ✅ How It Works link */}
        <Link
          to="/how-it-works"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-md hover:bg-purple-700 transition-colors"
        >
          How it works
        </Link>
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
        {address && (
          <span className="text-gray-600 dark:text-gray-300">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        )}
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
