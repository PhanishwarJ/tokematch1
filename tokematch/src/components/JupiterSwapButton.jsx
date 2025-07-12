import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { BASE_TOKEN } from '../config';

const JupiterSwapButton = ({ token }) => {
  const { publicKey } = useWallet();

  const handleSwap = () => {
    const url = `https://jup.ag/swap/SOL-${token.symbol}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleSwap}
      disabled={!publicKey}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      Swap Now
    </button>
  );
};

export default JupiterSwapButton;