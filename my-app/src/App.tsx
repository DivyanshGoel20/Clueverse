// import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import PuzzlesPage from './pages/PuzzlesPage';
import HowItWorks from './pages/HowItWorks';
import { AudioProvider } from './context/AudioContext';
import Background from './components/Background';

function App() {
  return (
      <AudioProvider>
        <Background>
        <Toaster position="top-right" reverseOrder={false} />
          <Router>
            <Routes>
              <Route path="/" element={<WalletConnect />} />
              <Route path="/puzzles" element={<PuzzlesPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Background>
      </AudioProvider>
  );
}

export default App;
