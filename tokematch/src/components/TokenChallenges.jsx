import React, { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { JupiterTokenListProvider, useJupiterQuote } from '@jup-ag/react-hook';

const TokenChallenges = () => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const [prediction, setPrediction] = useState('YES');
  const [quote, setQuote] = useState(null);

  const { tokenMap } = JupiterTokenListProvider.useTokenList();

  const handleQuote = async () => {
    if (!selectedToken || !amount) return;
    const inputMint = selectedToken.address;
    const outputMint = tokenMap['USDC'].address;
    const amountIn = Math.floor(parseFloat(amount) * Math.pow(10, selectedToken.decimals));
    try {
      const res = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountIn}&slippageBps=100`);
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error('Quote fetch error:', error);
    }
  };

  const handleConfirm = () => {
    console.log('Prediction logged:', {
      token: selectedToken.symbol,
      prediction,
      amount,
      quote: quote?.outAmount,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-lime-300 font-retro p-8">
      <h1 className="text-center text-3xl mb-6">🎯 Token Challenges</h1>

      <div className="bg-[#111] border border-lime-500 p-6 rounded-xl max-w-xl mx-auto">
        <p className="mb-4">Will <span className="font-bold text-lime-400">SOL</span> close above <span className="font-bold text-yellow-400">$180</span> on <span className="font-bold text-blue-400">July 1?</span></p>

        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setPrediction('YES')} className={`px-4 py-2 rounded ${prediction === 'YES' ? 'bg-green-600' : 'bg-gray-700'}`}>✅ YES</button>
          <button onClick={() => setPrediction('NO')} className={`px-4 py-2 rounded ${prediction === 'NO' ? 'bg-red-600' : 'bg-gray-700'}`}>❌ NO</button>
        </div>

        <select
          onChange={(e) => setSelectedToken(tokenMap[e.target.value])}
          className="w-full mb-4 px-3 py-2 text-black"
        >
          <option>Select SPL token</option>
          {Object.values(tokenMap).map(token => (
            <option key={token.address} value={token.symbol}>{token.symbol}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-3 py-2 text-black"
        />

        <button onClick={handleQuote} className="bg-blue-600 px-4 py-2 rounded w-full mb-2">🔍 Get Quote</button>

        {quote && (
          <p className="text-sm text-lime-400 mb-4">
            You’ll receive ~{(quote.outAmount / Math.pow(10, 6)).toFixed(2)} USDC
          </p>
        )}

        <button onClick={handleConfirm} className="bg-purple-600 px-4 py-2 rounded w-full">🎯 Confirm Prediction</button>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .font-retro { font-family: 'Press Start 2P', cursive; }
        `}
      </style>
    </div>
  );
};

export default TokenChallenges;
