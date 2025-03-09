import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Using a more reliable audio source
const AUDIO_URL = 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem('audioEnabled') === 'true';
  });
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    
    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
      audioRef.current = audio;
    };

    const handleError = (e: ErrorEvent) => {
      console.error('Audio loading error:', e.message);
      setAudioLoaded(false);
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    
    // Load the audio
    audio.src = AUDIO_URL;
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Playback prevented:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }

    localStorage.setItem('audioEnabled', isPlaying.toString());
  }, [isPlaying, audioLoaded]);

  const toggleAudio = () => {
    if (audioLoaded) {
      setIsPlaying(prev => !prev);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};