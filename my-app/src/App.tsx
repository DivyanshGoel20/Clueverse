import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import PuzzlesPage from './pages/PuzzlesPage';
import { AudioProvider } from './context/AudioContext';
import Background from './components/Background'; // Make sure the path is correct

function App() {
  return (
      <AudioProvider>
        <Background>
          <Router>
            <Routes>
              <Route path="/" element={<WalletConnect />} />
              <Route path="/puzzles" element={<PuzzlesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Background>
      </AudioProvider>
  );
}

export default App;
