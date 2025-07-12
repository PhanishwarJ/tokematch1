// File: src/pages/Watchlist.jsx
import React, { useEffect, useState } from 'react';
import JupiterSwapButton from '../components/JupiterSwapButton';
import { getWatchlist, removeFromWatchlist } from '../utils/localStorage';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const removeToken = (address) => {
    removeFromWatchlist(address);
    setWatchlist(getWatchlist());
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-lime-300 font-retro p-6">
      <h1 className="text-3xl font-extrabold mb-6 border-b-4 border-lime-400 pb-2">📌 Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-gray-400 text-center mt-10">You haven't added any tokens yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((token) => (
            <div
              key={token.address || token.mint}
              className="bg-[#0f0f0f] border border-lime-500 shadow-retro p-5 rounded-xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={token.logoURI || token.logo_uri}
                  alt={token.symbol}
                  className="w-16 h-16 rounded-full border-2 border-lime-300 shadow-md"
                />
                <div>
                  <h2 className="text-xl font-bold">{token.symbol}</h2>
                  <p className="text-sm opacity-80">{token.name}</p>
                  <p className="text-xs mt-1 opacity-60">
                    Volume (24h): ${token.daily_volume?.toLocaleString('en-US') || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <JupiterSwapButton token={token} />
                <button
                  className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 rounded font-retro"
                  onClick={() => removeToken(token.address)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .font-retro { font-family: 'Press Start 2P', cursive; }
          .shadow-retro { box-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14; }
          body {
            cursor: url('https://cdn.custom-cursor.com/db/cursor/32/Small_Glitch_Pointer.cur'), auto;
          }
        `}
      </style>
    </div>
  );
};

export default Watchlist;
