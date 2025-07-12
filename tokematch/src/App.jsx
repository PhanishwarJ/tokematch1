import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TokenList from './components/TokenList';
import Watchlist from './components/Watchlist';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-lime-300 font-retro p-4">
 <header className="grid grid-cols-3 items-center mb-6 border-b border-lime-500 pb-4">
  {/* Left Nav Links */}
  <div className="flex items-center gap-6">
    <Link to="/" className="flex items-center gap-2 text-lime-300 hover:underline font-retro">
      <span>🏠</span>
      <span>Home</span>
    </Link>
    <Link to="/watchlist" className="flex items-center gap-2 text-lime-300 hover:underline font-retro">
      <span>📌</span>
      <span>Watchlist</span>
    </Link>
  </div>

  {/* Center Title */}
  <div className="text-center text-2xl text-lime-400 font-retro">
   ₿ TokeMatch 💵
  </div>

  {/* Right Wallet Button */}
  <div className="flex justify-end">
    <WalletMultiButton className="!bg-purple-600 !text-white !px-4 !py-2 !rounded !font-retro" />
  </div>
</header>

        <Routes>
          <Route path="/" element={<TokenList />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            .font-retro { font-family: 'Press Start 2P', cursive; }
          `}
        </style>
      </div>
    </Router>
  );
};

export default App;
