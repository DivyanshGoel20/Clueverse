import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const AudioContext = createContext<{
  isPlaying: boolean;
  toggleAudio: () => void;
} | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem('audioEnabled') === 'true';
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/puzzle-game-music.wav'); // must be in public/music
    audio.loop = true;
    audio.volume = 0.3;

    audioRef.current = audio;

    const previouslyEnabled = localStorage.getItem('audioEnabled') === 'true';

    if (previouslyEnabled || true) { // 👈 force attempt to play
      const playPromise = audio.play();
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.warn('Autoplay failed, waiting for user interaction:', error);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn('Play failed:', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    localStorage.setItem('audioEnabled', String(isPlaying));
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
