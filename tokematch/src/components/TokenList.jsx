import React, { useState, useEffect } from 'react';
import { addToWatchlist, getWatchlist, getSkipped, addToSkipped } from '../utils/localStorage';

const llamaAPI = 'https://7ef8-45-119-114-222.ngrok-free.app';

const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emojis, setEmojis] = useState([]);
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('https://lite-api.jup.ag/tokens/v1/tagged/lst');
        const data = await res.json();

        const watchlist = getWatchlist();
        const skipped = getSkipped();

        const excludedAddresses = new Set([
          ...watchlist.map(t => t.address || t.mint),
          ...skipped.map(t => t.address || t.mint),
        ]);

        const filtered = data.filter(token => !excludedAddresses.has(token.address || token.mint));
        const sorted = [...filtered].sort((a, b) => b.daily_volume - a.daily_volume);

        const limited = sorted.slice(0, 20);
        setTokens(limited);
        setLoading(false);

        // Fetch AI descriptions
        limited.forEach(async (token) => {
          const prompt = `Give a 1-line fun and informative description for the crypto token ${token.symbol} (${token.name}).`; 
          const response = await fetch(`${llamaAPI}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
          });
          const data = await response.json();
          setDescriptions(prev => ({ ...prev, [token.symbol]: data.response || '🧩 A promising token.' }));
        });
      } catch (err) {
        console.error('Failed to fetch tokens:', err);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleSwipe = (direction) => {
    const swipedToken = tokens[0];
    if (direction === 'right') {
      addToWatchlist(swipedToken);
      triggerEmojis(['❤️', '💖', '💫', '✨', '💥', '🧨']);
      playSound('/sounds/like.mp3');
    } else if (direction === 'left') {
      addToSkipped(swipedToken);
      triggerEmojis(['💔', '💣', '👎', '💀', '⚠️']);
      playSound('/sounds/skip.mp3');
    }
    setTokens((prev) => prev.slice(1));
  };

  const triggerEmojis = (symbols) => {
    setEmojis(symbols);
    setTimeout(() => setEmojis([]), 1000);
  };

  if (loading) return <p className="text-center mt-10 text-lime-400">Loading tokens...</p>;

  if (tokens.length === 0) {
    return <p className="text-center mt-10 text-gray-400">No more tokens to swipe.</p>;
  }

  const token = tokens[0];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-lime-300 font-retro p-6 flex flex-col items-center justify-center">
      <div className="relative">
        {emojis.map((emo, i) => (
          <div key={i} className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 text-5xl animate-bubble">
            {emo}
          </div>
        ))}
        <div className="bg-[#0f0f0f] border border-lime-500 shadow-retro rounded-xl p-6 w-full max-w-md text-center transform transition-transform duration-500 hover:scale-105">
          <img src={token.logoURI} alt={token.symbol} className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-lime-300" />
          <h2 className="text-2xl font-bold mb-1">{token.symbol}</h2>
          <p className="text-sm opacity-80 mb-2">{token.name}</p>
          <p className="text-xs italic text-lime-400 mb-2">
            {descriptions[token.symbol] || '✨ Generating description...'}
          </p>
          <p className="text-xs opacity-60">Volume (24h): ${token.daily_volume?.toLocaleString() || 'N/A'}</p>

          <div className="flex justify-around mt-6">
            <button
              onClick={() => handleSwipe('left')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-retro"
            >
              👎 Skip
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-retro"
            >
              👍 Add
            </button>
          </div>
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .font-retro { font-family: 'Press Start 2P', cursive; }
          .shadow-retro { box-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14; }
          .animate-bubble {
            animation: bubble 1s ease-out forwards;
          }
          @keyframes bubble {
            0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -120px) scale(2); opacity: 0; }
          }
          body {
            cursor: url('https://cdn.custom-cursor.com/db/cursor/32/Small_Glitch_Pointer.cur'), auto;
          }
        `}
      </style>
    </div>
  );
};

export default TokenList;
