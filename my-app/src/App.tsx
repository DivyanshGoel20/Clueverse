import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import PuzzlesPage from './pages/PuzzlesPage';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WalletConnect />} />
            <Route path="/puzzles" element={<PuzzlesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;